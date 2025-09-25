import express from "express";
import { logout } from "../controllers/authController";

const router = express.Router();

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logs out the user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 */

// POST /logout
router.post("/logout", logout);

export default router;
