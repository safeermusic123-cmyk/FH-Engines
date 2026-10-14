import React, { useRef } from 'react';
import { ArrowRight, Check, FileText, PhoneCall, PackageCheck } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';

export const SourcingProcess: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: '01',
      title: 'Tell Us What You Need',
      summary: 'Vehicle parameters & engine code submission',
      description:
        'Share the vehicle make, model, year, engine code, and any other relevant details. Providing your 17-character VIN helps ensure complete accuracy with OEM casting specifications.',
      icon: FileText,
      detailTag: 'SPECIFICATION INTAKE',
    },
    {
      number: '02',
      title: 'Discuss Available Options',
      summary: 'Inventory review & engineering match',
      description:
        'Our team can review the requirements and discuss available or potentially sourceable engine options, subject to confirmation. We verify compression integrity and manifold matching.',
      icon: PhoneCall,
      detailTag: 'STOCK DESK REVIEW',
    },
    {
      number: '03',
      title: 'Arrange the Next Steps',
      summary: 'Quotation, crating & shipping dispatch',
      description:
        'Confirm the engine details, pricing, condition, and applicable shipping arrangements directly with the business. Assemblies are sealed, secured in treated timber, and prepared for dispatch.',
      icon: PackageCheck,
      detailTag: 'DISPATCH COORDINATION',
    },
  ];

  useGSAP(
    () => {
      gsap.from('.process-reveal', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.process-step-card', {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.process-steps-grid',
          start: 'top 85%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="engine-sourcing"
      ref={containerRef}
      className="py-20 lg:py-28 bg-white border-b border-zinc-200/90 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="process-reveal inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-xs text-[11px] font-mono uppercase tracking-widest text-[#144b37] font-semibold mb-4">
            <span>STRUCTURED PROCUREMENT PROTOCOL</span>
          </div>

          <h2 className="process-reveal text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111215] tracking-tight leading-tight mb-4">
            A Straightforward Way to Source Your Engine.
          </h2>

          <p className="process-reveal text-base text-zinc-600 leading-relaxed font-normal">
            Whether fulfilling a commercial garage order or sourcing an engine for a personal vehicle project, our step-by-step communication ensures clarity from enquiry through to freight dispatch.
          </p>
        </div>

        {/* Steps Grid (Desktop horizontal timeline with thin connecting lines) */}
        <div className="process-steps-grid relative">
          {/* Subtle connecting line behind cards on desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-[1px] bg-zinc-200 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="process-step-card flex flex-col justify-between bg-[#fafaf9] border border-zinc-200/90 rounded-xs p-6 sm:p-8 hover:border-zinc-400/80 transition-all group"
                >
                  <div>
                    {/* Top Row: Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xs bg-[#121316] text-white flex items-center justify-center font-mono font-bold text-base shadow-xs group-hover:bg-[#144b37] transition-colors">
                        {step.number}
                      </div>

                      <div className="p-2 rounded-xs bg-white border border-zinc-200 text-zinc-600 group-hover:text-[#144b37] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-semibold mb-2">
                      {step.detailTag}
                    </div>

                    <h3 className="text-lg font-heading font-bold text-[#111215] mb-2 leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs font-mono text-zinc-400 mb-4 pb-3 border-b border-zinc-200">
                      // {step.summary}
                    </p>

                    <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-zinc-200/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>STEP {step.number} OF 03</span>
                    <span className="text-zinc-600 font-medium">UAE ENGINE DESK</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Sourcing Note */}
        <div className="mt-12 p-4 rounded-xs bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-500 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span>* IMPORTANT NOTICE: Engine sourcing is subject to stock confirmation and inspection clearance.</span>
          <a
            href="#contact"
            className="text-[#144b37] hover:underline font-semibold flex items-center gap-1"
          >
            Submit Specifications to Engine Desk <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
