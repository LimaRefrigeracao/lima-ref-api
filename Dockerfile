FROM node:latest

WORKDIR /src/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "start"]