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
  Eye,
  MapPin
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
      className="py-12 lg:py-20 bg-[#f8fafc]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="catalog-header-anim inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#a31414] font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#a31414]" />
              <span>COMPLETE ENGINE INVENTORY · SHARJAH, UAE</span>
            </div>
            <h2 className="catalog-header-anim text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#0f172a] tracking-tight">
              Verified Engine Catalogue
            </h2>
            <p className="catalog-header-anim text-sm sm:text-base text-zinc-600 mt-3 max-w-2xl font-normal leading-relaxed">
              Explore tested petrol and diesel car engines ready for dispatch from our Sharjah warehouse. Filter by manufacturer, condition, and fuel type.
            </p>
          </div>

          {/* Quick Notice Tag */}
          <div className="catalog-header-anim flex items-center gap-2 text-xs text-zinc-600 bg-white border border-zinc-200 px-4 py-2.5 rounded-md shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>OEM Code & VIN Match Verification Before Dispatch</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-zinc-200 rounded-lg p-5 sm:p-6 mb-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search engine code (e.g. B58, M177, 2JZ), make, model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Manufacturer Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedManufacturer}
                onChange={(e) => setSelectedManufacturer(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-xs sm:text-sm text-zinc-800 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all cursor-pointer"
              >
                {MANUFACTURER_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-xs sm:text-sm text-zinc-800 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all cursor-pointer"
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
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-xs sm:text-sm text-zinc-800 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all cursor-pointer"
              >
                {FUEL_OPTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Popular Brand Pills & Reset */}
          <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-zinc-500 font-semibold mr-1">Brands:</span>
              {popularBrands.map((brand) => {
                const isSelected =
                  brand === 'All'
                    ? selectedManufacturer === 'All Manufacturers'
                    : selectedManufacturer === brand;
                return (
                  <button
                    key={brand}
                    onClick={() =>
                      setSelectedManufacturer(brand === 'All' ? 'All Manufacturers' : brand)
                    }
                    className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#a31414] text-white shadow-xs'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-[#a31414] transition-colors cursor-pointer font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between mb-6 text-xs text-zinc-500">
          <div>
            Showing <strong className="text-zinc-900 font-bold">{filteredEngines.length}</strong> of{' '}
            {ENGINE_CATALOG.length} engine configurations in stock
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
              If your specific engine code is not in this view, send us an enquiry directly and our technical desk will check unlisted warehouse arrivals.
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
                className="flex flex-col justify-between bg-white border border-zinc-200/90 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-zinc-300 transition-all duration-300 group"
              >
                {/* Image Container with pure engine image */}
                <div>
                  <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
                    <img
                      src={engine.imageUrl}
                      alt={engine.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-[1.03]"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    {/* Status & Code Row below the image */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 text-xs font-bold text-white bg-[#a31414] rounded-md tracking-wider">
                        {engine.engineCode}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Sharjah Stock</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#a31414]">
                        {engine.manufacturer}
                      </span>
                      <span className="text-[11px] font-medium text-zinc-500">
                        {engine.condition}
                      </span>
                    </div>

                    <h3 className="text-lg font-heading font-extrabold text-[#0f172a] leading-snug line-clamp-2 mb-2 group-hover:text-[#a31414] transition-colors">
                      {engine.name}
                    </h3>

                    <p className="text-xs text-zinc-600 line-clamp-2 mb-4 leading-relaxed">
                      <strong className="text-zinc-800">Vehicle Models:</strong> {engine.vehicleCompatibility}
                    </p>

                    {/* Technical Parameter Pills */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-zinc-50 p-3 rounded-lg border border-zinc-100 mb-4">
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-semibold">
                          Displacement
                        </span>
                        <span className="font-bold text-zinc-800">{engine.displacement}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-semibold">
                          Fuel / Valvetrain
                        </span>
                        <span className="font-bold text-zinc-800">{engine.fuelType}</span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-zinc-200/60">
                        <span className="text-zinc-400 block text-[10px] uppercase font-semibold">
                          Power Baseline
                        </span>
                        <span className="font-bold text-zinc-800">{engine.powerOutputGuide}</span>
                      </div>
                    </div>

                    {/* Price Guide */}
                    <div className="mb-2">
                      <span className="text-[10px] uppercase font-semibold text-zinc-400 block">
                        Price Guide (Ex-Sharjah)
                      </span>
                      <span className="text-sm font-extrabold text-[#0f172a]">
                        {engine.guidePrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Button: Single View Details option */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onViewDetails(engine)}
                    className="w-full py-2.5 px-4 bg-[#0f172a] hover:bg-[#a31414] active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs group/btn"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
