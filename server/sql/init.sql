# as root
# CREATE USER 'counter'@'localhost' IDENTIFIED BY '';
# GRANT ALL PRIVILEGES ON `counter_0_1` . * TO 'counter'@'localhost';
# FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS `counter_0_1`;
ALTER DATABASE `counter_0_1`
	DEFAULT CHARSET `utf8`
	DEFAULT COLLATE `utf8_general_ci`;

USE `counter_0_1`;

# use contents of ./docker/mysql-init/init.sql.hidden
