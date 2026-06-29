export type ServiceFAQ = {
  q: string;
  a: string;
};

export type ServiceSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type Service = {
  slug: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  highlights: { label: string; value: string }[];
  what: ServiceSection;
  process: ServiceSection;
  stack: { label: string; items: string[] };
  benefits: ServiceSection;
  faqs: ServiceFAQ[];
  related: string[];
  ctaHeading: string;
  ctaBody: string;
};

export const SERVICES: Service[] = [
  {
    slug: "web-application-development",
    keyword: "web development, software development, expert web development services",
    metaTitle: "Web Application Development Services - Muhammad Imran",
    metaDescription: "Hire a senior web developer for custom React, Next.js, and Node.js web application development with clean code and high performance.",
    h1: "Expert Web Application Development & Software Development Services",
    intro:
      "I am Muhammad Imran, a professional web developer based in Multan, Pakistan offering expert web development services and custom web application development. Building production-grade React, Next.js, and Node.js applications for startups, SaaS founders, and enterprise teams. As a dedicated software developer, I deliver full-stack solutions from architecture to deployment, ensuring your web development project ships on time with scalable, maintainable code.",
    highlights: [
      { label: "Stack", value: "React · Next.js · Node.js · TypeScript" },
      { label: "Engagement", value: "Project · Retainer · Hourly" },
      { label: "Delivery", value: "2 – 12 weeks typical" },
      { label: "Location", value: "Remote-first, based in Pakistan" },
    ],
    what: {
      heading: "What you get from this web application development service",
      body:
        "Most web application development service providers stop at writing code. I treat every project as a product. That means I plan the architecture, model the data, design the API contract, ship a polished UI, and harden it for production. You get one accountable engineer, fewer handoffs, and a system that is genuinely easy to maintain.",
      bullets: [
        "Custom web app development end-to-end (frontend, backend, database, deployment)",
        "MERN stack development (MongoDB, Express, React, Node.js) and PostgreSQL projects",
        "Headless CMS, multi-tenant SaaS, dashboards, internal tools and admin panels",
        "REST and GraphQL API design with OpenAPI / typed clients",
        "Authentication, authorization, and role-based access (Clerk, Auth0, custom JWT)",
        "Payment integrations (Stripe, PayPal, RevenueCat) and webhook pipelines",
        "Realtime features with WebSockets, Firestore, or server-sent events",
        "Production hosting on Vercel, Replit Deployments, AWS, or your own cloud",
      ],
    },
    process: {
      heading: "My web application development process",
      body:
        "A clear process protects your budget and your timeline. Every engagement follows the same five steps so you always know what is happening this week and what ships next week.",
      bullets: [
        "Discovery - 30 to 60 minute call to understand the goal, users, and constraints",
        "Scope & quote - written proposal with milestones, fixed pricing, and a delivery date",
        "Architecture - data model, API contract, and UI flows agreed before any code is written",
        "Build - weekly demos on a staging URL, you can click and test every Friday",
        "Launch & care - production deploy, monitoring, documentation, and an optional retainer",
      ],
    },
    stack: {
      label: "Web app technologies I use every day",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Express",
        "Vite",
        "Tailwind CSS",
        "MongoDB",
        "PostgreSQL",
        "Drizzle ORM",
        "Prisma",
        "Firebase",
        "Stripe",
        "Clerk",
        "Vercel",
        "AWS",
      ],
    },
    benefits: {
      heading: "Why teams hire me as their web application development service provider",
      body:
        "You are not buying hours. You are buying outcomes. Here is what changes when you bring me onto your project.",
      bullets: [
        "One senior engineer responsible for the whole stack - no agency middle layer",
        "Typed, tested code with sensible documentation, not throwaway prototypes",
        "Honest weekly reporting so you always know status and remaining budget",
        "Performance budgets enforced from day one - Lighthouse scores above 90 on launch",
        "Clean handover so your in-house team can extend the codebase without a rewrite",
      ],
    },
    faqs: [
      {
        q: "What size of web application projects do you take on?",
        a: "Anywhere from a 2-week MVP to a 3-month SaaS build. For projects larger than that I assemble a small trusted team and continue to lead delivery personally.",
      },
      {
        q: "Do you work with non-technical founders?",
        a: "Yes - most of my clients are founders or product owners. I translate business goals into technical scope, and I never hide behind jargon in status calls.",
      },
      {
        q: "Can you take over an existing codebase?",
        a: "Yes. I regularly audit, refactor, and extend existing React, Next.js, and Node.js codebases. The first step is a paid 1-week audit with a written report and an upgrade plan.",
      },
      {
        q: "Where are you based and what hours do you work?",
        a: "I am based in Multan, Pakistan (PKT, UTC+5) and work comfortably with clients in Europe, the Middle East, and North America. I keep async-friendly hours and reserve overlap windows for live calls.",
      },
    ],
    related: ["web-consulting", "dashboard-design", "executive-dashboards"],
    ctaHeading: "Ready to start your web application project?",
    ctaBody:
      "Send a short brief or jump on a free 30-minute scoping call. You will leave the call with a clear next step, even if we do not work together.",
  },
  {
    slug: "web-consulting",
    keyword: "web consulting service",
    metaTitle: "Web Consulting Services - Muhammad Imran Web Advisor",
    metaDescription: "Independent web consulting service for founders and teams. Architecture reviews, tech audits, and expert senior engineering guidance.",
    h1: "Web Consulting Service for Founders & Product Teams",
    intro:
      "Looking for an honest, independent web consulting service? I help founders and product teams make better technology decisions - from picking the right stack and architecture, to fixing slow apps, to planning a clean rewrite. No agency overhead, no upsells, just senior engineering judgment.",
    highlights: [
      { label: "Format", value: "1:1 calls, audits, written reports" },
      { label: "Engagement", value: "Hourly · Fixed-scope · Monthly retainer" },
      { label: "Speciality", value: "React, Node.js, MERN, SaaS architecture" },
      { label: "Turnaround", value: "Calls within the same week" },
    ],
    what: {
      heading: "What this web consulting service covers",
      body:
        "I work with three groups: solo founders who need a technical sanity check, product teams that want a second opinion on architecture, and agencies that need senior backup on a tough project. Whatever the size, the goal is the same - give you the clearest possible picture of your options and the right next step.",
      bullets: [
        "Tech stack selection - React vs Next.js, MongoDB vs PostgreSQL, monolith vs microservices",
        "Architecture review of an existing web app, with a written report and prioritized fixes",
        "Performance audits - Core Web Vitals, bundle analysis, render bottlenecks, database queries",
        "Code reviews of pull requests or full repositories with practical, kind feedback",
        "Hiring help - technical interviews, take-home review, and offer guidance",
        "Roadmap planning - quarter-by-quarter engineering plan tied to business goals",
        "Vendor and tool selection (auth, payments, hosting, observability)",
      ],
    },
    process: {
      heading: "How a typical web consulting engagement works",
      body:
        "Every consulting engagement is structured so you get value from the very first hour. No long discovery phases, no surprise invoices.",
      bullets: [
        "Intake - short questionnaire so I arrive prepared and ready to dive in",
        "Working session - focused 60 to 90 minute call where we go deep on your problem",
        "Written summary - bullet-point notes, recommended actions, and links within 48 hours",
        "Optional follow-up - async Slack or email support, or a monthly retainer for ongoing advice",
      ],
    },
    stack: {
      label: "Areas I consult on most often",
      items: [
        "React",
        "Next.js",
        "Node.js",
        "MERN stack",
        "TypeScript",
        "PostgreSQL",
        "MongoDB",
        "Firebase",
        "Vercel",
        "AWS",
        "SaaS architecture",
        "Multi-tenant systems",
        "API design",
        "DevOps basics",
      ],
    },
    benefits: {
      heading: "Why use an independent web consultancy service",
      body:
        "Hiring an agency for advice means you also hire their incentives. Hiring me means you get senior input without the sales pitch.",
      bullets: [
        "No upsell - if the answer is to hire in-house instead of outsourcing, I will say so",
        "Plain-English advice that non-technical founders and CEOs can act on directly",
        "Vendor-neutral recommendations based on your scale, budget, and team",
        "Written deliverables so you can share decisions with investors or your board",
        "Same-week availability - most discovery calls happen within 3 to 5 days",
      ],
    },
    faqs: [
      {
        q: "Do you offer one-off consulting calls or only retainers?",
        a: "Both. Many clients start with a single paid call to test the fit, then either book a fixed-scope audit or move to a small monthly retainer.",
      },
      {
        q: "Can you sign an NDA before we share details?",
        a: "Yes. I sign mutual NDAs before any commercial discussion if you need one.",
      },
      {
        q: "Will you also build what you recommend?",
        a: "Sometimes. If the work is a good fit I am happy to quote for delivery. There is never any pressure - many consulting clients implement my recommendations with their own team.",
      },
      {
        q: "Is this web consultancy services offering remote-only?",
        a: "Yes, I work remotely with clients globally. Calls happen on Google Meet or Zoom, and written work is delivered in Notion, Google Docs, or Markdown - your choice.",
      },
    ],
    related: ["web-application-development", "executive-dashboards", "seo-multan"],
    ctaHeading: "Book a web consulting session",
    ctaBody:
      "Tell me what you are stuck on. I will reply within one business day with a proposed call slot or a quick async answer if your question is small.",
  },
  {
    slug: "dashboard-design",
    keyword: "dashboard design services",
    metaTitle: "Dashboard Design Services - Custom Admin and Charts UI",
    metaDescription: "Professional dashboard design services for SaaS and internal tools. Build fast, responsive, and modern admin interfaces with React.",
    h1: "Dashboard Design Services for SaaS & Internal Tools",
    intro:
      "Most dashboards are slow, ugly, and overloaded. My dashboard design services fix that. I design and build clean, fast, accessible admin and analytics interfaces that your users actually enjoy opening every morning. From early wireframes to a production React build, you get one engineer covering both design and code.",
    highlights: [
      { label: "Speciality", value: "Admin panels · Analytics · SaaS dashboards" },
      { label: "Design + build", value: "Figma to production React app" },
      { label: "Accessibility", value: "WCAG AA contrast, keyboard, screen reader" },
      { label: "Speed", value: "First interactive prototype in 7 to 10 days" },
    ],
    what: {
      heading: "What is included in my dashboard design services",
      body:
        "These dashboard designing services cover the full lifecycle - from understanding the metric your users care about, to a production-ready interface running on your domain. You can hire me for design only, build only, or both.",
      bullets: [
        "Information architecture - what belongs on the dashboard and what does not",
        "Wireframes and high-fidelity Figma mockups in light and dark mode",
        "Custom dashboard UI built with React, Tailwind, and a charting library you trust",
        "Charts, tables, KPI cards, filters, segments, and saved views",
        "Realtime data via WebSockets, polling, or server-sent events",
        "CSV / Excel export, PDF report generation, and email digests",
        "Role-based access so admins, managers, and viewers each see the right slice",
        "Mobile and tablet layouts - every dashboard I ship works on phones",
      ],
    },
    process: {
      heading: "How my dashboard design and build process works",
      body:
        "Good dashboards come from a tight loop between design, data, and feedback. Here is how I run that loop.",
      bullets: [
        "Workshop - 60 minute call to map the metrics, users, and decisions the dashboard supports",
        "Information architecture - sketches and a one-page layout plan within 3 days",
        "Hi-fi design - clickable Figma in week one, two rounds of revisions included",
        "Build - production React code with sample data, deployed to a staging URL",
        "Data wiring - connect to your real API, queue, or warehouse",
        "Polish & launch - accessibility pass, performance budget, then production deploy",
      ],
    },
    stack: {
      label: "Tools and libraries I use for dashboard design",
      items: [
        "Figma",
        "React",
        "Next.js",
        "Tailwind CSS",
        "shadcn/ui",
        "Radix UI",
        "Recharts",
        "Tremor",
        "ECharts",
        "TanStack Table",
        "TanStack Query",
        "Framer Motion",
        "PostgreSQL",
        "MongoDB",
      ],
    },
    benefits: {
      heading: "Why choose these dashboard designing services",
      body:
        "Hiring a designer and a developer separately is the slow, expensive way to build a dashboard. Hiring one engineer who does both is faster and produces a tighter result.",
      bullets: [
        "Single accountable engineer - no design / dev handoff lost in translation",
        "Pixel-faithful builds - what you approve in Figma is what ships in React",
        "Real performance - lazy loaded charts, virtualized tables, sub-second filters",
        "Accessible by default - keyboard navigation, contrast, and ARIA done right",
        "Fully owned codebase - no vendor lock-in, no per-seat pricing on the UI",
      ],
    },
    faqs: [
      {
        q: "Do you only design, or can you build the dashboard too?",
        a: "Both. Most clients hire me for design plus build because it is the fastest path. I am happy to do design only and hand off Figma + React component specs to your team.",
      },
      {
        q: "Can you redesign our existing admin panel without breaking it?",
        a: "Yes. We start with a side-by-side rebuild on a feature branch, ship route by route behind a feature flag, and switch over once parity is confirmed.",
      },
      {
        q: "Which charting library do you recommend for a SaaS dashboard?",
        a: "For most SaaS dashboards I recommend Recharts or Tremor for speed of delivery, ECharts when you need advanced visualizations, and D3 only when truly custom. I will pick the right tool for your data.",
      },
      {
        q: "Do these dashboard design services include white-label options?",
        a: "Yes. I regularly build dashboards for agencies that resell them under their own brand. Theming, logo, color tokens, and domain are all yours.",
      },
    ],
    related: ["executive-dashboards", "web-application-development", "web-consulting"],
    ctaHeading: "Get a quote for your dashboard project",
    ctaBody:
      "Share a screenshot of your current admin panel or a description of what you want to build. You will get a proposal with a fixed price and a timeline within two business days.",
  },
  {
    slug: "executive-dashboards",
    keyword: "web development agencies with executive dashboards",
    metaTitle: "Executive Dashboard Development - Muhammad Imran Dev",
    metaDescription: "Custom executive dashboard development for startups and enterprises. Get real-time business KPIs and analytics built in React and Node.",
    h1: "Executive Dashboards by a Senior Web Development Engineer",
    intro:
      "Searching for web development agencies with executive dashboards in their portfolio? You can hire one accountable senior engineer instead. I design and build C-suite KPI dashboards - the kind founders, CEOs, and board members actually open before their morning coffee. Real metrics, fast load times, and a layout that respects the reader's time.",
    highlights: [
      { label: "Audience", value: "Founders · CEOs · CFOs · Board members" },
      { label: "Output", value: "Web dashboard + scheduled PDF / email digest" },
      { label: "Source data", value: "Postgres, MongoDB, Stripe, GA4, warehouses" },
      { label: "Delivery", value: "First version live in 3 to 4 weeks" },
    ],
    what: {
      heading: "What an executive dashboard from me actually looks like",
      body:
        "Most agency dashboards are a wall of charts that nobody reads. An executive dashboard should answer three questions in under ten seconds - what changed, why, and what to do next. Here is how I design for that.",
      bullets: [
        "One-screen overview - the 6 to 10 KPIs your leadership team actually tracks",
        "Trend lines, deltas, and threshold alerts so changes jump off the page",
        "Drill-down views for finance, growth, product, and operations",
        "Annotations - leave notes on spikes and dips so context lives with the data",
        "Scheduled email digest each Monday morning with the same KPIs in plain text",
        "PDF export for board packs, with cover page and your branding",
        "Role-based access - execs see the summary, analysts see the raw data",
      ],
    },
    process: {
      heading: "How I build executive dashboards (faster than most agencies)",
      body:
        "Agencies typically need 8 to 12 weeks because work passes between strategists, designers, frontenders, and backenders. I compress that to 3 to 4 weeks because one engineer owns the whole pipeline.",
      bullets: [
        "Metrics workshop - 90 minute call with the leadership team to choose KPIs",
        "Data audit - confirm where each metric lives (database, Stripe, GA4, warehouse)",
        "Wireframe - a single-page layout plan approved before any code",
        "Build - React + TypeScript dashboard on a staging URL inside week 2",
        "Wire real data - secure API integration, caching, and freshness indicators",
        "Polish - print styles, PDF export, scheduled email, mobile read-only view",
      ],
    },
    stack: {
      label: "Stack I use for executive KPI dashboards",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Recharts",
        "Tremor",
        "TanStack Query",
        "Node.js",
        "PostgreSQL",
        "MongoDB",
        "Stripe API",
        "Google Analytics 4",
        "BigQuery",
        "Resend / SendGrid",
      ],
    },
    benefits: {
      heading: "Why pick a senior engineer over web development agencies with executive dashboards",
      body:
        "Big agencies have a portfolio of dashboards because they have a sales team. That does not mean the dashboards are well built. Here is what is different when you hire me.",
      bullets: [
        "Direct line to the engineer - no project manager forwarding messages",
        "Lower cost - no agency margin, no junior staff billed at senior rates",
        "Faster delivery - 3 to 4 weeks instead of 3 to 4 months",
        "Honest data - every chart shows source, freshness, and last refresh time",
        "Yours forever - full source code, no monthly platform fee, no lock-in",
      ],
    },
    faqs: [
      {
        q: "Can you connect to our existing data warehouse?",
        a: "Yes. I have shipped executive dashboards backed by PostgreSQL, MongoDB, BigQuery, and Snowflake. If your data lives in a CSV or a Google Sheet today, I can start there too.",
      },
      {
        q: "Will the dashboard be hosted by you or by us?",
        a: "Your choice. By default I deploy to Vercel or your preferred cloud under your domain. You own every piece - code, hosting, and credentials.",
      },
      {
        q: "Do you offer ongoing maintenance after launch?",
        a: "Yes - most clients add a small monthly retainer for KPI changes, new charts, and bug fixes. It is genuinely optional and you can cancel any month.",
      },
      {
        q: "How is this different from BI tools like Metabase or Looker?",
        a: "BI tools are general-purpose. A custom executive dashboard is shaped exactly to your business - the labels, the math, the comparisons, the design - so leadership trusts it on first read. They also run far faster because they only render what your team needs.",
      },
    ],
    related: ["dashboard-design", "web-application-development", "web-consulting"],
    ctaHeading: "Skip the agency. Get an executive dashboard in 3 weeks.",
    ctaBody:
      "Send a list of the KPIs you wish you saw every Monday morning. I will reply with a fixed quote and a target launch date.",
  },
  {
    slug: "seo-multan",
    keyword: "seo company in multan",
    metaTitle: "SEO Company in Multan - Web Developer and SEO Expert",
    metaDescription: "Looking for a reliable SEO company in Multan? Get technical audits, schema markup, and speed optimization from a senior web developer.",
    h1: "SEO Company in Multan - Built by a Local Web Developer",
    intro:
      "I am Muhammad Imran, a senior web developer based in Multan, Pakistan offering technical SEO services to local businesses, agencies, and online stores. If you are searching for an honest SEO company in Multan that actually understands code, you are in the right place. No spammy backlinks, no monthly retainer that hides the work - just real, technical SEO that helps your site rank.",
    highlights: [
      { label: "Location", value: "Multan, Pakistan - local meetings welcome" },
      { label: "Focus", value: "Technical & on-page SEO" },
      { label: "Engagement", value: "One-off audits or monthly retainer" },
      { label: "Languages", value: "English, Urdu, Punjabi" },
    ],
    what: {
      heading: "What this Multan SEO service covers",
      body:
        "Most SEO agencies sell links and rank tracking. I sell the kind of SEO work that compounds - fixing the site itself so Google can crawl, understand, and trust it. Here is what is on the table.",
      bullets: [
        "Technical SEO audit - crawl errors, indexation, redirects, canonicals, sitemap",
        "On-page SEO - titles, meta descriptions, headings, internal linking, image alt text",
        "Schema markup - Organization, LocalBusiness, Product, Article, FAQ, Breadcrumb",
        "Core Web Vitals - LCP, INP, CLS fixes for real ranking improvements",
        "Local SEO for Multan - Google Business Profile setup, local citations, NAP consistency",
        "Content structure - H1/H2/H3 hierarchy that ranks and reads well",
        "Search Console setup - verification, sitemap submission, coverage monitoring",
        "Multi-language SEO with hreflang for Urdu / English sites",
      ],
    },
    process: {
      heading: "How I work with Multan-based clients",
      body:
        "Local clients can meet in person. International clients work fully remote. The process is the same either way - clear, written, and outcome-focused.",
      bullets: [
        "Free 30 minute call - review your site live and identify the biggest 3 issues",
        "Audit - written report with prioritized fixes, effort estimates, and impact ranking",
        "Implementation - I either fix the code directly or guide your developer through it",
        "Verification - re-test in Search Console, PageSpeed Insights, and rich result tester",
        "Monthly check-in (optional) - track rankings, fix new issues, and report progress",
      ],
    },
    stack: {
      label: "SEO tools and frameworks I work with",
      items: [
        "Google Search Console",
        "Google Analytics 4",
        "Bing Webmaster Tools",
        "PageSpeed Insights",
        "Lighthouse",
        "Screaming Frog",
        "Ahrefs",
        "Schema.org",
        "Next.js",
        "React",
        "WordPress (technical only)",
        "Shopify (technical only)",
        "WooCommerce",
      ],
    },
    benefits: {
      heading: "Why choose a developer-led SEO company in Multan",
      body:
        "Most SEO agencies cannot edit the code that actually drives ranking. As a senior developer, I can. That is the difference.",
      bullets: [
        "I fix the site itself - not just keyword reports and traffic charts",
        "Local presence in Multan - meet in person if you prefer face-to-face",
        "Honest reporting - you see exactly what changed and the impact each week",
        "No long contracts - cancel any month with no penalty",
        "Bilingual - happy to work in Urdu, Punjabi, or English",
      ],
    },
    faqs: [
      {
        q: "Do you only work with Multan businesses?",
        a: "No - I am based in Multan but most of my SEO clients are remote, including agencies and SaaS founders abroad. Local clients get the bonus of in-person meetings.",
      },
      {
        q: "How long until I see ranking improvements?",
        a: "Technical fixes (Core Web Vitals, indexation, schema) often show up in Search Console within 2 to 4 weeks. Content and on-page changes typically take 8 to 12 weeks to settle.",
      },
      {
        q: "Do you build backlinks?",
        a: "I do not sell paid backlink packages. Instead I help you earn links the right way - through technical SEO that makes your site link-worthy and outreach guidance for genuine partnerships.",
      },
      {
        q: "Can you fix a WordPress or Shopify site or only custom code?",
        a: "Yes - I happily do technical SEO fixes on WordPress, WooCommerce, and Shopify sites. I focus on the technical layer (themes, schema, speed) rather than plugin shopping.",
      },
    ],
    related: ["web-consulting", "web-application-development", "dashboard-design"],
    ctaHeading: "Get a free SEO review of your Multan business website",
    ctaBody:
      "Share your URL and I will send back a short loom-style video walkthrough of the top 3 SEO problems and how to fix them - completely free.",
  },
  {
    slug: "react-development",
    keyword: "React developer, React development services, hire React developer",
    metaTitle: "React Development Services - React Developer in Multan",
    metaDescription: "Hire Muhammad Imran for expert React development services in Pakistan. Custom UI components, SPA design, and high-performance frontend.",
    h1: "Expert React Development Services - Hire a React Developer",
    intro:
      "I build fast, interactive React applications for founders and product teams. From component architecture to state management and performance optimization, I deliver React development that scales. Whether you need a new React project or want to accelerate your existing codebase, I bring senior React expertise and a focus on clean, maintainable code.",
    highlights: [
      { label: "Expertise", value: "React 18+ · Hooks · Context · SWR" },
      { label: "Speciality", value: "High-performance SPAs · Component libraries" },
      { label: "Delivery", value: "2 – 8 weeks typical" },
      { label: "Location", value: "Remote-first, based in Multan, Pakistan" },
    ],
    what: {
      heading: "What this React development service includes",
      body:
        "I build React applications the right way - starting with component architecture, state management patterns, and performance budgets. Every React project I deliver is production-ready, well-documented, and easy for your team to extend.",
      bullets: [
        "Custom React application development from scratch or integration with existing systems",
        "React component design and reusable component libraries for your team",
        "State management with Redux, Zustand, or Context API for complex applications",
        "Performance optimization - code splitting, memoization, bundle size audits",
        "React hooks best practices and modern functional component patterns",
        "Testing with Vitest, Jest, and React Testing Library for confident deployments",
        "TypeScript integration for type-safe React components and better DX",
        "SEO optimization for React apps with Next.js or static prerendering",
      ],
    },
    process: {
      heading: "React development workflow",
      body:
        "Clear communication and iterative delivery ensure your React project ships on schedule with code you love to maintain.",
      bullets: [
        "Requirements gathering - understand your React component needs and user flows",
        "Architecture design - component hierarchy, state management, and API integration patterns",
        "Development sprints - weekly builds with staging deployments for testing",
        "Code review & optimization - performance tuning and best practices implementation",
        "Handover & training - documentation so your team can confidently maintain the React codebase",
      ],
    },
    stack: {
      label: "React technologies I specialize in",
      items: ["React 18+", "TypeScript", "Vite", "Next.js", "Redux", "Zustand", "React Query", "Tailwind CSS", "Jest", "Vitest", "React Testing Library", "Framer Motion"],
    },
    benefits: {
      heading: "Why hire me as your React developer",
      body:
        "React development is more than writing components. It is about building systems that perform, scale, and remain maintainable over time.",
      bullets: [
        "Senior React expertise - 5+ years shipping production React applications",
        "Performance-first approach - every React app targets 90+ Lighthouse scores",
        "Clean, typed code - TypeScript and testing standards from day one",
        "Mentorship included - your team learns React best practices working alongside me",
        "Long-term support - optional retainer for bug fixes, enhancements, and guidance",
      ],
    },
    faqs: [
      {
        q: "Do you work with existing React codebases?",
        a: "Yes - I regularly refactor, optimize, and extend existing React applications. I start with a paid audit to understand the codebase and propose improvements.",
      },
      {
        q: "What React projects do you take on?",
        a: "From small component libraries to large single-page applications (SPAs). I work with startups on MVPs and enterprises on complex dashboard applications.",
      },
      {
        q: "Do you provide React consulting?",
        a: "Yes - I offer hourly React consulting, architecture reviews, and team mentoring. Book a call to discuss your React development needs.",
      },
      {
        q: "How do you ensure React performance?",
        a: "Through code splitting, lazy loading, memoization, bundle analysis, and Core Web Vitals monitoring. Every React project ships with a performance budget and Lighthouse scores tracked.",
      },
    ],
    related: ["next-js-development", "javascript-development", "web-application-development"],
    ctaHeading: "Start your React development project",
    ctaBody:
      "Describe your React needs - whether it is a new SPA, component library, or refactor of an existing codebase. I will provide a detailed quote and timeline.",
  },
  {
    slug: "next-js-development",
    keyword: "Next.js developer, Next.js development services, hire Next.js developer",
    metaTitle: "Next.js Development Services - Next.js Developer in PK",
    metaDescription: "Professional Next.js development services for fast, SEO-optimized web applications with server-side rendering and static generation.",
    h1: "Next.js Development Services - Build Fast, SEO-Friendly Web Apps",
    intro:
      "I build next-generation web applications with Next.js. From server-side rendering (SSR) and static site generation (SSG) to API routes and middleware, I leverage Next.js to deliver web apps that are fast, scalable, and SEO-optimized out of the box.",
    highlights: [
      { label: "Framework", value: "Next.js 14+ · App Router · Vercel" },
      { label: "Speciality", value: "SEO optimization · SSR/SSG · Performance" },
      { label: "Delivery", value: "2 – 10 weeks typical" },
      { label: "Location", value: "Remote-first, based in Multan, Pakistan" },
    ],
    what: {
      heading: "What you get from Next.js development",
      body:
        "Next.js projects I deliver are production-ready, SEO-optimized, and built for performance. You get full-stack development with React frontend, Node.js API routes, and seamless database integration - all in one framework.",
      bullets: [
        "Next.js full-stack application development with server and client components",
        "Static site generation (SSG) and incremental static regeneration (ISR) for performance",
        "Server-side rendering (SSR) for dynamic, SEO-friendly content",
        "API routes and middleware for backend logic without a separate server",
        "Database integration with Prisma, Drizzle ORM, or raw SQL",
        "Authentication and authorization with NextAuth.js, Clerk, or Auth0",
        "Image optimization with Next.js Image component for fast loading",
        "Deployment on Vercel with zero-config builds and automatic previews",
      ],
    },
    process: {
      heading: "Next.js development process",
      body:
        "Every Next.js project follows a structured path from discovery through launch, ensuring clarity at every milestone.",
      bullets: [
        "Discovery call - understand your business goals and Next.js requirements",
        "Architecture & design - plan rendering strategy (SSG, SSR, hybrid), API structure, and data flow",
        "Development with weekly demos - build features incrementally and get feedback fast",
        "Performance audit - optimize images, bundle size, and Core Web Vitals before launch",
        "Deployment & monitoring - launch to production with analytics and error tracking setup",
      ],
    },
    stack: {
      label: "Next.js technologies I use",
      items: ["Next.js 14+", "React 18", "TypeScript", "Prisma", "Drizzle ORM", "PostgreSQL", "MongoDB", "Tailwind CSS", "Vercel", "NextAuth.js", "Clerk", "SWR"],
    },
    benefits: {
      heading: "Why choose me for Next.js development",
      body:
        "Next.js is powerful, but getting it right requires experience. I handle the full Next.js stack so you can focus on your business.",
      bullets: [
        "SEO-first by default - every Next.js app ships with proper meta tags, structured data, and sitemap",
        "Performance optimized - images lazy-loaded, code split by route, and assets cached",
        "Full-stack expertise - frontend UI to backend API to database, all in Next.js",
        "Vercel-native deployment - instant previews, automatic deploys, and built-in monitoring",
        "Future-proof code - modern Next.js patterns (server components, hooks) that scale",
      ],
    },
    faqs: [
      {
        q: "Should I use Next.js or just React?",
        a: "Next.js is best for SEO-critical apps, content sites, and projects needing server-side logic. Use React for internal dashboards or tools where SEO does not matter.",
      },
      {
        q: "Can you migrate from React to Next.js?",
        a: "Yes - many of my projects start as React SPAs that I gradually migrate to Next.js to improve performance and SEO. This can happen incrementally without downtime.",
      },
      {
        q: "What is server-side rendering (SSR) vs static generation (SSG)?",
        a: "SSG is fast and cheap - pages are pre-built at deploy time. SSR is flexible - pages render per request. I help you choose the right mix for each route.",
      },
      {
        q: "How much does Next.js deployment cost?",
        a: "Vercel's free tier covers most projects. Paid plans start at $20/month. Next.js can also run on AWS, DigitalOcean, or self-hosted servers at lower cost.",
      },
    ],
    related: ["react-development", "javascript-development", "web-application-development"],
    ctaHeading: "Launch your Next.js application",
    ctaBody:
      "Share your idea or project requirements. Whether you need a new Next.js build or help scaling an existing app, let us discuss the right approach.",
  },
  {
    slug: "nodejs-backend-development",
    keyword: "Node.js developer, Node.js backend development, hire Node.js developer",
    metaTitle: "Node.js Backend Development - Hire Node.js Developer",
    metaDescription: "Scalable Node.js backend development services. Design secure REST APIs, real-time database integrations, and robust server architectures.",
    h1: "Node.js Backend Development - Build Scalable Server Applications",
    intro:
      "I build robust Node.js backends that power modern web applications. From RESTful APIs to real-time servers to microservices, I deliver Node.js solutions that are fast, secure, and built to scale. Every project includes authentication, error handling, logging, and monitoring from day one.",
    highlights: [
      { label: "Runtime", value: "Node.js 18+ · Express · TypeScript" },
      { label: "Speciality", value: "REST APIs · Real-time · Microservices" },
      { label: "Databases", value: "PostgreSQL · MongoDB · Redis" },
      { label: "Location", value: "Remote-first, based in Multan, Pakistan" },
    ],
    what: {
      heading: "What Node.js backend services I provide",
      body:
        "I build production-grade Node.js backends that handle real-world complexity - authentication, rate limiting, error handling, logging, and monitoring are built in, not added as afterthoughts.",
      bullets: [
        "RESTful API design with Express, Fastify, or Koa following OpenAPI standards",
        "GraphQL API development with Apollo Server or similar for flexible data fetching",
        "Database design and ORM integration with Prisma, Drizzle, or Sequelize",
        "Authentication and authorization with JWT, OAuth2, or session-based strategies",
        "Real-time features with WebSockets, Server-Sent Events, or Socket.io",
        "Job queues and background tasks with Bull, RabbitMQ, or similar",
        "File uploads and cloud storage integration (AWS S3, Cloudinary)",
        "Payment processing integration (Stripe, PayPal APIs) with webhook handling",
      ],
    },
    process: {
      heading: "Node.js backend development workflow",
      body:
        "Clear API contracts and iterative development keep your Node.js backend project on track and well-tested.",
      bullets: [
        "API design & documentation - define endpoints, data schemas, and error responses upfront",
        "Database modeling - normalize schema, plan indices, and optimize queries",
        "Backend implementation - build endpoints with proper validation, error handling, and logging",
        "Testing & security - unit tests, integration tests, and security best practices",
        "Deployment & monitoring - setup monitoring, error tracking, and performance alerts",
      ],
    },
    stack: {
      label: "Node.js & backend technologies I use",
      items: ["Node.js", "Express", "TypeScript", "Prisma", "Drizzle ORM", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "JWT", "Docker", "AWS", "Vercel"],
    },
    benefits: {
      heading: "Why hire me for Node.js backend development",
      body:
        "Node.js backends I build are not just functional - they are maintainable, testable, and ready to scale with your business.",
      bullets: [
        "Full-stack understanding - I know both frontend and backend, so APIs integrate smoothly",
        "Production-ready from day one - error handling, logging, monitoring, and security included",
        "TypeScript expertise - type-safe Node.js code that catches bugs before production",
        "Optimized queries - database design and query optimization for performance",
        "Scalability planned - architecture that grows from MVP to enterprise without rewrites",
      ],
    },
    faqs: [
      {
        q: "Do you work with existing Node.js codebases?",
        a: "Yes - I audit, refactor, and optimize existing Node.js backends. Common work includes performance tuning, security hardening, and adding new features.",
      },
      {
        q: "REST API or GraphQL - which should I use?",
        a: "REST is simpler and proven. GraphQL is more flexible for mobile and complex data needs. I help you choose based on your use case and team skill.",
      },
      {
        q: "How do you handle authentication?",
        a: "I implement JWT tokens, OAuth2 flows, or session-based auth depending on your needs. All approaches include rate limiting, refresh token rotation, and secure password handling.",
      },
      {
        q: "What databases do you recommend?",
        a: "PostgreSQL for relational data, MongoDB for flexible schemas, and Redis for caching/sessions. I choose based on your data model and query patterns.",
      },
    ],
    related: ["web-application-development", "javascript-development", "database-design"],
    ctaHeading: "Build your Node.js backend",
    ctaBody:
      "Share your API requirements or backend architecture needs. I will provide a detailed plan, timeline, and estimate for your Node.js project.",
  },
  {
    slug: "database-design",
    keyword: "database design, database architecture, data modeling",
    metaTitle: "Database Design and Architecture Services - PK Expert",
    metaDescription: "Expert database design, query optimization, and schema modeling services for PostgreSQL and MongoDB. Scale your backend efficiently.",
    h1: "Database Design & Architecture Services",
    intro:
      "A well-designed database is the foundation of a fast, scalable application. I design databases that perform, scale, and remain maintainable as your business grows. From schema design to query optimization to migration planning, I bring database architecture expertise to every project.",
    highlights: [
      { label: "Databases", value: "PostgreSQL · MongoDB · Redis" },
      { label: "Speciality", value: "Schema design · Query optimization · Scaling" },
      { label: "Format", value: "Consultation · Design · Implementation" },
      { label: "Location", value: "Remote-first, based in Multan, Pakistan" },
    ],
    what: {
      heading: "Database design services I provide",
      body:
        "I design databases that start lean and scale without restructuring. Proper normalization, indexing strategy, and query patterns avoid the costly rewrites that plague growing applications.",
      bullets: [
        "Entity-relationship (ER) modeling and schema normalization for PostgreSQL and MySQL",
        "NoSQL schema design for MongoDB with document structure optimization",
        "Index strategy and query optimization for fast, efficient data retrieval",
        "Scaling patterns - sharding, replication, read replicas for high-traffic applications",
        "Data migration planning for moving between databases or restructuring existing schemas",
        "Backup and disaster recovery strategy to protect critical data",
        "Performance monitoring and query analysis to identify bottlenecks",
        "ORM selection and implementation (Prisma, Drizzle, Sequelize) tailored to your schema",
      ],
    },
    process: {
      heading: "Database design process",
      body:
        "Database architecture decisions early prevent expensive refactoring later. My process is thorough and collaborative.",
      bullets: [
        "Requirements gathering - understand data types, access patterns, and growth projections",
        "Schema design - create normalized, efficient schema with proper relationships",
        "Query optimization - plan indices and query patterns for performance",
        "Scaling strategy - design for growth without denormalization or rewrites",
        "Implementation & monitoring - build schema, setup monitoring, and optimize as needed",
      ],
    },
    stack: {
      label: "Database technologies I specialize in",
      items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Drizzle ORM", "Prisma", "SQL optimization", "Index strategy", "Replication", "Backup/Recovery"],
    },
    benefits: {
      heading: "Why invest in proper database design",
      body:
        "Good database architecture is invisible to users but critical for performance. Invest early to avoid costly rewrites later.",
      bullets: [
        "Performance by design - proper schema and indices mean faster queries from day one",
        "Scalability - architecture that handles growth without restructuring",
        "Maintainability - clear, normalized schemas that your team understands",
        "Cost efficiency - optimized queries mean lower cloud infrastructure bills",
        "Data integrity - proper relationships and constraints prevent data corruption",
      ],
    },
    faqs: [
      {
        q: "PostgreSQL or MongoDB - which should I use?",
        a: "PostgreSQL for structured data, complex queries, and ACID requirements. MongoDB for flexible schemas, rapid prototyping, and document-based data.",
      },
      {
        q: "How do I know if my database is optimized?",
        a: "Slow queries, high CPU usage, and growing storage are warning signs. I provide an audit with specific recommendations for improvement.",
      },
      {
        q: "What is database normalization?",
        a: "Normalization removes data redundancy and improves query efficiency. I design schemas that balance normalization with query performance.",
      },
      {
        q: "How much should I scale my database?",
        a: "I analyze your traffic projections, data growth, and access patterns to recommend the right infrastructure - never over-provisioned.",
      },
    ],
    related: ["nodejs-backend-development", "web-application-development", "web-consulting"],
    ctaHeading: "Design your database properly",
    ctaBody:
      "Share your data requirements or existing schema. I will review, suggest improvements, and provide a design that scales with your business.",
  },
  {
    slug: "full-stack-development",
    keyword: "full-stack developer, full-stack development services, hire full-stack developer",
    metaTitle: "Full-Stack Development Services - MERN Stack Expert PK",
    metaDescription: "Custom full-stack web development services using the MERN stack. Build production-grade, end-to-end applications from scratch.",
    h1: "Full-Stack Development Services - From Frontend to Backend & Database",
    intro:
      "I build complete web applications from the ground up. Full-stack projects I deliver include responsive user interfaces, robust backend APIs, optimized databases, and production deployment. You get one engineer who owns the entire stack, eliminating handoff delays and ensuring everything works together seamlessly.",
    highlights: [
      { label: "Stack", value: "React · Next.js · Node.js · PostgreSQL" },
      { label: "Scope", value: "Complete applications, start to finish" },
      { label: "Delivery", value: "4 – 12 weeks depending on complexity" },
      { label: "Location", value: "Remote-first, based in Multan, Pakistan" },
    ],
    what: {
      heading: "What full-stack development covers",
      body:
        "I build entire applications - user interface, backend logic, database, and deployment. Every component is production-ready, secure, and optimized. You get one accountable engineer for the whole project, not multiple handoffs between specialists.",
      bullets: [
        "Frontend development with React or Next.js for responsive, interactive user interfaces",
        "Backend API development with Node.js and Express for reliable, scalable business logic",
        "Database design and optimization with PostgreSQL or MongoDB",
        "Authentication and authorization for secure user management",
        "Payment integration (Stripe), email services, and third-party APIs",
        "Deployment on Vercel, AWS, or self-hosted infrastructure",
        "Performance optimization across frontend, backend, and database",
        "Monitoring and logging to track application health and user behavior",
      ],
    },
    process: {
      heading: "Full-stack development workflow",
      body:
        "Clear milestones and regular communication keep your full-stack project on track from kickoff to launch.",
      bullets: [
        "Discovery & planning - understand your goals, users, and constraints",
        "Architecture & design - plan frontend, backend, database, and API contracts",
        "Sprint-based development - build features incrementally with weekly demos",
        "Integration & testing - ensure all components work together correctly",
        "Launch & monitoring - deploy to production and setup monitoring for reliability",
      ],
    },
    stack: {
      label: "Full-stack technologies I work with",
      items: ["React", "Next.js", "Node.js", "Express", "TypeScript", "PostgreSQL", "MongoDB", "Prisma", "Tailwind CSS", "Vercel", "AWS", "Docker"],
    },
    benefits: {
      heading: "Why choose a full-stack developer",
      body:
        "Full-stack development by one engineer means fewer handoffs, clearer communication, and applications that actually work together.",
      bullets: [
        "No miscommunication between frontend and backend teams - one engineer owns the whole system",
        "Faster development - no waiting for other teams, decisions made quickly",
        "Better UX/DX integration - API design matches what the frontend needs, not the other way around",
        "End-to-end accountability - bugs are fixed by whoever built the system",
        "Lower cost - pay one senior engineer instead of multiple specialists",
      ],
    },
    faqs: [
      {
        q: "How is full-stack different from hiring a frontend and backend engineer?",
        a: "One engineer eliminates handoffs and communication delays. I own the entire project, from API design to UI polish to database optimization. This speeds up development and reduces mistakes from miscommunication.",
      },
      {
        q: "Can I start full-stack and add more developers later?",
        a: "Yes - I build codebases that are clean, well-documented, and easy for others to extend. You can add team members as the project grows.",
      },
      {
        q: "What if my project needs specialists?",
        a: "For complex projects (large teams, DevOps, mobile), I assemble a small trusted team and lead delivery personally. Most projects stay with one engineer.",
      },
      {
        q: "Do you provide full-stack support after launch?",
        a: "Yes - optional retainer for bug fixes, feature additions, and scaling guidance. Many clients keep me on part-time after launch.",
      },
    ],
    related: ["web-application-development", "react-development", "nodejs-backend-development"],
    ctaHeading: "Start your full-stack project",
    ctaBody:
      "Share your idea or business needs. Whether you need an MVP or a full-featured application, I will scope it out and provide a clear timeline and investment.",
  },
  {
    slug: "javascript-development",
    keyword: "JavaScript developer, JavaScript development services, hire JavaScript developer",
    metaTitle: "JavaScript Development Services - JS Expert Developer",
    metaDescription: "Professional JavaScript development services. Build dynamic web interfaces, complex logic, and fast applications using modern JS ES6+.",
    h1: "JavaScript Development Services - Modern JavaScript Expert",
    intro:
      "I build applications with modern JavaScript. Whether it is frontend development with React, backend services with Node.js, or full-stack applications, JavaScript is at the core. I bring expertise in ES6+, TypeScript, async patterns, and JavaScript best practices to every project.",
    highlights: [
      { label: "Version", value: "ES6+ · JavaScript (modern) · TypeScript" },
      { label: "Speciality", value: "Frontend · Backend · Full-stack" },
      { label: "Deployment", value: "Vercel · AWS · Self-hosted" },
      { label: "Location", value: "Remote-first, based in Multan, Pakistan" },
    ],
    what: {
      heading: "JavaScript development services I offer",
      body:
        "Modern JavaScript powers applications across web, mobile, and backend. I bring mastery of JavaScript fundamentals, frameworks, and tooling to deliver clean, efficient applications.",
      bullets: [
        "Frontend JavaScript with React, Vue, or vanilla JavaScript for interactive user interfaces",
        "Backend JavaScript with Node.js for server-side logic and APIs",
        "Async JavaScript patterns - promises, async/await, event handling, streams",
        "TypeScript integration for type-safe JavaScript across frontend and backend",
        "JavaScript testing with Jest, Vitest, and Mocha for reliable, tested code",
        "Module bundling and optimization with Vite, Webpack, and esbuild",
        "ES6+ features - arrow functions, destructuring, spread operators, classes, modules",
        "Package management with npm, yarn, or pnpm and dependency optimization",
      ],
    },
    process: {
      heading: "JavaScript development approach",
      body:
        "Clean, maintainable JavaScript is built on solid fundamentals and clear communication. Every project follows the same proven workflow.",
      bullets: [
        "Requirement analysis - understand JavaScript needs and project scope",
        "Architecture & design - plan JavaScript structure, tooling, and dependencies",
        "Development with testing - write tested, clean JavaScript code incrementally",
        "Code review & optimization - performance tuning and JavaScript best practices",
        "Deployment & monitoring - launch JavaScript application and setup monitoring",
      ],
    },
    stack: {
      label: "JavaScript technologies and tools",
      items: ["JavaScript (ES6+)", "TypeScript", "Node.js", "React", "Next.js", "Vite", "Webpack", "Jest", "Vitest", "npm", "yarn", "Express"],
    },
    benefits: {
      heading: "Why hire me for JavaScript development",
      body:
        "JavaScript expertise goes beyond syntax - it is about understanding async patterns, performance optimization, and building maintainable systems.",
      bullets: [
        "Deep JavaScript knowledge - ES6+ features, async patterns, closures, prototypes",
        "Full-stack capability - JavaScript on frontend and backend for cohesive applications",
        "Performance optimized - bundle size analysis, lazy loading, and efficient async code",
        "Type safety - TypeScript integration to catch errors before runtime",
        "Testing focus - well-tested JavaScript code that works reliably in production",
      ],
    },
    faqs: [
      {
        q: "What is the difference between JavaScript and TypeScript?",
        a: "JavaScript is flexible but error-prone. TypeScript adds type checking to catch bugs early. I use TypeScript for production applications and JavaScript for rapid prototyping.",
      },
      {
        q: "Should I learn JavaScript or jump to a framework?",
        a: "Learn JavaScript fundamentals first - then frameworks like React are much easier. I can mentor your team on core JavaScript concepts.",
      },
      {
        q: "What about legacy JavaScript (ES5)?",
        a: "I work with legacy code and gradually modernize it. Can add ES6+, modules, and modern tooling to existing JavaScript applications.",
      },
      {
        q: "How do you keep JavaScript performant?",
        a: "Through bundle analysis, code splitting, efficient algorithms, and proper async patterns. Every JavaScript project targets performance from day one.",
      },
    ],
    related: ["react-development", "nodejs-backend-development", "full-stack-development"],
    ctaHeading: "Build your JavaScript project",
    ctaBody:
      "From single-page applications to backend services, modern JavaScript can power your idea. Describe what you are building and I will propose the right JavaScript stack.",
  },
];

export const SERVICES_INDEX_META = {
  metaTitle: "Web Development Services - React and MERN Stack Developer",
  metaDescription: "Web development services by Muhammad Imran in Multan, Pakistan. Specializing in custom React, Next.js, and MERN stack web applications.",
  h1: "Web Development Services in Multan, Pakistan - Hire a Web Developer",
  intro:
    "I deliver professional web development services as an independent senior engineer based in Multan, Pakistan. As an expert web developer, React specialist, MERN Stack developer, and Next.js expert - I provide custom web applications and full-stack software development solutions to startups, agencies, and enterprises across Multan, Pakistan, and globally. Every web development project is delivered by me personally with no middlemen or junior hand-offs - just professional quality code.",
};

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
