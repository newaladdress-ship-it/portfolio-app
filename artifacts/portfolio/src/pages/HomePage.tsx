import React from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { PERSONAL, PROJECTS } from "@/data/personal";
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb,
  SiJavascript, SiTypescript, SiTailwindcss,
  SiFirebase, SiHtml5, SiCss
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import {
  MapPin, ArrowRight, Code2, CheckCircle2,
  Layers, Rocket, Search, Building2,
  Stethoscope, Store,
  GraduationCap, ChevronDown, ChevronUp, Mail, Phone, ExternalLink, MessageSquare,
  Zap, Smartphone, Briefcase, Wrench, LayoutGrid, Sparkles
} from "lucide-react";

const BASE_URL = "https://www.imrandigitals.online";
const OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

/* ---------------- JSON-LD structured data ---------------- */

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Imran",
  jobTitle: "Web Developer & Web Application Specialist",
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
    "Muhammad Imran is a full stack web developer in Multan building fast, reliable websites and MERN stack web apps for businesses and startups.",
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

const ACCENT = "#fbe400";

/* ---------------- FAQ Items Data (Section 12) ---------------- */

const FAQ_ITEMS = [
  {
    q: "Who is the best web developer in Multan for small businesses?",
    a: "That depends on your budget and project type, but for businesses that want a developer who handles both the build and the SEO side without hiring a separate agency, I offer that combination directly, based in Multan.",
  },
  {
    q: "How much does it cost to hire a web developer in Multan?",
    a: "Pricing depends on project scope — a simple business website costs far less than a custom web application. I offer competitive, transparent pricing for local and remote clients; message me for a free quote based on your specific requirements.",
  },
  {
    q: "Do you build websites for clients outside Multan or Pakistan?",
    a: "Yes. While I'm based in Multan, I work remotely with clients across Pakistan and internationally, communicating over calls, WhatsApp, or email depending on what works best for you.",
  },
  {
    q: "What is the cheapest way to get a professional website built?",
    a: "The cheapest reliable option is usually a developer working directly with you rather than through an agency markup — which is how I price my projects — combined with a clear, fixed scope so there's no costly scope creep later.",
  },
  {
    q: "Do you only build with WordPress, or can you build custom websites?",
    a: "I specialize in custom-coded websites and applications using React, Next.js, and the MERN stack — not WordPress templates — which means faster load times and more flexibility as your business grows.",
  },
  {
    q: "Can you redesign my existing slow or outdated website?",
    a: "Yes. I audit the current site, identify what's causing slow load times or poor rankings, and rebuild it with modern, optimized code.",
  },
  {
    q: "Do you provide SEO services along with development?",
    a: "Yes. Technical SEO and local SEO are part of my core services, and I build every site with SEO fundamentals in place from the start rather than treating it as a separate add-on.",
  },
  {
    q: "How long does it take to build a website?",
    a: "A standard business website typically takes 1–2 weeks. Custom web applications or SaaS builds take longer depending on complexity — you'll get a specific timeline after the discovery call.",
  },
  {
    q: "Can you build a web app with AI features?",
    a: "Yes. I integrate AI capabilities — chatbots, automation, content tools — into web applications for clients who want features beyond a standard site.",
  },
  {
    q: "Do you build Chrome extensions too?",
    a: "Yes, alongside web development, I build custom Chrome extensions for productivity tools and SaaS companion products.",
  },
  {
    q: "Will my website work properly on mobile phones?",
    a: "Every site I build is mobile-first and tested across devices before launch — mobile performance directly affects both user experience and Google rankings.",
  },
  {
    q: "Do you offer website maintenance after the project is finished?",
    a: "Yes, ongoing maintenance and support packages are available for clients who want updates and fixes handled without hiring someone new each time.",
  },
  {
    q: "What makes you different from other freelance developers in Pakistan?",
    a: "I combine development, design judgment, and technical SEO in one person, which most freelancers don't offer together — and I prioritize direct communication over disappearing after a deposit.",
  },
  {
    q: "Can I see examples of your previous work?",
    a: "Yes, a selection of projects is featured on this site with more detailed case studies on the Projects page.",
  },
  {
    q: "How do I get started working with you?",
    a: "Message me through the contact form or WhatsApp with a short description of your project, and I'll respond with next steps and a free quote — usually within 24 hours.",
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

/* ---------------- Services Data (Section 5) ---------------- */

const SERVICES_DATA = [
  {
    title: "Business & Company Websites",
    desc: "For shops, clinics, real estate agencies, and service businesses in Multan and across Pakistan who need a site that generates calls and inquiries, not just looks good in a portfolio.",
    problems: "slow WordPress sites, non-mobile-friendly designs, no local search visibility.",
    idealFor: "small business owners, local service providers, agencies needing client sites.",
    Icon: Building2,
    colorClass: "text-yellow-500",
  },
  {
    title: "MERN Stack Web Applications",
    desc: "Full custom applications built on MongoDB, Express, React, and Node — for businesses that have outgrown template websites and need real functionality: logins, dashboards, custom workflows.",
    problems: "rigid no-code platforms that can't scale, disconnected systems that don't talk to each other.",
    idealFor: "startups, internal business tools, custom client portals.",
    Icon: Layers,
    colorClass: "text-indigo-500",
  },
  {
    title: "Next.js & React Development",
    desc: "Fast, SEO-friendly frontends for companies that care about both user experience and search rankings — Next.js gives you server-side rendering and speed that plain React sites often lack.",
    problems: "poor Core Web Vitals scores, slow page loads hurting conversions and rankings.",
    idealFor: "startups, SaaS products, content-heavy sites needing strong SEO.",
    Icon: SiReact,
    colorClass: "text-cyan-400",
  },
  {
    title: "AI-Powered Web Apps",
    desc: "Integrating AI features — chatbots, content generation, automation — directly into your web app or business workflow.",
    problems: "manual repetitive tasks eating staff time, lack of intelligent features competitors already have.",
    idealFor: "SaaS founders, agencies wanting AI-differentiated products.",
    Icon: Sparkles,
    colorClass: "text-purple-400",
  },
  {
    title: "Chrome Extension Development",
    desc: "Custom browser extensions for productivity tools, SaaS companion apps, or internal team utilities.",
    problems: "workflows that require constant tab-switching or manual copy-paste between tools.",
    idealFor: "SaaS companies, productivity tool founders, internal ops teams.",
    Icon: Code2,
    colorClass: "text-emerald-400",
  },
  {
    title: "Dashboards & Admin Panels",
    desc: "Custom-built admin interfaces for managing users, orders, content, or business data — built around how your team actually works, not a generic template.",
    problems: "clunky off-the-shelf admin tools that don't fit the business.",
    idealFor: "e-commerce owners, SaaS platforms, agencies managing multiple clients.",
    Icon: LayoutGrid,
    colorClass: "text-blue-400",
  },
  {
    title: "Website Speed & Technical SEO",
    desc: "Auditing and fixing what's silently killing your rankings — slow load times, broken schema, poor mobile performance, crawl errors.",
    problems: "sites that look fine but don't show up on Google.",
    idealFor: "existing business websites that aren't generating organic traffic.",
    Icon: Search,
    colorClass: "text-amber-500",
  },
  {
    title: "Website Maintenance & API Integration",
    desc: "Ongoing support, bug fixes, feature additions, and connecting your site to third-party tools and APIs (payments, CRMs, booking systems).",
    problems: "sites left unmaintained after launch, manual processes that should be automated.",
    idealFor: "business owners without an in-house developer.",
    Icon: Wrench,
    colorClass: "text-rose-400",
  },
];

/* ---------------- Tech Stack Data (Section 8) ---------------- */

const STACK_CATEGORIES = [
  {
    title: "Frontend",
    items: [
      { name: "React", Icon: SiReact, colorClass: "text-cyan-400" },
      { name: "Next.js", Icon: SiNextdotjs, colorClass: "text-neutral-800 dark:text-neutral-200" },
      { name: "TypeScript", Icon: SiTypescript, colorClass: "text-blue-500" },
      { name: "JavaScript", Icon: SiJavascript, colorClass: "text-yellow-400" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, colorClass: "text-teal-400" },
      { name: "HTML5", Icon: SiHtml5, colorClass: "text-orange-500" },
      { name: "CSS3", Icon: SiCss, colorClass: "text-blue-500" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", Icon: SiNodedotjs, colorClass: "text-green-500" },
      { name: "Express.js", Icon: SiExpress, colorClass: "text-neutral-700 dark:text-neutral-300" },
      { name: "REST APIs", Icon: TbApi, colorClass: "text-purple-400" },
    ],
  },
  {
    title: "Database & Infrastructure",
    items: [
      { name: "MongoDB", Icon: SiMongodb, colorClass: "text-green-500" },
      { name: "Firebase", Icon: SiFirebase, colorClass: "text-amber-500" },
    ],
  },
  {
    title: "Specialized",
    items: [
      { name: "AI Integrations", Icon: Sparkles, colorClass: "text-purple-400" },
      { name: "Chrome Extension APIs", Icon: Code2, colorClass: "text-blue-400" },
      { name: "Progressive Web Apps (PWA)", Icon: Smartphone, colorClass: "text-emerald-400" },
    ],
  },
  {
    title: "Optimization",
    items: [
      { name: "Technical SEO", Icon: Search, colorClass: "text-amber-400" },
      { name: "Core Web Vitals", Icon: Zap, colorClass: "text-yellow-400" },
      { name: "Local SEO", Icon: MapPin, colorClass: "text-red-400" },
    ],
  },
];

/* ---------------- Industries List (Section 9) ---------------- */

const INDUSTRIES_LIST = [
  { name: "Local Service Businesses (clinics, salons, contractors, real estate)", Icon: Building2 },
  { name: "E-commerce & Retail", Icon: Store },
  { name: "Startups & SaaS Founders", Icon: Rocket },
  { name: "Agencies Needing a Development Partner", Icon: Briefcase },
  { name: "Educational Platforms", Icon: GraduationCap },
  { name: "Healthcare & Wellness Businesses", Icon: Stethoscope },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <>
      <SEOHead
        title="Web Developer in Multan | Web Application & Website Developer Pakistan | Imran Digitals"
        description="Looking for a web developer in Multan? Muhammad Imran builds fast, SEO-friendly websites, MERN stack web applications, and admin dashboards with React & Next.js."
        path="/"
        jsonLd={[personSchema, localBusinessSchema, webSiteSchema, homeFaqSchema]}
      />

      {/* ---------------- 1. HERO SECTION ---------------- */}
      <section className="flex flex-col justify-center py-10">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 px-4 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 shadow-sm">
          <MapPin size={14} className="text-amber-500 shrink-0" />
          <span>Full Stack Developer in Multan, Pakistan — Available Worldwide</span>
        </div>

        {/* SINGLE H1 FOR SEO BEST PRACTICE */}
        <h1 className="mt-6 text-balance text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl lg:text-6xl">
          Web Developer in Multan Building Fast, Reliable Websites and Web Apps
        </h1>

        <p className="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-lg sm:leading-relaxed">
          I am Muhammad Imran, a full stack developer based in Multan, Pakistan, working with businesses, startups, and agencies across Pakistan and internationally. I build websites, web applications, and admin dashboards using React, Next.js, and the MERN stack — code that loads fast, ranks on Google, and does not break six months after launch. If you are comparing developers on price, compare what you actually get for it: clean code, on-time delivery, and a developer who answers your messages.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-neutral-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ backgroundColor: ACCENT }}
          >
            Get a Free Project Quote <ArrowRight size={16} />
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200 transition-all duration-200 hover:border-neutral-900 dark:hover:border-neutral-100 hover:-translate-y-0.5"
          >
            View My Work
          </Link>
        </div>
      </section>

      {/* ---------------- 2. TRUST BAR ---------------- */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-8 my-4">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>4+ Years Building Production Web Apps</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>MERN Stack, Next.js & React Specialist</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>Based in Multan — Remote-Ready Worldwide</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>Fixed-Price & Hourly Projects Available</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>Average Response Time: Under 24 Hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 3. ABOUT ME ---------------- */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-14">
        <div className="max-w-4xl space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">About Me</span>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            The Developer Behind the Screen
          </h2>

          <div className="space-y-4 pt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-base">
            <p className="font-medium text-neutral-800 dark:text-neutral-200">
              Most portfolio sites tell you what a developer knows. I would rather tell you what I do with it.
            </p>
            <p>
              I am a self-taught full stack developer from Multan who spent years learning the difference between code that <em>works</em> and code that <em>works well</em> — the kind that does not slow down under real traffic, does not confuse the next developer who touches it, and does not need to be rebuilt a year later because it was rushed the first time.
            </p>
            <p>
              My work sits at the intersection of three things clients usually have to hire three separate people for: development, design sense, and search visibility. I build the site, make sure it looks like it belongs to a serious business, and structure it so Google can actually find it. That combination is why business owners in Multan and beyond keep sending me referrals instead of shopping around.
            </p>
            <p>
              I work with React, Next.js, TypeScript, Node.js, Express, MongoDB, and Firebase as my core stack, and I extend that into AI-powered features and Chrome extensions when a project calls for it. Whether you are a local shop owner who needs a website that brings in calls, or a startup founder who needs a SaaS MVP built from scratch, I build for the outcome you are actually trying to reach — not just to check a box marked website.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- 4. WHY HIRE ME ---------------- */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-14">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">Why Hire Me</span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            Why Businesses Choose Me Over Bigger Agencies
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              You are paying for output, not overhead.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Agencies in Lahore and Karachi charge premium rates partly to cover office rent and account managers. I work directly with you — no middleman, no marked-up hours. You get agency-quality work at a price that makes sense for a small business or a growing startup in Multan.
            </p>
          </article>

          <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              I write code meant to be maintained, not just shipped.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              A cheap website that breaks in three months is not actually cheap. I structure every project — from a simple business site to a full SaaS dashboard — so it is easy to update, extend, and hand off to another developer if you ever need to.
            </p>
          </article>

          <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              SEO is part of the build, not an afterthought.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Most developers hand you a finished site and leave search rankings to a separate SEO agency. I bake in fast load times, clean semantic HTML, proper meta structure, and mobile performance from day one, so your site has a real shot at ranking instead of sitting on page five.
            </p>
          </article>

          <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              You will actually hear back from me.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Late replies and disappearing freelancers are the most common complaint about hiring developers online. I treat communication as part of the deliverable — status updates, honest timelines, and no ghosting mid-project.
            </p>
          </article>
        </div>
      </section>

      {/* ---------------- 5. SERVICES ---------------- */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-14">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">Services</span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            What I Build
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {SERVICES_DATA.map((srv) => {
            const IconComp = srv.Icon;
            return (
              <article
                key={srv.title}
                className="flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm transition-all duration-200 hover:border-neutral-400 dark:hover:border-neutral-600"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                      <IconComp className={`w-6 h-6 ${srv.colorClass}`} />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      {srv.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {srv.desc}
                  </p>

                  <div className="mt-4 space-y-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 p-3.5 text-xs text-neutral-700 dark:text-neutral-300">
                    <div>
                      <strong className="text-neutral-900 dark:text-neutral-100">Problems solved:</strong> {srv.problems}
                    </div>
                    <div>
                      <strong className="text-neutral-900 dark:text-neutral-100">Ideal for:</strong> {srv.idealFor}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ---------------- 6. HOW I WORK ---------------- */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-14">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">How I Work</span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            A Process Built to Remove Guesswork
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Step 1</span>
            <h3 className="mt-1 text-base font-bold text-neutral-900 dark:text-neutral-100">
              1. Discovery Call or Message
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              We talk through what you actually need, not just what you think you want. Half the value here is catching problems before they become expensive.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Step 2</span>
            <h3 className="mt-1 text-base font-bold text-neutral-900 dark:text-neutral-100">
              2. Scope & Quote
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              You get a clear breakdown of what is being built, the timeline, and the price — in writing, before any code is touched.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Step 3</span>
            <h3 className="mt-1 text-base font-bold text-neutral-900 dark:text-neutral-100">
              3. Build in Stages
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              I share progress at each milestone instead of disappearing for weeks. You see the project take shape, not just the final result.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Step 4</span>
            <h3 className="mt-1 text-base font-bold text-neutral-900 dark:text-neutral-100">
              4. Testing & Refinement
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              Every project gets tested across devices and browsers before it is called done — not after you find the bugs yourself.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Step 5</span>
            <h3 className="mt-1 text-base font-bold text-neutral-900 dark:text-neutral-100">
              5. Launch & Handoff
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              You get the finished, live product plus a walkthrough of anything you will need to manage yourself.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Step 6</span>
            <h3 className="mt-1 text-base font-bold text-neutral-900 dark:text-neutral-100">
              6. Ongoing Support (Optional)
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              Available for updates, fixes, or new features after launch — no need to find a new developer every time something changes.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- 7. FEATURED PROJECTS ---------------- */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-14">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">Featured Projects</span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            A Sample of What I Have Built
          </h2>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
            Below are a few projects that reflect the range of work I take on — from business websites to full custom applications. Full case studies and live links are on the{" "}
            <Link href="/projects" className="font-semibold text-neutral-900 dark:text-neutral-100 underline decoration-amber-400">
              Projects page
            </Link>.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredProjects.map((p) => (
            <div
              key={p.id}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm transition-all hover:border-neutral-400 dark:hover:border-neutral-600"
            >
              <div>
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-40 w-full rounded-xl object-cover"
                />
                <h3 className="mt-4 text-base font-bold text-neutral-900 dark:text-neutral-100">
                  {p.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-3">
                  {p.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-[11px] font-medium text-neutral-700 dark:text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                {p.liveUrl ? (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500 hover:underline"
                  >
                    View Live <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-xs text-neutral-400">Internal Tool</span>
                )}
                <Link href="/projects" className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200">
                  Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:border-neutral-900 dark:hover:border-neutral-100"
          >
            View All Projects <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ---------------- 8. SKILLS & TECH STACK ---------------- */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-14">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">Skills & Tech Stack</span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            Tools I Build With
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STACK_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                {cat.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.items.map((item) => {
                  const IconComp = item.Icon;
                  return (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 px-3 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200"
                    >
                      <span className="text-sm">
                        <IconComp className={item.colorClass} />
                      </span>
                      {item.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- 9. INDUSTRIES I WORK WITH ---------------- */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-14">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">Industries</span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            Industries I Work With
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES_LIST.map((ind) => {
            const IconComp = ind.Icon;
            return (
              <div
                key={ind.name}
                className="flex items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 text-amber-500">
                  <IconComp size={16} />
                </div>
                <span>{ind.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- 10. WHY CLIENTS KEEP COMING BACK ---------------- */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-14">
        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">Long-Term Partnerships</span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
              Built for Long-Term Working Relationships
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-base sm:leading-relaxed">
              Most of my work comes from repeat clients and referrals, not cold outreach. The reason is simple: I treat every project like it needs to still make sense a year later — documented code, realistic timelines, and no disappearing after the invoice is paid. When a client needs a new feature or a second project, they already know what working with me looks like, so there is no re-explaining, no re-negotiating trust.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- 11. TESTIMONIALS ---------------- */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-14">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">Testimonials</span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            What Clients Say
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <blockquote className="flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
            <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300 italic">
              "Imran rebuilt our booking site in two weeks and it is genuinely faster than what our old agency built in two months. He also caught SEO issues nobody had mentioned to us before."
            </p>
            <footer className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              — Client, Multan
            </footer>
          </blockquote>

          <blockquote className="flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
            <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300 italic">
              "We needed a custom dashboard for our internal team and most freelancers we talked to did not understand the requirements. Imran did, and delivered exactly what we asked for."
            </p>
            <footer className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              — Startup Founder
            </footer>
          </blockquote>

          <blockquote className="flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
            <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300 italic">
              "Clear communication start to finish. No delays, no surprises on price."
            </p>
            <footer className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              — Small Business Owner
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ---------------- 12. FREQUENTLY ASKED QUESTIONS ---------------- */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-14">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">FAQ</span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp size={18} className="text-amber-500 shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-neutral-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 border-t border-neutral-100 dark:border-neutral-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- 14. CONTACT SECTION ---------------- */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-14 mt-10">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">Contact</span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            Let us Talk About Your Project
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-base">
            Send a short description of what you need — even if it is not fully defined yet — and I will reply with questions, a rough timeline, and pricing.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider block">Email</span>
              <a href={`mailto:${PERSONAL.email}`} className="text-xs font-bold text-neutral-900 dark:text-neutral-100 hover:underline">
                {PERSONAL.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider block">WhatsApp / Call</span>
              <a href={PERSONAL.phoneLink} className="text-xs font-bold text-neutral-900 dark:text-neutral-100 hover:underline">
                {PERSONAL.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider block">Location</span>
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                Multan, Punjab, Pakistan — Remote Worldwide
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6 text-center">
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            Have a project description ready?
          </h3>
          <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
            Use the interactive contact form to send your detailed requirements directly to my inbox.
          </p>
          <div className="mt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 px-6 py-3 text-xs font-semibold text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200"
            >
              Open Contact Form <MessageSquare size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- 15. FOOTER COPY ---------------- */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-10 my-6 text-xs text-neutral-500 dark:text-neutral-400 space-y-4">
        <p className="max-w-3xl leading-relaxed">
          <strong className="text-neutral-900 dark:text-neutral-200">Muhammad Imran</strong> — Full Stack Web Developer in Multan, Pakistan, specializing in React, Next.js, and MERN stack development for businesses, startups, and agencies worldwide.
        </p>

        <nav className="flex flex-wrap gap-4 font-medium text-neutral-700 dark:text-neutral-300">
          <Link href="/" className="hover:underline">Home</Link>
          <span>·</span>
          <Link href="/about" className="hover:underline">About</Link>
          <span>·</span>
          <Link href="/projects" className="hover:underline">Projects</Link>
          <span>·</span>
          <Link href="/achievements" className="hover:underline">Achievements</Link>
          <span>·</span>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>

        <p className="text-[11px] text-neutral-400 dark:text-neutral-600">
          © 2026 Muhammad Imran. All rights reserved.
        </p>
      </footer>
    </>
  );
}
