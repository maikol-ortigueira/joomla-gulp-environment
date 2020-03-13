DROP TABLE IF EXISTS `#__client_views`;

DELETE FROM `#__content_types` WHERE (type_alias LIKE 'com_client.%');