import mongoose from "mongoose";
import { logInfo, logError } from "@/lib/logger";

let cached = globalThis as unknown as { mongoose?: typeof mongoose };

export async function connectMongo(uri: string) {
  if (cached.mongoose) return cached.mongoose;
  try {
    const conn = await mongoose.connect(uri);
    cached.mongoose = conn;
    logInfo("MongoDB connected");
    return conn;
  } catch (error) {
    logError("MongoDB connection failed", error);
    throw error;
  }
}
