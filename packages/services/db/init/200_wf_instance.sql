GRANT USAGE ON SCHEMA app_private TO wf_api_service;

CREATE TABLE IF NOT EXISTS app_private.wf_instance
(
    data jsonb
);
---
CREATE OR REPLACE FUNCTION app_private.insertUpdateWorkflowInstance(req_data text)
RETURNS json SECURITY DEFINER AS $$
DECLARE retValue JSON;
BEGIN

WITH CTE as (
    INSERT INTO app_private.wf_instance (data)
    SELECT req_data::jsonb || format('{"id": "%s"}', gen_random_uuid())::jsonb
    RETURNING *
) SELECT data as json INTO retValue FROM CTE;

RETURN retValue;

END;
$$ LANGUAGE plpgsql;
-------------

GRANT EXECUTE ON FUNCTION app_hidden.insertUpdateTask TO wf_api_service;