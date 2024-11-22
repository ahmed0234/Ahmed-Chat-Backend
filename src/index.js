import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";

import path from "path";

dotenv.config();

const PORT = process.env.PORT;
// Set up CORS to allow all origins
const __dirname = path.resolve();

console.log(__dirname);

app.use(express.static(__dirname + "/src" + "/dist"));

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow all HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allow specific headers
    credentials: true, // If you're using cookies or authentication headers
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  connectDB();
});
