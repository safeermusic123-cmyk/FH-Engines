import React from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { EngineItem } from '../types/engine';

interface EngineDetailsModalProps {
  engine: EngineItem | null;
  onClose: () => void;
  onEnquire: (engine: EngineItem) => void;
}

export const EngineDetailsModal: React.FC<EngineDetailsModalProps> = ({
  engine,
  onClose,
  onEnquire,
}) => {
  if (!engine) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-3xl bg-white border border-zinc-200 rounded-lg shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-200 bg-[#f8fafc]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a31414]" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block">
                ENGINE SPECIFICATION SHEET
              </span>
              <h3 className="text-base sm:text-lg font-heading font-extrabold text-[#0f172a] uppercase">
                {engine.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-200 rounded-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Engine Photo & Badges */}
          <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-zinc-950 border border-zinc-200">
            <img
              src={engine.imageUrl}
              alt={engine.name}
              className="w-full h-full object-cover object-center filter contrast-[1.04]"
            />
            <div className="absolute top-3 left-3 bg-[#0f172a]/90 backdrop-blur-xs px-3 py-1 text-white text-[10px] font-mono rounded-sm uppercase">
              {engine.condition}
            </div>
            <div className="absolute top-3 right-3 bg-white/95 px-3 py-1 text-[#a31414] text-[10px] font-mono font-bold rounded-sm shadow-xs">
              CODE: {engine.engineCode}
            </div>
          </div>

          {/* Core Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#f8fafc] border border-zinc-200 rounded-md">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Manufacturer</span>
              <span className="text-xs font-bold text-zinc-900 block mt-0.5">{engine.manufacturer}</span>
            </div>
            <div className="p-3 bg-[#f8fafc] border border-zinc-200 rounded-md">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Displacement</span>
              <span className="text-xs font-bold text-zinc-900 block mt-0.5">{engine.displacement}</span>
            </div>
            <div className="p-3 bg-[#f8fafc] border border-zinc-200 rounded-md">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Configuration</span>
              <span className="text-xs font-bold text-zinc-900 block mt-0.5">{engine.configuration}</span>
            </div>
            <div className="p-3 bg-[#f8fafc] border border-zinc-200 rounded-md">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Fuel Type</span>
              <span className="text-xs font-bold text-zinc-900 block mt-0.5">{engine.fuelType}</span>
            </div>
            <div className="p-3 bg-[#f8fafc] border border-zinc-200 rounded-md">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Model Years</span>
              <span className="text-xs font-bold text-zinc-900 block mt-0.5">{engine.modelYears}</span>
            </div>
            <div className="p-3 bg-[#f8fafc] border border-zinc-200 rounded-md">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Compression Ratio</span>
              <span className="text-xs font-bold text-zinc-900 block mt-0.5">{engine.compressionRatio || 'N/A'}</span>
            </div>
          </div>

          {/* Description & Verification */}
          <div className="p-4 bg-[#f8fafc] border border-zinc-200 rounded-md">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold mb-2">
              Assembly Scope & Verified Inclusions
            </h4>
            <p className="text-xs text-zinc-700 leading-relaxed mb-4">
              {engine.specsSummary}
            </p>

            <div className="space-y-2 pt-3 border-t border-zinc-200 text-xs font-mono text-zinc-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#a31414] shrink-0" />
                <span>Compatible with: {engine.vehicleCompatibility}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#a31414] shrink-0" />
                <span>Aspiration: {engine.aspiration}</span>
              </div>
              {engine.powerOutputGuide && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#a31414] shrink-0" />
                  <span>Factory Power Rating: {engine.powerOutputGuide}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#a31414] shrink-0" />
                <span>Dispatch Hub: {engine.originHub}</span>
              </div>
            </div>
          </div>

          {/* Price & Notice */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-red-50/60 border border-red-200 rounded-md text-xs">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#a31414] block">Price Guide:</span>
              <span className="font-heading font-extrabold text-sm text-[#0f172a]">{engine.guidePrice}</span>
            </div>
            <span className="text-[10px] font-mono text-red-700 mt-2 sm:mt-0 font-medium">
              * Exact quotation confirmed upon vehicle VIN verification
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-zinc-200 bg-[#f8fafc] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-600 hover:text-black transition-colors cursor-pointer"
          >
            Close Sheet
          </button>

          <button
            onClick={() => {
              onClose();
              onEnquire(engine);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#a31414] hover:bg-[#881010] rounded-md transition-colors cursor-pointer shadow-xs"
          >
            <span>Request Quote For This Engine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
