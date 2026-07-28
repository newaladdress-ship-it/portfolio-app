import React from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { PERSONAL } from "@/data/personal";
import {
  ArrowRight, Code2, Search, Building2,
  ChevronDown, ChevronUp, Mail, ExternalLink,
  Layers, ShieldCheck, Clock, Globe
} from "lucide-react";

const BASE_URL = "https://www.imrandigitals.online";
const OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

/* ---------------- JSON-LD structured data ---------------- */

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Imran",
  jobTitle: "Web Developer & Full-Stack Specialist",
  url: BASE_URL,
  image: OG_IMAGE,
  telephone: PERSONAL.phone,
  email: PERSONAL.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Multan",
    addressRegion: "Punjab",
    postalCode: "60060",
    addressCountry: "PK",
    streetAddress: PERSONAL.address,
  },
  knowsAbout: [
    "React", "Next.js", "Node.js", "Express", "MongoDB", "MERN Stack",
    "JavaScript", "TypeScript", "Web Development", "Technical SEO",
  ],
  sameAs: [PERSONAL.github, PERSONAL.linkedin],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Imran Digitals - Web Developer Multan",
  description:
    "Muhammad Imran is a full stack web developer in Multan with 2+ years of experience building fast, reliable websites and MERN stack web apps for businesses and startups.",
  url: BASE_URL,
  telephone: PERSONAL.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Multan",
    addressRegion: "Punjab",
    postalCode: "60060",
    addressCountry: "PK",
    streetAddress: PERSONAL.address,
  },
  areaServed: ["Multan", "Lahore", "Islamabad", "Pakistan", "Worldwide"],
  serviceType: [
    "Website Development", "MERN Stack Web Applications",
    "Next.js Development", "Technical SEO", "Chrome Extensions",
  ],
  priceRange: "$$",
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Imran Digitals",
  url: BASE_URL,
};

const FAQ_ITEMS = [
  {
    q: "Who is the best web developer in Multan for small businesses?",
    a: "That depends on your budget and project scope. I offer a direct, high-quality development service with 2+ years of full-stack experience, combining custom web app development and technical SEO without agency bloat.",
  },
  {
    q: "How long does it take to build a website?",
    a: "A standard business website typically takes 1–2 weeks. Custom MERN stack or Next.js web applications take longer depending on features, with a clear timeline provided upfront.",
  },
  {
    q: "Do you build websites for clients outside Multan or Pakistan?",
    a: "Yes. While I am based in Multan, I work remotely with clients across Pakistan and internationally via WhatsApp, email, or video calls.",
  },
  {
    q: "Do you specialize in custom code or template builders?",
    a: "I specialize in custom-coded React, Next.js, and MERN stack solutions for superior load speed, clean security, and long-term scalability.",
  },
];

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function HomePage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const selectedCaseStudies = [
    {
      id: 18,
      title: "FreeIndexer Platform",
      category: "SaaS Web Application",
      description: "An automated URL and sitemap indexer utilizing IndexNow protocols and search engine APIs to streamline crawling for webmasters and digital marketers.",
      outcome: "Instant API-driven submission workflow replacing manual Google Search Console indexing.",
      tags: ["React", "TypeScript", "Vite", "IndexNow API"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=480&fit=crop",
      liveUrl: "https://www.freeindexer.online/",
    },
    {
      id: 19,
      title: "Mobile Pet Grooming Tampa",
      category: "Lead Generation Business Site",
      description: "A high-conversion service platform for a mobile pet grooming business in Florida, built on Next.js with fast mobile response and area lookup tools.",
      outcome: "Clean mobile-first UX with streamlined booking conversion pathways.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=480&fit=crop",
      liveUrl: "https://mobilepetgroomingtampa.lovable.app/",
    },
    {
      id: 11,
      title: "GeoTags Metadata Editor",
      category: "Client-Side Browser Utility",
      description: "A privacy-focused browser tool for editing photo GPS geotags and EXIF metadata without uploading files to third-party servers.",
      outcome: "Zero server lag metadata processing executed entirely client-side.",
      tags: ["JavaScript", "EXIF.js", "OpenStreetMap", "Leaflet"],
      image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=800&h=480&fit=crop",
      liveUrl: "https://geotagseditor.online/",
    },
  ];

  return (
    <>
      <SEOHead
        title="Muhammad Imran | Web Developer & SEO Specialist in Multan"
        description="Full-stack web developer in Multan, Pakistan. I build fast business websites, custom React/Next.js apps, and technical SEO solutions for global clients."
        path="/"
        jsonLd={[personJsonLd, localBusinessJsonLd]}
      />

      <div className="space-y-20 py-6 font-sans">
        {/* ---------------- 1. HERO SECTION ---------------- */}
        <section className="relative pt-4 pb-4">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] px-3.5 py-1.5 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <span className="w-2 h-2 rounded-full bg-[#C96A3D] animate-pulse" />
              <span>Full-Stack Web Developer · 2+ Years Experience</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#17211E] dark:text-[#F5F2EC] leading-[1.15]">
              Websites and digital systems that make your business easier to trust.
            </h1>

            <p className="text-lg sm:text-xl text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed max-w-3xl font-sans">
              I build fast, custom web applications and business websites for local clients in **Multan** and remote businesses worldwide. As a leading **web developer in Multan**, I specialize in React, Next.js, and **MERN stack development** with a focus on clear communication and measurable performance.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-sm transition-colors duration-200 shadow-xs"
              >
                Start a project <ArrowRight size={16} />
              </Link>

              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#FFFEFA] dark:bg-[#1B2421] hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-sm border border-[#D9D4CA] dark:border-[#2A3632] transition-colors duration-200"
              >
                View selected work
              </a>
            </div>
          </div>

          {/* Refined Project Interface Visual Frame */}
          <div className="mt-10 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-4 sm:p-6 shadow-xs overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#D9D4CA]/60 dark:border-[#2A3632]/60 font-mono text-xs text-[#5C655F] dark:text-[#9DA6A0]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#D9D4CA] dark:bg-[#2A3632]" />
                <span className="w-3 h-3 rounded-full bg-[#D9D4CA] dark:bg-[#2A3632]" />
                <span className="w-3 h-3 rounded-full bg-[#D9D4CA] dark:bg-[#2A3632]" />
                <span className="ml-2 hidden sm:inline">imran-studio // active-architecture</span>
              </div>
              <span className="text-[#C96A3D] font-medium">Status: Available for Q3 Projects</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 font-sans">
              <div className="p-4 rounded-lg bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-[#5C655F] dark:text-[#9DA6A0]">Architecture</p>
                <p className="font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC]">React & Next.js Systems</p>
                <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0]">Server-side rendering, optimized bundles, zero runtime bloat.</p>
              </div>

              <div className="p-4 rounded-lg bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-[#5C655F] dark:text-[#9DA6A0]">Search Visibility</p>
                <p className="font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC]">Technical SEO & Speed</p>
                <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0]">Clean semantic HTML, schema markup & Core Web Vitals standard.</p>
              </div>

              <div className="p-4 rounded-lg bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-[#5C655F] dark:text-[#9DA6A0]">Full-Stack Data</p>
                <p className="font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC]">MERN & REST Workflows</p>
                <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0]">Node.js backend pipelines, MongoDB storage & API integration.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- 2. PROOF STRIP ---------------- */}
        <section className="border-y border-[#D9D4CA] dark:border-[#2A3632] py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#C96A3D] shrink-0 mt-1" />
              <div>
                <p className="font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC] text-sm">2+ Years Active Experience</p>
                <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0] mt-0.5">Shipping full-stack web applications & business sites with 24h response time.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#C96A3D] shrink-0 mt-1" />
              <div>
                <p className="font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC] text-sm">Custom Code Quality</p>
                <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0] mt-0.5">No fragile template bloat. React, Next.js, and clean maintainable structure.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-[#C96A3D] shrink-0 mt-1" />
              <div>
                <p className="font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC] text-sm">Multan + Remote Ready</p>
                <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0] mt-0.5">Serving local companies in Multan and international remote clients.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- 3. SELECTED WORK (ID="WORK") ---------------- */}
        <section id="work" className="space-y-8 scroll-mt-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">Selected Portfolio</p>
              <h2 className="font-heading text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Recent Web Development Projects & Case Studies
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-mono text-[#C96A3D] hover:underline"
            >
              Browse all projects <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-8">
            {selectedCaseStudies.map((study) => (
              <article
                key={study.id}
                className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-6 shadow-xs hover:border-[#C96A3D]/60 transition-colors duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#F5F2EC] dark:bg-[#121917] text-[#5C655F] dark:text-[#9DA6A0] border border-[#D9D4CA]/80 dark:border-[#2A3632]">
                        {study.category}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                      {study.title}
                    </h3>

                    <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                      {study.description}
                    </p>

                    <div className="p-3.5 rounded-lg bg-[#F5F2EC] dark:bg-[#121917] border-l-2 border-[#C96A3D] space-y-1">
                      <p className="text-xs font-mono uppercase text-[#C96A3D] font-semibold">Outcome Delivered</p>
                      <p className="text-xs font-sans text-[#17211E] dark:text-[#F5F2EC] font-medium">{study.outcome}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {study.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-mono text-[#5C655F] dark:text-[#9DA6A0]">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {study.liveUrl && (
                      <div className="pt-2">
                        <a
                          href={study.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#17211E] dark:text-[#F5F2EC] hover:text-[#C96A3D] transition-colors"
                        >
                          Visit Live Project <ExternalLink size={13} />
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-5">
                    <div className="relative rounded-xl overflow-hidden border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC] dark:bg-[#121917]">
                        <OptimizedImage
                        src={study.image}
                        alt={`${study.title} screenshot`}
                        width={800}
                        height={480}
                        fetchpriority={index === 0 ? "high" : "auto"}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- 4. WHAT YOU CAN HIRE ME FOR ---------------- */}
        <section className="space-y-8 pt-4">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">Capabilities & Services</p>
            <h2 className="font-heading text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              What You Can Hire Me For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#C96A3D]/10 flex items-center justify-center text-[#C96A3D]">
                  <Building2 size={22} />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                  Business Websites That Generate Leads
                </h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  For shops, clinics, service providers, and local companies in Multan and across Pakistan. Sites built to turn visitors into phone calls and WhatsApp inquiries.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] space-y-1.5 pt-4 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]">
                <li>✓ Fast Mobile Load Speeds</li>
                <li>✓ Local SEO & Schema Ready</li>
                <li>✓ Clear Call-To-Action Pathways</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#C96A3D]/10 flex items-center justify-center text-[#C96A3D]">
                  <Layers size={22} />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                  Custom Web Applications & Dashboards
                </h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  Full custom web applications built on React, Next.js, Node, and MongoDB. Bespoke admin portals, customer portals, and internal management platforms.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] space-y-1.5 pt-4 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]">
                <li>✓ MERN Stack & Next.js 14+</li>
                <li>✓ Secure REST API Integrations</li>
                <li>✓ Custom Admin & User Workflows</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#C96A3D]/10 flex items-center justify-center text-[#C96A3D]">
                  <Search size={22} />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                  SEO, Performance & AI Automation
                </h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  Core Web Vitals auditing, technical SEO code fixes, site speed rebuilding, and practical AI feature integration for business productivity.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] space-y-1.5 pt-4 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]">
                <li>✓ Technical SEO & Indexing</li>
                <li>✓ Performance & Speed Rebuilds</li>
                <li>✓ Pragmatic AI & Utility Features</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------- 5. HOW WORKING TOGETHER FEELS ---------------- */}
        <section className="space-y-8 pt-4">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">Simple Process</p>
            <h2 className="font-heading text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              How Working Together Feels
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3">
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#C96A3D]/15 text-[#C96A3D]">
                01 // Clarify
              </span>
              <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">Discovery & Requirements</h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                We review your business goals, outline clear deliverable scope, fixed pricing, and realistic timelines upfront. No unexpected costs or scope creep.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3">
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#C96A3D]/15 text-[#C96A3D]">
                02 // Build
              </span>
              <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">Clean Code Architecture</h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I develop the website or application using modern React/Next.js stack, providing status updates along the way with regular preview links.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3">
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#C96A3D]/15 text-[#C96A3D]">
                03 // Improve
              </span>
              <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">Launch & Support</h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Final testing, SEO configuration, domain deployment, and post-launch support to ensure your product runs smoothly without maintenance headaches.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- 6. ABOUT ME SNAPSHOT ---------------- */}
        <section className="rounded-2xl bg-[#17211E] text-[#F7F3EC] p-8 sm:p-10 space-y-6 border border-[#2A3632]">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">About Muhammad Imran</span>
            <h2 className="font-heading text-3xl font-bold text-[#F7F3EC]">
              Developer Discipline with Direct Communication
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#9DA6A0] leading-relaxed">
              With 2+ years of hands-on experience in full-stack web development and technical SEO based in Multan, I combine engineering discipline with transparent communication. You work directly with the developer building your site — ensuring your requirements are built right the first time.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#F7F3EC]/80">
            <span>• Full Stack (MERN & Next.js)</span>
            <span>• Multan, Pakistan</span>
            <span>• Available for Freelance & Remote Contracts</span>
          </div>
        </section>

        {/* ---------------- 7. FAQ ACCORDION ---------------- */}
        <section className="space-y-6 pt-4">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">Questions Answered</p>
            <h2 className="font-heading text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 font-sans">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC] flex items-center justify-between gap-4 text-base"
                  >
                    <span>{item.q}</span>
                    {isOpen ? <ChevronUp size={18} className="text-[#C96A3D] shrink-0" /> : <ChevronDown size={18} className="text-[#5C655F] shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed border-t border-[#D9D4CA]/40 dark:border-[#2A3632]/40 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------- 8. CONTACT & INQUIRY ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-8 sm:p-10 space-y-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">Get In Touch</p>
            <h2 className="font-heading text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Ready to Discuss Your Project?
            </h2>
            <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              Send a quick message about your website or app requirements. I respond within 24 hours with project advice and transparent quote estimation.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-sm transition-colors"
            >
              Go to Contact Form <ArrowRight size={16} />
            </Link>

            <a
              href={`mailto:${PERSONAL.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA] dark:border-[#2A3632] font-mono text-sm hover:border-[#C96A3D] transition-colors"
            >
              <Mail size={16} /> {PERSONAL.email}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
