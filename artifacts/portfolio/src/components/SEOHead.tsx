import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = "https://www.imrandigitals.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

function upsertMeta(selector: string, attribute: "name" | "property", value: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function SEOHead({
  title,
  description,
  path,
  type = "website",
  noIndex = false,
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    if (title) document.title = title;

    const cleanPath = path === "/" ? "/" : path.replace(/\/+$/, "");
    const canonicalUrl = `${BASE_URL}${cleanPath}`;

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    upsertMeta('meta[property="og:type"]', "property", "og:type", type);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "property", "og:image", DEFAULT_OG_IMAGE);
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", DEFAULT_OG_IMAGE);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalUrl);

    const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
    const schemaId = "page-json-ld";
    document.getElementById(schemaId)?.remove();

    if (schemas.length > 0) {
      const schemaScript = document.createElement("script");
      schemaScript.id = schemaId;
      schemaScript.type = "application/ld+json";
      schemaScript.text = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
      document.head.appendChild(schemaScript);
    }

    return () => {
      document.getElementById(schemaId)?.remove();
    };
  }, [title, description, path, type, noIndex, jsonLd]);

  return null;
}
