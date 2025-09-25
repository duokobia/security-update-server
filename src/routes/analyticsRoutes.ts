import express from "express";
import { getAnalytics } from "../controllers/analyticsController";
import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

router.use(authenticateJWT);

/**
 * @swagger
 * /analytics:
 *   post:
 *     summary: Get analytics data
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-01"
 *               toDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-12-31"
 *               filters:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                     example: "12345"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       metric:
 *                         type: string
 *                       value:
 *                         type: number
 */

router.get("/", getAnalytics);

export default router;
