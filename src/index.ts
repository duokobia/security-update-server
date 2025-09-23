import express from "express";
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./database/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
