import { Request, Response } from "express";
import { conflictData, timeSeriesData, barChartData } from "../data/conflictData";

// GET /conflicts
export const getAllConflicts = (req: Request, res: Response) => {
  res.status(200).json(conflictData);
};

// GET /conflicts/:region
export const getConflictsByRegion = (req: Request, res: Response) => {
  const region = req.params.region.toLowerCase();

  const filteredConflicts = conflictData.filter(
    conflict => conflict.zone.toLowerCase() === region
  );

  if (filteredConflicts.length === 0) {
    return res.status(404).json({ message: "No conflicts found for this region." });
  }

  res.status(200).json(filteredConflicts);
};

// GET /conflicts/timeseries
export const getTimeSeriesData = (req: Request, res: Response) => {
  res.status(200).json(timeSeriesData);
};

// GET /conflicts/bar
export const getBarChartData = (req: Request, res: Response) => {
  res.status(200).json(barChartData);
};
