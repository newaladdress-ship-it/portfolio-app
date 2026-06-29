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
  telephone: "+92 301 9316123",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Multan",
    addressRegion: "Punjab",
    addressCountry: "PK",
    streetAddress: "Multan",
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
  telephone: "+92 301 9316123",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Multan",
    addressRegion: "Punjab",
    addressCountry: "PK",
    streetAddress: "Multan, Punjab, Pakistan",
  },
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
    body: "Full-stack web applications built with React and Node.js by a web developer in Multan. I build business dashboards, SaaS platforms, and custom solutions for clients in Multan, Lahore, and across Pakistan.",
  },
  {
    icon: <Zap size={22} />,
    title: "MERN Stack Development",
    body: "Expert MERN Stack development: MongoDB, Express.js, React, and Node.js. I build fast, scalable, production-ready web applications as a skilled MERN developer in Pakistan.",
  },
  {
    icon: <Smartphone size={22} />,
    title: "Next.js & Performance",
    body: "Next.js web development with server-side rendering for maximum speed, SEO, and Core Web Vitals scores. Hire a Next.js developer in Multan for modern, fast-loading websites.",
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
        title="Web Developer in Multan, Pakistan | Hire Muhammad Imran | React, Next.js & MERN Stack"
        description="Hire a web developer in Multan, Pakistan. Muhammad Imran specializes in React, Next.js, Node.js & MERN Stack development. Build fast, scalable web applications. Available for freelance projects and remote work."
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
          Web Developer in Multan, Pakistan — Hire React, MERN & Next.js Expert
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-lg">
          I&apos;m a professional web developer in Multan, Pakistan specializing in React development, Next.js, and MERN Stack applications. I build fast, scalable web apps for startups and businesses. Available for freelance web development projects and remote positions worldwide.
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
          Technologies I Work With as a Web Developer in Multan
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
          Web Development Services — React, MERN Stack &amp; Next.js in Multan
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
          Featured Web Development Projects by a Developer in Multan
        </h2>
        <h3 className="mt-2 text-sm font-normal text-neutral-600 dark:text-neutral-400">
          Web applications I&apos;ve built with React, Next.js, MERN Stack, and Node.js for clients worldwide
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
            About Me — Web Developer in Multan
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            <p>
              I&apos;m Muhammad Imran, a professional web developer in Multan, Pakistan focused on
              building modern, reliable web applications with React, Next.js, and the
              MERN stack. As an experienced React developer and MERN stack specialist in Pakistan, I help startups and
              businesses turn ideas into fast, production-ready web applications and software solutions.
            </p>
            <p>
              I work as a freelance web developer with clients locally in Multan and across Pakistan, plus remote clients worldwide. I handle everything from frontend interfaces and React development to Node.js APIs, Express servers, and MongoDB database architecture. My goal is simple: clean code, great performance, and websites that rank and convert.
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
          Professional Web Development Services in Multan, Pakistan
        </h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          <p>
            As a professional web developer in Multan, Pakistan, I offer complete web development
            services Multan businesses can rely on — from custom websites to
            full-stack web applications and MERN Stack solutions. Startups, local businesses, and
            individuals across Multan and beyond work with me to build fast, modern
            digital products. As a trusted React developer, web developer in Multan, and MERN stack specialist, I ensure
            every project is built on a solid, scalable, and maintainable foundation with clean code practices.
          </p>
          <p>
            Beyond Multan, I serve clients nationwide as a freelance web
            developer Pakistan startups and enterprises hire for serious web development projects. Whether you
            need a MERN stack developer Pakistan teams depend on, a Next.js
            developer for SEO-optimized websites, or a React developer for dynamic user interfaces,
            hiring a local web developer in Multan means clear communication, fair pricing, fast turnaround, and someone genuinely invested in your business success and growth.
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
            Hire a Web Developer in Multan Today
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-neutral-300">
            I&apos;m available for freelance web development projects in Multan, Lahore, Islamabad,
            and remote work across Pakistan and worldwide. Let&apos;s build your next great web application.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="/contact">
              Start a Project <ArrowRight size={16} />
            </PrimaryButton>
            <a
              href="tel:+923019316123"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-600 px-6 py-3 text-sm font-semibold text-green-300 transition-all duration-200 hover:border-green-400 hover:bg-green-600/10 hover:-translate-y-0.5"
              title="Call +92 301 9316123"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.854l.847 4.929a1 1 0 01-.964 1.144h-2.003l-.122 1.149c-.905.905-1.005 2.505-.405 3.705.6 1.2 1.6 2 2.8 2.8l1.906-1.906a1 1 0 011.414 0l2.121 2.121a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414 0L5.03 15.03c-1.2-.6-2.2-1.6-2.8-2.8-.6-1.2-.5-2.8.405-3.705L2 3z" />
              </svg>
              Call Me Now
            </a>
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
