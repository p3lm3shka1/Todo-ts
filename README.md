# Todo App (TypeScript)

A simple **Todo List** project built for practice and portfolio purposes.

Live (Production): https://todo-ts-prod.vercel.app

This repository contains two parts:

- **`client/`** — Frontend built with **Vite**, **React**, **TypeScript**, and **SCSS**
- **`server/`** — Backend API built with **Node.js + Express** (planned deployment on **Render**)

---

## Project Structure

```text
Todo-ts/
  client/   # Vite + React + TypeScript + SCSS
  server/   # Node.js + Express API (Render)
```

---

## Features (Client)

- Create new todos
- Mark todos as completed
- Delete todos
- Filter todos: **All / Active / Completed**
- Theme switching (**Dark / Light**)
- Local persistence via `localStorage`

> The frontend is being migrated/refactored to TypeScript (TSX) and improved structure.

---

## Tech Stack

### Client
- Vite
- React
- TypeScript
- SCSS

### Server
- Node.js
- Express
- Deployment: Render

---

## Getting Started (Client)

### 1) Install dependencies
```bash
cd client
npm install
```

### 2) Run the dev server
```bash
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

---

## Server (Express + Render)

The backend is located in `server/` and is intended to be deployed as a **Render Web Service**.

Once the API is ready, the client will be configured to use a production API URL (Render) via environment variables (e.g. `VITE_API_URL`).

---

This project is for portfolio purposes.
