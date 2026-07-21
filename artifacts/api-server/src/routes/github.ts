import { Router } from "express";

const router = Router();

const GITHUB_USER = "muhammadimran9";

const BLOCKED_REPOS = ["branches"];
const BLOCKED_EVENT_TYPES = ["DeleteEvent"];

function buildHeaders() {
  const token =
    process.env["GITHUB_PERSONAL_ACCESS_TOKEN"] ?? process.env["GITHUB_TOKEN"];
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-app",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

router.get("/github/events", async (req, res) => {
  try {
    const ghRes = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100`,
      { headers: buildHeaders() }
    );

    if (!ghRes.ok) {
      res.status(ghRes.status).json({ error: `GitHub API error: ${ghRes.status}` });
      return;
    }

    const pollInterval = ghRes.headers.get("X-Poll-Interval") ?? "60";
    const data = (await ghRes.json()) as any[];

    const filtered = data
      .filter((e) => {
        const repoName = e.repo?.name?.split("/")[1] ?? "";
        if (BLOCKED_REPOS.includes(repoName)) return false;
        if (BLOCKED_EVENT_TYPES.includes(e.type)) return false;
        return true;
      })
      .slice(0, 20);

    res.set("X-Poll-Interval", pollInterval);
    res.set("Cache-Control", "no-store");
    res.json(filtered);
  } catch {
    res.status(500).json({ error: "Failed to fetch GitHub events" });
  }
});

router.get("/github/stats", async (req, res) => {
  try {
    const headers = buildHeaders();

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, { headers }),
    ]);

    if (!userRes.ok) {
      res.status(userRes.status).json({ error: `GitHub API error: ${userRes.status}` });
      return;
    }

    const user = (await userRes.json()) as any;
    const repos = reposRes.ok ? (await reposRes.json()) as any[] : [];

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

    res.set("Cache-Control", "public, max-age=300");
    res.json({
      login: user.login,
      name: user.name,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      topLanguages,
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch GitHub stats" });
  }
});

router.get("/github/contributions", async (req, res) => {
  try {
    const r = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
      { headers: { "User-Agent": "portfolio-app" } }
    );

    if (!r.ok) {
      res.status(r.status).json({ error: "Contributions API error" });
      return;
    }

    const data = await r.json();
    res.set("Cache-Control", "public, max-age=3600");
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch contributions" });
  }
});

export default router;
