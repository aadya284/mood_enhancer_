import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleRecommendations } from "./routes/recommendations";
import { handleDailyQuote, handleMentalUpdates } from "./routes/news";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/recommendations", handleRecommendations);
  app.get("/api/quote", handleDailyQuote);
  app.get("/api/mental-updates", handleMentalUpdates);

  return app;
}
