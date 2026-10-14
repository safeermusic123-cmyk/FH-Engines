import React, { useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Cpu, Flame, Layers } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';

interface SignatureEditorialProps {
  onDiscussRequirements: () => void;
}

export const SignatureEditorial: React.FC<SignatureEditorialProps> = ({
  onDiscussRequirements,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagePinRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'verification' | 'metallurgy' | 'crating'>('verification');

  useGSAP(
    () => {
      // Line by line reveal
      gsap.from('.editorial-reveal', {
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

      // Subtle parallax on the engine photograph
      if (imagePinRef.current) {
        gsap.to('.editorial-image-target', {
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

  const tabContent = {
    verification: {
      title: 'Engine Code & Casting Stamp Validation',
      desc: 'Vehicle manufacturers regularly introduce mid-generation revisions to cylinder heads, sensors, and timing chains. Before any engine order is finalized, we verify the physical engine code stamped on the block against your vehicle’s factory build spec and VIN.',
      points: [
        'OEM engine serial numbers and casting dates cross-checked',
        'Verification of intake/exhaust variable valve timing configurations',
        'Direct identification of turbocharger orientation and oil supply feeds',
      ],
    },
    metallurgy: {
      title: 'Crankcase & Long Block Integrity',
      desc: 'Whether supplying a new OEM crate engine or a tested low-mileage assembly, internal structural health is paramount. We focus on units with uncompromised cylinder wall integrity, true head planarity, and verified oil pressure baseline.',
      points: [
        'Consistent compression across all combustion chambers',
        'Cast iron or Nikasil/plasma-coated bores inspected for wear',
        'Clean valve cover inspection for signs of oil sludging or thermal distress',
      ],
    },
    crating: {
      title: 'Heavy-Duty Industrial Export Packaging',
      desc: 'Automotive engines weigh between 140 kg and 350 kg. Our UAE dispatch team prepares assemblies using reinforced treated timber cradles, vapour corrosion inhibitor (VCI) shrink wrap, and sealed sensor port covers.',
      points: [
        'ISPM-15 heat-treated export compliant timber pallets',
        'Complete fluid evacuation prior to air or ocean freight dispatch',
        'Multi-point engine mounting brackets securing the crankcase',
      ],
    },
  };

  return (
    <section
      ref={containerRef}
      className="py-20 lg:py-32 bg-white border-b border-zinc-200/90 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Massive Editorial Engine Photograph */}
          <div ref={imagePinRef} className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative rounded-sm border border-zinc-200 bg-[#121316] p-2.5 sm:p-3 shadow-lg overflow-hidden">
              <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden rounded-xs bg-zinc-950">
                <img
                  src="https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&w=1400&q=85"
                  alt="High-resolution photograph of an AMG 4.0L Bi-Turbo V8 engine showcasing authentic mechanical casting, high pressure turbo lines and intake manifold"
                  className="editorial-image-target w-full h-full object-cover object-center filter contrast-[1.05] brightness-95"
                  loading="lazy"
                />

                {/* Subtle technical gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Bottom metadata tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-[11px] font-mono bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xs border border-white/10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    M177 90° V8 BITURBO ENGINE
                  </span>
                  <span className="text-zinc-400">CAST ALUMINIUM // 3,982 CC</span>
                </div>
              </div>

              {/* Editorial Caption */}
              <div className="flex items-center justify-between px-2 pt-2.5 text-[11px] font-mono text-zinc-400">
                <span>STUDIO REFERENCE: COMPLETE ENGINE BLOCK</span>
                <span>ORIGIN: UAE SUPPLY NETWORK</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Interactive Technical Focus */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="editorial-reveal inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-xs text-[11px] font-mono uppercase tracking-widest text-[#144b37] font-semibold mb-5">
              <span>ENGINE SUPPLY SPECIALISTS</span>
            </div>

            <h2 className="editorial-reveal text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111215] tracking-tight leading-[1.12] mb-6">
              Every Engine Has a Purpose.
            </h2>

            <p className="editorial-reveal text-base text-zinc-600 leading-relaxed font-normal mb-8">
              From identifying the right engine code to discussing sourcing requirements, we help customers navigate the process of finding an engine suited to their vehicle.
            </p>

            {/* Interactive Technical Spec Tabs */}
            <div className="editorial-reveal border border-zinc-200 rounded-xs bg-[#fbfbfb] p-5 sm:p-6 mb-8">
              <div className="flex border-b border-zinc-200 pb-3 gap-3 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveTab('verification')}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'verification'
                      ? 'bg-[#144b37] text-white'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  01 // Code Verification
                </button>
                <button
                  onClick={() => setActiveTab('metallurgy')}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'metallurgy'
                      ? 'bg-[#144b37] text-white'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  02 // Block Integrity
                </button>
                <button
                  onClick={() => setActiveTab('crating')}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'crating'
                      ? 'bg-[#144b37] text-white'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  03 // Export Crating
                </button>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-heading font-bold text-zinc-900 mb-2">
                  {tabContent[activeTab].title}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  {tabContent[activeTab].desc}
                </p>

                <div className="space-y-2">
                  {tabContent[activeTab].points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#144b37] mt-0.5 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="editorial-reveal">
              <button
                onClick={onDiscussRequirements}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#144b37] hover:bg-[#0f3829] rounded-xs transition-all cursor-pointer shadow-xs group"
              >
                <span>Discuss Your Engine Requirements</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
