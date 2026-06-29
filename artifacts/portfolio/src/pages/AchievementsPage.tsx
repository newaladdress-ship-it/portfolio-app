import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { motion, AnimatePresence } from "framer-motion";
import { PiCertificate } from "react-icons/pi";
import {
  HiOutlineArrowSmRight, HiSearch, HiX,
  HiOutlineExternalLink, HiOutlineDownload,
} from "react-icons/hi";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import { useT } from "@/lib/i18n";

const BASE_URL = "https://raw.githubusercontent.com/muhammadimran9/Portfolio-Website/master/certificates/";

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
};

const CERTIFICATES: Certificate[] = [
  {
    id: 10,
    filename: "frontend-developershub.pdf",
    title: "Front End Development Internship",
    issuer: "DevelopersHub Corporation",
    category: "Frontend",
    color: "from-yellow-500/20 to-amber-600/10",
    isLocal: true,
    credentialId: "DHC-1725",
    label: "Best Award",
  },
  {
    id: 11,
    filename: "flutter-developershub.pdf",
    title: "Flutter Development Internship",
    issuer: "DevelopersHub Corporation",
    category: "Mobile",
    color: "from-sky-500/20 to-cyan-600/10",
    isLocal: true,
    credentialId: "DHC-1726",
    label: "Best Award",
  },
  {
    id: 1,
    filename: "agile-essential.pdf",
    title: "Google Agile Essentials",
    issuer: "Google",
    category: "Project Management",
    color: "from-blue-500/20 to-blue-600/10",
    isLocal: true,
    credentialId: "2O19RJW9RI77",
  },
  {
    id: 12,
    filename: "technical-support-fundamentals.pdf",
    title: "Technical Support Fundamentals",
    issuer: "Google",
    category: "IT Support",
    color: "from-green-500/20 to-emerald-600/10",
    isLocal: true,
    credentialId: "HPEJIZD0JGJU",
  },
  {
    id: 13,
    filename: "speed-up-data-analysis.pdf",
    title: "Speed Up Data Analysis and Presentation Building",
    issuer: "Google",
    category: "Data Analysis",
    color: "from-orange-500/20 to-amber-600/10",
    isLocal: true,
    credentialId: "F88UMAB6GBJZ",
  },
  {
    id: 14,
    filename: "ux-design-foundations.pdf",
    title: "Foundations of User Experience (UX) Design",
    issuer: "Google",
    category: "UX Design",
    color: "from-pink-500/20 to-rose-600/10",
    isLocal: true,
    credentialId: "V4N598S7R7JA",
  },
  {
    id: 15,
    filename: "accelerate-job-search-ai.pdf",
    title: "Accelerate Your Job Search with AI",
    issuer: "Google",
    category: "Career Development",
    color: "from-violet-500/20 to-purple-600/10",
    isLocal: true,
    credentialId: "HUTL4D9X90Z5",
  },
  {
    id: 16,
    filename: "use-ai-creative-expert-partner.pdf",
    title: "Use AI as a Creative or Expert Partner",
    issuer: "Google",
    category: "AI",
    color: "from-indigo-500/20 to-blue-600/10",
    isLocal: true,
    credentialId: "DKGDB5U8OW5D",
  },
  {
    id: 17,
    filename: "build-dynamic-ui-websites.pdf",
    title: "Build Dynamic User Interfaces (UI) for Websites",
    issuer: "Google",
    category: "Frontend",
    color: "from-cyan-500/20 to-teal-600/10",
    isLocal: true,
    credentialId: "91F1F6OTSKUK",
  },
  {
    id: 18,
    filename: "digital-marketing-ecommerce.pdf",
    title: "Foundations of Digital Marketing and E-commerce",
    issuer: "Google",
    category: "Digital Marketing",
    color: "from-emerald-500/20 to-green-600/10",
    isLocal: true,
    credentialId: "Q8KFE6QDRMZ3",
  },
  {
    id: 19,
    filename: "start-writing-prompts-pro.pdf",
    title: "Start Writing Prompts like a Pro",
    issuer: "Google",
    category: "AI",
    color: "from-yellow-500/20 to-orange-600/10",
    isLocal: true,
    credentialId: "VMFLZPRYZI8V",
  },
  {
    id: 20,
    filename: "design-prompts-everyday-work.pdf",
    title: "Design Prompts for Everyday Work Tasks",
    issuer: "Google",
    category: "AI",
    color: "from-rose-500/20 to-pink-600/10",
    isLocal: true,
    credentialId: "S8EZDF6C4E34",
  },
  {
    id: 21,
    filename: "google-prompting-essentials.pdf",
    title: "Google Prompting Essentials",
    issuer: "Google",
    category: "AI",
    color: "from-blue-500/20 to-indigo-600/10",
    isLocal: true,
    credentialId: "HBUVVGMX4TWE",
    label: "Specialization",
  },
  {
    id: 9,
    filename: "wordpress-digiskills.pdf",
    title: "WordPress",
    issuer: "DigiSkills",
    category: "Web Dev",
    color: "from-indigo-500/20 to-indigo-600/10",
    isLocal: true,
    credentialId: "QDRRNAHMK",
  },
  {
    id: 12,
    filename: "creative-writing.pdf",
    title: "Creative Writing",
    issuer: "Coursera",
    category: "Writing",
    color: "from-teal-500/20 to-emerald-600/10",
    isLocal: true,
  },
  {
    id: 13,
    filename: "affiliate-marketing.pdf",
    title: "Affiliate Marketing",
    issuer: "Coursera",
    category: "Marketing",
    color: "from-violet-500/20 to-purple-600/10",
    isLocal: true,
  },
];

const ALL_CATEGORIES = ["All", ...Array.from(new Set(CERTIFICATES.map((c) => c.category)))];
const ALL_ISSUERS   = ["All", ...Array.from(new Set(CERTIFICATES.map((c) => c.issuer)))];

const CATEGORY_COLORS: Record<string, string> = {
  "Project Management": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "AI & Marketing":     "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  "Frontend":           "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  "AI & Design":        "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  "Marketing":          "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  "Business":           "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  "AI":                 "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20",
  "SEO":                "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  "Web Dev":            "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  "Mobile":             "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  "Writing":            "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  "Freelancing":        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

function getCertUrl(cert: Certificate): string {
  return cert.isLocal
    ? `/certificates/${cert.filename}`
    : BASE_URL + cert.filename;
}

function CertCard({ cert, onClick }: { cert: Certificate; onClick: () => void }) {
  const rawUrl = getCertUrl(cert);
  const catColor = CATEGORY_COLORS[cert.category] ?? "bg-neutral-100 text-neutral-600 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.25 }}
      className="h-full cursor-pointer"
      onClick={onClick}
    >
      <SpotlightCard className="group flex h-full flex-col overflow-hidden">
        {/* Thumbnail */}
        <div className={`relative flex min-h-[160px] items-center justify-center bg-gradient-to-br ${cert.color} overflow-hidden`}>
          <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/40 dark:bg-black/30 border border-white/50 dark:border-white/20 backdrop-blur-sm">
              <PiCertificate size={30} className="text-neutral-700 dark:text-neutral-300" />
            </div>
            {cert.credentialId && (
              <span className="rounded-md bg-white/70 dark:bg-black/50 px-2 py-0.5 text-[10px] font-bold text-neutral-600 dark:text-neutral-400 tracking-wider">
                {cert.credentialId}
              </span>
            )}
            {cert.label ? (
              <p className="text-[10px] font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-widest">
                {cert.label}
              </p>
            ) : (
              <p className="text-[10px] text-neutral-500 dark:text-neutral-500 uppercase tracking-widest">{cert.issuer}</p>
            )}
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent dark:from-black/60" />
          {/* Hover overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <PiCertificate size={28} />
            <span className="text-sm font-medium">Click to Preview</span>
          </div>
          {/* PDF badge */}
          <span className="absolute right-3 top-3 rounded-md bg-white/90 dark:bg-black/80 px-2 py-0.5 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 shadow">
            PDF
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between space-y-3 p-4">
          <div className="space-y-1.5">
            <h3 className="line-clamp-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
              {cert.title}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{cert.issuer}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${catColor}`}>
              {cert.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              <span>View</span>
              <HiOutlineArrowSmRight size={14} />
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

function CertModal({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  const rawUrl = getCertUrl(cert);
  const catColor = CATEGORY_COLORS[cert.category] ?? "bg-neutral-100 text-neutral-600 border-neutral-300";
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-950 shadow-2xl"
          style={{ maxHeight: "90vh" }}
        >
          {/* Modal header */}
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-5 py-4 shrink-0">
            <div className="space-y-0.5 min-w-0 pr-4">
              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                {cert.title}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{cert.issuer}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`hidden sm:inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${catColor}`}>
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

          {/* PDF Viewer */}
          <div className="relative flex-1 bg-neutral-100 dark:bg-neutral-900" style={{ minHeight: "500px" }}>
            {!loaded && !failed && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-400">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-yellow-400" />
                <p className="text-sm">Loading certificate…</p>
              </div>
            )}
            {failed ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <PiCertificate size={48} className="text-neutral-300 dark:text-neutral-600" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Preview unavailable in browser</p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">Use the buttons above to open or download the certificate directly.</p>
                </div>
                <a
                  href={rawUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-4 py-2 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
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
                onError={() => { setLoaded(true); setFailed(true); }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function AchievementsPage() {
  const t = useT();
  const [search, setSearch]             = useState("");
  const [selectedCategory, setCategory] = useState("All");
  const [selectedIssuer, setIssuer]     = useState("All");
  const [openCert, setOpenCert]         = useState<Certificate | null>(null);

  const filtered = CERTIFICATES.filter((c) => {
    const matchSearch   = c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.issuer.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "All" || c.category === selectedCategory;
    const matchIssuer   = selectedIssuer === "All" || c.issuer === selectedIssuer;
    return matchSearch && matchCategory && matchIssuer;
  });

  return (
    <section className="space-y-6">
      <SEOHead
        title="Achievements and Certifications - Muhammad Imran Dev"
        description="Professional certifications and achievements of Muhammad Imran from DigiSkills, freeCodeCamp, Hunarmand Punjab, and Emerson University."
        path="/achievements"
      />
      <div className="space-y-2">
        <SectionHeading title={t.achievements.heading} icon={<PiCertificate />} />
        <SectionSubHeading>
          <p>{t.achievements.sub}</p>
        </SectionSubHeading>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
          {/* Search */}
          <div className="relative flex-1 md:max-w-xs">
            <HiSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search certificates…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
            ))}
          </select>
          {/* Issuer filter */}
          <select
            value={selectedIssuer}
            onChange={(e) => setIssuer(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            {ALL_ISSUERS.map((i) => (
              <option key={i} value={i}>{i === "All" ? "All Issuers" : i}</option>
            ))}
          </select>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Showing {filtered.length} of {CERTIFICATES.length} certificates
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-neutral-400 dark:text-neutral-600">
          <PiCertificate size={48} />
          <p className="mt-4 text-lg">No certificates found</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filtered.map((cert) => (
              <CertCard key={cert.id} cert={cert} onClick={() => setOpenCert(cert)} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Coming Soon Banner */}
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 py-10 px-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400/10 border border-yellow-400/30">
          <PiCertificate size={24} className="text-yellow-500" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">More Certifications on the Way</p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 max-w-xs">
            I'm continuously learning and earning new credentials. Additional certificates will be added here as they are completed.
          </p>
        </div>
        <span className="rounded-full bg-yellow-400/10 border border-yellow-400/30 px-3 py-1 text-[11px] font-medium text-yellow-600 dark:text-yellow-400">
          Stay tuned
        </span>
      </div>

      {/* PDF Modal */}
      {openCert && <CertModal cert={openCert} onClose={() => setOpenCert(null)} />}
    </section>
  );
}
