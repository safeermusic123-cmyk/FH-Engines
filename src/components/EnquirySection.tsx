import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle2, ShieldCheck, X, Mail } from 'lucide-react';
import { EngineItem } from '../types/engine';
import { gsap, useGSAP } from '../lib/gsap';

interface EnquirySectionProps {
  prefilledEngine: EngineItem | null;
  onClearPrefill: () => void;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({
  prefilledEngine,
  onClearPrefill,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    engineCode: '',
    condition: 'Tested Low-Mileage Used',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<typeof form | null>(null);

  useEffect(() => {
    if (prefilledEngine) {
      setForm((prev) => ({
        ...prev,
        vehicleMake: prefilledEngine.manufacturer,
        vehicleModel: prefilledEngine.vehicleCompatibility.split(',')[0] || '',
        vehicleYear: prefilledEngine.modelYears.split('–')[0].trim() || '',
        engineCode: prefilledEngine.engineCode,
        condition: prefilledEngine.condition,
        message: `Inquiring about catalogue listing: ${prefilledEngine.name} (${prefilledEngine.engineCode}). Please confirm stock availability and freight pricing.`,
      }));
    }
  }, [prefilledEngine]);

  useGSAP(
    () => {
      gsap.from('.enquiry-anim', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: containerRef }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Valid email is required';
    }
    if (!form.phone.trim()) errs.phone = 'Phone or WhatsApp number is required';
    if (!form.country.trim()) errs.country = 'Country is required';
    if (!form.vehicleMake.trim()) errs.vehicleMake = 'Make is required';
    if (!form.vehicleModel.trim()) errs.vehicleModel = 'Model is required';
    if (!form.vehicleYear.trim()) errs.vehicleYear = 'Year is required';

    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmittedData({ ...form });
  };

  const handleReset = () => {
    setSubmittedData(null);
    onClearPrefill();
    setForm({
      fullName: '',
      email: '',
      phone: '',
      country: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      engineCode: '',
      condition: 'Tested Low-Mileage Used',
      message: '',
    });
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-20 lg:py-28 bg-[#f8fafc] border-b border-zinc-200 relative"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto mb-14 text-center">
          <div className="enquiry-anim inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#a31414] font-semibold mb-3">
            <Mail className="w-3.5 h-3.5 text-[#a31414]" />
            <span>COMMERCIAL ENQUIRY DESK</span>
          </div>

          <h2 className="enquiry-anim text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
            Tell Us Which Engine You Need.
          </h2>

          <p className="enquiry-anim text-sm sm:text-base text-zinc-600 font-normal leading-relaxed max-w-xl mx-auto">
            Provide your vehicle details and engine requirements so our team can review availability and confirm technical compatibility.
          </p>
        </div>

        {/* Prefilled selection banner if active */}
        {prefilledEngine && !submittedData && (
          <div className="max-w-3xl mx-auto mb-8 p-4 bg-white border border-[#a31414] rounded-md shadow-2xs flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-900">
              <span className="w-2 h-2 bg-[#a31414] rounded-full" />
              <span>PRE-SELECTED SPECIFICATION:</span>
              <strong className="text-[#a31414]">{prefilledEngine.name}</strong>
              <span className="text-zinc-500">({prefilledEngine.engineCode})</span>
            </div>
            <button
              onClick={onClearPrefill}
              className="text-zinc-500 hover:text-red-600 transition-colors cursor-pointer"
              title="Clear pre-filled engine"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Form Card */}
        <div className="enquiry-anim max-w-3xl mx-auto bg-white border border-zinc-200 rounded-lg p-6 sm:p-10 shadow-xs">
          {submittedData ? (
            <div className="py-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-[#a31414] mx-auto mb-5">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-heading font-extrabold text-[#0f172a] mb-2">
                Enquiry Logged For Review
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto mb-8 leading-relaxed">
                Thank you, <strong className="text-zinc-900">{submittedData.fullName}</strong>. Your parameters for the{' '}
                <strong className="text-zinc-900">
                  {submittedData.vehicleYear} {submittedData.vehicleMake} {submittedData.vehicleModel}
                </strong>{' '}
                have been logged in the specification queue.
              </p>

              {/* Receipt Dossier */}
              <div className="bg-[#f8fafc] border border-zinc-200 rounded-md p-5 text-left text-xs font-mono space-y-2 mb-8">
                <div className="text-[10px] uppercase tracking-widest text-[#a31414] font-bold">
                  // INTAKE SUMMARY (DEMONSTRATION STATE)
                </div>
                <div className="text-zinc-800">Client: {submittedData.fullName} ({submittedData.email})</div>
                <div className="text-zinc-800">Phone / WhatsApp: {submittedData.phone} ({submittedData.country})</div>
                <div className="text-zinc-800">Vehicle: {submittedData.vehicleYear} {submittedData.vehicleMake} {submittedData.vehicleModel}</div>
                <div className="text-zinc-800">Engine Code: {submittedData.engineCode || 'Unspecified (To be verified via VIN)'}</div>
                <div className="text-zinc-800">Condition Preference: {submittedData.condition}</div>
                <div className="pt-2 text-[10px] text-zinc-400 border-t border-zinc-200">
                  * Production Note: In live deployment, this form dispatches directly to the Dubai engine desk CRM / WhatsApp API.
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#a31414] hover:bg-[#881010] rounded-md transition-colors cursor-pointer"
              >
                Submit Another Specification
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Row 1: Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Full Name <span className="text-[#a31414]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Sultan Al-Qasimi / Mark Evans"
                    className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                      errors.fullName ? 'border-red-400' : 'border-zinc-200'
                    } rounded-md text-xs text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all`}
                  />
                  {errors.fullName && <p className="text-[10px] font-mono text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Email Address <span className="text-[#a31414]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. name@company.com"
                    className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                      errors.email ? 'border-red-400' : 'border-zinc-200'
                    } rounded-md text-xs text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all`}
                  />
                  {errors.email && <p className="text-[10px] font-mono text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Row 2: Phone & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Phone / WhatsApp (with Country Code) <span className="text-[#a31414]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. +971 50 000 0000"
                    className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                      errors.phone ? 'border-red-400' : 'border-zinc-200'
                    } rounded-md text-xs text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all`}
                  />
                  {errors.phone && <p className="text-[10px] font-mono text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Country of Residence <span className="text-[#a31414]">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="e.g. United Arab Emirates, Saudi Arabia, UK"
                    className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                      errors.country ? 'border-red-400' : 'border-zinc-200'
                    } rounded-md text-xs text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all`}
                  />
                  {errors.country && <p className="text-[10px] font-mono text-red-600 mt-1">{errors.country}</p>}
                </div>
              </div>

              {/* Row 3: Vehicle Make, Model, Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Vehicle Make <span className="text-[#a31414]">*</span>
                  </label>
                  <input
                    type="text"
                    name="vehicleMake"
                    value={form.vehicleMake}
                    onChange={handleChange}
                    placeholder="e.g. BMW, Toyota, Porsche"
                    className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                      errors.vehicleMake ? 'border-red-400' : 'border-zinc-200'
                    } rounded-md text-xs text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all`}
                  />
                  {errors.vehicleMake && <p className="text-[10px] font-mono text-red-600 mt-1">{errors.vehicleMake}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Vehicle Model <span className="text-[#a31414]">*</span>
                  </label>
                  <input
                    type="text"
                    name="vehicleModel"
                    value={form.vehicleModel}
                    onChange={handleChange}
                    placeholder="e.g. 540i, Supra, 911 GT3"
                    className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                      errors.vehicleModel ? 'border-red-400' : 'border-zinc-200'
                    } rounded-md text-xs text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all`}
                  />
                  {errors.vehicleModel && <p className="text-[10px] font-mono text-red-600 mt-1">{errors.vehicleModel}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Model Year <span className="text-[#a31414]">*</span>
                  </label>
                  <input
                    type="text"
                    name="vehicleYear"
                    value={form.vehicleYear}
                    onChange={handleChange}
                    placeholder="e.g. 2018, 2022"
                    className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                      errors.vehicleYear ? 'border-red-400' : 'border-zinc-200'
                    } rounded-md text-xs text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all`}
                  />
                  {errors.vehicleYear && <p className="text-[10px] font-mono text-red-600 mt-1">{errors.vehicleYear}</p>}
                </div>
              </div>

              {/* Row 4: Engine Code & Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Engine Code or Size <span className="text-zinc-400 font-normal">(If known)</span>
                  </label>
                  <input
                    type="text"
                    name="engineCode"
                    value={form.engineCode}
                    onChange={handleChange}
                    placeholder="e.g. B58B30, M177, 2JZ-GTE, 4.0L"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Engine Condition Preference
                  </label>
                  <select
                    name="condition"
                    value={form.condition}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Tested Low-Mileage Used">Tested Low-Mileage Used</option>
                    <option value="Reconditioned / Refurbished">Reconditioned / Refurbished</option>
                    <option value="New OEM Crate">New OEM Crate</option>
                    <option value="Any Compatible Option">Any Compatible Option</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Message */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                  Additional Details & VIN Number
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Include vehicle 17-character VIN, target destination, or required accessories..."
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Submit & Disclaimer */}
              <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <ShieldCheck className="w-4 h-4 text-[#a31414]" />
                  <span>Cross-checked against manufacturer casting manifests</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#a31414] hover:bg-[#881010] active:scale-[0.99] transition-all rounded-md cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Submit Engine Enquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
