import React from 'react';
import { CloudCog } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'steps', label: 'Steps' },
    { id: 'scripts', label: 'Scripts' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 h-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600">
          <CloudCog size={28} />
          <span className="font-bold text-slate-900 text-lg tracking-tight">Azure<span className="text-blue-600">Automator</span></span>
        </div>

        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`text-sm font-medium transition-colors duration-200 ${
                activeSection === item.id
                  ? 'text-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button placeholder (optional for this scope) */}
        <div className="md:hidden">
            <span className="text-xs text-slate-500">Menu</span>
        </div>
      </div>
    </header>
  );
};