import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const BASE_URL = "https://imrandigitals.online";

const ROUTES = [
  {
    path: "/",
    file: "index.html",
    title: "Muhammad Imran — Web Developer in Multan, Pakistan | React & MERN Stack",
    description:
      "Freelance web developer in Multan, Pakistan. I build fast, modern web apps using React, Next.js, Node.js & MERN Stack. Available for hire. View my work.",
    h1: "Web App Developer in Multan, Pakistan",
    intro:
      "I build fast, scalable web applications using React, Next.js, and the MERN Stack. Based in Multan, Pakistan — available for freelance projects and remote positions worldwide.",
  },
  {
    path: "/dev-profile",
    file: "dev-profile.html",
    title: "Muhammad Imran — React & MERN Stack Developer | Full Profile",
    description:
      "Full developer profile of Muhammad Imran — Web App Developer from Multan, Pakistan. React, Next.js, Node.js & MERN Stack specialist. View projects and skills.",
    h1: "Muhammad Imran — React & MERN Stack Developer",
    intro:
      "Full developer profile of Muhammad Imran — Web App Developer from Multan, Pakistan specializing in React, Next.js, Node.js, and the MERN Stack. View projects, skills, and achievements.",
  },
  {
    path: "/about",
    file: "about.html",
    title: "About Muhammad Imran — Full-Stack Web Developer Bio",
    description:
      "Background, skills & tech stack of Muhammad Imran — full-stack developer from Pakistan working with React, Next.js, Node.js, TypeScript & MongoDB.",
    h1: "About Muhammad Imran",
    intro:
      "Full-stack web developer from Pakistan with experience in React, Next.js, Node.js, TypeScript, MongoDB, and PostgreSQL. Read about my background, education, and the technologies I work with.",
  },
  {
    path: "/achievements",
    file: "achievements.html",
    title: "Achievements & Certifications — Muhammad Imran, Developer",
    description:
      "Professional certifications & academic achievements of Muhammad Imran from DigiSkills, freeCodeCamp, Hunarmand Punjab & Emerson University.",
    h1: "Achievements & Certifications",
    intro:
      "Professional certifications and academic achievements from DigiSkills, freeCodeCamp, Hunarmand Punjab, BISE Multan, and Emerson University.",
  },
  {
    path: "/projects",
    file: "projects.html",
    title: "Projects Portfolio — Muhammad Imran | React & MERN Apps",
    description:
      "Explore Muhammad Imran's project portfolio — modern web apps & full-stack builds using React, Next.js, Node.js, MongoDB, PostgreSQL & Tailwind.",
    h1: "Projects Portfolio",
    intro:
      "A collection of modern web applications and full-stack projects built with React, Next.js, Node.js, MongoDB, PostgreSQL, and Tailwind CSS.",
  },
  {
    path: "/dashboard",
    file: "dashboard.html",
    title: "Live Dev Dashboard — GitHub & WakaTime Coding Stats",
    description:
      "Real-time developer dashboard with live GitHub activity, contribution graph, WakaTime coding hours, language & editor breakdown, plus analytics.",
    h1: "Live Developer Dashboard",
    intro:
      "Real-time GitHub activity, contribution graph, WakaTime coding stats with language and editor breakdown, plus site analytics from Umami.",
  },
  {
    path: "/contact",
    file: "contact.html",
    title: "Contact Muhammad Imran — Hire a React & MERN Developer",
    description:
      "Contact Muhammad Imran for freelance web development — React, Next.js, Node.js & full-stack MERN projects. Email, phone & social links available.",
    h1: "Contact Muhammad Imran",
    intro:
      "Get in touch for freelance web development work — React, Next.js, Node.js, and full-stack MERN applications. Email, phone, and social links below.",
  },
  {
    path: "/feedback",
    file: "feedback.html",
    title: "Client Feedback & Reviews — Muhammad Imran, Developer",
    description:
      "Read genuine client reviews of Muhammad Imran's web development work or share your own feedback after collaborating on a React or MERN project.",
    h1: "Feedback & Reviews",
    intro:
      "Client feedback and reviews from real collaborators. Share your own review or read what others have said about working with Muhammad Imran.",
  },
  {
    path: "/smarttalk",
    file: "smarttalk.html",
    title: "SmartTalk — AI Assistant by Muhammad Imran, Developer",
    description:
      "SmartTalk is an AI-powered assistant by Muhammad Imran. Ask questions about his projects, skills, experience & web development work in real time.",
    h1: "SmartTalk — AI Assistant",
    intro:
      "An AI-powered assistant that answers your questions about Muhammad Imran's work, projects, skills, and experience.",
  },
  {
    path: "/chat",
    file: "chat.html",
    title: "Live Chat Room — Muhammad Imran Developer Portfolio",
    description:
      "Join the live chat room on Muhammad Imran's portfolio to connect with other visitors & discuss projects, web development, React & Node.js topics.",
    h1: "Live Chat Room",
    intro:
      "Real-time chat to connect with other visitors and discuss projects, web development, and tech.",
  },
  {
    path: "/services",
    file: "services.html",
    title: "Services — Web Development, Dashboards & SEO by Muhammad Imran",
    description:
      "Senior web development services by Muhammad Imran — custom web apps, consulting, dashboard design, executive KPI dashboards & technical SEO from Pakistan.",
    h1: "Web Development Services",
    intro:
      "A focused list of services offered by Muhammad Imran — custom web app development, web consulting, dashboard design, executive KPI dashboards, and technical SEO. Every engagement is delivered personally, no agency layer.",
  },
  {
    path: "/services/web-application-development",
    file: "services/web-application-development.html",
    title: "Web Application Development Service Provider — Muhammad Imran",
    description:
      "Hire a senior web application development service provider building React, Next.js, Node.js & MERN apps for startups, SaaS & enterprise teams worldwide.",
    h1: "Web Application Development Service Provider",
    intro:
      "Muhammad Imran is an independent web application development service provider building production-grade React, Next.js, and Node.js apps for startups, SaaS founders, and enterprise teams worldwide. End-to-end delivery, weekly demos, fixed pricing.",
  },
  {
    path: "/services/web-consulting",
    file: "services/web-consulting.html",
    title: "Web Consulting Service — Independent Senior Engineer & Advisor",
    description:
      "Independent web consulting service for founders & product teams. Architecture reviews, tech audits, MERN guidance & senior engineering advice — book a session.",
    h1: "Web Consulting Service for Founders & Product Teams",
    intro:
      "An independent web consulting service from a senior engineer. Helping founders, product teams, and agencies pick the right stack, review architectures, fix slow apps, and plan clean rewrites — without agency upsells.",
  },
  {
    path: "/services/dashboard-design",
    file: "services/dashboard-design.html",
    title: "Dashboard Design Services — Custom Admin & Analytics UI",
    description:
      "Dashboard design services for SaaS, internal tools & analytics platforms. Clean, fast, accessible admin UIs built with React, Tailwind & charting libraries.",
    h1: "Dashboard Design Services for SaaS & Internal Tools",
    intro:
      "Custom dashboard design services for SaaS, internal tools, and analytics platforms. Clean, fast, accessible admin and analytics UIs designed and built end-to-end with React, Tailwind, and modern charting libraries.",
  },
  {
    path: "/services/executive-dashboards",
    file: "services/executive-dashboards.html",
    title: "Executive Dashboards by a Senior Web Development Engineer",
    description:
      "Need web development agencies with executive dashboards? Hire one senior engineer who designs & builds C-suite KPI dashboards in React, Next.js, TypeScript.",
    h1: "Executive Dashboards by a Senior Web Development Engineer",
    intro:
      "Skip the agency. Hire one accountable senior engineer to design and build C-suite KPI dashboards — the kind founders, CEOs, and CFOs actually open every Monday morning. Real metrics, fast load times, weekly digests.",
  },
  {
    path: "/services/seo-multan",
    file: "services/seo-multan.html",
    title: "SEO Company in Multan — Web Developer & Technical SEO Expert",
    description:
      "Looking for a reliable SEO company in Multan? Get on-page SEO, technical audits, schema markup & Core Web Vitals fixes from a local senior web developer.",
    h1: "SEO Company in Multan — Built by a Local Web Developer",
    intro:
      "An honest, developer-led SEO company in Multan, Pakistan. Technical SEO audits, on-page optimization, schema markup, Core Web Vitals fixes, and local SEO done by a senior engineer who can edit the code, not just send keyword reports.",
  },
];

const indexHtml = readFileSync(resolve(DIST, "index.html"), "utf8");

function buildHtml(route) {
  const canonical = `${BASE_URL}${route.path === "/" ? "/" : route.path}`;
  const ogImage = `${BASE_URL}/opengraph.jpg`;

  const headInjection = `
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeAttr(route.title)}" />
    <meta property="og:description" content="${escapeAttr(route.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:title" content="${escapeAttr(route.title)}" />
    <meta name="twitter:description" content="${escapeAttr(route.description)}" />
    <meta name="twitter:image" content="${ogImage}" />`;

  let html = indexHtml
    // Replace <title>
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    // Replace meta description
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeAttr(route.description)}" />`
    );

  // Inject canonical + OG/Twitter just before </head>
  html = html.replace("</head>", `${headInjection}\n  </head>`);

  // Static fallback inside #root so non-JS crawlers see real, unique content
  const fallback = `<noscript><div style="max-width:680px;margin:80px auto;padding:0 24px;font-family:system-ui,sans-serif;color:#222;line-height:1.6"><h1 style="font-size:2rem;margin-bottom:1rem">${escapeHtml(route.h1)}</h1><p style="font-size:1rem;color:#444">${escapeHtml(route.intro)}</p><p style="margin-top:1.5rem"><a href="/" style="color:#2563eb">Home</a> · <a href="/about" style="color:#2563eb">About</a> · <a href="/projects" style="color:#2563eb">Projects</a> · <a href="/achievements" style="color:#2563eb">Achievements</a> · <a href="/contact" style="color:#2563eb">Contact</a></p></div></noscript>`;
  const seoBlock = `<div id="seo-fallback" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap"><h1>${escapeHtml(route.h1)}</h1><p>${escapeHtml(route.intro)}</p></div>`;

  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${seoBlock}</div>${fallback}`
  );

  return html;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

let count = 0;
for (const route of ROUTES) {
  const html = buildHtml(route);
  const flatPath = resolve(DIST, route.file);
  mkdirSync(dirname(flatPath), { recursive: true });
  writeFileSync(flatPath, html, "utf8");
  count++;
}

console.log(`[prerender] Wrote ${count} static HTML files for ${ROUTES.length} routes.`);
