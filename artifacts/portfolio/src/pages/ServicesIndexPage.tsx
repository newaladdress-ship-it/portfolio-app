import { useState } from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import Breakline from "@/components/layout/Breakline";
import {
  HiOutlineBriefcase,
  HiChevronDown,
  HiChevronUp,
  HiOutlineFolder,
} from "react-icons/hi";
import {
  Globe,
  Layers,
  Code2,
  Database,
  Search,
  LayoutDashboard,
  ArrowRight,
  Server,
  Wrench,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Mail,
  ShieldCheck,
  Clock,
  HelpCircle,
} from "lucide-react";

const BASE_URL = "https://imrandigitals.com";

const SERVICES_DATA = [
  {
    slug: "website-development",
    title: "Business Website Development",
    icon: Globe,
    description:
      "A professional website should do more than display information. It should make it easy for potential customers to understand your services, trust your business, and take the next step. I build responsive business websites for local companies, service providers, startups, and organizations that need a modern and maintainable online presence.",
    suitableFor: [
      "Local businesses",
      "Service companies",
      "Professional portfolios",
      "Startups",
      "Small and growing businesses",
    ],
    workIncludes: [
      "Responsive website development",
      "Mobile-first interfaces",
      "Service and landing pages",
      "Contact and inquiry workflows",
      "Technical SEO foundations",
      "Performance optimization",
      "Analytics and third-party integrations",
    ],
  },
  {
    slug: "web-applications",
    title: "Custom Web Application Development",
    icon: Layers,
    description:
      "When a standard website is not enough, I develop custom web applications around specific business requirements. This can include customer portals, management systems, SaaS products, directories, browser-based tools, and other applications that require custom functionality and data workflows.",
    functionality: [
      "User authentication",
      "Dashboards and portals",
      "Database-driven features",
      "API integrations",
      "Custom business logic",
      "Forms and workflows",
      "Admin interfaces",
      "Third-party service integrations",
    ],
  },
  {
    slug: "full-stack",
    title: "Full-Stack Web Development",
    icon: Database,
    description:
      "For projects that require both frontend and backend development, I can work across the complete application stack. I use technologies including React, Next.js, TypeScript, Node.js, Express, MongoDB, Firebase, and REST APIs to connect user interfaces with application logic and data. The goal is to create a complete system where the frontend, backend, database, and external services work together reliably.",
  },
  {
    slug: "react",
    title: "React Development",
    icon: Code2,
    description:
      "React is one of my primary technologies for building interactive and component-based web applications. I develop reusable interfaces, interactive components, dashboards, single-page applications, and frontend systems using modern React development practices.",
    workIncludes: [
      "Custom UI components",
      "Responsive interfaces",
      "Interactive dashboards",
      "Single-page applications",
      "API-connected interfaces",
      "Component-based architecture",
      "Frontend performance improvements",
    ],
  },
  {
    slug: "next-js",
    title: "Next.js Development",
    icon: Globe,
    description:
      "I use Next.js to build modern websites and web applications where performance, routing, rendering, and search visibility are important. Depending on the project requirements, a Next.js implementation can use server-side rendering, static generation, dynamic routes, optimized assets, and other framework capabilities.",
    workIncludes: [
      "Business websites",
      "SEO-focused websites",
      "Web applications",
      "Dynamic content platforms",
      "SaaS interfaces",
      "Database-driven applications",
    ],
  },
  {
    slug: "node-js",
    title: "Node.js Backend Development",
    icon: Server,
    description:
      "A reliable backend provides the logic and data layer behind a web application. I develop Node.js and Express-based backend systems for applications that require APIs, authentication, database operations, integrations, and custom server-side functionality.",
    workIncludes: [
      "REST APIs",
      "Authentication workflows",
      "Database integration",
      "Business logic",
      "Third-party API integration",
      "Server-side workflows",
      "Application data management",
    ],
  },
  {
    slug: "database",
    title: "Database Design & Integration",
    icon: Database,
    description:
      "Data architecture is an important part of any application that stores customer information, products, listings, transactions, content, or other structured data. I work with databases and backend services such as MongoDB and Firebase/Firestore to create data-driven applications and business workflows.",
    workIncludes: [
      "Data modeling",
      "Collection and document structure",
      "CRUD workflows",
      "Application integration",
      "Query optimization",
      "Firebase and Firestore integration",
      "Backend data workflows",
    ],
  },
  {
    slug: "dashboards",
    title: "Dashboard & Admin Panel Development",
    icon: LayoutDashboard,
    description:
      "I build custom dashboards and admin interfaces for businesses and web applications that need a central place to manage information and workflows. Dashboards can be designed around the actual data and actions your team needs rather than forcing your business into a generic template.",
    workIncludes: [
      "Business management dashboards",
      "SaaS admin panels",
      "Customer management interfaces",
      "Data dashboards",
      "Content management interfaces",
      "Internal business tools",
    ],
  },
  {
    slug: "seo-multan",
    title: "Technical SEO & Website Performance",
    icon: Search,
    description:
      "Technical SEO works best when it is considered as part of development rather than added after a website has already been built. I help improve the technical foundations that affect crawling, indexing, usability, and website performance.",
    workIncludes: [
      "Technical SEO audits",
      "Metadata implementation",
      "Semantic HTML",
      "Structured data",
      "Canonical configuration",
      "Internal linking",
      "Sitemap and robots.txt configuration",
      "Indexing troubleshooting",
      "Core Web Vitals improvements",
      "Performance optimization",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "Do you provide web development services in Multan?",
    a: "Yes. I'm a full-stack web developer based in Multan, Pakistan, providing business website development, custom web application development, React, Next.js, backend, dashboard, and technical SEO services.",
  },
  {
    q: "Do you work with clients outside Multan?",
    a: "Yes. I work with remote clients and teams in Pakistan and internationally. Project communication, development, reviews, and delivery can be handled remotely.",
  },
  {
    q: "Do you build custom websites or use templates?",
    a: "I can work with different approaches depending on the project, but my custom development work focuses on building functionality and interfaces around the actual requirements rather than adding unnecessary template features.",
  },
  {
    q: "Can you build a complete web application?",
    a: "Yes. I work across frontend and backend development and can build applications involving React or Next.js, Node.js, APIs, databases, authentication, dashboards, and custom business workflows.",
  },
  {
    q: "Do you provide technical SEO with web development?",
    a: "Yes. Technical SEO can be incorporated into the development process, including semantic HTML, metadata, structured data, crawlability, indexing configuration, internal linking, and performance considerations.",
  },
  {
    q: "What technologies do you use?",
    a: "My main technologies include React, Next.js, TypeScript, JavaScript, Node.js, Express, MongoDB, Firebase, Firestore, Tailwind CSS, and REST APIs. The technology choice depends on the requirements of the project.",
  },
  {
    q: "How do I start a project?",
    a: "Send a message describing what you want to build, improve, or fix. We can then discuss the requirements, scope, development approach, and next steps.",
  },
];

export default function ServicesIndexPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
    ],
  };

  const serviceCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Web Development Services in Multan",
    description:
      "Web development services in Multan by Muhammad Imran. Build business websites, React and Next.js apps, custom web applications, and full-stack solutions.",
    itemListElement: SERVICES_DATA.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `${BASE_URL}/services/${s.slug}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <SEOHead
        title="Web Development Services in Multan | Imran Digitals"
        description="Web development services in Multan by Muhammad Imran. Build business websites, React and Next.js apps, custom web applications, and full-stack solutions."
        path="/services"
        jsonLd={[breadcrumbJsonLd, serviceCollectionJsonLd, faqSchema]}
      />

      <div className="space-y-16 py-6 font-sans">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]"
        >
          <Link href="/" className="hover:text-[#C96A3D] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-[#D9D4CA] dark:text-[#2A3632]">/</span>
          <span className="text-[#17211E] dark:text-[#F5F2EC]">Services</span>
        </nav>

        {/* ---------------- HERO / INTRODUCTION ---------------- */}
        <section className="space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] px-3.5 py-1.5 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <span className="w-2 h-2 rounded-full bg-[#C96A3D] animate-pulse" />
              <span>Full-Stack Development &amp; Technical Solutions</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#17211E] dark:text-[#F5F2EC]">
              Web Development Services in Multan
            </h1>

            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#C96A3D]">
              Custom websites, web applications, and full-stack solutions
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#5C655F] dark:text-[#9DA6A0] max-w-4xl font-sans">
            <p>
              I'm Muhammad Imran, a full-stack web developer based in Multan, Pakistan. I build business websites, custom web applications, dashboards, and software-oriented web systems for businesses, startups, agencies, and remote clients.
            </p>
            <p>
              My development work combines modern frontend technologies such as React and Next.js with backend development using Node.js, databases, APIs, and other services required to build complete web solutions.
            </p>
            <p>
              Whether you need a new business website, a custom web application, an internal dashboard, or improvements to an existing project, I focus on building a practical solution around your actual requirements—not adding unnecessary technology for the sake of it.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-sm transition-colors duration-200 shadow-xs"
            >
              Start a Project <ArrowRight size={16} />
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#FFFEFA] dark:bg-[#1B2421] hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-sm border border-[#D9D4CA] dark:border-[#2A3632] transition-colors duration-200"
            >
              View My Projects
            </Link>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 1. WEB DEVELOPMENT SERVICES GRID ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="Web Development Services" icon={<HiOutlineBriefcase />} />
            <SectionSubHeading>
              <p>Different projects require different approaches. The services below cover the main areas of web development I work on.</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {SERVICES_DATA.map((service) => {
              const IconComp = service.icon;
              return (
                <article
                  key={service.slug}
                  className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-5 shadow-xs hover:border-[#C96A3D]/60 transition-colors font-sans"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center shrink-0 mt-0.5">
                      <IconComp size={24} />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h3 className="font-heading font-bold text-2xl text-[#17211E] dark:text-[#F5F2EC]">
                        {service.title}
                      </h3>
                      <p className="text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {service.suitableFor && (
                    <div className="space-y-2 pt-2 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]/50">
                      <p className="text-xs font-mono font-semibold uppercase text-[#C96A3D] tracking-wider">
                        Suitable for:
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs font-mono">
                        {service.suitableFor.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 rounded-md bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA]/80 dark:border-[#2A3632]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.functionality && (
                    <div className="space-y-2 pt-2 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]/50">
                      <p className="text-xs font-mono font-semibold uppercase text-[#C96A3D] tracking-wider">
                        Typical functionality includes:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#5C655F] dark:text-[#9DA6A0]">
                        {service.functionality.map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <CheckCircle2 size={15} className="text-[#C96A3D] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.workIncludes && (
                    <div className="space-y-2 pt-2 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]/50">
                      <p className="text-xs font-mono font-semibold uppercase text-[#C96A3D] tracking-wider">
                        Typical work includes:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#5C655F] dark:text-[#9DA6A0]">
                        {service.workIncludes.map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <CheckCircle2 size={15} className="text-[#C96A3D] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#C96A3D] hover:underline"
                    >
                      Explore {service.title} <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 2. WEB DEVELOPMENT FOR BUSINESSES IN MULTAN ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-4">
          <div className="space-y-3 font-sans">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Web Development for Businesses in Multan
            </h2>
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              <p>
                If you're looking for a web developer in Multan, working with an independent developer can provide a direct communication path from the initial requirement to the final implementation. I work directly with clients rather than passing development work through multiple layers.
              </p>
              <p>
                Based in <strong className="text-[#17211E] dark:text-[#F5F2EC]">Multan, Pakistan</strong>, I work with local businesses as well as clients and teams outside the city through remote collaboration.
              </p>
              <p>
                For a local business, the development process can include everything from planning the website structure and building the frontend to implementing technical SEO, connecting forms or APIs, and deploying the finished website.
              </p>
              <p>
                For larger or more technical projects, I can work on custom web applications, dashboards, backend systems, and database-driven workflows.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 3. WHAT MAKES MY DEVELOPMENT APPROACH DIFFERENT? ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="What Makes My Development Approach Different?" icon={<Sparkles />} />
            <SectionSubHeading>
              <p>Core principles that guide client collaboration, project execution, and code quality.</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Mail size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Direct Communication
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                You communicate directly with the developer working on your project. Requirements, changes, technical decisions, and progress can be discussed without unnecessary layers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Code2 size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Custom Development
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I build around the requirements of the project instead of forcing every business into the same template or technology stack.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Clock size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Performance Awareness
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Page performance, responsive implementation, clean frontend architecture, and efficient asset delivery are considered during development.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Search size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Search-Friendly Foundations
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                For websites that depend on organic search, I consider technical SEO during implementation, including semantic structure, metadata, structured data, crawlability, and indexability.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 md:col-span-2 lg:col-span-2">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Practical Technology Choices
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                The technology should serve the project. I choose tools and architecture based on requirements, maintainability, performance, and future needs rather than using a framework simply because it is popular.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 4. MY DEVELOPMENT TECHNOLOGY STACK ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="My Development Technology Stack" icon={<Cpu />} />
            <SectionSubHeading>
              <p>Tools and frameworks chosen based on reliability, performance, and project needs.</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <span className="text-xs font-mono text-[#C96A3D] font-semibold uppercase tracking-wider">Frontend</span>
              <p className="text-sm font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                React · Next.js · JavaScript · TypeScript · HTML · CSS · Tailwind CSS
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <span className="text-xs font-mono text-[#C96A3D] font-semibold uppercase tracking-wider">Backend</span>
              <p className="text-sm font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                Node.js · Express.js · REST APIs
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <span className="text-xs font-mono text-[#C96A3D] font-semibold uppercase tracking-wider">Databases &amp; Services</span>
              <p className="text-sm font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                MongoDB · Firebase · Firestore · Firebase Storage
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <span className="text-xs font-mono text-[#C96A3D] font-semibold uppercase tracking-wider">SEO &amp; Performance</span>
              <p className="text-sm font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                Technical SEO · Structured Data · Semantic HTML · Core Web Vitals · Performance Optimization
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 md:col-span-2">
              <span className="text-xs font-mono text-[#C96A3D] font-semibold uppercase tracking-wider">Development &amp; Deployment</span>
              <p className="text-sm font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                Git · GitHub · npm · Vercel · cPanel
              </p>
            </div>
          </div>

          <p className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] text-center">
            The exact technology stack depends on the requirements of each project.
          </p>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 5. HOW THE PROCESS WORKS ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="How the Process Works" icon={<Wrench />} />
            <SectionSubHeading>
              <p>A structured development workflow to keep expectations clear from start to finish.</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                01
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Understand
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                We discuss what you want to build, who will use it, what problem it needs to solve, and which features are actually necessary.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                02
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Plan
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I define the project structure, technology approach, main functionality, pages or application workflows, and development scope.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                03
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Build
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                The website or application is developed with regular progress updates and testing throughout the process.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                04
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Test &amp; Optimize
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I test responsiveness, functionality, forms, integrations, performance, and relevant technical SEO requirements before launch.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 md:col-span-2 lg:col-span-2">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                05
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Launch
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                The finished project is deployed to your hosting environment and the necessary production configuration is completed.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 6. NOT SURE WHICH SERVICE YOU NEED? ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-4">
          <div className="space-y-3 font-sans max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Not Sure Which Service You Need?
            </h2>
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              <p>
                You don't need to know the technical name for what you're trying to build.
              </p>
              <p>
                Tell me what you want the website or application to do, what problem you're trying to solve, or what isn't working with your existing project.
              </p>
              <p>
                I'll help identify the most appropriate starting point and explain what would be involved.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2 font-sans">
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

        <Breakline className="my-8" />

        {/* ---------------- 7. FREQUENTLY ASKED QUESTIONS ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="Frequently Asked Questions" icon={<HelpCircle />} />
            <SectionSubHeading>
              <p>Common questions about web development services, engagement terms, and delivery.</p>
            </SectionSubHeading>
          </div>

          <div className="space-y-3 font-sans">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                      {faq.q}
                    </span>
                    <span className="text-[#C96A3D] shrink-0">
                      {isOpen ? <HiChevronUp size={20} /> : <HiChevronDown size={20} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed border-t border-[#D9D4CA]/50 dark:border-[#2A3632]/50 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
