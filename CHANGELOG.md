# Changelog

## [1.3.0] - 2026-10-13

- Move the client from Create React App (react-scripts 5) to Vite 8: same dev port (3000), same `/api` proxy to 8080, same `client/build` output the server serves
- Clears all 5 open Dependabot alerts (svgo, braces, sprintf-js), which only reached the app through react-scripts; the CRA overrides block is gone and `npm audit` reports 0
- Align the root package.json version with the changelog (was 1.0.0)

## [1.2.0] - 2026-03-14

- Add .env.example with placeholder values

## [1.1.0] - 2026-03-07

- Fix security vulnerabilities via npm audit fix
- Configure Renovate for monthly grouped updates

## [1.0.0] - 2026-02-22

- Upgrade to React 19 and Joi 18
- Add comprehensive project documentation to README

## [0.1.0] - 2022-07-13

- Initial MERN authentication system
- JWT-based login/registration with bcrypt password hashing
- Password complexity validation
- React frontend with Login, Signup, and Main components
