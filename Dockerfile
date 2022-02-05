FROM node:16.13.0-alpine

RUN apk add --no-cache python3 g++ make

WORKDIR /usr/src/kanban-dnd

COPY . .

RUN yarn install && yarn build

ENV NODE_ENV=production
CMD [ "yarn", "server:start" ]
EXPOSE 3000