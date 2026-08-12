import React from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import OptimizedImage from "@/components/ui/OptimizedImage";
import LazyViewport from "@/components/ui/LazyViewport";
import { PERSONAL } from "@/data/personal";
import {
  ArrowRight, Code2, Search, Building2,
  ChevronDown, ChevronUp, Mail, ExternalLink,
  Layers, ShieldCheck, Clock, Globe, Database, LayoutDashboard, Users,
  Sparkles, Cpu, Bot, CheckCircle2, Wrench
} from "lucide-react";

const BASE_URL = "https://www.imrandigitals.online";
const OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

/* ---------------- JSON-LD structured data ---------------- */

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Imran",
  jobTitle: "Full-Stack & AI Developer",
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
    "JavaScript", "TypeScript", "Web Development", "AI Solutions", "Technical SEO",
  ],
  sameAs: [PERSONAL.github, PERSONAL.linkedin],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Imran Digitals - Web Developer Multan",
  description:
    "Muhammad Imran is a full stack web developer and AI developer in Multan with experience building fast, reliable websites, custom web apps, and AI solutions for businesses and startups.",
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
    "Next.js Development", "AI Solutions & Integrations", "Technical SEO", "Chrome Extensions",
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
    a: "Muhammad Imran is a full-stack web developer and AI developer based in Multan, Pakistan. He specializes in MERN stack development, React, Next.js, custom web applications, software development, technical SEO, and practical AI-powered solutions.",
  },
  {
    q: "Do you build both websites and software?",
    a: "Yes. I build business websites as well as custom web applications, dashboards, internal tools, SaaS interfaces, APIs, and software systems based on specific business requirements.",
  },
  {
    q: "Do you build AI applications?",
    a: "Yes. I build and integrate practical AI features into websites and software, including AI assistants, conversational interfaces, AI-powered workflows, automation, and custom AI integrations.",
  },
  {
    q: "Do you use AI coding tools?",
    a: "Yes. I use modern AI-assisted development tools such as Cursor, Claude, Claude Code, Codex, GitHub Copilot, Replit, v0, Google AI Studio, and Antigravity as part of my development workflow.",
  },
  {
    q: "Do you work with clients outside Multan?",
    a: "Yes. Although I'm based in Multan, Pakistan, I work remotely with businesses, startups, agencies, and teams in Pakistan and internationally.",
  },
  {
    q: "What technologies do you use?",
    a: "My primary development technologies include React, Next.js, TypeScript, Node.js, MongoDB, Express.js, Firebase, REST APIs, and modern AI technologies and development tools.",
  },
  {
    q: "Can you improve an existing website?",
    a: "Yes. I can work on existing websites and applications to improve performance, technical SEO, user experience, functionality, maintainability, or add new features including AI-powered functionality.",
  },
  {
    q: "How do I start a project?",
    a: "Send a brief description of what you want to build or improve through the contact form. I'll review your requirements and respond with practical next steps.",
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
      id: 99,
      title: "SmartTalk AI — Interactive AI Portfolio Assistant",
      category: "Interactive AI Portfolio Assistant",
      description: "SmartTalk AI is an AI-powered assistant built into the Imran Digitals portfolio to help visitors explore Muhammad Imran's projects, technical skills, services, experience, and development capabilities through a conversational interface.",
      challenge: "A traditional portfolio requires visitors to navigate through multiple pages to find specific information about a developer's skills, projects, and services.",
      solution: "I developed an interactive AI assistant that provides a conversational way to explore portfolio information and helps visitors understand relevant services or discuss what they want to build.",
      focus: "AI application development · conversational interfaces · AI integration · user experience",
      outcome: "An interactive AI-powered portfolio experience that allows visitors to explore professional information and development capabilities through natural-language conversation.",
      tags: ["Gemini AI", "React", "TypeScript", "AI API Integration"],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=75",
      liveUrl: "/smarttalk",
      isInternalLink: true,
      buttonText: "Visit SmartTalk AI",
    },
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
      solution: "I developed a client-side EXIF manipulation tool using JavaScript that reads and modifies image geolocation tags directly inside the browser.",
      focus: "Client-side processing · EXIF metadata manipulation · Map interface · privacy-focused workflow",
      outcome: "A fast utility allowing users to fix or customize image metadata cleanly without server uploads.",
      tags: ["JavaScript", "EXIF.js", "Leaflet Maps", "HTML5"],
      image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=75",
      liveUrl: "https://geotags.online/",
    },
    {
      id: 16,
      title: "PakBiz Branches — Business Directory Directory Platform",
      category: "Multi-Directory Business Portal",
      description: "PakBiz Branches is a structured business directory platform built to organize company listings, regional branches, and service locations across Pakistan.",
      challenge: "Businesses and consumers required an accessible repository for localized company contact details.",
      solution: "Engineered a performant Next.js & Firebase platform with instant search filters, structured data implementation, and administrative entry validation.",
      focus: "Full-stack architecture · Firestore optimization · SEO structured data · responsive portal",
      outcome: "A search-engine optimized directory system serving fast page loads and clear navigation across devices.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Firestore", "Firebase Storage"],
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=75",
      liveUrl: "https://pakbizbranhces.online/",
    },
  ];

  const aiUsageList = [
    "Rapid application prototyping",
    "Code generation and refactoring",
    "Debugging and troubleshooting",
    "UI and component development",
    "API and integration work",
    "Technical research",
    "Documentation",
    "Testing and iteration",
    "AI feature development",
    "Workflow automation",
  ];

  return (
    <>
      <SEOHead
        title="Muhammad Imran | Full-Stack & AI Developer in Multan"
        description="Full-stack and AI developer in Multan, Pakistan specializing in MERN, React, Next.js, custom web apps, AI solutions, and technical SEO."
        path="/"
        jsonLd={[personSchema, localBusinessSchema, webSiteSchema, homeFaqSchema]}
      />

      <div className="space-y-20 py-6 font-sans">
        {/* ---------------- AI SUMMARY (Hidden visually, readable by crawlers) ---------------- */}
        <div className="sr-only" id="ai-summary">
          Muhammad Imran is a full-stack web developer and AI developer based in Multan, Pakistan, specializing in React, Next.js, MERN stack, and AI solutions. He provides custom web application development, software, AI tools, technical SEO, and business website solutions for local and international clients.
        </div>

        {/* ---------------- 1. HERO SECTION ---------------- */}
        <header className="relative pt-4 pb-4">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] px-3.5 py-1.5 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <span className="w-2 h-2 rounded-full bg-[#C96A3D] animate-pulse" />
              <span>Full-Stack Web Developer &amp; AI Developer in Multan</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#17211E] dark:text-[#F5F2EC] leading-[1.15]">
              Fast, scalable websites, custom web applications, software, and AI-powered digital solutions built around your business goals.
            </h1>

            <div className="space-y-4 text-lg sm:text-xl text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed max-w-3xl font-sans">
              <p>
                I'm Muhammad Imran, a full-stack web developer and AI developer based in Multan, Pakistan. I build business websites, custom web applications, dashboards, software systems, digital tools, and AI-powered solutions using React, Next.js, TypeScript, Node.js, MongoDB, and modern AI technologies.
              </p>
              <p>
                Whether you need a professional website, a custom business application, a MERN stack solution, or an AI-powered feature or application, I focus on practical development, responsive design, technical SEO, performance, and long-term maintainability.
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
                <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                    <Globe size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">Business Websites</h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Professional, responsive websites designed to explain your services clearly, build trust, generate inquiries, and provide a strong foundation for search visibility.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                    <Layers size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">Custom Web Applications</h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Purpose-built web applications for businesses, startups, and teams that need functionality beyond a standard website, including portals, SaaS interfaces, workflows, and data-driven systems.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">AI-Powered Websites &amp; Applications</h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    AI-powered websites and web applications that use modern AI technologies to provide intelligent assistants, automation, content workflows, search, recommendations, and other practical business features.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                    <Code2 size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">React &amp; Next.js Development</h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Modern front-end and full-stack development using React, Next.js, TypeScript, and scalable component-based architecture for fast and maintainable digital products.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                    <Database size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">MERN Stack Development</h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Custom applications using MongoDB, Express.js, React, and Node.js, including dashboards, APIs, authentication, database-driven systems, and business workflows.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">AI Integration &amp; Custom AI Solutions</h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    Practical AI integrations for websites, software, and business systems, including custom AI assistants, AI-powered workflows, API integrations, and AI features built around specific business requirements.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                    <Search size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">Technical SEO &amp; Performance</h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    SEO-focused development covering semantic HTML, metadata, structured data, crawlability, Core Web Vitals, mobile performance, internal linking, and development-level technical improvements.
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
                  You work directly with the developer building your website, application, or digital system, so requirements, feedback, and technical decisions stay clear from start to finish.
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
                  <Sparkles size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">AI-Assisted &amp; AI-Powered Development</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  I use modern AI development tools and AI technologies alongside traditional software engineering to prototype, develop, debug, automate, and improve digital products. AI is used where it provides practical value—not simply because it is available.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">Performance-Focused</h3>
                <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                  Websites and applications are developed with responsive layouts, efficient code, mobile performance, accessibility, and search visibility in mind.
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

              <div className="p-5 rounded-xl bg-[#F5F2EC]/70 dark:bg-[#121917]/70 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 space-y-2.5 sm:col-span-2 lg:col-span-1">
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
                  I build websites, web applications, digital tools, dashboards, AI assistants, and business systems using modern technologies such as React, Next.js, TypeScript, Node.js, Firebase, REST APIs, and Gemini AI.
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
                        {study.isInternalLink ? (
                          <Link
                            href={study.liveUrl}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] text-white text-xs font-mono font-medium transition-colors"
                          >
                            {study.buttonText || "Visit Project"} <ArrowRight size={13} />
                          </Link>
                        ) : (
                          <a
                            href={study.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#17211E] dark:text-[#F5F2EC] hover:text-[#C96A3D] transition-colors"
                          >
                            Visit Live Project <ExternalLink size={13} />
                          </a>
                        )}
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

        {/* ---------------- 4. SERVICES: WEB, SOFTWARE & AI DEVELOPMENT SERVICES ---------------- */}
        <LazyViewport fallbackHeight="300px">
          <section className="space-y-8 pt-4" aria-labelledby="services-heading">
            <div className="space-y-3 max-w-3xl">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">Services &amp; Solutions</p>
              <h2 id="services-heading" className="font-heading text-3xl sm:text-4xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Web, Software &amp; AI Development Services
              </h2>
              <p className="text-sm sm:text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed font-sans">
                I build digital solutions around the actual requirements of your business, from professional websites and landing pages to custom web applications, software systems, dashboards, APIs, AI-powered applications, and internal business tools. My development work combines full-stack engineering with practical AI integration where it can improve a product, automate a workflow, or create a better user experience.
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

              <div className="p-6 rounded-2xl border border-[#C96A3D]/40 dark:border-[#C96A3D]/40 bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3 flex flex-col justify-between shadow-xs">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C96A3D]/15 flex items-center justify-center text-[#C96A3D]">
                    <Bot size={22} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                    AI Development &amp; Custom AI Solutions
                  </h3>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                    AI-powered features and applications designed around real business requirements. I can integrate AI into websites and software, build conversational assistants, connect applications with AI APIs, and develop practical AI workflows and automation. Projects can include AI assistants, AI-powered web applications, intelligent search, content workflows, business automation, and custom AI features integrated into existing software.
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

              <div className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-3 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
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

        {/* ---------------- 5. AI-ASSISTED DEVELOPMENT SECTION ---------------- */}
        <LazyViewport fallbackHeight="300px">
          <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-8 shadow-xs">
            <div className="space-y-4 max-w-3xl">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">AI-Assisted Development</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Modern AI Tools, Combined With Real Software Engineering
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed font-sans">
                <p>
                  I use modern AI development tools to accelerate research, prototyping, coding, debugging, testing, documentation, and iteration while keeping engineering decisions and code quality under human control.
                </p>
                <p>
                  My AI-assisted development workflow includes tools and platforms such as <strong className="text-[#17211E] dark:text-[#F5F2EC]">Cursor, Claude, Claude Code, Codex, GitHub Copilot, Replit, v0, Google AI Studio, and Antigravity</strong>, alongside standard development tools and workflows.
                </p>
                <p>
                  These tools help me move faster, experiment with ideas, and solve development problems more efficiently—but they complement software engineering rather than replace it.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                What I Use AI For
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-sans">
                {aiUsageList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F5F2EC]/80 dark:bg-[#121917]/80 border border-[#D9D4CA]/50 dark:border-[#2A3632]/50 text-sm text-[#17211E] dark:text-[#F5F2EC]"
                  >
                    <CheckCircle2 size={18} className="text-[#C96A3D] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#C96A3D]/10 border border-[#C96A3D]/25 font-mono text-xs sm:text-sm font-semibold text-[#17211E] dark:text-[#F5F2EC] flex items-center gap-3">
              <Sparkles size={20} className="text-[#C96A3D] shrink-0 animate-pulse" />
              <span>The goal is not simply to code faster. The goal is to build better software efficiently.</span>
            </div>
          </section>
        </LazyViewport>

        {/* ---------------- 6. WHO I WORK WITH ---------------- */}
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

        {/* ---------------- 7. PROCESS: A CLEAR DEVELOPMENT PROCESS ---------------- */}
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

        {/* ---------------- 8. FAQ ACCORDION ---------------- */}
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

        {/* ---------------- 9. FINAL CTA ---------------- */}
        <LazyViewport fallbackHeight="200px">
          <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-8 sm:p-10 space-y-6">
            <div className="max-w-3xl space-y-3 font-sans">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C96A3D]">Get In Touch</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Have a Website, Software or AI Project in Mind?
              </h2>
              <p className="text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Whether you need a business website, custom web application, dashboard, SaaS interface, AI-powered application, or technical improvement to an existing project, let's discuss what you're trying to build.
              </p>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Send a brief description of your requirements, your current website or application if you have one, and the outcome you want to achieve. I'll review the project and get back to you with practical next steps.
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
                href="mailto:muhammadimrandigitals@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA] dark:border-[#2A3632] font-mono text-sm hover:border-[#C96A3D] transition-colors"
              >
                <Mail size={16} /> muhammadimrandigitals@gmail.com
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
