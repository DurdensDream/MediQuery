import Redis from "ioredis";
import { logInfo, logError } from "@/lib/logger";

let redis: Redis | null = null;

export function getRedis(url: string) {
  if (redis) return redis;
  try {
    redis = new Redis(url);
    redis.on("connect", () => logInfo("Redis connected"));
    redis.on("error", (err) => logError("Redis error", err));
    return redis;
  } catch (error) {
    logError("Redis connection failed", error);
    throw error;
  }
}
