import React, { useRef } from 'react';
import { ShieldCheck, Compass, Check, Building2, MapPin } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.about-reveal', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
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
      id="about-us"
      ref={containerRef}
      className="py-20 lg:py-28 bg-white border-b border-zinc-200/90 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Industrial Photography */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageRef}
              className="relative rounded-sm border border-zinc-200 bg-zinc-950 p-2 sm:p-2.5 shadow-md"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-xs bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85"
                  alt="Quality assurance inspection of automotive engine components in modern UAE industrial facility"
                  className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-90"
                  loading="lazy"
                />
              </div>

              {/* Technical Label Overlay */}
              <div className="mt-2.5 px-2 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>FACILITY: INDUSTRIAL HUB // SHARJAH & DUBAI</span>
                <span className="text-emerald-400">INSPECTION DESK</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7">
            <div className="about-reveal inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-xs text-[11px] font-mono uppercase tracking-widest text-[#144b37] font-semibold mb-5">
              <span>SPECIALIZED ENGINE TRADING</span>
            </div>

            <h2 className="about-reveal text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111215] tracking-tight leading-tight mb-6">
              Focused on Engines. Built Around Your Requirements.
            </h2>

            <div className="about-reveal space-y-4 text-base text-zinc-600 leading-relaxed font-normal mb-8">
              <p>
                We specialize in automotive engine supply, helping customers identify their requirements and enquire about suitable engine options through a straightforward, professional process.
              </p>
              <p>
                The business is based in the United Arab Emirates and serves customers who require a dedicated source for automotive engines. By maintaining an uncompromising focus exclusively on complete engine assemblies, we eliminate the complexity and guesswork common to general automotive salvage operations.
              </p>
            </div>

            {/* Editable Business Information Matrix */}
            <div className="about-reveal bg-[#fafaf9] border border-zinc-200 rounded-xs p-6 mb-8">
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-4">
                // COMPANY PROFILE & REGISTERED DETAILS [EDITABLE PLACEHOLDERS]
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-white border border-zinc-200/80 rounded-xs">
                  <span className="text-zinc-400 block text-[10px] uppercase">Corporate Entity:</span>
                  <span className="font-semibold text-zinc-900 block mt-0.5">
                    AL-SABAH MOTORS FZE [PLACEHOLDER]
                  </span>
                </div>

                <div className="p-3 bg-white border border-zinc-200/80 rounded-xs">
                  <span className="text-zinc-400 block text-[10px] uppercase">Registered Jurisdiction:</span>
                  <span className="font-semibold text-zinc-900 block mt-0.5">
                    Sharjah & Dubai Auto Zone, UAE [PLACEHOLDER]
                  </span>
                </div>

                <div className="p-3 bg-white border border-zinc-200/80 rounded-xs">
                  <span className="text-zinc-400 block text-[10px] uppercase">Commercial Activity:</span>
                  <span className="font-semibold text-zinc-900 block mt-0.5">
                    Automotive Engine Supply & Export Trading
                  </span>
                </div>

                <div className="p-3 bg-white border border-zinc-200/80 rounded-xs">
                  <span className="text-zinc-400 block text-[10px] uppercase">Service Scope:</span>
                  <span className="font-semibold text-zinc-900 block mt-0.5">
                    B2B Garages, Traders & Private Clients
                  </span>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="about-reveal grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-700">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#144b37] shrink-0 mt-0.5" />
                <span>Zero peripheral parts — strictly long block & complete engine assemblies</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#144b37] shrink-0 mt-0.5" />
                <span>Strict verification of OEM codes prior to payment and dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
