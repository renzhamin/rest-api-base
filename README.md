This repo is meant to demonstrate how to implement password reset functionality with jwt

You can read the full tutorial [here](https://dev.to/renzhamin/resetforgot-password-on-a-rest-api-with-jsonwebtoken-jwt-in-express-6i9)

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
