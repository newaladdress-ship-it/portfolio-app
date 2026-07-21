import { Link, useLocation } from "wouter";
import { BiHomeCircle, BiCollection, BiCategory } from "react-icons/bi";
import { HiPlus } from "react-icons/hi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function BottomNav() {
  const [pathname] = useLocation();

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: <BiHomeCircle size={22} />,
    },
    {
      label: "Projects",
      href: "/projects",
      icon: <BiCollection size={22} />,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 dark:bg-yellow-500 text-neutral-900 shadow-lg border-4 border-white dark:border-black transform -translate-y-4 hover:scale-110 active:scale-95 transition-all duration-200">
          <HiPlus size={24} className="font-bold text-neutral-950" />
        </div>
      ),
      isPlus: true,
    },
    {
      label: "Feedback",
      href: "/feedback",
      icon: <HiOutlineChatBubbleLeftRight size={22} />,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <BiCategory size={22} />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-lg px-2 py-1 shadow-2xl md:hidden">
      <nav className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          if (item.isPlus) {
            return (
              <Link key={item.href} href={item.href} className="relative flex flex-col items-center">
                {item.icon}
                <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 -mt-3">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors duration-200 ${
                isActive
                  ? "text-yellow-500 dark:text-yellow-400 font-semibold"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
              }`}
            >
              <div className={`transition-transform duration-200 ${isActive ? "scale-110" : ""}`}>
                {item.icon}
              </div>
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
