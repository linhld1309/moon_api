FROM node:16.18.0

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm i bcrypt

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
