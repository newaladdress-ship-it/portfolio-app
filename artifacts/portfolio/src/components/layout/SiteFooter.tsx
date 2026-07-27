import { Link } from "wouter";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { PERSONAL } from "@/data/personal";
import { SERVICES } from "@/data/services";

const primaryLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-neutral-200 pt-8 dark:border-neutral-800">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3 lg:col-span-1">
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Imran Digitals</p>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Web development, technical SEO, and reliable digital products for businesses in Multan and worldwide.
          </p>
          <a
            href={`mailto:${PERSONAL.email}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
          >
            <Mail size={15} aria-hidden="true" />
            {PERSONAL.email}
          </a>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Explore</h2>
          <ul className="mt-3 space-y-2">
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Services</h2>
          <ul className="mt-3 space-y-2">
            {SERVICES.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="text-sm text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white">
                  {service.h1.replace("Expert ", "").replace(" Services", "")}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Based in Multan</h2>
          <p className="flex items-start gap-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            Multan, Pakistan — available for remote projects worldwide.
          </p>
          <Link href="/locations/multan" className="inline-flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white">
            Web developer in Multan <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2 border-t border-neutral-200 py-5 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Imran Digitals. All rights reserved.</p>
        <p>Built with accessibility, performance, and search visibility in mind.</p>
      </div>
    </footer>
  );
}
