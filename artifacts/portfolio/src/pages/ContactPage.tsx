import { useState, useRef } from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { notifyAdmin } from "@/hooks/usePushNotifications";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import Breakline from "@/components/layout/Breakline";
import { PERSONAL } from "@/data/personal";
import { db } from "@/lib/firebase";
import {
  ArrowRight,
  Send,
  Mail,
  Phone,
  Globe,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Briefcase,
  UserCheck,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all fields before sending.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      if (db) {
        await addDoc(collection(db, "contacts"), {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          createdAt: serverTimestamp(),
        });
      }

      await notifyAdmin(
        `📬 New Project Inquiry from ${formData.name}`,
        formData.message.slice(0, 100)
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      console.error("Failed to send message:", err);
      setStatus("error");
      setErrorMessage("Failed to send your message. Please try emailing directly.");
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://imrandigitals.com/" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://imrandigitals.com/contact" },
    ],
  };

  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Muhammad Imran | Web Developer in Multan",
    description: "Contact Muhammad Imran, a full-stack web developer in Multan, Pakistan, for websites, web apps, software systems, React, Next.js, MERN, and SEO.",
    mainEntity: {
      "@type": "Person",
      name: PERSONAL.name,
      jobTitle: "Full-Stack Web Developer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Multan",
        addressCountry: "Pakistan",
      },
      email: PERSONAL.email,
      telephone: "+923019316123",
      url: "https://imrandigitals.com",
    },
  };

  return (
    <>
      <SEOHead
        title="Contact Muhammad Imran | Web Developer in Multan"
        description="Contact Muhammad Imran, a full-stack web developer in Multan, Pakistan, for websites, web apps, software systems, React, Next.js, MERN, and SEO."
        path="/contact"
        jsonLd={[breadcrumbJsonLd, contactPageJsonLd]}
      />

      <div className="space-y-16 py-6 font-sans">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]"
        >
          <Link href="/" className="hover:text-[#C96A3D] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-[#D9D4CA] dark:text-[#2A3632]">/</span>
          <span className="text-[#17211E] dark:text-[#F5F2EC]">Contact</span>
        </nav>

        {/* ---------------- 1. HERO / HEADER ---------------- */}
        <section className="space-y-6">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] px-3.5 py-1.5 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for New Projects &amp; Remote Work</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#17211E] dark:text-[#F5F2EC]">
              Contact Muhammad Imran
            </h1>

            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#C96A3D]">
              Let's Discuss Your Next Website, Web Application, or Software Project
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#5C655F] dark:text-[#9DA6A0] max-w-4xl font-sans">
            <p>
              Have a website to build, an existing project to improve, or an idea for a custom web application or digital system?
            </p>
            <p>
              I'm Muhammad Imran, a full-stack web developer based in Multan, Pakistan. I work with businesses, startups, agencies, and remote clients on business websites, custom web applications, dashboards, full-stack systems, digital tools, and technical SEO projects.
            </p>
            <p>
              Send me a brief description of what you're working on. You don't need to have every technical detail figured out before contacting me. Tell me what you want to build, improve, or solve, and we can determine the right approach together.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-sm transition-colors duration-200 shadow-xs cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="tel:+923019316123"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-sm transition-colors duration-200"
            >
              <Phone size={16} className="text-[#C96A3D]" />
              <span>Call Me: +92 301 9316123</span>
            </a>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 2. AVAILABLE FOR NEW PROJECTS & COLLABORATION ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-6 shadow-xs font-sans">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#F5F2EC] dark:bg-[#121917] border border-[#D9D4CA] dark:border-[#2A3632] px-3 py-1 text-xs font-mono text-[#C96A3D]">
              <UserCheck size={14} />
              <span>Services &amp; Scope</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Available for New Projects &amp; Collaboration
            </h2>
            <p className="text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              I'm currently open to freelance projects, remote development work, development collaborations, and suitable full-time opportunities.
            </p>
          </div>

          <div className="space-y-4 pt-2 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]/50">
            <h3 className="text-xs font-mono font-semibold uppercase text-[#C96A3D] tracking-wider">
              What You Can Contact Me About
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-sm sm:text-base text-[#17211E] dark:text-[#F5F2EC]">
              {[
                "Business website development",
                "Custom web application development",
                "React and Next.js development",
                "MERN stack development",
                "Full-stack web development",
                "Backend and API development",
                "Dashboards and admin panels",
                "Custom software and digital tools",
                "Website performance improvements",
                "Technical SEO implementation",
                "Existing website improvements",
                "Database-driven web applications",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F2EC]/60 dark:bg-[#121917] border border-[#D9D4CA]/50 dark:border-[#2A3632]"
                >
                  <CheckCircle2 size={18} className="text-[#C96A3D] shrink-0" />
                  <span className="text-sm font-medium leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed pt-2">
            If your requirement doesn't fit one of these categories, you can still get in touch. Describe what you're trying to accomplish, and I'll help determine the appropriate starting point.
          </p>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 3. SEND ME A MESSAGE (FORM) ---------------- */}
        <section className="space-y-6 font-sans">
          <div className="space-y-2">
            <SectionHeading title="Send Me a Message" icon={<MessageSquare />} />
            <SectionSubHeading>
              <p>The easiest way to start a project is by sending a short description of what you need.</p>
            </SectionSubHeading>
          </div>

          <SpotlightCard className="p-6 sm:p-8 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421]">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {status === "success" && (
                <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-emerald-700 dark:text-emerald-400 text-sm">
                  <HiCheckCircle size={22} className="shrink-0" />
                  <div>
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-xs opacity-90">Thank you for reaching out. I aim to respond to project inquiries within 24 hours.</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-red-700 dark:text-red-400 text-sm">
                  <HiXCircle size={22} className="shrink-0" />
                  <div>
                    <p className="font-semibold">Message delivery error</p>
                    <p className="text-xs opacity-90">{errorMessage}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="contact-name" className="block text-sm font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                  Name <span className="text-[#C96A3D]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] px-4 py-3 text-sm text-[#17211E] dark:text-[#F5F2EC] placeholder-[#5C655F]/60 dark:placeholder-[#9DA6A0]/60 focus:outline-none focus:border-[#C96A3D] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-email" className="block text-sm font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                  Email <span className="text-[#C96A3D]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] px-4 py-3 text-sm text-[#17211E] dark:text-[#F5F2EC] placeholder-[#5C655F]/60 dark:placeholder-[#9DA6A0]/60 focus:outline-none focus:border-[#C96A3D] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="block text-sm font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                  Message <span className="text-[#C96A3D]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Tell me about your project, what you need built or improved, important requirements, existing website or application details, and any relevant deadline."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] px-4 py-3 text-sm text-[#17211E] dark:text-[#F5F2EC] placeholder-[#5C655F]/60 dark:placeholder-[#9DA6A0]/60 focus:outline-none focus:border-[#C96A3D] transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-sm transition-colors duration-200 shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {status === "submitting" ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Sending Message…</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0] font-mono">
                I aim to respond to project inquiries within 24 hours.
              </p>
            </form>
          </SpotlightCard>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 4. DIRECT CONTACT ---------------- */}
        <section className="space-y-6 font-sans">
          <div className="space-y-2">
            <SectionHeading title="Direct Contact" icon={<Mail />} />
            <SectionSubHeading>
              <p>Prefer to contact me directly? You can also reach me through the following channels.</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                    Email
                  </h3>
                  <a
                    href="mailto:mi6062610@gmail.com"
                    className="text-base font-semibold text-[#C96A3D] hover:underline"
                  >
                    mi6062610@gmail.com
                  </a>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed pt-1">
                    For project inquiries, collaboration, questions, and professional opportunities.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="mailto:mi6062610@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-xs transition-colors duration-200"
                >
                  Send Email <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                    Phone
                  </h3>
                  <a
                    href="tel:+923019316123"
                    className="text-base font-semibold text-[#C96A3D] hover:underline"
                  >
                    +92 301 9316123
                  </a>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed pt-1">
                    Available for project-related calls and professional discussions.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="tel:+923019316123"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F5F2EC] dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-xs border border-[#D9D4CA] dark:border-[#2A3632] transition-colors duration-200"
                >
                  Call Me <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* GitHub */}
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-900/10 dark:bg-white/10 text-[#17211E] dark:text-[#F5F2EC] flex items-center justify-center">
                  <SiGithub size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                    GitHub
                  </h3>
                  <p className="text-base font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                    @muhammadimran9
                  </p>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed pt-1">
                    Explore my repositories, development work, and selected projects.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-xs transition-colors duration-200"
                >
                  View GitHub Profile <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                  <FaLinkedinIn size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                    LinkedIn
                  </h3>
                  <p className="text-base font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                    Muhammad Imran
                  </p>
                  <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed pt-1">
                    Connect with me for professional networking, development opportunities, and career-related conversations.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-xs transition-colors duration-200"
                >
                  Connect on LinkedIn <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 5. BASED IN MULTAN, WORKING WORLDWIDE ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-4 font-sans">
          <div className="space-y-4 max-w-4xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Based in Multan, Working Worldwide
            </h2>
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              <p>
                I'm based in Multan, Pakistan, and available to work with clients and teams locally and remotely.
              </p>
              <p>
                For businesses in Multan and across Pakistan, I can help with everything from business website development and technical SEO to custom web applications, dashboards, and digital tools.
              </p>
              <p>
                For remote clients and teams, project communication, development, reviews, and delivery can be handled online.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 6. WHAT HAPPENS AFTER YOU CONTACT ME? ---------------- */}
        <section className="space-y-6 font-sans">
          <div className="space-y-2">
            <SectionHeading title="What Happens After You Contact Me?" icon={<Sparkles />} />
            <SectionSubHeading>
              <p>A simple three-step process helps turn your initial idea into a clear development plan.</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                01
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                I Review Your Message
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                I'll review your requirements, project goals, existing website or application details, and any important constraints you've provided.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                02
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                We Discuss the Requirements
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                If the project is a good fit, we'll discuss the scope, functionality, technology requirements, priorities, and expected outcome.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center font-heading font-bold text-sm">
                03
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                We Define the Next Step
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Once the requirements are clear, I'll explain the recommended development approach and what needs to happen next.
              </p>
            </div>
          </div>

          <p className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] text-center">
            No complicated process is required to start. A simple message is enough.
          </p>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 7. HAVE A PROJECT IN MIND? (CTA) ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-8 sm:p-10 space-y-6 font-sans">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#F5F2EC] dark:bg-[#121917] border border-[#D9D4CA] dark:border-[#2A3632] px-3 py-1 text-xs font-mono text-[#C96A3D]">
              <Briefcase size={14} />
              <span>Let's Build Together</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Have a Project in Mind?
            </h2>
            <p className="text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              Tell me what you're trying to build, improve, or solve. Whether you need a business website, custom web application, full-stack development, custom software, digital tool, or technical help with an existing project, I'm happy to hear about it.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-sm transition-colors duration-200 shadow-xs cursor-pointer"
            >
              <span>Start a Conversation</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="tel:+923019316123"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC] dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-sm transition-colors duration-200"
            >
              <Phone size={16} className="text-[#C96A3D]" />
              <span>Call +92 301 9316123</span>
            </a>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC] dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-sm transition-colors duration-200"
            >
              <span>View My Services</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
