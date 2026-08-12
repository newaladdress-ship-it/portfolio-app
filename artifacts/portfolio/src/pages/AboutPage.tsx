import { useState } from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import {
  HiOutlineBriefcase,
  HiChevronRight,
  HiChevronDown,
  HiOutlineDownload,
  HiOutlineEye,
  HiX,
  HiOutlineAcademicCap,
  HiOutlineBadgeCheck,
  HiOutlineSparkles,
  HiOutlineFolder,
} from "react-icons/hi";
import { TbSchool } from "react-icons/tb";
import { BsBuildings } from "react-icons/bs";
import {
  Globe,
  Layers,
  Code2,
  Database,
  Search,
  LayoutDashboard,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Server,
  Wrench,
  Sparkles,
  Mail,
  ShieldCheck,
  Clock,
  Bot,
} from "lucide-react";
import { format, differenceInMonths, differenceInYears } from "date-fns";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import Breakline from "@/components/layout/Breakline";
import { PERSONAL, CAREERS, EDUCATION } from "@/data/personal";

const CV_PATH = "/cv.pdf";
const CV_FILENAME = "Muhammad_Imran_CV.pdf";

function ResumeViewer({ onClose }: { onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl"
        style={{ height: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 px-5 py-3">
          <div className="flex items-center gap-2">
            <HiOutlineEye size={16} className="text-neutral-500" />
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              Muhammad Imran - Resume
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={CV_PATH}
              download={CV_FILENAME}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <HiOutlineDownload size={13} />
              Download
            </a>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <HiX size={15} />
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <div className="relative flex-1 bg-neutral-100 dark:bg-neutral-950">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-400">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-[#C96A3D]" />
              <p className="text-sm">Loading resume…</p>
            </div>
          )}
          <iframe
            src={CV_PATH}
            className="h-full w-full"
            title="Resume"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}

function ResumeButtons() {
  const [viewerOpen, setViewerOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setViewerOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] px-4 py-2.5 text-sm font-medium text-[#17211E] dark:text-[#F5F2EC] hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] transition-colors shadow-xs"
        >
          <HiOutlineEye size={16} />
          View Resume
        </button>
        <a
          href={CV_PATH}
          download={CV_FILENAME}
          className="flex items-center gap-2 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] px-4 py-2.5 text-sm font-medium text-white transition-colors shadow-xs"
        >
          <HiOutlineDownload size={16} />
          Download CV
        </a>
      </div>

      {viewerOpen && <ResumeViewer onClose={() => setViewerOpen(false)} />}
    </>
  );
}

function CareerCard({
  career,
  introContext,
}: {
  career: typeof CAREERS[0];
  introContext?: string;
}) {
  const [isShowDetails, setIsShowDetails] = useState(false);

  const startDate = new Date(career.startDate);
  const endDate = career.endDate ? new Date(career.endDate) : new Date();

  const durationYears = differenceInYears(endDate, startDate);
  const durationMonths = differenceInMonths(endDate, startDate) % 12;

  let durationText = "";
  if (durationYears > 0) durationText += `${durationYears} year${durationYears > 1 ? "s" : ""} `;
  if (durationMonths > 0 || durationYears === 0) durationText += `${durationMonths} Month${durationMonths !== 1 ? "s" : ""}`;

  return (
    <SpotlightCard className="flex flex-col sm:flex-row items-start gap-5 p-6 border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] rounded-2xl">
      {career.logo ? (
        <img
          width={60}
          height={60}
          loading="lazy"
          decoding="async"
          src={career.logo}
          alt={`${career.company} logo`}
          className="shrink-0 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-white p-1 object-contain h-14 w-14"
        />
      ) : (
        <BsBuildings size={56} className="shrink-0 text-[#5C655F] dark:text-[#9DA6A0]" />
      )}

      <div className="w-full space-y-2">
        <div>
          <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
            {career.position}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#5C655F] dark:text-[#9DA6A0]">
            <a
              href={career.link}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[#17211E] dark:text-[#F5F2EC] hover:text-[#C96A3D] hover:underline transition-colors"
            >
              {career.company}
            </a>
            <span>•</span>
            <span>{career.location}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] mt-1">
            <span>
              {format(startDate, "MMM yyyy")} –{" "}
              {career.endDate ? format(endDate, "MMM yyyy") : "Present"}
            </span>
            <span>•</span>
            <span className="text-[#C96A3D] font-medium">{durationText}</span>
            <span>•</span>
            <span>{career.type}</span>
            <span>•</span>
            <span>{career.locationType}</span>
          </div>
        </div>

        {introContext && (
          <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed pt-1 font-sans">
            {introContext}
          </p>
        )}

        <button
          onClick={() => setIsShowDetails(!isShowDetails)}
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-mono text-[#C96A3D] hover:underline transition-colors pt-1"
        >
          {isShowDetails ? "Hide details" : "Show details"}
          {isShowDetails ? <HiChevronDown size={14} /> : <HiChevronRight size={14} />}
        </button>

        {isShowDetails && (
          <div className="mt-3 space-y-3 pt-3 border-t border-[#D9D4CA]/60 dark:border-[#2A3632]/60 text-sm font-sans">
            <div>
              <p className="font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC] mb-1.5 text-xs uppercase tracking-wider font-mono">
                Key Responsibilities
              </p>
              <ul className="list-disc ml-5 space-y-1 text-[#5C655F] dark:text-[#9DA6A0] text-sm">
                {career.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC] mb-1.5 text-xs uppercase tracking-wider font-mono">
                What I Learned
              </p>
              <ul className="list-disc ml-5 space-y-1 text-[#5C655F] dark:text-[#9DA6A0] text-sm">
                {career.lessonsLearned.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC] mb-1.5 text-xs uppercase tracking-wider font-mono">
                Impact &amp; Results
              </p>
              <ul className="list-disc ml-5 space-y-1 text-[#5C655F] dark:text-[#9DA6A0] text-sm">
                {career.impact.map((imp, i) => (
                  <li key={i}>{imp}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}

function EducationCard({ edu }: { edu: typeof EDUCATION[0] }) {
  return (
    <SpotlightCard className="flex flex-col sm:flex-row items-start gap-5 p-6 border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] rounded-2xl">
      {edu.logo ? (
        <img
          width={60}
          height={60}
          loading="lazy"
          decoding="async"
          src={edu.logo}
          alt={`${edu.school} logo`}
          className="shrink-0 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-white p-1 object-contain h-14 w-14"
        />
      ) : (
        <TbSchool size={56} className="shrink-0 text-[#5C655F] dark:text-[#9DA6A0]" />
      )}
      <div className="space-y-1.5 font-sans w-full">
        <a href={edu.link} target="_blank" rel="noreferrer">
          <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC] hover:text-[#C96A3D] hover:underline transition-colors">
            {edu.degree}
          </h3>
        </a>
        <p className="text-sm font-medium text-[#17211E] dark:text-[#F5F2EC]">
          {edu.school}
        </p>
        <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0]">
          {edu.major}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] pt-1">
          <span>
            {(edu as { period?: string }).period ??
              `${edu.startYear} – ${edu.endYear ?? "Present"}`}
          </span>
          <span>•</span>
          <span>{edu.location}</span>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function AboutPage() {
  const selectedCaseStudies = [
    {
      id: 18,
      title: "FreeIndexer",
      subtitle: "URL & Sitemap Indexing Platform",
      description:
        "An SEO-focused web application designed to simplify URL and sitemap submission workflows through supported indexing protocols and APIs.",
      tags: ["React", "TypeScript", "Vite", "IndexNow API"],
      liveUrl: "https://www.freeindexer.online/",
    },
    {
      id: 11,
      title: "GeoTags Metadata Editor",
      subtitle: "Photo GPS & EXIF Metadata Tool",
      description:
        "A privacy-focused browser utility for working with photo GPS coordinates and EXIF metadata directly on the user's device.",
      tags: ["JavaScript", "EXIF.js", "Leaflet", "OpenStreetMap"],
      liveUrl: "https://geotags.online/",
    },
    {
      id: 8,
      title: "PakBizBranches",
      subtitle: "Pakistan Business Directory",
      description:
        "A Pakistan-focused business directory built around structured business data, dynamic pages, location-based content, and database-driven listings.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Firestore", "Firebase Storage"],
      liveUrl: "https://pakbizbranhces.online/",
    },
    {
      id: 19,
      title: "Mobile Pet Grooming Tampa",
      subtitle: "Local Business Website",
      description:
        "A mobile-first local business website designed around service information, responsive user experience, calls to action, and local search visibility.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://mobilepetgroomingtampa.lovable.app/",
    },
    {
      id: 99,
      title: "SmartTalk AI",
      subtitle: "AI Portfolio Assistant",
      description:
        "An AI-powered assistant integrated into the Imran Digitals portfolio to help visitors explore Muhammad Imran's projects, skills, services, experience, and development capabilities through conversational interaction.",
      tags: ["Gemini AI", "React", "TypeScript", "AI API Integration"],
      liveUrl: "/smarttalk",
      isInternal: true,
    },
  ];

  const careerContexts: Record<string, string> = {
    EPR: "My current role has provided experience working within an organizational environment, handling responsibilities that require accuracy, communication, coordination, and consistent execution.",
    "Digital Skills House":
      "Working as a MERN Stack Developer with hands-on development involving modern frontend and backend technologies and practical web application development.",
    "Alhuda Sols":
      "Worked on Shopify development and e-commerce-related web implementation, gaining practical experience with business websites, online stores, frontend customization, and client-oriented development requirements.",
  };

  const certificationsList = [
    {
      title: "Google Prompting Essentials",
      provider: "Google",
      description: "Training focused on effective prompt design and practical use of generative AI tools.",
    },
    {
      title: "Google Agile Essentials",
      provider: "Google",
      description: "Training focused on Agile principles and modern approaches to working within development environments.",
    },
    {
      title: "Google Technical Support Fundamentals",
      provider: "Google",
      description: "Foundational training covering technical support concepts, troubleshooting, operating systems, networking, and practical technology fundamentals.",
    },
    {
      title: "Full-Stack Web Development Specialization",
      provider: "University of London",
      description: "Structured learning focused on full-stack web development and modern web technologies.",
    },
    {
      title: "Introduction to Front-End Development",
      provider: "Meta",
      description: "Training focused on frontend development fundamentals and modern web interface development.",
    },
    {
      title: "Front End Development Internship",
      provider: "DevelopersHub Corporation",
      description: "Practical frontend development experience focused on building and working with modern web interfaces.",
    },
    {
      title: "Flutter Development Internship",
      provider: "DevelopersHub Corporation",
      description: "Practical exposure to Flutter development and mobile application concepts.",
    },
  ];

  return (
    <>
      <SEOHead
        title="About Muhammad Imran | Full-Stack & AI Developer in Multan, Pakistan"
        description="Explore the technical background, full-stack software experience, and AI development capabilities of Muhammad Imran, a developer based in Multan, Pakistan."
        path="/about"
      />

      <div className="space-y-16 py-6 font-sans">
        {/* ---------------- 1. HERO / INTRODUCTION ---------------- */}
        <section className="space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] px-3.5 py-1.5 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <span className="w-2 h-2 rounded-full bg-[#C96A3D] animate-pulse" />
              <span>Full-Stack &amp; AI Developer in Multan, Pakistan</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#17211E] dark:text-[#F5F2EC]">
              About Muhammad Imran
            </h1>

            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#C96A3D]">
              Full-Stack &amp; AI Developer in Multan, Pakistan
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#5C655F] dark:text-[#9DA6A0] max-w-4xl">
            <p>
              I'm Muhammad Imran, a full-stack web developer and AI developer based in Multan, Pakistan, and the developer behind Imran Digitals.
            </p>
            <p>
              I build business websites, custom web applications, software systems, dashboards, digital tools, and AI-powered solutions for businesses, startups, agencies, and remote clients.
            </p>
            <p>
              My core development work focuses on React, Next.js, TypeScript, JavaScript, Node.js, MongoDB, Firebase, and modern full-stack technologies. Alongside traditional software development, I work with modern AI technologies and AI-assisted development tools to build practical AI features, intelligent applications, automation workflows, and custom digital solutions.
            </p>
            <p>
              I approach development by understanding the problem first, choosing the appropriate technology, and building a solution around the actual needs of its users and business. My focus is on clean development, responsive interfaces, maintainable architecture, performance, accessibility, search visibility, and practical results.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C96A3D]" />
            <span className="font-semibold text-[#17211E] dark:text-[#F5F2EC]">Based in Multan, Pakistan · Available for Remote Projects Worldwide</span>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 2. MY APPROACH TO WEB & AI DEVELOPMENT (STORY) ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="My Approach to Web & AI Development" icon={<HiOutlineSparkles />} />
            <SectionSubHeading>
              <p>Building practical technology around real problems</p>
            </SectionSubHeading>
          </div>

          <div className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-4 text-base leading-relaxed text-[#5C655F] dark:text-[#9DA6A0]">
            <p>
              My development journey has been shaped by hands-on projects, continuous learning, and solving practical problems with modern technologies.
            </p>
            <p>
              I started by developing a strong foundation in web development and gradually expanded into full-stack application development, working with React, Node.js, Express, MongoDB, Next.js, TypeScript, Firebase, and other technologies used to build production-oriented web experiences.
            </p>
            <p>
              Today, my work extends beyond traditional frontend development. I build complete digital solutions that can include responsive interfaces, backend APIs, databases, authentication, dashboards, third-party integrations, dynamic pages, technical SEO, and AI-powered functionality.
            </p>
            <p>
              I also use modern AI development tools to accelerate research, prototyping, coding, debugging, testing, and experimentation. AI is part of my development workflow, but I use it as an engineering tool rather than treating it as a replacement for software development fundamentals.
            </p>
            <p>
              Working on real projects has taught me that good development is not simply about writing code. A successful digital product needs to be understandable to users, reliable in real-world conditions, maintainable over time, performant, and aligned with the goals of the business using it.
            </p>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 3. WHAT I BUILD ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="What I Build" icon={<HiOutlineFolder />} />
            <SectionSubHeading>
              <p>Websites, Software, Web Applications &amp; AI Solutions</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Globe size={22} />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                Business Websites
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I build responsive websites for businesses and service providers that need a professional online presence, clear service information, strong calls to action, and a technical foundation suitable for search engines.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Layers size={22} />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                Custom Web Applications
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I develop web applications for requirements that go beyond a traditional business website, including dashboards, portals, management systems, SaaS interfaces, directories, and browser-based tools.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Database size={22} />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                Full-Stack &amp; MERN Applications
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I work across frontend and backend development, connecting user interfaces with APIs, databases, authentication systems, business logic, and third-party services using technologies such as MongoDB, Express.js, React, and Node.js.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Code2 size={22} />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                React &amp; Next.js Projects
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                React and Next.js are among my primary technologies for developing modern, component-based websites and applications with responsive interfaces, dynamic functionality, and performance-focused architecture.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Sparkles size={22} />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                AI-Powered Applications
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I build and integrate practical AI functionality into websites and software, including AI assistants, conversational interfaces, AI-powered workflows, intelligent features, and integrations with modern AI services.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Bot size={22} />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                Custom AI Solutions
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I can develop AI-powered features around specific business requirements rather than relying only on generic AI tools. This can include custom assistants, AI integrations, automation workflows, and AI functionality within existing applications.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs sm:col-span-2 lg:col-span-3">
              <div className="w-10 h-10 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Search size={22} />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                Technical SEO &amp; Performance
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I also work on development-level SEO and performance, including semantic HTML, metadata, structured data, crawlability, internal linking, responsive implementation, Core Web Vitals, and website performance improvements.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 4. TECHNICAL EXPERTISE ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="Technical Expertise" icon={<Cpu />} />
            <SectionSubHeading>
              <p>Tools, frameworks, and technologies applied across development workflows.</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Frontend */}
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Code2 size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                  Frontend Development
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {["React.js", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA]/80 dark:border-[#2A3632]">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I use modern frontend technologies to build responsive interfaces, reusable components, interactive experiences, and performance-conscious web applications.
              </p>
            </div>

            {/* Backend */}
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Server size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                  Backend Development
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {["Node.js", "Express.js", "REST APIs"].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA]/80 dark:border-[#2A3632]">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I develop backend services and API workflows that connect frontend applications with databases, authentication systems, business logic, and external services.
              </p>
            </div>

            {/* Databases */}
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Database size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                  Databases &amp; Backend Services
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {["MongoDB", "Firebase", "Firestore", "Firebase Storage"].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA]/80 dark:border-[#2A3632]">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I work with document-based databases and managed backend services for data-driven applications, directories, dashboards, and business workflows.
              </p>
            </div>

            {/* AI Development & AI-Assisted Workflows */}
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#C96A3D]/40 dark:border-[#C96A3D]/40 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/15 text-[#C96A3D] flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                  AI Development &amp; AI-Assisted Workflows
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {["AI APIs", "AI Assistants", "Generative AI", "AI Integrations", "AI-Assisted Development"].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA]/80 dark:border-[#2A3632]">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I use modern AI technologies to build practical AI features and applications while also using AI-assisted development tools to accelerate research, prototyping, coding, debugging, and iteration.
              </p>
              <div className="p-3.5 rounded-lg bg-[#F5F2EC]/80 dark:bg-[#121917]/80 text-xs text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                My development workflow has included tools such as <strong className="text-[#17211E] dark:text-[#F5F2EC]">Cursor, Claude, Claude Code, Codex, GitHub Copilot, Replit, v0, Google AI Studio, and Antigravity</strong>. These tools complement software engineering fundamentals. I still review, test, understand, and maintain the code and systems I build.
              </div>
            </div>

            {/* SEO */}
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Search size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                  SEO &amp; Performance
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {["Technical SEO", "Structured Data", "Semantic HTML", "Core Web Vitals", "Website Performance"].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA]/80 dark:border-[#2A3632]">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I consider search visibility and performance during development rather than treating technical SEO as an afterthought.
              </p>
            </div>

            {/* Tools */}
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Wrench size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                  Development &amp; Deployment Tools
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {["Git", "GitHub", "npm", "Vercel", "cPanel"].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA]/80 dark:border-[#2A3632]">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                These tools support version control, deployment, development workflows, and ongoing project maintenance.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 5. PROFESSIONAL EXPERIENCE ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="Professional Experience" icon={<HiOutlineBriefcase />} />
            <SectionSubHeading>
              <p>Development, Digital Work &amp; Business Experience</p>
            </SectionSubHeading>
          </div>

          <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
            My professional experience includes MERN stack development, Shopify development, digital work, and business operations. These roles have helped me develop both technical capabilities and an understanding of practical requirements within organizations and client projects.
          </p>

          <div className="grid grid-cols-1 gap-6">
            {CAREERS.filter((c) => c.isShow).map((career, i) => (
              <CareerCard
                key={i}
                career={career}
                introContext={careerContexts[career.company]}
              />
            ))}
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 6. SELECTED DEVELOPMENT EXPERIENCE ---------------- */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <SectionHeading title="Selected Development Experience" icon={<HiOutlineFolder />} />
              <SectionSubHeading>
                <p>Real Projects, Practical Problems &amp; Working Solutions</p>
              </SectionSubHeading>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm font-mono text-[#C96A3D] hover:underline shrink-0"
            >
              View All Projects <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3 text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
            <p>
              My portfolio includes projects across SEO tools, business websites, directories, browser-based utilities, data-driven applications, and AI-powered experiences.
            </p>
            <p>
              Real projects demonstrate more than a list of technologies. They show how I approach requirements, development challenges, architecture, usability, performance, and practical implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCaseStudies.map((project) => (
              <div
                key={project.id}
                className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-4 shadow-xs hover:border-[#C96A3D]/60 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#C96A3D] font-semibold">
                    {project.subtitle}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#17211E] dark:text-[#F5F2EC]">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA]/70 dark:border-[#2A3632]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div>
                    {project.isInternal ? (
                      <Link
                        href={project.liveUrl}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#C96A3D] hover:underline"
                      >
                        View Project <ArrowRight size={13} />
                      </Link>
                    ) : (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#C96A3D] hover:underline"
                      >
                        View Project <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-[#F5F2EC]/80 dark:bg-[#121917]/80 border border-[#D9D4CA]/80 dark:border-[#2A3632] text-sm text-[#5C655F] dark:text-[#9DA6A0] text-center font-sans">
            These projects represent the type of work I enjoy most: turning practical requirements into working digital products while considering usability, performance, maintainability, search visibility, and the appropriate use of modern technology.
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 7. EDUCATION & CONTINUOUS LEARNING ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="Education &amp; Continuous Learning" icon={<TbSchool />} />
            <SectionSubHeading>
              <p>Building a Strong Technical Foundation</p>
            </SectionSubHeading>
          </div>

          <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
            My formal education provides the foundation for my technical work, while professional courses, certifications, and practical projects allow me to continuously expand my development skills.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {EDUCATION.map((edu, i) => (
              <EducationCard key={i} edu={edu} />
            ))}
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 8. CERTIFICATIONS & PROFESSIONAL LEARNING ---------------- */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <SectionHeading title="Certifications &amp; Professional Learning" icon={<HiOutlineBadgeCheck />} />
              <SectionSubHeading>
                <p>
                  Alongside university studies and hands-on development work, I continue to build my skills through structured professional courses and certifications.
                </p>
              </SectionSubHeading>
            </div>
            <Link
              href="/achievements"
              className="inline-flex items-center gap-1 text-sm font-mono text-[#C96A3D] hover:underline shrink-0"
            >
              Explore All Certifications &amp; Credentials <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {certificationsList.map((cert, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-xs font-mono text-[#C96A3D] font-semibold">{cert.provider}</span>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                  {cert.title}
                </h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
            I continue to supplement formal education with practical development projects, technical documentation, online courses, and hands-on experimentation with modern web and AI technologies.
          </p>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 9. HOW I APPROACH DEVELOPMENT (PHILOSOPHY) ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="How I Approach Development" icon={<Sparkles />} />
            <SectionSubHeading>
              <p>Principles That Guide My Work</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                01
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Understand the Problem First
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Technology should support the business objective. I start by understanding what the website, application, software, or AI solution needs to accomplish before deciding how it should be built.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                02
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Build for Real Users
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                A technically impressive application is not useful if people struggle to use it. I prioritize clear navigation, responsive interfaces, accessibility, and straightforward user experiences.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                03
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Choose Technology for a Reason
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I don't add technology simply because it is popular. The stack and architecture should match the project's requirements, users, performance needs, and long-term goals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                04
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Keep the Code Maintainable
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I prefer organized, understandable code and reusable components that make future changes easier rather than creating unnecessary technical complexity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                05
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Use AI Where It Adds Value
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                AI can accelerate development and create new product capabilities, but it should solve a real problem. I use AI technologies and AI-assisted development tools where they provide practical value while maintaining engineering review and control.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                06
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Consider Search &amp; Performance
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                For websites that depend on organic search, technical SEO and performance are considered during development. Semantic HTML, structured data, crawlability, responsive implementation, and Core Web Vitals are part of that process.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 sm:col-span-2 lg:col-span-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                07
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Keep Learning
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Web development and AI development continue to evolve. I actively learn new technologies, frameworks, tools, and development practices while applying them through practical projects.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 10. RESUME SECTION ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl font-sans">
              <h2 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Resume
              </h2>
              <p className="text-xs uppercase font-mono text-[#C96A3D] font-semibold">A More Detailed Professional Overview</p>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Want a more detailed overview of my professional experience, education, skills, and development background? You can view my resume online or download a copy for future reference.
              </p>
            </div>
            <ResumeButtons />
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 11. WORK WITH ME CTA ---------------- */}
        <section className="rounded-2xl border border-[#C96A3D]/40 bg-[#FFFEFA] dark:bg-[#1B2421] p-8 sm:p-10 space-y-6 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-heading text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Looking for a Developer?
            </h2>
            <h3 className="font-heading text-xl font-semibold text-[#C96A3D]">
              Have a Website, Software or AI Project in Mind?
            </h3>
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed font-sans">
              <p>
                If you have a business website, web application, software idea, AI project, or existing system that needs development or improvement, I'd be happy to understand what you're trying to build.
              </p>
              <p>
                I'm based in <strong className="text-[#17211E] dark:text-[#F5F2EC]">Multan, Pakistan</strong>, and available for projects with businesses, startups, agencies, and remote teams in Pakistan and internationally.
              </p>
              <p className="text-sm">
                Tell me what you're trying to build, what problem you want to solve, and any important requirements you already have.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-sm transition-colors duration-200 shadow-xs"
            >
              Discuss Your Project <ArrowRight size={16} />
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#F5F2EC] dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-sm border border-[#D9D4CA] dark:border-[#2A3632] transition-colors duration-200"
            >
              View My Projects
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

