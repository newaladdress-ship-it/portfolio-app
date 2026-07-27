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
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA]/95 dark:bg-[#121917]/95 backdrop-blur-md px-2 py-1 shadow-lg md:hidden">
      <nav className="flex items-center justify-around h-16 max-w-lg mx-auto font-sans">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          if (item.isPlus) {
            return (
              <Link key={item.href} href={item.href} className="relative flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C96A3D] text-white shadow-md border-4 border-[#F5F2EC] dark:border-[#121917] transform -translate-y-4 hover:scale-105 active:scale-95 transition-all duration-200">
                  <HiPlus size={24} className="font-bold text-white" />
                </div>
                <span className="text-[10px] font-medium text-[#5C655F] dark:text-[#9DA6A0] -mt-3">
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
                  ? "text-[#C96A3D] dark:text-[#D4794B] font-semibold"
                  : "text-[#5C655F] dark:text-[#9DA6A0] hover:text-[#17211E] dark:hover:text-[#F5F2EC]"
              }`}
            >
              <div className={`transition-transform duration-200 ${isActive ? "scale-105" : ""}`}>
                {item.icon}
              </div>
              <span className="text-[10px] mt-1 font-medium font-mono">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
