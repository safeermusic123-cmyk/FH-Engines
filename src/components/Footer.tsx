import React from 'react';
import { ArrowRight, ShieldCheck, MapPin, Phone, Mail, MessageSquare, Film } from 'lucide-react';
import { Footer3DBackground } from './Footer3DBackground';

interface FooterProps {
  onNavigate?: (page: 'home' | 'engines', targetSection?: string) => void;
  onRequestQuote?: () => void;
  onOpenVideoStudio?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestQuote, onOpenVideoStudio }) => {
  const handleNav = (page: 'home' | 'engines', target?: string) => {
    if (onNavigate) {
      onNavigate(page, target);
    } else {
      const el = target ? document.querySelector(target) : null;
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#070b14] text-zinc-400 border-t border-zinc-800/80 pt-16 pb-12 overflow-hidden">
      {/* 3D Background Video & Real-time Three.js Layer */}
      <Footer3DBackground />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-zinc-800/80">
          {/* Col 1: Brand & Description */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              {/* Stylized FH Monogram in Red & White */}
              <div className="w-10 h-10 rounded-lg bg-[#a31414] flex items-center justify-center font-heading font-black text-white text-lg tracking-tighter shadow-md">
                <span>F</span>
                <span className="text-zinc-200">H</span>
              </div>

              <div>
                <span className="font-heading font-black text-lg text-white tracking-tight block uppercase leading-none">
                  FH ENGINE
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-red-400 block mt-1">
                  SHARJAH · UAE
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm mb-6 font-normal">
              Specialized automotive engine supplier operating out of Sharjah, United Arab Emirates. Supplying complete tested petrol and diesel car engines to workshops, garages, dealerships, and builders worldwide.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 bg-zinc-900 px-3.5 py-2 rounded-lg border border-zinc-800">
              <ShieldCheck className="w-4 h-4 text-[#a31414]" />
              <span>EXCLUSIVELY AUTOMOTIVE ENGINES · VERIFIED ASSEMBLIES</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-wider text-white font-bold mb-4">
              QUICK NAVIGATION
            </div>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              <li>
                <button
                  onClick={() => handleNav('home', '#hero')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('engines', '#engine-catalog')}
                  className="hover:text-white transition-colors cursor-pointer text-left text-red-400 font-semibold"
                >
                  Full Engine Inventory
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('home', '#recent-arrivals')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Recent Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('home', '#about-us')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About FH Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('home', '#contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Request a Quotation
                </button>
              </li>
              {onOpenVideoStudio && (
                <li>
                  <button
                    onClick={onOpenVideoStudio}
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 text-red-400 font-semibold"
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Animate Video (Veo 3.1)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Sharjah Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs uppercase tracking-wider text-white font-bold mb-4">
              SHARJAH SUPPLY DESK
            </div>

            <div className="space-y-3 text-xs sm:text-sm font-medium text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#a31414] mt-0.5 shrink-0" />
                <span>Sharjah Industrial Area, Sharjah, United Arab Emirates</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#a31414] shrink-0" />
                <a
                  href="tel:+971585188315"
                  className="hover:text-white transition-colors font-bold text-white"
                >
                  +971 58 518 8315
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href="https://wa.me/971585188315"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 text-emerald-400 transition-colors"
                >
                  WhatsApp: +971 58 518 8315
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#a31414] shrink-0" />
                <span>orders@fhengine.com</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  if (onRequestQuote) onRequestQuote();
                  else handleNav('home', '#contact');
                }}
                className="w-full py-3 px-4 bg-[#a31414] hover:bg-[#881010] text-xs font-bold uppercase tracking-wider text-white transition-colors flex items-center justify-between rounded-lg cursor-pointer shadow-xs"
              >
                <span>Request Engine Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-500">
          <div>
            © {new Date().getFullYear()} FH ENGINE. All Rights Reserved.
          </div>
          <div className="text-right">
            Sharjah, UAE · Automotive Engine Supply & Worldwide Freight
          </div>
        </div>
      </div>
    </footer>
  );
};
