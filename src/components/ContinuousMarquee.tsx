import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export const ContinuousMarquee: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;

      // Duplicate content width calculation for seamless loop
      const fullWidth = trackRef.current.scrollWidth / 2;

      gsap.to(trackRef.current, {
        x: -fullWidth,
        duration: 28,
        ease: 'none',
        repeat: -1,
      });
    },
    { scope: marqueeRef }
  );

  const phrases = [
    'AUTOMOTIVE ENGINES',
    'UAE ENGINE SUPPLY',
    'GLOBAL ENQUIRIES',
    'ENGINE SOURCING',
    'COMPLETE ASSEMBLIES',
    'OEM CODE MATCHING',
  ];

  return (
    <div
      ref={marqueeRef}
      className="bg-[#121316] text-white py-4 sm:py-5 border-y border-zinc-800 overflow-hidden select-none"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform items-center"
      >
        {/* First set */}
        <div className="flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12">
          {phrases.map((phrase, idx) => (
            <div key={`m1-${idx}`} className="flex items-center space-x-8 sm:space-x-12">
              <span className="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.25em] text-zinc-300">
                {phrase}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
          ))}
        </div>

        {/* Second set for seamless loop */}
        <div className="flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12" aria-hidden="true">
          {phrases.map((phrase, idx) => (
            <div key={`m2-${idx}`} className="flex items-center space-x-8 sm:space-x-12">
              <span className="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.25em] text-zinc-300">
                {phrase}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
