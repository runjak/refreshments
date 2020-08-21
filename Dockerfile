FROM node:14-alpine

LABEL repo="https://github.com/runjak/refreshments"

COPY package.json index.js /

RUN yarn install

CMD ["node", "index.js"]
