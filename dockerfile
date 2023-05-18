FROM node:16.9.1

WORKDIR /app

COPY . /app

RUN yarn install

VOLUME [ "/app/contract.json", "/app/.env", "/app/src/abis"]

CMD ["yarn", "start"]


