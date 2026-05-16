import { useState, useEffect } from "react";
import { X, Bell } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export default function PWAInstallPrompt() {
  const [showNotifBanner, setShowNotifBanner] = useState(false);
  const { permission, subscribe } = usePushNotifications("visitor");

  useEffect(() => {
    if (localStorage.getItem("notif_banner_dismissed")) return;
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    if (!isStandalone && permission === "default") {
      const t = setTimeout(() => setShowNotifBanner(true), 5000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [permission]);

  const handleEnableNotifs = async () => {
    await subscribe();
    setShowNotifBanner(false);
  };

  const handleDismissNotif = () => {
    setShowNotifBanner(false);
    localStorage.setItem("notif_banner_dismissed", "1");
  };

  if (!showNotifBanner || permission !== "default" || localStorage.getItem("notif_banner_dismissed")) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 z-[99] animate-in slide-in-from-bottom-4 duration-500">
      <div className="relative overflow-hidden rounded-2xl border border-yellow-400/30 bg-white dark:bg-neutral-900 shadow-2xl shadow-black/20 p-5">
        <button
          onClick={handleDismissNotif}
          className="absolute top-3 right-3 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-neutral-400"
        >
          <X size={15} />
        </button>
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center border border-yellow-400/30">
            <Bell size={18} className="text-yellow-500" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">Stay in the loop</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Get notified when Muhammad replies to your messages.
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleEnableNotifs}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-neutral-900 text-sm font-bold transition-colors cursor-pointer"
          >
            <Bell size={14} />
            Enable Notifications
          </button>
          <button
            onClick={handleDismissNotif}
            className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
