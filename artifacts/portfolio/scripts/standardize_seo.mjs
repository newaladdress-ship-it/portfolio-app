import fs from 'fs';

// Helper to pad or trim titles to 50-60 chars
function standardizeTitle(title) {
  let t = title.trim();
  if (t.length >= 50 && t.length <= 60) return t;
  if (t.length > 60) {
    // Trim cleanly at word boundary before char 57
    t = t.substring(0, 57).replace(/\s+\S*$/, '');
    if (t.length < 50) t = title.substring(0, 58).trim();
    return t;
  }
  // If under 50, pad with standard branding
  const suffix = " | Imran Digitals";
  if (t.length + suffix.length <= 60 && t.length + suffix.length >= 50) {
    return t + suffix;
  }
  const shortSuffix = " - Imran Digitals";
  if (t.length + shortSuffix.length <= 60 && t.length + shortSuffix.length >= 50) {
    return t + shortSuffix;
  }
  const webSuffix = " - Web Developer";
  if (t.length + webSuffix.length <= 60 && t.length + webSuffix.length >= 50) {
    return t + webSuffix;
  }
  return (t + " | Imran Digitals").substring(0, 60);
}

// Helper to pad or trim descriptions to 145-160 chars
function standardizeDesc(desc) {
  let d = desc.trim().replace(/\s+/g, ' ');
  if (d.length >= 145 && d.length <= 160) return d;
  if (d.length > 160) {
    d = d.substring(0, 157).replace(/\s+\S*$/, '') + '...';
    if (d.length < 145) d = desc.substring(0, 157) + '...';
    return d;
  }
  // If under 145, pad with meaningful context
  const paddingOptions = [
    " Contact Muhammad Imran for custom solutions, clean architecture, and technical SEO.",
    " Built with clean architecture, modern React frameworks, and technical SEO standards.",
    " Hire expert developer Muhammad Imran for scalable applications and digital growth.",
    " Professional web development services tailored for startups and growing businesses."
  ];
  for (const pad of paddingOptions) {
    if (d.length + pad.length >= 145 && d.length + pad.length <= 160) {
      return d + pad;
    }
  }
  // Precision pad to 152 chars
  const target = 152;
  const needed = target - d.length;
  if (needed > 0) {
    const filler = " Expert web development services by Muhammad Imran, senior software developer.";
    const sliced = filler.substring(0, needed);
    return (d + sliced).trim();
  }
  return d;
}

console.log("=== SEO Standardization Script Ready ===");
