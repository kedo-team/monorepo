-----------------------------------------------------------
--- AUTHENTICATION/AUTHORIZATION --------------------------
-----------------------------------------------------------

-- the next statements need for jwt working properly
CREATE TYPE app_public.jwt_token as (
  role text,
  exp integer,
  user_id UUID
);

CREATE FUNCTION app_private.current_user_id() returns UUID as $$
  select nullif(current_setting('jwt.claims.user_id', true), '')::UUID;
$$ language sql stable;



--
CREATE TABLE IF NOT EXISTS app_private.person_account(
    user_id UUID REFERENCES app_hidden.user(id),
    login text NOT NULL,
    role text DEFAULT 'app_user',
    password_hash text NOT NULL, 
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE FUNCTION app_public.authenticate(
  login   text,
  password text
) RETURNS app_public.jwt_token as $$
DECLARE
  account app_private.person_account;
BEGIN
  SELECT a.* INTO account
  FROM app_private.person_account as a
  WHERE a.login = authenticate.login;

  IF account.password_hash = crypt(password,  account.password_hash) THEN
    RETURN (
      account.role,
      extract(epoch from now() + interval '7 days'),
      account.user_id
    )::app_public.jwt_token;
  ELSE
    RETURN NULL;
  END IF;
END;
$$ language plpgsql strict security definer;

END;

GRANT EXEC ON FUNCTION app_public.authenticate() TO app_user;