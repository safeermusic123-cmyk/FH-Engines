import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export const ContinuousMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;

      const track = trackRef.current;
      gsap.to(track, {
        xPercent: -50,
        ease: 'none',
        duration: 22,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  const repeatedPhrases = [
    'AUTOMOTIVE ENGINES',
    'DUBAI SUPPLY',
    'GLOBAL REACH',
    'AUTOMOTIVE ENGINES',
    'DUBAI SUPPLY',
    'GLOBAL REACH',
    'AUTOMOTIVE ENGINES',
    'DUBAI SUPPLY',
    'GLOBAL REACH',
  ];

  return (
    <section
      id="ticker-section"
      ref={containerRef}
      className="bg-[#0f172a] text-[#f8fafc] py-4 sm:py-5 border-y border-zinc-800 overflow-hidden select-none"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform items-center w-max"
      >
        {/* Set 1 */}
        <div className="flex items-center space-x-6 sm:space-x-10 pr-6 sm:pr-10">
          {repeatedPhrases.map((phrase, idx) => (
            <div key={`s1-${idx}`} className="flex items-center space-x-6 sm:space-x-10">
              <span className="text-base sm:text-xl md:text-2xl font-heading font-black uppercase tracking-[0.15em] text-white">
                {phrase}
              </span>
              <span className="text-[#a31414] font-mono text-sm sm:text-base font-bold">—</span>
            </div>
          ))}
        </div>

        {/* Set 2 for seamless loop */}
        <div className="flex items-center space-x-6 sm:space-x-10 pr-6 sm:pr-10" aria-hidden="true">
          {repeatedPhrases.map((phrase, idx) => (
            <div key={`s2-${idx}`} className="flex items-center space-x-6 sm:space-x-10">
              <span className="text-base sm:text-xl md:text-2xl font-heading font-black uppercase tracking-[0.15em] text-white">
                {phrase}
              </span>
              <span className="text-[#a31414] font-mono text-sm sm:text-base font-bold">—</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
