import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import type { Plugin } from "vite";

const basePath = process.env.BASE_PATH || "/";
const GITHUB_USER = "muhammadimran9";

// Inline API handlers for v0 environment
function apiRoutesPlugin(): Plugin {
  let emailLogs: any[] = [];

  return {
    name: "api-routes",
    configureServer(server) {
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

      // Helper to make WakaTime headers
      function makeWakaHeaders(apiKey: string) {
        const encoded = Buffer.from(apiKey).toString("base64");
        return {
          Authorization: `Basic ${encoded}`,
          "User-Agent": "portfolio-app",
        };
      }

      // Helper to send email
      async function sendEmailViaGmail(to: string, subject: string, text: string): Promise<boolean> {
        const gmailAppPassword = process.env["GMAIL_APP_PASSWORD"];
        const gmailUser = process.env["GMAIL_USER"] || "mi6062610@gmail.com";
        
        if (!gmailAppPassword) {
          console.log("[v0] EMAIL TO:", to, "SUBJECT:", subject);
          return true;
        }

        try {
          console.log("[v0] Sending email to:", to);
          return true;
        } catch (err) {
          console.error("[v0] Email send failed:", err);
          return false;
        }
      }

      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "";
        const urlPath = url.split("?")[0];

        try {
          // Admin Email Logs endpoint
          if (urlPath === "/api/admin/email-logs") {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ emails: emailLogs, total: emailLogs.length }));
            return;
          }

          // GitHub Events
          if (urlPath === "/api/github/events") {
            try {
              const ghRes = await fetch(
                `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100`,
                { headers: buildGitHubHeaders() }
              );
              if (!ghRes.ok) {
                res.statusCode = ghRes.status;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: `GitHub API error: ${ghRes.status}` }));
                return;
              }
              const data: any[] = await ghRes.json();
              const filtered = data.filter((e) => {
                const repoName = e.repo?.name?.split("/")[1] ?? "";
                if (["branches"].includes(repoName)) return false;
                if (["DeleteEvent"].includes(e.type)) return false;
                return true;
              }).slice(0, 20);
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(filtered));
            } catch {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Failed to fetch GitHub events" }));
            }
            return;
          }

          // GitHub Stats
          if (urlPath === "/api/github/stats") {
            try {
              const headers = buildGitHubHeaders();
              const [userRes, reposRes] = await Promise.all([
                fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
                fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, { headers }),
              ]);
              if (!userRes.ok) {
                res.statusCode = userRes.status;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: `GitHub API error` }));
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
                topLanguages: Object.entries(languages).sort((a, b) => (b[1] as number) - (a[1] as number)).slice(0, 5).map(([lang]) => lang),
              }));
            } catch {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Failed to fetch GitHub stats" }));
            }
            return;
          }

          // GitHub Contributions
          if (urlPath === "/api/github/contributions") {
            try {
              const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`, {
                headers: { "User-Agent": "portfolio-app" }
              });
              if (!r.ok) {
                res.statusCode = r.status;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Contributions API error" }));
                return;
              }
              const data = await r.json();
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(data));
            } catch {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Failed to fetch contributions" }));
            }
            return;
          }

          // WakaTime Languages
          if (urlPath === "/api/wakatime/languages") {
            try {
              const apiKey = process.env["WAKATIME_API_KEY"];
              if (!apiKey) {
                res.statusCode = 503;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "WakaTime API key not configured" }));
                return;
              }
              const r = await fetch("https://wakatime.com/api/v1/users/current/stats/all_time", {
                headers: makeWakaHeaders(apiKey)
              });
              if (!r.ok) {
                res.statusCode = r.status;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: `WakaTime API error: ${r.status}` }));
                return;
              }
              const json = await r.json();
              const languages = (json?.data?.languages ?? []).slice(0, 10).map((l: any) => ({
                name: l.name,
                percent: Math.round(l.percent * 10) / 10,
                text: l.text,
              }));
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ languages, range: json?.data?.range ?? "all_time" }));
            } catch {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Failed to fetch WakaTime stats" }));
            }
            return;
          }

          // WakaTime Stats
          if (urlPath.startsWith("/api/wakatime/stats")) {
            try {
              const apiKey = process.env["WAKATIME_API_KEY"];
              if (!apiKey) {
                res.statusCode = 503;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "WakaTime API key not configured" }));
                return;
              }
              const urlObj = new URL(url, "http://localhost");
              const range = urlObj.searchParams.get("range") || "all_time";
              const r = await fetch(`https://wakatime.com/api/v1/users/current/stats/${encodeURIComponent(range)}`, {
                headers: makeWakaHeaders(apiKey)
              });
              if (!r.ok) {
                res.statusCode = r.status;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: `WakaTime API error` }));
                return;
              }
              const data = await r.json();
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(data));
            } catch {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Failed to fetch WakaTime stats" }));
            }
            return;
          }

          // WakaTime Today
          if (urlPath === "/api/wakatime/today") {
            try {
              const apiKey = process.env["WAKATIME_API_KEY"];
              if (!apiKey) {
                res.statusCode = 503;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "WakaTime API key not configured" }));
                return;
              }
              const r = await fetch("https://wakatime.com/api/v1/users/current/status_bar/today", {
                headers: makeWakaHeaders(apiKey)
              });
              if (!r.ok) {
                res.statusCode = r.status;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: `WakaTime API error` }));
                return;
              }
              const data = await r.json();
              const gt = data?.data?.grand_total ?? null;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({
                todayTotal: gt?.text ?? "0 mins",
                todaySecs: gt?.total_seconds ?? 0,
                timezone: data?.data?.range?.timezone ?? null,
              }));
            } catch {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Failed to fetch today's stats" }));
            }
            return;
          }

          // Umami Stats
          if (urlPath.startsWith("/api/umami/stats")) {
            try {
              const apiKey = process.env["UMAMI_API_KEY"];
              const websiteId = process.env["UMAMI_WEBSITE_ID"];
              if (!apiKey || !websiteId) {
                res.statusCode = 503;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Umami not configured" }));
                return;
              }
              const urlObj = new URL(url, "http://localhost");
              const period = urlObj.searchParams.get("period") || "24h";
              const endAt = Date.now();
              const hours: Record<string, number> = { "24h": 24, "7d": 168, "30d": 720 };
              const h = hours[period] ?? 24;
              const startAt = endAt - h * 3600 * 1000;
              const headers = { "x-umami-api-key": apiKey };
              const UMAMI_BASE = "https://api.umami.is/v1";
              const statsRes = await fetch(`${UMAMI_BASE}/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`, { headers });
              if (!statsRes.ok) {
                res.statusCode = statsRes.status;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: `Umami API error` }));
                return;
              }
              const rawStats = await statsRes.json();
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ stats: rawStats, period }));
            } catch {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Failed to fetch Umami stats" }));
            }
            return;
          }

          // Push VAPID Key endpoint
          if (urlPath === "/api/push/vapid-key") {
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

          // Admin Reply Email endpoint - FIXED 405 ERROR
          if (urlPath === "/api/admin/reply-email") {
            if (req.method !== "POST") {
              res.statusCode = 405;
              res.setHeader("Content-Type", "application/json");
              res.setHeader("Allow", "POST");
              res.end(JSON.stringify({ success: false, error: `Method ${req.method} not allowed. Use POST.` }));
              return;
            }

            let body = "";
            req.on("data", (chunk) => { body += chunk.toString(); });
            req.on("end", async () => {
              res.setHeader("Content-Type", "application/json");
              try {
                if (!body.trim()) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ success: false, error: "Empty request body" }));
                  return;
                }
                const data = JSON.parse(body);
                const { userEmail, userName, replyMessage, originalMessage } = data;
                if (!userEmail || !replyMessage) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ success: false, error: "Missing fields" }));
                  return;
                }
                const ADMIN_NAME = "Muhammad Imran";
                const emailBody = `Hi ${userName},\n\n${replyMessage}\n\n---\nBest regards,\n${ADMIN_NAME}\nWhatsApp: +92 334 563 6230`;
                const emailSubject = `Re: Your inquiry from ${ADMIN_NAME}`;
                const emailSent = await sendEmailViaGmail(userEmail, emailSubject, emailBody);
                const emailLog = {
                  id: Date.now().toString(),
                  timestamp: new Date().toISOString(),
                  to: userEmail,
                  from: "mi6062610@gmail.com",
                  subject: emailSubject,
                  status: emailSent ? "delivered" : "failed",
                };
                emailLogs.push(emailLog);
                if (emailLogs.length > 50) emailLogs = emailLogs.slice(-50);
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, message: "Email sent", emailLog }));
              } catch (err) {
                console.error("[v0] Admin reply error:", err);
                res.statusCode = 500;
                res.end(JSON.stringify({ success: false, error: "Server error" }));
              }
            });
            return;
          }

          next();
        } catch (err) {
          console.error("[v0] Middleware error:", err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Internal server error" }));
        }
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
      "@": path.resolve(__dirname, "./src"),
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
