import { useState } from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { motion, AnimatePresence } from "framer-motion";
import { PiCertificate } from "react-icons/pi";
import {
  HiOutlineArrowSmRight,
  HiSearch,
  HiX,
  HiOutlineExternalLink,
  HiOutlineDownload,
} from "react-icons/hi";
import {
  ArrowRight,
  Code2,
  Cpu,
  Sparkles,
  Award,
  BookOpen,
  Search,
  CheckCircle2,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import Breakline from "@/components/layout/Breakline";

const BASE_URL =
  "https://raw.githubusercontent.com/muhammadimran9/Portfolio-Website/master/certificates/";

type Certificate = {
  id: number;
  filename: string;
  title: string;
  issuer: string;
  category: string;
  color: string;
  isLocal?: boolean;
  credentialId?: string;
  label?: string;
  description?: string;
  isFeatured?: boolean;
};

const CERTIFICATES: Certificate[] = [
  {
    id: 2,
    filename: "full-stack-web-development-university-of-london.pdf",
    title: "Full-Stack Web Development Specialization",
    issuer: "University of London",
    category: "Web Development",
    color: "from-purple-500/20 to-indigo-600/10",
    isLocal: true,
    credentialId: "PPBYC5K8D6AE",
    label: "Specialization",
    description:
      "A structured specialization focused on full-stack web development and the concepts required to build modern web applications.",
    isFeatured: true,
  },
  {
    id: 24,
    filename: "intro-to-frontend-development-meta.pdf",
    title: "Introduction to Front-End Development",
    issuer: "Meta",
    category: "Frontend Development",
    color: "from-blue-600/20 to-cyan-500/10",
    isLocal: true,
    credentialId: "OBW2LOHL6J99",
    label: "Meta Certified",
    description:
      "Training focused on the foundations of modern frontend development and interactive web experiences.",
    isFeatured: true,
  },
  {
    id: 3,
    filename: "google-prompting-essentials.pdf",
    title: "Google Prompting Essentials",
    issuer: "Google",
    category: "Artificial Intelligence",
    color: "from-blue-500/20 to-indigo-600/10",
    isLocal: true,
    credentialId: "HBUVVGMX4TWE",
    label: "Google Certified",
    description:
      "Training focused on practical prompting techniques and the effective use of generative AI.",
    isFeatured: true,
  },
  {
    id: 1,
    filename: "actai-skillbridge-certified.pdf",
    title: "ActAI SkillBridge Certified Specialist",
    issuer: "ActAI",
    category: "Artificial Intelligence",
    color: "from-indigo-500/20 to-cyan-600/10",
    isLocal: true,
    credentialId: "ACTAI-SB-2024",
    label: "Featured Cert",
    description:
      "Certification focused on artificial intelligence-related skills and practical technology applications.",
    isFeatured: true,
  },
  {
    id: 4,
    filename: "frontend-developershub.pdf",
    title: "Front End Development Internship",
    issuer: "DevelopersHub Corporation",
    category: "Frontend Development",
    color: "from-yellow-500/20 to-amber-600/10",
    isLocal: true,
    credentialId: "DHC-1725",
    label: "Best Award",
    description: "Practical internship experience focused on frontend development.",
    isFeatured: true,
  },
  {
    id: 5,
    filename: "flutter-developershub.pdf",
    title: "Flutter Development Internship",
    issuer: "DevelopersHub Corporation",
    category: "Mobile Development",
    color: "from-sky-500/20 to-cyan-600/10",
    isLocal: true,
    credentialId: "DHC-1726",
    label: "Best Award",
    description:
      "Practical internship experience focused on Flutter and mobile application development.",
    isFeatured: true,
  },
  {
    id: 6,
    filename: "html-university-of-london.pdf",
    title: "HTML: How to Build a Website",
    issuer: "University of London",
    category: "Frontend Development",
    color: "from-orange-500/20 to-amber-600/10",
    isLocal: true,
    credentialId: "S4S99829L1UL",
    description: "Foundational training in HTML, web document structure, and web standards.",
  },
  {
    id: 7,
    filename: "web-page-layout-css-usability-and-accessibility.pdf",
    title: "CSS: Web Page Layout - Usability and Accessibility",
    issuer: "University of London",
    category: "Frontend Development",
    color: "from-blue-500/20 to-cyan-600/10",
    isLocal: true,
    credentialId: "QC2EBL9CMYK9",
    description:
      "Training covering CSS layout techniques, responsive design, usability principles, and web accessibility.",
  },
  {
    id: 16,
    filename: "build-dynamic-ui-websites.pdf",
    title: "Build Dynamic User Interfaces (UI) for Websites",
    issuer: "Google",
    category: "Frontend Development",
    color: "from-cyan-500/20 to-teal-600/10",
    isLocal: true,
    credentialId: "91F1F6OTSKUK",
    description:
      "Training focused on designing and building interactive web interfaces.",
  },
  {
    id: 20,
    filename: "wordpress-digiskills.pdf",
    title: "WordPress",
    issuer: "DigiSkills",
    category: "Web Development",
    color: "from-indigo-500/20 to-indigo-600/10",
    isLocal: true,
    credentialId: "QDRRNAHMK",
    description: "Training in WordPress, content management, customization, and website administration.",
  },
  {
    id: 15,
    filename: "use-ai-creative-expert-partner.pdf",
    title: "Use AI as a Creative or Expert Partner",
    issuer: "Google",
    category: "Artificial Intelligence",
    color: "from-indigo-500/20 to-blue-600/10",
    isLocal: true,
    credentialId: "DKGDB5U8OW5D",
    description:
      "Training focused on using AI as a practical partner for creative and professional tasks.",
  },
  {
    id: 18,
    filename: "start-writing-prompts-pro.pdf",
    title: "Start Writing Prompts like a Pro",
    issuer: "Google",
    category: "Artificial Intelligence",
    color: "from-yellow-500/20 to-orange-600/10",
    isLocal: true,
    credentialId: "VMFLZPRYZI8V",
    description:
      "Training focused on developing effective prompts for professional use cases.",
  },
  {
    id: 19,
    filename: "design-prompts-everyday-work.pdf",
    title: "Design Prompts for Everyday Work Tasks",
    issuer: "Google",
    category: "Artificial Intelligence",
    color: "from-rose-500/20 to-pink-600/10",
    isLocal: true,
    credentialId: "S8EZDF6C4E34",
    description:
      "Training focused on applying prompt-based workflows to everyday professional tasks.",
  },
  {
    id: 14,
    filename: "accelerate-job-search-ai.pdf",
    title: "Accelerate Your Job Search with AI",
    issuer: "Google",
    category: "Artificial Intelligence",
    color: "from-violet-500/20 to-purple-600/10",
    isLocal: true,
    credentialId: "HUTL4D9X90Z5",
    description:
      "Training focused on practical applications of AI in professional and career development.",
  },
  {
    id: 11,
    filename: "technical-support-fundamentals.pdf",
    title: "Technical Support Fundamentals",
    issuer: "Google",
    category: "IT Support",
    color: "from-green-500/20 to-emerald-600/10",
    isLocal: true,
    credentialId: "HPEJIZD0JGJU",
    description: "Foundational training in technical support concepts and troubleshooting.",
  },
  {
    id: 13,
    filename: "ux-design-foundations.pdf",
    title: "Foundations of User Experience (UX) Design",
    issuer: "Google",
    category: "UX Design",
    color: "from-pink-500/20 to-rose-600/10",
    isLocal: true,
    credentialId: "V4N598S7R7JA",
    description: "Training focused on user-centered design principles and UX fundamentals.",
  },
  {
    id: 10,
    filename: "agile-essential.pdf",
    title: "Google Agile Essentials",
    issuer: "Google",
    category: "Project Management",
    color: "from-blue-500/20 to-blue-600/10",
    isLocal: true,
    credentialId: "2O19RJW9RI77",
    description: "Training covering Agile concepts and approaches to collaborative project work.",
  },
  {
    id: 12,
    filename: "speed-up-data-analysis.pdf",
    title: "Speed Up Data Analysis and Presentation Building",
    issuer: "Google",
    category: "Data Analysis",
    color: "from-orange-500/20 to-amber-600/10",
    isLocal: true,
    credentialId: "F88UMAB6GBJZ",
    description: "Training focused on practical data analysis and presentation workflows.",
  },
  {
    id: 8,
    filename: "advance-customer-relationship-management-microsoft.pdf",
    title: "Advanced Customer Relationship Management",
    issuer: "Microsoft",
    category: "Business",
    color: "from-sky-500/20 to-blue-600/10",
    isLocal: true,
    credentialId: "1502GT75DG79",
    description: "Professional learning related to customer relationship management.",
  },
  {
    id: 9,
    filename: "osha-basic-skillup.pdf",
    title: "Occupational Safety and Health Administration (OSHA) Basics",
    issuer: "SkillUp",
    category: "Business",
    color: "from-red-500/20 to-rose-600/10",
    isLocal: true,
    credentialId: "SWGO7KQY70YV",
    description: "Professional training covering workplace safety fundamentals.",
  },
  {
    id: 17,
    filename: "digital-marketing-ecommerce.pdf",
    title: "Foundations of Digital Marketing and E-commerce",
    issuer: "Google",
    category: "Digital Marketing",
    color: "from-emerald-500/20 to-green-600/10",
    isLocal: true,
    credentialId: "Q8KFE6QDRMZ3",
    description: "Training covering fundamental digital marketing and e-commerce concepts.",
  },
  {
    id: 22,
    filename: "affiliate-marketing.pdf",
    title: "Affiliate Marketing",
    issuer: "DigiSkills",
    category: "Marketing",
    color: "from-violet-500/20 to-purple-600/10",
    isLocal: true,
    credentialId: "DS-AM-2024",
    description: "Professional course covering affiliate marketing fundamentals.",
  },
  {
    id: 23,
    filename: "freelancing-digiskills.pdf",
    title: "Freelancing & Digital Services",
    issuer: "DigiSkills",
    category: "Freelancing",
    color: "from-emerald-500/20 to-teal-600/10",
    isLocal: true,
    credentialId: "DS-FREE-2024",
    description: "Training focused on freelancing and digital service delivery.",
  },
  {
    id: 21,
    filename: "creative-writing.pdf",
    title: "Creative Writing",
    issuer: "DigiSkills",
    category: "Writing",
    color: "from-teal-500/20 to-emerald-600/10",
    isLocal: true,
    credentialId: "DS-CW-2024",
    description: "Training focused on written communication and creative writing.",
  },
  {
    id: 25,
    filename: "seo-audits-skillshare.pdf",
    title: "SEO Audits: Find & Fix Common Website SEO Issues",
    issuer: "Skillshare",
    category: "SEO",
    color: "from-emerald-500/20 to-teal-600/10",
    isLocal: true,
    credentialId: "RC8BMJN47M70",
    label: "Skillshare Certified",
    description: "Practical course covering technical website audit techniques and SEO issue remediation.",
  },
];

const ALL_CATEGORIES = [
  "All",
  ...Array.from(new Set(CERTIFICATES.map((c) => c.category))),
];
const ALL_ISSUERS = ["All", ...Array.from(new Set(CERTIFICATES.map((c) => c.issuer)))];

const CATEGORY_COLORS: Record<string, string> = {
  "Project Management":
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "Frontend Development": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  "Marketing": "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  "Digital Marketing": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "Business": "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  "Artificial Intelligence": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20",
  "SEO": "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  "Web Development": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  "Mobile Development": "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  "Writing": "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  "Freelancing":
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "IT Support":
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "UX Design": "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  "Data Analysis": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

function getCertUrl(cert: Certificate): string {
  return cert.isLocal ? `/certificates/${cert.filename}` : BASE_URL + cert.filename;
}

function CertCard({
  cert,
  onClick,
}: {
  cert: Certificate;
  onClick: () => void;
}) {
  const catColor =
    CATEGORY_COLORS[cert.category] ??
    "bg-neutral-100 text-neutral-600 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.2 }}
      className="h-full cursor-pointer"
      onClick={onClick}
    >
      <SpotlightCard className="group flex h-full flex-col overflow-hidden border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] rounded-2xl">
        {/* Thumbnail Header */}
        <div
          className={`relative flex min-h-[140px] items-center justify-center bg-gradient-to-br ${cert.color} overflow-hidden p-4`}
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/50 dark:bg-black/40 border border-white/60 dark:border-white/20 backdrop-blur-xs">
              <PiCertificate
                size={26}
                className="text-neutral-800 dark:text-neutral-200"
              />
            </div>
            {cert.credentialId && (
              <span className="rounded-md bg-white/80 dark:bg-black/60 px-2 py-0.5 text-[10px] font-mono font-bold text-[#17211E] dark:text-[#F5F2EC] tracking-wider">
                ID: {cert.credentialId}
              </span>
            )}
            {cert.label ? (
              <p className="text-[10px] font-mono font-semibold text-[#C96A3D] uppercase tracking-wider">
                {cert.label}
              </p>
            ) : (
              <p className="text-[10px] font-mono text-[#5C655F] dark:text-[#9DA6A0] uppercase tracking-wider">
                {cert.issuer}
              </p>
            )}
          </div>

          <div className="absolute right-3 top-3 rounded-md bg-white/90 dark:bg-black/80 px-2 py-0.5 text-[10px] font-mono font-bold text-neutral-600 dark:text-neutral-400 shadow-xs">
            PDF
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/60 text-white opacity-0 transition-opacity duration-250 group-hover:opacity-100 font-sans">
            <PiCertificate size={24} />
            <span className="text-xs font-medium">View Credential</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between space-y-3 p-5 font-sans">
          <div className="space-y-1.5">
            <h3 className="line-clamp-2 text-base font-bold text-[#17211E] dark:text-[#F5F2EC] leading-snug">
              {cert.title}
            </h3>
            <p className="text-xs font-medium text-[#C96A3D]">{cert.issuer}</p>
            {cert.description && (
              <p className="line-clamp-2 text-xs text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed pt-1">
                {cert.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]/50">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-medium ${catColor}`}
            >
              {cert.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-mono text-[#5C655F] group-hover:text-[#C96A3D] transition-colors">
              <span>View Credential</span>
              <HiOutlineArrowSmRight size={14} />
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

function CertModal({
  cert,
  onClose,
}: {
  cert: Certificate;
  onClose: () => void;
}) {
  const rawUrl = getCertUrl(cert);
  const catColor =
    CATEGORY_COLORS[cert.category] ??
    "bg-neutral-100 text-neutral-600 border-neutral-300";
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl"
          style={{ maxHeight: "90vh" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-5 py-4 shrink-0 font-sans">
            <div className="space-y-0.5 min-w-0 pr-4">
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 truncate">
                {cert.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span>{cert.issuer}</span>
                {cert.credentialId && (
                  <>
                    <span>•</span>
                    <span className="font-mono text-[#C96A3D]">
                      ID: {cert.credentialId}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`hidden sm:inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-medium ${catColor}`}
              >
                {cert.category}
              </span>
              <a
                href={rawUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Open in new tab"
                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <HiOutlineExternalLink size={14} />
                <span className="hidden sm:inline">Open</span>
              </a>
              <a
                href={rawUrl}
                download
                onClick={(e) => e.stopPropagation()}
                title="Download PDF"
                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <HiOutlineDownload size={14} />
                <span className="hidden sm:inline">Download</span>
              </a>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                <HiX size={16} />
              </button>
            </div>
          </div>

          {/* Viewer */}
          <div
            className="relative flex-1 bg-neutral-100 dark:bg-neutral-950"
            style={{ minHeight: "500px" }}
          >
            {!loaded && !failed && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-400">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-[#C96A3D]" />
                <p className="text-sm">Loading certificate…</p>
              </div>
            )}
            {failed ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center font-sans">
                <PiCertificate
                  size={48}
                  className="text-neutral-300 dark:text-neutral-600"
                />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Preview unavailable in browser
                  </p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">
                    Use the buttons above to open or download the certificate directly.
                  </p>
                </div>
                <a
                  href={rawUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] px-4 py-2 text-sm font-medium text-white transition-opacity"
                >
                  <HiOutlineExternalLink size={14} />
                  Open Certificate
                </a>
              </div>
            ) : (
              <iframe
                src={rawUrl}
                className="h-full w-full"
                style={{ minHeight: "500px" }}
                title={cert.title}
                onLoad={() => setLoaded(true)}
                onError={() => {
                  setLoaded(true);
                  setFailed(true);
                }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function AchievementsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setCategory] = useState("All");
  const [selectedIssuer, setIssuer] = useState("All");
  const [openCert, setOpenCert] = useState<Certificate | null>(null);

  const featuredCerts = CERTIFICATES.filter((c) => c.isFeatured);
  
  const webDevCerts = CERTIFICATES.filter((c) =>
    ["Web Development", "Frontend Development", "Mobile Development"].includes(c.category)
  );

  const aiCerts = CERTIFICATES.filter((c) => c.category === "Artificial Intelligence");
  
  const itUxCerts = CERTIFICATES.filter((c) =>
    ["IT Support", "UX Design", "Project Management", "Data Analysis", "Business"].includes(
      c.category
    )
  );

  const marketingCerts = CERTIFICATES.filter((c) =>
    ["Digital Marketing", "Marketing", "Freelancing", "Writing", "SEO"].includes(c.category)
  );

  const filtered = CERTIFICATES.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.issuer.toLowerCase().includes(search.toLowerCase()) ||
      (c.credentialId && c.credentialId.toLowerCase().includes(search.toLowerCase()));
    const matchCategory =
      selectedCategory === "All" || c.category === selectedCategory;
    const matchIssuer = selectedIssuer === "All" || c.issuer === selectedIssuer;
    return matchSearch && matchCategory && matchIssuer;
  });

  return (
    <>
      <SEOHead
        title="Muhammad Imran | Certifications & Professional Learning"
        description="Explore Muhammad Imran's certifications in full-stack development, frontend engineering, AI, SEO, UX, IT support, and digital technologies."
        path="/achievements"
      />

      <div className="space-y-16 py-6 font-sans">
        {/* ---------------- 1. HERO / INTRODUCTION ---------------- */}
        <section className="space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] px-3.5 py-1.5 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <span className="w-2 h-2 rounded-full bg-[#C96A3D] animate-pulse" />
              <span>Professional Learning &amp; Credentials</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#17211E] dark:text-[#F5F2EC]">
              Certifications &amp; Professional Learning
            </h1>

            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#C96A3D]">
              Professional Credentials Behind Practical Development Work
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#5C655F] dark:text-[#9DA6A0] max-w-4xl font-sans">
            <p>
              My professional learning is an ongoing part of my development journey. Alongside university studies, professional experience, and hands-on software projects, I have completed certifications, courses, and training across full-stack web development, frontend engineering, artificial intelligence, SEO, IT support, UX design, digital marketing, freelancing, and related technology fields.
            </p>
            <p>
              These credentials represent structured learning from organizations and platforms including Google, Meta, the University of London, Microsoft, DigiSkills, ActAI, DevelopersHub Corporation, SkillUp, and Skillshare.
            </p>
            <p>
              I combine this structured learning with practical development experience to continuously improve how I design, build, optimize, and deliver modern websites, web applications, software systems, digital tools, and AI-powered solutions.
            </p>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 2. FEATURED CREDENTIALS ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="Featured Credentials" icon={<Award />} />
            <SectionSubHeading>
              <p>
                Certifications Most Relevant to My Current Development Work
              </p>
            </SectionSubHeading>
          </div>

          <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
            The following credentials are particularly relevant to my work in full-stack web development, frontend engineering, artificial intelligence, AI-assisted workflows, and modern digital technologies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCerts.map((cert) => (
              <CertCard
                key={cert.id}
                cert={cert}
                onClick={() => setOpenCert(cert)}
              />
            ))}
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 3. WEB DEVELOPMENT & FRONTEND CERTIFICATIONS ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="Web Development & Frontend Certifications" icon={<Code2 />} />
            <SectionSubHeading>
              <p>Training That Supports My Software Development Work</p>
            </SectionSubHeading>
          </div>

          <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed font-sans">
            My web development credentials cover frontend fundamentals, full-stack development, HTML, CSS, responsive interfaces, user interfaces, WordPress, and modern web development concepts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {webDevCerts.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setOpenCert(cert)}
                className="p-5 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] flex items-start gap-4 cursor-pointer hover:border-[#C96A3D]/60 transition-colors shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center shrink-0 mt-0.5">
                  <Code2 size={20} />
                </div>
                <div className="space-y-1 min-w-0 flex-1 font-sans">
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                    {cert.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
                    <span className="font-semibold text-[#C96A3D]">{cert.issuer}</span>
                    {cert.credentialId && (
                      <>
                        <span>•</span>
                        <span>Credential ID: <strong className="text-[#17211E] dark:text-[#F5F2EC]">{cert.credentialId}</strong></span>
                      </>
                    )}
                  </div>
                  {cert.description && (
                    <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0] pt-1">
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed font-sans pt-2">
            These credentials complement my hands-on experience building websites, web applications, dashboards, directories, browser-based tools, and full-stack digital products.
          </p>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 4. ARTIFICIAL INTELLIGENCE & AI-ASSISTED LEARNING ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="Artificial Intelligence & AI-Assisted Learning" icon={<Sparkles />} />
            <SectionSubHeading>
              <p>Building Practical AI Skills Alongside Full-Stack Development</p>
            </SectionSubHeading>
          </div>

          <div className="space-y-3 text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed font-sans">
            <p>
              Artificial intelligence has become an increasingly important part of my development workflow.
            </p>
            <p>
              My AI-related learning includes generative AI, prompt engineering, AI-assisted productivity, and practical applications of AI in professional workflows.
            </p>
            <p>
              I use this knowledge alongside software engineering skills to explore and build practical AI-powered features, assistants, integrations, automation workflows, and digital products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiCerts.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setOpenCert(cert)}
                className="p-5 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] flex items-start gap-4 cursor-pointer hover:border-[#C96A3D]/60 transition-colors shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles size={20} />
                </div>
                <div className="space-y-1 min-w-0 flex-1 font-sans">
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                    {cert.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
                    <span className="font-semibold text-[#C96A3D]">{cert.issuer}</span>
                    {cert.credentialId && (
                      <>
                        <span>•</span>
                        <span>Credential ID: <strong className="text-[#17211E] dark:text-[#F5F2EC]">{cert.credentialId}</strong></span>
                      </>
                    )}
                  </div>
                  {cert.description && (
                    <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0] pt-1">
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 5. IT, UX & PROFESSIONAL DEVELOPMENT ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="IT, UX & Professional Development" icon={<Cpu />} />
            <SectionSubHeading>
              <p>Supporting Skills Beyond Software Development</p>
            </SectionSubHeading>
          </div>

          <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed font-sans">
            Building useful digital products requires more than programming alone. My professional learning also includes technical support, user experience, Agile project practices, data analysis, and business-related technology.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {itUxCerts.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setOpenCert(cert)}
                className="p-5 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] flex items-start gap-4 cursor-pointer hover:border-[#C96A3D]/60 transition-colors shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center shrink-0 mt-0.5">
                  <Cpu size={20} />
                </div>
                <div className="space-y-1 min-w-0 flex-1 font-sans">
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                    {cert.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
                    <span className="font-semibold text-[#C96A3D]">{cert.issuer}</span>
                    {cert.credentialId && (
                      <>
                        <span>•</span>
                        <span>Credential ID: <strong className="text-[#17211E] dark:text-[#F5F2EC]">{cert.credentialId}</strong></span>
                      </>
                    )}
                  </div>
                  {cert.description && (
                    <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0] pt-1">
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 6. DIGITAL MARKETING, SEO & FREELANCING ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="Digital Marketing, SEO & Freelancing" icon={<BookOpen />} />
            <SectionSubHeading>
              <p>Understanding the Business Side of Digital Products</p>
            </SectionSubHeading>
          </div>

          <div className="space-y-3 text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed font-sans">
            <p>
              My learning also extends beyond programming into SEO, digital marketing, freelancing, e-commerce, communication, and online services.
            </p>
            <p>
              This broader knowledge helps me understand the business context behind the websites and digital systems I build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketingCerts.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setOpenCert(cert)}
                className="p-5 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] flex items-start gap-4 cursor-pointer hover:border-[#C96A3D]/60 transition-colors shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen size={20} />
                </div>
                <div className="space-y-1 min-w-0 flex-1 font-sans">
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                    {cert.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
                    <span className="font-semibold text-[#C96A3D]">{cert.issuer}</span>
                    {cert.credentialId && (
                      <>
                        <span>•</span>
                        <span>Credential ID: <strong className="text-[#17211E] dark:text-[#F5F2EC]">{cert.credentialId}</strong></span>
                      </>
                    )}
                  </div>
                  {cert.description && (
                    <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0] pt-1">
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed font-sans pt-2">
            These areas complement my technical development work by helping me understand online businesses, digital services, communication, search visibility, and customer-focused projects.
          </p>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 7. COMPLETE CERTIFICATION LIBRARY ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="Complete Certification Library" icon={<PiCertificate />} />
            <SectionSubHeading>
              <p>Explore All Professional Credentials</p>
            </SectionSubHeading>
          </div>

          <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed font-sans">
            Below is the complete collection of my certifications, courses, internships, and professional learning credentials. Use the available category and issuer filters to explore credentials related to:
          </p>

          <div className="p-3.5 rounded-xl bg-[#F5F2EC]/80 dark:bg-[#121917]/80 border border-[#D9D4CA]/80 dark:border-[#2A3632] text-xs font-mono text-[#C96A3D] font-semibold flex flex-wrap gap-2 justify-center text-center">
            <span>Web Development</span> • <span>Frontend Development</span> • <span>Artificial Intelligence</span> • <span>SEO</span> • <span>IT Support</span> • <span>UX Design</span> • <span>Digital Marketing</span> • <span>Business</span> • <span>Freelancing</span> • <span>Project Management</span> • <span>Data Analysis</span> • <span>Mobile Development</span> • <span>Writing</span>
          </div>

          {/* Filters Bar */}
          <div className="space-y-4 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-5 shadow-xs font-sans">
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <HiSearch
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C655F]"
                />
                <input
                  type="text"
                  placeholder="Search certificates by title, issuer, or ID…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] placeholder-[#5C655F]/70 focus:outline-none focus:ring-2 focus:ring-[#C96A3D]"
                />
              </div>

              {/* Category filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3.5 py-2.5 text-sm font-mono rounded-lg border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] focus:outline-none focus:ring-2 focus:ring-[#C96A3D]"
              >
                {ALL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All Categories" : c}
                  </option>
                ))}
              </select>

              {/* Issuer filter */}
              <select
                value={selectedIssuer}
                onChange={(e) => setIssuer(e.target.value)}
                className="px-3.5 py-2.5 text-sm font-mono rounded-lg border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] focus:outline-none focus:ring-2 focus:ring-[#C96A3D]"
              >
                {ALL_ISSUERS.map((i) => (
                  <option key={i} value={i}>
                    {i === "All" ? "All Issuers" : i}
                  </option>
                ))}
              </select>
            </div>

            <p className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              Showing <strong className="text-[#17211E] dark:text-[#F5F2EC]">{filtered.length}</strong> of {CERTIFICATES.length} Credentials
            </p>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-[#5C655F] dark:text-[#9DA6A0]">
              <PiCertificate size={48} className="text-[#C96A3D]" />
              <p className="mt-3 text-base font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                No certificates found matching your criteria
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setIssuer("All");
                }}
                className="mt-3 text-xs font-mono text-[#C96A3D] hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence>
                {filtered.map((cert) => (
                  <CertCard
                    key={cert.id}
                    cert={cert}
                    onClick={() => setOpenCert(cert)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 8. CONTINUOUS LEARNING ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-4 font-sans">
          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Continuous Learning
            </h2>
            <h3 className="font-heading text-lg font-semibold text-[#C96A3D]">
              Development Doesn't Stop With a Certificate
            </h3>
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed pt-2">
              <p>
                Web development, software engineering, SEO, and artificial intelligence continue to evolve, so my learning does not stop after completing a course or earning a certificate.
              </p>
              <p>
                I continue to expand my skills through university studies, practical software projects, professional training, technical documentation, experimentation, and hands-on work with modern development and AI tools.
              </p>
              <p className="text-sm">
                New credentials and relevant professional learning achievements will be added to this page as they are completed.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 9. FINAL CTA ---------------- */}
        <section className="rounded-2xl border border-[#C96A3D]/40 bg-[#FFFEFA] dark:bg-[#1B2421] p-8 sm:p-10 space-y-6 shadow-xs font-sans">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-heading text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Certifications Are Part of the Story
            </h2>
            <h3 className="font-heading text-xl font-semibold text-[#C96A3D]">
              See How I Apply This Knowledge
            </h3>
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed pt-1">
              <p>
                Certifications demonstrate structured learning, but practical projects show how that knowledge is applied.
              </p>
              <p>
                My portfolio includes business websites, full-stack applications, SEO tools, directories, browser-based utilities, dashboards, and AI-powered experiences.
              </p>
              <p className="text-sm">
                Explore the projects behind my development work or get in touch if you have a website, software, web application, or AI project you would like to discuss.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-sm transition-colors duration-200 shadow-xs"
            >
              View Projects <ArrowRight size={16} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#F5F2EC] dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-sm border border-[#D9D4CA] dark:border-[#2A3632] transition-colors duration-200"
            >
              Start a Project
            </Link>
          </div>
        </section>

        {/* Modal */}
        {openCert && (
          <CertModal cert={openCert} onClose={() => setOpenCert(null)} />
        )}
      </div>
    </>
  );
}
