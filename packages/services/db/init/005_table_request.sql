-----------------------------------------------------------
--- REQUESTS ----------------------------------------------
-----------------------------------------------------------
BEGIN

CREATE TABLE app_hidden.request_type
(
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid (),
    name text
);

CREATE TABLE IF NOT EXISTS app_hidden.request
(
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid (),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    owner_user_id UUID NOT NULL REFERENCES app_hidden.user(id),
    request_type_id UUID NOT NULL REFERENCES app_hidden.request_type(id),
    status text NOT NULL CHECK status = ANY ('{PENDING,IN_PROGRESS,APPROVED,REJECTED}'::text[]),
    payload jsonb
);

CREATE VIEW app_public.request AS
 SELECT r.id,
    r.created_at,
    r.owner_user_id,
    r.status,
    (r.status in ('APPROVED', 'REJECTED')) as is_done,
    rt.name AS request_type_name,
    r.payload
   FROM app_hidden.request r
     JOIN app_hidden.request_type rt ON r.request_type_id = rt.id;

COMMENT ON VIEW app_public.request IS
E'@primaryKey id\n
@foreignKey (owner_user_id) references app_public.user (id)';

GRANT SELECT ON app_public.request TO app_user;
---------------------------------------------------------
-------
---------------------------------------------------------
CREATE OR REPLACE FUNCTION app_private.createRequestWorkflow(req_data JSONB)
RETURNS json SECURITY DEFINER
AS $$
DECLARE row_txt text;
DECLARE req_id UUID;
DECLARE task_index integer = 0;
DECLARE task_pending_id UUID;
BEGIN



--RAISE NOTICE 'json: %', jsonb_path_query(json, '$.taskList.type()');
--RAISE NOTICE 'json: %', json -> 'userId';

-- inserting request into table
INSERT INTO app_hidden.request (owner_user_id, request_type_id, status, payload)
SELECT (req_data->>'ownerUserId')::UUID, 
        rt.id,
        'PENDING',
        req_data->'payload'
FROM app_hidden.request_type rt 
WHERE rt.name = req_data->>'requestTypeName'
RETURNING id INTO req_id;

IF req_id IS NULL THEN
  RAISE EXCEPTION 'Unable to store request';
END IF;

RAISE NOTICE 'new request id: %', req_id;
----------------------------------------------------------------------

FOR row_txt IN SELECT jsonb_array_elements_text('["lera@kedo-team.ru", "anton@kedo-team.ru"]')
LOOP
    DECLARE assigned_to_user_id UUID;
    BEGIN
        RAISE NOTICE 'testing current rec: %', row_txt;
        -- finding user id
        
        SELECT id INTO assigned_to_user_id 
            FROM app_hidden.user 
            WHERE email = row_txt;
        
        IF assigned_to_user_id IS NULL THEN
            RAISE EXCEPTION 'user with email % not found', row_txt;
        END IF;
        
        RAISE NOTICE 'found user id: %', assigned_to_user_id;
            
        INSERT INTO app_hidden.task (author_user_id, request_id, status, assigned_to_user_id, "order")
        SELECT (req_data->>'authorUserId')::UUID, -- author_user_id
                req_id, -- request id we just created
                'PENDING', -- task status
                assigned_to_user_id, --assigned_to_user_id
                task_index;
         task_index = task_index + 1;    
    END;
    
END LOOP;

PERFORM app_private.updateWorkflow(format('{"requestId": "%s", "userId": "%s"}', req_id, req_data->>'ownerUserId')::jsonb);

RETURN req_data || format('{"id": "%s"}', req_id)::jsonb;
 
END;
$$ LANGUAGE plpgsql;

------------------

CREATE OR REPLACE FUNCTION app_private.updateWorkflow(updateObj jsonb)
RETURNS json 
AS $$
DECLARE current_order int;
BEGIN
    ----------------------------------------------------------------------
    IF NOT (updateObj ? 'requestId') OR NOT (updateObj ? 'userId') THEN
        RETURN '{"error": "Request params not formed properly"}';
    END IF;
    
    ----------------------------------------------------------------------
    -- if task id is null we just need to start workflow
    IF (updateObj ? 'taskId') IS FALSE THEN
        RAISE NOTICE 'task is null so just starting';
        
        -- check permissions
        IF NOT EXISTS(SELECT * 
                      FROM app_hidden.request 
                      WHERE "id"          = (updateObj ->> 'requestId')::UUID AND 
                            owner_user_id = (updateObj ->> 'userId')::UUID) 
        THEN
          RETURN '{"error": "Permission denied"}';
        END IF;
        RAISE NOTICE 'permission checked';
        -- update tasks
        WITH ids AS (
            select t.id from app_hidden.task t
            WHERE t.request_id = (updateObj->>'requestId')::UUID
            AND t.status = 'PENDING'
            AND t.order = (
            select min(t."order") from app_hidden.task t
            WHERE STATUS = 'PENDING' AND t.request_id = (updateObj->>'requestId')::UUID)
        ) UPDATE app_hidden.task task
            SET status = 'IN_PROGRESS'
            FROM ids WHERE ids.id = task.id;
            
         RAISE NOTICE 'task status updated';
        
        -- update request status
        UPDATE app_hidden.request SET "status" = 'IN_PROGRESS';
        RAISE NOTICE 'request status updated';
        
        RETURN '{"status": "IN_PROGRESS"}'::json;
   END IF;
---------------------------------------------------------------------------
   IF NOT (updateObj ? 'taskId') OR NOT (updateObj ? 'status') THEN
       RETURN '{"error": "Request params not formed properly"}';
   END IF;
---------------------------------------------------------------------------
-- check task permissions
   IF NOT EXISTS(SELECT * 
                 FROM app_hidden.task
                 WHERE id = (updateObj ->> 'taskId')::UUID 
                 AND assigned_to_user_id = (updateObj ->> 'userId')::UUID
                 AND "status" = 'IN_PROGRESS') THEN
          RETURN '{"error": "Permission on task denied"}';
   END IF;
---------------------------------------------------------------------------
   IF updateObj ->> 'status' = 'APPROVED' THEN
      SELECT "order" INTO current_order FROM app_hidden.task WHERE "id" = (updateObj->>'taskId')::UUID;
      -- ok. we are here and ready to perfom some actions
       UPDATE app_hidden.task SET status = 'APPROVED' WHERE "id" = (updateObj->>'taskId')::UUID;
       -- check if all the task on this stage completed 
       --- THEN DO NOTHING
       IF EXISTS (SELECT * FROM app_hidden.task 
                  WHERE request_id = (updateObj->>'requestId')::UUID
                  AND "order" = current_order AND "status" = 'IN_PROGRESS') THEN
         RETURN '{"status": "IN_PROGRESS"}'::json;       
       END IF;
       
       -- checck if next order task exists
       IF EXISTS (SELECT * FROM app_hidden.task
                 WHERE request_id = (updateObj->>'requestId')::UUID 
                  AND "order" = current_order + 1) THEN
          UPDATE app_hidden.task SET status = 'IN_PROGRESS'
          WHERE request_id = (updateObj->>'requestId')::UUID 
                AND "order" = current_order + 1;
       END IF;
       
      IF NOT EXISTS(SELECT * FROM app_hidden.task
                   WHERE request_id = (updateObj->>'requestId')::UUID 
                    AND "status" <> 'APPROVED') THEN
          UPDATE app_hidden.request SET "status" = 'APPROVED'
          WHERE "id" = (updateObj->>'requestId')::UUID ;
      END IF;
       
       
   END IF;
---------------------------------------------------------------------------------------------
   IF updateObj->>'status' = 'REJECTED' THEN 
    UPDATE app_hidden.request SET "status" = 'REJECTED'
          WHERE "id" = (updateObj->>'requestId')::UUID;
    UPDATE app_hidden.task SET "status" = 'PENDING'
    WHERE request_id = (updateObj->>'requestId')::UUID AND "status" = "IN_PROGRESS";
       RETURN '{"status": "REJECTED"}'::json;
   END IF;

    
    RETURN '{"error": "No operation perfomed"}'::json;

END;
$$ LANGUAGE plpgsql;
--------------
