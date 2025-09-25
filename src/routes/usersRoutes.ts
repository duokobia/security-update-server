import express from "express";
import {
  handleCreateUser,
  handleGetUserById,
  handleGetUsers,
  handleLoginUser,
} from "../controllers/userController";

import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

/**
 * @swagger
 * /auth/users/register:
 *   post:
 *     summary: Registers a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               name:
 *                 type: string
 *                 example: john doe
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request or validation failed
 */

// POST /api/v1/auth/user/register
router.post("/register", handleCreateUser);

/**
 * @swagger
 * /auth/users/login:
 *   post:
 *     summary: Logs in a user and receive a JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login with JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *       401:
 *         description: Unauthorized (invalid credentials)
 */

// POST /api/v1/auth/user/login
router.post("/login", handleLoginUser);


// Protected routes

/**
 * @swagger
 * /auth/users/:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */

// GET /api/v1/auth/user/
router.get("/", authenticateJWT, handleGetUsers);

/**
 * @swagger
 * /auth/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */

// GET /api/v1/auth/user/:id
router.get("/:id", authenticateJWT, handleGetUserById);

export default router;
