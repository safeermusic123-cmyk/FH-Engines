import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight, Phone, Film, Sparkles } from 'lucide-react';
import { AnimatedLogo } from './AnimatedLogo';

interface HeaderProps {
  currentPage: 'home' | 'engines' | 'engine-details';
  activeTab: 'Home' | 'Engines' | 'About' | 'Contact';
  onNavigate: (page: 'home' | 'engines', targetSection?: string, label?: 'Home' | 'Engines' | 'About' | 'Contact') => void;
  onRequestQuote: () => void;
  onExploreEngines: () => void;
  onOpenVideoStudio?: () => void;
  activeLogoVideoUrl?: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  activeTab,
  onNavigate,
  onRequestQuote,
  onExploreEngines,
  onOpenVideoStudio,
  activeLogoVideoUrl,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(currentPage !== 'home');

  useEffect(() => {
    if (currentPage !== 'home') {
      setIsHeaderVisible(true);
      return;
    }

    // Reveal top bar slowly 2.3 seconds after the video starts on home
    const timer = setTimeout(() => {
      setIsHeaderVisible(true);
    }, 2300);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

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

  const isSolidHeader = currentPage !== 'home' || isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        !isHeaderVisible
          ? 'opacity-0 -translate-y-5 pointer-events-none'
          : 'opacity-100 translate-y-0 pointer-events-auto'
      } ${
        isSolidHeader
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-zinc-200/80 py-3.5'
          : 'bg-transparent border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo Brand: FH Engine with Animated Emblem */}
          <div className="flex items-center">
            <AnimatedLogo
              customVideoUrl={activeLogoVideoUrl}
              onOpenStudio={onOpenVideoStudio}
            />
          </div>

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

          {/* Right Action Buttons: Veo Studio + Phone Call + Quote */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Veo Video Studio Button */}
            {onOpenVideoStudio && (
              <button
                type="button"
                onClick={onOpenVideoStudio}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-zinc-900 bg-white/90 hover:bg-white border border-red-200/80 hover:border-red-400 rounded-lg transition-all shadow-2xs backdrop-blur-xs cursor-pointer group"
                title="Animate photos and logo into video with Veo 3.1"
              >
                <Film className="w-3.5 h-3.5 text-[#a31414] group-hover:scale-110 transition-transform" />
                <span className="hidden lg:inline">Animate Video</span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-red-600 text-white uppercase tracking-wider">
                  Veo 3.1
                </span>
              </button>
            )}

            {/* Phone link */}
            <a
              href="tel:+971585188315"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-zinc-800 bg-white/80 hover:bg-white border border-zinc-200/80 rounded-lg transition-all shadow-2xs backdrop-blur-xs"
              title="Call Sharjah Desk"
            >
              <Phone className="w-3.5 h-3.5 text-[#a31414]" />
              <span className="hidden xl:inline">+971 58 518 8315</span>
              <span className="xl:hidden">Call</span>
            </a>

            <button
              onClick={onRequestQuote}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#a31414] hover:bg-[#881010] active:scale-[0.98] transition-all rounded-lg shadow-xs cursor-pointer"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {onOpenVideoStudio && (
              <button
                type="button"
                onClick={onOpenVideoStudio}
                className="p-2 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg"
                title="Veo Video Studio"
              >
                <Film className="w-4 h-4" />
              </button>
            )}
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
            {/* Veo Video Studio Highlight in Mobile Drawer */}
            {onOpenVideoStudio && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVideoStudio();
                }}
                className="flex items-center justify-between w-full p-3 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-left font-bold text-[#a31414] text-xs uppercase tracking-wider"
              >
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4" />
                  <span>Animate Video with Veo 3.1</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-600 text-white font-mono">
                  NEW
                </span>
              </button>
            )}

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
