import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send(`
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: rgba(211, 211, 211, 0.2);
        color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
      }
      h1 {
        color: rgb(21, 0, 255);
      }
      p {
        font-size: 1.2em;
        margin: 1rem 0;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        background-color: rgb(21, 0, 255);
        padding: 1rem 1.5rem;
        margin: 1rem 0;
        border-radius: 5px;
        color: rgb(255, 255, 255);
      }
    </style>
    <h1>IT'S ALIVE!</h1>
    <p>Render has a waking up time, so can take a few seconds to respond initially.</p>
    <ul>
      <li>GET /api/health - Check API health</li>
      
    </ul>
  `);
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
