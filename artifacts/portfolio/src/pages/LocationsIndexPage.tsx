import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import Breakline from "@/components/layout/Breakline";
import { FaMapPin } from "react-icons/fa6";
import { MdArrowForward } from "react-icons/md";
import { LOCATIONS, getLocationsByProvince } from "@/data/locations";

export default function LocationsIndexPage() {
  const punjabLocations = getLocationsByProvince("Punjab");
  const sindh = getLocationsByProvince("Sindh");
  const kp = getLocationsByProvince("Khyber Pakhtunkhwa");
  const balochistan = getLocationsByProvince("Balochistan");
  const ict = getLocationsByProvince("ICT");

  return (
    <section className="space-y-8">
      <SEOHead
        title="Web Developer in Multan, Pakistan | Imran Digitals"
        description="Imran Digitals is a web developer in Multan serving businesses across Pakistan and worldwide with websites, web applications, and technical SEO."
        path="/locations"
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
        <span className="text-neutral-700 dark:text-neutral-300">Locations</span>
      </nav>

      {/* Hero */}
      <header className="space-y-3">
        <SectionHeading title="Service Locations" icon={<FaMapPin />} />
        <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
          Web Developer in Multan, Serving Pakistan and Worldwide
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Based in Multan, I work directly with local businesses and collaborate remotely with clients across Pakistan and worldwide. Explore the local service page or get in touch to discuss your project.
        </p>
      </header>

      <Breakline />

      {/* Punjab */}
      <div className="space-y-3">
        <SectionHeading title="Punjab" icon={<FaMapPin />} />
        <SectionSubHeading>
          <p>
            Multan is my home base. I work with local businesses in Punjab and offer the same focused, remote-friendly process to teams throughout Pakistan.
          </p>
        </SectionSubHeading>
        <div className="grid sm:grid-cols-2 gap-3 mt-2">
          {punjabLocations.map((location) => (
            <Link key={location.slug} href={`/locations/${location.slug}`}>
              <SpotlightCard className="p-4 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors h-full">
                <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  Web Developer in {location.city}
                </h3>
                <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                  {location.intro.split(".")[0]}.
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Learn more <MdArrowForward size={12} />
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </div>

      <Breakline />

      {/* Sindh */}
      {sindh.length > 0 && (
        <>
          <div className="space-y-3">
            <SectionHeading title="Sindh" icon={<FaMapPin />} />
            <SectionSubHeading>
              <p>
                Sindh is Pakistan's economic powerhouse. Karachi is home to thousands of businesses and startups. I serve Sindh-based businesses with expertise in e-commerce, startups, and enterprise solutions.
              </p>
            </SectionSubHeading>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              {sindh.map((location) => (
                <Link key={location.slug} href={`/locations/${location.slug}`}>
                  <SpotlightCard className="p-4 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors h-full">
                    <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      Web Developer in {location.city}
                    </h3>
                    <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                      {location.intro.split(".")[0]}.
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      Learn more <MdArrowForward size={12} />
                    </div>
                  </SpotlightCard>
                </Link>
              ))}
            </div>
          </div>

          <Breakline />
        </>
      )}

      {/* Khyber Pakhtunkhwa */}
      {kp.length > 0 && (
        <>
          <div className="space-y-3">
            <SectionHeading title="Khyber Pakhtunkhwa" icon={<FaMapPin />} />
            <SectionSubHeading>
              <p>
                KP is a growing region with emerging tech and business opportunities. I serve Peshawar and KP-based organizations with expertise in business solutions, NGO websites, and digital transformation.
              </p>
            </SectionSubHeading>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              {kp.map((location) => (
                <Link key={location.slug} href={`/locations/${location.slug}`}>
                  <SpotlightCard className="p-4 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors h-full">
                    <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      Web Developer in {location.city}
                    </h3>
                    <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                      {location.intro.split(".")[0]}.
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      Learn more <MdArrowForward size={12} />
                    </div>
                  </SpotlightCard>
                </Link>
              ))}
            </div>
          </div>

          <Breakline />
        </>
      )}

      {/* Balochistan */}
      {balochistan.length > 0 && (
        <>
          <div className="space-y-3">
            <SectionHeading title="Balochistan" icon={<FaMapPin />} />
            <SectionSubHeading>
              <p>
                Balochistan is an emerging market with growing businesses and entrepreneurial opportunities. I serve Balochistan businesses with affordable, professional web solutions.
              </p>
            </SectionSubHeading>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              {balochistan.map((location) => (
                <Link key={location.slug} href={`/locations/${location.slug}`}>
                  <SpotlightCard className="p-4 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors h-full">
                    <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      Web Developer in {location.city}
                    </h3>
                    <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                      {location.intro.split(".")[0]}.
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      Learn more <MdArrowForward size={12} />
                    </div>
                  </SpotlightCard>
                </Link>
              ))}
            </div>
          </div>

          <Breakline />
        </>
      )}

      {/* ICT */}
      {ict.length > 0 && (
        <>
          <div className="space-y-3">
            <SectionHeading title="Islamic Capital Territory" icon={<FaMapPin />} />
            <SectionSubHeading>
              <p>
                Islamabad is Pakistan's capital with significant government, military, and enterprise presence. I serve Islamabad organizations with enterprise-grade, secure web solutions.
              </p>
            </SectionSubHeading>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              {ict.map((location) => (
                <Link key={location.slug} href={`/locations/${location.slug}`}>
                  <SpotlightCard className="p-4 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors h-full">
                    <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      Web Developer in {location.city}
                    </h3>
                    <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                      {location.intro.split(".")[0]}.
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      Learn more <MdArrowForward size={12} />
                    </div>
                  </SpotlightCard>
                </Link>
              ))}
            </div>
          </div>

          <Breakline />
        </>
      )}

      {/* Global Services */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-6 py-12 sm:px-10">
        <h2 className="text-balance text-center text-xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-2xl">
          Not finding your city? I serve all of Pakistan and work globally.
        </h2>
        <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
          Whether you are in a city listed above or anywhere else in Pakistan, I can serve you. I offer remote collaboration with in-person meetings available in major cities. For international clients worldwide, I provide timezone-friendly support and regular video communication.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-5 py-2.5 text-sm font-semibold text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors"
          >
            Get in touch
            <MdArrowForward size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
