import React from 'react';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, Compass } from 'lucide-react';
import { useSmoothScroll } from './SmoothScrollProvider';

export const Footer: React.FC = () => {
  const { scrollTo } = useSmoothScroll();

  const handleNav = (target: string) => {
    scrollTo(target, { offset: -70, duration: 1.2 });
  };

  return (
    <footer className="bg-[#111215] text-zinc-300 border-t border-zinc-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-zinc-800/80">
          {/* Col 1: Brand & Specialization */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xs bg-white text-[#111215] flex items-center justify-center font-heading font-extrabold text-sm tracking-wider">
                <span className="text-[#144b37]">A</span>S
              </div>
              <div>
                <span className="font-heading font-bold text-base text-white tracking-tight block">
                  AL-SABAH MOTORS <span className="text-[10px] font-mono text-zinc-500">UAE</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block">
                  Automotive Engine Supply
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-normal mb-6 max-w-sm">
              Dedicated automotive engine supplier operating out of the United Arab Emirates. Specializing exclusively in complete car engines and verified assemblies for workshops, traders, and private builds globally.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-xs text-[11px] font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero General Parts · Strictly Engine Assemblies</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => handleNav('#hero')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#engine-range')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Our Engines
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#engine-sourcing')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Engine Sourcing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#global-shipping')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  International Shipping
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#about-us')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#contact')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Direct Contact Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Standards */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Governance
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy [Placeholder]
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms of Supply [Placeholder]
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  ISPM-15 Crating Standard
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Export Manifest Clearance
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  VIN Matching Disclaimer
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: UAE Physical Base & Contact [Editable Placeholders] */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              UAE Supply Hub [Editable Details]
            </h4>

            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-mono leading-relaxed">
                  Warehouse 14, Industrial Area 12, Sharjah & Dubai Auto Zone (DAZ), United Arab Emirates [EDITABLE PLACEHOLDER]
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">
                  WhatsApp: +971 50 000 0000 [EDITABLE]
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">
                  Email: supply@alsabah-engines-uae.com [EDITABLE]
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNav('#contact')}
                className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 rounded-xs text-xs font-mono uppercase tracking-wider text-zinc-200 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Request Engine Quotation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} AL-SABAH MOTORS UAE [EDITABLE PLACEHOLDER]. All rights reserved.
          </div>
          <div className="text-center sm:text-right">
            Dedicated Automotive Engine Supply · UAE & Worldwide Export
          </div>
        </div>
      </div>
    </footer>
  );
};
