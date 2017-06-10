FROM mysql/mysql-server:5.7
MAINTAINER Oleg Gromov <hi@oleggromov.com>

ENV MYSQL_RANDOM_ROOT_PASSWORD yes

ADD ./server/sql/init.sql /docker-entrypoint-initdb.d/
