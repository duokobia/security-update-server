import express from "express";
import { logout } from "../controllers/authController";

const router = express.Router();

// POST /logout
router.post("/logout", logout);

export default router;
