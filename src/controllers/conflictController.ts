import { Request, Response } from "express";
import { barChartData, conflictData, timeSeriesData } from "../data/conflictData";

// GET /conflicts
export const getAllConflicts = (req: Request, res: Response) => {
  res.json(conflictData);
};

// GET /conflicts/:region
export const getConflictsByRegion = (req: Request, res: Response) => {
  const region = req.params.region.toLowerCase();
  const filtered = conflictData.filter(
    (c) => c.zone.toLowerCase() === region
  );
  if (filtered.length === 0) {
    return res.status(404).json({ message: "No conflicts found for this region." });
  }
  res.json(filtered);
};

// GET /conflicts/timeseries
export const getTimeSeriesData = (req: Request, res: Response) => {
  res.json(timeSeriesData);
};

// GET /conflicts/bar
export const getBarChartData = (req: Request, res: Response) => {
  res.json(barChartData);
};
