import { useState, useRef, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { BiCollection } from "react-icons/bi";
import { SiGithub } from "react-icons/si";
import { HiOutlineExternalLink, HiStar, HiSearch, HiArrowRight } from "react-icons/hi";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import { PROJECTS, PERSONAL } from "@/data/personal";
import { toSlug } from "@/pages/ProjectDetailPage";
import { useT } from "@/lib/i18n";

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  web: "Web",
  frontend: "Frontend",
  ecommerce: "E-Commerce",
  tools: "Tools",
  mobile: "Mobile",
};

const CATEGORY_COLORS: Record<string, string> = {
  web:       "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  frontend:  "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  ecommerce: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  tools:     "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  mobile:    "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
};

const ALL_CATEGORIES = ["all", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

type Project = typeof PROJECTS[0];

function LivePreviewThumb({ url, fallbackImg, name }: { url: string; fallbackImg: string; name: string }) {
  const [state, setState] = useState<"loading" | "live" | "blocked">("loading");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setState("blocked"), 6000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  function handleLoad() {
    if (timerRef.current) clearTimeout(timerRef.current);
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc && doc.body && doc.body.innerHTML !== "") {
        setState("live");
        return;
      }
    } catch {
      // cross-origin — check if frame window is accessible at all
    }
    try {
      const win = iframeRef.current?.contentWindow;
      if (win && win.location.href !== "about:blank") {
        setState("live");
        return;
      }
    } catch {
      // cross-origin but loaded — show as live
      setState("live");
      return;
    }
    setState("blocked");
  }

  if (state === "blocked") {
    return (
      <>
        <img
          src={fallbackImg}
          alt={`${name} screenshot`}
          loading="lazy"
          decoding="async"
          className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-white hover:bg-black/80 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <HiOutlineExternalLink size={10} />
          Visit Site
        </a>
      </>
    );
  }

  return (
    <>
      {state === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 z-10">
          <div className="h-6 w-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={url}
        title={`${name} live preview`}
        scrolling="no"
        onLoad={handleLoad}
        style={{
          width: "250%",
          height: "440px",
          transform: "scale(0.4)",
          transformOrigin: "top left",
          pointerEvents: "none",
          border: "none",
          opacity: state === "live" ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      {state === "live" && (
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          Live Preview
        </div>
      )}
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const catColor = CATEGORY_COLORS[project.category] ?? "bg-neutral-100 text-neutral-600 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700";
  const previewUrl = (project as any).previewUrl as string | undefined;

  return (
    <SpotlightCard className="group flex flex-col overflow-hidden h-full">
      {/* Image / Live Preview */}
      <div className="relative overflow-hidden h-44 w-full bg-neutral-100 dark:bg-neutral-900">
        {previewUrl ? (
          <LivePreviewThumb url={previewUrl} fallbackImg={project.image} name={project.name} />
        ) : (
          <img
            src={project.image}
            alt={`${project.name} - project screenshot`}
            loading="lazy"
            decoding="async"
            width={500}
            height={176}
            className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent pointer-events-none" />
        {/* Featured badge */}
        {project.isFeatured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-yellow-400 px-2.5 py-0.5 text-[10px] font-semibold text-yellow-900 shadow">
            <HiStar size={11} />
            Featured
          </div>
        )}
        {/* Category badge */}
        <span className={`absolute top-3 right-3 rounded-full border px-2.5 py-0.5 text-[10px] font-medium backdrop-blur-sm ${catColor}`}>
          {CATEGORY_LABELS[project.category] ?? project.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
            {project.name}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="space-y-3">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-0.5 text-[11px] text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="space-y-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            {/* Read More — always visible */}
            <Link
              href={`/projects/${toSlug(project.name)}`}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-4 py-2 text-xs font-semibold text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
            >
              Read More
              <HiArrowRight size={13} />
            </Link>

            {/* External links row */}
            <div className="flex items-center gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                >
                  <SiGithub size={13} />
                  Source
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                >
                  <HiOutlineExternalLink size={13} />
                  Live Demo
                </a>
              )}
              {!project.githubUrl && !project.liveUrl && (
                <span className="text-xs text-neutral-400 dark:text-neutral-600 italic">Private project</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function ProjectsPage() {
  const t = useT();
  const [search, setSearch]             = useState("");
  const [activeCategory, setCategory]   = useState("all");

  const filtered = PROJECTS
    .filter((p) => p.isShow)
    .filter((p) => {
      const matchSearch   = p.name.toLowerCase().includes(search.toLowerCase()) ||
                            p.description.toLowerCase().includes(search.toLowerCase()) ||
                            p.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = activeCategory === "all" || p.category === activeCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return a.id - b.id;
    });

  return (
    <section className="space-y-6">
      <SEOHead
        title="Projects Portfolio — Muhammad Imran | React & MERN Apps"
        description="Explore Muhammad Imran's project portfolio — modern web apps & full-stack builds using React, Next.js, Node.js, MongoDB, PostgreSQL & Tailwind."
        path="/projects"
      />
      <div className="space-y-2">
        <SectionHeading title={t.projects.heading} icon={<BiCollection />} />
        <SectionSubHeading>
          <p>{t.projects.sub}</p>
        </SectionSubHeading>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1 sm:max-w-xs">
            <HiSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={t.projects.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all border ${
                  activeCategory === cat
                    ? "bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100"
                    : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 dark:bg-neutral-900 dark:text-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500"
                }`}
              >
                {CATEGORY_LABELS[cat] ?? cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t.projects.showing} {filtered.length} {t.projects.of} {PROJECTS.filter((p) => p.isShow).length} {t.projects.heading.toLowerCase()}
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-neutral-400 dark:text-neutral-600">
          <BiCollection size={48} />
          <p className="mt-4 text-lg">{t.common.noProjects}</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.93 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* GitHub CTA */}
      <a
        href={PERSONAL.github}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center justify-between gap-4 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 px-6 py-5 transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 group-hover:scale-110 transition-transform duration-300">
            <SiGithub size={22} />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{t.projects.githubNote}</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">github.com/{PERSONAL.github.split("/").pop()}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors shrink-0">
          {t.projects.visitGithub}
          <HiOutlineExternalLink size={14} />
        </div>
      </a>
    </section>
  );
}
