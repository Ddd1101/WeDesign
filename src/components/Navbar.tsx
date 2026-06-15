import { Link, useLocation } from 'react-router-dom';
import { Gem } from 'lucide-react';

const links = [
  { to: '/', label: '首页' },
  { to: '/studio', label: '设计工坊' },
  { to: '/gallery', label: '作品画廊' },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#1a0a2e]/70 border-b border-[#d4a843]/20">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-[#d4a843] font-semibold text-lg tracking-wider">
          <Gem className="w-6 h-6" />
          <span className="font-['Playfair_Display',serif]">CrystalDream</span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                pathname === link.to
                  ? 'bg-[#d4a843]/20 text-[#d4a843] shadow-[0_0_12px_rgba(212,168,67,0.15)]'
                  : 'text-[#f8f0e3]/70 hover:text-[#f8f0e3] hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}