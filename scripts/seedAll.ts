import dotenv from "dotenv";
import { connectDB } from "../src/database/db";
import { conflictData, timeSeriesData, barChartData } from "../src/data/conflictData";
import Conflict from "../src/models/conflictModel";
import TimeSeries from "../src/models/timeSeriesModel";
import BarChart from "../src/models/barChartModel";

dotenv.config();

const seedAll = async () => {
  try {
    await connectDB();

    console.log("Clearing existing data...");
    await Promise.all([
      Conflict.deleteMany(),
      TimeSeries.deleteMany(),
      BarChart.deleteMany(),
    ]);

    console.log("Seeding conflict data...");
    await Conflict.insertMany(conflictData);

    console.log("Seeding time series data...");
    await TimeSeries.insertMany(timeSeriesData);

    console.log("Seeding bar chart data...");
    await BarChart.insertMany(barChartData);

    console.log("All data seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedAll();
