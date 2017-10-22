FROM node

WORKDIR /teyler-bot


COPY ./package.json ./package.json
COPY ./dist ./dist
COPY ./node_modules ./node_modules

RUN npm run install-ffmpeg

ENV NAME=Teyler-Bot
ENV DISCORD_KEY=
ENV PATH="$PATH:./node_modules/.bin/"

CMD ["node", "dist/index.js"]