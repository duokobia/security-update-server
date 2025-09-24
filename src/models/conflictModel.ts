import mongoose, { Schema, Document } from "mongoose";

export interface IConflict extends Document {
  zone: string;
  country: string;
  conflictType: string;
  intensity: "Low" | "Medium" | "High" | "Critical";
  startDate: string; // ISO date string
  description: string;
  casualties?: number;
}

const conflictSchema = new Schema<IConflict>({
  zone: { type: String, required: true },
  country: { type: String, required: true },
  conflictType: { type: String, required: true },
  intensity: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    required: true,
  },
  startDate: { type: String, required: true },
  description: { type: String, required: true },
  casualties: { type: Number },
});

const Conflict = mongoose.model<IConflict>("Conflict", conflictSchema);

export default Conflict;
