import React, { useRef, useState } from 'react';
import { 
  Globe2, 
  Plane, 
  Ship, 
  Truck, 
  ShieldCheck, 
  ArrowUpRight, 
  Box, 
  MapPin, 
  FileCheck2 
} from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';

interface ShippingSectionProps {
  onEnquireShipping: () => void;
}

export const ShippingSection: React.FC<ShippingSectionProps> = ({ onEnquireShipping }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHub, setSelectedHub] = useState<'gcc' | 'europe' | 'africa' | 'americas' | 'asia'>('gcc');

  useGSAP(
    () => {
      gsap.from('.shipping-reveal', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 78%',
        },
      });
    },
    { scope: containerRef }
  );

  const hubs = {
    gcc: {
      name: 'GCC & Middle East',
      transitModes: 'Overland Dedicated Haulage & Daily Air Cargo',
      destinations: 'Saudi Arabia (Riyadh, Jeddah, Dammam), Oman, Kuwait, Bahrain, Qatar',
      documentation: 'GCC Customs Declaration, Certificate of Origin, Vehicle Compatibility Clearance',
      packaging: 'Heavy-duty banded pallets with VCI protective covering',
    },
    europe: {
      name: 'Europe & United Kingdom',
      transitModes: 'Scheduled Air Freight & Consolidated Ocean Freight',
      destinations: 'United Kingdom, Germany, Netherlands, Poland, Scandinavia, France',
      documentation: 'Commercial Invoice, Packing List, EUR.1 / Non-preferential Origin, Sea Waybill / AWB',
      packaging: 'ISPM-15 certified heat-treated timber crates with certified fumigation stamp',
    },
    africa: {
      name: 'Africa & Mediterranean',
      transitModes: 'Containerized Ocean Cargo & Air Freight Services',
      destinations: 'Egypt, Kenya, South Africa, Nigeria, Ghana, Morocco',
      documentation: 'Export Bill of Lading, Pre-shipment Inspection report (where required)',
      packaging: 'Sealed crate enclosures resistant to tropical marine humidity',
    },
    americas: {
      name: 'North America & Caribbean',
      transitModes: 'Direct Air Cargo & Ocean Vessel via Jebel Ali Port',
      destinations: 'United States, Canada, Mexico, Caribbean Hubs',
      documentation: 'EPA / DOT export compliance declarations, Commercial Invoicing',
      packaging: 'Engine block securely anchored to steel-reinforced timber platform',
    },
    asia: {
      name: 'Asia-Pacific',
      transitModes: 'Direct Sea & Air Connections',
      destinations: 'Australia, New Zealand, Malaysia, Singapore, Pakistan',
      documentation: 'Biosecurity wash certificate (AU/NZ), Fumigation clearance, Air Waybill',
      packaging: 'Degreased assembly, dry crankcase certified, vacuum wrapped',
    },
  };

  return (
    <section
      id="global-shipping"
      ref={containerRef}
      className="py-20 lg:py-28 bg-[#fafaf9] border-b border-zinc-200/90 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="shipping-reveal inline-flex items-center gap-2 px-3 py-1 bg-zinc-200/80 border border-zinc-300 rounded-xs text-[11px] font-mono uppercase tracking-widest text-zinc-700 font-semibold mb-4">
            <Globe2 className="w-3.5 h-3.5 text-[#144b37]" />
            <span>GLOBAL LOGISTICS CAPABILITY</span>
          </div>

          <h2 className="shipping-reveal text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111215] tracking-tight leading-tight mb-4">
            Based in the UAE. Connecting Engine Supply Worldwide.
          </h2>

          <p className="shipping-reveal text-base text-zinc-600 leading-relaxed font-normal">
            Based in the United Arab Emirates, we support engine supply enquiries from customers seeking automotive engines locally and across international markets.
          </p>
        </div>

        {/* 2-Column Logistics Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Interactive Region Selection */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-zinc-200 rounded-xs p-5 shadow-2xs">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3">
                Select Destination Region
              </h3>

              <div className="space-y-2">
                {(Object.keys(hubs) as Array<keyof typeof hubs>).map((key) => {
                  const hub = hubs[key];
                  const isSelected = selectedHub === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedHub(key)}
                      className={`w-full text-left p-3.5 rounded-xs border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#144b37] bg-emerald-50/50 text-[#144b37]'
                          : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-4 h-4 ${isSelected ? 'text-[#144b37]' : 'text-zinc-400'}`} />
                        <div>
                          <span className="text-xs font-heading font-bold block">{hub.name}</span>
                          <span className="text-[10px] font-mono text-zinc-500">{hub.transitModes}</span>
                        </div>
                      </div>
                      <span className={`text-xs font-mono ${isSelected ? 'font-bold' : 'text-zinc-400'}`}>
                        {isSelected ? 'ACTIVE' : 'SELECT'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* UAE Freight Departure Ports */}
            <div className="bg-zinc-900 text-white p-5 rounded-xs border border-zinc-800">
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-2">
                UAE DEPARTURE HUBS
              </div>
              <div className="grid grid-cols-3 gap-3 text-[11px] font-mono text-zinc-300">
                <div className="p-2 bg-zinc-800/60 rounded-xs border border-zinc-700/50">
                  <div className="text-white font-bold">Jebel Ali</div>
                  <div className="text-[10px] text-zinc-400">Port (Sea)</div>
                </div>
                <div className="p-2 bg-zinc-800/60 rounded-xs border border-zinc-700/50">
                  <div className="text-white font-bold">DXB / DWC</div>
                  <div className="text-[10px] text-zinc-400">Cargo (Air)</div>
                </div>
                <div className="p-2 bg-zinc-800/60 rounded-xs border border-zinc-700/50">
                  <div className="text-white font-bold">Sharjah</div>
                  <div className="text-[10px] text-zinc-400">Freight Center</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Hub Overview & Crating Standards */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-xs p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#144b37] font-semibold">
                  LOGISTICS SPECIFICATION
                </span>
                <h3 className="text-xl font-heading font-bold text-[#111215]">
                  {hubs[selectedHub].name}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-zinc-500">
                <Truck className="w-4 h-4" />
                <Ship className="w-4 h-4" />
                <Plane className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-5 text-xs">
              <div>
                <span className="font-mono text-zinc-400 uppercase text-[11px] block mb-1">
                  Primary Transit Modes:
                </span>
                <p className="font-medium text-zinc-800">{hubs[selectedHub].transitModes}</p>
              </div>

              <div>
                <span className="font-mono text-zinc-400 uppercase text-[11px] block mb-1">
                  Typical Destination Ports & Hubs:
                </span>
                <p className="text-zinc-700 leading-relaxed">{hubs[selectedHub].destinations}</p>
              </div>

              <div>
                <span className="font-mono text-zinc-400 uppercase text-[11px] block mb-1">
                  Export Documentation Provided:
                </span>
                <p className="text-zinc-700 leading-relaxed">{hubs[selectedHub].documentation}</p>
              </div>

              <div>
                <span className="font-mono text-zinc-400 uppercase text-[11px] block mb-1">
                  Crating & Hazardous Materials Preparation:
                </span>
                <p className="text-zinc-700 leading-relaxed">{hubs[selectedHub].packaging}</p>
              </div>
            </div>

            {/* Warehouse Crating Photo Showcase */}
            <div className="mt-8 pt-6 border-t border-zinc-100">
              <div className="relative aspect-[21/9] rounded-xs overflow-hidden bg-zinc-900 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85"
                  alt="Industrial warehouse logistics facility with packaged crates prepared for international freight dispatch"
                  className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-90"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-xs text-[10px] font-mono text-zinc-300">
                  UAE EXPORT PACKAGING FACILITY // ISPM-15 STANDARDS
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                  <FileCheck2 className="w-3.5 h-3.5 text-[#144b37]" />
                  <span>Freight rates confirmed on individual inquiry basis</span>
                </div>

                <button
                  onClick={onEnquireShipping}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#144b37] hover:bg-[#0f3829] rounded-xs transition-colors cursor-pointer"
                >
                  <span>Enquire About International Shipping</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
