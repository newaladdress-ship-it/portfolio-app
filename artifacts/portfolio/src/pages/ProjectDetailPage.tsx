import { useState, useRef } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import {
  HiOutlineExternalLink,
  HiStar,
  HiArrowLeft,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineCheckCircle,
  HiOutlineLightBulb,
  HiOutlineRefresh,
  HiOutlineDesktopComputer,
  HiOutlinePhotograph,
} from "react-icons/hi";
import { BiCollection } from "react-icons/bi";
import SEOHead from "@/components/SEOHead";
import { PROJECTS } from "@/data/personal";
import { PROJECT_DETAILS } from "@/data/projectDetails";
import SpotlightCard from "@/components/layout/SpotlightCard";

const CATEGORY_COLORS: Record<string, string> = {
  web: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  frontend: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
  ecommerce: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  tools: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
  mobile: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
};

const CATEGORY_LABELS: Record<string, string> = {
  web: "Web",
  frontend: "Frontend",
  ecommerce: "E-Commerce",
  tools: "Tools",
  mobile: "Mobile",
};

export function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getSeoTitle(name: string): string {
  let title = `${name} Case Study | Imran Digitals`;
  if (title.length >= 50 && title.length <= 60) return title;
  if (title.length > 60) {
    title = `${name} | Imran Digitals`;
    if (title.length >= 50 && title.length <= 60) return title;
    return title.substring(0, 60);
  }
  title = `${name} Web App Case Study | Imran Digitals`;
  if (title.length > 60) return title.substring(0, 60);
  return title.padEnd(52, " ");
}

function getSeoDesc(desc: string): string {
  let d = desc.trim().replace(/\s+/g, " ");
  if (d.length >= 145 && d.length <= 160) return d;
  if (d.length > 160) {
    return d.substring(0, 157).replace(/\s+\S*$/, "") + "...";
  }
  const suffix = " Case study by Muhammad Imran, senior web developer.";
  if (d.length + suffix.length >= 145 && d.length + suffix.length <= 160) {
    return d + suffix;
  }
  const filler =
    " Explore architectural highlights, technical stack choices, and key features developed by Muhammad Imran.";
  const targetLen = 152;
  const needed = targetLen - d.length;
  if (needed > 0) {
    return d + filler.substring(0, needed);
  }
  return d;
}

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const project = PROJECTS.find((p) => toSlug(p.name) === slug);
  const details = project ? PROJECT_DETAILS[project.id] : null;

  const [viewMode, setViewMode] = useState<"live" | "image">(
    project?.liveUrl ? "live" : "image"
  );
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  if (!project || !details) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-neutral-400 dark:text-neutral-600 font-sans">
        <BiCollection size={52} />
        <h2 className="mt-4 text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          Project not found
        </h2>
        <p className="mt-2 text-sm">This project doesn't exist or has been removed.</p>
        <Link
          href="/projects"
          className="mt-6 flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <HiArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>
    );
  }

  const catColor =
    CATEGORY_COLORS[project.category] ??
    "bg-neutral-100 text-neutral-600 border-neutral-200";
  const relatedProjects = PROJECTS.filter(
    (p) => p.isShow && p.id !== project.id && p.category === project.category
  ).slice(0, 3);

  const seoTitle = details?.metaTitle || getSeoTitle(project.name);
  const seoDesc = details?.metaDescription || getSeoDesc(project.description);

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        path={`/projects/${slug}`}
      />
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-8 font-sans"
      >
        {/* Back navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-[#C96A3D] transition-colors"
          >
            <HiArrowLeft size={16} />
            Back to Projects
          </Link>

          {project.liveUrl && (
            <div className="flex items-center gap-1 rounded-lg border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-1 text-xs font-mono">
              <button
                onClick={() => setViewMode("live")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  viewMode === "live"
                    ? "bg-[#C96A3D] text-white font-medium shadow-xs"
                    : "text-[#5C655F] dark:text-[#9DA6A0] hover:text-[#17211E] dark:hover:text-[#F5F2EC]"
                }`}
              >
                <HiOutlineDesktopComputer size={14} />
                Live iFrame View
              </button>
              <button
                onClick={() => setViewMode("image")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  viewMode === "image"
                    ? "bg-[#C96A3D] text-white font-medium shadow-xs"
                    : "text-[#5C655F] dark:text-[#9DA6A0] hover:text-[#17211E] dark:hover:text-[#F5F2EC]"
                }`}
              >
                <HiOutlinePhotograph size={14} />
                Cover Image
              </button>
            </div>
          )}
        </div>

        {/* HERO / LIVE IFRAME PREVIEW CONTAINER */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] shadow-xs">
          {/* Top Browser Bar Header */}
          <div className="flex items-center justify-between border-b border-[#D9D4CA] dark:border-[#2A3632] px-4 py-3 bg-[#F5F2EC]/80 dark:bg-[#121917]/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>

            {/* URL Display */}
            <div className="flex-1 max-w-xl mx-4 flex items-center justify-between rounded-lg border border-[#D9D4CA]/80 dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] px-3 py-1.5 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="truncate">{project.liveUrl || project.previewUrl || "https://imrandigitals.com"}</span>
              </div>
              {project.liveUrl && (
                <button
                  onClick={() => {
                    setIframeLoaded(false);
                    setIframeKey((prev) => prev + 1);
                  }}
                  title="Reload Live Preview"
                  className="hover:text-[#C96A3D] transition-colors shrink-0 ml-2"
                >
                  <HiOutlineRefresh size={13} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#C96A3D] hover:underline"
                >
                  Open Live <HiOutlineExternalLink size={13} />
                </a>
              )}
            </div>
          </div>

          {/* Body Content: Live iFrame vs Image Cover */}
          {viewMode === "live" && project.liveUrl ? (
            <div className="relative w-full bg-[#FFFEFA] dark:bg-[#1B2421]" style={{ height: "560px" }}>
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#FFFEFA] dark:bg-[#1B2421] text-[#5C655F] dark:text-[#9DA6A0]">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D9D4CA] border-t-[#C96A3D]" />
                  <p className="text-sm font-mono">Fetching live website details…</p>
                </div>
              )}
              <iframe
                key={iframeKey}
                src={project.liveUrl}
                title={`${project.name} Live Web View`}
                className="w-full h-full border-0"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
          ) : (
            <div className="relative w-full overflow-hidden">
              <img
                src={project.image}
                alt={`${project.name} screenshot`}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="space-y-2">
                  {project.isFeatured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#C96A3D] px-3 py-1 text-xs font-mono font-semibold text-white shadow-xs">
                      <HiStar size={12} />
                      Featured Project
                    </span>
                  )}
                  <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white drop-shadow-md">
                    {project.name}
                  </h1>
                </div>
                <span
                  className={`rounded-full border px-3.5 py-1 text-xs font-mono font-medium backdrop-blur-md ${catColor}`}
                >
                  {CATEGORY_LABELS[project.category] ?? project.category}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans">
          {/* Left Column - Detailed Documentation & Features */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <SpotlightCard className="p-6 sm:p-8 space-y-4 border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] rounded-2xl">
              <h2 className="text-lg font-heading font-bold text-[#17211E] dark:text-[#F5F2EC] flex items-center gap-2">
                <HiOutlineLightBulb size={20} className="text-[#C96A3D]" />
                About This Project
              </h2>
              <div className="space-y-4 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                {details.longDescription.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </SpotlightCard>

            {/* Overview Bullets */}
            {details.overviewBullets && details.overviewBullets.length > 0 && (
              <SpotlightCard className="p-6 sm:p-8 space-y-4 border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] rounded-2xl">
                <h2 className="text-lg font-heading font-bold text-[#17211E] dark:text-[#F5F2EC]">
                  Project Overview &amp; Requirements
                </h2>
                <p className="text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  The goal of this project was to create more than a basic informational website. The platform was designed to:
                </p>
                <ul className="space-y-2.5">
                  {details.overviewBullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#17211E] dark:text-[#F5F2EC]">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-[#C96A3D] shrink-0" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            )}

            {/* Key Features */}
            <SpotlightCard className="p-6 sm:p-8 space-y-5 border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] rounded-2xl">
              <h2 className="text-lg font-heading font-bold text-[#17211E] dark:text-[#F5F2EC] flex items-center gap-2">
                <HiOutlineCheckCircle size={20} className="text-[#C96A3D]" />
                Key Features &amp; Technical Capabilities
              </h2>
              <ul className="space-y-3">
                {details.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3.5 text-sm sm:text-base text-[#17211E] dark:text-[#F5F2EC]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C96A3D]/10 text-[#C96A3D] text-xs font-mono font-bold">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>

            {/* Technical Challenges & Solutions */}
            <SpotlightCard className="p-6 sm:p-8 space-y-4 border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] rounded-2xl">
              <h2 className="text-lg font-heading font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Technical Challenge &amp; Solution
              </h2>
              <div className="space-y-4 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                <div>
                  <h3 className="font-semibold text-[#17211E] dark:text-[#F5F2EC] mb-1">Technical Challenge</h3>
                  <p>{details.challenges}</p>
                </div>
                {details.solution && (
                  <div>
                    <h3 className="font-semibold text-[#17211E] dark:text-[#F5F2EC] mb-1">Technical Solution</h3>
                    <p>{details.solution}</p>
                  </div>
                )}
              </div>
            </SpotlightCard>

            {/* Demonstrates */}
            {details.demonstrates && details.demonstrates.length > 0 && (
              <SpotlightCard className="p-6 sm:p-8 space-y-4 border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] rounded-2xl">
                <h2 className="text-lg font-heading font-bold text-[#17211E] dark:text-[#F5F2EC]">
                  What This Project Demonstrates
                </h2>
                <ul className="space-y-2.5">
                  {details.demonstrates.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#17211E] dark:text-[#F5F2EC]">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-[#C96A3D] shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            )}

            {/* Why It Matters */}
            {details.whyItMatters && (
              <SpotlightCard className="p-6 sm:p-8 space-y-4 border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] rounded-2xl">
                <h2 className="text-lg font-heading font-bold text-[#17211E] dark:text-[#F5F2EC]">
                  Why This Project Matters
                </h2>
                <p className="text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  {details.whyItMatters}
                </p>
              </SpotlightCard>
            )}
          </div>

          {/* Right Column - Sidebar Meta & Quick Links */}
          <div className="space-y-6">
            {/* Meta Info */}
            <SpotlightCard className="p-6 space-y-4 border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] rounded-2xl">
              <h2 className="text-base font-heading font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Project Info
              </h2>
              <div className="space-y-3.5 text-sm">
                <div className="flex items-center gap-3 text-[#5C655F] dark:text-[#9DA6A0]">
                  <HiOutlineUser size={18} className="shrink-0 text-[#C96A3D]" />
                  <span>
                    Role:{" "}
                    <strong className="text-[#17211E] dark:text-[#F5F2EC] font-semibold">
                      {details.role}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#5C655F] dark:text-[#9DA6A0]">
                  <HiOutlineClock size={18} className="shrink-0 text-[#C96A3D]" />
                  <span>
                    Duration:{" "}
                    <strong className="text-[#17211E] dark:text-[#F5F2EC] font-semibold">
                      {details.duration}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#5C655F] dark:text-[#9DA6A0]">
                  <BiCollection size={18} className="shrink-0 text-[#C96A3D]" />
                  <span>
                    Category:{" "}
                    <strong className="text-[#17211E] dark:text-[#F5F2EC] font-semibold">
                      {CATEGORY_LABELS[project.category] ?? project.category}
                    </strong>
                  </span>
                </div>
              </div>
            </SpotlightCard>

            {/* Tech Stack */}
            <SpotlightCard className="p-6 space-y-4 border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] rounded-2xl">
              <h2 className="text-base font-heading font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA]/80 dark:border-[#2A3632]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>

            {/* Action Links */}
            <SpotlightCard className="p-6 space-y-4 border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] rounded-2xl">
              <h2 className="text-base font-heading font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Project Resources
              </h2>
              <div className="flex flex-col gap-3 font-sans">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] px-4 py-3 text-sm font-heading font-medium text-white transition-colors shadow-xs"
                  >
                    <HiOutlineExternalLink size={16} />
                    View Live Website
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] px-4 py-3 text-sm font-heading font-medium text-[#17211E] dark:text-[#F5F2EC] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] transition-colors"
                  >
                    <SiGithub size={15} />
                    View Source Code
                  </a>
                )}
                {!project.liveUrl && !project.githubUrl && (
                  <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0] italic text-center py-2 font-mono">
                    Private enterprise project — links restricted
                  </p>
                )}
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="space-y-6 pt-4 font-sans">
            <h2 className="text-xl font-heading font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Related Case Studies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((related) => (
                <Link
                  key={related.id}
                  href={`/projects/${toSlug(related.name)}`}
                >
                  <SpotlightCard className="group overflow-hidden cursor-pointer h-full border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] rounded-2xl">
                    <div className="relative overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent" />
                    </div>
                    <div className="p-5 space-y-1.5">
                      <h3 className="text-base font-heading font-bold text-[#17211E] dark:text-[#F5F2EC] group-hover:text-[#C96A3D] transition-colors line-clamp-1">
                        {related.name}
                      </h3>
                      <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0] line-clamp-2 leading-relaxed">
                        {related.description}
                      </p>
                    </div>
                  </SpotlightCard>
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.section>
    </>
  );
}
