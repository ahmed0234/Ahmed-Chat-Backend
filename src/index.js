import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
// Set up CORS to allow all origins


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://ahmedchatapp.vercel.app"); // Specify frontend URL
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cors()); // Default CORS

app.use(
  cors({
    origin: "https://ahmedchatapp.vercel.app/", // Allow all origins
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
