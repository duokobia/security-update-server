
# Security Update Server

A secure and modular RESTful API server built with **Node.js**, **Express**, **TypeScript**, **JWT authentication**, and documented using **Swagger**. It features comprehensive user authentication, real-time conflict data analytics, and full API documentation.


## Features

- User authentication (`register`, `login`, `logout`)
- JWT-based protected routes
- Analytics and conflict data endpoints
- Organized controller, route, and middleware structure
- Swagger API documentation
- Environment variable support (`.env`)
- MongoDB integration (via `connectDB`)


## Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB / Mongoose**
- **JWT (JSON Web Token)**
- **Swagger (OpenAPI)**
- **dotenv**


## Project Structure

```bash
src/
│
├── controllers/        # Route handlers
├── routes/             # Express route definitions
├── middleware/         # Custom middleware (e.g., JWT auth)
├── database/           # MongoDB connection logic
├── utils/              # Helper functions (optional)
├── swagger.ts          # Swagger setup
└── index.ts            # App entry point
````


## API Endpoints Overview

| Method | Endpoint                            |  Description                  |
| ------ | ----------------------------------- |  ---------------------------- |
| POST   | `/api/v1/auth/users/register`       |  Register a new user          |
| POST   | `/api/v1/auth/users/login`          |  Log in and receive JWT token |
| POST   | `/api/v1/auth/users/logout`         |  Log out (client deletes JWT) |
| GET    | `/api/v1/auth/users`                |  Get all users                |
| GET    | `/api/v1/auth/users/:id`            |  Get user by ID               |
| GET    | `/api/v1/analytics`                 |  Get analytics data           |
| GET    | `/api/v1/conflicts`                 |  Get all conflict data        |
| GET    | `/api/v1/conflicts/{region}`        |  Filter conflicts by region   |
| GET    | `/api/v1/conflicts/data/bar`        |  Get bar chart data           |
| GET    | `/api/v1/conflicts/data/timeseries` |  Get timeseries data          |

---

## Authentication

This project uses **JWT (JSON Web Token)** for securing protected routes.

* After login, the client must store the JWT (e.g., in `localStorage`, `cookie`, etc.)
* All protected routes expect the token in the `Authorization` header:

```http
Authorization: Bearer <your-token-here>
```

---

## Swagger Documentation

Swagger UI is available at:

```
http://localhost:3000/api-docs
```

It provides a complete, interactive API reference.

---

## Getting Started

### Prerequisites

* Node.js 16+
* MongoDB 4.4+
* npm or yarn

### 1. Clone the repo

```bash
git clone https://github.com/duokobia/security-update-server.git
cd security-update-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/security-db
JWT_SECRET=your_jwt_secret
```

### 4. Run the server

#### In development mode (with hot reload):

```bash
npm run dev
```

#### In production mode:

```bash
npm run build
npm start
```

---

## Testing with Postman

* Import the Swagger/OpenAPI spec from `http://localhost:3000/api-docs` (Postman supports this)
* Or manually create requests using the endpoint list above
* Don’t forget to add the JWT in the `Authorization` header for protected routes

---

## Scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Start server with hot reload  |
| `npm run build` | Compile TypeScript to JS      |
| `npm start`     | Run compiled JS in production |

---

## To-Do

* [ ] Add validation with Joi/Zod
* [ ] Add role-based access control
* [ ] Add refresh token mechanism
* [ ] Advanced analytics features
* [ ] Real-time WebSocket support
* [ ] CI/CD pipeline
* [ ] Docker containerization
* [ ] Performance monitoring
* [ ] Add automated tests (Jest/Supertest)

---


## Acknowledgments

* Express.js team for the fantastic web framework

* MongoDB for the reliable database solution

* The TypeScript community for excellent type definitions

* OpenStreetMap for map data in the conflict visualization


