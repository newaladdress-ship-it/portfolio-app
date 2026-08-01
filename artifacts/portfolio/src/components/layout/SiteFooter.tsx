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
    <footer className="mt-16 bg-[#17211E] text-[#F7F3EC] rounded-2xl p-8 sm:p-10 border border-[#2A3632]">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3 lg:col-span-1">
          <p className="text-base font-heading font-semibold text-[#F7F3EC]">Imran Digitals</p>
          <p className="text-sm font-sans leading-relaxed text-[#9DA6A0]">
            Web development, technical SEO, and custom digital systems for business owners in Multan and remote clients worldwide.
          </p>
          <a
            href={`mailto:${PERSONAL.email}`}
            className="inline-flex items-center gap-2 text-sm font-mono text-[#C96A3D] hover:text-[#E38A5C] transition-colors"
          >
            <Mail size={15} aria-hidden="true" />
            {PERSONAL.email}
          </a>
        </div>

        <div>
          <h2 className="text-xs font-mono tracking-wider uppercase text-[#9DA6A0]">Explore</h2>
          <ul className="mt-3 space-y-2 font-sans">
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-[#F7F3EC]/80 hover:text-[#C96A3D] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-mono tracking-wider uppercase text-[#9DA6A0]">Services</h2>
          <ul className="mt-3 space-y-2 font-sans">
            {SERVICES.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="text-sm text-[#F7F3EC]/80 hover:text-[#C96A3D] transition-colors">
                  {service.h1.replace("Expert ", "").replace(" Services", "")}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-mono tracking-wider uppercase text-[#9DA6A0]">Location</h2>
          <p className="flex items-start gap-2 text-sm font-sans leading-relaxed text-[#9DA6A0]">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[#C96A3D]" aria-hidden="true" />
            Multan, Pakistan — available for remote projects worldwide.
          </p>
          <Link href="/locations/multan" className="inline-flex items-center gap-1 text-sm font-sans text-[#C96A3D] hover:underline">
            Web developer in Multan <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2 border-t border-[#2A3632] pt-6 text-xs font-mono text-[#9DA6A0] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Imran Digitals. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <p>Built for speed, accessibility & search visibility.</p>
          <Link href="/admin" className="hover:text-[#C96A3D] transition-colors" title="Admin Access">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
