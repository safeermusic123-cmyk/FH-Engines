import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { useSmoothScroll } from './SmoothScrollProvider';

interface HeaderProps {
  onRequestQuote: () => void;
  onExploreEngines: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRequestQuote, onExploreEngines }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Shipping removed per user request
  const navItems = [
    { label: 'Home', target: '#hero' },
    { label: 'Engines', target: '#engine-catalog' },
    { label: 'About', target: '#about-us' },
    { label: 'Contact', target: '#contact' },
  ];

  const handleNavClick = (label: string, target: string) => {
    setActiveTab(label);
    setMobileMenuOpen(false);
    scrollTo(target, { offset: -70, duration: 1.1 });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-zinc-200/80 py-3.5'
          : 'bg-white/85 backdrop-blur-sm border-b border-zinc-200/40 py-4.5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo Brand: Matching hero section reference */}
          <button
            onClick={() => handleNavClick('Home', '#hero')}
            className="flex items-center gap-3 text-left cursor-pointer focus:outline-none group"
          >
            {/* Stylized AE Monogram */}
            <div className="flex items-center">
              <svg
                width="34"
                height="32"
                viewBox="0 0 34 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform group-hover:scale-105"
              >
                <path
                  d="M11.5 2.5L2 29.5H8L10 23.5H16.5L14 16H11.5L13 11.5L17.5 24.5L19 29.5H23L15.5 2.5H11.5Z"
                  fill="#0f172a"
                />
                <rect x="18" y="5.5" width="13" height="4.5" rx="0.5" fill="#a31414" />
                <rect x="18.5" y="14" width="10.5" height="4.5" rx="0.5" fill="#a31414" />
                <rect x="18" y="22.5" width="13" height="4.5" rx="0.5" fill="#a31414" />
              </svg>
            </div>

            {/* Brand text */}
            <div className="flex flex-col">
              <span className="font-heading font-black text-sm sm:text-base tracking-tight text-[#0f172a] uppercase leading-none">
                AUTO ENGINES
              </span>
              <span className="text-[9px] uppercase font-mono tracking-[0.22em] text-zinc-500 font-medium mt-1">
                DUBAI · GLOBAL SUPPLY
              </span>
            </div>
          </button>

          {/* Center Navigation Links: Home, Engines, About, Contact (Shipping removed) */}
          <nav className="hidden md:flex items-center space-x-10 text-sm font-medium text-zinc-700">
            {navItems.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.label, item.target)}
                  className="relative py-1 cursor-pointer transition-colors hover:text-[#0f172a] focus:outline-none text-[14px] tracking-normal"
                >
                  <span className={isActive ? 'text-[#0f172a] font-semibold' : 'text-zinc-600'}>
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#a31414] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={onExploreEngines}
              aria-label="Search engines"
              className="p-2 text-zinc-600 hover:text-[#a31414] transition-colors cursor-pointer"
              title="Search engines"
            >
              <Search className="w-4 h-4 stroke-[2]" />
            </button>

            <button
              onClick={onRequestQuote}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#a31414] hover:bg-[#881010] active:scale-[0.98] transition-all rounded-md shadow-xs cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onRequestQuote}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#a31414] rounded-md"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-zinc-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 px-6 py-5 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3.5">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label, item.target)}
                className={`text-left text-sm py-2 border-b border-zinc-100 flex items-center justify-between ${
                  activeTab === item.label ? 'text-[#a31414] font-semibold' : 'text-zinc-700'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.label && (
                  <span className="w-2 h-2 rounded-full bg-[#a31414]" />
                )}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="mt-2 flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#a31414] hover:bg-[#881010] rounded-md"
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
