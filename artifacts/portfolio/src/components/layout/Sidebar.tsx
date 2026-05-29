import { Link, useLocation } from "wouter";
import PWAInstallButton from "@/components/PWAInstallButton";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BiHomeCircle,
  BiUser,
  BiCollection,
  BiCategory,
  BiBook,
} from "react-icons/bi";
import { PiCertificate } from "react-icons/pi";
import {
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineMenuAlt2,
  HiX,
  HiOutlineChatAlt2,
  HiOutlineSparkles,
  HiOutlineBriefcase,
} from "react-icons/hi";
import { HiOutlineChatBubbleLeftRight, HiOutlineShieldCheck, HiOutlineShieldExclamation, HiOutlineRocketLaunch, HiOutlineIdentification } from "react-icons/hi2";
import { useThemeStore } from "@/stores/theme";
import { useMenu } from "@/stores/menu";
import { useLanguageStore } from "@/stores/language";
import { useProtectionStore } from "@/stores/protection";
import { useT, LOCALE_LABELS } from "@/lib/i18n";
import { PERSONAL } from "@/data/personal";

function MenuItem({ title, href, icon, badge }: { title: string; href: string; icon: React.ReactNode; badge?: string }) {
  const [pathname] = useLocation();
  const { hideMenu } = useMenu();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={hideMenu}
      className={`
        flex items-center gap-2 py-2 px-4
        text-neutral-700 dark:text-neutral-400
        hover:text-neutral-900 hover:dark:text-neutral-300
        rounded-lg group
        lg:hover:scale-105 lg:transition-all lg:duration-300
        ${isActive
          ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:!text-neutral-200"
          : "hover:dark:lg:bg-neutral-800 hover:dark:!text-neutral-300 hover:lg:bg-neutral-200 hover:lg:rounded-lg"
        }
      `}
    >
      <div className={`transition-all duration-300 group-hover:-rotate-12 ${isActive ? "animate-pulse" : ""}`}>
        {icon}
      </div>
      <div className="flex-grow flex items-center gap-2">
        {title}
        {badge && (
          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-yellow-400/20 text-yellow-800 dark:text-yellow-300 border border-yellow-400/30 leading-none">
            {badge}
          </span>
        )}
      </div>
      {isActive && (
        <svg className="w-5 h-5 text-gray-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
        </svg>
      )}
    </Link>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
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
  const { locale, cycleLocale } = useLanguageStore();
  return (
    <button
      onClick={cycleLocale}
      title={`Language: ${LOCALE_LABELS[locale]} — click to switch`}
      aria-label="Switch language"
      className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all duration-300 border border-neutral-200 dark:border-neutral-700 min-w-[38px] justify-center"
    >
      {LOCALE_LABELS[locale]}
    </button>
  );
}

function ProtectionToggle() {
  const { isProtected, toggle } = useProtectionStore();
  return (
    <button
      onClick={toggle}
      aria-label={isProtected ? "Code protection ON — click to disable" : "Code protection OFF — click to enable"}
      title={isProtected ? "Code protection ON — click to disable" : "Code protection OFF — click to enable"}
      className={`p-2 rounded-lg transition-all duration-300 ${
        isProtected
          ? "text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
          : "text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
      }`}
    >
      {isProtected
        ? <HiOutlineShieldCheck size={20} />
        : <HiOutlineShieldExclamation size={20} />
      }
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
  const { isOpen, toggleMenu, hideMenu } = useMenu();
  const [isMobile, setIsMobile] = useState(false);

  const MENU_ITEMS = [
    { title: t.nav.home,         href: "/",           icon: <BiHomeCircle size={20} /> },
    { title: t.nav.about,        href: "/about",       icon: <BiUser size={20} /> },
    { title: t.nav.achievements, href: "/achievements", icon: <PiCertificate size={20} /> },
    { title: t.nav.projects,     href: "/projects",    icon: <BiCollection size={20} /> },
    { title: t.nav.services,     href: "/services",    icon: <HiOutlineBriefcase size={20} /> },
    { title: "Hire Me",          href: "/hire-me",     icon: <HiOutlineRocketLaunch size={20} /> },
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

  const imageSize = isMobile ? 40 : 100;

  return (
    <header className="lg:w-1/5">
      <div className="sticky top-0 z-10 flex flex-col transition-all duration-300 lg:max-h-screen lg:overflow-y-auto lg:py-8 lg:pr-1 lg:[scrollbar-width:thin]">
        {/* Mobile/Desktop Header */}
        <div
          className={`fixed z-20 w-full max-w-full bg-white px-3 py-3 sm:p-5 shadow-sm dark:border-b dark:border-neutral-800 dark:bg-black lg:relative lg:border-none lg:!bg-transparent lg:p-0 xl:shadow-none transition-colors duration-200 ${isOpen ? "pb-0" : ""}`}
        >
          <div className="flex items-center justify-between lg:flex-col lg:space-y-4">
            <ProfileHeader imageSize={imageSize} />
            {isMobile && (
              <div className={`flex items-center gap-3 lg:hidden shrink-0 ${isOpen ? "h-[130px] flex-col-reverse !items-end justify-between pb-1" : ""}`}>
                <div className="flex gap-1.5 items-center">
                  <PWAInstallButton />
                  <ProtectionToggle />
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
            )}
          </div>

          {/* Mobile menu */}
          {isMobile && (
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id="mobile-nav"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pb-4 space-y-1">
                    {MENU_ITEMS.map((item) => (
                      <MenuItem key={item.href} {...item} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Desktop sidebar content */}
        <div className="hidden lg:block mt-16 lg:mt-0">
          <div className="border-t border-neutral-300 dark:border-neutral-700 my-4" />
          <nav className="space-y-1">
            {MENU_ITEMS.map((item) => (
              <MenuItem key={item.href} {...item} />
            ))}
          </nav>
          <div className="border-t border-neutral-300 dark:border-neutral-700 my-4" />
          <div className="flex flex-wrap items-center gap-2 px-4">
            <ProtectionToggle />
            <ThemeToggle />
            <LanguageSwitcher />
            <PWAInstallButton />
          </div>
          <div className="border-t border-neutral-300 dark:border-neutral-700 my-4" />
          <div className="flex flex-wrap items-center justify-center gap-1 text-center text-sm text-neutral-600 dark:text-neutral-400">
            <p>© {new Date().getFullYear()}</p>
            <p className="font-medium">{PERSONAL.name}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
