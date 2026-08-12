import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import PWAInstallButton from "@/components/PWAInstallButton";
import {
  BiHomeCircle,
  BiUser,
  BiCollection,
  BiCategory,
  BiBook,
} from "react-icons/bi";
import { PiCertificate } from "react-icons/pi";
import {
  HiOutlineChatAlt2,
  HiOutlineMenuAlt2,
  HiX,
} from "react-icons/hi";
import {
  HiOutlineBriefcase,
  HiOutlineRocketLaunch,
  HiOutlineChatBubbleLeftRight,
  HiOutlineSparkles,
  HiOutlineIdentification,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi2";
import { PERSONAL } from "@/data/personal";
import { useMenu } from "@/stores/menu";
import { useThemeStore } from "@/stores/theme";
import { useLanguageStore } from "@/stores/language";
import { useT, LOCALE_LABELS } from "@/lib/i18n";

function MenuItem({ title, href, icon, badge }: { title: string; href: string; icon: React.ReactNode; badge?: string }) {
  const [pathname] = useLocation();
  const isActive = pathname === href;
  const hideMenu = () => useMenu.getState().hideMenu();

  return (
    <Link
      href={href}
      onClick={hideMenu}
      className={`
        flex items-center gap-2.5 py-2 px-3.5 text-sm font-sans
        rounded-lg transition-all duration-200 group
        ${isActive
          ? "bg-[#FFFEFA] dark:bg-[#1B2421] text-[#17211E] dark:text-[#F5F2EC] font-medium border border-[#D9D4CA] dark:border-[#2A3632] shadow-xs"
          : "text-[#5C655F] dark:text-[#9DA6A0] hover:text-[#17211E] dark:hover:text-[#F5F2EC] hover:bg-[#FFFEFA]/60 dark:hover:bg-[#1B2421]/60"
        }
      `}
    >
      <div className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-[#C96A3D]" : ""}`}>
        {icon}
      </div>
      <div className="flex-grow flex items-center justify-between gap-2">
        <span>{title}</span>
        {badge && (
          <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#C96A3D]/15 text-[#C96A3D] dark:text-[#D4794B] border border-[#C96A3D]/30 leading-none">
            {badge}
          </span>
        )}
      </div>
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#C96A3D]" />
      )}
    </Link>
  );
}

function ThemeToggle() {
  const [theme, setTh] = useState(() => useThemeStore.getState().theme);
  useEffect(() => {
    return useThemeStore.subscribe((state) => setTh(state.theme));
  }, []);
  const toggleTheme = () => useThemeStore.getState().toggleTheme();
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all duration-300"
    >
      {theme === "dark" ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
    </button>
  );
}

function LanguageSwitcher() {
  const [locale, setLoc] = useState(() => useLanguageStore.getState().locale);
  useEffect(() => {
    return useLanguageStore.subscribe((state) => setLoc(state.locale));
  }, []);
  const cycleLocale = () => useLanguageStore.getState().cycleLocale();

  return (
    <button
      onClick={cycleLocale}
      title={`Language: ${LOCALE_LABELS[locale] || "EN"} - click to switch`}
      aria-label="Switch language"
      className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all duration-300 border border-neutral-200 dark:border-neutral-700 min-w-[38px] justify-center"
    >
      {LOCALE_LABELS[locale] || "EN"}
    </button>
  );
}

function ProfileAvatar({ size }: { size: number }) {
  const [imgError, setImgError] = useState(false);
  const initials = PERSONAL.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (!imgError && PERSONAL.profileImage) {
    return (
      <img
        src={PERSONAL.profileImage}
        alt={`${PERSONAL.name} profile photo`}
        width={size}
        height={size}
        fetchPriority="high"
        decoding="async"
        loading="eager"
        onError={() => setImgError(true)}
        className="rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-indigo-700 flex items-center justify-center text-white font-bold border-2 border-neutral-300 dark:border-neutral-700 shrink-0 select-none"
      style={{ width: size, height: size, fontSize: size * 0.3 }}
    >
      {initials}
    </div>
  );
}

function ProfileHeader({ imageSize }: { imageSize: number }) {
  const t = useT();
  return (
    <div className="flex items-center gap-2 sm:gap-3 lg:flex-col lg:items-start lg:gap-4 min-w-0">
      <ProfileAvatar size={imageSize} />
      <div className="lg:space-y-1 min-w-0">
        <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base lg:text-lg truncate">
          {PERSONAL.name}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 truncate">{t.personal.role}</p>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const t = useT();
  const [pathname] = useLocation();
  const [isOpen, setIsOpen] = useState(() => useMenu.getState().isOpen);
  const navRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    return useMenu.subscribe((state) => setIsOpen(state.isOpen));
  }, []);
  const toggleMenu = () => useMenu.getState().toggleMenu();
  const [isMobile, setIsMobile] = useState(false);

  const MENU_ITEMS = [
    { title: t.nav.home,         href: "/",           icon: <BiHomeCircle size={20} /> },
    { title: t.nav.about,        href: "/about",       icon: <BiUser size={20} /> },
    { title: t.nav.achievements, href: "/achievements", icon: <PiCertificate size={20} /> },
    { title: t.nav.projects,     href: "/projects",    icon: <BiCollection size={20} /> },
    { title: t.nav.services,     href: "/services",    icon: <HiOutlineBriefcase size={20} /> },
    { title: "Blog",             href: "/blog",        icon: <BiBook size={20} /> },
    { title: "Locations",        href: "/locations",   icon: <HiOutlineBriefcase size={20} /> },
    { title: t.nav.dashboard,    href: "/dashboard",   icon: <BiCategory size={20} /> },
    { title: t.nav.chat,         href: "/chat",        icon: <HiOutlineChatAlt2 size={20} /> },
    { title: t.nav.contact,      href: "/contact",     icon: <BiBook size={20} /> },
    { title: t.nav.feedback,     href: "/feedback",    icon: <HiOutlineChatBubbleLeftRight size={20} /> },
    { title: t.nav.smarttalk,    href: "/smarttalk",   icon: <HiOutlineSparkles size={20} /> },
    { title: "Dev Profile",      href: "/dev-profile", icon: <HiOutlineIdentification size={20} /> },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  // Synchronize sidebar scroll position with page scroll position
  useEffect(() => {
    if (isMobile) return;

    let rAFId: number | null = null;

    const syncScroll = () => {
      if (!navRef.current) return;

      const scrollTop = Math.max(
        window.scrollY || 0,
        window.pageYOffset || 0,
        document.documentElement.scrollTop || 0,
        document.body.scrollTop || 0
      );

      const scrollHeight = Math.max(
        document.documentElement.scrollHeight || 0,
        document.body.scrollHeight || 0
      );

      const clientHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const totalDocScroll = scrollHeight - clientHeight;

      if (totalDocScroll <= 10) return;

      const progress = Math.min(1, Math.max(0, scrollTop / totalDocScroll));
      const maxNavScroll = navRef.current.scrollHeight - navRef.current.clientHeight;

      if (maxNavScroll > 0) {
        navRef.current.scrollTop = Math.round(progress * maxNavScroll);
      }
    };

    const onScroll = () => {
      if (rAFId !== null) cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(syncScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    syncScroll();
    const timer1 = setTimeout(syncScroll, 100);
    const timer2 = setTimeout(syncScroll, 500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rAFId !== null) cancelAnimationFrame(rAFId);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isMobile, pathname]);

  const imageSize = isMobile ? 40 : 100;

  return (
    <header className="lg:w-1/5 shrink-0">
      <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] flex flex-col transition-all duration-300">
        {/* Mobile Header Top Bar */}
        {isMobile && (
          <div
            className={`fixed top-0 left-0 right-0 z-30 w-full max-w-full bg-white/90 dark:bg-black/90 backdrop-blur-md px-3 py-3 sm:p-5 shadow-sm dark:border-b dark:border-neutral-800 transition-colors duration-200 shrink-0 ${isOpen ? "pb-0" : ""}`}
          >
            <div className="flex items-center justify-between">
              <ProfileHeader imageSize={40} />
              <div className={`flex items-center gap-3 shrink-0 ${isOpen ? "h-[130px] flex-col-reverse !items-end justify-between pb-1" : ""}`}>
                <div className="flex gap-1.5 items-center">
                  <PWAInstallButton />
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
                <button
                  onClick={toggleMenu}
                  aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={isOpen}
                  aria-controls="mobile-nav"
                  className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all duration-300"
                >
                  {isOpen ? <HiX size={22} /> : <HiOutlineMenuAlt2 size={22} />}
                </button>
              </div>
            </div>

            {/* Mobile menu dropdown */}
            {isOpen && (
              <div id="mobile-nav" className="overflow-hidden transition-all duration-300">
                <div className="mt-4 pb-4 space-y-1">
                  {MENU_ITEMS.map((item) => (
                    <MenuItem key={item.href} {...item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Desktop Sidebar Layout - Profile Header at Top, Scrollable Nav with Dynamic Bottom Controls (No Scrollbar) */}
        <div className="hidden lg:flex lg:flex-col lg:h-full min-h-0">
          {/* PINNED TOP: Profile Header */}
          <div className="shrink-0 pb-3">
            <ProfileHeader imageSize={100} />
          </div>

          <div className="border-t border-neutral-300 dark:border-neutral-700 mb-3 shrink-0" />

          {/* SCROLLABLE MIDDLE: Menu Items + Dynamic Bottom Controls (Scrollbar Hidden) */}
          <nav
            ref={navRef}
            className="flex-1 min-h-0 overflow-y-auto space-y-1 pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {MENU_ITEMS.map((item) => (
              <MenuItem key={item.href} {...item} />
            ))}

            {/* DYNAMIC BOTTOM: Controls & Copyright (Shows when scrolled to bottom) */}
            <div className="border-t border-neutral-300 dark:border-neutral-700 pt-3 mt-4">
              <div className="flex items-center gap-2 px-2">
                <ThemeToggle />
                <LanguageSwitcher />
                <PWAInstallButton />
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 px-2 mt-2 pb-2">
                © {new Date().getFullYear()} {PERSONAL.name}
              </p>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
