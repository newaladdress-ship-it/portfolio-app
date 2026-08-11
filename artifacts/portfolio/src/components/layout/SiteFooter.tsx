import { Link } from "wouter";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { PERSONAL } from "@/data/personal";

const primaryLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const footerServices = [
  { label: "Full-Stack Web Development", href: "/services/full-stack-development" },
  { label: "Custom Web Applications", href: "/services/web-application-development" },
  { label: "React & Next.js Development", href: "/services/react-development" },
  { label: "MERN Stack Development", href: "/services/full-stack-development" },
  { label: "Technical SEO & Performance", href: "/services/seo-multan" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-16 bg-[#17211E] text-[#F7F3EC] rounded-2xl p-8 sm:p-10 border border-[#2A3632]">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Brand Info */}
        <div className="space-y-3 lg:col-span-1">
          <h2 className="text-lg font-heading font-bold text-[#F7F3EC]">Imran Digitals</h2>
          <p className="text-sm font-sans leading-relaxed text-[#9DA6A0]">
            Full-stack web development, custom web applications, and technical SEO solutions for businesses in Multan, across Pakistan, and worldwide.
          </p>
        </div>

        {/* Column 2: Explore */}
        <div>
          <h3 className="text-xs font-mono tracking-wider uppercase text-[#9DA6A0] font-semibold">Explore</h3>
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

        {/* Column 3: Services */}
        <div>
          <h3 className="text-xs font-mono tracking-wider uppercase text-[#9DA6A0] font-semibold">Services</h3>
          <ul className="mt-3 space-y-2 font-sans">
            {footerServices.map((service, idx) => (
              <li key={idx}>
                <Link href={service.href} className="text-sm text-[#F7F3EC]/80 hover:text-[#C96A3D] transition-colors">
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Location & Contact */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xs font-mono tracking-wider uppercase text-[#9DA6A0] font-semibold">Location</h3>
            <p className="flex items-start gap-2 text-sm font-sans leading-relaxed text-[#9DA6A0]">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#C96A3D]" aria-hidden="true" />
              Multan, Pakistan — available for remote projects worldwide.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <h3 className="text-xs font-mono tracking-wider uppercase text-[#9DA6A0] font-semibold">Contact</h3>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="inline-flex items-center gap-2 text-sm font-mono text-[#C96A3D] hover:text-[#E38A5C] transition-colors"
            >
              <Mail size={15} aria-hidden="true" />
              {PERSONAL.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2 border-t border-[#2A3632] pt-6 text-xs font-mono text-[#9DA6A0] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Imran Digitals. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/locations/multan" className="inline-flex items-center gap-1 text-xs font-sans text-[#C96A3D] hover:underline">
            Web developer in Multan <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
