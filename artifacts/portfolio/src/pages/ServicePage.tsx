import { useRoute, Link, Redirect } from "wouter";
import SEOHead from "@/components/SEOHead";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import Breakline from "@/components/layout/Breakline";
import {
  HiOutlineBriefcase,
  HiOutlineCheckCircle,
  HiOutlineLightBulb,
  HiOutlineCog,
  HiOutlineQuestionMarkCircle,
  HiOutlineSparkles,
  HiOutlineArrowRight,
} from "react-icons/hi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { getServiceBySlug, SERVICES } from "@/data/services";

export default function ServicePage() {
  const [, params] = useRoute<{ slug: string }>("/services/:slug");
  const slug = params?.slug ?? "";
  const service = getServiceBySlug(slug);

  if (!service) {
    return <Redirect to="/services" />;
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    description: service.metaDescription,
    provider: {
      "@type": "Person",
      name: "Muhammad Imran",
      url: "https://www.imrandigitals.online",
    },
    areaServed: { "@type": "Country", name: "Worldwide" },
    serviceType: service.keyword,
    url: `https://www.imrandigitals.online/services/${service.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.imrandigitals.online/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://www.imrandigitals.online/services" },
      { "@type": "ListItem", position: 3, name: service.h1, item: `https://www.imrandigitals.online/services/${service.slug}` },
    ],
  };

  return (
    <section className="space-y-8">
      <SEOHead
        title={service.metaTitle}
        description={service.metaDescription}
        path={`/services/${service.slug}`}
        jsonLd={[serviceJsonLd, faqJsonLd, breadcrumbJsonLd]}
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
          href="/services"
          className="hover:text-neutral-800 dark:hover:text-neutral-300"
        >
          Services
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-neutral-700 dark:text-neutral-300">{service.h1}</span>
      </nav>

      {/* Hero */}
      <header className="space-y-3">
        <SectionHeading title="Service" icon={<HiOutlineBriefcase />} />
        <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
          {service.h1}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {service.intro}
        </p>
      </header>

      {/* Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {service.highlights.map((h) => (
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

      {/* What's included */}
      <div className="space-y-3">
        <SectionHeading title={service.what.heading} icon={<HiOutlineSparkles />} />
        <SectionSubHeading><p>{service.what.body}</p></SectionSubHeading>
        {service.what.bullets && (
          <ul className="grid sm:grid-cols-2 gap-2.5 mt-2">
            {service.what.bullets.map((b) => (
              <li
                key={b}
                className="flex gap-2 text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed"
              >
                <HiOutlineCheckCircle
                  className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-500"
                  size={18}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Types Section (e.g. Business Websites I Build) */}
      {service.typesSection && (
        <>
          <Breakline />
          <div className="space-y-4">
            <SectionHeading title={service.typesSection.heading} icon={<HiOutlineBriefcase />} />
            {service.typesSection.subheading && (
              <SectionSubHeading><p>{service.typesSection.subheading}</p></SectionSubHeading>
            )}
            {service.typesSection.cards && (
              <div className="grid sm:grid-cols-2 gap-3.5 mt-2">
                {service.typesSection.cards.map((c) => (
                  <SpotlightCard key={c.title} className="p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {c.description}
                      </p>
                    </div>
                    {c.suitableFor && (
                      <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                        <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block mb-1.5">
                          Suitable for:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {c.suitableFor.map((item) => (
                            <span
                              key={item}
                              className="inline-block rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </SpotlightCard>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Includes Section (e.g. What I Include) */}
      {service.includesSection && (
        <>
          <Breakline />
          <div className="space-y-4">
            <SectionHeading title={service.includesSection.heading} icon={<HiOutlineSparkles />} />
            {service.includesSection.subheading && (
              <SectionSubHeading><p>{service.includesSection.subheading}</p></SectionSubHeading>
            )}
            {service.includesSection.cards && (
              <div className="grid sm:grid-cols-2 gap-3.5 mt-2">
                {service.includesSection.cards.map((c) => (
                  <SpotlightCard key={c.title} className="p-4">
                    <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {c.description}
                    </p>
                  </SpotlightCard>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Local Section (e.g. Multan & Local Businesses) */}
      {service.localSection && (
        <>
          <Breakline />
          <div className="space-y-3">
            <SectionHeading title={service.localSection.heading} icon={<HiOutlineSparkles />} />
            {service.localSection.body && (
              <SectionSubHeading><p>{service.localSection.body}</p></SectionSubHeading>
            )}
            {service.localSection.bullets && (
              <ul className="grid sm:grid-cols-2 gap-2.5 mt-2">
                {service.localSection.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2 text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed"
                  >
                    <HiOutlineCheckCircle
                      className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-500"
                      size={18}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      <Breakline />

      {/* Process */}
      <div className="space-y-3">
        <SectionHeading title={service.process.heading} icon={<HiOutlineCog />} />
        <SectionSubHeading><p>{service.process.body}</p></SectionSubHeading>
        {service.process.bullets && (
          <ol className="space-y-2.5 mt-2">
            {service.process.bullets.map((b, i) => (
              <li
                key={b}
                className="flex gap-3 text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold">
                  {i + 1}
                </span>
                <span className="pt-0.5">{b}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <Breakline />

      {/* Stack */}
      <div className="space-y-3">
        <SectionHeading title={service.stack.label} icon={<HiOutlineSquares2X2 />} />
        <div className="flex flex-wrap gap-2">
          {service.stack.items.map((item) => (
            <span
              key={item}
              className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <Breakline />

      {/* Benefits */}
      <div className="space-y-3">
        <SectionHeading title={service.benefits.heading} icon={<HiOutlineLightBulb />} />
        <SectionSubHeading><p>{service.benefits.body}</p></SectionSubHeading>
        {service.benefits.bullets && (
          <ul className="grid sm:grid-cols-2 gap-2.5 mt-2">
            {service.benefits.bullets.map((b) => (
              <li
                key={b}
                className="flex gap-2 text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed"
              >
                <HiOutlineCheckCircle
                  className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-500"
                  size={18}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Audience Section */}
      {service.audienceSection && (
        <>
          <Breakline />
          <div className="space-y-3">
            <SectionHeading title={service.audienceSection.heading} icon={<HiOutlineBriefcase />} />
            {service.audienceSection.body && (
              <SectionSubHeading><p>{service.audienceSection.body}</p></SectionSubHeading>
            )}
            {service.audienceSection.bullets && (
              <ul className="grid sm:grid-cols-2 gap-2.5 mt-2">
                {service.audienceSection.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2 text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed"
                  >
                    <HiOutlineCheckCircle
                      className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-500"
                      size={18}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      <Breakline />

      {/* FAQs */}
      <div className="space-y-3">
        <SectionHeading
          title="Frequently asked questions"
          icon={<HiOutlineQuestionMarkCircle />}
        />
        <div className="space-y-3 mt-2">
          {service.faqs.map((f) => (
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
          {service.ctaHeading}
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {service.ctaBody}
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-4 py-2 text-sm font-semibold text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors"
          >
            Contact me
            <HiOutlineArrowRight size={16} />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
          >
            See past projects
          </Link>
        </div>
      </SpotlightCard>

      {/* Related services - internal linking */}
      <div className="space-y-3">
        <SectionHeading title="Related services" icon={<HiOutlineSquares2X2 />} />
        <div className="grid sm:grid-cols-3 gap-3">
          {service.related.map((relSlug) => {
            const rel = SERVICES.find((s) => s.slug === relSlug);
            if (!rel) return null;
            return (
              <Link key={rel.slug} href={`/services/${rel.slug}`}>
                <SpotlightCard className="p-4 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors h-full">
                  <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    {rel.h1}
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                    {rel.metaDescription}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    Read more <HiOutlineArrowRight size={12} />
                  </div>
                </SpotlightCard>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
