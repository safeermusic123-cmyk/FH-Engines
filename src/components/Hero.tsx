import React, { useRef } from 'react';
import { ArrowRight, MapPin, ShieldCheck, Globe, Headphones } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import heroEngineVideo from '../assets/images/hero_engine_showroom.mp4';

interface HeroProps {
  onExploreEngines: () => void;
  onRequestQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreEngines, onRequestQuote }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Cinematic delayed reveal: text smoothly emerges 2.3 seconds after the video plays
      const tl = gsap.timeline({
        delay: 2.3,
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        '.hero-loc',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85 }
      )
      .fromTo(
        '.hero-title-line-1',
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.0, ease: 'power4.out' },
        '-=0.45'
      )
      .fromTo(
        '.hero-title-line-2',
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.0, ease: 'power4.out' },
        '-=0.8'
      )
      .fromTo(
        '.hero-description',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.6'
      )
      .fromTo(
        '.hero-action-btn',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.12 },
        '-=0.55'
      )
      .fromTo(
        '.hero-trust-bar',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.85 },
        '-=0.45'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-24 sm:pt-28 pb-12 overflow-hidden bg-black"
    >
      {/* Background Video: Clean showroom video, replaces previous image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src={heroEngineVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center lg:object-[center_right] filter contrast-[1.03]"
        />

        {/* Soft gradient mask on the left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent lg:w-[62%] pointer-events-none" />
        <div className="absolute inset-0 bg-white/50 lg:hidden pointer-events-none" />
      </div>

      {/* Main Foreground Container */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="max-w-2xl lg:max-w-xl">
          {/* Eyebrow: Red Pin + Dubai Location (Original text preserved) */}
          <div className="hero-loc opacity-0 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-4 sm:mb-6">
            <MapPin className="w-4 h-4 text-[#a31414] fill-[#a31414]" />
            <span>DUBAI, UAE · AUTOMOTIVE ENGINE SUPPLY</span>
          </div>

          {/* Main Headline (Masked lines) */}
          <div className="mb-5 sm:mb-6">
            <div className="overflow-hidden">
              <h1 className="hero-title-line-1 opacity-0 text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-heading font-extrabold text-[#0f172a] tracking-tight leading-[1.05]">
                Reliable Engines.
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-title-line-2 opacity-0 text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-heading font-extrabold text-[#a31414] tracking-tight leading-[1.05]">
                Worldwide Supply.
              </h1>
            </div>
          </div>

          {/* Supporting paragraph text (Original text preserved) */}
          <p className="hero-description opacity-0 text-sm sm:text-base md:text-lg text-zinc-600 font-normal leading-relaxed mb-8 max-w-xl">
            Premium replacement engines and automotive powertrain solutions for workshops, dealerships, distributors, and vehicle owners in Dubai and across international markets.
          </p>

          {/* CTA Buttons (Original buttons preserved) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10 sm:mb-12">
            <button
              onClick={onExploreEngines}
              className="hero-action-btn opacity-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#a31414] hover:bg-[#881010] active:scale-[0.98] transition-all rounded-md shadow-sm cursor-pointer"
            >
              <span>Explore Our Engines</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onRequestQuote}
              className="hero-action-btn opacity-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-zinc-800 bg-[#f3f4f6]/95 hover:bg-white active:scale-[0.98] border border-zinc-300 transition-all rounded-md shadow-2xs cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 text-zinc-600" />
            </button>
          </div>

          {/* Bottom Feature Strip (Original text preserved) */}
          <div className="hero-trust-bar opacity-0 pt-5 border-t border-zinc-300/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-zinc-700 font-medium">
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
