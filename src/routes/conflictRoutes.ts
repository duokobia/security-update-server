import express from "express";
import {
  getAllConflicts,
  getConflictsByRegion,
  getTimeSeriesData,
  getBarChartData,
} from "../controllers/conflictController";
import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

router.use(authenticateJWT);

/**
 * @swagger
 * /conflicts:
 *   get:
 *     summary: Get all conflicts records
 *     tags: [Conflicts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of conflicts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

// GET: /conflicts route
router.get("/", getAllConflicts);

/**
 * @swagger
 * /conflicts/{region}:
 *   get:
 *     summary: Get conflicts records by region
 *     tags: [Conflicts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: region
 *         schema:
 *           type: string
 *         required: true
 *         description: Region name (e.g. africa, asia)
 *     responses:
 *       200:
 *         description: Conflict data for the specified region
 */

// Region-specific (e.g. GET: /conflicts/africa)
router.get("/:region", getConflictsByRegion);

/**
 * @swagger
 * /conflicts/data/timeseries:
 *   get:
 *     summary: Get timeseries data for conflicts
 *     tags: [Conflicts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Timeseries conflict data
 */

// Line chart data GET: /conflicts/data/timeseries route
router.get("/data/timeseries", getTimeSeriesData);

/**
 * @swagger
 * /conflicts/data/bar:
 *   get:
 *     summary: Get bar chart data for conflicts
 *     tags: [Conflicts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Grouping category (e.g. country, year)
 *     responses:
 *       200:
 *         description: Bar chart data grouped by category
 */

// Bar chart data GET: /conflicts/data/bar route
router.get("/data/bar", getBarChartData);

export default router;
