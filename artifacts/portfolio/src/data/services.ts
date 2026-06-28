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
    metaTitle: "Web Application Development & Expert Web Development Services | Muhammad Imran",
    metaDescription:
      "Expert web development services and web application development in Multan & Pakistan. Specializing in React, Next.js, Node.js & MERN Stack for startups and enterprises. Professional software developer providing custom web development solutions.",
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
        "Discovery — 30 to 60 minute call to understand the goal, users, and constraints",
        "Scope & quote — written proposal with milestones, fixed pricing, and a delivery date",
        "Architecture — data model, API contract, and UI flows agreed before any code is written",
        "Build — weekly demos on a staging URL, you can click and test every Friday",
        "Launch & care — production deploy, monitoring, documentation, and an optional retainer",
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
        "One senior engineer responsible for the whole stack — no agency middle layer",
        "Typed, tested code with sensible documentation, not throwaway prototypes",
        "Honest weekly reporting so you always know status and remaining budget",
        "Performance budgets enforced from day one — Lighthouse scores above 90 on launch",
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
        a: "Yes — most of my clients are founders or product owners. I translate business goals into technical scope, and I never hide behind jargon in status calls.",
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
    metaTitle: "Web Consulting Service — Independent Senior Engineer & Advisor",
    metaDescription:
      "Independent web consulting service for founders & product teams. Architecture reviews, tech audits, MERN guidance & senior engineering advice — book a session.",
    h1: "Web Consulting Service for Founders & Product Teams",
    intro:
      "Looking for an honest, independent web consulting service? I help founders and product teams make better technology decisions — from picking the right stack and architecture, to fixing slow apps, to planning a clean rewrite. No agency overhead, no upsells, just senior engineering judgment.",
    highlights: [
      { label: "Format", value: "1:1 calls, audits, written reports" },
      { label: "Engagement", value: "Hourly · Fixed-scope · Monthly retainer" },
      { label: "Speciality", value: "React, Node.js, MERN, SaaS architecture" },
      { label: "Turnaround", value: "Calls within the same week" },
    ],
    what: {
      heading: "What this web consulting service covers",
      body:
        "I work with three groups: solo founders who need a technical sanity check, product teams that want a second opinion on architecture, and agencies that need senior backup on a tough project. Whatever the size, the goal is the same — give you the clearest possible picture of your options and the right next step.",
      bullets: [
        "Tech stack selection — React vs Next.js, MongoDB vs PostgreSQL, monolith vs microservices",
        "Architecture review of an existing web app, with a written report and prioritized fixes",
        "Performance audits — Core Web Vitals, bundle analysis, render bottlenecks, database queries",
        "Code reviews of pull requests or full repositories with practical, kind feedback",
        "Hiring help — technical interviews, take-home review, and offer guidance",
        "Roadmap planning — quarter-by-quarter engineering plan tied to business goals",
        "Vendor and tool selection (auth, payments, hosting, observability)",
      ],
    },
    process: {
      heading: "How a typical web consulting engagement works",
      body:
        "Every consulting engagement is structured so you get value from the very first hour. No long discovery phases, no surprise invoices.",
      bullets: [
        "Intake — short questionnaire so I arrive prepared and ready to dive in",
        "Working session — focused 60 to 90 minute call where we go deep on your problem",
        "Written summary — bullet-point notes, recommended actions, and links within 48 hours",
        "Optional follow-up — async Slack or email support, or a monthly retainer for ongoing advice",
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
        "No upsell — if the answer is to hire in-house instead of outsourcing, I will say so",
        "Plain-English advice that non-technical founders and CEOs can act on directly",
        "Vendor-neutral recommendations based on your scale, budget, and team",
        "Written deliverables so you can share decisions with investors or your board",
        "Same-week availability — most discovery calls happen within 3 to 5 days",
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
        a: "Sometimes. If the work is a good fit I am happy to quote for delivery. There is never any pressure — many consulting clients implement my recommendations with their own team.",
      },
      {
        q: "Is this web consultancy services offering remote-only?",
        a: "Yes, I work remotely with clients globally. Calls happen on Google Meet or Zoom, and written work is delivered in Notion, Google Docs, or Markdown — your choice.",
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
    metaTitle: "Dashboard Design Services — Custom Admin & Analytics UI",
    metaDescription:
      "Dashboard design services for SaaS, internal tools & analytics platforms. Clean, fast, accessible admin UIs built with React, Tailwind & charting libraries.",
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
        "These dashboard designing services cover the full lifecycle — from understanding the metric your users care about, to a production-ready interface running on your domain. You can hire me for design only, build only, or both.",
      bullets: [
        "Information architecture — what belongs on the dashboard and what does not",
        "Wireframes and high-fidelity Figma mockups in light and dark mode",
        "Custom dashboard UI built with React, Tailwind, and a charting library you trust",
        "Charts, tables, KPI cards, filters, segments, and saved views",
        "Realtime data via WebSockets, polling, or server-sent events",
        "CSV / Excel export, PDF report generation, and email digests",
        "Role-based access so admins, managers, and viewers each see the right slice",
        "Mobile and tablet layouts — every dashboard I ship works on phones",
      ],
    },
    process: {
      heading: "How my dashboard design and build process works",
      body:
        "Good dashboards come from a tight loop between design, data, and feedback. Here is how I run that loop.",
      bullets: [
        "Workshop — 60 minute call to map the metrics, users, and decisions the dashboard supports",
        "Information architecture — sketches and a one-page layout plan within 3 days",
        "Hi-fi design — clickable Figma in week one, two rounds of revisions included",
        "Build — production React code with sample data, deployed to a staging URL",
        "Data wiring — connect to your real API, queue, or warehouse",
        "Polish & launch — accessibility pass, performance budget, then production deploy",
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
        "Single accountable engineer — no design / dev handoff lost in translation",
        "Pixel-faithful builds — what you approve in Figma is what ships in React",
        "Real performance — lazy loaded charts, virtualized tables, sub-second filters",
        "Accessible by default — keyboard navigation, contrast, and ARIA done right",
        "Fully owned codebase — no vendor lock-in, no per-seat pricing on the UI",
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
    metaTitle: "Executive Dashboards by a Senior Web Development Engineer",
    metaDescription:
      "Need web development agencies with executive dashboards? Hire one senior engineer who designs & builds C-suite KPI dashboards in React, Next.js, TypeScript.",
    h1: "Executive Dashboards by a Senior Web Development Engineer",
    intro:
      "Searching for web development agencies with executive dashboards in their portfolio? You can hire one accountable senior engineer instead. I design and build C-suite KPI dashboards — the kind founders, CEOs, and board members actually open before their morning coffee. Real metrics, fast load times, and a layout that respects the reader's time.",
    highlights: [
      { label: "Audience", value: "Founders · CEOs · CFOs · Board members" },
      { label: "Output", value: "Web dashboard + scheduled PDF / email digest" },
      { label: "Source data", value: "Postgres, MongoDB, Stripe, GA4, warehouses" },
      { label: "Delivery", value: "First version live in 3 to 4 weeks" },
    ],
    what: {
      heading: "What an executive dashboard from me actually looks like",
      body:
        "Most agency dashboards are a wall of charts that nobody reads. An executive dashboard should answer three questions in under ten seconds — what changed, why, and what to do next. Here is how I design for that.",
      bullets: [
        "One-screen overview — the 6 to 10 KPIs your leadership team actually tracks",
        "Trend lines, deltas, and threshold alerts so changes jump off the page",
        "Drill-down views for finance, growth, product, and operations",
        "Annotations — leave notes on spikes and dips so context lives with the data",
        "Scheduled email digest each Monday morning with the same KPIs in plain text",
        "PDF export for board packs, with cover page and your branding",
        "Role-based access — execs see the summary, analysts see the raw data",
      ],
    },
    process: {
      heading: "How I build executive dashboards (faster than most agencies)",
      body:
        "Agencies typically need 8 to 12 weeks because work passes between strategists, designers, frontenders, and backenders. I compress that to 3 to 4 weeks because one engineer owns the whole pipeline.",
      bullets: [
        "Metrics workshop — 90 minute call with the leadership team to choose KPIs",
        "Data audit — confirm where each metric lives (database, Stripe, GA4, warehouse)",
        "Wireframe — a single-page layout plan approved before any code",
        "Build — React + TypeScript dashboard on a staging URL inside week 2",
        "Wire real data — secure API integration, caching, and freshness indicators",
        "Polish — print styles, PDF export, scheduled email, mobile read-only view",
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
        "Direct line to the engineer — no project manager forwarding messages",
        "Lower cost — no agency margin, no junior staff billed at senior rates",
        "Faster delivery — 3 to 4 weeks instead of 3 to 4 months",
        "Honest data — every chart shows source, freshness, and last refresh time",
        "Yours forever — full source code, no monthly platform fee, no lock-in",
      ],
    },
    faqs: [
      {
        q: "Can you connect to our existing data warehouse?",
        a: "Yes. I have shipped executive dashboards backed by PostgreSQL, MongoDB, BigQuery, and Snowflake. If your data lives in a CSV or a Google Sheet today, I can start there too.",
      },
      {
        q: "Will the dashboard be hosted by you or by us?",
        a: "Your choice. By default I deploy to Vercel or your preferred cloud under your domain. You own every piece — code, hosting, and credentials.",
      },
      {
        q: "Do you offer ongoing maintenance after launch?",
        a: "Yes — most clients add a small monthly retainer for KPI changes, new charts, and bug fixes. It is genuinely optional and you can cancel any month.",
      },
      {
        q: "How is this different from BI tools like Metabase or Looker?",
        a: "BI tools are general-purpose. A custom executive dashboard is shaped exactly to your business — the labels, the math, the comparisons, the design — so leadership trusts it on first read. They also run far faster because they only render what your team needs.",
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
    metaTitle: "SEO Company in Multan — Web Developer & Technical SEO Expert",
    metaDescription:
      "Looking for a reliable SEO company in Multan? Get on-page SEO, technical audits, schema markup & Core Web Vitals fixes from a local senior web developer.",
    h1: "SEO Company in Multan — Built by a Local Web Developer",
    intro:
      "I am Muhammad Imran, a senior web developer based in Multan, Pakistan offering technical SEO services to local businesses, agencies, and online stores. If you are searching for an honest SEO company in Multan that actually understands code, you are in the right place. No spammy backlinks, no monthly retainer that hides the work — just real, technical SEO that helps your site rank.",
    highlights: [
      { label: "Location", value: "Multan, Pakistan — local meetings welcome" },
      { label: "Focus", value: "Technical & on-page SEO" },
      { label: "Engagement", value: "One-off audits or monthly retainer" },
      { label: "Languages", value: "English, Urdu, Punjabi" },
    ],
    what: {
      heading: "What this Multan SEO service covers",
      body:
        "Most SEO agencies sell links and rank tracking. I sell the kind of SEO work that compounds — fixing the site itself so Google can crawl, understand, and trust it. Here is what is on the table.",
      bullets: [
        "Technical SEO audit — crawl errors, indexation, redirects, canonicals, sitemap",
        "On-page SEO — titles, meta descriptions, headings, internal linking, image alt text",
        "Schema markup — Organization, LocalBusiness, Product, Article, FAQ, Breadcrumb",
        "Core Web Vitals — LCP, INP, CLS fixes for real ranking improvements",
        "Local SEO for Multan — Google Business Profile setup, local citations, NAP consistency",
        "Content structure — H1/H2/H3 hierarchy that ranks and reads well",
        "Search Console setup — verification, sitemap submission, coverage monitoring",
        "Multi-language SEO with hreflang for Urdu / English sites",
      ],
    },
    process: {
      heading: "How I work with Multan-based clients",
      body:
        "Local clients can meet in person. International clients work fully remote. The process is the same either way — clear, written, and outcome-focused.",
      bullets: [
        "Free 30 minute call — review your site live and identify the biggest 3 issues",
        "Audit — written report with prioritized fixes, effort estimates, and impact ranking",
        "Implementation — I either fix the code directly or guide your developer through it",
        "Verification — re-test in Search Console, PageSpeed Insights, and rich result tester",
        "Monthly check-in (optional) — track rankings, fix new issues, and report progress",
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
        "I fix the site itself — not just keyword reports and traffic charts",
        "Local presence in Multan — meet in person if you prefer face-to-face",
        "Honest reporting — you see exactly what changed and the impact each week",
        "No long contracts — cancel any month with no penalty",
        "Bilingual — happy to work in Urdu, Punjabi, or English",
      ],
    },
    faqs: [
      {
        q: "Do you only work with Multan businesses?",
        a: "No — I am based in Multan but most of my SEO clients are remote, including agencies and SaaS founders abroad. Local clients get the bonus of in-person meetings.",
      },
      {
        q: "How long until I see ranking improvements?",
        a: "Technical fixes (Core Web Vitals, indexation, schema) often show up in Search Console within 2 to 4 weeks. Content and on-page changes typically take 8 to 12 weeks to settle.",
      },
      {
        q: "Do you build backlinks?",
        a: "I do not sell paid backlink packages. Instead I help you earn links the right way — through technical SEO that makes your site link-worthy and outreach guidance for genuine partnerships.",
      },
      {
        q: "Can you fix a WordPress or Shopify site or only custom code?",
        a: "Yes — I happily do technical SEO fixes on WordPress, WooCommerce, and Shopify sites. I focus on the technical layer (themes, schema, speed) rather than plugin shopping.",
      },
    ],
    related: ["web-consulting", "web-application-development", "dashboard-design"],
    ctaHeading: "Get a free SEO review of your Multan business website",
    ctaBody:
      "Share your URL and I will send back a short loom-style video walkthrough of the top 3 SEO problems and how to fix them — completely free.",
  },
];

export const SERVICES_INDEX_META = {
  metaTitle: "Web Development Services in Multan, Pakistan | React, MERN, Next.js Developer",
  metaDescription:
    "Professional web development services in Multan, Pakistan by Muhammad Imran. Expert React developer, MERN Stack specialist, and Next.js expert offering custom web app development, full-stack solutions, consulting, and technical expertise for startups and businesses.",
  h1: "Web Development Services in Multan, Pakistan — Hire a Web Developer",
  intro:
    "I deliver professional web development services as an independent senior engineer based in Multan, Pakistan. As an expert web developer, React specialist, MERN Stack developer, and Next.js expert — I provide custom web applications and full-stack software development solutions to startups, agencies, and enterprises across Multan, Pakistan, and globally. Every web development project is delivered by me personally with no middlemen or junior hand-offs — just professional quality code.",
};

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
