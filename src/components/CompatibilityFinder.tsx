import React, { useState, useRef } from 'react';
import { Search, CheckCircle, AlertCircle, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';

interface CompatibilityFinderProps {
  onSuccessRedirect?: () => void;
}

export const CompatibilityFinder: React.FC<CompatibilityFinderProps> = ({ onSuccessRedirect }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [engineCode, setEngineCode] = useState('');
  const [fuelType, setFuelType] = useState('Petrol / Gasoline');
  const [condition, setCondition] = useState('Any Suitable Condition');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    make: string;
    model: string;
    year: string;
    engineCode: string;
  } | null>(null);

  useGSAP(
    () => {
      gsap.from('.finder-content', {
        y: 24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!make.trim()) newErrors.make = 'Please enter vehicle make (e.g. BMW, Toyota, Mercedes)';
    if (!model.trim()) newErrors.model = 'Please enter vehicle model (e.g. 540i, Supra, Land Cruiser)';
    if (!year.trim()) newErrors.year = 'Please enter vehicle manufacturing year';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmittedData({
      make,
      model,
      year,
      engineCode: engineCode || 'To be identified from vehicle VIN',
    });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setMake('');
    setModel('');
    setYear('');
    setEngineCode('');
    setNotes('');
  };

  return (
    <section
      id="find-engine"
      ref={containerRef}
      className="py-20 lg:py-28 bg-[#f5f5f4] border-b border-zinc-200/90"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="finder-content inline-flex items-center gap-2 px-3 py-1 bg-zinc-200/80 border border-zinc-300 rounded-xs text-[11px] font-mono uppercase tracking-widest text-zinc-700 font-semibold mb-4">
            <Search className="w-3.5 h-3.5 text-[#144b37]" />
            <span>SPECIFIC ENGINE ENQUIRY</span>
          </div>

          <h2 className="finder-content text-3xl sm:text-4xl font-extrabold text-[#111215] tracking-tight leading-tight mb-4">
            Looking for a Specific Engine?
          </h2>

          <p className="finder-content text-sm sm:text-base text-zinc-600 leading-relaxed">
            Share your vehicle details and the engine you need. Our team can review your requirements and discuss availability or sourcing options.
          </p>
        </div>

        {/* Compatibility Form Card */}
        <div className="finder-content bg-white border border-zinc-200 rounded-xs shadow-xs p-6 sm:p-10">
          {isSubmitted && submittedData ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-[#144b37] mx-auto mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-zinc-900 mb-2">
                Engine Enquiry Received
              </h3>
              <p className="text-xs text-zinc-500 max-w-md mx-auto mb-6">
                Your enquiry parameters for the{' '}
                <strong className="text-zinc-800">
                  {submittedData.year} {submittedData.make} {submittedData.model}
                </strong>{' '}
                ({submittedData.engineCode}) have been logged into the consultation queue.
              </p>

              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xs max-w-lg mx-auto text-left text-xs font-mono space-y-1.5 mb-8">
                <div className="text-zinc-400 text-[10px] uppercase">// ENQUIRY REFERENCE TICKET (FRONT-END DEMO)</div>
                <div className="text-zinc-700">Vehicle: {submittedData.year} {submittedData.make} {submittedData.model}</div>
                <div className="text-zinc-700">Engine Code/Size: {submittedData.engineCode}</div>
                <div className="text-zinc-700">Condition Preference: {condition}</div>
                <div className="text-zinc-500 text-[11px] pt-2 border-t border-zinc-200">
                  * Note: In production mode, this automatically routes to the UAE warehouse desk via webhook or email dispatch.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-xs transition-colors cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
                <a
                  href="#contact"
                  onClick={onSuccessRedirect}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#144b37] hover:bg-[#0f3829] rounded-xs transition-colors"
                >
                  Proceed to Direct Quote Desk
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {/* Vehicle Make */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Vehicle Make <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={make}
                    onChange={(e) => {
                      setMake(e.target.value);
                      if (errors.make) setErrors({ ...errors, make: '' });
                    }}
                    placeholder="e.g. BMW, Mercedes, Toyota"
                    className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                      errors.make ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                    } rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all`}
                  />
                  {errors.make && <p className="text-[11px] text-red-600 mt-1">{errors.make}</p>}
                </div>

                {/* Vehicle Model */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Vehicle Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => {
                      setModel(e.target.value);
                      if (errors.model) setErrors({ ...errors, model: '' });
                    }}
                    placeholder="e.g. 540i, G63 AMG, Land Cruiser"
                    className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                      errors.model ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                    } rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all`}
                  />
                  {errors.model && <p className="text-[11px] text-red-600 mt-1">{errors.model}</p>}
                </div>

                {/* Model Year */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Model Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => {
                      setYear(e.target.value);
                      if (errors.year) setErrors({ ...errors, year: '' });
                    }}
                    placeholder="e.g. 2019, 2021"
                    className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                      errors.year ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                    } rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all`}
                  />
                  {errors.year && <p className="text-[11px] text-red-600 mt-1">{errors.year}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {/* Engine Code / Size */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Engine Size or Code <span className="text-zinc-400 font-normal">(If known)</span>
                  </label>
                  <input
                    type="text"
                    value={engineCode}
                    onChange={(e) => setEngineCode(e.target.value)}
                    placeholder="e.g. B58B30, M177, 3.0L Turbo"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all"
                  />
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Fuel Type
                  </label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Petrol / Gasoline">Petrol / Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid / Turbo-Petrol">Hybrid / Turbo-Petrol</option>
                  </select>
                </div>

                {/* Required Condition */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Required Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Any Suitable Condition">Any Suitable Condition</option>
                    <option value="Tested Low-Mileage Used">Tested Low-Mileage Used</option>
                    <option value="Reconditioned / Refurbished">Reconditioned / Refurbished</option>
                    <option value="New OEM Crate">New OEM Crate</option>
                  </select>
                </div>
              </div>

              {/* Additional details */}
              <div className="mb-6">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                  Additional Details / VIN / Target Destination
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Include vehicle VIN (chassis number), whether you need a bare long block or complete assembly with turbos, or your export destination port..."
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Disclaimer & Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-100">
                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#144b37]" />
                  <span>Manual engineering verification before order confirmation</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#144b37] hover:bg-[#0f3829] active:scale-[0.99] transition-all rounded-xs cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Find My Engine</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
