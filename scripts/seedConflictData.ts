import mongoose from "mongoose";
import dotenv from "dotenv";
import Conflict from "../src/models/conflictModel";
import { conflictData } from "../src/data/conflictData"

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("🟢 Connected to MongoDB");

    // Optional: clear existing data
    await Conflict.deleteMany();

    // Insert the static data
    await Conflict.insertMany(conflictData);
    console.log("✅ Conflict data seeded successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
