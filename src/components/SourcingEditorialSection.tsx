import React, { useRef } from 'react';
import { ArrowDown, ArrowUpRight, CheckCircle2, FileSearch, ShieldCheck } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import { useSmoothScroll } from './SmoothScrollProvider';

export const SourcingEditorialSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      // Masked headline line reveal
      gsap.from('.sourcing-headline-line', {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });

      gsap.from('.sourcing-body-item', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      });

      if (imageFrameRef.current) {
        gsap.to('.sourcing-parallax-img', {
          yPercent: 8,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="engine-sourcing"
      ref={containerRef}
      className="py-24 lg:py-32 bg-[#ffffff] border-b border-[#e5e5e2] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Editorial Photograph */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div
              ref={imageFrameRef}
              className="border border-[#e5e5e2] bg-[#f7f7f5] p-2.5 sm:p-3 relative shadow-sm overflow-hidden"
            >
              <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#0d0e10]">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=88"
                  alt="Precision engineering inspection of automotive engine components in high-standard facility"
                  className="sourcing-parallax-img w-full h-full object-cover object-center filter contrast-[1.04] brightness-95"
                  loading="lazy"
                />

                <div className="absolute top-4 left-4 bg-[#0d0e10]/90 backdrop-blur-xs px-3 py-1 text-white text-[10px] font-mono border border-white/10 uppercase tracking-widest">
                  TECHNICAL VALIDATION PROTOCOL
                </div>

                <div className="absolute bottom-4 left-4 bg-[#0d0e10]/90 backdrop-blur-xs px-3 py-1 text-zinc-300 text-[10px] font-mono border border-white/10">
                  SHARJAH & DUBAI AUTO ZONE (DAZ)
                </div>
              </div>

              <div className="flex items-center justify-between px-1 pt-2.5 text-[10px] font-mono text-zinc-500">
                <span>[ FIG. 02: TECHNICAL SOURCING ASSESSMENT ]</span>
                <span className="text-[#17382b] font-semibold">OEM CODE CERTIFICATION</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[#17382b] font-semibold">
              <span className="w-1.5 h-1.5 bg-[#17382b]" />
              <span>03 // ENGINE SOURCING SPECIALIZATION</span>
            </div>

            {/* Masked Headline Lines */}
            <div className="overflow-hidden mb-2">
              <h2 className="sourcing-headline-line text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.04em] text-[#0d0e10] uppercase leading-[1.02]">
                THE RIGHT ENGINE
              </h2>
            </div>
            <div className="overflow-hidden mb-2">
              <h2 className="sourcing-headline-line text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.04em] text-[#0d0e10] uppercase leading-[1.02]">
                STARTS WITH
              </h2>
            </div>
            <div className="overflow-hidden mb-6">
              <h2 className="sourcing-headline-line text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.04em] text-[#17382b] uppercase leading-[1.02]">
                THE RIGHT DETAILS.
              </h2>
            </div>

            <p className="sourcing-body-item text-base sm:text-lg text-zinc-600 font-normal leading-relaxed mb-6">
              From identifying the correct OEM engine code to confirming sourcing requirements, our UAE desk helps workshops, mechanics, and individual builders navigate the precise process of procuring an engine suited to their vehicle.
            </p>

            <div className="sourcing-body-item p-5 border border-[#e5e5e2] bg-[#f7f7f5] mb-8 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                REQUIRED INTAKE PARAMETERS:
              </div>
              <ul className="space-y-2 text-xs font-mono text-zinc-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#17382b] rounded-full" />
                  <span><strong>Vehicle Make & Model:</strong> Exact platform and sub-model generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#17382b] rounded-full" />
                  <span><strong>Manufacturing Year:</strong> Pinpointing mid-generation casting updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#17382b] rounded-full" />
                  <span><strong>Engine Code:</strong> Stamped block code (e.g. B58B30, M177, 2JZ-GTE, AJ133)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#17382b] rounded-full" />
                  <span><strong>Assembly Scope:</strong> Bare long block vs turnkey with turbos and loom</span>
                </li>
              </ul>
            </div>

            <div className="sourcing-body-item flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => scrollTo('#engine-enquiry', { offset: -60, duration: 1.2 })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-mono uppercase tracking-[0.16em] text-white bg-[#0d0e10] hover:bg-[#17382b] transition-colors duration-200 cursor-pointer active:scale-[0.99]"
              >
                <span>Submit Vehicle Details</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => scrollTo('#engine-showcase', { offset: -60, duration: 1.2 })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-mono uppercase tracking-[0.16em] text-[#0d0e10] hover:text-white bg-transparent hover:bg-[#0d0e10] border border-[#0d0e10] transition-colors duration-200 cursor-pointer"
              >
                <span>Browse Archive</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
