import { Link, useLocation } from "react-router-dom";
import { Gem, Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "首页" },
  { to: "/studio", label: "设计工坊" },
  { to: "/gallery", label: "作品画廊" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#c9a04e]/15">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[#c9a04e] group"
        >
          <div className="relative">
            <Gem className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12" />
            <Sparkles className="w-3 h-3 text-[#e0c878] absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-display text-lg tracking-[0.15em]">
            CrystalDream
          </span>
        </Link>

        <div className="flex items-center">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-5 py-2 text-sm tracking-wide transition-all duration-300 font-medium ${
                pathname === link.to
                  ? "text-[#c9a04e]"
                  : "text-[#e8e4dd]/50 hover:text-[#e8e4dd]/80"
              }`}
            >
              {link.label}
              {pathname === link.to && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#c9a04e] rounded-full" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}