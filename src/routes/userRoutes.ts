import express from "express";
import {
  handleCreateUser,
  handleGetUserById,
  handleGetUsers,
  handleLoginUser,
} from "../controllers/userController";

import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

router.post("/register", handleCreateUser);
router.post("/login", handleLoginUser);

// Protect all routes below with JWT middleware
router.get("/user", authenticateJWT, handleGetUsers);
router.get("/user/:id", authenticateJWT, handleGetUserById);

export default router;
