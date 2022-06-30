\connect kedo;


DO $$
DECLARE user_id UUID;
DECLARE min_req_type_index int = 1;
DECLARE max_req_type_index int;
DECLARE 
BEGIN
    SELECT count(*) FROM app_hidden.request_type INTO max_req_type_index;

    SELECT u.id FROM app_public.user u INTO user_id 
    WHERE u.email = 'anton@kedo-team.ru';
    
    RAISE NOTICE 'user_id: %', user_id;
    RAISE NOTICE '%', floor(random()*(max_req_type_index-min_req_type_index+1))+min_req_type_index;
    
    

end$$;


