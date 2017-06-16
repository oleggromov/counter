FROM mysql:5.7
LABEL maintainer Oleg Gromov <hi@oleggromov.com>

ADD ./docker/mysql-init/* /docker-entrypoint-initdb.d/
