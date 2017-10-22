# Teyler-Bot
A discord bot for a small server of the best guy!

## Setup
* Create a bot on discord, and get its token.
* Fill token in `tokens-example.env` and save as `tokens.env`
* Install all dependecies
```bash
npm install
```

## Run Standalone
```bash
npm start
```

## Run with Docker
* Install docker, and docker-compose
* Build Docker Image
```bash
docker build -t teyler-bot .
```
* Run Docker Image
```bash
docker-compose up
```
*** `docker-compose up` must be run in the same directory as `docker-compose.yml` and `tokens.env`