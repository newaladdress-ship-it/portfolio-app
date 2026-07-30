import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import SectionHeading from "@/components/layout/SectionHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import { HiOutlineBriefcase, HiOutlineArrowRight } from "react-icons/hi";
import { SERVICES, SERVICES_INDEX_META } from "@/data/services";

export default function ServicesIndexPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.imrandigitals.online/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://www.imrandigitals.online/services" },
    ],
  };

  const serviceCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Web Development Services",
    description: "Expert web development and SEO services by Muhammad Imran.",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.h1,
      url: `https://www.imrandigitals.online/services/${s.slug}`,
    })),
  };

  return (
    <section className="space-y-6">
      <SEOHead
        title={SERVICES_INDEX_META.metaTitle}
        description={SERVICES_INDEX_META.metaDescription}
        path="/services"
        jsonLd={[breadcrumbJsonLd, serviceCollectionJsonLd]}
      />

      <nav
        aria-label="Breadcrumb"
        className="text-xs text-neutral-500 dark:text-neutral-500"
      >
        <Link href="/" className="hover:text-neutral-800 dark:hover:text-neutral-300">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-neutral-700 dark:text-neutral-300">Services</span>
      </nav>

      <header className="space-y-3">
        <SectionHeading title="Services" icon={<HiOutlineBriefcase />} />
        <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
          {SERVICES_INDEX_META.h1}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {SERVICES_INDEX_META.intro}
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-3.5">
        {SERVICES.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`}>
            <SpotlightCard className="p-5 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors h-full">
              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                {s.h1}
              </h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                {s.metaDescription}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Learn more
                <HiOutlineArrowRight size={13} />
              </div>
            </SpotlightCard>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-5 mt-2">
        <h2 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Not sure which service fits?
        </h2>
        <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Send a short message describing what you are trying to build or fix. I will
          reply within one business day with the right starting point - even if it is
          not one of the services listed above.
        </p>
        <div className="mt-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-4 py-2 text-sm font-semibold text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors"
          >
            Contact me
            <HiOutlineArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
