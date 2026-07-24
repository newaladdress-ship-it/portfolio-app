import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import type { Plugin } from "vite";
import { Resend } from "resend";

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

      // Helper to send email via Gmail SMTP using Nodemailer
      async function sendEmailViaGmail(to: string, subject: string, text: string): Promise<boolean> {
        const fromEmail = process.env["GMAIL_USER"] || "mi6062610@gmail.com";
        const resendApiKey = process.env["RESEND_API_KEY"];
        
        console.log("[v0] Email Service (Resend):");
        console.log("[v0]   To:", to);
        console.log("[v0]   From:", fromEmail);
        console.log("[v0]   Subject:", subject);
        
        // If no Resend API key, log but don't send
        if (!resendApiKey) {
          console.log("[v0] ⚠ RESEND_API_KEY not set - email logged but not sent");
          return true;
        }
        
        try {
          // Create Resend client
          const resend = new Resend(resendApiKey);

          // Send email using Resend
          const result = await resend.emails.send({
            from: fromEmail,
            to: to,
            subject: subject,
            text: text,
            html: `<pre style="font-family: monospace; white-space: pre-wrap; word-wrap: break-word;">${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`,
          });

          if (result.error) {
            console.error("[v0] Resend error:", result.error);
            return false;
          }

          console.log("[v0] ✓ Email sent successfully via Resend");
          console.log("[v0]   Message ID:", result.data?.id);
          return true;
        } catch (err: any) {
          console.error("[v0] Email send error:", err.message);
          return false;
        }
      }

      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "";
        const urlPath = url.split("?")[0];
        
        // Debug logging
        console.log("[v0] DEBUG: Request received -", req.method, urlPath);
        
        // Enable CORS for all requests
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        
        // Handle OPTIONS preflight requests
        if (req.method === "OPTIONS") {
          console.log("[v0] DEBUG: OPTIONS preflight request");
          res.statusCode = 200;
          res.end();
          return;
        }

        // Admin Email Logs endpoint
        if (urlPath === "/api/admin/email-logs") {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ emails: emailLogs, total: emailLogs.length }));
          return;
        }

        // GitHub Events
        if (urlPath === "/api/github/events") {
          try {
            const r = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=10`, {
              headers: buildGitHubHeaders(),
            });
            const data = await r.json();
            const events = (data || []).map((e: any) => ({
              type: e.type,
              repo: e.repo.name,
              created_at: e.created_at,
              action: e.payload?.action,
              ref: e.payload?.ref,
            }));
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ events }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Failed to fetch GitHub events" }));
          }
          return;
        }

        // GitHub Stats
        if (urlPath === "/api/github/stats") {
          try {
            const r = await fetch(`https://api.github.com/users/${GITHUB_USER}`, {
              headers: buildGitHubHeaders(),
            });
            const data = await r.json();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
              name: data.name,
              bio: data.bio,
              location: data.location,
              public_repos: data.public_repos,
              followers: data.followers,
              following: data.following,
              avatar_url: data.avatar_url,
            }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Failed to fetch GitHub stats" }));
          }
          return;
        }

        // GitHub Contributions
        if (urlPath === "/api/github/contributions") {
          try {
            const r = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
              headers: buildGitHubHeaders(),
            });
            const data = await r.json();
            const totalStars = (data || []).reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
            const totalForks = (data || []).reduce((sum: number, repo: any) => sum + repo.forks_count, 0);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ total_stars: totalStars, total_forks: totalForks, repos_count: data.length }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Failed to fetch contributions" }));
          }
          return;
        }

        // WakaTime Languages
        if (urlPath === "/api/wakatime/languages") {
          const apiKey = process.env["WAKATIME_API_KEY"];
          if (!apiKey) {
            res.statusCode = 503;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "WakaTime API key not configured" }));
            return;
          }
          try {
            const r = await fetch(
              "https://wakatime.com/api/v1/users/current/stats/all_time",
              { headers: makeWakaHeaders(apiKey) }
            );
            if (!r.ok) {
              res.statusCode = r.status;
              res.setHeader("Content-Type", "application/json");
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
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Failed to fetch WakaTime language stats" }));
          }
          return;
        }

        // WakaTime Stats
        if (urlPath.startsWith("/api/wakatime/stats")) {
          const apiKey = process.env["WAKATIME_API_KEY"];
          if (!apiKey) {
            res.statusCode = 503;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "WakaTime API key not configured" }));
            return;
          }
          try {
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
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Failed to fetch WakaTime stats" }));
          }
          return;
        }

        // WakaTime Today
        if (urlPath === "/api/wakatime/today") {
          const apiKey = process.env["WAKATIME_API_KEY"];
          if (!apiKey) {
            res.statusCode = 503;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "WakaTime API key not configured" }));
            return;
          }
          try {
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
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Failed to fetch today's stats" }));
          }
          return;
        }

        // Umami Stats
        if (urlPath.startsWith("/api/umami/stats")) {
          const apiKey = process.env["UMAMI_API_KEY"];
          const websiteId = process.env["UMAMI_WEBSITE_ID"];
          console.log("[v0] Umami request - API Key:", !!apiKey, "Website ID:", !!websiteId);
          if (!apiKey || !websiteId) {
            res.statusCode = 503;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Umami not configured" }));
            return;
          }
          try {
            const urlObj = new URL(url, "http://localhost");
            const period = urlObj.searchParams.get("period") || "24h";
            const endAt = Date.now();
            const hours: Record<string, number> = { "24h": 24, "7d": 168, "30d": 720 };
            const h = hours[period] ?? 24;
            const startAt = endAt - h * 3600 * 1000;
            const prevStart = startAt - (endAt - startAt);
            const headers = { "x-umami-api-key": apiKey };
            const UMAMI_BASE = "https://api.umami.is/v1";

            console.log("[v0] Umami request period:", period, "Website ID:", websiteId);
            const [statsRes, pageviewRes, prevStatsRes] = await Promise.all([
              fetch(`${UMAMI_BASE}/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}&compareStartAt=${prevStart}&compareEndAt=${startAt}`, { headers }),
              fetch(`${UMAMI_BASE}/websites/${websiteId}/pageviews?startAt=${startAt}&endAt=${endAt}&unit=hour`, { headers }),
              fetch(`${UMAMI_BASE}/websites/${websiteId}/stats?startAt=${prevStart}&endAt=${startAt}`, { headers }),
            ]);

            console.log("[v0] Umami responses:", statsRes.status, pageviewRes.status);
            if (!statsRes.ok) {
              const text = await statsRes.text();
              res.statusCode = statsRes.status;
              res.setHeader("Content-Type", "application/json");
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
          } catch (err) {
            console.error("[v0] Umami error:", err);
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

        // Admin Reply Email endpoint
        if (urlPath === "/api/admin/reply-email") {
          console.log("[v0] DEBUG: /api/admin/reply-email request received");
          console.log("[v0] DEBUG: Method =", req.method);
          console.log("[v0] DEBUG: Headers =", req.headers);
          
          if (req.method !== "POST") {
            console.log("[v0] DEBUG: Method is not POST, returning 405");
            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Allow", "POST");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.end(JSON.stringify({ success: false, error: `Method ${req.method} not allowed. Use POST.` }));
            return;
          }

          let body = "";
          req.on("data", (chunk) => { 
            body += chunk.toString();
            console.log("[v0] DEBUG: Received data chunk, total length now:", body.length);
          });
          req.on("end", async () => {
            console.log("[v0] DEBUG: Request body complete, length:", body.length);
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            try {
              if (!body || body.trim().length === 0) {
                console.log("[v0] DEBUG: Empty request body");
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: "Empty request body" }));
                return;
              }

              let data;
              try {
                console.log("[v0] DEBUG: Parsing JSON body");
                data = JSON.parse(body);
                console.log("[v0] DEBUG: JSON parsed successfully, data keys:", Object.keys(data));
              } catch (parseErr) {
                console.log("[v0] DEBUG: JSON parse error:", parseErr);
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: "Invalid JSON in request body" }));
                return;
              }

              const { userEmail, userName, replyMessage, originalMessage } = data;
              console.log("[v0] DEBUG: Extracted fields - email:", userEmail, "name:", userName);
              
              if (!userEmail || !replyMessage) {
                console.log("[v0] DEBUG: Missing required fields");
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: "Missing required fields" }));
                return;
              }

              const ADMIN_NAME = "Muhammad Imran";
              const ADMIN_TITLE = "Web App Developer";
              const ADMIN_WEBSITE = "imrandigitals.online";
              const ADMIN_EMAIL = "mi6062610@gmail.com";
              
              console.log("[v0] DEBUG: Preparing email body");
              // Format the email body with proper structure
              const emailBody = `Dear ${userName || "User"},

${replyMessage}

Kind Regards,
${ADMIN_NAME}
${ADMIN_TITLE}
${ADMIN_WEBSITE}
Email: ${ADMIN_EMAIL}
${originalMessage ? `\n---\nOriginal Message:\n${originalMessage}` : ""}`;
              
              const emailSubject = `Re: Your inquiry - Reply from ${ADMIN_NAME}`;
              
              console.log("[v0] DEBUG: Sending email via Resend");
              await sendEmailViaGmail(userEmail, emailSubject, emailBody);
              console.log("[v0] DEBUG: Email sent successfully");

              const emailLog = {
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                to: userEmail,
                from: process.env["GMAIL_USER"] || "mi6062610@gmail.com",
                userName: userName || "Unknown",
                subject: emailSubject,
                status: "delivered",
                messagePreview: replyMessage.substring(0, 100),
              };

              emailLogs.push(emailLog);
              if (emailLogs.length > 50) emailLogs = emailLogs.slice(-50);

              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, message: "Reply email sent successfully", emailLog }));
            } catch (err) {
              console.error("[v0] Admin reply error:", err);
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err instanceof Error ? err.message : "Internal error" }));
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
  esbuild: {
    drop: ["console", "debugger"],
  },
  plugins: [react(), tailwindcss(), apiRoutesPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: basePath,
  build: {
    target: "ES2020",
    minify: "esbuild",
    rollupOptions: {
      output: {
        // Optimize chunk size and naming
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|gif|svg/.test(ext)) {
            return `images/[name]-[hash][extname]`;
          } else if (/woff|woff2|eot|ttf|otf/.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          } else if (ext === "css") {
            return `css/[name]-[hash][extname]`;
          }
          return `[name]-[hash][extname]`;
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) {
              return "framer-motion";
            }
            if (id.includes("react-icons") || id.includes("lucide-react")) {
              return "icons-vendor";
            }
            if (id.includes("firebase") || id.includes("@firebase")) {
              return "firebase-vendor";
            }
            if (id.includes("@google/genai") || id.includes("@google/generative-ai") || id.includes("openai")) {
              return "ai-vendor";
            }
            if (id.includes("recharts")) {
              return "recharts-vendor";
            }
            return "vendor";
          }
        },
      },
    },
    // Compression settings
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // Inline small assets
  },
  
  // Optimization settings
  optimizeDeps: {
    include: [
      "react",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-dom",
      "react-dom/client",
      "wouter",
      "zustand",
      "framer-motion",
      "lucide-react",
      "react-icons/si",
      "react-icons/tb",
      "react-icons/hi",
      "react-icons/bi",
      "react-icons/pi",
      "react-icons/hi2",
      "react-icons/bs",
      "clsx",
      "date-fns",
    ],
  },
});
