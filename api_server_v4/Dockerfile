FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8088
CMD [ "node", "mute_api_server.js" ]
