USE `counter_0_1`;

# first truncating everything
DELETE FROM `items`;
ALTER TABLE `items` AUTO_INCREMENT=1;
DELETE FROM `lists`;
ALTER TABLE `lists` AUTO_INCREMENT=1;

# then reinserting
INSERT INTO `lists` (`name`)
	VALUES ('L.A. & California');

DELETE FROM `items`;
INSERT INTO `items` (`list_id`, `name`, `date`, `value`)
	VALUES (1, 'A dinner in a Thai place', '2017-04-17 18:33:01', 23.13);
