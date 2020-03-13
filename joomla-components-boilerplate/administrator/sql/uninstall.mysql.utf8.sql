DROP TABLE IF EXISTS `#__[component]_[plural]`;

DELETE FROM `#__content_types` WHERE (type_alias LIKE 'com_[component].%');