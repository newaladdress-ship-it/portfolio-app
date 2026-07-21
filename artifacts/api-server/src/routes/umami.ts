import { Router } from "express";

const router = Router();
const UMAMI_BASE = "https://api.umami.is/v1";

function getConfig() {
  const apiKey = process.env["UMAMI_API_KEY"];
  const websiteId = process.env["UMAMI_WEBSITE_ID"];
  return { apiKey, websiteId, ready: !!(apiKey && websiteId) };
}

function periodMs(period: string): { startAt: number; endAt: number } {
  const endAt = Date.now();
  const hours: Record<string, number> = { "24h": 24, "7d": 168, "30d": 720 };
  const h = hours[period] ?? 24;
  return { startAt: endAt - h * 3600 * 1000, endAt };
}

function normalize(raw: Record<string, any>, prev: Record<string, any>) {
  const keys = ["pageviews", "visitors", "visits", "bounces", "totaltime"] as const;
  const result: Record<string, { value: number; prev: number }> = {};
  for (const k of keys) {
    result[k] = {
      value: Number(raw[k] ?? 0),
      prev: Number(prev?.[k] ?? raw?.comparison?.[k] ?? 0),
    };
  }
  return result;
}

router.get("/umami/stats", async (req, res) => {
  const { apiKey, websiteId, ready } = getConfig();
  if (!ready) {
    res.status(503).json({ error: "Umami not configured" });
    return;
  }

  const period = (req.query.period as string) || "24h";
  const { startAt, endAt } = periodMs(period);
  const prevStart = startAt - (endAt - startAt);
  const headers = { "x-umami-api-key": apiKey! };

  try {
    const [statsRes, pageviewRes, prevStatsRes] = await Promise.all([
      fetch(`${UMAMI_BASE}/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}&compareStartAt=${prevStart}&compareEndAt=${startAt}`, { headers }),
      fetch(`${UMAMI_BASE}/websites/${websiteId}/pageviews?startAt=${startAt}&endAt=${endAt}&unit=hour`, { headers }),
      fetch(`${UMAMI_BASE}/websites/${websiteId}/stats?startAt=${prevStart}&endAt=${startAt}`, { headers }),
    ]);

    if (!statsRes.ok) {
      const text = await statsRes.text();
      res.status(statsRes.status).json({ error: `Umami API error: ${statsRes.status}`, detail: text });
      return;
    }

    const rawStats = (await statsRes.json()) as any;
    const pageviews = pageviewRes.ok ? (await pageviewRes.json()) as any : { pageviews: [], sessions: [] };
    const rawPrev = prevStatsRes.ok ? (await prevStatsRes.json()) as any : {};

    const stats = normalize(rawStats, rawPrev);

    res.set("Cache-Control", "public, max-age=60");
    res.json({ stats, pageviews, period });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Umami stats" });
  }
});

export default router;
