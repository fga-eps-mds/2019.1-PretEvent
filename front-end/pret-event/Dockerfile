FROM node:9.11.2-slim

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json

RUN npm i npm@latest -g
RUN npm install
RUN npm audit fix

COPY . /usr/src/app

CMD ng serve --host 0.0.0.0 --proxy-config proxy.config.json
