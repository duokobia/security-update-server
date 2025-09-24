import mongoose, { Schema, Document } from "mongoose";

export interface ITimeSeries extends Document {
  date: string;
  'Middle East': number;
  'Europe': number;
  'Asia Pacific': number;
  'Africa': number;
  'Americas': number;
  'Global': number;
}

const timeSeriesSchema = new Schema<ITimeSeries>({
  date: { type: String, required: true },
  'Middle East': { type: Number, required: true },
  'Europe': { type: Number, required: true },
  'Asia Pacific': { type: Number, required: true },
  'Africa': { type: Number, required: true },
  'Americas': { type: Number, required: true },
  'Global': { type: Number, required: true },
});

const TimeSeries = mongoose.model<ITimeSeries>('TimeSeries', timeSeriesSchema);

export default TimeSeries;
