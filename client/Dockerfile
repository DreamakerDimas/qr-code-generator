FROM node:14.16.0

RUN mkdir /client

WORKDIR /client

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD npm run start