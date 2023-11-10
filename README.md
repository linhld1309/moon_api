## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
## Migrate DB

$ yarn migrate

$ yarn graphql

$ npx prisma db pull
$ npx prisma db push

<!-- 
generate JWT_SECRET
$ node -e "console.log(require('crypto').randomBytes(20).toString('base64'));"
 -->
