import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db";
import errorHandler from "./middlewares/common/errorHandler";
import userRoutes from "./routes/auth.routes"

// Initialize App
const app = express();

// Connect MongoDB
connectDB();

// Global Middlewares
app.use(cors())

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());


// Rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// API Routes
app.use("/api/auth", userRoutes);

// Error Handler
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});