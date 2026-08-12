import { useState } from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import Breakline from "@/components/layout/Breakline";
import {
  HiOutlineBriefcase,
  HiChevronDown,
  HiChevronUp,
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
  Cpu,
  Mail,
  ShieldCheck,
  Clock,
  HelpCircle,
  Bot,
  Smartphone,
  Figma as FigmaIcon,
} from "lucide-react";

const BASE_URL = "https://imrandigitals.com";

const SERVICES_DATA = [
  {
    slug: "business-website-development",
    title: "Business Website Development",
    icon: Globe,
    description:
      "A professional website should do more than display information. It should help visitors understand your business, establish trust, and make it easy to contact you. I build responsive business websites for local businesses, service providers, startups, professionals, and organizations that need a modern, fast, maintainable, and search-friendly online presence.",
    suitableFor: [
      "Local businesses",
      "Service companies",
      "Professional websites",
      "Startup websites",
      "Company websites",
      "Personal and professional portfolios",
      "Landing pages",
      "Small and growing businesses",
    ],
    workIncludes: [
      "Responsive website development",
      "Mobile-first interfaces",
      "Service and landing pages",
      "Contact and inquiry forms",
      "Call and WhatsApp conversion pathways",
      "Technical SEO foundations",
      "Structured data",
      "Performance optimization",
      "Analytics and third-party integrations",
    ],
  },
  {
    slug: "custom-web-application-development",
    title: "Custom Web Application Development",
    icon: Layers,
    description:
      "When a standard website is not enough, I develop custom web applications around specific business requirements. This can include customer portals, SaaS platforms, management systems, directories, browser-based tools, internal applications, and other data-driven web systems.",
    functionality: [
      "User authentication",
      "Customer portals",
      "Admin dashboards",
      "Database-driven features",
      "API integrations",
      "Custom business logic",
      "Forms and workflows",
      "Role-based functionality",
      "Third-party service integrations",
      "Data management systems",
    ],
  },
  {
    slug: "full-stack-web-development",
    title: "Full-Stack Web Development",
    icon: Database,
    description:
      "For projects that require both frontend and backend development, I work across the complete application stack. I use technologies such as React, Next.js, TypeScript, Node.js, Express.js, MongoDB, Firebase, Supabase, MySQL, SQL, and REST APIs to connect the user interface with application logic, databases, authentication, and external services.",
    workIncludes: [
      "Frontend interfaces",
      "Backend APIs",
      "Database architecture",
      "Authentication",
      "User management",
      "Admin panels",
      "Business logic",
      "API integrations",
      "Data workflows",
      "Deployment and production configuration",
    ],
  },
  {
    slug: "mern-stack-development",
    title: "MERN Stack Development",
    icon: Code2,
    description:
      "I develop custom applications using the MERN stack: MongoDB, Express.js, React, and Node.js. MERN is suitable for many modern business applications because it allows the frontend, backend, APIs, and database workflows to be developed as a connected application.",
    workIncludes: [
      "React frontend development",
      "Node.js backend development",
      "Express.js REST APIs",
      "MongoDB database integration",
      "Authentication systems",
      "Admin dashboards",
      "Customer portals",
      "CRUD applications",
      "Business workflows",
      "Third-party API integrations",
    ],
  },
  {
    slug: "react-development",
    title: "React Development",
    icon: Code2,
    description:
      "React is one of my primary technologies for developing interactive, component-based web applications. I build reusable interfaces, dashboards, single-page applications, dynamic components, and frontend systems using modern React development practices.",
    workIncludes: [
      "Custom React interfaces",
      "Reusable UI components",
      "Responsive layouts",
      "Interactive dashboards",
      "Single-page applications",
      "API-connected interfaces",
      "State management",
      "Frontend performance improvements",
      "Animation and interaction",
    ],
  },
  {
    slug: "nextjs-development",
    title: "Next.js Development",
    icon: Globe,
    description:
      "I use Next.js to build modern websites and web applications where performance, routing, scalability, and search visibility are important. Depending on the project requirements, a Next.js implementation can include server-side rendering, static generation, dynamic routes, optimized assets, API integrations, and database-driven functionality.",
    workIncludes: [
      "Business websites",
      "SEO-focused websites",
      "Web applications",
      "SaaS interfaces",
      "Dynamic content platforms",
      "Database-driven applications",
      "Dashboards",
      "Customer portals",
    ],
  },
  {
    slug: "ai-development",
    title: "AI Development & AI-Powered Web Solutions",
    icon: Bot,
    description:
      "AI can be useful when it solves a real problem inside a website, application, or business workflow. I build and integrate practical AI-powered features into web applications, digital tools, and software products using modern AI platforms and APIs.",
    workIncludes: [
      "AI-powered web applications",
      "AI assistants and chat interfaces",
      "Custom GPT-style experiences",
      "AI API integrations",
      "AI-powered business tools",
      "AI analysis and recommendation features",
      "AI automation workflows",
      "AI-powered SEO tools",
      "AI features integrated into existing applications",
    ],
  },
  {
    slug: "business-software-development",
    title: "Business Software Development",
    icon: Wrench,
    description:
      "Businesses often need software that goes beyond a traditional website. I develop custom web-based business software for managing information, workflows, customers, products, inventory, operations, and internal processes.",
    workIncludes: [
      "Management systems",
      "Inventory applications",
      "Admin panels",
      "Customer management systems",
      "Internal business tools",
      "Reporting dashboards",
      "Data management systems",
      "Custom portals",
      "Workflow applications",
      "Database-driven software",
    ],
  },
  {
    slug: "dashboard-admin-panel-development",
    title: "Dashboard & Admin Panel Development",
    icon: LayoutDashboard,
    description:
      "I build custom dashboards and administration interfaces for businesses and web applications that need a central place to manage information and workflows. Dashboards can be designed around the data, permissions, reports, and actions your team actually needs.",
    workIncludes: [
      "Business management dashboards",
      "SaaS admin panels",
      "Customer management interfaces",
      "Analytics dashboards",
      "Reporting interfaces",
      "Content management systems",
      "Internal business tools",
      "Database management interfaces",
    ],
  },
  {
    slug: "nodejs-backend-development",
    title: "Node.js Backend Development",
    icon: Server,
    description:
      "A reliable backend provides the logic and data layer behind a web application. I develop Node.js and Express.js backend systems for applications that require APIs, authentication, database operations, integrations, and custom server-side functionality.",
    workIncludes: [
      "REST APIs",
      "Authentication workflows",
      "Database integration",
      "Business logic",
      "Third-party API integration",
      "Server-side workflows",
      "Application data management",
      "API authentication",
      "Backend services",
    ],
  },
  {
    slug: "database-design-integration",
    title: "Database Design & Integration",
    icon: Database,
    description:
      "Data architecture is an important part of applications that store customers, products, listings, transactions, content, or other structured information. I work with MongoDB, Firebase/Firestore, Supabase, MySQL, and SQL-based data workflows depending on the requirements of the application.",
    workIncludes: [
      "Data modeling",
      "Database structure",
      "Collection and document design",
      "SQL database integration",
      "CRUD workflows",
      "Query and data optimization",
      "Firebase and Firestore integration",
      "Supabase integration",
      "Backend data workflows",
      "Application database connections",
    ],
  },
  {
    slug: "technical-seo-website-performance",
    title: "Technical SEO & Website Performance",
    icon: Search,
    description:
      "Technical SEO works best when it is considered during development rather than added after a website has already been built. I help improve the technical foundations that affect crawling, indexing, usability, search visibility, and website performance.",
    workIncludes: [
      "Technical SEO audits",
      "Metadata implementation",
      "Semantic HTML",
      "Structured data",
      "Canonical configuration",
      "Internal linking",
      "Sitemap configuration",
      "Robots.txt configuration",
      "Indexing troubleshooting",
      "Crawlability improvements",
      "Core Web Vitals",
      "Mobile performance",
      "Page speed optimization",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "Do you provide web development services in Multan?",
    a: "Yes. I'm a full-stack web developer based in Multan, Pakistan, providing business website development, custom web applications, software development, React, Next.js, MERN stack, AI development, and technical SEO services.",
  },
  {
    q: "Do you work with clients outside Multan?",
    a: "Yes. Although I'm based in Multan, I work remotely with businesses, startups, agencies, and development teams across Pakistan and internationally.",
  },
  {
    q: "Do you build custom websites or use templates?",
    a: "I provide custom development based on the requirements of the project. The technology and implementation approach depend on the functionality, performance, budget, and long-term needs of the website.",
  },
  {
    q: "Can you build a complete web application?",
    a: "Yes. I can work across frontend, backend, database, authentication, APIs, dashboards, integrations, deployment, and other components required for a complete web application.",
  },
  {
    q: "Do you build MERN stack applications?",
    a: "Yes. MERN stack development is one of my core development areas, using MongoDB, Express.js, React, and Node.js for custom full-stack applications.",
  },
  {
    q: "Do you provide AI development services?",
    a: "Yes. I can build AI-powered web applications, AI assistants, AI integrations, custom AI workflows, and practical AI features for existing or new software products.",
  },
  {
    q: "Do you provide technical SEO with web development?",
    a: "Yes. Technical SEO can be incorporated during development, including semantic HTML, metadata, structured data, canonical configuration, crawlability, indexing, internal linking, and performance optimization.",
  },
  {
    q: "What technologies do you use?",
    a: "My primary technologies include HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Node.js, Express.js, MongoDB, Firebase, Supabase, MySQL, SQL, Vite, Flutter, and related development tools. I also use AI-assisted development tools such as Claude, Gemini, Cursor, Windsurf, Replit, v0, and Amazon Q.",
  },
  {
    q: "How do I start a project?",
    a: "Send me a brief description of what you want to build, the problem you are trying to solve, and any existing website or application you have. I'll review the requirements and help determine the appropriate next step.",
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
    name: "Web Development Services in Multan | Muhammad Imran",
    description:
      "Web development services in Multan by Muhammad Imran. Build business websites, MERN apps, custom software, AI solutions, React and Next.js applications.",
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
        title="Web Development Services in Multan | Muhammad Imran"
        description="Web development services in Multan by Muhammad Imran. Build business websites, MERN apps, custom software, AI solutions, React and Next.js applications."
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
              <span>Full-Stack Web Development, Software &amp; AI Solutions</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#17211E] dark:text-[#F5F2EC]">
              Web Development Services in Multan
            </h1>

            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#C96A3D]">
              Full-Stack Web Development, Software &amp; AI Solutions
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#5C655F] dark:text-[#9DA6A0] max-w-4xl font-sans">
            <p>
              Custom websites, web applications, business software, dashboards, and AI-powered digital solutions built around your actual requirements.
            </p>
            <p>
              I'm Muhammad Imran, a full-stack web developer based in Multan, Pakistan. I build professional business websites, custom web applications, dashboards, business software, digital tools, and AI-powered web solutions for businesses, startups, agencies, and remote clients.
            </p>
            <p>
              My development work covers both frontend and backend engineering, from responsive interfaces and React applications to APIs, databases, authentication, business workflows, third-party integrations, and AI-powered features.
            </p>
            <p>
              Whether you need a new business website, a custom software application, an internal dashboard, an AI-powered tool, or improvements to an existing project, I focus on understanding the problem first and building a practical, maintainable solution around it.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C96A3D]" />
            <span className="font-semibold text-[#17211E] dark:text-[#F5F2EC]">Based in Multan, Pakistan · Available across Pakistan and worldwide</span>
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

        {/* ---------------- 1. WEB & SOFTWARE DEVELOPMENT SERVICES GRID ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="Web & Software Development Services" icon={<HiOutlineBriefcase />} />
            <SectionSubHeading>
              <p>Different projects require different technical approaches. I provide development services ranging from professional business websites to custom software, full-stack applications, AI integrations, and technical SEO.</p>
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
                        Typical development includes:
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
                      href="/contact"
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

        {/* ---------------- 2. WEB DEVELOPMENT SERVICES IN MULTAN ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="space-y-3 font-sans">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Web Development Services in Multan
            </h2>
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              <p>
                If you're looking for a <strong className="text-[#17211E] dark:text-[#F5F2EC]">web developer in Multan</strong>, working directly with an independent developer can provide a clear communication path from the initial requirement to the final implementation.
              </p>
              <p>
                I'm based in <strong className="text-[#17211E] dark:text-[#F5F2EC]">Multan, Pakistan</strong>, and work directly with clients rather than passing development work through multiple layers.
              </p>
              <p>
                For local businesses, I can handle the development process from website structure and responsive frontend implementation to technical SEO, forms, integrations, deployment, and ongoing improvements.
              </p>
              <p>
                For more technical projects, I can develop custom web applications, business software, dashboards, APIs, database-driven systems, and AI-powered features.
              </p>
              <p>
                I also work remotely with businesses, startups, agencies, and development teams outside Multan and across international markets.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- 3. WEB DEVELOPMENT FOR BUSINESSES ACROSS PAKISTAN ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="space-y-3 font-sans">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Web Development for Businesses Across Pakistan
            </h2>
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              <p>
                Although I am based in Multan, my services are not limited to one city.
              </p>
              <p>
                I work remotely with businesses and teams across Pakistan and with international clients who need websites, web applications, software, AI solutions, or development support.
              </p>
              <p>
                Remote collaboration can include requirements gathering, project planning, development updates, preview links, testing, deployment, and post-launch improvements.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 4. WHAT MAKES MY DEVELOPMENT APPROACH DIFFERENT? ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="What Makes My Development Approach Different?" icon={<Sparkles />} />
            <SectionSubHeading>
              <p>Core principles that guide project execution, client communication, and code quality.</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
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

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Code2 size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Custom Development
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I build around the actual requirements of the project instead of forcing every business into the same template or technology stack.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Clock size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Performance Awareness
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Responsive implementation, efficient frontend architecture, optimized assets, and website performance are considered throughout development.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Search size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Search-Friendly Foundations
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                For websites that depend on organic search, I consider technical SEO during implementation, including semantic structure, metadata, structured data, crawlability, indexability, and performance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Practical Technology Choices
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Technology should serve the project. I choose frameworks, databases, APIs, and services according to requirements, maintainability, performance, scalability, and future needs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Bot size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                AI Where It Makes Sense
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                AI can provide significant value when it improves a workflow or solves a real problem. I focus on practical AI integrations rather than adding AI simply because it is currently popular.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 5. MY DEVELOPMENT TECHNOLOGY STACK ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="My Development Technology Stack" icon={<Cpu />} />
            <SectionSubHeading>
              <p>Technologies and tools I use across different web, software, AI, and digital development projects.</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#C96A3D] font-semibold uppercase tracking-wider">Frontend Development</span>
              <p className="text-sm font-mono font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                HTML · CSS · JavaScript · TypeScript · React · Next.js · Tailwind CSS · Vite · GSAP
              </p>
              <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0]">
                I use these technologies to create responsive interfaces, reusable components, interactive experiences, animations, and modern web applications.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#C96A3D] font-semibold uppercase tracking-wider">Backend Development</span>
              <p className="text-sm font-mono font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                Node.js · Express.js · REST APIs · Python
              </p>
              <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0]">
                Backend technologies are selected according to the application's requirements, including APIs, business logic, integrations, and data workflows.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#C96A3D] font-semibold uppercase tracking-wider">Databases &amp; Backend Services</span>
              <p className="text-sm font-mono font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                MongoDB · Firebase · Firestore · Supabase · MySQL · SQL
              </p>
              <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0]">
                I work with both NoSQL and relational data systems depending on the application architecture and data requirements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#C96A3D] font-semibold uppercase tracking-wider">Mobile Development</span>
              <p className="text-sm font-mono font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                Flutter · Dart
              </p>
              <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0]">
                I can also develop cross-platform mobile applications and prototypes where mobile functionality is part of the project requirements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#C96A3D] font-semibold uppercase tracking-wider">AI &amp; Development Tools</span>
              <p className="text-sm font-mono font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                Claude · Gemini · Cursor · Windsurf · Replit · v0 · Amazon Q
              </p>
              <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0]">
                I use AI-assisted development tools for research, prototyping, debugging, code assistance, development workflows, and selected AI-powered application features.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <span className="text-xs font-mono text-[#C96A3D] font-semibold uppercase tracking-wider">Development &amp; Deployment</span>
              <p className="text-sm font-mono font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                Git · GitHub · Vercel · VS Code · Postman
              </p>
              <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0]">
                These tools support version control, API testing, development, collaboration, and deployment workflows.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs md:col-span-2 lg:col-span-3">
              <span className="text-xs font-mono text-[#C96A3D] font-semibold uppercase tracking-wider">Design &amp; Prototyping</span>
              <p className="text-sm font-mono font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                Figma
              </p>
              <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0]">
                Figma can be used for interface planning, design references, wireframes, and collaboration before development.
              </p>
            </div>
          </div>

          <p className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] text-center pt-2">
            The exact technology stack depends on the requirements, budget, complexity, and long-term needs of each project.
          </p>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 6. HOW THE DEVELOPMENT PROCESS WORKS ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="How the Development Process Works" icon={<Wrench />} />
            <SectionSubHeading>
              <p>A structured workflow keeps project expectations clear from the initial idea to launch.</p>
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
                We discuss what you want to build, who will use it, what problem it needs to solve, and which features are actually necessary.
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
                I define the project structure, technology approach, main functionality, pages or application workflows, and development scope.
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
                The website, software, or web application is developed with regular progress updates and working previews where appropriate.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm font-mono">
                04
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Test &amp; Optimize
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I test responsiveness, functionality, forms, integrations, performance, accessibility, and relevant technical SEO requirements before launch.
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
                The finished project is deployed to the appropriate production environment and the necessary configuration is completed.
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
                After launch, additional features, fixes, integrations, performance improvements, maintenance, and future development can be added as the product grows.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 7. NOT SURE WHICH SERVICE YOU NEED? ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="space-y-3 font-sans max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Not Sure Which Service You Need?
            </h2>
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              <p>
                You don't need to know the technical name for what you're trying to build.
              </p>
              <p>
                Tell me what you want the website, software, web application, or AI solution to do, what problem you're trying to solve, or what isn't working with your existing project.
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

        {/* ---------------- 8. FREQUENTLY ASKED QUESTIONS ---------------- */}
        <section className="space-y-6">
          <div className="space-y-2">
            <SectionHeading title="Frequently Asked Questions" icon={<HelpCircle />} />
            <SectionSubHeading>
              <p>Common questions about web development services, engagement terms, and technical capabilities.</p>
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

        <Breakline className="my-8" />

        {/* ---------------- 9. BOTTOM CTA SECTION ---------------- */}
        <section className="rounded-2xl border border-[#C96A3D]/40 bg-[#FFFEFA] dark:bg-[#1B2421] p-8 sm:p-10 space-y-6 shadow-xs font-sans">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-heading text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Have a Website, Software or AI Project in Mind?
            </h2>
            <p className="text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              Whether you need a business website, custom web application, MERN stack development, business software, dashboard, AI-powered application, or technical improvement to an existing project, let's discuss what you're trying to build.
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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#F5F2EC] dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-sm border border-[#D9D4CA] dark:border-[#2A3632] transition-colors duration-200"
            >
              View Projects
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#FFFEFA] dark:bg-[#1B2421] hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-sm border border-[#D9D4CA] dark:border-[#2A3632] transition-colors duration-200"
            >
              Contact Muhammad Imran
            </Link>
          </div>

          <div className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] pt-2 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]/50">
            Multan, Pakistan · Available for Remote Projects Worldwide
          </div>
        </section>
      </div>
    </>
  );
}
