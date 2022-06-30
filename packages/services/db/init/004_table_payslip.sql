-----------------------------------------------------------
--- PAYSLPIS ----------------------------------------------
-----------------------------------------------------------
BEGIN

CREATE TABLE IF NOT EXISTS app_hidden.payslip
(
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid (),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner_user_id UUID REFERENCES app_hidden.user(id),
    period date,
    is_viewed boolean DEFAULT FALSE,
    file_id text
);

CREATE VIEW app_public.payslip AS
SELECT 
    period, is_viewed, file_id, created_at FROM app_hidden.payslip
ORDER BY created_at DESC;

-- Надо перепроверить зачем это нужно
-- ALTER VIEW app_public.payslip
--     OWNER TO app_user;

CREATE POLICY payslip_rls_policy ON app_hidden.payslip
FOR SELECT
USING (owner_user_id = app_private.current_user_id());

ALTER TABLE app_hidden.payslip ENABLE ROW LEVEL SECURITY;

-- GRANT SELECT ON app_hidden.payslip TO app_user;
GRANT SELECT ON app_public.payslip TO app_user;

END