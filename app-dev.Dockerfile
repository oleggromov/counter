FROM node:8.1.0
MAINTAINER Oleg Gromov <hi@oleggromov.com>

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# ARG NODE_ENV
# ENV NODE_ENV $NODE_ENV
COPY . /usr/src/app
RUN npm install -g nodemon
RUN npm install && npm cache clean --force
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
