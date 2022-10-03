# ScratchNow

## Description

API server based on Express framework and Typescript.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# local
$ npm run start
# development
$ pm2 start ecosystem.config.js --env development
# production
$ pm2 start ecosystem.config.js --env production
```

## Migration

```bash
$ npm run migrate
```

## Docker

```bash
$ docker-compose up -d
```