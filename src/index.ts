import express from "express";
import { connectDB } from "./database/db";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import conflictRoutes from "./routes/conflictRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

// Route: Namespaced user routes
// All user routes will be accessible under: /api/v1/auth/user
app.use("/api/v1/auth/user", userRoutes);

// Add this route with a base path
app.use("/api/v1/conflicts", conflictRoutes);

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
