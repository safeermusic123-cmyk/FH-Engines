import React, { useRef } from 'react';
import { ArrowDown, ArrowUpRight, Check, Disc, Shield } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import { useSmoothScroll } from './SmoothScrollProvider';

interface HeroProps {
  onExploreEngines: () => void;
  onRequestQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreEngines, onRequestQuote }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Eyebrow reveal
      tl.from('.hero-eyebrow', {
        y: 16,
        opacity: 0,
        duration: 0.6,
      })
      // Line by line headline reveal
      .from(
        '.hero-line',
        {
          y: 40,
          opacity: 0,
          duration: 0.85,
          stagger: 0.15,
        },
        '-=0.3'
      )
      // Supporting text
      .from(
        '.hero-support',
        {
          y: 20,
          opacity: 0,
          duration: 0.7,
        },
        '-=0.4'
      )
      // CTAs
      .from(
        '.hero-cta',
        {
          y: 16,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
        },
        '-=0.3'
      )
      // Key metrics pills
      .from(
        '.hero-metric',
        {
          opacity: 0,
          y: 12,
          duration: 0.5,
          stagger: 0.08,
        },
        '-=0.3'
      )
      // Hero Image reveal with subtle scale
      .from(
        imageWrapperRef.current,
        {
          scale: 0.94,
          opacity: 0,
          duration: 1.1,
          ease: 'power2.out',
        },
        '-=1.0'
      );

      // Restrained Parallax on image on scroll
      if (imageWrapperRef.current) {
        gsap.to(imageWrapperRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 sm:pt-32 sm:pb-16 bg-[#ffffff] border-b border-zinc-200 overflow-hidden"
    >
      {/* Background subtle technical grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(#121316 1px, transparent 1px), linear-gradient(90deg, #121316 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto z-10 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 xl:col-span-6 z-20">
            {/* Eyebrow */}
            <div className="hero-eyebrow inline-flex items-center gap-2 px-3 py-1 bg-zinc-100/90 border border-zinc-300/80 rounded-xs text-[11px] font-mono uppercase tracking-widest text-[#144b37] font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#144b37] animate-pulse" />
              <span>UAE-BASED ENGINE SUPPLIER · WORLDWIDE REACH</span>
            </div>

            {/* Headline (Line-by-line masked) */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111215] tracking-tight leading-[1.08] mb-6">
              <div className="overflow-hidden">
                <div className="hero-line">The Right Engine.</div>
              </div>
              <div className="overflow-hidden">
                <div className="hero-line text-[#144b37]">A Better Way Forward.</div>
              </div>
            </h1>

            {/* Supporting Text */}
            <p className="hero-support text-base sm:text-lg text-zinc-600 max-w-xl font-normal leading-relaxed mb-9">
              Your dedicated source for automotive engines. Find the right engine for your vehicle with professional sourcing support from the UAE to destinations worldwide.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={onExploreEngines}
                className="hero-cta inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#144b37] hover:bg-[#0f3829] active:scale-[0.98] transition-all rounded-xs cursor-pointer shadow-sm group"
              >
                <span>Explore Our Engines</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={onRequestQuote}
                className="hero-cta inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#121316] bg-zinc-100 hover:bg-zinc-200/80 active:scale-[0.98] border border-zinc-300/80 transition-all rounded-xs cursor-pointer group"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 border-t border-zinc-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-zinc-600">
              <div className="hero-metric flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#144b37]" />
                <span>Zero general parts</span>
              </div>
              <div className="hero-metric flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#144b37]" />
                <span>Verified OEM codes</span>
              </div>
              <div className="hero-metric col-span-2 sm:col-span-1 flex items-center gap-2">
                <Disc className="w-3.5 h-3.5 text-[#144b37]" />
                <span>Export crated</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Engine Photography */}
          <div className="lg:col-span-5 xl:col-span-6 relative">
            <div
              ref={imageWrapperRef}
              className="relative mx-auto max-w-lg lg:max-w-none rounded-sm border border-zinc-200/90 bg-gradient-to-b from-zinc-50 to-zinc-100/60 p-2 sm:p-3 shadow-md"
            >
              <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-zinc-900 rounded-xs">
                <img
                  src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85"
                  alt="Complete automotive performance twin-turbo engine assembly showing cast aluminium block, intake plenum and turbochargers"
                  className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-95 transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />

                {/* Technical overlay badge */}
                <div className="absolute top-3 left-3 bg-[#111215]/85 backdrop-blur-md px-3 py-1.5 rounded-xs border border-zinc-700/60 text-white text-[11px] font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>COMPLETE ENGINE ASSEMBLY</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-[#111215]/85 backdrop-blur-md px-3 py-1.5 rounded-xs border border-zinc-700/60 text-zinc-300 text-[10px] font-mono">
                  <span>DISPLACEMENT & CODE VERIFIED</span>
                </div>
              </div>

              {/* Bottom spec caption */}
              <div className="flex items-center justify-between mt-2.5 px-2 text-[11px] font-mono text-zinc-500">
                <span>UAE SUPPLY HUB // GLOBAL FREIGHT</span>
                <span className="text-zinc-600">INSPECTED CYLINDER COMPRESSION</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Bottom Scroll Indicator */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-mono text-zinc-600 pt-4 border-t border-zinc-100">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#144b37] rounded-full" />
          <span>AL-SABAH MOTORS // UAE COMMERCIAL REGISTRY</span>
        </div>

        <button
          onClick={() => scrollTo('#trust-strip', { offset: -80, duration: 1.0 })}
          className="flex items-center gap-2 text-zinc-600 hover:text-[#121316] transition-colors cursor-pointer group"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:text-[#144b37]" />
        </button>
      </div>
    </section>
  );
};
