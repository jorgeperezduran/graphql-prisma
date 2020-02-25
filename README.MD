# GraphQL Sample API with Prisma + PostgreSQL

This repository contains a sample Graphql API developed with Prisma using a PostgreSQL Database.
This API contains different Queries and mutations which can be used as training in Graphql

## Requirements

- Node.js is installed to your local system
- Docker is installed in your local system
- PostgresQL installed in your local system or change configuration in docker-compose.yml to point to a docker postgresql image
- Yarn Installed

## Usages

At the first, clone or download this dir. Then install dependencies.
Run the following commands in root directory:

```bash
$ npm install -g prisma
$ npm install
$ yarn global add graphql-cli
$ docker-compose up -d
```

Go inside prisma folder and run:
```bash
$ prisma deploy
```

Go to my-yoga-server root directory and run:
```bash
$ graphql get-schema --project prisma
```

Expose the GraphQL API:
Go to my-yoga-server root directory and run:
```bash
$ node src/index.js
```
Graphql Playground will be available in http://localhost:4000


The package.json located in my-yoga-server folder has the following dependencies:

- [graphql-yoga] Fully-featured GraphQL Server with focus on easy setup, performance & great developer experience
- [prisma-binding]GraphQL Binding for Prisma (using GraphQL schema delegation)


## Docker files
  - `docker-compose.yml` : settings to run prisma and postgres container
