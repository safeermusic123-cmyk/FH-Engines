import React, { useState, useRef, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  Sparkles, 
  Info, 
  Gauge, 
  CheckCircle2, 
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { 
  ENGINE_CATALOG, 
  MANUFACTURER_OPTIONS, 
  CONDITION_OPTIONS, 
  FUEL_OPTIONS,
  SAMPLE_CATALOG_NOTICE 
} from '../data/engineCatalog';
import { EngineItem } from '../types/engine';
import { gsap, useGSAP } from '../lib/gsap';

interface EngineCatalogProps {
  onSelectEngineForEnquiry: (engine: EngineItem) => void;
  onViewDetails: (engine: EngineItem) => void;
}

export const EngineCatalog: React.FC<EngineCatalogProps> = ({
  onSelectEngineForEnquiry,
  onViewDetails,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [selectedManufacturer, setSelectedManufacturer] = useState('All Manufacturers');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [selectedFuel, setSelectedFuel] = useState('All Fuel Types');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredEngines = useMemo(() => {
    return ENGINE_CATALOG.filter((engine) => {
      const matchesManufacturer =
        selectedManufacturer === 'All Manufacturers' ||
        engine.manufacturer.toLowerCase().includes(selectedManufacturer.toLowerCase()) ||
        selectedManufacturer.toLowerCase().includes(engine.manufacturer.toLowerCase());

      const matchesCondition =
        selectedCondition === 'All Conditions' || engine.condition === selectedCondition;

      const matchesFuel =
        selectedFuel === 'All Fuel Types' || engine.fuelType === selectedFuel;

      const matchesSearch =
        searchQuery.trim() === '' ||
        engine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        engine.engineCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        engine.vehicleCompatibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
        engine.displacement.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesManufacturer && matchesCondition && matchesFuel && matchesSearch;
    });
  }, [selectedManufacturer, selectedCondition, selectedFuel, searchQuery]);

  useGSAP(
    () => {
      // Reveal heading with masked text
      gsap.from('.catalog-header-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });

      // Animate cards on initial mount
      gsap.from('.catalog-card', {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      });
    },
    { scope: containerRef }
  );

  const resetFilters = () => {
    setSelectedManufacturer('All Manufacturers');
    setSelectedCondition('All Conditions');
    setSelectedFuel('All Fuel Types');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedManufacturer !== 'All Manufacturers' ||
    selectedCondition !== 'All Conditions' ||
    selectedFuel !== 'All Fuel Types' ||
    searchQuery !== '';

  return (
    <section
      id="engine-range"
      ref={containerRef}
      className="py-20 lg:py-28 bg-[#fafaf9] border-b border-zinc-200/90 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="catalog-header-text inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-zinc-200/80 border border-zinc-300/80 text-[11px] font-mono uppercase tracking-widest text-zinc-700 font-semibold mb-4">
              <span>EXCLUSIVELY CAR ENGINES</span>
            </div>
            <h2 className="catalog-header-text text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111215] tracking-tight leading-tight mb-4">
              Engines That Keep You Moving.
            </h2>
            <p className="catalog-header-text text-base text-zinc-600 leading-relaxed font-normal">
              Explore our available engine inventory or contact our team to source an engine that matches your vehicle requirements.
            </p>
          </div>

          <div className="catalog-header-text flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="text-xs font-mono text-zinc-500 bg-white border border-zinc-200 px-3.5 py-2 rounded-xs shadow-2xs">
              SHOWING <span className="font-semibold text-zinc-900">{filteredEngines.length}</span> OF {ENGINE_CATALOG.length} ENGINES
            </div>
          </div>
        </div>

        {/* Sample Inventory Notice Banner */}
        <div className="mb-8 p-4 rounded-xs bg-emerald-950/5 border border-emerald-800/20 flex items-start gap-3 text-xs text-[#144b37]">
          <Info className="w-4 h-4 mt-0.5 shrink-0 text-[#144b37]" />
          <div className="leading-relaxed">
            <span className="font-semibold font-mono uppercase tracking-wider text-[11px] block sm:inline mr-2">
              Catalogue Data Notice:
            </span>
            {SAMPLE_CATALOG_NOTICE}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-xs border border-zinc-200 shadow-2xs mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search engine code, vehicle model (e.g. B58, 2JZ, RS3, AMG)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xs text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all"
              />
            </div>

            {/* Manufacturer Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedManufacturer}
                onChange={(e) => setSelectedManufacturer(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xs text-xs font-medium text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all cursor-pointer"
              >
                {MANUFACTURER_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Selector */}
            <div className="md:col-span-2">
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xs text-xs font-medium text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all cursor-pointer"
              >
                {CONDITION_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Type Selector */}
            <div className="md:col-span-2">
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xs text-xs font-medium text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all cursor-pointer"
              >
                {FUEL_OPTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filter pills & Reset */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs">
              <div className="flex items-center gap-2 text-zinc-500 font-mono text-[11px]">
                <span>Active Filters:</span>
                {selectedManufacturer !== 'All Manufacturers' && (
                  <span className="px-2 py-0.5 bg-zinc-100 rounded-xs text-zinc-800">{selectedManufacturer}</span>
                )}
                {selectedCondition !== 'All Conditions' && (
                  <span className="px-2 py-0.5 bg-zinc-100 rounded-xs text-zinc-800">{selectedCondition}</span>
                )}
                {selectedFuel !== 'All Fuel Types' && (
                  <span className="px-2 py-0.5 bg-zinc-100 rounded-xs text-zinc-800">{selectedFuel}</span>
                )}
                {searchQuery && (
                  <span className="px-2 py-0.5 bg-zinc-100 rounded-xs text-zinc-800">&quot;{searchQuery}&quot;</span>
                )}
              </div>

              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-black font-medium cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Engine Grid - Editorial layout with varied proportions */}
        {filteredEngines.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xs border border-zinc-200 p-8">
            <Gauge className="w-10 h-10 text-zinc-300 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-bold text-zinc-900 mb-2">No matching engines in current preview</h3>
            <p className="text-xs text-zinc-500 max-w-md mx-auto mb-6">
              We specialize in custom engine sourcing. If your required engine code is not shown, submit an enquiry with your vehicle details.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#144b37] hover:bg-[#0f3829] rounded-xs cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredEngines.map((engine) => (
              <div
                key={engine.id}
                className="catalog-card flex flex-col justify-between bg-white border border-zinc-200/90 rounded-xs overflow-hidden shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all duration-300 group"
              >
                {/* Top Image Container */}
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                    <img
                      src={engine.imageUrl}
                      alt={engine.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Condition Badge */}
                    <div className="absolute top-3 left-3 bg-[#111215]/85 backdrop-blur-md px-2.5 py-1 rounded-xs border border-zinc-700/60 text-white text-[10px] font-mono">
                      {engine.condition}
                    </div>

                    {/* Code Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xs border border-zinc-200 text-[#121316] text-[10px] font-mono font-bold tracking-wider">
                      {engine.engineCode.split(' ')[0]}
                    </div>

                    {/* Displacement overlay */}
                    <div className="absolute bottom-3 left-3 bg-[#144b37]/90 text-white text-[10px] font-mono px-2 py-0.5 rounded-xs">
                      {engine.displacement}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5 uppercase">
                      <span>{engine.manufacturer}</span>
                      <span>{engine.modelYears}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-heading font-bold text-[#111215] mb-2 leading-snug group-hover:text-[#144b37] transition-colors">
                      {engine.name}
                    </h3>

                    <p className="text-xs text-zinc-500 mb-4 line-clamp-2 leading-relaxed">
                      {engine.specsSummary}
                    </p>

                    {/* Technical Specs Snapshot */}
                    <div className="space-y-1.5 py-3 border-y border-zinc-100 text-[11px] font-mono text-zinc-600">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Compatibility:</span>
                        <span className="text-zinc-900 font-medium text-right max-w-[65%] truncate">
                          {engine.vehicleCompatibility}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Configuration:</span>
                        <span className="text-zinc-800 font-medium">{engine.configuration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Aspiration:</span>
                        <span className="text-zinc-800 font-medium truncate max-w-[65%]">{engine.aspiration}</span>
                      </div>
                    </div>

                    {/* Pricing Guide */}
                    <div className="pt-3 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-zinc-400 block">Pricing Guide:</span>
                        <span className="text-xs font-semibold text-zinc-900">{engine.guidePrice}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs">
                        UAE Export Ready
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onViewDetails(engine)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80 rounded-xs transition-colors cursor-pointer"
                  >
                    <span>View Specs</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>

                  <button
                    onClick={() => onSelectEngineForEnquiry(engine)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-[#144b37] hover:bg-[#0f3829] rounded-xs transition-colors cursor-pointer group/btn"
                  >
                    <span>Enquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Sourcing Callout inside catalog */}
        <div className="mt-14 p-6 sm:p-8 rounded-xs bg-[#111215] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CUSTOM VEHICLE SOURCING SERVICE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
              Need an engine code not displayed in this catalogue?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Our UAE sourcing desk has direct access to verified automotive engine stockyards across Sharjah, Dubai Auto Zone, and Japanese/European import manifests.
            </p>
          </div>

          <button
            onClick={() => {
              const element = document.getElementById('engine-sourcing');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shrink-0 px-6 py-3 bg-white text-[#111215] hover:bg-zinc-100 font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
          >
            Start Sourcing Enquiry
          </button>
        </div>
      </div>
    </section>
  );
};
