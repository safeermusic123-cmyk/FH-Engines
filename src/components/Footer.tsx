import React from 'react';
import { ArrowRight, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { useSmoothScroll } from './SmoothScrollProvider';

export const Footer: React.FC = () => {
  const { scrollTo } = useSmoothScroll();

  const handleNav = (target: string) => {
    scrollTo(target, { offset: -70, duration: 1.1 });
  };

  return (
    <footer className="bg-[#0f172a] text-zinc-400 border-t border-zinc-800 pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-zinc-800">
          {/* Col 1: Brand matching Top Bar */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              {/* Stylized AE Monogram */}
              <div className="flex items-center">
                <svg
                  width="34"
                  height="32"
                  viewBox="0 0 34 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 2.5L2 29.5H8L10 23.5H16.5L14 16H11.5L13 11.5L17.5 24.5L19 29.5H23L15.5 2.5H11.5Z"
                    fill="#ffffff"
                  />
                  <rect x="18" y="5.5" width="13" height="4.5" rx="0.5" fill="#a31414" />
                  <rect x="18.5" y="14" width="10.5" height="4.5" rx="0.5" fill="#a31414" />
                  <rect x="18" y="22.5" width="13" height="4.5" rx="0.5" fill="#a31414" />
                </svg>
              </div>

              <div>
                <span className="font-heading font-black text-base text-white tracking-tight block uppercase leading-none">
                  AUTO ENGINES
                </span>
                <span className="text-[9px] uppercase font-mono tracking-[0.22em] text-red-400 block mt-1">
                  DUBAI · GLOBAL SUPPLY
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mb-6 font-normal">
              Dedicated automotive engine supplier operating out of Dubai, United Arab Emirates. Supplying complete car engines and verified assemblies to workshops, dealerships, and vehicle owners worldwide.
            </p>

            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-300 bg-zinc-900 px-3 py-1.5 rounded-sm border border-zinc-800">
              <ShieldCheck className="w-4 h-4 text-[#a31414]" />
              <span>EXCLUSIVELY CAR ENGINES · ZERO GENERAL PARTS</span>
            </div>
          </div>

          {/* Col 2: Navigation Links matching Top Bar */}
          <div className="lg:col-span-3">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold mb-4">
              // NAVIGATION
            </div>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <button
                  onClick={() => handleNav('#hero')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#engine-catalog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Our Engines
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNav('#about-us')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Dubai Contact Details [Editable] */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold mb-4">
              // DUBAI SUPPLY DESK
            </div>

            <div className="space-y-2.5 text-xs font-mono text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#a31414] mt-0.5 shrink-0" />
                <span>Dubai Auto Zone (DAZ) & Industrial Area, Dubai, UAE [EDITABLE]</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#a31414] shrink-0" />
                <span>WhatsApp: +971 50 000 0000 [EDITABLE]</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#a31414] shrink-0" />
                <span>Email: supply@autoengines-dubai.com [EDITABLE]</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => handleNav('#contact')}
                className="w-full py-2.5 px-4 bg-[#a31414] hover:bg-[#881010] text-xs font-semibold text-white transition-colors flex items-center justify-between rounded-md cursor-pointer shadow-xs"
              >
                <span>Request Engine Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} AUTO ENGINES DUBAI [EDITABLE PLACEHOLDER].
          </div>
          <div className="text-right">
            Dedicated Automotive Engine Supplier · Dubai & Worldwide Export
          </div>
        </div>
      </div>
    </footer>
  );
};
