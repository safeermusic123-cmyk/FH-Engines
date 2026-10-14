import React, { useRef } from 'react';
import { ShieldCheck, Check, Building2, MapPin } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';

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
          {/* Left Column: Industrial Inspection Photography */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageRef}
              className="relative rounded-lg border border-zinc-200 bg-zinc-950 p-2.5 sm:p-3 shadow-md"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-md bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85"
                  alt="Quality assurance inspection of automotive engine components in modern UAE industrial facility"
                  className="w-full h-full object-cover object-center filter contrast-[1.04]"
                  loading="lazy"
                />
              </div>

              {/* Technical Label Overlay */}
              <div className="mt-3 px-1 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>FACILITY: DUBAI AUTO ZONE (DAZ) & SHARJAH</span>
                <span className="text-[#a31414] font-semibold">INSPECTION DESK</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7">
            <div className="about-reveal inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#a31414] font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#a31414]" />
              <span>SPECIALIZED ENGINE TRADING</span>
            </div>

            <h2 className="about-reveal text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight mb-6">
              Focused on Engines. Built Around Your Requirements.
            </h2>

            <div className="about-reveal space-y-4 text-base text-zinc-600 leading-relaxed font-normal mb-8">
              <p>
                We specialize in automotive engine supply, helping customers identify their requirements and enquire about suitable engine options through a straightforward, professional process.
              </p>
              <p>
                The business is based in Dubai, United Arab Emirates and serves customers who require a dedicated source for automotive engines. By maintaining an uncompromising focus exclusively on complete engine assemblies, we eliminate the complexity and guesswork common to general automotive salvage operations.
              </p>
            </div>

            {/* Business Information Matrix */}
            <div className="about-reveal bg-[#f8fafc] border border-zinc-200 rounded-lg p-6 mb-8">
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-4">
                // COMPANY PROFILE & REGISTERED DETAILS
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-white border border-zinc-200 rounded-md">
                  <span className="text-zinc-400 block text-[10px] uppercase">Corporate Entity:</span>
                  <span className="font-semibold text-zinc-900 block mt-0.5">
                    AUTO ENGINES TRADING FZE
                  </span>
                </div>

                <div className="p-3 bg-white border border-zinc-200 rounded-md">
                  <span className="text-zinc-400 block text-[10px] uppercase">Registered Location:</span>
                  <span className="font-semibold text-zinc-900 block mt-0.5">
                    Dubai Auto Zone (DAZ) & Sharjah, UAE
                  </span>
                </div>

                <div className="p-3 bg-white border border-zinc-200 rounded-md">
                  <span className="text-zinc-400 block text-[10px] uppercase">Commercial Activity:</span>
                  <span className="font-semibold text-zinc-900 block mt-0.5">
                    Car Engine Supply & Export Trading
                  </span>
                </div>

                <div className="p-3 bg-white border border-zinc-200 rounded-md">
                  <span className="text-zinc-400 block text-[10px] uppercase">Service Scope:</span>
                  <span className="font-semibold text-zinc-900 block mt-0.5">
                    Garages, Dealerships, Mechanics & Private Builds
                  </span>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="about-reveal grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-700">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#a31414] shrink-0 mt-0.5" />
                <span>Zero general spare parts — strictly complete engine assemblies</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#a31414] shrink-0 mt-0.5" />
                <span>Strict verification of OEM codes prior to payment and dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
