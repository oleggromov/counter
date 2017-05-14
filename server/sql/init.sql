# as root
# CREATE USER 'counter'@'localhost' IDENTIFIED BY '';
# GRANT ALL PRIVILEGES ON `counter_0_1` . * TO 'counter'@'localhost';
# FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS `counter_0_1`
	DEFAULT CHARSET `utf8`
	DEFAULT COLLATE `utf8_general_ci`;

USE `counter_0_1`;

DROP TABLE `items`;
DROP TABLE `lists`;
DROP TABLE `users`;

CREATE TABLE IF NOT EXISTS `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`facebookId` VARCHAR(128) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `lists` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`userId` INT NOT NULL,
	`name` TEXT NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`)
);

CREATE TABLE IF NOT EXISTS `items` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`listId` INT NOT NULL,
	`userId` INT NOT NULL,
	`name` TEXT NOT NULL,
	`date` DATETIME NOT NULL,
	`value` DECIMAL(10,2) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`listId`) REFERENCES `lists`(`id`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`)
);

