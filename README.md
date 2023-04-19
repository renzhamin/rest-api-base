This repo is meant to demonstrate how authentication and authorization can be done in a rest api using jsonwebtoken.

You can read the full tutorial [here](https://dev.to/renzhamin/authenticate-and-protect-rest-api-routes-with-jwt-and-refersh-token-rotation-1lg5)

To get started,

Install all packages

```bash
npm clean-install
```

Generate the prisma client and sync the schema to the database

```bash
npx prisma generate
npx prisma migrate dev --name "init"
```

Run the server

```
npm run dev
```
