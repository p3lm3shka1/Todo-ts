# Todo App

A full-stack Todo application with authentication and persistent storage, built with React, TypeScript, Node.js, Express, and MongoDB.

Users can create an account, log in, and manage their own personal todo list. All tasks are stored in MongoDB, so data is saved between sessions.

> Note: The backend is hosted on Render, so the first request may take a few seconds if the service is waking up.

## Live Demo

- Frontend: https://todo-ts-prod.vercel.app
- Backend API: https://todo-ts-vr5s.onrender.com

## Features

- User registration and login
- Cookie-based authentication with access and refresh tokens
- Protected routes
- Create, complete, and delete todos
- Clear completed todos
- Filter by all / active / completed
- Light and dark theme toggle
- Persistent storage with MongoDB
- Personal todos per user account

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- SCSS
- React Router

### Backend

- Node.js
- Express
- MongoDB / Mongoose
- JWT
- bcrypt
- cookie-parser
- express-rate-limit

## Project Structure

- `client/` — frontend application
- `server/` — backend API, authentication, and database logic

## Running Locally

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` in both `client/` and `server/` and fill in your values.

### Client (`client/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | URL of the backend API |

### Server (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens |
| `CLIENT_URL` | Frontend URL (for CORS) |

## Author

Created by [Vitalij Lazarev](https://github.com/p3lm3shka1)
