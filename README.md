# Teyler-Bot
A discord bot for a small server of the best guy!
## Standalone Setup
* Install all dependecies
```bash
npm install
```
* Create a bot on discord, and get its token, set `DISCORD_TOKEN` environment variable to the token value
### Run
```bash
npm start
```

## Docker Setup
* Create a bot on discord, and get its token, modify `docker-compose-example.yml` and rename to `docker-compose.yml`
* install docker, and docker-compose
### Build Docker Image
```bash
docker build -t teyler-bot .
```
### Run Docker Image
```bash
docker-compose up
```