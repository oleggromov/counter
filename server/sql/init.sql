# as root
# CREATE USER 'counter'@'localhost' IDENTIFIED BY '';
# GRANT ALL PRIVILEGES ON `counter_0_1` . * TO 'counter'@'localhost';
# FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS `counter_0_1`;
ALTER DATABASE `counter_0_1`
	DEFAULT CHARSET `utf8`
	DEFAULT COLLATE `utf8_general_ci`;

USE `counter_0_1`;

DROP TABLE IF EXISTS `items`;
DROP TABLE IF EXISTS `permissions`;
DROP TABLE IF EXISTS `lists`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`facebookId` VARCHAR(128) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `lists` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` TEXT NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `permissions` (
	`userId` INT NOT NULL,
	`listId` INT NOT NULL,
	PRIMARY KEY (`userId`, `listId`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`),
	FOREIGN KEY (`listId`) REFERENCES `lists`(`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `items` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`listId` INT NOT NULL,
	`name` TEXT NOT NULL,
	`date` DATETIME NOT NULL,
	`value` DECIMAL(10,2) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`listId`) REFERENCES `lists`(`id`)
) ENGINE=InnoDB;

