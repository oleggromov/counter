# as root
# CREATE USER 'counter'@'localhost' IDENTIFIED BY '';
# GRANT ALL PRIVILEGES ON counter_0_1 . * TO 'counter'@'localhost';

CREATE DATABASE IF NOT EXISTS `counter_0_1`
	DEFAULT CHARSET `utf8`
	DEFAULT COLLATE `utf8_general_ci`;

USE `counter_0_1`;

CREATE TABLE IF NOT EXISTS `lists` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `items` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`list_id` INT NOT NULL,
	`name` TEXT NOT NULL,
	`date` DATETIME NOT NULL,
	`value` DECIMAL(10,2) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`list_id`) REFERENCES `lists`(`id`)
);
