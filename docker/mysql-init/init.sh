#!/bin/bash
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE;"
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "ALTER DATABASE $MYSQL_DATABASE DEFAULT CHARSET 'utf8' DEFAULT COLLATE 'utf8_general_ci';"
mysql -u root -p"$MYSQL_ROOT_PASSWORD" $MYSQL_DATABASE < /docker-entrypoint-initdb.d/init.sql.hidden
