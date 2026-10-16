import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { EngineItem } from '../types/engine';
import { ENGINE_CATALOG } from '../data/engineCatalog';

interface RecentArrivalsSectionProps {
  onSelectEngineForEnquiry: (engine: EngineItem) => void;
  onViewDetails: (engine: EngineItem) => void;
  onViewAllEngines: () => void;
}

export const RecentArrivalsSection: React.FC<RecentArrivalsSectionProps> = ({
  onSelectEngineForEnquiry,
  onViewDetails,
  onViewAllEngines,
}) => {
  // Strictly 6 recent engine arrivals
  const recentEngines = ENGINE_CATALOG.slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number>(0);

  // Responsive visible cards count
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, recentEngines.length - visibleCount);

  // Auto-scroll slider every 4 seconds if not paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  return (
    <section
      id="recent-arrivals"
      className="py-20 lg:py-28 bg-[#fafafa] border-b border-zinc-200 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#0f172a] tracking-tight">
              Recent Engine Arrivals
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 font-normal mt-3 max-w-2xl leading-relaxed">
              Recently unboxed, compression-tested, and verified complete engine assemblies now ready at our Sharjah facility for instant local pick-up or worldwide crated export.
            </p>
          </div>

          {/* Controls: Slider navigation & Browse All */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous engine"
              className="w-11 h-11 rounded-full border border-zinc-300 bg-white hover:bg-zinc-100 active:scale-95 text-zinc-700 flex items-center justify-center transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next engine"
              className="w-11 h-11 rounded-full border border-zinc-300 bg-white hover:bg-zinc-100 active:scale-95 text-zinc-700 flex items-center justify-center transition-all cursor-pointer shadow-xs"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onViewAllEngines}
              className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#a31414] hover:bg-[#881010] active:scale-95 transition-all rounded-md shadow-xs cursor-pointer"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Automatic Slider Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slider viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {recentEngines.map((engine) => (
                <div
                  key={engine.id}
                  className="w-full shrink-0 px-2 sm:px-3 md:w-1/2 lg:w-1/3"
                >
                  <div className="h-full bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group">
                    {/* Pure Engine Image without any text on top */}
                    <div 
                      onClick={() => onViewDetails(engine)}
                      className="relative aspect-[16/11] bg-zinc-900 overflow-hidden cursor-pointer"
                      title="Click to view full engine details"
                    >
                      <img
                        src={engine.imageUrl}
                        alt={engine.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Engine Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Status & Code Row under the image */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-1 text-xs font-bold text-white bg-[#a31414] rounded-md tracking-wider">
                            {engine.engineCode}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 rounded-md border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>In Stock · Sharjah</span>
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

                        <h3 
                          onClick={() => onViewDetails(engine)}
                          className="text-lg font-heading font-extrabold text-[#0f172a] leading-snug line-clamp-2 mb-2 hover:text-[#a31414] cursor-pointer transition-colors"
                        >
                          {engine.name}
                        </h3>

                        <p className="text-xs text-zinc-600 line-clamp-2 mb-4 leading-relaxed">
                          <strong>Fitment:</strong> {engine.vehicleCompatibility}
                        </p>

                        {/* Specs grid */}
                        <div className="grid grid-cols-2 gap-2 text-xs bg-zinc-50 p-3 rounded-lg border border-zinc-100 mb-4">
                          <div>
                            <span className="text-zinc-500 block text-[10px] uppercase font-semibold">
                              Displacement
                            </span>
                            <span className="font-bold text-zinc-900">{engine.displacement}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[10px] uppercase font-semibold">
                              Fuel Type
                            </span>
                            <span className="font-bold text-zinc-900">{engine.fuelType}</span>
                          </div>
                        </div>

                        {/* Guide price */}
                        <div className="mb-4">
                          <span className="text-[10px] uppercase font-semibold text-zinc-500 block">
                            Price Guide (Ex-Sharjah)
                          </span>
                          <span className="text-sm font-extrabold text-[#0f172a]">
                            {engine.guidePrice}
                          </span>
                        </div>
                      </div>

                      {/* Action button: Clean single enquiry button with Specs option removed */}
                      <div className="pt-3 border-t border-zinc-100">
                        <button
                          onClick={() => onSelectEngineForEnquiry(engine)}
                          className="w-full py-2.5 px-4 bg-[#a31414] hover:bg-[#881010] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs group/btn"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Request Quotation</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-[#a31414]' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

