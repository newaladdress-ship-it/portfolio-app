import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import {
  HiOutlineExternalLink, HiStar, HiArrowLeft,
  HiOutlineClock, HiOutlineUser, HiOutlineCheckCircle, HiOutlineLightBulb,
} from "react-icons/hi";
import { BiCollection } from "react-icons/bi";
import { PROJECTS } from "@/data/personal";
import { PROJECT_DETAILS } from "@/data/projectDetails";
import SpotlightCard from "@/components/layout/SpotlightCard";

const CATEGORY_COLORS: Record<string, string> = {
  web:       "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  frontend:  "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
  ecommerce: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  tools:     "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
};

const CATEGORY_LABELS: Record<string, string> = {
  web: "Web", frontend: "Frontend", ecommerce: "E-Commerce", tools: "Tools",
};

export function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const project = PROJECTS.find((p) => toSlug(p.name) === slug);
  const details = project ? PROJECT_DETAILS[project.id] : null;

  if (!project || !details) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-neutral-400 dark:text-neutral-600">
        <BiCollection size={52} />
        <h2 className="mt-4 text-xl font-semibold text-neutral-700 dark:text-neutral-300">Project not found</h2>
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

  const catColor = CATEGORY_COLORS[project.category] ?? "bg-neutral-100 text-neutral-600 border-neutral-200";
  const relatedProjects = PROJECTS.filter(
    (p) => p.isShow && p.id !== project.id && p.category === project.category,
  ).slice(0, 3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        <HiArrowLeft size={16} />
        Back to Projects
      </Link>

      {/* Hero Image */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          className="w-full h-56 sm:h-72 lg:h-80 object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Overlays */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="space-y-1.5">
            {project.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400 px-2.5 py-0.5 text-[11px] font-semibold text-yellow-900 shadow">
                <HiStar size={11} />
                Featured
              </span>
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
              {project.name}
            </h1>
          </div>
          <span className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${catColor}`}>
            {CATEGORY_LABELS[project.category] ?? project.category}
          </span>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — description + features + challenges */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <SpotlightCard className="p-6 space-y-3">
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <HiOutlineLightBulb size={18} className="text-yellow-500" />
              About This Project
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {details.longDescription}
            </p>
          </SpotlightCard>

          {/* Features */}
          <SpotlightCard className="p-6 space-y-4">
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <HiOutlineCheckCircle size={18} className="text-green-500" />
              Key Features
            </h2>
            <ul className="space-y-2.5">
              {details.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[11px] font-bold">
                    {i + 1}
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </SpotlightCard>

          {/* Challenge */}
          <SpotlightCard className="p-6 space-y-3">
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Challenge & Solution
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {details.challenges}
            </p>
          </SpotlightCard>
        </div>

        {/* Right — sidebar info */}
        <div className="space-y-5">
          {/* Meta info */}
          <SpotlightCard className="p-5 space-y-4">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Project Info</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400">
                <HiOutlineUser size={16} className="shrink-0 text-neutral-400" />
                <span className="text-neutral-900 dark:text-neutral-200 font-medium">{details.role}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400">
                <HiOutlineClock size={16} className="shrink-0 text-neutral-400" />
                <span>Duration: <span className="font-medium text-neutral-900 dark:text-neutral-200">{details.duration}</span></span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400">
                <BiCollection size={16} className="shrink-0 text-neutral-400" />
                <span>Category: <span className="font-medium text-neutral-900 dark:text-neutral-200">{CATEGORY_LABELS[project.category] ?? project.category}</span></span>
              </div>
            </div>
          </SpotlightCard>

          {/* Tech stack */}
          <SpotlightCard className="p-5 space-y-3">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </SpotlightCard>

          {/* Links */}
          <SpotlightCard className="p-5 space-y-3">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Links</h2>
            <div className="flex flex-col gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-4 py-2.5 text-sm font-semibold text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
                >
                  <HiOutlineExternalLink size={16} />
                  View Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 px-4 py-2.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <SiGithub size={15} />
                  View Source Code
                </a>
              )}
              {!project.liveUrl && !project.githubUrl && (
                <p className="text-xs text-neutral-400 dark:text-neutral-600 italic text-center py-2">Private project — links not available</p>
              )}
            </div>
          </SpotlightCard>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="space-y-4 pt-2">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Related Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedProjects.map((related) => (
              <Link key={related.id} href={`/projects/${toSlug(related.name)}`}>
                <SpotlightCard className="group overflow-hidden cursor-pointer h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-28 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent" />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors line-clamp-1">
                      {related.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">{related.description}</p>
                  </div>
                </SpotlightCard>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}
