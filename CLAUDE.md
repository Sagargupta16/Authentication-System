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
- **Framework**: Express 5 (server) + React 19 on Vite 8 (client)
- **Database**: MongoDB via Mongoose 8
- **Package manager**: npm (package-lock.json committed, both root and client/)
- **Deploy target**: local-only (no CI workflows, no hosting config)

## Run

```
npm install && npm run frontend-install
npm run dev          # backend (nodemon, :8080) + client (Vite, :3000) concurrently
npm run prod-build   # install everything + build client to client/build
```

## Test

No server test suite (`npm test` is the default error stub). The client has no test runner (testing-library is installed but unused since the move off CRA).

## Entry points

- `index.js` -- Express server: dotenv, Mongo connect, CORS, mounts routes, serves `client/build` statically
- `client/src/index.jsx` -- React app bootstrap; routing in `client/src/App.jsx`; `client/vite.config.js` holds the dev port, the `/api` proxy to 8080 and `build/` as the output dir

## Key files

- `models/user.js` -- Mongoose user schema, JWT generation, password validation
- `routes/users.js` -- registration; `routes/auth.js` -- login
- `db.js` -- Mongo connection (reads `DB` env var)

## Gotchas

- Backend defaults to port 8080 (`index.js:20`) and the client proxy targets 8080; the README says 5000 -- trust the code.
- `.env` required before the server does anything useful: `DB`, `JWTPRIVATEKEY`, `PORT`, `SALT`. See `.env.example`.
- `express.static("./client/build")` is registered after `app.listen`, and only exists after `npm run frontend-build`.
- The client moved from react-scripts 5 to Vite in 1.3.0; its CVE `overrides` block went with react-scripts (`npm audit` reports 0).

## Repo-specific rules

- Server is CommonJS (`require`) and the client is ESM on Vite -- match each side's style.
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
