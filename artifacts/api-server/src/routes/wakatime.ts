import { Router } from "express";
import * as fs from "fs";
import * as path from "path";

const router = Router();

function makeHeaders(apiKey: string) {
  const encoded = Buffer.from(apiKey).toString("base64");
  return {
    Authorization: `Basic ${encoded}`,
    "User-Agent": "portfolio-app",
  };
}

router.get("/wakatime/stats", async (req, res) => {
  try {
    const apiKey = process.env["WAKATIME_API_KEY"];
    if (!apiKey) {
      res.status(503).json({ error: "WakaTime API key not configured", errorCode: "NO_API_KEY" });
      return;
    }

    const force = req.query["force"] === "true";
    const range = (typeof req.query["range"] === "string" && req.query["range"]) || "all_time";
    const r = await fetch(
      `https://wakatime.com/api/v1/users/current/stats/${encodeURIComponent(range)}`,
      { headers: makeHeaders(apiKey) }
    );

    if (!r.ok) {
      const errorMessage = r.status === 401 ? "Invalid or expired API key" : `WakaTime API error: ${r.status}`;
      res.status(r.status).json({ error: errorMessage, errorCode: r.status === 401 ? "INVALID_KEY" : "API_ERROR" });
      return;
    }

    const data = await r.json();
    if (force) {
      res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    } else {
      res.set("Cache-Control", "public, max-age=3600, s-maxage=3600, stale-while-revalidate=600");
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch WakaTime stats", errorCode: "FETCH_ERROR" });
  }
});

router.get("/wakatime/today", async (req, res) => {
  try {
    const apiKey = process.env["WAKATIME_API_KEY"];
    if (!apiKey) {
      res.status(503).json({ error: "WakaTime API key not configured", errorCode: "NO_API_KEY" });
      return;
    }

    const force = req.query["force"] === "true";
    const r = await fetch(
      "https://wakatime.com/api/v1/users/current/status_bar/today",
      { headers: makeHeaders(apiKey) }
    );

    if (!r.ok) {
      const errorMessage = r.status === 401 ? "Invalid or expired API key" : `WakaTime API error: ${r.status}`;
      res.status(r.status).json({ error: errorMessage, errorCode: r.status === 401 ? "INVALID_KEY" : "API_ERROR" });
      return;
    }

    const data = (await r.json()) as any;
    const gt = data?.data?.grand_total ?? null;

    if (force) {
      res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    } else {
      res.set("Cache-Control", "public, max-age=3600, s-maxage=3600, stale-while-revalidate=600");
    }
    res.json({
      todayTotal: gt?.text ?? "0 mins",
      todaySecs: gt?.total_seconds ?? 0,
      todayDigital: gt?.digital ?? null,
      timezone: data?.data?.range?.timezone ?? null,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch today's stats", errorCode: "FETCH_ERROR" });
  }
});

router.get("/wakatime/languages", async (req, res) => {
  try {
    const apiKey = process.env["WAKATIME_API_KEY"];
    if (!apiKey) {
      res.status(503).json({ error: "WakaTime API key not configured", errorCode: "NO_API_KEY" });
      return;
    }

    const force = req.query["force"] === "true";
    const r = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/all_time",
      { headers: makeHeaders(apiKey) }
    );

    if (!r.ok) {
      const errorMessage = r.status === 401 ? "Invalid or expired API key" : `WakaTime API error: ${r.status}`;
      res.status(r.status).json({ error: errorMessage, errorCode: r.status === 401 ? "INVALID_KEY" : "API_ERROR" });
      return;
    }

    const json = (await r.json()) as any;
    const languages: { name: string; percent: number; text: string }[] =
      (json?.data?.languages ?? [])
        .slice(0, 10)
        .map((l: { name: string; percent: number; text: string }) => ({
          name: l.name,
          percent: Math.round(l.percent * 10) / 10,
          text: l.text,
        }));

    if (force) {
      res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    } else {
      res.set("Cache-Control", "public, max-age=3600, s-maxage=3600, stale-while-revalidate=600");
    }
    res.json({ languages, range: json?.data?.range ?? "all_time" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch WakaTime language stats", errorCode: "FETCH_ERROR" });
  }
});

router.post("/wakatime/setup", async (req, res) => {
  try {
    const { apiKey } = req.body;
    if (!apiKey || typeof apiKey !== "string" || !apiKey.trim()) {
      res.status(400).json({ error: "API key is required" });
      return;
    }

    // Validate the API key by making a test request
    const testR = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/last_7_days",
      { headers: makeHeaders(apiKey.trim()) }
    );

    if (!testR.ok) {
      res.status(401).json({ error: "Invalid WakaTime API key", errorCode: "INVALID_KEY" });
      return;
    }

    // Save to .env.development.local
    const envPath = path.join(process.cwd(), ".env.development.local");
    let envContent = "";

    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, "utf-8");
    }

    // Update or add WAKATIME_API_KEY
    const keyLine = `WAKATIME_API_KEY=${apiKey.trim()}`;
    if (envContent.includes("WAKATIME_API_KEY=")) {
      envContent = envContent.replace(/WAKATIME_API_KEY=.*/g, keyLine);
    } else {
      envContent = envContent + (envContent ? "\n" : "") + keyLine;
    }

    fs.writeFileSync(envPath, envContent, "utf-8");

    // Update process.env for immediate use
    process.env["WAKATIME_API_KEY"] = apiKey.trim();

    res.json({ success: true, message: "API key saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save API key", errorCode: "SAVE_ERROR" });
  }
});

export default router;
