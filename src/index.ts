import express from "express";
import { connectDB } from "./database/db";
import dotenv from "dotenv";
import usersRoutes from "./routes/usersRoutes";
import conflictRoutes from "./routes/conflictRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import authRoutes from "./routes/authRoutes";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Swagger docs route
setupSwagger(app);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

// Route: Namespaced user routes
// All user routes will be accessible under: /api/v1/auth/user
app.use("/api/v1/auth/users", usersRoutes);

// Add this route with a base path
app.use("/api/v1/conflicts", conflictRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

app.use("/api/v1/auth", authRoutes);

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
