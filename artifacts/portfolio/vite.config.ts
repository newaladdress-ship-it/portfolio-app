import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import type { Plugin } from "vite";

const basePath = process.env.BASE_PATH || "/";

// Inline API handlers for v0 environment (since api-server is not running separately)
function apiRoutesPlugin(): Plugin {
  return {
    name: "api-routes",
    configureServer(server) {
      const GITHUB_USER = "muhammadimran9";

      // Helper to build GitHub headers
      function buildGitHubHeaders() {
        const token = process.env["GITHUB_PERSONAL_ACCESS_TOKEN"] ?? process.env["GITHUB_TOKEN"];
        const headers: Record<string, string> = {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "portfolio-app",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;
        return headers;
      }

      // Helper to build WakaTime headers
      function makeWakaHeaders(apiKey: string) {
        const encoded = Buffer.from(apiKey).toString("base64");
        return {
          Authorization: `Basic ${encoded}`,
          "User-Agent": "portfolio-app",
        };
      }

      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "";
        
        // GitHub Events
        if (url === "/api/github/events") {
          try {
            const ghRes = await fetch(
              `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100`,
              { headers: buildGitHubHeaders() }
            );
            if (!ghRes.ok) {
              res.statusCode = ghRes.status;
              res.end(JSON.stringify({ error: `GitHub API error: ${ghRes.status}` }));
              return;
            }
            const pollInterval = ghRes.headers.get("X-Poll-Interval") ?? "60";
            const data: any[] = await ghRes.json();
            const filtered = data.filter((e) => {
              const repoName = e.repo?.name?.split("/")[1] ?? "";
              if (["branches"].includes(repoName)) return false;
              if (["DeleteEvent"].includes(e.type)) return false;
              return true;
            }).slice(0, 20);
            res.setHeader("Content-Type", "application/json");
            res.setHeader("X-Poll-Interval", pollInterval);
            res.end(JSON.stringify(filtered));
          } catch {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Failed to fetch GitHub events" }));
          }
          return;
        }

        // GitHub Stats
        if (url === "/api/github/stats") {
          try {
            const headers = buildGitHubHeaders();
            const [userRes, reposRes] = await Promise.all([
              fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
              fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, { headers }),
            ]);
            if (!userRes.ok) {
              res.statusCode = userRes.status;
              res.end(JSON.stringify({ error: `GitHub API error: ${userRes.status}` }));
              return;
            }
            const user = await userRes.json();
            const repos: any[] = reposRes.ok ? await reposRes.json() : [];
            const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count ?? 0), 0);
            const languages = repos
              .filter((r) => r.language)
              .reduce((acc: Record<string, number>, r) => {
                acc[r.language] = (acc[r.language] ?? 0) + 1;
                return acc;
              }, {});
            const topLanguages = Object.entries(languages)
              .sort((a, b) => (b[1] as number) - (a[1] as number))
              .slice(0, 5)
              .map(([lang]) => lang);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
              login: user.login,
              name: user.name,
              avatarUrl: user.avatar_url,
              bio: user.bio,
              publicRepos: user.public_repos,
              followers: user.followers,
              following: user.following,
              totalStars,
              topLanguages,
            }));
          } catch {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Failed to fetch GitHub stats" }));
          }
          return;
        }

        // GitHub Contributions
        if (url === "/api/github/contributions") {
          try {
            const r = await fetch(
              `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
              { headers: { "User-Agent": "portfolio-app" } }
            );
            if (!r.ok) {
              res.statusCode = r.status;
              res.end(JSON.stringify({ error: "Contributions API error" }));
              return;
            }
            const data = await r.json();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
          } catch {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Failed to fetch contributions" }));
          }
          return;
        }

        // WakaTime Languages
        if (url === "/api/wakatime/languages") {
          try {
            const apiKey = process.env["WAKATIME_API_KEY"];
            if (!apiKey) {
              res.statusCode = 503;
              res.end(JSON.stringify({ error: "WakaTime API key not configured" }));
              return;
            }
            const r = await fetch(
              "https://wakatime.com/api/v1/users/current/stats/all_time",
              { headers: makeWakaHeaders(apiKey) }
            );
            if (!r.ok) {
              res.statusCode = r.status;
              res.end(JSON.stringify({ error: `WakaTime API error: ${r.status}` }));
              return;
            }
            const json = await r.json();
            const languages = (json?.data?.languages ?? [])
              .slice(0, 10)
              .map((l: { name: string; percent: number; text: string }) => ({
                name: l.name,
                percent: Math.round(l.percent * 10) / 10,
                text: l.text,
              }));
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ languages, range: json?.data?.range ?? "all_time" }));
          } catch {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Failed to fetch WakaTime language stats" }));
          }
          return;
        }

        // WakaTime Stats
        if (url.startsWith("/api/wakatime/stats")) {
          try {
            const apiKey = process.env["WAKATIME_API_KEY"];
            if (!apiKey) {
              res.statusCode = 503;
              res.end(JSON.stringify({ error: "WakaTime API key not configured" }));
              return;
            }
            const urlObj = new URL(url, "http://localhost");
            const range = urlObj.searchParams.get("range") || "all_time";
            const r = await fetch(
              `https://wakatime.com/api/v1/users/current/stats/${encodeURIComponent(range)}`,
              { headers: makeWakaHeaders(apiKey) }
            );
            if (!r.ok) {
              res.statusCode = r.status;
              res.end(JSON.stringify({ error: `WakaTime API error: ${r.status}` }));
              return;
            }
            const data = await r.json();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
          } catch {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Failed to fetch WakaTime stats" }));
          }
          return;
        }

        // WakaTime Today
        if (url === "/api/wakatime/today") {
          try {
            const apiKey = process.env["WAKATIME_API_KEY"];
            if (!apiKey) {
              res.statusCode = 503;
              res.end(JSON.stringify({ error: "WakaTime API key not configured" }));
              return;
            }
            const r = await fetch(
              "https://wakatime.com/api/v1/users/current/status_bar/today",
              { headers: makeWakaHeaders(apiKey) }
            );
            if (!r.ok) {
              res.statusCode = r.status;
              res.end(JSON.stringify({ error: `WakaTime API error: ${r.status}` }));
              return;
            }
            const data = await r.json();
            const gt = data?.data?.grand_total ?? null;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
              todayTotal: gt?.text ?? "0 mins",
              todaySecs: gt?.total_seconds ?? 0,
              todayDigital: gt?.digital ?? null,
              timezone: data?.data?.range?.timezone ?? null,
            }));
          } catch {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Failed to fetch today's stats" }));
          }
          return;
        }

        // Umami Stats
        if (url.startsWith("/api/umami/stats")) {
          try {
            const apiKey = process.env["UMAMI_API_KEY"];
            const websiteId = process.env["UMAMI_WEBSITE_ID"];
            if (!apiKey || !websiteId) {
              res.statusCode = 503;
              res.end(JSON.stringify({ error: "Umami not configured" }));
              return;
            }
            const urlObj = new URL(url, "http://localhost");
            const period = urlObj.searchParams.get("period") || "24h";
            const endAt = Date.now();
            const hours: Record<string, number> = { "24h": 24, "7d": 168, "30d": 720 };
            const h = hours[period] ?? 24;
            const startAt = endAt - h * 3600 * 1000;
            const prevStart = startAt - (endAt - startAt);
            const headers = { "x-umami-api-key": apiKey };
            const UMAMI_BASE = "https://api.umami.is/v1";

            const [statsRes, pageviewRes, prevStatsRes] = await Promise.all([
              fetch(`${UMAMI_BASE}/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}&compareStartAt=${prevStart}&compareEndAt=${startAt}`, { headers }),
              fetch(`${UMAMI_BASE}/websites/${websiteId}/pageviews?startAt=${startAt}&endAt=${endAt}&unit=hour`, { headers }),
              fetch(`${UMAMI_BASE}/websites/${websiteId}/stats?startAt=${prevStart}&endAt=${startAt}`, { headers }),
            ]);

            if (!statsRes.ok) {
              const text = await statsRes.text();
              res.statusCode = statsRes.status;
              res.end(JSON.stringify({ error: `Umami API error: ${statsRes.status}`, detail: text }));
              return;
            }

            const rawStats = await statsRes.json();
            const pageviews = pageviewRes.ok ? await pageviewRes.json() : { pageviews: [], sessions: [] };
            const rawPrev = prevStatsRes.ok ? await prevStatsRes.json() : {};

            const keys = ["pageviews", "visitors", "visits", "bounces", "totaltime"] as const;
            const stats: Record<string, { value: number; prev: number }> = {};
            for (const k of keys) {
              stats[k] = {
                value: Number(rawStats[k] ?? 0),
                prev: Number(rawPrev?.[k] ?? rawStats?.comparison?.[k] ?? 0),
              };
            }

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ stats, pageviews, period }));
          } catch {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Failed to fetch Umami stats" }));
          }
          return;
        }

        // Push VAPID Key endpoint
        if (url === "/api/push/vapid-key") {
          const publicKey = process.env["VAPID_PUBLIC_KEY"];
          res.setHeader("Content-Type", "application/json");
          if (publicKey) {
            res.end(JSON.stringify({ publicKey }));
          } else {
            res.statusCode = 503;
            res.end(JSON.stringify({ error: "VAPID key not configured" }));
          }
          return;
        }

        // Push Subscribe endpoint (stub - logs subscription in dev)
        if (url === "/api/push/subscribe" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => { body += chunk; });
          req.on("end", () => {
            console.log("[v0] Push subscription received:", body.slice(0, 100));
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true }));
          });
          return;
        }

        // Push Notify Admin endpoint (stub - logs notification in dev)
        if (url === "/api/push/notify-admin" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => { body += chunk; });
          req.on("end", () => {
            try {
              const data = JSON.parse(body);
              console.log("[v0] Admin notification:", data.title, "-", data.body);
            } catch {}
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true }));
          });
          return;
        }

        // Push Notify Visitors endpoint (stub)
        if (url === "/api/push/notify-visitors" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => { body += chunk; });
          req.on("end", () => {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true }));
          });
          return;
        }

        // Admin Reply Email endpoint
        if (url === "/api/admin/reply-email" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => { body += chunk; });
          req.on("end", () => {
            try {
              const data = JSON.parse(body);
              console.log("[v0] Admin reply email endpoint called:", {
                to: data.userEmail,
                userName: data.userName,
                messageLength: (data.replyMessage || "").length,
              });
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, message: "Reply email queued (dev mode - not actually sent)" }));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "Invalid request" }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    apiRoutesPlugin(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-firebase": ["firebase/app", "firebase/firestore", "firebase/auth"],
          "vendor-motion": ["framer-motion"],
          "vendor-router": ["wouter"],
        },
      },
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port: 3000,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
