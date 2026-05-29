import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { PERSONAL } from "@/data/personal";
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb,
  SiJavascript, SiTypescript, SiTailwindcss, SiGithub,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import {
  Globe, Zap, Smartphone, MapPin, ArrowRight, Code2,
  CheckCircle2, Briefcase,
} from "lucide-react";

const BASE_URL = "https://www.imrandigitals.online";
const OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

/* ---------------- JSON-LD structured data ---------------- */

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Imran",
  jobTitle: "Web App Developer",
  url: BASE_URL,
  image: OG_IMAGE,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Multan",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  knowsAbout: [
    "React.js", "Next.js", "Node.js", "MongoDB", "MERN Stack",
    "JavaScript", "TypeScript", "Web Development",
  ],
  sameAs: [PERSONAL.github, PERSONAL.linkedin],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Muhammad Imran — Web Developer Multan",
  description:
    "Freelance web developer in Multan, Pakistan specializing in React, Next.js, Node.js, and the MERN stack.",
  url: BASE_URL,
  areaServed: ["Multan", "Lahore", "Islamabad", "Pakistan"],
  serviceType: [
    "Web Development", "React Development",
    "MERN Stack Development", "Full Stack Development",
  ],
  priceRange: "$$",
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Muhammad Imran Portfolio",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

/* ---------------- Data ---------------- */

const TECH = [
  { name: "React.js",    icon: <SiReact size={18} />,       color: "text-cyan-500" },
  { name: "Next.js",     icon: <SiNextdotjs size={18} />,   color: "text-neutral-800 dark:text-neutral-200" },
  { name: "Node.js",     icon: <SiNodedotjs size={18} />,   color: "text-green-600" },
  { name: "Express.js",  icon: <SiExpress size={18} />,     color: "text-neutral-700 dark:text-neutral-300" },
  { name: "MongoDB",     icon: <SiMongodb size={18} />,     color: "text-green-500" },
  { name: "JavaScript",  icon: <SiJavascript size={18} />,  color: "text-yellow-500" },
  { name: "TypeScript",  icon: <SiTypescript size={18} />,  color: "text-blue-600" },
  { name: "Tailwind CSS",icon: <SiTailwindcss size={18} />, color: "text-teal-400" },
  { name: "REST APIs",   icon: <TbApi size={18} />,         color: "text-purple-500" },
  { name: "Git & GitHub",icon: <SiGithub size={18} />,      color: "text-neutral-800 dark:text-neutral-200" },
];

const SERVICES = [
  {
    icon: <Globe size={22} />,
    title: "Custom Web Applications",
    body: "Full-stack web apps built with React and Node.js — from business dashboards to SaaS platforms. Serving clients in Multan, Lahore, and across Pakistan.",
  },
  {
    icon: <Zap size={22} />,
    title: "MERN Stack Development",
    body: "End-to-end MERN Stack projects: MongoDB, Express.js, React, and Node.js. Fast, scalable, and production-ready.",
  },
  {
    icon: <Smartphone size={22} />,
    title: "Next.js & Performance",
    body: "Server-side rendered apps with Next.js for maximum speed, SEO, and Core Web Vitals scores.",
  },
];

const FEATURED = [
  {
    title: "Business Dashboard App",
    desc: "Built with React, Node.js, and MongoDB",
    banner: "bg-blue-600",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "SaaS Platform",
    desc: "Built with Next.js, Express.js, and MongoDB",
    banner: "bg-indigo-600",
    tags: ["Next.js", "Express.js", "MongoDB"],
  },
  {
    title: "E-Commerce Storefront",
    desc: "Built with React, Node.js, and MongoDB",
    banner: "bg-teal-600",
    tags: ["React", "Node.js", "MongoDB"],
  },
];

const STATS = [
  { value: "React & Next.js", label: "Frontend Expertise" },
  { value: "MERN Stack",      label: "Full Stack Projects" },
  { value: "Multan, Pakistan",label: "Based & Available" },
  { value: "Freelance",       label: "Open for Work" },
];

const ACCENT = "#fbe400";

/* ---------------- UI helpers ---------------- */

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{ backgroundColor: ACCENT }}
    >
      {children}
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-800 dark:text-neutral-200 transition-all duration-200 hover:border-neutral-900 dark:hover:border-neutral-300 hover:-translate-y-0.5"
    >
      {children}
    </Link>
  );
}

/* ---------------- Page ---------------- */

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Muhammad Imran — Web Developer in Multan, Pakistan | React & MERN Stack"
        description="Freelance web developer in Multan, Pakistan. I build fast, modern web apps using React, Next.js, Node.js & MERN Stack. Available for hire. View my work."
        path="/"
        jsonLd={[personSchema, localBusinessSchema, webSiteSchema]}
      />

      {/* SECTION 1 — Hero */}
      <section className="flex min-h-[80vh] flex-col justify-center py-10">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400">
          <MapPin size={13} style={{ color: ACCENT }} />
          Multan, Pakistan
        </span>

        <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl">
          Web App Developer in Multan, Pakistan
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-lg">
          I build fast, scalable web applications using React, Next.js, and the
          MERN Stack. Based in Multan, Pakistan — available for freelance
          projects and remote positions worldwide.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton href="/projects">
            View My Projects <ArrowRight size={16} />
          </PrimaryButton>
          <SecondaryButton href="/hire-me">Hire Me</SecondaryButton>
        </div>

        <ul className="mt-8 flex flex-col gap-3 text-sm text-neutral-600 dark:text-neutral-400 sm:flex-row sm:gap-8">
          <li className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" /> React &amp; Next.js Expert
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" /> MERN Stack Specialist
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" /> Available for Hire
          </li>
        </ul>
      </section>

      {/* SECTION 2 — Tech stack */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-12">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-2xl">
          Technologies I Work With
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {TECH.map((tech) => (
            <span
              key={tech.name}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors hover:border-neutral-400 dark:hover:border-neutral-600"
            >
              <span className={tech.color}>{tech.icon}</span>
              {tech.name}
            </span>
          ))}
        </div>
      </section>

      {/* SECTION 3 — What I build */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-12">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-2xl">
          What I Build for Clients in Multan &amp; Across Pakistan
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="flex flex-col gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6"
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl text-neutral-900"
                style={{ backgroundColor: ACCENT }}
              >
                {service.icon}
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {service.body}
              </p>
            </article>
          ))}
        </div>
        <Link
          href="/services"
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
        >
          See all services <ArrowRight size={15} />
        </Link>
      </section>

      {/* SECTION 4 — Featured projects */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 py-12">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-2xl">
          Featured Projects
        </h2>
        <h3 className="mt-2 text-sm font-normal text-neutral-600 dark:text-neutral-400">
          A selection of web apps built with React, Next.js &amp; the MERN Stack
        </h3>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {FEATURED.map((project) => (
            <article
              key={project.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
            >
              <div className={`flex h-32 items-center justify-center ${project.banner}`}>
                <Code2 size={32} className="text-white/90" aria-hidden="true" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {project.title}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex gap-4 pt-2 text-sm font-medium">
                  <a href="#" className="inline-flex items-center gap-1 text-neutral-900 dark:text-neutral-100 hover:underline">
                    Live Demo <ArrowRight size={14} />
                  </a>
                  <a href="#" className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:underline">
                    GitHub <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <PrimaryButton href="/projects">
            View All Projects <ArrowRight size={16} />
          </PrimaryButton>
        </div>
      </section>

      {/* SECTION 5 — About / credibility */}
      <section className="grid grid-cols-1 gap-8 border-t border-neutral-200 dark:border-neutral-800 py-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-2xl">
            About Me
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            <p>
              I&apos;m Muhammad Imran, a web developer in Multan focused on
              building modern, reliable products with React, Next.js, and the
              MERN stack. As a React developer in Pakistan, I help startups and
              businesses turn ideas into fast, production-ready web apps.
            </p>
            <p>
              I work as a freelance developer with clients locally and remotely,
              handling everything from frontend interfaces to Node.js APIs and
              MongoDB databases. My goal is simple: clean code, great
              performance, and websites that rank and convert.
            </p>
          </div>
          <Link
            href="/about"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
          >
            Read full story <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-5"
            >
              <p className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — Local SEO text */}
      <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-6 py-12 sm:px-10">
        <h2 className="text-balance text-center text-xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-2xl">
          Web Development Services Available in Multan &amp; Across Pakistan
        </h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          <p>
            As a web developer in Multan, I offer complete web development
            services Multan businesses can rely on — from custom websites to
            full-stack web applications. Startups, local businesses, and
            individuals across the city work with me to build fast, modern
            products, and as a React developer Multan clients trust, I make sure
            every project is built on a solid, scalable foundation.
          </p>
          <p>
            Beyond the city, I serve clients nationwide as a freelance web
            developer Pakistan founders hire for serious builds. Whether you
            need a MERN stack developer Pakistan teams can depend on or a Next.js
            developer Pakistan startups choose for SEO-friendly, high-performance
            sites, hiring a local web developer in Multan means clear
            communication, fair pricing, and someone genuinely invested in your
            success.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <PrimaryButton href="/contact">
            Get in Touch <ArrowRight size={16} />
          </PrimaryButton>
        </div>
      </section>

      {/* SECTION 7 — CTA banner */}
      <section className="mt-12 overflow-hidden rounded-2xl bg-neutral-900 dark:bg-neutral-950 px-6 py-12 text-center sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full text-neutral-900"
            style={{ backgroundColor: ACCENT }}
          >
            <Briefcase size={22} />
          </span>
          <h2 className="mt-5 text-balance text-2xl font-bold text-white">
            Ready to build something great?
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-neutral-300">
            I&apos;m available for freelance projects in Multan, Lahore, and
            remote work across Pakistan and worldwide.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="/contact">
              Start a Project <ArrowRight size={16} />
            </PrimaryButton>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-600 px-6 py-3 text-sm font-semibold text-neutral-100 transition-all duration-200 hover:border-neutral-300 hover:-translate-y-0.5"
            >
              View My Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
