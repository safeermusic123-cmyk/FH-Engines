import React from 'react';
import aboutBgImage from '../assets/images/aboutimage.png';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about-us"
      className="py-24 lg:py-32 relative border-b border-zinc-200 overflow-hidden bg-zinc-100"
    >
      {/* Background Image: Aerial coastal boulevard clearly visible */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={aboutBgImage}
          alt="About background"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft elegant gradient providing contrast on the text side while keeping the beach and ocean vivid on the right */}
        <div className="absolute inset-0 bg-white/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 via-60% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40" />
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-3xl lg:max-w-3xl">
          {/* Subtle Red Brand Accent Line */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-[3px] bg-[#a31414] rounded-full" />
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#a31414]">
              Precision Engine Supply · Sharjah Hub
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-heading font-extrabold text-[#0f172a] tracking-tight leading-[1.12] mb-8">
            Focused on Engines. <br className="hidden sm:inline" />
            <span className="text-[#a31414]">Built Around Precision Supply.</span>
          </h2>

          {/* Editorial Paragraphs */}
          <div className="space-y-6 text-base sm:text-lg md:text-xl text-zinc-800 leading-relaxed font-normal">
            <p>
              <strong className="text-zinc-950 font-bold">FH Engine</strong> is a dedicated automotive engine specialist based in Sharjah, United Arab Emirates. We assist workshops, professional garages, vehicle dealerships, and individual automotive builders across the UAE and worldwide in securing genuine, compression-tested replacement engines.
            </p>
            <p className="text-zinc-700">
              By maintaining an uncompromising focus exclusively on complete automotive engines—rather than generic automotive salvage—we verify engine codes, assess cylinder head integrity, inspect timing components, and package each unit for secure transport.
            </p>
          </div>

          {/* Elegant Assurance Line */}
          <div className="mt-10 pt-8 border-t border-zinc-900/10 flex flex-wrap items-center gap-5 sm:gap-8 text-xs sm:text-sm font-bold text-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a31414]" />
              <span>Sharjah Industrial Logistics Facility</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>100% Compression Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a31414]" />
              <span>Crated Worldwide Export</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
