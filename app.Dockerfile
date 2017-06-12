FROM node:8.1.0
MAINTAINER Oleg Gromov <hi@oleggromov.com>

# takes env from docker-compose.yml
ARG NODE_ENV
# passes it to a build stage
ENV NODE_ENV $NODE_ENV

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
# figure out how to deal with it
RUN npm --production=false install
RUN npm install -g nodemon
RUN npm run build

EXPOSE 3000

CMD npm run express-noupdate
