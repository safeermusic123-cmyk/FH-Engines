import React, { useRef } from 'react';
import { ArrowUpRight, ChevronRight, Info, ShieldCheck, Gauge } from 'lucide-react';
import { ENGINE_CATALOG, SAMPLE_CATALOG_NOTICE } from '../data/engineCatalog';
import { EngineItem } from '../types/engine';
import { gsap, useGSAP } from '../lib/gsap';

interface EngineShowcaseProps {
  onSelectEngineForEnquiry: (engine: EngineItem) => void;
  onViewDetails: (engine: EngineItem) => void;
}

export const EngineShowcase: React.FC<EngineShowcaseProps> = ({
  onSelectEngineForEnquiry,
  onViewDetails,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredImageRef = useRef<HTMLDivElement>(null);

  // Pick specific authentic engines for asymmetric composition
  const featured = ENGINE_CATALOG.find((e) => e.id === 'amg-m177-v8') || ENGINE_CATALOG[0];
  const b58 = ENGINE_CATALOG.find((e) => e.id === 'bmw-b58') || ENGINE_CATALOG[1];
  const jz = ENGINE_CATALOG.find((e) => e.id === 'toyota-2jz-gte') || ENGINE_CATALOG[2];
  const porsche = ENGINE_CATALOG.find((e) => e.id === 'porsche-ma176') || ENGINE_CATALOG[3];
  const audi = ENGINE_CATALOG.find((e) => e.id === 'audi-ea855-daza') || ENGINE_CATALOG[4];
  const rover = ENGINE_CATALOG.find((e) => e.id === 'land-rover-aj133-sc') || ENGINE_CATALOG[5];

  useGSAP(
    () => {
      // Masked heading reveal
      gsap.from('.showcase-line-inner', {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });

      // Supporting body text
      gsap.from('.showcase-subtext', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });

      // Clipping mask reveals on asymmetric gallery images
      const clipElements = gsap.utils.toArray<HTMLElement>('.showcase-clip-image');
      clipElements.forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
      });

      // Subtle parallax on featured engine image
      if (featuredImageRef.current) {
        gsap.to('.featured-parallax-img', {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: featuredImageRef.current,
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
      id="engine-showcase"
      ref={containerRef}
      className="py-24 lg:py-32 bg-[#f7f7f5] border-b border-[#e5e5e2] relative"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Editorial Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[#17382b] font-semibold">
            <span className="w-1.5 h-1.5 bg-[#17382b]" />
            <span>01 // ENGINE SHOWCASE ARCHIVE</span>
          </div>

          <div className="overflow-hidden mb-4">
            <h2 className="showcase-line-inner text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.04em] text-[#0d0e10] uppercase leading-[0.98]">
              ENGINES THAT KEEP
            </h2>
          </div>
          <div className="overflow-hidden mb-6">
            <h2 className="showcase-line-inner text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.04em] text-[#17382b] uppercase leading-[0.98]">
              YOU MOVING.
            </h2>
          </div>

          <p className="showcase-subtext text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-2xl">
            Explore our available engine inventory or contact our team to source an engine that matches your vehicle requirements. Every unit is evaluated strictly as a complete mechanical powerplant.
          </p>
        </div>

        {/* Data Sample Notice */}
        <div className="mb-14 p-4 border border-[#e5e5e2] bg-[#ffffff] flex items-start gap-3.5 text-xs font-mono text-zinc-600">
          <Info className="w-4 h-4 text-[#17382b] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="text-[#0d0e10] font-bold uppercase tracking-wider block sm:inline mr-2">
              ARCHIVE DISCLOSURE:
            </span>
            {SAMPLE_CATALOG_NOTICE}
          </div>
        </div>

        {/* ============================================================
            ASYMMETRIC COMPOSITION 1: Large Featured Engine (AMG V8)
           ============================================================ */}
        <div className="border border-[#e5e5e2] bg-[#ffffff] mb-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Image (7 cols) */}
            <div
              ref={featuredImageRef}
              className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#0d0e10] showcase-clip-image border-b lg:border-b-0 lg:border-r border-[#e5e5e2]"
            >
              <img
                src={featured.imageUrl}
                alt={featured.name}
                className="featured-parallax-img w-full h-full object-cover object-center filter contrast-[1.04]"
                loading="lazy"
              />

              <div className="absolute top-4 left-4 bg-[#0d0e10]/90 backdrop-blur-xs px-3 py-1 text-white text-[10px] font-mono border border-white/10 uppercase tracking-widest">
                FEATURED ARCHIVE SPECIFICATION
              </div>

              <div className="absolute bottom-4 left-4 bg-[#0d0e10]/90 backdrop-blur-xs px-3 py-1 text-emerald-400 text-[10px] font-mono border border-white/10">
                {featured.condition}
              </div>
            </div>

            {/* Right Editorial Metadata (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-600 uppercase tracking-widest pb-3 border-b border-[#e5e5e2] mb-6">
                  <span>{featured.manufacturer}</span>
                  <span>REF CODE: {featured.engineCode.split('/')[0]}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0d0e10] uppercase tracking-tight mb-3">
                  {featured.name}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                  {featured.specsSummary}
                </p>

                {/* Technical Specifications Table */}
                <div className="border-t border-[#e5e5e2] py-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-zinc-100">
                    <span className="text-zinc-600">Displacement:</span>
                    <span className="font-semibold text-zinc-900">{featured.displacement}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100">
                    <span className="text-zinc-600">Configuration:</span>
                    <span className="font-semibold text-zinc-900">{featured.configuration}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100">
                    <span className="text-zinc-600">Aspiration:</span>
                    <span className="font-semibold text-zinc-900 text-right max-w-[60%] truncate">{featured.aspiration}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100">
                    <span className="text-zinc-600">Power Rating:</span>
                    <span className="font-semibold text-zinc-900">{featured.powerOutputGuide}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100">
                    <span className="text-zinc-600">Compatibility:</span>
                    <span className="font-semibold text-zinc-900 text-right max-w-[60%] truncate">{featured.vehicleCompatibility}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-600">Price Guide:</span>
                    <span className="font-semibold text-[#17382b]">{featured.guidePrice}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-[#e5e5e2] grid grid-cols-2 gap-3">
                <button
                  onClick={() => onViewDetails(featured)}
                  className="py-3 px-4 text-[11px] font-mono uppercase tracking-wider text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors cursor-pointer text-center"
                >
                  Inspect Sheet
                </button>
                <button
                  onClick={() => onSelectEngineForEnquiry(featured)}
                  className="py-3 px-4 text-[11px] font-mono uppercase tracking-wider text-white bg-[#0d0e10] hover:bg-[#17382b] transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <span>Enquire Spec</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            ASYMMETRIC COMPOSITION 2: 50 / 50 Split (BMW B58 & Toyota 2JZ)
           ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* BMW B58 */}
          <div className="border border-[#e5e5e2] bg-[#ffffff] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-[#0d0e10] showcase-clip-image mb-6">
                <img
                  src={b58.imageUrl}
                  alt={b58.name}
                  className="w-full h-full object-cover object-center filter contrast-[1.04] hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-600 uppercase tracking-wider pb-2 border-b border-[#e5e5e2] mb-4">
                <span>{b58.manufacturer} // {b58.modelYears}</span>
                <span className="text-[#17382b] font-bold">OEM CODE: {b58.engineCode.split('/')[0]}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#0d0e10] uppercase mb-2">
                {b58.name}
              </h3>

              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                {b58.specsSummary}
              </p>

              <div className="py-3 border-y border-zinc-100 text-xs font-mono space-y-1 text-zinc-600">
                <div className="flex justify-between">
                  <span>Configuration:</span>
                  <span className="font-medium text-zinc-900">{b58.configuration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vehicles:</span>
                  <span className="font-medium text-zinc-900 text-right truncate max-w-[65%]">{b58.vehicleCompatibility}</span>
                </div>
                <div className="flex justify-between">
                  <span>Condition:</span>
                  <span className="font-medium text-emerald-800">{b58.condition}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={() => onViewDetails(b58)}
                className="py-2.5 text-[11px] font-mono uppercase tracking-wider text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors text-center cursor-pointer"
              >
                View Specs
              </button>
              <button
                onClick={() => onSelectEngineForEnquiry(b58)}
                className="py-2.5 text-[11px] font-mono uppercase tracking-wider text-white bg-[#0d0e10] hover:bg-[#17382b] transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Enquire</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Toyota 2JZ */}
          <div className="border border-[#e5e5e2] bg-[#ffffff] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-[#0d0e10] showcase-clip-image mb-6">
                <img
                  src={jz.imageUrl}
                  alt={jz.name}
                  className="w-full h-full object-cover object-center filter contrast-[1.04] hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-600 uppercase tracking-wider pb-2 border-b border-[#e5e5e2] mb-4">
                <span>{jz.manufacturer} // {jz.modelYears}</span>
                <span className="text-[#17382b] font-bold">OEM CODE: {jz.engineCode}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#0d0e10] uppercase mb-2">
                {jz.name}
              </h3>

              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                {jz.specsSummary}
              </p>

              <div className="py-3 border-y border-zinc-100 text-xs font-mono space-y-1 text-zinc-600">
                <div className="flex justify-between">
                  <span>Configuration:</span>
                  <span className="font-medium text-zinc-900">{jz.configuration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vehicles:</span>
                  <span className="font-medium text-zinc-900 text-right truncate max-w-[65%]">{jz.vehicleCompatibility}</span>
                </div>
                <div className="flex justify-between">
                  <span>Compression Verified:</span>
                  <span className="font-medium text-emerald-800">160+ PSI across 6 cyl</span>
                </div>
              </div>
            </div>

            <div className="pt-6 grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={() => onViewDetails(jz)}
                className="py-2.5 text-[11px] font-mono uppercase tracking-wider text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors text-center cursor-pointer"
              >
                View Specs
              </button>
              <button
                onClick={() => onSelectEngineForEnquiry(jz)}
                className="py-2.5 text-[11px] font-mono uppercase tracking-wider text-white bg-[#0d0e10] hover:bg-[#17382b] transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Enquire</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            ASYMMETRIC COMPOSITION 3: Technical 3-Column Strip (Porsche, Audi, Land Rover)
           ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[porsche, audi, rover].map((engine) => (
            <div
              key={engine.id}
              className="border border-[#e5e5e2] bg-[#ffffff] p-5 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] overflow-hidden bg-[#0d0e10] showcase-clip-image mb-4">
                  <img
                    src={engine.imageUrl}
                    alt={engine.name}
                    className="w-full h-full object-cover object-center filter contrast-[1.04]"
                    loading="lazy"
                  />
                </div>

                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-1">
                  {engine.manufacturer} // {engine.displacement}
                </div>

                <h4 className="text-base font-heading font-extrabold text-[#0d0e10] uppercase mb-2">
                  {engine.name}
                </h4>

                <div className="text-[11px] font-mono text-zinc-600 mb-4 pb-3 border-b border-zinc-100">
                  <span className="text-zinc-600 block">CODE: {engine.engineCode}</span>
                  <span className="text-zinc-900 block truncate">{engine.vehicleCompatibility}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#e5e5e2]">
                <button
                  onClick={() => onViewDetails(engine)}
                  className="py-2 text-[10px] font-mono uppercase tracking-wider text-zinc-700 bg-zinc-100 hover:bg-zinc-200 text-center cursor-pointer"
                >
                  Specs
                </button>
                <button
                  onClick={() => onSelectEngineForEnquiry(engine)}
                  className="py-2 text-[10px] font-mono uppercase tracking-wider text-white bg-[#0d0e10] hover:bg-[#17382b] text-center cursor-pointer"
                >
                  Enquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
