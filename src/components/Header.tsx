import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { useSmoothScroll } from './SmoothScrollProvider';

interface HeaderProps {
  onOpenSearch?: () => void;
  onRequestQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onRequestQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', target: '#hero' },
    { label: 'Our Engines', target: '#engine-range' },
    { label: 'Engine Sourcing', target: '#engine-sourcing' },
    { label: 'Global Shipping', target: '#global-shipping' },
    { label: 'About Us', target: '#about-us' },
    { label: 'Contact', target: '#contact' },
  ];

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    scrollTo(target, { offset: -70, duration: 1.2 });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-zinc-200/80 py-3.5'
          : 'bg-white/90 backdrop-blur-xs border-b border-zinc-200/50 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Editorial Title */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-sm bg-[#121316] text-white flex items-center justify-center font-heading font-extrabold text-sm tracking-wider transition-transform duration-200 group-hover:scale-105">
              <span className="text-emerald-400">A</span>S
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm sm:text-base tracking-tight text-[#121316] leading-none group-hover:text-[#144b37] transition-colors">
                AL-SABAH MOTORS <span className="text-[10px] font-mono text-zinc-600 font-normal">UAE</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-600 leading-tight mt-0.5">
                Automotive Engine Supply
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-medium uppercase tracking-wider text-zinc-600">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.target)}
                className="hover:text-[#121316] hover:text-[#144b37] transition-colors relative py-1 cursor-pointer focus:outline-none after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#144b37] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                aria-label="Search engines"
                className="p-2 text-zinc-500 hover:text-[#121316] hover:bg-zinc-100 rounded-sm transition-colors cursor-pointer"
                title="Search engine inventory"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onRequestQuote}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white bg-[#144b37] hover:bg-[#0f3829] active:scale-[0.99] transition-all rounded-xs cursor-pointer shadow-xs"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onRequestQuote}
              className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-white bg-[#144b37] rounded-xs"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-700 hover:text-black rounded-sm focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 text-xs font-mono text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dedicated UAE Engine Supply Hub</span>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.target)}
                className="text-left text-sm font-heading font-medium tracking-wide text-zinc-800 hover:text-[#144b37] py-1 border-b border-zinc-50"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenSearch) onOpenSearch();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium uppercase tracking-wider text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Engine Catalogue</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 text-xs font-medium uppercase tracking-wider text-white bg-[#144b37] hover:bg-[#0f3829] rounded-xs"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
