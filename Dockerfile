FROM node

WORKDIR /teyler-bot

COPY ./dist ./dist
COPY ./node_modules ./node_modules
COPY ./package.json ./package.json

ENV NAME=Teyler-Bot
ENV DISCORD_KEY=

CMD ["node", "dist/index.js"]