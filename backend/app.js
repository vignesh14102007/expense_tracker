import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";

// Initialize environment variables (if any)
dotenv.config();

const app = express();
const port = 5000;

// Connect to the database
connectDB();

// Define the allowed origins for CORS
const allowedOrigins = [
  "https://main.d1sj7cd70hlter.amplifyapp.com", // Production frontend
  "https://expense-tracker-app-three-beryl.vercel.app", // Production frontend (Vercel)
  "http://localhost:3000", // Local development for React (port 3000)
  "http://localhost:3001", // Local development for React (port 3001) <-- added here
];

// Middleware
app.use(cors({
  origin: allowedOrigins,    // Allow specified origins
  credentials: true,         // Allow cookies/credentials in requests
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed HTTP methods
}));

// Other middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(helmet()); // Security-related headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Cross-origin security policy
app.use(morgan("dev")); // Logging middleware
app.use(bodyParser.json()); // Parse JSON in body
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data

// Define API routes
app.use("/api/v1", transactionRoutes); // Transaction routes
app.use("/api/auth", userRoutes); // User routes (e.g., login, register)

// Basic route to check if the server is working
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
