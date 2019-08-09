#Base Image
FROM node:12-alpine as base

WORKDIR /teyler-bot

RUN apk add --update yarn

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

#Builder
FROM base as builder

RUN apk update && apk upgrade && apk add --no-cache git python make g++

COPY ./src ./src
COPY ./tsconfig.json tsconfig.json
COPY ./tslint.json tslint.json

RUN yarn install --network-timeout 1000000
RUN yarn run build
RUN yarn run install-ffmpeg

#Tester
FROM builder as tester 

RUN yarn run test

#Production
FROM base as final

WORKDIR /teyler-bot

COPY --from=builder ./teyler-bot/dist ./dist
COPY --from=builder ./teyler-bot/node_modules ./node_modules

ENV PATH="$PATH:./node_modules/.bin/"

CMD ["node", "dist/index.js"]
