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

INSERT INTO app_hidden.payslip (owner_user_id, period, file_id)
VALUES (atolk_user_id, '2022-05-30', '/sample.pdf'),
        (atolk_user_id, '2022-04-30', '/sample.pdf'),
        (atolk_user_id, '2022-03-30', '/sample.pdf'),
        (atolk_user_id, '2022-02-28', '/sample.pdf'),
        (atolk_user_id, '2022-01-30', '/sample.pdf');

END;
$$;