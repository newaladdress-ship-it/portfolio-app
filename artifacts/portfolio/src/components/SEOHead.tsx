import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  /** One or more JSON-LD schema objects to inject into the document head. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = "https://imrandigitals.online";
const DEFAULT_IMAGE = `${BASE_URL}/opengraph.jpg`;

export default function SEOHead({ title, description, path, type = "website", jsonLd }: SEOHeadProps) {
  const cleanPath = path === "/" ? "/" : path.replace(/\/+$/, "");
  const canonical = `${BASE_URL}${cleanPath}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
