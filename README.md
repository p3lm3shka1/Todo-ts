# Todo App

A full-stack Todo application with authentication and persistent storage, built with React, TypeScript, Node.js, Express, and MongoDB.

Users can create an account, log in, and manage their own personal todo list.  
All tasks are stored in MongoDB, so data is saved between sessions.

```
> Note: The backend is hosted on Render, so the first request may take a few seconds if the service is waking up.
```

## Live Demo

- Frontend: `https://todo-ts-prod.vercel.app`
- Backend API: `https://todo-ts-vr5s.onrender.com`

## Features

- User registration
- User login
- JWT-based authentication
- Protected routes
- Create todos
- Complete and uncomplete todos
- Delete todos
- Clear completed todos
- Filter by all / active / completed
- Light and dark theme toggle
- Persistent storage with MongoDB
- Personal todos for each user account

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
- MongoDB
- Mongoose
- JWT
- CORS

## Authentication

Users can:
- sign up for a new account
- log in with existing credentials
- access only their own todos

Authentication is handled with JWT, and protected routes require a valid token.

## Database

This project uses **MongoDB** to store:
- users
- todos

Each todo is connected to a specific user, so every account has its own private task list.

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

### Client
```env
VITE_API_URL=http://localhost:3000
```

### Server
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

## Future Improvements

- Edit todo text
- Better form validation
- Toast notifications
- Improved loading and error states
- Better mobile UX

## Author

Created by [Vitalij Lazarev](https://github.com/p3lm3shka1)
