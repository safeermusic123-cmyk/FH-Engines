import React, { useRef } from 'react';
import { ArrowRight, MapPin, ShieldCheck, Globe, Headphones } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import heroDubaiEngineImg from '../assets/images/hero_dubai_engine_1791999771827.jpg';

interface HeroProps {
  onExploreEngines: () => void;
  onRequestQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreEngines, onRequestQuote }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-loc', {
        y: 14,
        opacity: 0,
        duration: 0.6,
      })
      .from(
        '.hero-title-line-1',
        {
          yPercent: 100,
          duration: 0.85,
          ease: 'power4.out',
        },
        '-=0.3'
      )
      .from(
        '.hero-title-line-2',
        {
          yPercent: 100,
          duration: 0.85,
          ease: 'power4.out',
        },
        '-=0.65'
      )
      .from(
        '.hero-description',
        {
          y: 20,
          opacity: 0,
          duration: 0.7,
        },
        '-=0.45'
      )
      .from(
        '.hero-action-btn',
        {
          y: 16,
          opacity: 0,
          duration: 0.55,
          stagger: 0.1,
        },
        '-=0.4'
      )
      .from(
        '.hero-trust-bar',
        {
          opacity: 0,
          y: 12,
          duration: 0.6,
        },
        '-=0.3'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-24 sm:pt-28 pb-12 overflow-hidden bg-[#f3f4f6]"
    >
      {/* Background Image: The Dubai Showroom with Skyline & Complete Engine on the right */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroDubaiEngineImg}
          alt="Modern automotive showroom in Dubai with skyline and complete performance car engine assembly"
          className="w-full h-full object-cover object-center lg:object-[center_right] filter contrast-[1.02]"
          loading="eager"
        />

        {/* Soft gradient mask on the left for maximum text readability across all displays */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent lg:w-[62%] pointer-events-none" />
        <div className="absolute inset-0 bg-white/40 lg:hidden pointer-events-none" />
      </div>

      {/* Far Right Wall Watermark (As seen in the image) */}
      <div className="hidden xl:flex flex-col items-end absolute top-32 right-12 z-10 pointer-events-none select-none text-right">
        <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-500 font-semibold block leading-tight">
          PREMIUM
        </span>
        <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-500 font-semibold block leading-tight">
          ENGINES
        </span>
        <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-500 font-semibold block leading-tight">
          GLOBAL REACH
        </span>
        <span className="w-10 h-[2px] bg-[#a31414] mt-2 block" />
      </div>

      {/* Main Foreground Container */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="max-w-2xl lg:max-w-xl">
          {/* Eyebrow: Red Pin + Dubai Location */}
          <div className="hero-loc inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-4 sm:mb-6">
            <MapPin className="w-4 h-4 text-[#a31414] fill-[#a31414]" />
            <span>DUBAI, UAE · AUTOMOTIVE ENGINE SUPPLY</span>
          </div>

          {/* Main Headline (Masked lines) */}
          <div className="mb-5 sm:mb-6">
            <div className="overflow-hidden">
              <h1 className="hero-title-line-1 text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-extrabold text-[#0f172a] tracking-tight leading-[1.05]">
                Reliable Engines.
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-title-line-2 text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-extrabold text-[#a31414] tracking-tight leading-[1.05]">
                Worldwide Supply.
              </h1>
            </div>
          </div>

          {/* Supporting paragraph text */}
          <p className="hero-description text-sm sm:text-base md:text-lg text-zinc-600 font-normal leading-relaxed mb-8 max-w-xl">
            Premium replacement engines and automotive powertrain solutions for workshops, dealerships, distributors, and vehicle owners in Dubai and across international markets.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10 sm:mb-12">
            <button
              onClick={onExploreEngines}
              className="hero-action-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#a31414] hover:bg-[#881010] active:scale-[0.98] transition-all rounded-md shadow-sm cursor-pointer"
            >
              <span>Explore Our Engines</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onRequestQuote}
              className="hero-action-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-zinc-800 bg-[#f3f4f6]/95 hover:bg-white active:scale-[0.98] border border-zinc-300 transition-all rounded-md shadow-2xs cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 text-zinc-600" />
            </button>
          </div>

          {/* Bottom Feature Strip: Exact match with icons & dividers */}
          <div className="hero-trust-bar pt-5 border-t border-zinc-300/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-zinc-700 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-zinc-600" />
              <span>Quality-Sourced Engines</span>
            </div>

            <span className="text-zinc-300 hidden sm:inline">|</span>

            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-zinc-600" />
              <span>Worldwide Shipping</span>
            </div>

            <span className="text-zinc-300 hidden sm:inline">|</span>

            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-zinc-600" />
              <span>Professional Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
