import { Request, Response } from "express";
import Conflict from "../models/conflictModel";
import TimeSeries from "../models/timeSeriesModel";
import BarChart from "../models/barChartModel";

// GET /conflicts
export const getAllConflicts = async (req: Request, res: Response) => {
  try {
    const conflicts = await Conflict.find();
    res.status(200).json(conflicts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch conflicts", error });
  }
};

// GET /conflicts/:region
export const getConflictsByRegion = async (req: Request, res: Response) => {
  const region = req.params.region.toLowerCase();

  try {
    const conflicts = await Conflict.find({
      zone: new RegExp(`^${region}$`, "i"), // case-insensitive match
    });

    if (conflicts.length === 0) {
      return res
        .status(404)
        .json({ message: "No conflicts found for this region." });
    }

    res.status(200).json(conflicts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch region data", error });
  }
};

// GET /conflicts/timeseries
export const getTimeSeriesData = async (req: Request, res: Response) => {
  try {
    const data = await TimeSeries.find().sort({ date: 1 }); // Optional sorting by date
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch time series data", error });
  }
};

// GET /conflicts/bar
export const getBarChartData = async (req: Request, res: Response) => {
  try {
    const data = await BarChart.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bar chart data", error });
  }
};
