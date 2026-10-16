import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight, Phone } from 'lucide-react';

interface HeaderProps {
  currentPage: 'home' | 'engines';
  activeTab: 'Home' | 'Engines' | 'About' | 'Contact';
  onNavigate: (page: 'home' | 'engines', targetSection?: string, label?: 'Home' | 'Engines' | 'About' | 'Contact') => void;
  onRequestQuote: () => void;
  onExploreEngines: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  activeTab,
  onNavigate,
  onRequestQuote,
  onExploreEngines,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: 'Home' | 'Engines' | 'About' | 'Contact'; page: 'home' | 'engines'; target: string }[] = [
    { label: 'Home', page: 'home', target: '#hero' },
    { label: 'Engines', page: 'engines', target: '#engine-catalog' },
    { label: 'About', page: 'home', target: '#about-us' },
    { label: 'Contact', page: 'home', target: '#contact' },
  ];

  const handleNavClick = (label: 'Home' | 'Engines' | 'About' | 'Contact', page: 'home' | 'engines', target: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, target, label);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-xs border-b border-zinc-200/60 py-3.5'
          : 'bg-transparent border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo Brand: FH Engine */}
          <button
            onClick={() => handleNavClick('Home', 'home', '#hero')}
            className="flex items-center gap-3 text-left cursor-pointer focus:outline-none group"
          >
            {/* Stylized FH Monogram in Red & Dark Slate */}
            <div className="w-9 h-9 rounded-lg bg-[#0f172a] flex items-center justify-center font-heading font-black text-white text-base tracking-tighter shadow-xs group-hover:bg-[#a31414] transition-colors">
              <span className="text-white">F</span>
              <span className="text-[#a31414] group-hover:text-white transition-colors">H</span>
            </div>

            {/* Brand text */}
            <div className="flex flex-col">
              <span className="font-heading font-black text-base sm:text-lg tracking-tight text-[#0f172a] uppercase leading-none">
                FH ENGINE
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#a31414] mt-0.5">
                SHARJAH · UAE
              </span>
            </div>
          </button>

          {/* Center Navigation Links with Smooth Active Bar Animation */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2 text-sm font-semibold text-zinc-700 bg-white/40 backdrop-blur-xs px-3 py-1.5 rounded-full border border-zinc-200/50 shadow-2xs">
            {navItems.map((item) => {
              const isActive = activeTab === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.label, item.page, item.target)}
                  className={`relative px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none text-[13.5px] ${
                    isActive
                      ? 'text-[#a31414] font-extrabold'
                      : 'text-zinc-700 hover:text-[#0f172a] hover:bg-white/60 font-semibold'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <span className="absolute inset-0 bg-white shadow-2xs rounded-full border border-red-100 transition-all duration-300 z-0 animate-in fade-in zoom-in-95 duration-200" />
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#a31414] rounded-full z-10 transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons: Direct Phone Call + Quote */}
          <div className="hidden sm:flex items-center space-x-3.5">
            {/* Phone link */}
            <a
              href="tel:+971585188315"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-zinc-800 bg-white/80 hover:bg-white border border-zinc-200/80 rounded-lg transition-all shadow-2xs backdrop-blur-xs"
              title="Call Sharjah Desk"
            >
              <Phone className="w-3.5 h-3.5 text-[#a31414]" />
              <span>+971 58 518 8315</span>
            </a>

            <button
              onClick={onRequestQuote}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#a31414] hover:bg-[#881010] active:scale-[0.98] transition-all rounded-lg shadow-xs cursor-pointer"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="tel:+971585188315"
              className="p-2 text-xs font-bold text-zinc-800 bg-white/80 border border-zinc-200/70 rounded-lg"
              aria-label="Call +971 58 518 8315"
            >
              <Phone className="w-4 h-4 text-[#a31414]" />
            </a>
            <button
              onClick={onRequestQuote}
              className="px-3 py-1.5 text-xs font-bold uppercase text-white bg-[#a31414] rounded-lg"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-zinc-800 bg-white/80 rounded-lg border border-zinc-200/70"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-zinc-200 px-6 py-5 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3.5">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label, item.page, item.target)}
                className={`text-left text-sm font-semibold py-2.5 border-b border-zinc-100 flex items-center justify-between ${
                  activeTab === item.label ? 'text-[#a31414] font-bold' : 'text-zinc-800'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.label && (
                  <span className="w-2 h-2 rounded-full bg-[#a31414]" />
                )}
              </button>
            ))}

            <a
              href="tel:+971585188315"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-zinc-800 bg-zinc-100 rounded-lg"
            >
              <Phone className="w-3.5 h-3.5 text-[#a31414]" />
              <span>+971 58 518 8315</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#a31414] hover:bg-[#881010] rounded-lg"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
