import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const BASE_URL = "https://imrandigitals.online";

// Dynamic TS data parser
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

    // Extract additional content for full injection
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

const CORE_ROUTES = [
  {
    path: "/",
    file: "index.html",
    title: "Web Developer in Multan - Muhammad Imran Portfolio App",
    description: "Hire Muhammad Imran, a expert web developer in Multan, Pakistan. Specializing in React, Next.js, and MERN stack development.",
    h1: "Web App Developer in Multan, Pakistan",
    content: "I build fast, scalable web applications using React, Next.js, and the MERN Stack. Based in Multan, Pakistan - available for freelance projects and remote positions worldwide. Specializing in custom code, technical SEO, and production-grade systems."
  },
  {
    path: "/services",
    file: "services.html",
    title: "Web Development Services in Multan - Imran Digitals",
    description: "Expert web development services including custom web apps, technical SEO, and dashboard design by Muhammad Imran in Multan.",
    h1: "Professional Web Development Services",
    content: "Custom web application development, MERN stack solutions, Next.js development, Technical SEO, and Digital Consulting services for businesses in Multan and worldwide."
  },
  {
    path: "/blog",
    file: "blog.html",
    title: "Web Development Blog - Coding Tips & Tutorials | Imran Digitals",
    description: "Read the latest web development tips, React tutorials, and SEO guides from Muhammad Imran, a full-stack developer in Multan.",
    h1: "Web Development Insights & Tutorials",
    content: "Sharing knowledge on React, Node.js, Next.js, and modern web development best practices to help developers and businesses build better software."
  }
];

const SERVICES_DATA = parseTSData("services.ts", "SERVICES");
const BLOG_DATA = parseTSData("blog.ts", "BLOG_POSTS");
const LOCATIONS_DATA = parseTSData("locations.ts", "LOCATIONS");

const ROUTES = [...CORE_ROUTES];

for (const s of SERVICES_DATA) {
  ROUTES.push({
    path: `/services/${s.slug}`,
    file: `services/${s.slug}.html`,
    title: s.metaTitle,
    description: s.metaDescription,
    h1: s.h1,
    content: `${s.intro} ${s.bullets.join(". ")} ${s.faqs.map(f => `${f.q}: ${f.a}`).join(" ")}`
  });
}

for (const post of BLOG_DATA) {
  ROUTES.push({
    path: `/blog/${post.slug}`,
    file: `blog/${post.slug}.html`,
    title: post.metaTitle || `${post.h1} | Muhammad Imran Blog`,
    description: post.metaDescription,
    h1: post.h1,
    content: post.intro
  });
}

for (const loc of LOCATIONS_DATA) {
  ROUTES.push({
    path: `/locations/${loc.slug}`,
    file: `locations/${loc.slug}.html`,
    title: loc.metaTitle,
    description: loc.metaDescription,
    h1: loc.h1,
    content: `${loc.intro} ${loc.faqs.map(f => `${f.q}: ${f.a}`).join(" ")}`
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

let count = 0;
for (const route of ROUTES) {
  const html = buildHtml(route);
  const flatPath = resolve(DIST, route.file);
  mkdirSync(dirname(flatPath), { recursive: true });
  writeFileSync(flatPath, html, "utf8");
  count++;
}

console.log(`[prerender] Wrote ${count} static HTML files with full content injection.`);
