import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation, Link } from "wouter";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import Sidebar from "@/components/layout/Sidebar";
import BottomNav from "@/components/layout/BottomNav";
import SiteFooter from "@/components/layout/SiteFooter";
import { initTheme } from "@/lib/theme";
import { useT } from "@/lib/i18n";

const ChatWidget       = lazy(() => import("@/components/chat/ChatWidget"));
const FloatingActions  = lazy(() => import("@/components/FloatingActions"));
const PWAInstallPrompt = lazy(() => import("@/components/PWAInstallPrompt"));

import HomePage from "@/pages/HomePage";
const DevProfilePage   = lazy(() => import("@/pages/DevProfilePage"));
const AboutPage        = lazy(() => import("@/pages/AboutPage"));
const AchievementsPage = lazy(() => import("@/pages/AchievementsPage"));
const ProjectsPage     = lazy(() => import("@/pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetailPage"));
const DashboardPage    = lazy(() => import("@/pages/DashboardPage"));
const ChatRoomPage     = lazy(() => import("@/pages/ChatRoomPage"));
const ContactPage      = lazy(() => import("@/pages/ContactPage"));
const SmartTalkPage    = lazy(() => import("@/pages/SmartTalkPage"));
const FeedbackPage     = lazy(() => import("@/pages/FeedbackPage"));
const ServicesIndexPage = lazy(() => import("@/pages/ServicesIndexPage"));
const ServicePage      = lazy(() => import("@/pages/ServicePage"));
const LocationsIndexPage = lazy(() => import("@/pages/LocationsIndexPage"));
const LocationPage     = lazy(() => import("@/pages/LocationPage"));
const BlogIndexPage    = lazy(() => import("@/pages/BlogIndexPage"));
const BlogPostPage     = lazy(() => import("@/pages/BlogPostPage"));
const AdminPage        = lazy(() => import("@/pages/AdminPage"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-24" aria-label="Loading page">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-600 dark:border-neutral-800 dark:border-t-neutral-400" />
    </div>
  );
}

function NotFound() {
  const t = useT();
  return (
    <div className="flex flex-col items-center justify-center py-20 text-neutral-500 dark:text-neutral-400">
      <h1 className="text-6xl font-bold text-neutral-300 dark:text-neutral-700">404</h1>
      <p className="mt-4 text-lg">{t.common.pageNotFound}</p>
    </div>
  );
}

function usePageOrder() {
  const t = useT();
  return [
    { path: "/",            label: t.nav.home },
    { path: "/about",       label: t.nav.about },
    { path: "/achievements",label: t.nav.achievements },
    { path: "/projects",    label: t.nav.projects },
    { path: "/services",    label: t.nav.services },
    { path: "/dashboard",   label: t.nav.dashboard },
    { path: "/chat",        label: t.nav.chat },
    { path: "/contact",     label: t.nav.contact },
    { path: "/feedback",    label: t.nav.feedback },
    { path: "/smarttalk",   label: t.nav.smarttalk },
  ];
}

function NextPageButton() {
  const [location] = useLocation();
  const t = useT();
  const PAGE_ORDER = usePageOrder();

  const idx = PAGE_ORDER.findIndex((p) => p.path === location);
  if (idx === -1) return null;

  const prev = idx > 0 ? PAGE_ORDER[idx - 1] : null;
  const next = idx < PAGE_ORDER.length - 1
    ? PAGE_ORDER[idx + 1]
    : PAGE_ORDER[0];

  const isLast = idx === PAGE_ORDER.length - 1;

  return (
    <div className={`mt-12 flex items-center ${prev ? "justify-between" : "justify-end"}`}>
      {prev && (
        <Link
          href={prev.path}
          className="group flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <HiArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline text-xs text-neutral-400 dark:text-neutral-600 mr-1">{t.pagination.back}</span>
          {prev.label}
        </Link>
      )}
      <Link
        href={next.path}
        className="group flex items-center gap-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 px-5 py-2.5 text-sm font-semibold text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        {isLast ? (
          <>
            <span>{t.pagination.backToHome}</span>
            <HiArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </>
        ) : (
          <>
            <span>{t.pagination.next} {next.label}</span>
            <HiArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </>
        )}
      </Link>
    </div>
  );
}


function AppLayout() {
  const [isDeferredLoaded, setIsDeferredLoaded] = React.useState(false);

  useEffect(() => {
    // Load non-critical components after a delay to improve FCP/LCP
    const timer = setTimeout(() => setIsDeferredLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      <div className="mx-auto max-w-6xl">
        <div className="flex min-h-screen flex-col lg:flex-row lg:gap-8 lg:py-8 lg:px-4">
          <Sidebar />
          <main className="flex flex-1 flex-col py-8 pt-24 pb-24 md:pb-8 lg:pt-0 px-5 lg:px-0 min-w-0 overflow-x-hidden">
            <Suspense fallback={<PageLoader />}>
              <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/dev-profile" component={DevProfilePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/achievements" component={AchievementsPage} />
                <Route path="/projects" component={ProjectsPage} />
                <Route path="/projects/:slug" component={ProjectDetailPage} />
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/chat" component={ChatRoomPage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/feedback" component={FeedbackPage} />
                <Route path="/smarttalk" component={SmartTalkPage} />
                <Route path="/services" component={ServicesIndexPage} />
                <Route path="/services/:slug" component={ServicePage} />
                <Route path="/locations" component={LocationsIndexPage} />
                <Route path="/locations/:slug" component={LocationPage} />
                <Route path="/blog" component={BlogIndexPage} />
                <Route path="/blog/:slug" component={BlogPostPage} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
            <NextPageButton />
            <SiteFooter />
          </main>
        </div>
      </div>
      <BottomNav />
      {isDeferredLoaded && (
        <Suspense fallback={null}>
          <ChatWidget />
          <FloatingActions />
          <PWAInstallPrompt />
        </Suspense>
      )}
    </div>
  );
}

function RootRouter() {
  const [location] = useLocation();
  const isAdmin = location === "/admin" || location.startsWith("/admin/");

  if (isAdmin) {
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminPage />
      </Suspense>
    );
  }
  return <AppLayout />;
}

export default function App() {
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <RootRouter />
    </WouterRouter>
  );
}
