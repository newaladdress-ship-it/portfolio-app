import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import WakaTimeSetupModal from "@/components/WakaTimeSetupModal";
import { BiCategory } from "react-icons/bi";
import { SiGithub, SiWakatime } from "react-icons/si";
import {
  HiCode, HiStar, HiUsers, HiClock,
  HiOutlineExternalLink, HiOutlineRefresh,
  HiOutlinePlusSm, HiOutlineUpload, HiOutlineStar,
  HiOutlineTag, HiOutlineFolderAdd, HiOutlineEye,
  HiOutlineBookOpen,
} from "react-icons/hi";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import { useT } from "@/lib/i18n";

const GITHUB_USER = "muhammadimran9";

function useStats() {
  const t = useT();
  return [
    { label: t.dashboard.stars, value: "200+", icon: <HiStar size={24} />, color: "text-yellow-500" },
    { label: t.dashboard.clients, value: "10+", icon: <HiUsers size={24} />, color: "text-green-500" },
    { label: t.dashboard.experience, value: "2+", icon: <HiClock size={24} />, color: "text-purple-500" },
  ];
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500", JavaScript: "bg-yellow-400", Python: "bg-green-500",
  Dart: "bg-cyan-500", HTML: "bg-orange-500", CSS: "bg-purple-500",
  "Tailwind CSS": "bg-teal-400", "React": "bg-cyan-400", PHP: "bg-indigo-500",
  Kotlin: "bg-violet-500", Swift: "bg-orange-400", Rust: "bg-orange-600",
  Go: "bg-blue-400", Java: "bg-red-500", "C#": "bg-green-600",
  "C++": "bg-blue-700", Shell: "bg-neutral-500", JSON: "bg-neutral-400",
  Markdown: "bg-neutral-400", YAML: "bg-rose-400", Other: "bg-neutral-400",
};
function getLangColor(name: string) {
  return LANG_COLORS[name] ?? "bg-yellow-400";
}

type WakaLang = { name: string; percent: number; text: string };

function WakaTimeLangSection() {
  const [langs, setLangs] = useState<WakaLang[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/api/wakatime/languages")
      .then(r => r.json())
      .then(d => {
        if (d.languages && d.languages.length > 0) {
          setLangs(d.languages);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SpotlightCard className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <SiWakatime size={18} className="text-blue-500" />
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Technology Usage</h3>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 text-[11px] text-blue-600 dark:text-blue-400 font-medium">
          <SiWakatime size={10} />
          WakaTime · All-time history
        </div>
      </div>

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between">
                <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                <div className="h-3 w-10 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-6 text-sm text-neutral-500 dark:text-neutral-400">
          No coding statistics available.
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-3">
          {langs.map((lang, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">{lang.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-neutral-400 dark:text-neutral-500">{lang.text}</span>
                  <span className="text-neutral-500 dark:text-neutral-400 tabular-nums">{lang.percent}%</span>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700">
                <div
                  className={`h-2 rounded-full ${getLangColor(lang.name)} transition-all duration-1000`}
                  style={{ width: `${lang.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </SpotlightCard>
  );
}

const ACTIVITY = [
  { month: "Jan", commits: 45 },
  { month: "Feb", commits: 62 },
  { month: "Mar", commits: 38 },
  { month: "Apr", commits: 75 },
  { month: "May", commits: 55 },
  { month: "Jun", commits: 90 },
  { month: "Jul", commits: 48 },
  { month: "Aug", commits: 70 },
  { month: "Sep", commits: 83 },
  { month: "Oct", commits: 60 },
  { month: "Nov", commits: 95 },
  { month: "Dec", commits: 72 },
];

const maxCommits = Math.max(...ACTIVITY.map(a => a.commits));

type GitHubStats = {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: string[];
};

type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const LEVEL_COLORS = [
  "bg-neutral-200 dark:bg-neutral-800",
  "bg-green-200 dark:bg-green-900",
  "bg-green-400 dark:bg-green-700",
  "bg-green-500 dark:bg-green-500",
  "bg-green-600 dark:bg-green-400",
];

function ContributionHeatmap() {
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github/contributions")
      .then((r) => r.json())
      .then((d) => {
        if (d.contributions) {
          setDays(d.contributions);
          const t = d.total ? Object.values(d.total as Record<string, number>).reduce((a, b) => a + b, 0) : null;
          setTotal(t);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const weeks: ContributionDay[][] = [];
  if (days.length) {
    let week: ContributionDay[] = [];
    days.forEach((d, i) => {
      week.push(d);
      if (week.length === 7 || i === days.length - 1) {
        weeks.push(week);
        week = [];
      }
    });
  }

  return (
    <SpotlightCard className="p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <SiGithub size={18} className="text-neutral-700 dark:text-neutral-300" />
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Contribution Graph</h3>
          {total !== null && (
            <span className="rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-[10px] font-medium text-green-700 dark:text-green-400">
              {total.toLocaleString()} contributions
            </span>
          )}
        </div>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-lg border border-neutral-200 dark:border-neutral-700 px-2 py-1 text-[11px] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          GitHub <HiOutlineExternalLink size={10} />
        </a>
      </div>

      {loading && (
        <div className="h-24 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800" />
      )}

      {!loading && weeks.length > 0 && (
        <div className="overflow-x-auto">
          <div className="flex gap-[3px] min-w-max">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} contributions`}
                    className={`w-[10px] h-[10px] rounded-sm ${LEVEL_COLORS[day.level ?? 0]} transition-colors hover:ring-1 hover:ring-green-400`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-3 justify-end">
            <span className="text-[10px] text-neutral-400">Less</span>
            {LEVEL_COLORS.map((c, i) => (
              <div key={i} className={`w-[10px] h-[10px] rounded-sm ${c}`} />
            ))}
            <span className="text-[10px] text-neutral-400">More</span>
          </div>
        </div>
      )}
    </SpotlightCard>
  );
}

function GitHubStatsCard() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github/stats")
      .then((r) => r.json())
      .then((d) => { if (!d.error) setStats(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statItems = stats ? [
    { label: "Repositories", value: stats.publicRepos, icon: <HiOutlineBookOpen size={16} />, color: "text-blue-500" },
    { label: "Total Stars", value: stats.totalStars, icon: <HiOutlineStar size={16} />, color: "text-yellow-500" },
    { label: "Followers", value: stats.followers, icon: <HiUsers size={16} />, color: "text-purple-500" },
    { label: "Following", value: stats.following, icon: <HiUsers size={16} />, color: "text-green-500" },
  ] : [];

  return (
    <SpotlightCard className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SiGithub size={18} className="text-neutral-700 dark:text-neutral-300" />
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">GitHub Profile</h3>
        </div>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-lg border border-neutral-200 dark:border-neutral-700 px-2 py-1 text-[11px] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          View Profile <HiOutlineExternalLink size={10} />
        </a>
      </div>

      {loading && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
          ))}
        </div>
      )}

      {!loading && stats && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {statItems.map((s, i) => (
              <div key={i} className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 p-3 text-center">
                <div className={`flex justify-center mb-1 ${s.color}`}>{s.icon}</div>
                <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{s.value}</p>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
          {stats.topLanguages && stats.topLanguages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 self-center">Top languages:</span>
              {stats.topLanguages.map((lang) => (
                <span key={lang} className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-2.5 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">
                  {lang}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </SpotlightCard>
  );
}

type GitHubEvent = {
  id: string;
  type: string;
  repo: { name: string; url: string };
  payload: {
    commits?: { message: string; sha: string }[];
    ref?: string;
    ref_type?: string;
    action?: string;
    description?: string;
  };
  created_at: string;
};

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function eventIcon(type: string) {
  switch (type) {
    case "PushEvent":        return <HiOutlineUpload size={14} className="text-blue-500" />;
    case "CreateEvent":      return <HiOutlinePlusSm size={14} className="text-green-500" />;
    case "WatchEvent":       return <HiOutlineStar size={14} className="text-yellow-500" />;
    case "ForkEvent":        return <HiOutlineTag size={14} className="text-purple-500" />;
    case "PublicEvent":      return <HiOutlineEye size={14} className="text-cyan-500" />;
    case "DeleteEvent":      return <HiOutlineFolderAdd size={14} className="text-red-500" />;
    default:                 return <HiCode size={14} className="text-neutral-400" />;
  }
}

function eventSummary(event: GitHubEvent): string {
  const repo = event.repo.name.split("/")[1] ?? event.repo.name;
  switch (event.type) {
    case "PushEvent": {
      const commits = event.payload.commits ?? [];
      if (commits.length === 1) return `Pushed "${commits[0].message.split("\n")[0]}" to ${repo}`;
      return `Pushed ${commits.length} commit${commits.length > 1 ? "s" : ""} to ${repo}`;
    }
    case "CreateEvent":
      return `Created ${event.payload.ref_type ?? "branch"} "${event.payload.ref ?? repo}" in ${repo}`;
    case "WatchEvent":
      return `Starred ${repo}`;
    case "ForkEvent":
      return `Forked ${repo}`;
    case "PublicEvent":
      return `Made ${repo} public`;
    case "DeleteEvent":
      return `Deleted ${event.payload.ref_type} "${event.payload.ref}" from ${repo}`;
    default:
      return `Activity in ${repo}`;
  }
}

function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const pollIntervalRef = useRef<number>(60);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function fetchEvents(silent = false) {
    try {
      if (!silent) setLoading(true);
      setError(null);
      const res = await fetch("/api/github/events");
      if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
      const pollSec = Number(res.headers.get("X-Poll-Interval") ?? "60");
      if (!isNaN(pollSec) && pollSec > 0) pollIntervalRef.current = pollSec;
      const data: GitHubEvent[] = await res.json();
      setEvents(data.slice(0, 20));
      setLastFetched(new Date());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  function scheduleNext() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      await fetchEvents(true);
      scheduleNext();
    }, pollIntervalRef.current * 1000);
  }

  useEffect(() => {
    fetchEvents().then(() => scheduleNext());
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <SpotlightCard className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SiGithub size={18} className="text-neutral-700 dark:text-neutral-300" />
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">GitHub Activity</h3>
          <span className="flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-[10px] font-medium text-green-700 dark:text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </span>
        </div>
        <div className="flex items-center gap-2">
          {lastFetched && (
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
              Updated {timeAgo(lastFetched.toISOString())}
            </span>
          )}
          <button
            onClick={() => fetchEvents()}
            disabled={loading}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 dark:border-neutral-700 px-2 py-1 text-[11px] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            <HiOutlineRefresh size={12} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg border border-neutral-200 dark:border-neutral-700 px-2 py-1 text-[11px] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            GitHub <HiOutlineExternalLink size={10} />
          </a>
        </div>
      </div>

      {loading && events.length === 0 && (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 animate-pulse">
              <div className="mt-0.5 h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-700 shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-2 w-1/3 rounded bg-neutral-100 dark:bg-neutral-800" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/10 p-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <p className="text-sm text-neutral-400">No recent public activity found.</p>
      )}

      {events.length > 0 && (
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {events.map((event) => (
            <div key={event.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                {eventIcon(event.type)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-neutral-800 dark:text-neutral-200">
                  {eventSummary(event)}
                </p>
                <div className="mt-0.5 flex items-center gap-2">
                  <a
                    href={`https://github.com/${event.repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-[11px] text-neutral-400 dark:text-neutral-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {event.repo.name}
                  </a>
                  <span className="text-[11px] text-neutral-300 dark:text-neutral-600">·</span>
                  <span className="shrink-0 text-[11px] text-neutral-400 dark:text-neutral-500">
                    {timeAgo(event.created_at)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SpotlightCard>
  );
}

type WakaStat = { name: string; text: string; percent: number };

type WakaData = {
  data: {
    human_readable_total?: string;
    human_readable_total_including_other_language?: string;
    human_readable_daily_average?: string;
    human_readable_daily_average_including_other_language?: string;
    human_readable_range?: string;
    best_day?: { date: string; text: string };
    languages: WakaStat[];
    editors: WakaStat[];
    operating_systems: WakaStat[];
    machines: WakaStat[];
  };
};

type WakaToday = { todayTotal: string; todaySecs: number };

const PALETTE = [
  "bg-blue-500", "bg-orange-500", "bg-green-500", "bg-purple-500",
  "bg-cyan-500", "bg-yellow-500", "bg-red-500", "bg-pink-500",
];

const WAKA_REFRESH_MS = 60 * 60 * 1000;

function WakaBreakdownRow({ items, colors }: { items: WakaStat[]; colors?: Record<string, string> }) {
  return (
    <div className="space-y-2">
      {items.slice(0, 5).map((item, i) => {
        const barColor = colors?.[item.name] ?? PALETTE[i % PALETTE.length];
        return (
          <div key={item.name} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <span className={`inline-block w-2 h-2 rounded-sm ${barColor}`} />
                {item.name}
              </span>
              <span className="text-neutral-500 dark:text-neutral-400 tabular-nums">{item.text} · {item.percent.toFixed(1)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-700">
              <div className={`h-1.5 rounded-full ${barColor} transition-all duration-700`} style={{ width: `${item.percent}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const RANGES = [
  { id: "last_7_days", label: "Last 7 Days" },
  { id: "last_30_days", label: "Last 30 Days" },
  { id: "all_time", label: "All Time" },
];

function formatTopDay(dateStr?: string) {
  if (!dateStr) return "-";
  const date = new Date(dateStr + "T00:00:00");
  if (isNaN(date.getTime())) return dateStr;
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const monthName = date.toLocaleDateString("en-US", { month: "short" });
  const dayNum = date.getDate();
  const suffix = ["th", "st", "nd", "rd"][(dayNum % 10 > 3 || [11, 12, 13].includes(dayNum % 100)) ? 0 : dayNum % 10];
  return `${dayName} ${monthName} ${dayNum}${suffix}`;
}

function WakaTimeSection() {
  const [range, setRange] = useState("last_7_days");
  const [data, setData] = useState<WakaData | null>(null);
  const [today, setToday] = useState<WakaToday | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function fetchData(targetRange = range, silent = false, force = false) {
    try {
      if (!silent) setLoading(true);
      setError(null);
      const forceQuery = force ? "&force=true" : "";
      const [statsRes, todayRes] = await Promise.all([
        fetch(`/api/wakatime/stats?range=${targetRange}${forceQuery}`),
        fetch(`/api/wakatime/today?${force ? "force=true" : ""}`),
      ]);
      const stats = await statsRes.json();
      const todayData = await todayRes.json();
      if (stats.error) setError(stats.error);
      else {
        setData(stats);
        setToday(todayData.error ? null : todayData);
        setLastFetched(new Date());
      }
    } catch {
      setError("Failed to load");
    } finally {
      setLoading(false);
    }
  }

  function scheduleNext() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => { await fetchData(range, true); scheduleNext(); }, WAKA_REFRESH_MS);
  }

  useEffect(() => {
    fetchData(range).then(() => scheduleNext());
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [range]);

  const totalCoding = data?.data
    ? (data.data.human_readable_total_including_other_language ?? data.data.human_readable_total ?? "-")
    : "-";

  const dailyAvg = data?.data
    ? (data.data.human_readable_daily_average_including_other_language ?? data.data.human_readable_daily_average ?? "-")
    : "-";

  const rangeLabel = range === "last_7_days" ? "the Last 7 Days" : range === "last_30_days" ? "the Last 30 Days" : "All Time";
  const dailyAvgSub = range === "last_7_days" ? "over 7 days" : range === "last_30_days" ? "over 30 days" : "all time avg";
  const topDayFormatted = formatTopDay(data?.data?.best_day?.date);

  return (
    <SpotlightCard className="p-6 space-y-6">
      {/* Top Header matching WakaTime dashboard */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SiWakatime size={18} className="text-blue-500" />
            <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400">
              WAKATIME DASHBOARD
            </span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Activity Overview
          </h2>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Range Selector */}
          <div className="flex items-center rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/80 p-1 text-xs">
            {RANGES.map(r => (
              <button
                key={r.id}
                onClick={() => setRange(r.id)}
                className={`px-3 py-1 rounded-lg font-medium text-xs transition-all ${
                  range === r.id
                    ? "bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {lastFetched && (
            <span className="text-[10px] text-neutral-400">Updated {timeAgo(lastFetched.toISOString())}</span>
          )}

          <button
            onClick={() => fetchData(range, false, true)}
            disabled={loading}
            className="flex items-center gap-1 rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            <HiOutlineRefresh size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
          <a
            href="https://wakatime.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            WakaTime <HiOutlineExternalLink size={12} />
          </a>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 animate-pulse">
          <div className="h-28 rounded-2xl bg-neutral-100 dark:bg-neutral-800 lg:col-span-1" />
          <div className="grid grid-cols-3 gap-3 lg:col-span-3">
            <div className="h-28 rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-28 rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-28 rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-yellow-200 dark:border-yellow-800/40 bg-yellow-50 dark:bg-yellow-900/10 p-5">
          <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">No coding activity available.</p>
        </div>
      )}

      {!loading && data && (
        <div className="space-y-6">
          {/* Main Activity Overview Card matching official WakaTime screenshot */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
              
              {/* Left Column: Huge Total Coding Hours */}
              <div className="lg:col-span-5 space-y-1.5">
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  over {rangeLabel}
                </p>
                <div className="text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-none">
                  {totalCoding}
                </div>
              </div>

              {/* Right Column: 3 Cards Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* CURRENT DAY */}
                <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-1 shadow-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    CURRENT DAY
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {today?.todayTotal ?? "0 mins"}
                  </p>
                  <p className="text-[11px] text-neutral-400">Today</p>
                </div>

                {/* DAILY AVERAGE */}
                <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-1 shadow-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    DAILY AVERAGE
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {dailyAvg}
                  </p>
                  <p className="text-[11px] text-neutral-400">{dailyAvgSub}</p>
                </div>

                {/* MOST ACTIVE */}
                <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-1 shadow-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    MOST ACTIVE
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 truncate">
                    {topDayFormatted}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    {data.data.best_day?.text ? `${data.data.best_day.text} (top day)` : "top day"}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Breakdowns Grid (Languages, Editors, OS, Machines) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {data.data.languages?.length > 0 && (
              <div className="space-y-3 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">Languages</p>
                <WakaBreakdownRow items={data.data.languages} colors={LANG_COLORS} />
              </div>
            )}
            {data.data.editors?.length > 0 && (
              <div className="space-y-3 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">Editors</p>
                <WakaBreakdownRow items={data.data.editors} />
              </div>
            )}
            {data.data.operating_systems?.length > 0 && (
              <div className="space-y-3 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">Operating Systems</p>
                <WakaBreakdownRow items={data.data.operating_systems} />
              </div>
            )}
            {data.data.machines?.length > 0 && (
              <div className="space-y-3 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">Machines</p>
                <WakaBreakdownRow items={data.data.machines} />
              </div>
            )}
          </div>
        </div>
      )}
    </SpotlightCard>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Umami Analytics Section                                                   */
/* ────────────────────────────────────────────────────────────────────────── */

function UmamiSection() {
  return (
    <SpotlightCard className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
            Website Traffic Analytics
          </h3>
        </div>
        <a
          href="https://cloud.umami.is/share/hmcwzA74Z1Y9CAbm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-blue-500 hover:underline"
        >
          View Full Report <HiOutlineExternalLink size={12} />
        </a>
      </div>
      <div className="w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 h-[500px] bg-neutral-50 dark:bg-neutral-950">
        <iframe
          src="https://cloud.umami.is/share/hmcwzA74Z1Y9CAbm"
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Umami Analytics Dashboard"
          loading="lazy"
        />
      </div>
    </SpotlightCard>
  );
}

export default function DashboardPage() {
  const t = useT();
  const stats = useStats();
  return (
    <section className="space-y-8">
      <SEOHead
        title="Live Developer Dashboard - Muhammad Imran Code Stats"
        description="Real-time developer dashboard showing live GitHub activity, coding hours, language breakdown, and portfolio analytics for Muhammad Imran."
        path="/dashboard"
      />
      <div className="space-y-2">
        <SectionHeading title={t.dashboard.heading} icon={<BiCategory />} />
        <SectionSubHeading>
          <p>{t.dashboard.sub}</p>
        </SectionSubHeading>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <SpotlightCard key={i} className="p-4 space-y-3">
            <div className={stat.color}>{stat.icon}</div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{stat.value}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{stat.label}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* GitHub Profile Stats */}
      <GitHubStatsCard />

      {/* GitHub Contribution Heatmap */}
      <ContributionHeatmap />

      {/* Umami Analytics */}
      <UmamiSection />

      {/* WakaTime Coding Activity */}
      <WakaTimeSection />

      {/* Tech Usage - live from WakaTime */}
      <WakaTimeLangSection />

      {/* Activity Chart */}
      <SpotlightCard className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <SiGithub size={18} className="text-neutral-700 dark:text-neutral-300" />
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Coding Activity</h3>
        </div>
        <div className="flex items-end gap-2 h-32">
          {ACTIVITY.map((a, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t-sm bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400 transition-colors duration-200"
                style={{ height: `${(a.commits / maxCommits) * 100}%` }}
                title={`${a.commits} commits`}
              />
              <span className="text-[9px] text-neutral-400 dark:text-neutral-600">{a.month}</span>
            </div>
          ))}
        </div>
      </SpotlightCard>

      {/* Tools */}
      <SpotlightCard className="p-6 space-y-4">
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Favorite Tools</h3>
        <div className="flex flex-wrap gap-3">
          {["VS Code", "GitHub", "Figma", "Postman", "Docker Desktop", "iTerm2", "Linear", "Notion"].map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {tool}
            </span>
          ))}
        </div>
      </SpotlightCard>
    </section>
  );
}
