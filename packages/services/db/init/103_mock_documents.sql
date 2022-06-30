\connect kedo;

INSERT INTO app_hidden."Document" (
	created_at, created_by_user_id, document_type_id, belongs_to_user_id, title, is_actionable)
	VALUES 
    ('2022-04-17', 1, 'REQUEST_FOR_VACATION', 2, 'asd', TRUE),
    ('2022-05-23', 1, 'REQUEST_FOR_VACATION', 2, 'asd', TRUE),
    ('2022-05-23', 1, 'BUISINESS_TRIP',       2, 'asd', TRUE),
    ('2022-05-23', 1, 'REQUEST_FOR_VACATION', 2, 'asd', TRUE),
    ('2022-05-23', 1, 'BUISINESS_TRIP',       2, 'asd', TRUE),
    ('2022-05-23', 1, 'REQUEST_FOR_VACATION', 2, 'asd', TRUE),
    ('2022-05-23', 1, 'LNA',                  2, 'asd', TRUE),
    ('2022-05-23', 1, 'REQUEST_FOR_VACATION', 2, 'asd', TRUE),
    ('2022-05-23', 1, 'LNA',                  2, 'asd', TRUE)
