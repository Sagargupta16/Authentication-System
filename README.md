# Authentication System

A full-stack authentication system built with the MERN stack, featuring secure JWT-based login/registration with password complexity validation.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

## Overview

A production-ready authentication system implementing industry-standard security practices. Features user registration with enforced password complexity, email/password login with JWT token generation, and bcrypt password hashing. Built as a reusable auth module for MERN stack applications.

## Features

- **User Registration** -- Sign up with email, first name, last name, and password
- **Password Complexity Enforcement** -- Joi-based validation requiring minimum length, uppercase, lowercase, numbers, and symbols
- **JWT Authentication** -- Secure token generation with 7-day expiry
- **Password Hashing** -- Bcrypt-based password hashing for secure storage
- **Protected Routes** -- Token-verified access to protected resources
- **Input Validation** -- Server-side validation using Joi schemas
- **CORS Enabled** -- Cross-origin resource sharing for frontend communication

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, React Router, CSS Modules |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose ODM |
| Auth | JWT (jsonwebtoken), Bcrypt |
| Validation | Joi, joi-password-complexity |
| Config | dotenv, CORS |

## Project Structure

```
Authentication-System/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Login/       # Login form component
│       │   ├── Main/        # Main/dashboard component
│       │   └── Signup/      # Registration form component
│       ├── App.js
│       └── index.js
├── models/
│   └── user.js              # Mongoose user schema with JWT generation
├── routes/
│   ├── auth.js              # Login/authentication endpoints
│   └── users.js             # User registration endpoints
├── db.js                    # MongoDB connection configuration
├── index.js                 # Express server entry point
├── .env                     # Environment variables (not committed)
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 16+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Sagargupta16/Authentication-System.git
cd Authentication-System

# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DB=mongodb://localhost:27017/auth-system   # MongoDB connection string
JWTPRIVATEKEY=your_jwt_secret_key          # JWT signing key
PORT=5000                                   # Server port
SALT=10                                     # Bcrypt salt rounds
```

### Running the Application

```bash
# Start both backend and frontend concurrently
npm run dev

# Or start separately:
npm start              # Backend only (port 5000)
cd client && npm start # Frontend only (port 3000)
```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users` | Register a new user | No |
| POST | `/api/auth` | Login and get JWT token | No |

### Register User

```json
POST /api/users
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### Login

```json
POST /api/auth
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Logged in successfully"
}
```

## Security

- Passwords are hashed with bcrypt before storage
- JWT tokens expire after 7 days
- Password complexity enforced: min 8 chars, uppercase, lowercase, numbers, symbols
- Input sanitization via Joi validation schemas
- CORS configured for frontend origin

## License

MIT
