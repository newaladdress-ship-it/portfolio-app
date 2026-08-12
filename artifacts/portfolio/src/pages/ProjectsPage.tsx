import { useState, useRef, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { BiCollection } from "react-icons/bi";
import { SiGithub } from "react-icons/si";
import {
  HiOutlineExternalLink,
  HiStar,
  HiSearch,
  HiArrowRight,
  HiOutlineFolder,
  HiOutlineSparkles,
} from "react-icons/hi";
import {
  ArrowRight,
  Code2,
  Cpu,
  Sparkles,
  Layers,
  Globe,
  Database,
  Search,
  Wrench,
  Bot,
  CheckCircle2,
  ExternalLink,
  Smartphone,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import Breakline from "@/components/layout/Breakline";
import { PROJECTS, PERSONAL } from "@/data/personal";
import { toSlug } from "@/pages/ProjectDetailPage";

const CATEGORY_MAP: Record<string, string> = {
  all: "All Projects",
  web: "Web Development",
  mern: "Full-Stack & MERN",
  ai: "AI & AI-Powered Tools",
  tools: "SEO & Web Tools",
  ecommerce: "E-Commerce",
  frontend: "Frontend",
  mobile: "Mobile Applications",
};

const CATEGORY_COLORS: Record<string, string> = {
  web: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  mern: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  ai: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  tools: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  ecommerce: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  frontend: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  mobile: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
};

type Project = typeof PROJECTS[0];

function LivePreviewThumb({ url, fallbackImg, name }: { url: string; fallbackImg: string; name: string }) {
  const [state, setState] = useState<"idle" | "loading" | "live" | "blocked">("idle");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 1024 || navigator.maxTouchPoints > 0);
    }
  }, []);

  function handleMouseEnter() {
    if (isMobile) return;
    if (state !== "idle") return;
    hoverTimerRef.current = setTimeout(() => {
      setState("loading");
      timerRef.current = setTimeout(() => setState("blocked"), 6000);
    }, 600);
  }

  function handleMouseLeave() {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
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
      // cross origin catch
    }
    try {
      const win = iframeRef.current?.contentWindow;
      if (win && win.location.href !== "about:blank") {
        setState("live");
        return;
      }
    } catch {
      setState("live");
      return;
    }
    setState("blocked");
  }

  if (isMobile || state === "idle" || state === "blocked") {
    return (
      <div 
        className="w-full h-full relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <OptimizedImage
          src={fallbackImg}
          alt={`${name} screenshot`}
          width={500}
          height={300}
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
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full relative"
      onMouseLeave={handleMouseLeave}
    >
      {state === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 z-10">
          <div className="h-6 w-6 rounded-full border-2 border-[#C96A3D] border-t-transparent animate-spin" />
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
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const catColor = CATEGORY_COLORS[project.category] ?? "bg-neutral-100 text-neutral-600 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700";
  const previewUrl = (project as any).previewUrl as string | undefined;

  return (
    <SpotlightCard className="group flex flex-col overflow-hidden h-full border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] rounded-2xl">
      {/* Image / Live Preview */}
      <div className="relative overflow-hidden h-44 w-full bg-neutral-100 dark:bg-neutral-900">
        {previewUrl ? (
          <LivePreviewThumb url={previewUrl} fallbackImg={project.image} name={project.name} />
        ) : (
          <OptimizedImage
            src={project.image}
            alt={`${project.name} - project screenshot`}
            width={500}
            height={300}
            className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent pointer-events-none" />
        {/* Featured badge */}
        {project.isFeatured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-[#C96A3D] px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-xs">
            <HiStar size={11} />
            Featured
          </div>
        )}
        {/* Category badge */}
        <span className={`absolute top-3 right-3 rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-medium backdrop-blur-sm ${catColor}`}>
          {CATEGORY_MAP[project.category] ?? project.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4 font-sans">
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC] leading-snug">
            {project.name}
          </h3>
          <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="space-y-3">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded px-2 py-0.5 text-[10px] font-mono bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA]/70 dark:border-[#2A3632]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="space-y-2.5 pt-3 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]/50">
            <Link
              href={`/projects/${toSlug(project.name)}`}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] px-4 py-2 text-xs font-semibold text-white transition-colors"
            >
              Read Case Study
              <HiArrowRight size={13} />
            </Link>

            <div className="flex items-center justify-between gap-4 pt-1">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-[#5C655F] hover:text-[#C96A3D] dark:text-[#9DA6A0] transition-colors"
                >
                  <SiGithub size={13} />
                  Source Code
                </a>
              ) : (
                <span className="text-xs font-mono text-[#5C655F]/60 dark:text-[#9DA6A0]/60 italic">Private Repo</span>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#C96A3D] hover:underline transition-colors"
                >
                  Live Project
                  <HiOutlineExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setCategory] = useState("all");

  const categoryKeys = ["all", "web", "mern", "ai", "tools", "ecommerce", "frontend", "mobile"];

  const filtered = PROJECTS
    .filter((p) => p.isShow)
    .filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      
      let matchCategory = activeCategory === "all";
      if (!matchCategory) {
        if (activeCategory === "mern") {
          matchCategory = p.tags.some(t => ["MongoDB", "Express", "Node.js", "MERN", "Prisma"].includes(t)) || p.category === "web";
        } else if (activeCategory === "ai") {
          matchCategory = p.tags.some(t => ["Gemini AI", "AI", "AI API"].includes(t)) || p.name.includes("AI");
        } else {
          matchCategory = p.category === activeCategory;
        }
      }

      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return a.id - b.id;
    });

  const featuredCaseStudies = [
    {
      id: "freeindexer",
      title: "FreeIndexer — URL & Sitemap Indexing Platform",
      category: "SEO Tool · Full-Stack Web Development",
      problem: "Website owners and SEO professionals often need to manage URL submission and indexing-related workflows manually across different tools and platforms.",
      solution: "I developed a browser-based platform that organizes URL and sitemap submission workflows through supported APIs and IndexNow protocols, giving users a simpler interface for managing repetitive SEO tasks.",
      technologies: ["React", "TypeScript", "Vite", "IndexNow API", "SEO APIs"],
      focus: "SaaS development · API integration · SEO tooling · responsive UI · automation",
      outcome: "A practical SEO utility that replaces repetitive manual submission steps with a structured, API-driven workflow.",
      liveUrl: "https://www.freeindexer.online/",
    },
    {
      id: "ai-growth-assistant",
      title: "AI SEO Website Audit & Growth Assistant",
      category: "AI Application · SEO Software",
      problem: "Website owners often receive technical SEO and performance data without a clear explanation of what the issues mean or which improvements should be prioritized.",
      solution: "I developed an AI-assisted web application using modern frontend technologies, Firebase, and Google Gemini AI to combine website analysis with practical recommendations.",
      technologies: ["Next.js", "React", "Google Gemini AI", "Firebase", "Tailwind CSS", "PWA"],
      focus: "AI application development · AI integration · technical SEO · web performance · data-driven recommendations",
      outcome: "A practical AI-powered interface that helps users understand website issues and turn technical information into actionable improvement steps.",
      liveUrl: "https://ai-growth-assistant-app.vercel.app/",
    },
    {
      id: "geotags-editor",
      title: "GeoTags Editor — Photo GPS & EXIF Tool",
      category: "Web Tool · Browser Application",
      problem: "Users may need to add, remove, or inspect photo location information without sending their images to an external server.",
      solution: "I built a client-side web application that performs metadata-related operations directly in the browser while providing interactive geographic functionality through mapping technologies.",
      technologies: ["JavaScript", "HTML", "CSS", "EXIF.js", "Leaflet", "OpenStreetMap"],
      focus: "Browser APIs · client-side processing · geolocation · image metadata · privacy-focused development",
      outcome: "A lightweight photo metadata utility that allows users to work with GPS and EXIF information directly on their device.",
      liveUrl: "https://geotagseditor.online/",
    },
    {
      id: "pakbizbranches",
      title: "PakBizBranches — Pakistan Business Directory",
      category: "Full-Stack · Directory Platform · Local SEO",
      problem: "A large directory platform needs structured business data, dynamic URLs, location-based pages, scalable content generation, and a database architecture capable of supporting many listings.",
      solution: "I developed a database-driven directory platform using Next.js, TypeScript, Tailwind CSS, Firebase Firestore, and Firebase Storage. The platform generates dynamic business and location-based pages from structured data while maintaining a consistent user experience across the directory.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Firestore", "Firebase Storage"],
      focus: "Full-stack development · database-driven websites · dynamic pages · local SEO · structured data · scalable architecture",
      outcome: "A scalable business directory platform designed to organize and present business information across multiple cities and categories.",
      liveUrl: "https://pakbizbranhces.online/",
    },
    {
      id: "mobile-pet-grooming",
      title: "Mobile Pet Grooming Tampa",
      category: "Business Website · Local SEO · Lead Generation",
      problem: "Local service businesses need websites that communicate their services quickly, work well on mobile devices, establish trust, and make it easy for potential customers to contact the business.",
      solution: "I developed a responsive Next.js website with service-focused content, location information, clear calls to action, and a mobile-first user experience.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      focus: "Business website development · local SEO · mobile UX · lead generation · performance",
      outcome: "A focused local business website designed to help visitors understand the services and move naturally toward contacting or booking the business.",
      liveUrl: "https://mobilepetgroomingtampa.lovable.app/",
    },
  ];

  const aiToolsList = [
    "Claude", "Gemini", "ChatGPT", "GitHub Copilot", "Cursor", "Replit", "v0", "Antigravity", "Codex"
  ];

  const aiCapabilities = [
    "AI assistants and conversational interfaces",
    "AI-powered website tools",
    "Custom AI workflows",
    "AI content and productivity features",
    "AI-powered analysis tools",
    "API-based AI integrations",
    "Custom GPT-style experiences",
    "AI-assisted business workflows",
    "AI-powered SaaS features",
  ];

  return (
    <>
      <SEOHead
        title="Projects | Muhammad Imran - Full-Stack & AI Developer"
        description="Explore Muhammad Imran's web, software, MERN, React, Next.js and AI projects, including business websites, SaaS tools and custom applications."
        path="/projects"
      />

      <div className="space-y-16 py-6 font-sans">
        {/* ---------------- 1. HERO / INTRODUCTION ---------------- */}
        <section className="space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] px-3.5 py-1.5 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <span className="w-2 h-2 rounded-full bg-[#C96A3D] animate-pulse" />
              <span>Full-Stack, Software &amp; AI Projects</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#17211E] dark:text-[#F5F2EC]">
              Projects &amp; Case Studies
            </h1>

            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#C96A3D]">
              Web, Software, MERN &amp; AI Development Projects
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#5C655F] dark:text-[#9DA6A0] max-w-4xl font-sans">
            <p>
              Real websites, web applications, software systems, digital tools, and AI-powered projects built to solve practical problems.
            </p>
            <p>
              I'm Muhammad Imran, a full-stack web developer based in Multan, Pakistan. My portfolio includes business websites, custom web applications, MERN stack applications, React and Next.js projects, SEO tools, dashboards, mobile applications, and AI-powered software.
            </p>
            <p>
              Rather than presenting projects as a list of technologies, I document what each project was designed to accomplish, the problem it addressed, the technologies used, and the solution that was delivered.
            </p>
            <p>
              My development work combines modern full-stack engineering with practical AI tools and workflows. Depending on the project, this can include React, Next.js, TypeScript, Node.js, MongoDB, Firebase, REST APIs, browser technologies, AI integrations, and AI-assisted development workflows.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C96A3D]" />
            <span className="font-semibold text-[#17211E] dark:text-[#F5F2EC]">Based in Multan, Pakistan · Available for projects across Pakistan and worldwide</span>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 2. FEATURED CASE STUDIES ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="Featured Development Projects" icon={<HiStar />} />
            <SectionSubHeading>
              <p>In-Depth Case Studies of Working Digital Solutions</p>
            </SectionSubHeading>
          </div>

          <div className="space-y-8">
            {featuredCaseStudies.map((study) => (
              <div
                key={study.id}
                className="p-6 sm:p-8 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-6 shadow-xs"
              >
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#C96A3D] font-semibold uppercase tracking-wider">
                    {study.category}
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-[#17211E] dark:text-[#F5F2EC]">
                    {study.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  <div className="space-y-2 p-4 rounded-xl bg-[#F5F2EC]/60 dark:bg-[#121917]/60 border border-[#D9D4CA]/60 dark:border-[#2A3632]/60">
                    <h4 className="font-heading font-bold text-xs uppercase text-[#17211E] dark:text-[#F5F2EC] tracking-wider font-mono">
                      The Problem
                    </h4>
                    <p>{study.problem}</p>
                  </div>

                  <div className="space-y-2 p-4 rounded-xl bg-[#F5F2EC]/60 dark:bg-[#121917]/60 border border-[#D9D4CA]/60 dark:border-[#2A3632]/60">
                    <h4 className="font-heading font-bold text-xs uppercase text-[#C96A3D] tracking-wider font-mono">
                      The Solution
                    </h4>
                    <p>{study.solution}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 font-mono text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[#17211E] dark:text-[#F5F2EC] font-semibold">Technologies:</span>
                    {study.technologies.map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 rounded bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA]/70 dark:border-[#2A3632]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="text-[#5C655F] dark:text-[#9DA6A0]">
                    <strong className="text-[#17211E] dark:text-[#F5F2EC]">Development Focus:</strong> {study.focus}
                  </div>

                  <div className="text-[#5C655F] dark:text-[#9DA6A0]">
                    <strong className="text-[#17211E] dark:text-[#F5F2EC]">Outcome:</strong> {study.outcome}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] text-white font-mono text-xs font-medium transition-colors shadow-xs"
                  >
                    Visit Live Project <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 3. EXPLORE ALL PROJECTS (SEARCH & FILTERS) ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="Explore My Projects" icon={<HiOutlineFolder />} />
            <SectionSubHeading>
              <p>Browse projects by development type to find examples relevant to your requirements.</p>
            </SectionSubHeading>
          </div>

          {/* Filters Bar */}
          <div className="space-y-4 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-5 shadow-xs font-sans">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative flex-1 sm:max-w-xs">
                <HiSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C655F]" />
                <input
                  type="text"
                  placeholder="Search projects by title, tech, or problem…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] placeholder-[#5C655F]/70 focus:outline-none focus:ring-2 focus:ring-[#C96A3D]"
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {categoryKeys.map((catKey) => (
                  <button
                    key={catKey}
                    onClick={() => setCategory(catKey)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-colors border ${
                      activeCategory === catKey
                        ? "bg-[#C96A3D] text-white border-[#C96A3D]"
                        : "bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border-[#D9D4CA] dark:border-[#2A3632] hover:border-[#C96A3D]"
                    }`}
                  >
                    {CATEGORY_MAP[catKey]}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              Showing <strong className="text-[#17211E] dark:text-[#F5F2EC]">{filtered.length}</strong> of {PROJECTS.filter((p) => p.isShow).length} Development Projects
            </p>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-[#5C655F] dark:text-[#9DA6A0]">
              <BiCollection size={48} className="text-[#C96A3D]" />
              <p className="mt-3 text-base font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                No projects found matching your search criteria
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
                className="mt-3 text-xs font-mono text-[#C96A3D] hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filtered.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.93 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                    className="h-full"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 4. AI, AUTOMATION & MODERN DEVELOPMENT ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="AI, Automation & Modern Development" icon={<Bot />} />
            <SectionSubHeading>
              <p>Building with AI &amp; Modern Workflows</p>
            </SectionSubHeading>
          </div>

          <div className="rounded-2xl border border-[#C96A3D]/40 bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-6 shadow-xs font-sans">
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              <p>
                AI is becoming an increasingly important part of modern software development.
              </p>
              <p>
                Alongside traditional development technologies, I use AI-assisted development tools and platforms to research, prototype, debug, improve, and accelerate development workflows.
              </p>
              <div className="p-4 rounded-xl bg-[#F5F2EC]/80 dark:bg-[#121917]/80 border border-[#D9D4CA]/80 dark:border-[#2A3632] space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-[#C96A3D] font-semibold">
                  AI-Assisted Tools In My Workflow:
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#17211E] dark:text-[#F5F2EC]">
                  {aiToolsList.map((tool) => (
                    <span key={tool} className="px-2.5 py-1 rounded bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm">
                I use these tools as development assistants rather than replacements for engineering fundamentals. The final implementation still requires understanding the requirements, reviewing generated code, testing functionality, addressing security and performance considerations, and maintaining the application after launch.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                AI Development &amp; Integration Capabilities
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0]">
                I can also build practical AI-powered features into websites and applications, including:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono text-[#17211E] dark:text-[#F5F2EC] pt-1">
                {aiCapabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-[#F5F2EC]/60 dark:bg-[#121917]/60 border border-[#D9D4CA]/60 dark:border-[#2A3632]">
                    <CheckCircle2 size={15} className="text-[#C96A3D] shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed pt-2">
              My goal is to use AI where it provides a genuine benefit to the product or business rather than adding AI simply as a marketing feature.
            </p>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 5. WHAT THESE PROJECTS DEMONSTRATE ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="What These Projects Demonstrate" icon={<CheckCircle2 />} />
            <SectionSubHeading>
              <p>Core Capabilities Applied Across Real Workflows</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Globe size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Full-Stack Web Development
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                React, Next.js, Node.js, Express, MongoDB, Firebase, PostgreSQL, REST APIs, authentication, databases, and business workflows.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Database size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                MERN Stack Development
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                MongoDB, Express.js, React, and Node.js for custom applications, dashboards, APIs, and database-driven systems.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Code2 size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Frontend Development
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Responsive interfaces, reusable components, interactive UI, state management, animations, accessibility, and performance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Layers size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Web Application Development
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                SaaS interfaces, business platforms, dashboards, directories, browser utilities, management systems, and custom workflows.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Bot size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                AI Development
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                AI-powered applications, Gemini integrations, AI assistants, AI workflows, and AI-assisted software development.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Search size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Technical SEO &amp; Performance
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Semantic HTML, structured data, metadata, crawlability, internal linking, Core Web Vitals, performance, and search visibility.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 6. HOW I APPROACH PROJECTS ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="How I Approach Projects" icon={<Wrench />} />
            <SectionSubHeading>
              <p>Every project starts with a problem rather than a technology.</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm font-mono">
                01
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Understand
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I first understand the business, users, existing system, requirements, and desired outcome.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm font-mono">
                02
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Plan
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I determine the appropriate architecture, technologies, functionality, content structure, and development priorities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm font-mono">
                03
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Build
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I develop the product using maintainable code, reusable components, responsive interfaces, and appropriate backend or API architecture.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm font-mono">
                04
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Test
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                The project is reviewed for functionality, responsiveness, performance, accessibility, and technical SEO where relevant.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm font-mono">
                05
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Launch
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                The completed website or application is deployed and prepared for real users.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm font-mono">
                06
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Improve
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                After launch, additional features, performance improvements, fixes, integrations, and ongoing development can be added as the product grows.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 7. LOOKING FOR A SIMILAR SOLUTION (CTA) ---------------- */}
        <section className="rounded-2xl border border-[#C96A3D]/40 bg-[#FFFEFA] dark:bg-[#1B2421] p-8 sm:p-10 space-y-6 shadow-xs font-sans">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-heading text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Looking for a Similar Solution?
            </h2>
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              <p>
                If you are looking for a <strong className="text-[#17211E] dark:text-[#F5F2EC]">full-stack web developer, MERN stack developer, React developer, Next.js developer, software developer, or AI developer</strong> for a project, explore the case studies above to see the type of work I build.
              </p>
              <p>
                I work with businesses, startups, agencies, and remote teams that need:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#17211E] dark:text-[#F5F2EC] pt-1">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C96A3D]" /> A professional business website</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C96A3D]" /> A custom web application</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C96A3D]" /> MERN stack development</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C96A3D]" /> React or Next.js development</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C96A3D]" /> Business software &amp; dashboards</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C96A3D]" /> An AI-powered application</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C96A3D]" /> AI integration into existing products</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C96A3D]" /> Technical SEO &amp; performance</li>
              </ul>
              <p className="text-sm pt-2">
                I'm based in <strong className="text-[#17211E] dark:text-[#F5F2EC]">Multan, Pakistan</strong>, and available for development projects across Pakistan and internationally.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-sm transition-colors duration-200 shadow-xs"
            >
              Start a Project <ArrowRight size={16} />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#F5F2EC] dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-sm border border-[#D9D4CA] dark:border-[#2A3632] transition-colors duration-200"
            >
              View Services
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#FFFEFA] dark:bg-[#1B2421] hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-sm border border-[#D9D4CA] dark:border-[#2A3632] transition-colors duration-200"
            >
              Contact Muhammad Imran
            </Link>
          </div>
        </section>

        {/* GitHub CTA */}
        <a
          href={PERSONAL.github}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-dashed border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] px-6 py-5 transition-colors hover:border-[#C96A3D]"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#17211E] dark:bg-[#F5F2EC] text-[#FFFEFA] dark:text-[#17211E]">
              <SiGithub size={22} />
            </div>
            <div className="space-y-0.5 font-sans">
              <p className="text-sm font-semibold text-[#17211E] dark:text-[#F5F2EC]">Explore Source Code on GitHub</p>
              <p className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">github.com/{PERSONAL.github.split("/").pop()}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#C96A3D] hover:underline shrink-0">
            Visit GitHub Profile
            <HiOutlineExternalLink size={14} />
          </div>
        </a>
      </div>
    </>
  );
}
