USE `counter_0_1`;

# first truncating everything
DELETE FROM `items`;
ALTER TABLE `items` AUTO_INCREMENT=1;
DELETE FROM `permissions`;
ALTER TABLE `permissions`;
DELETE FROM `lists`;
ALTER TABLE `lists` AUTO_INCREMENT=1;
DELETE FROM `users`;
ALTER TABLE `users` AUTO_INCREMENT=1;

# then reinserting
INSERT INTO `users`
	(`id`, `facebookId`)
VALUES
	(1, '791098587715628'), # my real profile id
	(2, '100268950556013'); # test profile id

INSERT INTO `lists`
	(`id`, `name`)
VALUES
	(1, 'L.A. & California'),
	(2, 'Italy: Milan and 9 cities');

INSERT INTO `permissions`
	(`userId`, `listId`)
VALUES
	(1, 2),
	(2, 1);

INSERT INTO `items`
	(`listId`, `name`, `date`, `value`)
VALUES
	(1, 'ticket to Thailand', 1483034400000, 351.5),
	(1, 'coffee', 1490720400000, 4.95),
	(1, 'dinner at thai restaurant', 1493020226000, 16),
	(1, 'test', 1493099956000, 5),
	(1, 'coffee', 1493249052000, 6.5),
	(1, 'coffee again', 1493275677000, 4),
	(1, 'a car', 1493275828000, 20500),
	(1, 'a very long line that will never fit into the screen because of its length', 1493275844000, 15),
	(1, 'I\'m a new guy', 1493335354000, 25),
	(1, 'I\'m a brand new item', 1493335565000, 5),
	(1, 'me too', 1493335574000, 40),
	(1, 'and I am also', 1493335582000, 2),
	(1, 'tell me the story', 1493335606000, 5),
	(1, 'another one', 1493335655000, 2),
	(1, 'test', 1493342815000, 25),
	(1, 'super duper test', 1493342821000, 255),
	(1, 'test', 1493342842000, 25),
	(1, 'some huge amount of money', 1493342850000, 1249),
	(1, 'another one test', 1493342880000, 24),
	(1, 'and another one', 1493342888000, 115),
	(1, 'coffee', 1493424601000, 6.5),
	(1, 'test', 1493450108000, 5),
	(1, 'test', 1493453754000, 100),
	(1, 'pasta in pasta sisters', 1493456187000, 15.45),
	(1, 'my favorite latte', 1493456191000, 6.5),
	(1, 'test', 1493500808000, 1),
	(1, '2', 1493505030000, 1),
	(1, 'test', 1493516852000, 5),
	(1, 'coffee test', 1493518884000, 6.5),
	(1, 'test', 1493525960000, 125),
	(1, 'tst', 1493526087000, 124),
	(1, 'test', 1493526110000, 215),
	(1, 'test', 1493526121000, 215),
	(1, 'test', 1493526146000, 125),
	(1, 'test', 1493530468000, 5),
	(1, 'test', 1493531454000, 6.5),
	(1, 'fucking expensive breakfast', 1493590447000, 17.5),
	(1, 'fucking burger', 1493614893000, 27.5),
	(1, 'coffee and a sandwich', 1493833500000, 18.99),
	(2, 'Ticket Milan - Rome', 1478022300000, 25.50),
	(2, 'Coffee in Rome', 1478031900000, 4.20);
