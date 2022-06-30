\connect kedo;

BEGIN


CREATE TABLE IF NOT EXISTS app_hidden.user
(
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid (),
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text,
    avatar_url text,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE VIEW app_public.user
 AS
 SELECT id,
    first_name,
    last_name,
    email,
    phone,
    avatar_url
   FROM app_hidden.user;


GRANT SELECT ON app_public.user TO app_user;

END;
