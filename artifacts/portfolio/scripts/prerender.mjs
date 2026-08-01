import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const PUBLIC_DIR = resolve(__dirname, "..", "public");
const BASE_URL = "https://www.imrandigitals.online";

// Dynamic TS data parser for services, blog, and locations
function parseTSData(filename, arrayName) {
  const filePath = resolve(__dirname, "..", "src", "data", filename);
  if (!existsSync(filePath)) return [];
  const content = readFileSync(filePath, "utf8");
  
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

    const bulletsMatch = part.match(/"?bullets"?:\s*\[([\s\S]*?)\]/);
    const bullets = bulletsMatch ? bulletsMatch[1].split(",").map(b => b.trim().replace(/^"|"$/g, '')) : [];

    const faqsMatch = part.match(/"?faqs"?:\s*\[([\s\S]*?)\]/);
    const faqs = [];
    if (faqsMatch) {
        const faqParts = faqsMatch[1].split(/\},\s*\{/);
        for (const f of faqParts) {
            const qMatch = f.match(/"?q"?:\s*"([^"]+)"/);
            const aMatch = f.match(/"?a"?:\s*"([^"]+)"/);
            if (qMatch && aMatch) faqs.push({ q: qMatch[1], a: aMatch[1] });
        }
    }
    
    objects.push({ slug, metaTitle, metaDescription, h1, intro, bullets, faqs });
  }
  
  return objects;
}

// Dynamic parser for projects from personal.ts
function parseTSProjects() {
  const filePath = resolve(__dirname, "..", "src", "data", "personal.ts");
  if (!existsSync(filePath)) return [];
  const content = readFileSync(filePath, "utf8");
  const idx = content.indexOf("export const PROJECTS");
  if (idx === -1) return [];
  const projectsBlock = content.substring(idx);
  
  const objects = [];
  const blockMatches = [...projectsBlock.matchAll(/\{\s*id:\s*\d+[\s\S]*?name:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"[\s\S]*?isShow:\s*(true|false)/g)];
  for (const m of blockMatches) {
    if (m[3] === "true") {
      const name = m[1];
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const description = m[2];
      
      // Standardize metaTitle length to 50-60 chars
      let metaTitle = `${name} Case Study | Imran Digitals`;
      if (metaTitle.length < 50) {
        metaTitle = `${name} Web App Case Study | Imran Digitals`;
      }
      if (metaTitle.length > 60) {
        metaTitle = `${name} | Imran Digitals`;
        if (metaTitle.length > 60) metaTitle = metaTitle.substring(0, 60);
      }
      
      // Standardize metaDescription length to 145-160 chars
      let metaDesc = description.trim().replace(/\s+/g, " ");
      if (metaDesc.length > 160) {
        metaDesc = metaDesc.substring(0, 157).replace(/\s+\S*$/, "") + "...";
      } else if (metaDesc.length < 145) {
        const filler = " Explore architectural highlights, technical stack choices, and key features developed by Muhammad Imran.";
        const needed = 152 - metaDesc.length;
        if (needed > 0) metaDesc = metaDesc + filler.substring(0, needed);
      }

      objects.push({
        slug,
        metaTitle,
        metaDescription: metaDesc,
        h1: name,
        intro: description
      });
    }
  }
  return objects;
}

const CORE_ROUTES = [
  {
    path: "/",
    file: "index.html",
    title: "Muhammad Imran - Web Developer in Multan | Imran Digitals",
    description: "Hire Muhammad Imran, senior web developer in Multan, Pakistan specializing in custom React, Next.js, and Node.js web applications for global clients.",
    h1: "Web App Developer in Multan, Pakistan",
    content: "I build fast, scalable web applications using React, Next.js, and the MERN Stack. Based in Multan, Pakistan - available for freelance projects and remote positions worldwide. Specializing in custom code, technical SEO, and production-grade systems.",
    changefreq: "daily",
    priority: "1.0"
  },
  {
    path: "/about",
    file: "about.html",
    title: "About Muhammad Imran - Full Stack Web Developer Multan",
    description: "Explore the technical background, programming skills, and full-stack software experience of Muhammad Imran, a senior web developer based in Multan, Pakistan.",
    h1: "About Muhammad Imran",
    content: "MERN Stack Developer with hands-on experience in React.js, Node.js, Express.js, Next.js, MongoDB, and Tailwind CSS. Specializing in full-stack web applications and technical SEO.",
    changefreq: "monthly",
    priority: "0.9"
  },
  {
    path: "/services",
    file: "services.html",
    title: "Web Development Services in Multan | Imran Digitals",
    description: "Expert web development services in Multan including custom React web apps, Next.js software architecture, technical SEO, and executive dashboard design.",
    h1: "Professional Web Development Services",
    content: "Custom web application development, MERN stack solutions, Next.js development, Technical SEO, and Digital Consulting services for businesses in Multan and worldwide.",
    changefreq: "weekly",
    priority: "0.95"
  },
  {
    path: "/projects",
    file: "projects.html",
    title: "Web App Projects Portfolio | Muhammad Imran Developer",
    description: "Browse the web development portfolio of Muhammad Imran featuring production React, Next.js, Node.js applications, e-commerce stores, and custom software.",
    h1: "Web Development Projects Portfolio",
    content: "Explore a showcase of web applications, e-commerce stores, custom tools, and client websites built with React, Next.js, and Node.js.",
    changefreq: "weekly",
    priority: "0.9"
  },
  {
    path: "/blog",
    file: "blog.html",
    title: "Web Development Blog & Technical Tutorials | Imran Digitals",
    description: "Read practical web development tutorials, React tips, Next.js guides, Node.js patterns, and technical SEO insights written by software developer Muhammad Imran.",
    h1: "Web Development Insights & Tutorials",
    content: "Sharing knowledge on React, Node.js, Next.js, and modern web development best practices to help developers and businesses build better software.",
    changefreq: "weekly",
    priority: "0.9"
  },
  {
    path: "/locations",
    file: "locations.html",
    title: "Web Development Services Locations | Imran Digitals",
    description: "Professional web development services available in Multan, Lahore, Islamabad, Karachi, and across Pakistan and worldwide with remote-first software delivery.",
    h1: "Web Development Services Locations",
    content: "Providing custom website development, MERN stack solutions, and technical SEO across Pakistan and globally.",
    changefreq: "weekly",
    priority: "0.9"
  },
  {
    path: "/achievements",
    file: "achievements.html",
    title: "Achievements & Certifications | Muhammad Imran Portfolio",
    description: "View verified certifications, professional software credentials, academic milestones, and awards earned by web developer Muhammad Imran in Multan, Pakistan.",
    h1: "Achievements & Certifications",
    content: "View Meta React Developer Certification, AWS Cloud Practitioner credentials, and awards earned by Muhammad Imran.",
    changefreq: "monthly",
    priority: "0.8"
  },
  {
    path: "/contact",
    file: "contact.html",
    title: "Contact Muhammad Imran | Web Developer in Multan",
    description: "Connect with Muhammad Imran for web development services, technical software consultations, custom React apps, or freelance software engineering projects.",
    h1: "Get in Touch",
    content: "Contact Muhammad Imran via email, phone, or contact form for custom web application development and technical SEO projects.",
    changefreq: "monthly",
    priority: "0.8"
  },
  {
    path: "/feedback",
    file: "feedback.html",
    title: "Client Feedback & Project Reviews | Imran Digitals",
    description: "Read authentic client feedback, project reviews, and software engineering testimonials from businesses that hired web developer Muhammad Imran for web builds.",
    h1: "Client Testimonials & Feedback",
    content: "Client feedback and project reviews for Muhammad Imran's web development services and software development work.",
    changefreq: "monthly",
    priority: "0.7"
  },
  {
    path: "/smarttalk",
    file: "smarttalk.html",
    title: "SmartTalk AI Assistant | Muhammad Imran Web Portfolio",
    description: "Interact with SmartTalk AI assistant on Muhammad Imran's portfolio to get instant answers about web development services, tech stack options, and project quotes.",
    h1: "SmartTalk AI Assistant",
    content: "Ask SmartTalk AI about web development services, tech stack details, availability, and project quotes.",
    changefreq: "monthly",
    priority: "0.7"
  },
  {
    path: "/dev-profile",
    file: "dev-profile.html",
    title: "Developer Technical Profile | Muhammad Imran Portfolio",
    description: "Comprehensive technical developer profile of Muhammad Imran detailing active programming language skills, GitHub statistics, and software engineering tools.",
    h1: "Developer Technical Profile",
    content: "Comprehensive overview of programming stacks, tools, GitHub stats, and technical capabilities.",
    changefreq: "monthly",
    priority: "0.7"
  },
  {
    path: "/dashboard",
    file: "dashboard.html",
    title: "Developer Dashboard & Analytics | Imran Digitals",
    description: "Explore the live developer activity dashboard displaying GitHub repositories, real-time coding metrics, system stats, and site performance analytics for Imran.",
    h1: "Live Metrics & Analytics Dashboard",
    content: "Real-time metrics tracking coding activity, GitHub commits, and website performance data.",
    changefreq: "weekly",
    priority: "0.7"
  },
  {
    path: "/chat",
    file: "chat.html",
    title: "Live Developer Chat Room | Muhammad Imran Portfolio",
    description: "Join the interactive live chat room on Muhammad Imran's portfolio website to send instant messages, discuss web project requirements, or ask technical questions.",
    h1: "Live Portfolio Chat Room",
    content: "Connect directly with Muhammad Imran in the real-time portfolio chat room to discuss web application development.",
    changefreq: "monthly",
    priority: "0.7"
  },
  {
    path: "/admin",
    file: "admin.html",
    title: "Admin Panel | Imran Digitals",
    description: "Private administration area for Imran Digitals.",
    h1: "Admin Panel",
    content: "Private administration area for Imran Digitals site management.",
    changefreq: "never",
    priority: "0.1"
  },
];

const SERVICES_DATA = parseTSData("services.ts", "SERVICES");
const BLOG_DATA = parseTSData("blog.ts", "BLOG_POSTS");
const LOCATIONS_DATA = parseTSData("locations.ts", "LOCATIONS");
const PROJECTS_DATA = parseTSProjects();

const ROUTES = [...CORE_ROUTES];

for (const s of SERVICES_DATA) {
  ROUTES.push({
    path: `/services/${s.slug}`,
    file: `services/${s.slug}.html`,
    title: s.metaTitle,
    description: s.metaDescription,
    h1: s.h1,
    content: `${s.intro} ${s.bullets.join(". ")} ${s.faqs.map(f => `${f.q}: ${f.a}`).join(" ")}`,
    changefreq: "monthly",
    priority: "0.9"
  });
}

for (const post of BLOG_DATA) {
  ROUTES.push({
    path: `/blog/${post.slug}`,
    file: `blog/${post.slug}.html`,
    title: post.metaTitle || `${post.h1} | Muhammad Imran Blog`,
    description: post.metaDescription,
    h1: post.h1,
    content: post.intro,
    changefreq: "monthly",
    priority: "0.85"
  });
}

for (const loc of LOCATIONS_DATA) {
  ROUTES.push({
    path: `/locations/${loc.slug}`,
    file: `locations/${loc.slug}.html`,
    title: loc.metaTitle,
    description: loc.metaDescription,
    h1: loc.h1,
    content: `${loc.intro} ${loc.faqs.map(f => `${f.q}: ${f.a}`).join(" ")}`,
    changefreq: "monthly",
    priority: "0.85"
  });
}

for (const p of PROJECTS_DATA) {
  ROUTES.push({
    path: `/projects/${p.slug}`,
    file: `projects/${p.slug}.html`,
    title: p.metaTitle,
    description: p.metaDescription,
    h1: p.h1,
    content: p.intro,
    changefreq: "monthly",
    priority: "0.85"
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
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(route.title)}" />
    <meta name="twitter:description" content="${escapeAttr(route.description)}" />
    <meta name="twitter:image" content="${ogImage}" />`;

  let html = indexHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeAttr(route.description)}" />`
    );

  html = html.replace("</head>", `${headInjection}\n  </head>`);

  const seoBlock = `<div id="seo-fallback" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">
    <h1>${escapeHtml(route.h1)}</h1>
    <p>${escapeHtml(route.content || "")}</p>
  </div>`;

  const fallback = `<noscript>
    <div style="max-width:680px;margin:80px auto;padding:0 24px;font-family:system-ui,sans-serif;color:#222;line-height:1.6">
      <h1>${escapeHtml(route.h1)}</h1>
      <p>${escapeHtml(route.content || "")}</p>
      <hr style="margin:2rem 0;border:0;border-top:1px solid #eee" />
      <nav>
        <a href="/" style="color:#2563eb">Home</a> · 
        <a href="/services" style="color:#2563eb">Services</a> · 
        <a href="/projects" style="color:#2563eb">Projects</a> · 
        <a href="/blog" style="color:#2563eb">Blog</a> · 
        <a href="/contact" style="color:#2563eb">Contact</a>
      </nav>
    </div>
  </noscript>`;

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

function generateSitemapAndRobots(routes) {
  const today = new Date().toISOString().split("T")[0];

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  for (const route of routes) {
    if (route.path === "/admin") continue;
    const loc = `${BASE_URL}${route.path === "/" ? "/" : route.path}`;
    sitemapXml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq || "monthly"}</changefreq>
    <priority>${route.priority || "0.8"}</priority>
  </url>\n`;
  }

  sitemapXml += `</urlset>\n`;

  const sitemapDistPath = resolve(DIST, "sitemap.xml");
  const sitemapPublicPath = resolve(PUBLIC_DIR, "sitemap.xml");
  writeFileSync(sitemapDistPath, sitemapXml, "utf8");
  writeFileSync(sitemapPublicPath, sitemapXml, "utf8");

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml

Disallow: /admin
Disallow: /admin/
`;

  const robotsDistPath = resolve(DIST, "robots.txt");
  const robotsPublicPath = resolve(PUBLIC_DIR, "robots.txt");
  writeFileSync(robotsDistPath, robotsTxt, "utf8");
  writeFileSync(robotsPublicPath, robotsTxt, "utf8");

  console.log(`[prerender] Successfully generated sitemap.xml with ${routes.length} URLs and robots.txt`);
}

let count = 0;
for (const route of ROUTES) {
  const html = buildHtml(route);
  const flatPath = resolve(DIST, route.file);
  mkdirSync(dirname(flatPath), { recursive: true });
  writeFileSync(flatPath, html, "utf8");
  count++;
}

console.log(`[prerender] Wrote ${count} static HTML files with full content injection.`);

generateSitemapAndRobots(ROUTES);
