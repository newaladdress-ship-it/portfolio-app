import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const BASE_URL = "https://imrandigitals.online";

// Dynamic TS data parser
function parseTSData(filename, arrayName) {
  const content = readFileSync(resolve(__dirname, "..", "src", "data", filename), "utf8");
  
  const arrayStart = content.indexOf(`const ${arrayName}`);
  const arrayExportStart = content.indexOf(`export const ${arrayName}`);
  const startIdx = arrayStart !== -1 ? arrayStart : arrayExportStart;
  if (startIdx === -1) return [];
  
  const objects = [];
  const parts = content.substring(startIdx).split(/\{\r?\n\s+"?slug"?:/);
  
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    
    const slugMatch = part.match(/^\s*"([^"]+)"/);
    if (!slugMatch) continue;
    const slug = slugMatch[1];
    
    const metaTitleMatch = part.match(/"?metaTitle"?:\s*"([^"]+)"/) || part.match(/"?title"?:\s*"([^"]+)"/);
    const metaTitle = metaTitleMatch ? metaTitleMatch[1] : "";
    
    const metaDescMatch = part.match(/"?metaDescription"?:\s*(?:"([^"]+)"|`([^`]+)`)/) || part.match(/"?excerpt"?:\s*"([^"]+)"/);
    const metaDescription = metaDescMatch ? (metaDescMatch[1] || metaDescMatch[2]) : "";
    
    const h1Match = part.match(/"?h1"?:\s*"([^"]+)"/) || part.match(/"?title"?:\s*"([^"]+)"/);
    const h1 = h1Match ? h1Match[1] : "";
    
    const introMatch = part.match(/"?intro"?:\s*(?:`([^`]+)`|"([^"]+)")/) || part.match(/"?excerpt"?:\s*"([^"]+)"/);
    const intro = introMatch ? (introMatch[1] || introMatch[2]) : "";
    
    objects.push({ slug, metaTitle, metaDescription, h1, intro });
  }
  
  return objects;
}

const CORE_ROUTES = [
  {
    path: "/",
    file: "index.html",
    title: "Web Developer in Multan - Muhammad Imran Portfolio App",
    description:
      "Hire Muhammad Imran, a expert web developer in Multan, Pakistan. Specializing in React, Next.js, and MERN stack development.",
    h1: "Web App Developer in Multan, Pakistan",
    intro:
      "I build fast, scalable web applications using React, Next.js, and the MERN Stack. Based in Multan, Pakistan - available for freelance projects and remote positions worldwide.",
  },
  {
    path: "/dev-profile",
    file: "dev-profile.html",
    title: "Muhammad Imran - React and MERN Stack Developer Profile",
    description:
      "Full developer profile of Muhammad Imran, a React and MERN stack web developer in Pakistan. Check out my skills and project history.",
    h1: "Muhammad Imran - React & MERN Stack Developer",
    intro:
      "Full developer profile of Muhammad Imran - Web App Developer from Multan, Pakistan specializing in React, Next.js, Node.js, and the MERN Stack. View projects, skills, and achievements.",
  },
  {
    path: "/about",
    file: "about.html",
    title: "About Muhammad Imran - Web Developer in Multan, Pakistan",
    description:
      "Professional background, skills, and technical stack of Muhammad Imran, a React, Node.js, and full-stack web developer in Pakistan.",
    h1: "About Muhammad Imran",
    intro:
      "Full-stack web developer from Pakistan with experience in React, Next.js, Node.js, TypeScript, MongoDB, and PostgreSQL. Read about my background, education, and the technologies I work with.",
  },
  {
    path: "/achievements",
    file: "achievements.html",
    title: "Achievements and Certifications - Muhammad Imran Dev",
    description:
      "Professional certifications and achievements of Muhammad Imran from DigiSkills, freeCodeCamp, Hunarmand Punjab, and Emerson University.",
    h1: "Achievements & Certifications",
    intro:
      "Professional certifications and academic achievements from DigiSkills, freeCodeCamp, Hunarmand Punjab, BISE Multan, and Emerson University.",
  },
  {
    path: "/projects",
    file: "projects.html",
    title: "Projects Portfolio - Muhammad Imran React and MERN Apps",
    description:
      "Explore the project portfolio of Muhammad Imran, featuring modern React, Next.js, Node.js, and full-stack web applications.",
    h1: "Projects Portfolio",
    intro:
      "A collection of modern web applications and full-stack projects built with React, Next.js, Node.js, MongoDB, PostgreSQL, and Tailwind CSS.",
  },
  {
    path: "/dashboard",
    file: "dashboard.html",
    title: "Live Developer Dashboard - Muhammad Imran Code Stats",
    description:
      "Real-time developer dashboard showing live GitHub activity, coding hours, language breakdown, and portfolio analytics for Muhammad Imran.",
    h1: "Live Developer Dashboard",
    intro:
      "Real-time GitHub activity, contribution graph, WakaTime coding stats with language and editor breakdown, plus site analytics from Umami.",
  },
  {
    path: "/contact",
    file: "contact.html",
    title: "Contact Muhammad Imran - Hire React and MERN Developer",
    description:
      "Contact Muhammad Imran for freelance web development services, React, Next.js, and MERN projects. Email, phone, and social links are open.",
    h1: "Contact Muhammad Imran",
    intro:
      "Get in touch for freelance web development work - React, Next.js, Node.js, and full-stack MERN applications. Email, phone, and social links below.",
  },
  {
    path: "/feedback",
    file: "feedback.html",
    title: "Client Reviews and Feedback for Muhammad Imran Developer",
    description:
      "Read genuine client reviews of web developer Muhammad Imran or share your feedback after collaborating on React and MERN projects.",
    h1: "Feedback & Reviews",
    intro:
      "Client feedback and reviews from real collaborators. Share your own review or read what others have said about working with Muhammad Imran.",
  },
  {
    path: "/smarttalk",
    file: "smarttalk.html",
    title: "SmartTalk - AI Assistant by Web Developer Muhammad Imran",
    description:
      "Ask questions about Muhammad Imran's projects, experience, and web development skills using the SmartTalk AI assistant in real-time.",
    h1: "SmartTalk - AI Assistant",
    intro:
      "An AI-powered assistant that answers your questions about Muhammad Imran's work, projects, skills, and experience.",
  },
  {
    path: "/chat",
    file: "chat.html",
    title: "Live Chat Room - Muhammad Imran Web Developer Portfolio",
    description:
      "Join the live chat room on my portfolio to connect, chat with other visitors, and discuss React, Node.js, and web development.",
    h1: "Live Chat Room",
    intro:
      "Real-time chat to connect with other visitors and discuss projects, web development, and tech.",
  },
  {
    path: "/services",
    file: "services.html",
    title: "Web Development Services - Muhammad Imran Portfolio App",
    description:
      "Web development services by Muhammad Imran including custom web apps, consulting, admin dashboards, and technical SEO in Pakistan.",
    h1: "Web Development Services",
    intro:
      "A focused list of services offered by Muhammad Imran - custom web app development, web consulting, dashboard design, executive KPI dashboards, and technical SEO. Every engagement is delivered personally, no agency layer.",
  },
  {
    path: "/locations",
    file: "locations.html",
    title: "Web Developer in Multan, Pakistan | Imran Digitals",
    description:
      "Imran Digitals is a web developer in Multan serving businesses across Pakistan and worldwide with websites, web applications, and technical SEO.",
    h1: "Web Developer in Multan, Serving Pakistan and Worldwide",
    intro:
      "Based in Multan, I work directly with local businesses and collaborate remotely with clients across Pakistan and worldwide.",
  },
  {
    path: "/blog",
    file: "blog.html",
    title: "Web Development Blog - React and Node.js Coding Tips",
    description:
      "Read expert web development tutorials, React tips, Node.js guides, and full-stack development articles by Muhammad Imran.",
    h1: "Web Development Tips, Tutorials & Guides",
    intro:
      "Expert articles on React, Node.js, Next.js, database optimization, and full-stack web development. Learn best practices and industry insights.",
  },
];

const ROUTES = [...CORE_ROUTES];

// Parse and add Services
const SERVICES_DATA = parseTSData("services.ts", "SERVICES");
for (const s of SERVICES_DATA) {
  ROUTES.push({
    path: `/services/${s.slug}`,
    file: `services/${s.slug}.html`,
    title: s.metaTitle,
    description: s.metaDescription,
    h1: s.h1,
    intro: s.intro,
  });
}

// Parse and add Blog posts
const BLOG_DATA = parseTSData("blog.ts", "BLOG_POSTS");
for (const post of BLOG_DATA) {
  ROUTES.push({
    path: `/blog/${post.slug}`,
    file: `blog/${post.slug}.html`,
    title: post.metaTitle || `${post.h1} | Muhammad Imran Blog`,
    description: post.metaDescription,
    h1: post.h1,
    intro: post.intro,
  });
}

// Parse and add location pages when local service areas are configured.
const LOCATIONS_DATA = parseTSData("locations.ts", "LOCATIONS");
for (const location of LOCATIONS_DATA) {
  ROUTES.push({
    path: `/locations/${location.slug}`,
    file: `locations/${location.slug}.html`,
    title: location.metaTitle,
    description: location.metaDescription,
    h1: location.h1,
    intro: location.intro,
  });
}

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
