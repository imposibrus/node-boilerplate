FROM node:12.22.4-buster-slim

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci

COPY . /app

CMD ["npm", "run", "start"]
