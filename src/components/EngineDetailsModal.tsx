import React from 'react';
import { X, ArrowRight, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-zinc-200 bg-[#f8fafc]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#a31414]" />
            <div>
              <span className="text-xs uppercase tracking-wider text-[#a31414] font-bold block">
                FH ENGINE · TECHNICAL SPECIFICATION
              </span>
              <h3 className="text-lg sm:text-xl font-heading font-extrabold text-[#0f172a] uppercase">
                {engine.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Pure Engine Photo without text on top */}
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-200">
            <img
              src={engine.imageUrl}
              alt={engine.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-[1.03]"
            />
          </div>

          {/* Badges row below image */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className="px-3 py-1.5 bg-[#0f172a] text-white text-xs font-bold rounded-lg uppercase tracking-wider">
              {engine.condition}
            </span>
            <span className="px-3 py-1.5 bg-red-50 text-[#a31414] border border-red-200 text-xs font-extrabold rounded-lg">
              ENGINE CODE: {engine.engineCode}
            </span>
          </div>

          {/* Core Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-[#f8fafc] border border-zinc-200 rounded-xl">
              <span className="text-[11px] uppercase font-bold text-zinc-500 block">Manufacturer</span>
              <span className="text-xs sm:text-sm font-extrabold text-zinc-900 block mt-1">{engine.manufacturer}</span>
            </div>
            <div className="p-3.5 bg-[#f8fafc] border border-zinc-200 rounded-xl">
              <span className="text-[11px] uppercase font-bold text-zinc-500 block">Displacement</span>
              <span className="text-xs sm:text-sm font-extrabold text-zinc-900 block mt-1">{engine.displacement}</span>
            </div>
            <div className="p-3.5 bg-[#f8fafc] border border-zinc-200 rounded-xl">
              <span className="text-[11px] uppercase font-bold text-zinc-500 block">Configuration</span>
              <span className="text-xs sm:text-sm font-extrabold text-zinc-900 block mt-1">{engine.configuration}</span>
            </div>
            <div className="p-3.5 bg-[#f8fafc] border border-zinc-200 rounded-xl">
              <span className="text-[11px] uppercase font-bold text-zinc-500 block">Fuel Type</span>
              <span className="text-xs sm:text-sm font-extrabold text-zinc-900 block mt-1">{engine.fuelType}</span>
            </div>
            <div className="p-3.5 bg-[#f8fafc] border border-zinc-200 rounded-xl">
              <span className="text-[11px] uppercase font-bold text-zinc-500 block">Model Years</span>
              <span className="text-xs sm:text-sm font-extrabold text-zinc-900 block mt-1">{engine.modelYears}</span>
            </div>
            <div className="p-3.5 bg-[#f8fafc] border border-zinc-200 rounded-xl">
              <span className="text-[11px] uppercase font-bold text-zinc-500 block">Compression Ratio</span>
              <span className="text-xs sm:text-sm font-extrabold text-zinc-900 block mt-1">{engine.compressionRatio || 'OEM Spec'}</span>
            </div>
          </div>

          {/* Description & Verification */}
          <div className="p-5 bg-[#f8fafc] border border-zinc-200 rounded-xl">
            <h4 className="text-xs uppercase tracking-wider text-zinc-700 font-bold mb-2">
              Assembly Scope & Verified Inclusions
            </h4>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
              {engine.specsSummary}
            </p>

            <div className="space-y-2 pt-3 border-t border-zinc-200 text-xs sm:text-sm text-zinc-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Vehicle Compatibility:</strong> {engine.vehicleCompatibility}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Aspiration:</strong> {engine.aspiration}</span>
              </div>
              {engine.powerOutputGuide && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Power Baseline:</strong> {engine.powerOutputGuide}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#a31414] shrink-0" />
                <span><strong>Location:</strong> {engine.originHub}</span>
              </div>
            </div>
          </div>

          {/* Price & Notice */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-red-50/70 border border-red-200 rounded-xl text-xs">
            <div>
              <span className="text-xs uppercase font-bold text-[#a31414] block">Price Guide (Ex-Sharjah):</span>
              <span className="font-heading font-extrabold text-base text-[#0f172a]">{engine.guidePrice}</span>
            </div>
            <span className="text-xs text-red-700 mt-2 sm:mt-0 font-medium">
              * Exact quotation confirmed upon vehicle VIN code verification
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-zinc-200 bg-[#f8fafc] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-black transition-colors cursor-pointer"
          >
            Close Sheet
          </button>

          <button
            onClick={() => {
              onClose();
              onEnquire(engine);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#a31414] hover:bg-[#881010] rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <span>Request Quote For This Engine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
