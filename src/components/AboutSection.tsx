import React, { useRef } from 'react';
import { ShieldCheck, Check, Building2, MapPin, Phone, Award } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import testedEngineImg from '../assets/images/clean_v8_workshop_1792147853609.jpg';

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.about-reveal', {
        y: 24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about-us"
      ref={containerRef}
      className="py-20 lg:py-28 bg-white border-b border-zinc-200"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Pure Engine Inspection Photography */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageRef}
              className="relative rounded-2xl border border-zinc-200 bg-white p-3 shadow-md"
            >
              <div className="aspect-[4/3] sm:aspect-[1/1] overflow-hidden rounded-xl bg-zinc-900">
                <img
                  src={testedEngineImg}
                  alt="Inspected high-performance automotive engine assembly on test bench in Sharjah facility"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Clean Bottom Caption */}
              <div className="mt-3 px-2 py-1 flex items-center justify-between text-xs font-semibold text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#a31414]" />
                  <span>Sharjah Industrial Engine Facility</span>
                </span>
                <span className="text-[#a31414] font-bold">100% Tested Assemblies</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy in Manrope */}
          <div className="lg:col-span-7">
            <div className="about-reveal inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#a31414] font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#a31414]" />
              <span>ABOUT FH ENGINE · SHARJAH, UAE</span>
            </div>

            <h2 className="about-reveal text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#0f172a] tracking-tight leading-tight mb-6">
              Focused on Engines. Built Around Precision Supply.
            </h2>

            <div className="about-reveal space-y-4 text-base text-zinc-600 leading-relaxed font-normal mb-8">
              <p>
                <strong className="text-zinc-900 font-semibold">FH Engine</strong> is a dedicated automotive engine specialist based in Sharjah, United Arab Emirates. We assist workshops, professional garages, vehicle dealerships, and individual automotive builders across the UAE and worldwide in securing genuine, compression-tested replacement engines.
              </p>
              <p>
                By maintaining an uncompromising focus exclusively on complete automotive engines—rather than generic automotive salvage—we verify engine codes, assess cylinder head integrity, inspect timing components, and package each unit for secure transport.
              </p>
            </div>

            {/* Profile Grid Cards */}
            <div className="about-reveal grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                <span className="text-zinc-500 block text-xs uppercase font-bold tracking-wider mb-1">
                  Company Name
                </span>
                <span className="font-heading font-extrabold text-zinc-900 text-base">
                  FH Engine
                </span>
              </div>

              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                <span className="text-zinc-500 block text-xs uppercase font-bold tracking-wider mb-1">
                  Operating Location
                </span>
                <span className="font-heading font-extrabold text-zinc-900 text-base">
                  Sharjah, United Arab Emirates
                </span>
              </div>

              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                <span className="text-zinc-500 block text-xs uppercase font-bold tracking-wider mb-1">
                  Direct Contact Desk
                </span>
                <a
                  href="tel:+971585188315"
                  className="font-heading font-extrabold text-[#a31414] text-base hover:underline block"
                >
                  +971 58 518 8315
                </a>
              </div>

              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                <span className="text-zinc-500 block text-xs uppercase font-bold tracking-wider mb-1">
                  Export Capability
                </span>
                <span className="font-heading font-extrabold text-zinc-900 text-base">
                  Air & Ocean Crated Freight
                </span>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="about-reveal flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-100 rounded-lg text-xs font-bold text-zinc-800">
                <Check className="w-4 h-4 text-[#a31414]" />
                <span>Physical Engine Code Matching</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-100 rounded-lg text-xs font-bold text-zinc-800">
                <Check className="w-4 h-4 text-[#a31414]" />
                <span>Compression & Leak-Down Tested</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-100 rounded-lg text-xs font-bold text-zinc-800">
                <Check className="w-4 h-4 text-[#a31414]" />
                <span>ISPM-15 Timber Export Crates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
