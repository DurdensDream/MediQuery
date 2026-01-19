import request from "supertest";
import express from "express";

const app = express();
app.use(express.json());
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

describe("API health", () => {
  it("returns ok", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });
});
