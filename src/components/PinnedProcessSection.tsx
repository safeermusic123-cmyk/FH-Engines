import React, { useRef, useState } from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight, Gauge, FileCheck2, PackageCheck } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

import imgStage1 from '../assets/images/protocol_code_match_1791999797742.jpg';
import imgStage2 from '../assets/images/protocol_test_gauge_1791999826460.jpg';
import imgStage3 from '../assets/images/protocol_crating_ship_1791999862895.jpg';

export const PinnedProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'FIND THE RIGHT ENGINE',
      tag: 'OEM Code & VIN Identification',
      image: imgStage1,
      imageCaption: '[ STAGE 01: OEM CASTING & CODE VERIFICATION ]',
      description:
        'Share your vehicle make, model, year, and specific engine code. Our technical desk cross-references your vehicle VIN to confirm OEM casting numbers, intake geometry, and exact sensor configurations.',
      bulletPoints: [
        'OEM engine code matching against manufacturer factory database',
        'Verification of intake/exhaust variable valve timing configurations',
        'Direct identification of turbocharger orientation and oil supply feeds',
      ],
      icon: FileCheck2,
    },
    {
      num: '02',
      title: 'CONFIRM YOUR REQUIREMENTS',
      tag: 'Compression & Quality Inspection',
      image: imgStage2,
      imageCaption: '[ STAGE 02: CYLINDER COMPRESSION TEST BENCH ]',
      description:
        'Review available options with our UAE engineering team. We establish baseline cylinder compression benchmarks, inspect internal planarity, and verify whether a bare long block or turnkey assembly is required.',
      bulletPoints: [
        'Consistent compression across all combustion chambers',
        'Cast iron or plasma-coated cylinder walls inspected for wear',
        'Verification of included ancillaries, fuel rails, sensors, and wiring loom',
      ],
      icon: Gauge,
    },
    {
      num: '03',
      title: 'DISCUSS SUPPLY AND DELIVERY',
      tag: 'Export Crating & Global Dispatch',
      image: imgStage3,
      imageCaption: '[ STAGE 03: ISPM-15 TREATED TIMBER EXPORT CRATING ]',
      description:
        'Confirm unit pricing, condition, and applicable export crating directly with the business. Engines are sealed in vapor-corrosion barrier wrap, secured onto ISPM-15 heat-treated timber platforms, and readied for dispatch.',
      bulletPoints: [
        'ISPM-15 export-compliant timber cradles with tie-down anchoring',
        'Complete fluid evacuation prior to air or ocean freight dispatch',
        'Direct freight dispatch coordination via Jebel Ali Port or DXB Air Cargo',
      ],
      icon: PackageCheck,
    },
  ];

  useGSAP(
    () => {
      // Create smooth ScrollTrigger triggers for each card on desktop
      steps.forEach((_, idx) => {
        ScrollTrigger.create({
          trigger: `#process-card-${idx}`,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveStep(idx),
          onEnterBack: () => setActiveStep(idx),
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="pinned-process"
      ref={containerRef}
      className="bg-[#0f172a] text-white py-20 lg:py-28 border-b border-zinc-800 relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-800 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#a31414] font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#a31414]" />
              <span>SUPPLY PROTOCOL & VERIFICATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
              How We Source Your Engine.
            </h2>
          </div>

          <div className="text-xs font-mono text-zinc-400">
            STEP 0{activeStep + 1} OF 03 // UAE QUALITY BENCHMARK
          </div>
        </div>

        {/* Desktop Sticky 2-Column Smooth Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Smooth Sticky Image Presentation (Desktop) */}
          <div className="hidden lg:block lg:col-span-6 sticky top-28">
            <div className="border border-zinc-700/80 bg-zinc-900/90 p-3 rounded-md shadow-2xl relative overflow-hidden">
              {/* Stacked image crossfade container */}
              <div className="relative aspect-[4/3] rounded-xs overflow-hidden bg-black">
                {steps.map((step, idx) => (
                  <img
                    key={step.num}
                    src={step.image}
                    alt={step.title}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out filter contrast-[1.03] ${
                      activeStep === idx
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  />
                ))}

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-xs px-3 py-1.5 text-white text-[11px] font-mono border border-white/10 uppercase rounded-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#a31414] animate-pulse" />
                  <span>{steps[activeStep].tag}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-xs px-3.5 py-2 text-zinc-300 text-[10px] font-mono border border-white/10 rounded-xs flex items-center justify-between">
                  <span>{steps[activeStep].imageCaption}</span>
                  <span className="text-red-400 font-semibold">STAGE 0{activeStep + 1}</span>
                </div>
              </div>

              {/* Step indicator progress pills */}
              <div className="flex items-center gap-2 pt-3 px-1">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveStep(i);
                      const el = document.getElementById(`process-card-${i}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeStep === i
                        ? 'w-10 bg-[#a31414]'
                        : 'w-4 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 3 Step Storytelling Cards (Natural smooth scroll flow) */}
          <div className="lg:col-span-6 space-y-12 sm:space-y-16">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = activeStep === idx;
              return (
                <div
                  key={step.num}
                  id={`process-card-${idx}`}
                  className={`p-6 sm:p-8 rounded-md border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-zinc-900 border-[#a31414] shadow-lg shadow-black/40 ring-1 ring-[#a31414]/30'
                      : 'bg-zinc-900/60 border-zinc-800 opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Mobile image preview inside card */}
                  <div className="lg:hidden mb-5 rounded-xs overflow-hidden aspect-[16/10] bg-black border border-zinc-700">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-zinc-800 text-[11px] font-mono uppercase tracking-wider text-red-400 border border-zinc-700">
                      <span>STEP {step.num}</span>
                    </div>

                    <div className="p-2 rounded-xs bg-zinc-800 text-zinc-300">
                      <Icon className="w-5 h-5 text-red-400" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white uppercase tracking-tight mb-3">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                    {step.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-zinc-800 text-xs text-zinc-300 font-mono">
                    {step.bulletPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
