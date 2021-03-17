FROM node:14.16.0

RUN mkdir /server

WORKDIR /server

COPY package*.json ./

RUN npm install -g typeorm
RUN npm install

COPY . .

EXPOSE 4000

CMD npm run start:dev