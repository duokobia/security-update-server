import { Request, Response } from "express";
import {
  conflictData,
  timeSeriesData,
  barChartData,
} from "../data/conflictData";

// Map conflict intensity to numeric value
const intensityMap: Record<string, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 4,
};

// GET /analytics
export const getAnalytics = (req: Request, res: Response) => {
  const totalConflicts = conflictData.length;

  const totalCasualties = conflictData.reduce((sum, conflict) => {
    return sum + (conflict.casualties ?? 0);
  }, 0);

  const totalIntensityScore = conflictData.reduce((sum, conflict) => {
    return sum + (intensityMap[conflict.intensity] || 0);
  }, 0);

  const averageIntensity = parseFloat((totalIntensityScore / totalConflicts).toFixed(1));

  // Conflict count by type
  const conflictTypes: Record<string, number> = {};
  conflictData.forEach(conflict => {
    conflictTypes[conflict.conflictType] = (conflictTypes[conflict.conflictType] || 0) + 1;
  });

  // Time series global incidents (monthly trend)
  const monthlyGlobalIncidents = timeSeriesData.map(entry => ({
    date: entry.date,
    globalIncidents: entry.Global,
  }));

  // Region with highest incidents in the latest month
  const latestMonthData = timeSeriesData[timeSeriesData.length - 1];

  const regionIncidentCounts: Record<string, number> = Object.entries(latestMonthData)
    .filter(([key]) => key !== "date" && key !== "Global")
    .reduce((acc, [region, count]) => {
      acc[region] = count as number;
      return acc;
    }, {} as Record<string, number>);

  delete regionIncidentCounts.date;
  delete regionIncidentCounts.Global;

  const highestRegion = Object.entries(regionIncidentCounts).reduce(
    (maxRegion, [region, count]) => {
      return count > maxRegion.count ? { region, count } : maxRegion;
    },
    { region: "", count: 0 }
  );

  res.status(200).json({
    totalConflicts,
    totalCasualties,
    averageIntensity,
    conflictTypes,
    conflictsPerRegion: barChartData.reduce((acc, cur) => {
      acc[cur.zone] = cur.conflicts;
      return acc;
    }, {} as Record<string, number>),
    casualtiesPerRegion: barChartData.reduce((acc, cur) => {
      acc[cur.zone] = cur.casualties;
      return acc;
    }, {} as Record<string, number>),
    monthlyGlobalIncidents,
    highestIncidentRegionLatestMonth: highestRegion,
  });
};
