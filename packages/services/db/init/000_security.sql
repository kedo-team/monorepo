BEGIN

-- creating graphql service role with login
CREATE ROLE graph_api_service INHERIT
LOGIN PASSWORD 'ZRS~,rKpHYr6EZT@';

-- app_user role.
CREATE ROLE app_user;

-- permissions inheretance
GRANT app_user TO graph_api_service;


CREATE ROLE wf_api_service LOGIN PASSWORD ';me:hys8sZST7q=J'