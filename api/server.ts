import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import multer from "multer";
import dotenv from "dotenv";
import { z } from "zod";
import { sanitizeInput } from "../lib/sanitize";
import { extractPdfText } from "../lib/pdf";
import { ingestText } from "../lib/ingest";
import { runRag } from "../lib/ragPipeline";
import { computeMetrics } from "../lib/eval";
import { getRedis } from "../lib/cache/redis";
import { logInfo, logError } from "../lib/logger";

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });

app.use(cors({ origin: true }));
app.use(helmet());
app.use(express.json({ limit: "2mb" }));
app.use(rateLimit({ windowMs: 60_000, max: 60 }));

const redis = process.env.REDIS_URL ? getRedis(process.env.REDIS_URL) : null;

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/ingest", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded." });

    const text = await extractPdfText(req.file.buffer);
    const count = await ingestText(text, req.file.originalname);
    res.json({ message: `Explored ${count} chunks of medical jungle.` });
  } catch (error) {
    logError("Ingest failed", error);
    res.status(500).json({ message: "Ingest failed." });
  }
});

app.post("/api/query", async (req, res) => {
  try {
    const schema = z.object({ query: z.string().min(3) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Query required." });

    const query = sanitizeInput(parsed.data.query);

    const cacheKey = `mediquery:${query}`;
    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) return res.json(JSON.parse(cached));
    }

    const response = await runRag(query);

    if (redis) {
      await redis.set(cacheKey, JSON.stringify(response), "EX", 300);
    }

    res.json(response);
  } catch (error) {
    logError("Query failed", error);
    res.status(500).json({ message: "Query failed." });
  }
});

app.get("/api/eval/summary", (_req, res) => {
  const metrics = computeMetrics();
  res.json({ metrics });
});

const port = Number(process.env.API_PORT ?? 4000);
app.listen(port, () => {
  logInfo(`API server running on ${port}`);
});
