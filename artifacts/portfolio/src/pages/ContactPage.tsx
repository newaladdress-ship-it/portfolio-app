import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { notifyAdmin } from "@/hooks/usePushNotifications";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { BiBook } from "react-icons/bi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn, FaPhone } from "react-icons/fa6";
import { HiMail, HiExternalLink, HiCheckCircle, HiXCircle } from "react-icons/hi";
import { HiOutlineBriefcase } from "react-icons/hi2";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import Breakline from "@/components/layout/Breakline";
import { PERSONAL } from "@/data/personal";
import { db } from "@/lib/firebase";
import { useT } from "@/lib/i18n";

const CONTACT_LINKS = [
  {
    platform: "Email",
    handle: PERSONAL.email,
    icon: <HiMail size={24} />,
    href: `mailto:${PERSONAL.email}`,
    tagline: "Drop me a line anytime",
    cta: "Send email",
    gradient: "from-red-500/20 via-rose-500/10 to-transparent",
    border: "hover:border-red-400/60 dark:hover:border-red-500/40",
    glow: "group-hover:shadow-red-500/10",
    iconGradient: "from-red-500 to-rose-500",
    ctaColor: "text-red-500 dark:text-red-400",
    external: false,
  },
  {
    platform: "GitHub",
    handle: "@muhammadimran9",
    icon: <SiGithub size={24} />,
    href: PERSONAL.github,
    tagline: "Check out my repositories",
    cta: "View profile",
    gradient: "from-neutral-500/20 via-neutral-400/10 to-transparent",
    border: "hover:border-neutral-400/60 dark:hover:border-neutral-500/40",
    glow: "group-hover:shadow-neutral-500/10",
    iconGradient: "from-neutral-700 to-neutral-500 dark:from-neutral-300 dark:to-neutral-500",
    ctaColor: "text-neutral-600 dark:text-neutral-300",
    external: true,
  },
  {
    platform: "LinkedIn",
    handle: "Muhammad Imran",
    icon: <FaLinkedinIn size={22} />,
    href: PERSONAL.linkedin,
    tagline: "Let's grow together",
    cta: "Connect now",
    gradient: "from-blue-600/20 via-blue-500/10 to-transparent",
    border: "hover:border-blue-400/60 dark:hover:border-blue-500/40",
    glow: "group-hover:shadow-blue-500/10",
    iconGradient: "from-blue-600 to-blue-500",
    ctaColor: "text-blue-600 dark:text-blue-400",
    external: true,
  },
  {
    platform: "Phone",
    handle: "+92 334 5636230",
    icon: <FaPhone size={20} />,
    href: "tel:+923345636230",
    tagline: "Available for calls",
    cta: "Call me",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    border: "hover:border-green-400/60 dark:hover:border-green-500/40",
    glow: "group-hover:shadow-green-500/10",
    iconGradient: "from-green-500 to-emerald-500",
    ctaColor: "text-green-600 dark:text-green-400",
    external: false,
  },
];

function ContactList() {
  const t = useT();
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-neutral-700 dark:text-neutral-300">{t.contact.findMe}</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CONTACT_LINKS.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel="noreferrer"
            className={`group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${link.border} cursor-pointer ${link.glow}`}
          >
            {/* Gradient wash on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Icon with gradient bg */}
            <div className={`relative shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${link.iconGradient} text-white shadow-md transition-transform duration-300 group-hover:scale-105`}>
              {link.icon}
            </div>

            {/* Text content */}
            <div className="relative min-w-0 flex-1 space-y-0.5">
              <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">{link.platform}</p>
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">{link.handle}</p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">{link.tagline}</p>
            </div>

            {/* CTA arrow */}
            <div className={`relative shrink-0 flex items-center gap-1 text-xs font-semibold ${link.ctaColor} opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300`}>
              {link.cta}
              <HiExternalLink size={12} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ContactForm() {
  const t = useT();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await addDoc(collection(db, "contact_messages"), {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        createdAt: serverTimestamp(),
      });
      notifyAdmin(
        `📩 New Contact from ${form.name.trim()}`,
        form.message.trim().slice(0, 100),
        "/admin",
        "contact-form"
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: unknown) {
      console.error("Firestore error:", err);
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-neutral-700 dark:text-neutral-300">{t.contact.sendMsg}</h3>
      <SpotlightCard className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t.contact.name}</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder={t.contact.namePlaceholder}
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t.contact.email}</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder={t.contact.emailPlaceholder}
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t.contact.message}</label>
            <textarea
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder={t.contact.messagePlaceholder}
              rows={5}
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Status feedback */}
          {status === "success" && (
            <div className="flex flex-col gap-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                <HiCheckCircle size={16} className="shrink-0" />
                <span className="font-medium">{t.contact.successMsg}</span>
              </div>
              <p className="text-xs text-green-600 dark:text-green-500 leading-relaxed">
                Thank you for reaching out! Your message has been received and saved. I will review your inquiry and get back to you within 24 to 48 hours with a professional response. Please check your email (including spam folder) for updates.
              </p>
            </div>
          )}
          {status === "error" && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              <HiXCircle size={16} className="shrink-0 mt-0.5" />
              {errorMsg || "Something went wrong. Please try again."}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending" || status === "success"}
            className="w-full rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 disabled:opacity-60 transition-colors duration-200"
          >
            {status === "sending" ? t.contact.sending : status === "success" ? t.contact.sent : t.contact.sendBtn}
          </button>
        </form>
      </SpotlightCard>
    </div>
  );
}

export default function ContactPage() {
  const t = useT();
  return (
    <section className="space-y-6">
      <SEOHead
        title="Contact Muhammad Imran — Hire a React & MERN Developer"
        description="Contact Muhammad Imran for freelance web development — React, Next.js, Node.js & full-stack MERN projects. Email, phone & social links available."
        path="/contact"
      />
      <div className="space-y-2">
        <SectionHeading title={t.contact.heading} icon={<BiBook />} />
        <SectionSubHeading>
          <p>{t.contact.sub}</p>
        </SectionSubHeading>
      </div>

      {/* Availability Banner */}
      <div className="flex items-center gap-4 rounded-2xl border border-green-200 dark:border-green-800/50 bg-green-50 dark:bg-green-900/10 px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
          <HiOutlineBriefcase size={20} className="text-green-600 dark:text-green-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-sm font-semibold text-green-800 dark:text-green-300">{t.contact.available}</p>
          </div>
          <p className="text-xs text-green-600 dark:text-green-500 mt-0.5">{t.contact.availableSub}</p>
        </div>
      </div>

      <ContactList />
      <Breakline className="my-6" />
      <ContactForm />
    </section>
  );
}
