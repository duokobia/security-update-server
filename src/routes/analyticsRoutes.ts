import express from "express";
import { getAnalytics } from "../controllers/analyticsController";
import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

router.use(authenticateJWT);

router.get("/", getAnalytics);

export default router;
