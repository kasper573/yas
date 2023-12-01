# API

A [tRPC](https://trpc.io/) based API. Deployed as a serverless function on Vercel.

The package exposes its root router type only, no runtime code.

## House rules

- Must be stateless.
- Facade only. No business logic.
- Each module must be a separate folder under `src/modules`.
