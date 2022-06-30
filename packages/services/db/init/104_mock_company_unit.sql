DO LANGUAGE plpgsql $$

DECLARE atolk_user_id UUID;
DECLARE top_unit_id UUID;

DECLARE json jsonb = $json$
{
    "userId": "ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47",
    "requestType": "VACATION",
    "taskList": ["lera@kedo-team.ru", "anton@kedo-team.ru"],
    "payload": {
        "fromDate": "2019-12-12",
        "tDate": "2020-01-13",
        "isPayable": true
    }
 } 
$json$;
BEGIN

select id into atolk_user_id from app_hidden.user where email = 'anton@kedo-team.ru';

INSERT INTO app_hidden.company_unit (parent_id, title, description, head_user_id)
VALUES (null, 'АО "kedo-team"', null, atolk_user_id)
RETURNING id INTO top_unit_id;

INSERT INTO app_hidden.company_unit (parent_id, title, description, head_user_id)
VALUES (top_unit_id, 'Департамент цифровых сервисов', '', atolk_user_id),
      (top_unit_id, 'Департамент маркетинга и продаж', '', atolk_user_id),
      (top_unit_id, 'Департамент финансов', '', atolk_user_id);


END;
$$;