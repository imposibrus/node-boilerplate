# node-boilerplate

A backend-only template for the Node.js project.

## Tech stack

- Node.js, Express
- Typescript
- Mocha, Should, Nyc, Supertest
- Redis
- Docker, Docker Compose, dotenv
- Postgresql, Sequelize
- Gulp

## Installation

- `git clone git@gitlab.codezavod.ru:Codezavod-Projects/node-boilerplate.git && cd node-boilerplate`
- `npm ci`
- `cp deploy/example.env deploy/.env`

## Production Run

- `# fill deploy/.env file with production values`
- `docker-compose -f deploy/docker-compose.yml up -d`
- `docker-compose -f deploy/docker-compose.yml run --rm web npm start -- db:migrate`

## Development

- `# fill deploy/.env file with local values`
- `docker-compose -f deploy/docker-compose.yml up -d`
- `npm start -- db:migrate`
- `npm run dev`

## Test

- You should create test DB (only once, at first time):
    ```bash
    docker-compose -f deploy/docker-compose.yml exec -u postgres db bash -c \
      'psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -c \
        \'CREATE DATABASE "node-boilerplate_test";\''
    docker-compose -f deploy/docker-compose.yml exec -u postgres db bash -c \
      'psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -c \
        \'GRANT ALL PRIVILEGES ON DATABASE "node-boilerplate_test" TO \'\""$CUSTOM_POSTGRES_USER"\"\';\''
    ```
- Run tests: `npm test`


## Directory structure:
```
|
|- src/                   - sources folder
|---- bin/
|------- www              - entry point. main executable
|---- controllers/        - controllers for routes
|---- lib/                - common libraries
|---- models/             - DB models
|---- routes/             - site routes
|- node_modules/          - third-party back-end modules
|- public/                - site public files
|- test/                  - unit-tests for some libraries
```
