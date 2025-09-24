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

// GET: /conflicts route
router.get("/", getAllConflicts);

// Region-specific (e.g. GET: /conflicts/africa)
router.get("/:region", getConflictsByRegion);

// Line chart data GET: /conflicts/data/timeseries route
router.get("/data/timeseries", getTimeSeriesData);

// Bar chart data GET: /conflicts/data/bar route
router.get("/data/bar", getBarChartData);

export default router;
