import { useRoute, Link, Redirect } from "wouter";
import SEOHead from "@/components/SEOHead";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import Breakline from "@/components/layout/Breakline";
import { FaMapPin } from "react-icons/fa6";
import { MdLightbulb, MdHelpOutline, MdArrowForward, MdCheckCircle, MdBusinessCenter } from "react-icons/md";
import { getLocationBySlug } from "@/data/locations";
import { PERSONAL } from "@/data/personal";

export default function LocationPage() {
  const [, params] = useRoute<{ slug: string }>("/locations/:slug");
  const slug = params?.slug ?? "";
  const location = getLocationBySlug(slug);

  if (!location) {
    return <Redirect to="/locations" />;
  }

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `Muhammad Imran - Web Developer in ${location.city}`,
    description: `Professional web developer serving ${location.city}, ${location.province}, Pakistan`,
    url: `https://www.imrandigitals.online/locations/${location.slug}`,
    image: "https://www.imrandigitals.online/opengraph.jpg",
    areaServed: {
      "@type": "City",
      name: location.city,
    },
    priceRange: "PKR",
    telephone: PERSONAL.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: PERSONAL.address,
      addressLocality: "Multan",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: location.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.imrandigitals.online/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.imrandigitals.online/locations" },
      { "@type": "ListItem", position: 3, name: location.city, item: `https://www.imrandigitals.online/locations/${location.slug}` },
    ],
  };

  return (
    <section className="space-y-8">
      <SEOHead
        title={location.metaTitle}
        description={location.metaDescription}
        path={`/locations/${location.slug}`}
        jsonLd={[professionalServiceSchema, faqJsonLd, breadcrumbJsonLd]}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="text-xs text-neutral-500 dark:text-neutral-500"
      >
        <Link href="/" className="hover:text-neutral-800 dark:hover:text-neutral-300">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <Link
          href="/locations"
          className="hover:text-neutral-800 dark:hover:text-neutral-300"
        >
          Locations
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-neutral-700 dark:text-neutral-300">{location.city}</span>
      </nav>

      {/* Hero */}
      <header className="space-y-3">
        <SectionHeading title="Location" icon={<FaMapPin />} />
        <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
          {location.h1}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {location.intro}
        </p>
      </header>

      {/* Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {location.highlights.map((h) => (
          <SpotlightCard key={h.label} className="p-3.5">
            <div className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-500 font-medium">
              {h.label}
            </div>
            <div className="mt-1 text-sm font-medium text-neutral-800 dark:text-neutral-200">
              {h.value}
            </div>
          </SpotlightCard>
        ))}
      </div>

      <Breakline />

      {/* About */}
      <div className="space-y-3">
        <SectionHeading title={`About ${location.city}`} icon={<MdLightbulb />} />
        <SectionSubHeading>
          <p>{location.about}</p>
        </SectionSubHeading>
      </div>

      <Breakline />

      {/* Services */}
      <div className="space-y-3">
        <SectionHeading title={`Services in ${location.city}`} icon={<MdBusinessCenter />} />
        <ul className="grid sm:grid-cols-2 gap-2.5 mt-2">
          {location.services.map((service) => (
            <li
              key={service}
              className="flex gap-2 text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed"
            >
              <MdCheckCircle
                size={16}
                className="flex-shrink-0 text-neutral-700 dark:text-neutral-300"
              />
              <span>{service}</span>
            </li>
          ))}
        </ul>
      </div>

      <Breakline />

      {/* FAQs */}
      <div className="space-y-3">
        <SectionHeading
          title={`FAQs - Web Development in ${location.city}`}
          icon={<MdHelpOutline />}
        />
        <div className="space-y-3 mt-2">
          {location.faqs.map((f) => (
            <SpotlightCard key={f.q} className="p-4">
              <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                {f.q}
              </h3>
              <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {f.a}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>

      <Breakline />

      {/* CTA */}
      <SpotlightCard className="p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {location.ctaHeading}
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {location.ctaBody}
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-4 py-2 text-sm font-semibold text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors"
          >
            Contact me
            <MdArrowForward size={16} />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
          >
            See portfolio
          </Link>
        </div>
      </SpotlightCard>
    </section>
  );
}
