FROM mysql:5.7
MAINTAINER Oleg Gromov <hi@oleggromov.com>

ADD ./server/sql/init.sql /docker-entrypoint-initdb.d/
