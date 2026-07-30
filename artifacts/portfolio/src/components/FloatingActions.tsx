import { useState, useEffect } from "react";
import { MessageCircle, X, Phone } from "lucide-react";
import { HiOutlineSparkles } from "react-icons/hi";

const WA_MSG = encodeURIComponent(
  "Hi Muhammad! 👋 I visited your portfolio at https://www.imrandigitals.online and I'd like to get more info."
);

export default function FloatingActions() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const close = () => setExpanded(false);
    const timer = setTimeout(() => {
      document.addEventListener("click", close, { once: true });
    }, 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", close);
    };
  }, [expanded]);

  const openSmartTalk = () => {
    setExpanded(false);
    window.dispatchEvent(new Event("toggle-smarttalk"));
  };

  const openWhatsApp = () => {
    setExpanded(false);
    window.open(`https://wa.me/923019316123?text=${WA_MSG}`, "_blank", "noopener,noreferrer");
  };

  const openCall = () => {
    setExpanded(false);
    window.location.href = "tel:+923019316123";
  };

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 z-50 flex flex-col-reverse items-center gap-3">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setExpanded((p) => !p);
        }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
        aria-label="Quick actions"
      >
        {expanded ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      <div
        className={`flex flex-col items-center gap-3 transition-all duration-300 ${
          expanded
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            openCall();
          }}
          className="group relative w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
          aria-label="Call Me"
        >
          <Phone size={22} />
          <span className="absolute right-full mr-2 px-2 py-1 rounded-lg bg-neutral-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Call Me
          </span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openWhatsApp();
          }}
          className="group relative w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 32 32" width="22" height="22" fill="white">
            <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.613 4.64 1.773 6.667L2.667 29.333l6.853-1.746A13.285 13.285 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 24a11.28 11.28 0 0 1-5.787-1.6l-.413-.24-4.067 1.04 1.067-3.947-.267-.427A11.253 11.253 0 0 1 4.8 16c0-6.187 5.013-11.2 11.204-11.2 6.187 0 11.2 5.013 11.2 11.2 0 6.187-5.013 11.2-11.2 11.2zm6.147-8.4c-.333-.173-1.987-.987-2.293-1.093-.307-.107-.533-.16-.76.16-.227.32-.867 1.093-1.067 1.32-.2.227-.4.253-.733.08-.333-.173-1.413-.52-2.693-1.667-.987-.88-1.653-1.973-1.853-2.307-.2-.333-.02-.507.147-.68.16-.16.333-.413.507-.613.173-.2.227-.347.333-.573.107-.227.053-.427-.027-.6-.08-.173-.76-1.84-1.04-2.52-.28-.68-.56-.587-.76-.587-.2 0-.427-.027-.653-.027s-.6.08-.92.413c-.32.333-1.213 1.187-1.213 2.893s1.24 3.36 1.413 3.587c.173.227 2.44 3.72 5.907 5.213.827.36 1.467.573 1.973.733.827.267 1.587.227 2.187.14.667-.107 2.053-.84 2.347-1.653.293-.813.293-1.507.2-1.653-.093-.147-.307-.227-.64-.4z" />
          </svg>
          <span className="absolute right-full mr-2 px-2 py-1 rounded-lg bg-neutral-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            WhatsApp
          </span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openSmartTalk();
          }}
          className="group relative w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
          aria-label="SmartTalk AI"
        >
          <HiOutlineSparkles size={22} />
          <span className="absolute right-full mr-2 px-2 py-1 rounded-lg bg-neutral-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            SmartTalk
          </span>
        </button>
      </div>
    </div>
  );
}
