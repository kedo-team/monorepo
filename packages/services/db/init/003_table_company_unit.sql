--------------------------------------------------------
------- COMPANY_UNITES ----------------------------------
--------------------------------------------------------
BEGIN
CREATE TABLE IF NOT EXISTS app_hidden.company_unit
(
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid (),
    parent_id UUID REFERENCES app_hidden.company_unit(id),
    title text NOT NULL,
    description text,
    head_user_id UUID REFERENCES app_hidden.user(id)
);

CREATE VIEW app_public.company_unit AS 
    SELECT id, parent_id, title, description, head_user_id
    FROM app_hidden.company_unit;

COMMENT ON VIEW app_public.company_unit IS
E'@primaryKey id\n
@foreignKey (parent_id) references app_public.company_unit (id)';

GRANT SELECT ON app_public.company_unit TO app_user;

END

