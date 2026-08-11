import React from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import OptimizedImage from "@/components/ui/OptimizedImage";
import LazyViewport from "@/components/ui/LazyViewport";
import { PERSONAL } from "@/data/personal";
import {
  ArrowRight, Code2, Search, Building2,
  ChevronDown, ChevronUp, Mail, ExternalLink,
  Layers, ShieldCheck, Clock, Globe, Database, LayoutDashboard, Users
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
    q: "Who is Muhammad Imran?",
    a: "Muhammad Imran is a full-stack web developer based in Multan, Pakistan. He specializes in React, Next.js, TypeScript, Node.js, MERN development, Firebase, custom web applications, and technical SEO.",
  },
  {
    q: "Do you build both websites and software?",
    a: "Yes. I build professional business websites as well as custom web applications, dashboards, internal tools, SaaS interfaces, APIs, and database-driven systems.",
  },
  {
    q: "Do you work with clients outside Multan?",
    a: "Yes. I'm based in Multan, Pakistan, but I work remotely with businesses, startups, agencies, and teams across Pakistan and internationally.",
  },
  {
    q: "What technologies do you use?",
    a: "My core technologies include React, Next.js, TypeScript, JavaScript, Node.js, MongoDB, Firebase, Tailwind CSS, REST APIs, and other modern web development tools depending on the project requirements.",
  },
  {
    q: "Can you improve an existing website?",
    a: "Yes. I can work on existing websites to improve performance, mobile usability, technical SEO, functionality, architecture, or specific development issues.",
  },
  {
    q: "Do you build SEO-friendly websites?",
    a: "Yes. SEO considerations can be incorporated during development, including semantic HTML, metadata, structured data, crawlability, internal linking, responsive design, and performance optimization.",
  },
  {
    q: "How do I start a project?",
    a: "Send a brief description of your project through the contact form. I'll review the requirements and respond with initial guidance, questions, and the next steps for discussing the project.",
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
      title: "FreeIndexer — URL & Sitemap Indexing Platform",
      category: "SaaS Web Application",
      description: "FreeIndexer is a web-based SEO utility designed to simplify URL and sitemap submission workflows for website owners and digital marketers. The platform provides an automated interface for submitting URLs through supported indexing protocols and APIs.",
      challenge: "Website owners and SEO professionals often need to manage URL submission and indexing workflows manually across different tools.",
      solution: "I developed a streamlined interface that connects the submission workflow with indexing-related APIs, allowing users to manage URLs more efficiently from a single application.",
      focus: "SaaS development · API integration · SEO tooling · responsive interface",
      outcome: "A practical browser-based platform that replaces repetitive manual submission steps with a structured API-driven workflow.",
      tags: ["React", "TypeScript", "Vite", "IndexNow API"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=75",
      liveUrl: "https://www.freeindexer.online/",
    },
    {
      id: 11,
      title: "GeoTags Metadata Editor — Photo GPS Tool",
      category: "Client-Side Web Application",
      description: "GeoTags Metadata Editor is a browser-based utility for viewing and editing GPS information and EXIF metadata in photos without requiring users to upload their images to a third-party server.",
      challenge: "Users need a simple way to manage photo GPS metadata while keeping their original images private.",
      solution: "I built a client-side processing workflow that allows metadata operations to take place directly in the browser. Interactive mapping functionality helps users work with geographic coordinates while processing remains focused on the user's device.",
      focus: "Privacy-first development · browser APIs · geolocation · image metadata",
      outcome: "A lightweight web utility that lets users work with photo GPS metadata directly in the browser without relying on server-side image processing.",
      tags: ["JavaScript", "EXIF.js", "Leaflet", "OpenStreetMap"],
      image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=600&q=75",
      liveUrl: "https://geotagseditor.online/",
    },
    {
      id: 19,
      title: "Mobile Pet Grooming Tampa",
      category: "Lead Generation Business Website",
      description: "A mobile-first website developed for a local pet grooming business serving customers in Florida.",
      challenge: "Local service businesses need websites that communicate their services quickly, work reliably on mobile devices, and make it easy for potential customers to take the next step.",
      solution: "I developed a responsive Next.js website with clear service information, location-focused content, streamlined calls to action, and a mobile-first interface designed around the customer journey.",
      focus: "Local business websites · mobile UX · lead generation · performance · search visibility",
      outcome: "A focused service website designed to help visitors understand the offering quickly and move naturally toward contacting or booking the business.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=75",
      liveUrl: "https://mobilepetgroomingtampa.lovable.app/",
    },
    {
      id: 8,
      title: "PakBizBranches — Pakistan Business Directory",
      category: "Directory & Data-Driven Web Application",
      description: "PakBizBranches is a Pakistan-focused business directory designed to organize business information across cities, categories, and individual business listings.",
      challenge: "A directory platform needs to handle structured business data, dynamic pages, search-friendly URLs, scalable content generation, and a large number of location and business pages while maintaining a usable experience.",
      solution: "I developed the platform using Next.js, TypeScript, Tailwind CSS, Firebase Firestore, and Firebase Storage, with dynamic business and location-based pages generated from structured data.",
      focus: "Dynamic websites · database-driven pages · local SEO · scalable architecture · structured business data",
      outcome: "A scalable directory platform capable of organizing and presenting business information across multiple locations and categories through dynamically generated pages.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Firestore", "Firebase Storage"],
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=75",
      liveUrl: "https://pakbizbranhces.online/",
    },
  ];

  return (
    <>
      <SEOHead
        title="Muhammad Imran | Full-Stack Web Developer in Multan"
        description="Full-stack web developer in Multan, Pakistan specializing in React, Next.js, MERN, TypeScript and technical SEO. Building fast websites and custom web apps."
        path="/"
        jsonLd={[personSchema, localBusinessSchema, webSiteSchema, homeFaqSchema]}
      />

      <div className="space-y-20 py-6 font-sans">
        {/* ---------------- AI SUMMARY (Hidden visually, readable by crawlers) ---------------- */}
        <div className="sr-only" id="ai-summary">
          Muhammad Imran is a full-stack web developer based in Multan, Pakistan, specializing in React, Next.js, and the MERN stack. He provides custom web application development, technical SEO, and business website solutions for local and international clients.
        </div>

        {/* ---------------- 1. HERO SECTION ---------------- */}
        <header className="relative pt-4 pb-4">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] px-3.5 py-1.5 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <span className="w-2 h-2 rounded-full bg-[#C96A3D] animate-pulse" />
              <span>Full-Stack Web Developer in Multan</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#17211E] dark:text-[#F5F2EC] leading-[1.15]">
              Fast, scalable websites and custom web applications built around your business goals.
            </h1>

            <div className="space-y-4 text-lg sm:text-xl text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed max-w-3xl font-sans">
              <p>
                I'm Muhammad Imran, a full-stack web developer based in Multan, Pakistan. I build business websites, custom web applications, dashboards, and digital tools using React, Next.js, TypeScript, Node.js, and modern web technologies.
              </p>
              <p>
                Whether you need a professional website that generates inquiries, a custom application for your business, or a high-performance web experience, I focus on clean development, responsive design, technical SEO, and long-term maintainability.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C96A3D]" />
              <span className="font-semibold text-[#17211E] dark:text-[#F5F2EC]">Based in Multan · Available across Pakistan &amp; Worldwide</span>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-sm transition-colors duration-200 shadow-xs"
              >
                Start a Project <ArrowRight size={16} />
              </Link>

              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#FFFEFA] dark:bg-[#1B2421] hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-sm border border-[#D9D4CA] dark:border-[#2A3632] transition-colors duration-200"
              >
                View My Work
              </a>
            </div>
          </div>

          {/* Benefit-Focused Expertise Section: What I Build */}
          <div className="mt-12 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 shadow-xs">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#17211E] dark:text-[#F5F2EC] tracking-tight mb-6">
                What I Build
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
                <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                    <Globe size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">Business Websites</h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Professional, responsive websites designed to explain your services clearly, build trust, and turn visitors into calls, messages, and inquiries.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                    <Layers size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">Custom Web Applications</h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Purpose-built web applications for businesses, startups, and teams that need functionality beyond a standard website.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                    <Code2 size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">React &amp; Next.js Development</h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Modern front-end and full-stack development using React, Next.js, TypeScript, and scalable component-based architecture.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                    <Database size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">MERN Stack Development</h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Custom applications using MongoDB, Express, React, and Node.js, including dashboards, APIs, authentication, and business workflows.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                    <Search size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">Technical SEO &amp; Performance</h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    SEO-focused development covering semantic HTML, metadata, structured data, crawlability, Core Web Vitals, mobile performance, and technical improvements.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                    <LayoutDashboard size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">Business Dashboards &amp; Tools</h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Custom dashboards, admin panels, internal tools, calculators, directories, and browser-based utilities built around specific business requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ---------------- 2. TRUST SECTION: WHY WORK WITH ME? ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 shadow-xs">
          <div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#17211E] dark:text-[#F5F2EC] tracking-tight mb-6">
              Why Work With Me?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
              <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">Direct Communication</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  You work directly with the developer building your website or application, so requirements, feedback, and technical decisions stay clear from start to finish.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Code2 size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">Custom Development</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  I build solutions around your requirements rather than forcing your business into a pre-made template or unnecessary functionality.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">Performance-Focused</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  Websites are developed with responsive layouts, efficient code, mobile performance, accessibility, and search visibility in mind.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Search size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">SEO-Aware Development</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  Technical SEO is considered during development, including semantic HTML, metadata, internal linking, structured data, crawlability, and performance.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Globe size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">Local &amp; Remote</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  Based in Multan, Pakistan, I work with local businesses, Pakistani companies, startups, and remote clients internationally.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">Practical Solutions</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  The goal isn't to add technology for its own sake. I focus on building useful systems that solve a real business or operational problem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- 3. SELECTED PROJECTS & CASE STUDIES (ID="WORK") ---------------- */}
        <section id="work" className="space-y-8 scroll-mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-3 max-w-3xl">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">Selected Portfolio</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Selected Projects &amp; Case Studies
              </h2>
              <div className="space-y-2 text-sm sm:text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed font-sans">
                <p>
                  Real projects demonstrate more than a list of technologies. Each project below represents a specific problem, development challenge, and practical solution.
                </p>
                <p>
                  I build websites, web applications, digital tools, dashboards, and business systems using modern technologies such as React, Next.js, TypeScript, Node.js, Firebase, and REST APIs.
                </p>
                <p>
                  Explore selected projects to see what was built, which technologies were used, and how development decisions were made around performance, usability, scalability, SEO, and business requirements.
                </p>
              </div>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-mono text-[#C96A3D] hover:underline shrink-0"
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-4 font-sans">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#F5F2EC] dark:bg-[#121917] text-[#C96A3D] border border-[#D9D4CA]/80 dark:border-[#2A3632] font-semibold">
                        {study.category}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                      {study.title}
                    </h3>

                    <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                      {study.description}
                    </p>

                    <div className="space-y-3 pt-1">
                      <div className="p-3.5 rounded-lg bg-[#F5F2EC]/80 dark:bg-[#121917]/80 border-l-2 border-[#5C655F] space-y-1">
                        <p className="text-xs font-mono uppercase text-[#5C655F] dark:text-[#9DA6A0] font-semibold">The challenge</p>
                        <p className="text-xs text-[#17211E] dark:text-[#F5F2EC] leading-relaxed">{study.challenge}</p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-[#F5F2EC]/80 dark:bg-[#121917]/80 border-l-2 border-[#C96A3D] space-y-1">
                        <p className="text-xs font-mono uppercase text-[#C96A3D] font-semibold">The solution</p>
                        <p className="text-xs text-[#17211E] dark:text-[#F5F2EC] leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    <div className="pt-2 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
                      <span className="font-semibold text-[#17211E] dark:text-[#F5F2EC]">Technology: </span>
                      {study.tags.join(" · ")}
                    </div>

                    <div className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
                      <span className="font-semibold text-[#17211E] dark:text-[#F5F2EC]">Focus: </span>
                      {study.focus}
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#C96A3D]/10 border border-[#C96A3D]/20 space-y-1">
                      <p className="text-xs font-mono uppercase text-[#C96A3D] font-bold">Outcome</p>
                      <p className="text-xs text-[#17211E] dark:text-[#F5F2EC] font-medium leading-relaxed">{study.outcome}</p>
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
                        width={600}
                        height={360}
                        fetchPriority="low"
                        loading="lazy"
                        className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- 4. SERVICES: WEB & SOFTWARE DEVELOPMENT SERVICES ---------------- */}
        <LazyViewport fallbackHeight="300px">
          <section className="space-y-8 pt-4" aria-labelledby="services-heading">
            <div className="space-y-3 max-w-3xl">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">Services &amp; Solutions</p>
              <h2 id="services-heading" className="font-heading text-3xl sm:text-4xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Web &amp; Software Development Services
              </h2>
              <p className="text-sm sm:text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed font-sans">
                I build digital solutions around the actual requirements of your business, from professional websites and landing pages to custom web applications, dashboards, APIs, and internal business systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C96A3D]/10 flex items-center justify-center text-[#C96A3D]">
                    <Globe size={22} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                    Business Website Development
                  </h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Professional websites for businesses that need a fast, responsive, trustworthy online presence. I build service websites, company websites, landing pages, local business websites, and custom marketing sites with clear navigation, mobile-friendly layouts, strong calls to action, and SEO-ready technical foundations.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C96A3D]/10 flex items-center justify-center text-[#C96A3D]">
                    <Layers size={22} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                    Custom Web Application Development
                  </h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Web applications designed around workflows that standard websites cannot handle. I develop custom platforms, customer portals, management systems, SaaS interfaces, internal tools, and data-driven applications using modern full-stack technologies.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C96A3D]/10 flex items-center justify-center text-[#C96A3D]">
                    <Code2 size={22} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                    React &amp; Next.js Development
                  </h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Modern React and Next.js development for fast, maintainable, and scalable web experiences. Projects can include responsive interfaces, dynamic applications, server-rendered pages, API integrations, authentication workflows, dashboards, and SEO-focused implementations.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C96A3D]/10 flex items-center justify-center text-[#C96A3D]">
                    <Database size={22} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                    MERN Stack Development
                  </h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Full-stack applications built with MongoDB, Express.js, React, and Node.js. I can develop custom APIs, authentication systems, dashboards, database-driven applications, admin panels, and business workflows around your requirements.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C96A3D]/10 flex items-center justify-center text-[#C96A3D]">
                    <LayoutDashboard size={22} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                    Business Dashboards &amp; Internal Tools
                  </h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Custom dashboards that turn business data and repetitive workflows into practical digital systems. I build admin panels, reporting interfaces, management dashboards, customer portals, calculators, directories, and internal tools.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C96A3D]/10 flex items-center justify-center text-[#C96A3D]">
                    <Search size={22} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                    Technical SEO &amp; Website Performance
                  </h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Technical improvements that help search engines understand your website while creating a faster experience for users. Services include technical SEO audits, metadata, semantic HTML, structured data, crawlability, internal linking, Core Web Vitals, mobile performance, and development-level SEO fixes.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </LazyViewport>

        {/* ---------------- 5. WHO I WORK WITH ---------------- */}
        <LazyViewport fallbackHeight="250px">
          <section className="space-y-8 pt-4">
            <div className="space-y-2 max-w-3xl">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">Client Types</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Who I Work With
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Building2 size={20} />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">Local Businesses</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  Shops, clinics, service providers, professionals, restaurants, and other businesses that need a trustworthy website and a stronger online presence.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Code2 size={20} />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">Startups &amp; Founders</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  Founders who need an MVP, SaaS interface, customer portal, or custom web application to turn an idea into a working product.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">Established Businesses</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  Companies that need to replace outdated websites, automate manual workflows, improve performance, or build custom internal tools.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Users size={20} />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">Agencies &amp; Remote Teams</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  Teams looking for additional development capacity for React, Next.js, MERN, frontend, full-stack, or technical SEO projects.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3 sm:col-span-2 lg:col-span-1">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Globe size={20} />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">International Clients</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  Although I'm based in Multan, Pakistan, I work remotely with businesses and teams in other countries through online communication and project-based collaboration.
                </p>
              </div>
            </div>
          </section>
        </LazyViewport>

        {/* ---------------- 6. PROCESS: A CLEAR DEVELOPMENT PROCESS ---------------- */}
        <LazyViewport fallbackHeight="250px">
          <section className="space-y-8 pt-4">
            <div className="space-y-2 max-w-3xl">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">Work Approach</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                A Clear Development Process
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#C96A3D]/15 text-[#C96A3D]">
                  01 — Discuss
                </span>
                <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">Discuss</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  We start by understanding your business, users, requirements, existing website or application, and the problem you want to solve.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#C96A3D]/15 text-[#C96A3D]">
                  02 — Plan
                </span>
                <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">Plan</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  I define the project scope, recommended technology, core functionality, deliverables, timeline, and development priorities before work begins.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#C96A3D]/15 text-[#C96A3D]">
                  03 — Build
                </span>
                <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">Build</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  Development starts with regular progress updates and working previews. The goal is clean, maintainable code rather than unnecessary complexity.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#C96A3D]/15 text-[#C96A3D]">
                  04 — Test &amp; Optimize
                </span>
                <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">Test &amp; Optimize</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  Before launch, the project is reviewed across responsive layouts, functionality, performance, accessibility, and technical SEO requirements where applicable.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#C96A3D]/15 text-[#C96A3D]">
                  05 — Launch
                </span>
                <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">Launch</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  I handle the final deployment and help make sure the website or application is ready for real users.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#C96A3D]/15 text-[#C96A3D]">
                  06 — Support
                </span>
                <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">Support</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  After launch, I remain available for fixes, improvements, maintenance, and future development based on the project's needs.
                </p>
              </div>
            </div>
          </section>
        </LazyViewport>

        {/* ---------------- 7. FAQ ACCORDION ---------------- */}
        <LazyViewport fallbackHeight="250px">
          <section className="space-y-6 pt-4">
            <div className="space-y-2 max-w-3xl">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">Questions Answered</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
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
        </LazyViewport>

        {/* ---------------- 8. FINAL CTA ---------------- */}
        <LazyViewport fallbackHeight="200px">
          <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-8 sm:p-10 space-y-6">
            <div className="max-w-3xl space-y-3 font-sans">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">Get In Touch</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Have a Website or Software Project in Mind?
              </h2>
              <p className="text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Whether you need a business website, custom web application, dashboard, SaaS interface, or technical improvement to an existing project, let's discuss what you are trying to build.
              </p>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Send a brief description of your requirements, your current website or application if you have one, and what you want to improve. I'll review the project and get back to you with practical next steps.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-sm transition-colors shadow-xs"
              >
                Start a Project <ArrowRight size={16} />
              </Link>

              <a
                href={`mailto:${PERSONAL.email}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA] dark:border-[#2A3632] font-mono text-sm hover:border-[#C96A3D] transition-colors"
              >
                <Mail size={16} /> {PERSONAL.email}
              </a>
            </div>

            <div className="pt-4 border-t border-[#D9D4CA]/50 dark:border-[#2A3632] font-mono text-xs font-semibold text-[#17211E] dark:text-[#F5F2EC]">
              Based in Multan, Pakistan · Available for Remote Projects Worldwide
            </div>
          </section>
        </LazyViewport>
      </div>
    </>
  );
}
