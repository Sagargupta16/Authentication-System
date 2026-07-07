# CLAUDE.md

> This file stacks on top of the workspace root at `C:\Code\GitHub\`:
>
> - Root [`CLAUDE.md`](../../CLAUDE.md) -- voice, rules, routing map, references, skills, slash commands, conventions.
> - Root [`MEMORY.md`](../../MEMORY.md) -- live facts across repos.
> - Root [`STATUS.md`](../../STATUS.md) -- live PR/CI/security dashboard.
> - [`.claude/resources/`](../../.claude/resources/README.md) -- deep reference for collaboration, workflow, git, OSS, debugging, voice.
>
> Read those first. The guidance below only adds **repo-specific context** -- it does not override anything in the root.

## Project

Reusable MERN authentication module: JWT login/registration with Joi password-complexity validation and bcrypt hashing.

Portfolio/demo repo, no live deployment.

## Stack

- **Language**: JavaScript (Node, CommonJS on server; JSX on client)
- **Framework**: Express 5 (server) + React 19 via react-scripts/CRA (client)
- **Database**: MongoDB via Mongoose 8
- **Package manager**: npm (package-lock.json committed, both root and client/)
- **Deploy target**: local-only (no CI workflows, no hosting config)

## Run

```
npm install && npm run frontend-install
npm run dev          # backend (nodemon, :8080) + client (CRA, :3000) concurrently
npm run prod-build   # install everything + build client to client/build
```

## Test

No server test suite (`npm test` is the default error stub). Client has CRA's `react-scripts test` with testing-library installed but no meaningful tests.

## Entry points

- `index.js` -- Express server: dotenv, Mongo connect, CORS, mounts routes, serves `client/build` statically
- `client/src/index.js` -- React app bootstrap; routing in `client/src/App.js`

## Key files

- `models/user.js` -- Mongoose user schema, JWT generation, password validation
- `routes/users.js` -- registration; `routes/auth.js` -- login
- `db.js` -- Mongo connection (reads `DB` env var)

## Gotchas

- Backend defaults to port 8080 (`index.js:20`) and the client proxy targets 8080; the README says 5000 -- trust the code.
- `.env` required before the server does anything useful: `DB`, `JWTPRIVATEKEY`, `PORT`, `SALT`. See `.env.example`.
- `express.static("./client/build")` is registered after `app.listen`, and only exists after `npm run frontend-build`.
- `client/package.json` carries a large `overrides` block pinning transitive CVEs under react-scripts 5 -- do not strip it.

## Repo-specific rules

- Server is CommonJS (`require`) and client is CRA -- match that style; do not convert to ESM/Vite unless Sagar asks for a migration.
- npm here, not pnpm (lockfiles are npm).

## Routes / Pages

- `/` -- Main (only when `token` in localStorage, else redirects to `/login`)
- `/signup` -- registration form
- `/login` -- login form

## API routes

- `POST /api/users` -- register (firstName, lastName, email, password)
- `POST /api/auth` -- login, returns JWT in `data`

## Auth

- JWT (jsonwebtoken), 7-day expiry, signed in `models/user.js`
- Client stores token in localStorage
- Required env vars: `JWTPRIVATEKEY`, `SALT` (bcrypt rounds)
