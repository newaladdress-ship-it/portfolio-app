import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiTailwindcss, SiNodedotjs, SiFirebase, SiMongodb, SiGit,
  SiVite, SiSupabase, SiGitlab, SiBitbucket,
  SiGreensock, SiExpress, SiMysql, SiC, SiCplusplus, SiJquery, SiWindsurf,
  SiReplit, SiVercel, SiFigma, SiPostman, SiAnthropic, SiGooglegemini,
  SiFlutter, SiDart, SiPython, SiAndroidstudio,
} from "react-icons/si";
import { BiCodeAlt, BiCollection, BiUser } from "react-icons/bi";
import { PiCertificate } from "react-icons/pi";
import {
  HiOutlineChatAlt2, HiOutlineExternalLink, HiOutlineSparkles,
  HiOutlineGlobe, HiOutlineDeviceMobile, HiOutlineChip, HiOutlineColorSwatch,
} from "react-icons/hi";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import Breakline from "@/components/layout/Breakline";
import { PERSONAL, PROJECTS } from "@/data/personal";
import { useT } from "@/lib/i18n";

const STACKS = [
  { name: "HTML",       icon: <SiHtml5 size={26} />,      bg: "bg-orange-500/10",                             color: "text-orange-500" },
  { name: "CSS",        icon: <SiCss size={26} />,         bg: "bg-blue-500/10",                               color: "text-blue-500" },
  { name: "JavaScript", icon: <SiJavascript size={26} />,  bg: "bg-yellow-400/10",                             color: "text-yellow-500" },
  { name: "TypeScript", icon: <SiTypescript size={26} />,  bg: "bg-blue-600/10",                               color: "text-blue-600" },
  { name: "React",      icon: <SiReact size={26} />,       bg: "bg-cyan-400/10",                               color: "text-cyan-400" },
  { name: "Next.js",    icon: <SiNextdotjs size={26} />,   bg: "bg-neutral-800/10 dark:bg-neutral-300/10",     color: "text-neutral-800 dark:text-neutral-300" },
  { name: "Tailwind",   icon: <SiTailwindcss size={26} />, bg: "bg-teal-400/10",                               color: "text-teal-400" },
  { name: "Node.js",    icon: <SiNodedotjs size={26} />,   bg: "bg-green-600/10",                              color: "text-green-600" },
  { name: "Firebase",   icon: <SiFirebase size={26} />,    bg: "bg-orange-400/10",                             color: "text-orange-400" },
  { name: "MongoDB",    icon: <SiMongodb size={26} />,     bg: "bg-green-500/10",                              color: "text-green-500" },
  { name: "Git",        icon: <SiGit size={26} />,         bg: "bg-red-500/10",                                color: "text-red-500" },
  { name: "GitLab",     icon: <SiGitlab size={26} />,      bg: "bg-orange-600/10",                             color: "text-orange-600" },
  { name: "Bitbucket",  icon: <SiBitbucket size={26} />,   bg: "bg-blue-500/10",                               color: "text-blue-500" },
  { name: "Vite",       icon: <SiVite size={26} />,        bg: "bg-purple-400/10",                             color: "text-purple-400" },
  { name: "Express",    icon: <SiExpress size={26} />,     bg: "bg-neutral-800/10 dark:bg-neutral-300/10",     color: "text-neutral-700 dark:text-neutral-300" },
  { name: "MySQL",      icon: <SiMysql size={26} />,       bg: "bg-blue-600/10",                               color: "text-blue-600" },
  { name: "Supabase",   icon: <SiSupabase size={26} />,    bg: "bg-emerald-500/10",                            color: "text-emerald-500" },
  { name: "GSAP",       icon: <SiGreensock size={26} />,   bg: "bg-green-400/10",                              color: "text-green-400" },
  { name: "jQuery",     icon: <SiJquery size={26} />,      bg: "bg-blue-700/10",                               color: "text-blue-700" },
  { name: "C",          icon: <SiC size={26} />,            bg: "bg-blue-800/10",                               color: "text-blue-800 dark:text-blue-400" },
  { name: "C++",        icon: <SiCplusplus size={26} />,   bg: "bg-blue-600/10",                               color: "text-blue-600" },
  { name: "Windsurf",   icon: <SiWindsurf size={26} />,    bg: "bg-teal-500/10",                               color: "text-teal-500" },
  { name: "VS Code",    icon: <img src="/icon-vscode.svg"  width={26} height={26} loading="lazy" decoding="async" alt="VS Code" />, bg: "bg-blue-500/10", color: "text-blue-500" },
  { name: "Cursor",     icon: <img src="/icon-cursor.svg" width={26} height={26} loading="lazy" decoding="async" alt="Cursor" className="dark:invert" />, bg: "bg-neutral-200/60 dark:bg-neutral-800/80", color: "text-neutral-800 dark:text-neutral-200" },
  { name: "Replit",     icon: <SiReplit size={26} />,     bg: "bg-orange-500/10",                             color: "text-orange-500" },
  { name: "Vercel",     icon: <SiVercel size={26} />,     bg: "bg-neutral-800/10 dark:bg-neutral-300/10",     color: "text-neutral-800 dark:text-neutral-300" },
  { name: "Figma",      icon: <SiFigma size={26} />,      bg: "bg-purple-500/10",                             color: "text-purple-500" },
  { name: "Postman",    icon: <SiPostman size={26} />,    bg: "bg-orange-600/10",                             color: "text-orange-600" },
  { name: "Claude",     icon: <SiAnthropic size={26} />,  bg: "bg-amber-500/10",                              color: "text-amber-600" },
  { name: "Gemini",     icon: <SiGooglegemini size={26} />, bg: "bg-blue-400/10",                             color: "text-blue-500" },
  { name: "v0",         icon: <img src="/icon-v0.svg" width={26} height={26} loading="lazy" decoding="async" alt="v0" className="dark:invert" />, bg: "bg-neutral-800/10 dark:bg-neutral-300/10", color: "text-neutral-800 dark:text-neutral-200" },
  { name: "Amazon Q",   icon: <span className="text-[22px] font-black leading-none" style={{ fontFamily: "Georgia, serif" }}>Q</span>, bg: "bg-orange-400/10", color: "text-orange-500" },
  { name: "Flutter",        icon: <SiFlutter size={26} />,        bg: "bg-sky-400/10",    color: "text-sky-500" },
  { name: "Dart",           icon: <SiDart size={26} />,           bg: "bg-blue-500/10",   color: "text-blue-500" },
  { name: "Python",         icon: <SiPython size={26} />,         bg: "bg-yellow-400/10", color: "text-yellow-500" },
  { name: "Android Studio", icon: <SiAndroidstudio size={26} />,  bg: "bg-green-500/10",  color: "text-green-500" },
];

const MARQUEE_ICONS = [
  { name: "React",      icon: <SiReact size={18} />,       color: "text-cyan-400" },
  { name: "Next.js",    icon: <SiNextdotjs size={18} />,   color: "text-neutral-700 dark:text-neutral-300" },
  { name: "TypeScript", icon: <SiTypescript size={18} />,  color: "text-blue-600" },
  { name: "Node.js",    icon: <SiNodedotjs size={18} />,   color: "text-green-600" },
  { name: "Tailwind",   icon: <SiTailwindcss size={18} />, color: "text-teal-400" },
  { name: "MongoDB",    icon: <SiMongodb size={18} />,     color: "text-green-500" },
  { name: "Firebase",   icon: <SiFirebase size={18} />,    color: "text-orange-400" },
  { name: "Express",    icon: <SiExpress size={18} />,     color: "text-neutral-600 dark:text-neutral-300" },
  { name: "MySQL",      icon: <SiMysql size={18} />,       color: "text-blue-600" },
  { name: "Supabase",   icon: <SiSupabase size={18} />,    color: "text-emerald-500" },
  { name: "jQuery",     icon: <SiJquery size={18} />,      color: "text-blue-700" },
  { name: "C++",            icon: <SiCplusplus size={18} />,      color: "text-blue-600" },
  { name: "Android Studio", icon: <SiAndroidstudio size={18} />, color: "text-green-500" },
];

function useServices() {
  const t = useT();
  return [
    { label: t.home.services.web,    icon: <HiOutlineGlobe size={15} />,          color: "text-blue-500" },
    { label: t.home.services.mobile, icon: <HiOutlineDeviceMobile size={15} />,   color: "text-green-500" },
    { label: t.home.services.ai,     icon: <HiOutlineChip size={15} />,           color: "text-purple-500" },
    { label: t.home.services.uiux,   icon: <HiOutlineColorSwatch size={15} />,    color: "text-orange-500" },
  ];
}

const FEATURED_PROJECTS = PROJECTS.filter((p) => p.isFeatured).slice(0, 3);

function GlassIcon({ name, icon, bg, color }: { name: string; icon: React.ReactNode; bg: string; color: string }) {
  return (
    <div className="group flex flex-col items-center gap-2">
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-xl ${bg} ${color} border border-neutral-200 dark:border-neutral-800 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
        title={name}
      >
        {icon}
      </div>
      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 text-center leading-tight">{name}</span>
    </div>
  );
}

function BentoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 ${className}`}>
      {children}
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: typeof MARQUEE_ICONS; reverse?: boolean }) {
  const looped = [...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-3 w-max"
        style={{ animation: `${reverse ? "marquee-reverse" : "marquee"} 20s linear infinite` }}
      >
        {looped.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 shrink-0 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-1.5 text-xs font-medium ${item.color}`}
          >
            {item.icon}
            <span className="text-neutral-600 dark:text-neutral-400">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const MARQUEE_ROW1 = MARQUEE_ICONS.slice(0, Math.ceil(MARQUEE_ICONS.length / 3));
const MARQUEE_ROW2 = MARQUEE_ICONS.slice(Math.ceil(MARQUEE_ICONS.length / 3), Math.ceil((MARQUEE_ICONS.length * 2) / 3));
const MARQUEE_ROW3 = MARQUEE_ICONS.slice(Math.ceil((MARQUEE_ICONS.length * 2) / 3));

export default function DevProfilePage() {
  const t = useT();
  const services = useServices();
  return (
    <>
      <SEOHead
        title="Muhammad Imran - React and MERN Stack Developer Profile"
        description="Full developer profile of Muhammad Imran, a React and MERN stack web developer in Pakistan. Check out my skills and project history."
        path="/dev-profile"
      />
      {/* Introduction */}
      <section className="space-y-2 bg-cover bg-no-repeat">
        <div className="text-3xl font-medium text-neutral-900 dark:text-neutral-50">
          <h1>{t.home.greeting} {PERSONAL.name}</h1>
        </div>
        <div className="space-y-4">
          <ul className="ml-5 flex list-disc flex-col gap-x-10 gap-y-2 text-neutral-700 dark:text-neutral-400 md:flex-row">
            <li>{t.personal.location}</li>
            <li>{t.personal.locationType}</li>
          </ul>
          <div className="mt-6 space-y-4 leading-7 text-neutral-600 dark:text-neutral-300">
            {t.personal.bio.map((paragraph: string, i: number) => (
              <div key={i}>{paragraph}</div>
            ))}
          </div>
        </div>
      </section>

      <Breakline className="my-8" />

      {/* Skills */}
      <section className="space-y-6">
        <div className="space-y-2">
          <SectionHeading title={t.home.techStack} icon={<BiCodeAlt />} />
          <SectionSubHeading>
            <p>{t.home.techStackSub}</p>
          </SectionSubHeading>
        </div>
        <div className="grid w-full grid-cols-5 gap-x-4 gap-y-8 py-2 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-9 xl:grid-cols-9">
          {STACKS.map((stack, index) => (
            <GlassIcon key={index} {...stack} />
          ))}
        </div>
      </section>

      <Breakline className="my-8" />

      {/* Featured Sections Bento Grid */}
      <section className="space-y-6">
        <div className="space-y-2">
          <SectionHeading title={t.home.featuredSections} icon={<HiOutlineSparkles />} />
          <SectionSubHeading>
            <p>{t.home.featuredSub}</p>
          </SectionSubHeading>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">

          {/* Projects Showcase - spans 2 cols */}
          <BentoCard className="md:col-span-2 p-6 flex flex-col justify-between gap-4 min-h-[200px] group">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                <BiCollection size={18} className="text-yellow-500" />
                {t.nav.projects}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{t.projects.sub}</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {FEATURED_PROJECTS.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2">
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate">{p.name}</span>
                  <div className="flex gap-1 shrink-0">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="rounded-full bg-neutral-100 dark:bg-neutral-700 px-2 py-0.5 text-[10px] text-neutral-500 dark:text-neutral-400">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Link href="/projects">
              <span className="flex items-center gap-1 text-xs font-medium text-yellow-600 dark:text-yellow-400 group-hover:underline cursor-pointer">
                {t.common.viewAll} <HiOutlineExternalLink size={13} />
              </span>
            </Link>
          </BentoCard>

          {/* About Me */}
          <BentoCard className="p-6 flex flex-col justify-between gap-4 min-h-[180px] group">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                <BiUser size={18} className="text-blue-500" />
                {t.nav.about}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{t.about.sub}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-white font-bold text-base">MI</div>
              <div>
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{PERSONAL.name}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{t.personal.role}</p>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500">{t.personal.location}</p>
              </div>
            </div>
            <Link href="/about">
              <span className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:underline cursor-pointer">
                {t.common.learnMore} <HiOutlineExternalLink size={13} />
              </span>
            </Link>
          </BentoCard>

          {/* Achievements */}
          <BentoCard className="p-6 flex flex-col justify-between gap-4 min-h-[180px] group">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-1 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                <div className="flex items-center gap-2">
                  <PiCertificate size={18} className="text-green-500" />
                  {t.nav.achievements}
                </div>
                <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-600 dark:text-green-400 border border-green-500/20">
                  23 Verified
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{t.achievements.sub}</p>
            </div>
            
            {/* Featured Certificate Badges */}
            <div className="grid grid-cols-2 gap-2 my-1">
              <div className="flex items-center gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-2 text-indigo-700 dark:text-indigo-300">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20">
                  <PiCertificate size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold leading-tight truncate">ActAI SkillBridge</p>
                  <p className="text-[9px] text-neutral-500 dark:text-neutral-400 truncate">Certified Specialist</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/10 p-2 text-purple-700 dark:text-purple-300">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/20">
                  <PiCertificate size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold leading-tight truncate">UofL Full-Stack</p>
                  <p className="text-[9px] text-neutral-500 dark:text-neutral-400 truncate">Specialization</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 p-2 text-blue-700 dark:text-blue-300">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/20">
                  <PiCertificate size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold leading-tight truncate">Google Prompting</p>
                  <p className="text-[9px] text-neutral-500 dark:text-neutral-400 truncate">AI Essentials</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 p-2 text-amber-700 dark:text-amber-300">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
                  <PiCertificate size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold leading-tight truncate">DevHub Internship</p>
                  <p className="text-[9px] text-neutral-500 dark:text-neutral-400 truncate">Frontend & Flutter</p>
                </div>
              </div>
            </div>

            <Link href="/achievements">
              <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 group-hover:underline cursor-pointer">
                {t.common.viewCerts} <HiOutlineExternalLink size={13} />
              </span>
            </Link>
          </BentoCard>

          {/* Skills & Tools - scrolling marquee, spans 2 cols */}
          <BentoCard className="md:col-span-2 px-6 py-5 flex flex-col gap-4 group overflow-hidden">
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              <BiCodeAlt size={18} className="text-purple-500" />
              {t.home.techStack}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 -mt-2">{t.home.techStackSub}</p>
            <div className="flex flex-col gap-2 overflow-hidden">
              <MarqueeRow items={MARQUEE_ROW1} />
              <MarqueeRow items={MARQUEE_ROW2} reverse />
              <MarqueeRow items={MARQUEE_ROW3} />
            </div>
          </BentoCard>

          {/* Chat Room */}
          <BentoCard className="p-6 flex flex-col justify-between gap-4 min-h-[180px] group">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                <HiOutlineChatAlt2 size={18} className="text-pink-500" />
                {t.nav.chat}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{t.chat.sub}</p>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2 items-start">
                <div className="h-6 w-6 shrink-0 rounded-full bg-blue-500 flex items-center justify-center text-white text-[9px] font-bold">AR</div>
                <div className="rounded-xl rounded-tl-sm bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 text-[11px] text-neutral-700 dark:text-neutral-300">
                  Hi, is this your website?
                </div>
              </div>
              <div className="flex gap-2 items-start flex-row-reverse">
                <div className="h-6 w-6 shrink-0 rounded-full bg-indigo-700 flex items-center justify-center text-white text-[9px] font-bold">MI</div>
                <div className="rounded-xl rounded-tr-sm bg-yellow-400 px-3 py-1.5 text-[11px] text-neutral-900">
                  Yes, I built it myself!
                </div>
              </div>
            </div>
            <Link href="/chat">
              <span className="flex items-center gap-1 text-xs font-medium text-pink-600 dark:text-pink-400 group-hover:underline cursor-pointer">
                {t.common.joinChat} <HiOutlineExternalLink size={13} />
              </span>
            </Link>
          </BentoCard>

          {/* Services */}
          <BentoCard className="p-6 flex flex-col justify-between gap-4 min-h-[180px] group">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                <HiOutlineSparkles size={18} className="text-orange-500" />
                {t.contact.available}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{t.contact.availableSub}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {services.map(({ label, icon, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2"
                >
                  <span className={`${color} shrink-0`}>{icon}</span>
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
                </div>
              ))}
            </div>
            <Link href="/contact">
              <span className="flex items-center gap-1 text-xs font-medium text-orange-600 dark:text-orange-400 group-hover:underline cursor-pointer">
                {t.common.hireMe} <HiOutlineExternalLink size={13} />
              </span>
            </Link>
          </BentoCard>

        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
