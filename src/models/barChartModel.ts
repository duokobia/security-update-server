import mongoose, { Document, Schema } from "mongoose";

export interface IBarChart extends Document {
  zone: string;
  conflicts: number;
  casualties: number;
  averageIntensity: number;
}

const barChartSchema = new Schema<IBarChart>(
  {
    zone: { type: String, required: true },
    conflicts: { type: Number, required: true },
    casualties: { type: Number, required: true },
    averageIntensity: { type: Number, required: true },
  },
  {
    timestamps: true, 
  }
);

const BarChart = mongoose.model<IBarChart>("BarChart", barChartSchema);
export default BarChart;
