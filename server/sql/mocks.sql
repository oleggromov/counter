USE `counter_0_1`;

# first truncating everything
DELETE FROM `items`;
ALTER TABLE `items` AUTO_INCREMENT=1;
DELETE FROM `lists`;
ALTER TABLE `lists` AUTO_INCREMENT=1;

# then reinserting
INSERT INTO `lists`
	(`name`)
VALUES
	('L.A. & California'),
	('Italy: Milan and 9 cities');

# LocalStorage data to SQL value strings:
#
# data.lists.items[0].items
#   .reverse()
#   .reduce((acc, item) => {
#     const newStr = `(1, '${item.type}', '${item.date}', ${item.value}),\n`
#     return acc + newStr
#   }, '')
INSERT INTO `items`
	(`listId`, `name`, `date`, `value`)
VALUES
	(1, 'ticket to Thailand', '2016-12-29 10:00', 351.5),
	(1, 'coffee', '2017-03-28 10:00', 4.95),
	(1, 'dinner at thai restaurant', '2017-04-24 00:50:26', 16),
	(1, 'test', '2017-04-24 22:59:16', 5),
	(1, 'coffee', '2017-04-26 16:24:12', 6.5),
	(1, 'coffee again', '2017-04-26 23:47:57', 4),
	(1, 'a car', '2017-04-26 23:50:28', 20500),
	(1, 'a very long line that will never fit into the screen because of its length', '2017-04-26 23:50:44', 15),
	(1, 'I\'m a new guy', '2017-04-27 16:22:34', 25),
	(1, 'I\'m a brand new item', '2017-04-27 16:26:05', 5),
	(1, 'me too', '2017-04-27 16:26:14', 40),
	(1, 'and I am also', '2017-04-27 16:26:22', 2),
	(1, 'tell me the story', '2017-04-27 16:26:46', 5),
	(1, 'another one', '2017-04-27 16:27:35', 2),
	(1, 'test', '2017-04-27 18:26:55', 25),
	(1, 'super duper test', '2017-04-27 18:27:01', 255),
	(1, 'test', '2017-04-27 18:27:22', 25),
	(1, 'some huge amount of money', '2017-04-27 18:27:30', 1249),
	(1, 'another one test', '2017-04-27 18:28:00', 24),
	(1, 'and another one', '2017-04-27 18:28:08', 115),
	(1, 'coffee', '2017-04-28 17:10:01', 6.5),
	(1, 'test', '2017-04-29 00:15:08', 5),
	(1, 'test', '2017-04-29 01:15:54', 100),
	(1, 'pasta in pasta sisters', '2017-04-29 01:56:27', 15.45),
	(1, 'my favorite latte', '2017-04-29 01:56:31', 6.5),
	(1, 'test', '2017-04-29 14:20:08', 1),
	(1, '2', '2017-04-29 15:30:30', 1),
	(1, 'test', '2017-04-29 18:47:32', 5),
	(1, 'coffee test', '2017-04-29 19:21:24', 6.5),
	(1, 'test', '2017-04-29 21:19:20', 125),
	(1, 'tst', '2017-04-29 21:21:27', 124),
	(1, 'test', '2017-04-29 21:21:50', 215),
	(1, 'test', '2017-04-29 21:22:01', 215),
	(1, 'test', '2017-04-29 21:22:26', 125),
	(1, 'test', '2017-04-29 22:34:28', 5),
	(1, 'test', '2017-04-29 22:50:54', 6.5),
	(1, 'fucking expensive breakfast', '2017-04-30 15:14:07', 17.5),
	(1, 'fucking burger', '2017-04-30 22:01:33', 27.5),
	(1, 'coffee and a sandwich', '2017-05-03 10:45:00', 18.99),
	(2, 'Ticket Milan - Rome', '2016-11-01 10:45:00', 25.50),
	(2, 'Coffee in Rome', '2016-11-01 13:25', 4.20);
