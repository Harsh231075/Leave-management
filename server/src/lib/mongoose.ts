import mongoose from "mongoose";

export async function connectToMongo(uri?: string) {
  const mongoUri = uri || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/leave-management";
  try {
    await mongoose.connect(mongoUri, {
      dbName: process.env.MONGODB_DB || undefined,
    } as any);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
}

export default mongoose;
