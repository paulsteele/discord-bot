#Base Image
FROM node:carbon-alpine as base

WORKDIR /teyler-bot

COPY ./package.json ./package.json

#Builder
FROM base as builder 

RUN apk update && apk upgrade && apk add --no-cache git python make g++

COPY ./src ./src
COPY ./.babelrc ./.babelrc
COPY ./.eslintignore ./.eslintignore
COPY ./.eslintrc.json ./.eslintrc

RUN npm install 
RUN npm run build
RUN npm run install-ffmpeg

#Tester
FROM builder as tester 

RUN npm run test -- --coverage

#Production
FROM base as final

WORKDIR /teyler-bot

COPY --from=builder ./teyler-bot/dist ./dist
COPY --from=builder ./teyler-bot/node_modules ./node_modules

ENV PATH="$PATH:./node_modules/.bin/"

CMD ["node", "dist/index.js"]