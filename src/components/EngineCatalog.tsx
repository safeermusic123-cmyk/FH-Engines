import React, { useState, useRef, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  Info, 
  Gauge, 
  CheckCircle2, 
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  Sparkles
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

  // Quick brand chips
  const popularBrands = ['All', 'BMW', 'Mercedes-Benz', 'Toyota', 'Porsche', 'Audi', 'Land Rover'];

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
      gsap.from('.catalog-header-anim', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
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
      id="engine-catalog"
      ref={containerRef}
      className="py-20 lg:py-28 bg-[#f8fafc] border-b border-zinc-200"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="catalog-header-anim inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#a31414] font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#a31414]" />
              <span>CAR ENGINE INVENTORY ARCHIVE</span>
            </div>
            <h2 className="catalog-header-anim text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight">
              Engines That Keep You Moving.
            </h2>
            <p className="catalog-header-anim text-sm sm:text-base text-zinc-600 mt-3 max-w-2xl font-normal leading-relaxed">
              Browse our inventory of complete replacement engines or filter by manufacturer, fuel type, and condition to find the right assembly for your vehicle.
            </p>
          </div>

          <div className="catalog-header-anim flex items-center gap-3">
            <div className="text-xs font-mono text-zinc-500 bg-white border border-zinc-200 px-4 py-2.5 rounded-md shadow-2xs font-medium">
              SHOWING <span className="font-bold text-[#a31414]">{filteredEngines.length}</span> OF {ENGINE_CATALOG.length} ENGINES
            </div>
          </div>
        </div>

        {/* Informative Sample Notice */}
        <div className="mb-8 p-4 rounded-md bg-white border border-zinc-200/90 shadow-2xs flex items-start gap-3 text-xs text-zinc-600">
          <Info className="w-4 h-4 text-[#a31414] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-zinc-900 font-semibold mr-1">Catalogue Note:</strong>
            {SAMPLE_CATALOG_NOTICE}
          </div>
        </div>

        {/* Filter & Search Control Panel */}
        <div className="bg-white p-5 sm:p-6 rounded-lg border border-zinc-200 shadow-xs mb-10 space-y-4">
          {/* Main search and select dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search engine code, vehicle model (e.g. B58, 2JZ, AMG, RS3)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all"
              />
            </div>

            {/* Manufacturer Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedManufacturer}
                onChange={(e) => setSelectedManufacturer(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-xs font-medium text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all cursor-pointer"
              >
                {MANUFACTURER_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-xs font-medium text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all cursor-pointer"
              >
                {CONDITION_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Type Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-xs font-medium text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all cursor-pointer"
              >
                {FUEL_OPTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Brand Filter Pills */}
          <div className="pt-2 border-t border-zinc-100 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-zinc-500 font-mono text-[11px] mr-1">Filter Brand:</span>
              {popularBrands.map((brand) => {
                const isSelected =
                  brand === 'All'
                    ? selectedManufacturer === 'All Manufacturers'
                    : selectedManufacturer.toLowerCase().includes(brand.toLowerCase());
                return (
                  <button
                    key={brand}
                    onClick={() => {
                      if (brand === 'All') setSelectedManufacturer('All Manufacturers');
                      else {
                        const found = MANUFACTURER_OPTIONS.find((m) =>
                          m.toLowerCase().includes(brand.toLowerCase())
                        );
                        setSelectedManufacturer(found || brand);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#a31414] text-white shadow-2xs font-semibold'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-[#a31414] hover:text-[#881010] font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Engine Cards Grid */}
        {filteredEngines.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-zinc-200 p-8 shadow-xs">
            <Gauge className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-bold text-zinc-900 mb-2">
              No engines match your current filter selection
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto mb-6">
              We specialize in custom engine sourcing. If your specific vehicle engine code is not in this view, contact our UAE desk to source it directly.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#a31414] hover:bg-[#881010] rounded-md transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredEngines.map((engine) => (
              <div
                key={engine.id}
                className="flex flex-col justify-between bg-white border border-zinc-200/90 rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:border-zinc-300 transition-all duration-300 group"
              >
                {/* Image Container */}
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                    <img
                      src={engine.imageUrl}
                      alt={engine.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Condition Badge */}
                    <div className="absolute top-3 left-3 bg-[#0f172a]/85 backdrop-blur-md px-2.5 py-1 rounded-sm text-white text-[10px] font-mono">
                      {engine.condition}
                    </div>

                    {/* OEM Code Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded-sm text-[#a31414] text-[10px] font-mono font-bold tracking-wider shadow-xs">
                      {engine.engineCode.split(' ')[0]}
                    </div>

                    {/* Displacement overlay */}
                    <div className="absolute bottom-3 left-3 bg-[#a31414]/90 text-white text-[10px] font-mono px-2 py-0.5 rounded-sm">
                      {engine.displacement}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5 uppercase">
                      <span>{engine.manufacturer}</span>
                      <span>{engine.modelYears}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-heading font-bold text-[#0f172a] mb-2 leading-snug group-hover:text-[#a31414] transition-colors">
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
                        <span className="text-zinc-800 font-medium truncate max-w-[65%]">
                          {engine.aspiration}
                        </span>
                      </div>
                    </div>

                    {/* Pricing Guide */}
                    <div className="pt-3 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                          Price Guide:
                        </span>
                        <span className="text-xs font-semibold text-zinc-900">{engine.guidePrice}</span>
                      </div>
                      <span className="text-[10px] font-mono text-red-700 bg-red-50 px-2 py-0.5 rounded-sm">
                        Dubai Export Ready
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onViewDetails(engine)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors cursor-pointer"
                  >
                    <span>View Specs</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>

                  <button
                    onClick={() => onSelectEngineForEnquiry(engine)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-[#a31414] hover:bg-[#881010] rounded-md transition-colors cursor-pointer group/btn"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Sourcing Callout banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-lg bg-[#0f172a] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-red-400 text-xs font-mono font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CUSTOM VEHICLE SOURCING DESK</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
              Looking for an engine code not displayed in this catalogue?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              Our Dubai sourcing desk accesses verified car engine inventories across Sharjah, Dubai Auto Zone (DAZ), and international import manifests.
            </p>
          </div>

          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shrink-0 px-6 py-3 bg-[#a31414] hover:bg-[#881010] text-white font-semibold text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer"
          >
            Start Sourcing Enquiry
          </button>
        </div>
      </div>
    </section>
  );
};
