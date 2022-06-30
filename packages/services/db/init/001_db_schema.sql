-----------------------------------------------------------
--- SCHEMAS CREATION --------------------------------------
-----------------------------------------------------------

BEGIN

CREATE SCHEMA IF NOT EXISTS app_public;
CREATE SCHEMA IF NOT EXISTS app_hidden;
CREATE SCHEMA IF NOT EXISTS app_private;

GRANT USAGE ON SCHEMA app_public TO app_user;

GRANT USAGE ON SCHEMA app_hidden TO wf_api_service;

END
