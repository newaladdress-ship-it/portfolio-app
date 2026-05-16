import { Router } from "express";

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
      res.status(503).json({ error: "WakaTime API key not configured" });
      return;
    }

    const range = (typeof req.query["range"] === "string" && req.query["range"]) || "all_time";
    const r = await fetch(
      `https://wakatime.com/api/v1/users/current/stats/${encodeURIComponent(range)}`,
      { headers: makeHeaders(apiKey) }
    );

    if (!r.ok) {
      res.status(r.status).json({ error: `WakaTime API error: ${r.status}` });
      return;
    }

    const data = await r.json();
    res.set("Cache-Control", "no-store");
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch WakaTime stats" });
  }
});

router.get("/wakatime/today", async (req, res) => {
  try {
    const apiKey = process.env["WAKATIME_API_KEY"];
    if (!apiKey) {
      res.status(503).json({ error: "WakaTime API key not configured" });
      return;
    }

    const r = await fetch(
      "https://wakatime.com/api/v1/users/current/status_bar/today",
      { headers: makeHeaders(apiKey) }
    );

    if (!r.ok) {
      res.status(r.status).json({ error: `WakaTime API error: ${r.status}` });
      return;
    }

    const data = await r.json();
    const gt = data?.data?.grand_total ?? null;

    res.set("Cache-Control", "no-store");
    res.json({
      todayTotal: gt?.text ?? "0 mins",
      todaySecs: gt?.total_seconds ?? 0,
      todayDigital: gt?.digital ?? null,
      timezone: data?.data?.range?.timezone ?? null,
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch today's stats" });
  }
});

router.get("/wakatime/languages", async (req, res) => {
  try {
    const apiKey = process.env["WAKATIME_API_KEY"];
    if (!apiKey) {
      res.status(503).json({ error: "WakaTime API key not configured" });
      return;
    }

    const r = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/all_time",
      { headers: makeHeaders(apiKey) }
    );

    if (!r.ok) {
      res.status(r.status).json({ error: `WakaTime API error: ${r.status}` });
      return;
    }

    const json = await r.json();
    const languages: { name: string; percent: number; text: string }[] =
      (json?.data?.languages ?? [])
        .slice(0, 10)
        .map((l: { name: string; percent: number; text: string }) => ({
          name: l.name,
          percent: Math.round(l.percent * 10) / 10,
          text: l.text,
        }));

    res.set("Cache-Control", "no-store");
    res.json({ languages, range: json?.data?.range ?? "all_time" });
  } catch {
    res.status(500).json({ error: "Failed to fetch WakaTime language stats" });
  }
});

export default router;
