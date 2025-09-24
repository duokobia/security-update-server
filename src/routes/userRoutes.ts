import express from "express";
import {
  handleCreateUser,
  handleGetUserById,
  handleGetUsers,
  handleLoginUser,
} from "../controllers/userController";

import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

// POST /api/v1/auth/user/register
router.post("/register", handleCreateUser);

// POST /api/v1/auth/user/login
router.post("/login", handleLoginUser);


// Protected routes
// GET /api/v1/auth/user/
router.get("/", authenticateJWT, handleGetUsers);

// GET /api/v1/auth/user/:id
router.get("/:id", authenticateJWT, handleGetUserById);

export default router;
