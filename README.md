# Coffee shop

NestJS GraphQL API example with unit and e2e tests.

I use `pnpm` as my node manager, you can use whatever you like, simply remove the pnpm-lock.yaml file and use `npm|yarn` instead.

## Scripts

The following scripts are here to help you get up and running in a development environment as quickly as possible.

### Installation

```bash
$ pnpm install
```

### Running the database with docker

Example .env file

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=super-secret-secure-password
POSTGRES_DB=coffedb

# Prisma
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public

# CORS
ALLOWED_ORIGINS=http://localhost:3000/
```

Then run

```bash
# start the docker db
$ pnpm start:dev:db
```

### Seeding the database

```bash
# migrate the schema
$ pnpx prisma migrate deploy

# seed the database
$ pnpx prisma db seed
```

### Gerating GraphQL Types

```bash
$ ts-node generate-typings.ts
```

### Running the project in development mode

```bash
# Will run on port 5000
$ pnpm start:dev
```

### GrapqhQL Playground (Apollo Studio)

Open `http://localhost:5000/graphql`

### Test

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```
