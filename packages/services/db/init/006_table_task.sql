CREATE TABLE IF NOT EXISTS app_hidden.status
(
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid (),
    name text
);
--
CREATE TABLE IF NOT EXISTS app_hidden.task
(
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid (),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_user_id UUID REFERENCES app_hidden.user(id),
    request_id UUID REFERENCES app_hidden.request_base(id),
    status text NOT NULL CHECK status = ANY ('{PENDING,IN_PROGRESS,APPROVED,REJECTED}'::text[]),
    assigned_to_user_id UUID REFERENCES app_hidden.user(id),
    order integer DEFAULT 0
);


CREATE OR REPLACE VIEW app_public.task AS
SELECT t.id, 
       t.created_at, 
       t.author_user_id, 
       t.request_id, 
       s.name as "status",
       t.assigned_to_user_id  FROM app_hidden.task t
INNER JOIN app_hidden.status s ON t.status_id = s.id
WHERE s.name != 'PENDING'

COMMENT ON VIEW app_public.task IS
E'@primaryKey id\n
@foreignKey (author_user_id) references app_public.user (id)\n
@foreignKey (request_id) references app_public.request (id)\n
@foreignKey (assigned_to_user_id) references app_public.user (id)';

----------------------------
GRANT SELECT ON app_public.task TO app_user;
----------------------------

CREATE OR REPLACE FUNCTION app_hidden.insertUpdateTask(req_data text) 
RETURNS table (json json) SECURITY DEFINER AS $$
DECLARE task_status_uuid UUID;
BEGIN


RETURN QUERY
WITH CTE as (
    INSERT INTO app_hidden.task (request_id, author_user_id, status_id, assigned_to_user_id)
    SELECT 
        "requestId" as request_id,
        "authorId" as author_user_id,
        s.id as status_id,
        "assignedTo" as assigned_to_user_id
    FROM
    json_to_recordset(CAST(req_data as JSON)) as x("requestId" UUID, "authorId" UUID, "status" text, "assignedTo" UUID)
    LEFT JOIN app_hidden.status s ON s.name = "status"
    RETURNING *
) SELECT json_agg(row_to_json(row)) FROM (
    SELECT 
        --- BEGIN JSON SHAPE
        cte.id, 
        cte.request_id AS "requestId", 
        author_user_id as "authorId",
        s.name as "status",
        assigned_to_user_id as "assignedTo"
        -- END JSON
    FROM CTE cte
    INNER JOIN app_hidden.status s ON s.id = CTE.status_id
) row;
 
END;
$$ LANGUAGE plpgsql;
--
GRANT EXECUTE ON FUNCTION app_hidden.insertUpdateTask TO wf_api_service;
--
COMMENT ON function app_hidden.insertUpdateRequest IS $$
export interface ITask {
    id?: string,
    requestId: string,
    authorId: string,
    status: Status,
    assignedTo: string,
}$$;