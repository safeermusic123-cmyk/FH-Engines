import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle2, ShieldCheck, X, Mail, Phone, MessageSquare, MapPin } from 'lucide-react';
import { EngineItem } from '../types/engine';
import { gsap, useGSAP } from '../lib/gsap';
import contactBgImage from '../assets/images/Contactimage.png';

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
        message: `Inquiring about catalogue listing: ${prefilledEngine.name} (${prefilledEngine.engineCode}). Please confirm Sharjah stock availability and freight quote.`,
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

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (!form.vehicleMake.trim()) errs.vehicleMake = 'Vehicle make is required';
    if (!form.vehicleModel.trim()) errs.vehicleModel = 'Vehicle model is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData({ ...form });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
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
    onClearPrefill();
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-20 lg:py-28 relative border-b border-zinc-900 overflow-hidden bg-black"
    >
      {/* Background Image: Dark supercar with exposed engine & red racing stripe clearly visible */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={contactBgImage}
          alt="Contact background supercar engine"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle cinematic vignette that keeps the engine and red racing stripe vividly visible */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/80" />
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="enquiry-anim text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Request an Engine Quotation
          </h2>

          <p className="enquiry-anim text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-xl mx-auto">
            Provide your vehicle specification and target engine code so our Sharjah team can verify stock availability, compression data, and dispatch timelines.
          </p>

          {/* Quick Contact Chips */}
          <div className="enquiry-anim mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+971585188315"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-bold text-white transition-all shadow-md backdrop-blur-md"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>Call: +971 58 518 8315</span>
            </a>

            <a
              href="https://wa.me/971585188315"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition-all shadow-md backdrop-blur-md"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: +971 58 518 8315</span>
            </a>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-zinc-300 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Sharjah, UAE</span>
            </div>
          </div>
        </div>

        {/* Prefilled selection banner if active */}
        {prefilledEngine && !submittedData && (
          <div className="max-w-3xl mx-auto mb-8 p-4 bg-black/60 backdrop-blur-md border-2 border-[#a31414] rounded-xl shadow-xl flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 bg-[#a31414] rounded-full animate-ping" />
              <span className="font-bold uppercase tracking-wider text-zinc-300">Selected Engine:</span>
              <strong className="text-white text-sm font-bold">{prefilledEngine.name}</strong>
              <span className="text-red-300 font-mono">({prefilledEngine.engineCode})</span>
            </div>
            <button
              onClick={onClearPrefill}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
              title="Clear prefilled engine"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Transparent Theme Form Card */}
        <div className="enquiry-anim max-w-3xl mx-auto bg-black/55 backdrop-blur-xl border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl text-white">
          {submittedData ? (
            <div className="py-6 text-center">
              <div className="w-14 h-14 bg-red-900/40 border border-[#a31414] rounded-full flex items-center justify-center text-red-400 mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-heading font-extrabold text-white mb-2">
                Enquiry Received at FH Engine Desk
              </h3>

              <p className="text-sm text-zinc-300 max-w-md mx-auto mb-8 leading-relaxed">
                Thank you, <strong className="text-white">{submittedData.fullName}</strong>. Your enquiry for the{' '}
                <strong className="text-white">
                  {submittedData.vehicleYear} {submittedData.vehicleMake} {submittedData.vehicleModel}
                </strong>{' '}
                engine has been submitted. Our technical team in Sharjah will contact you shortly via WhatsApp or email.
              </p>

              {/* Receipt Dossier */}
              <div className="bg-white/5 border border-white/15 rounded-xl p-5 text-left text-xs space-y-2 mb-8 text-zinc-300">
                <div className="text-xs uppercase tracking-wider text-red-400 font-bold pb-2 border-b border-white/10">
                  Submitted Specification Details
                </div>
                <div>
                  <span className="text-zinc-400 font-medium">Customer:</span> {submittedData.fullName} ({submittedData.email})
                </div>
                <div>
                  <span className="text-zinc-400 font-medium">Phone / WhatsApp:</span> {submittedData.phone} ({submittedData.country || 'Not specified'})
                </div>
                <div>
                  <span className="text-zinc-400 font-medium">Vehicle:</span> {submittedData.vehicleYear} {submittedData.vehicleMake} {submittedData.vehicleModel}
                </div>
                <div>
                  <span className="text-zinc-400 font-medium">Engine Code:</span> {submittedData.engineCode || 'To be verified from VIN'}
                </div>
                <div>
                  <span className="text-zinc-400 font-medium">Condition Preference:</span> {submittedData.condition}
                </div>
                {submittedData.message && (
                  <div className="pt-1">
                    <span className="text-zinc-400 font-medium">Message:</span> {submittedData.message}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#a31414] hover:bg-[#881010] rounded-lg transition-colors cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
                <a
                  href="https://wa.me/971585188315"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/60 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct WhatsApp Follow-up</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-bold mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Tariq Al-Mansoor"
                    className={`w-full px-4 py-2.5 bg-white/10 border rounded-lg text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#a31414] focus:bg-black/50 transition-all ${
                      errors.fullName ? 'border-red-400 bg-red-950/30' : 'border-white/20'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-bold mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. contact@workshop.com"
                    className={`w-full px-4 py-2.5 bg-white/10 border rounded-lg text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#a31414] focus:bg-black/50 transition-all ${
                      errors.email ? 'border-red-400 bg-red-950/30' : 'border-white/20'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Row 2: Phone & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-bold mb-2">
                    Phone / WhatsApp Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. +971 58 518 8315"
                    className={`w-full px-4 py-2.5 bg-white/10 border rounded-lg text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#a31414] focus:bg-black/50 transition-all ${
                      errors.phone ? 'border-red-400 bg-red-950/30' : 'border-white/20'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.phone}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-bold mb-2">
                    Destination Country / City
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="e.g. Sharjah UAE, Saudi Arabia, UK..."
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#a31414] focus:bg-black/50 transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Make, Model, Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-bold mb-2">
                    Vehicle Make <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="vehicleMake"
                    value={form.vehicleMake}
                    onChange={handleChange}
                    placeholder="e.g. BMW, Mercedes, Toyota"
                    className={`w-full px-4 py-2.5 bg-white/10 border rounded-lg text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#a31414] focus:bg-black/50 transition-all ${
                      errors.vehicleMake ? 'border-red-400 bg-red-950/30' : 'border-white/20'
                    }`}
                  />
                  {errors.vehicleMake && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.vehicleMake}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-bold mb-2">
                    Vehicle Model <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="vehicleModel"
                    value={form.vehicleModel}
                    onChange={handleChange}
                    placeholder="e.g. 540i, G63, Land Cruiser"
                    className={`w-full px-4 py-2.5 bg-white/10 border rounded-lg text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#a31414] focus:bg-black/50 transition-all ${
                      errors.vehicleModel ? 'border-red-400 bg-red-950/30' : 'border-white/20'
                    }`}
                  />
                  {errors.vehicleModel && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.vehicleModel}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-bold mb-2">
                    Model Year
                  </label>
                  <input
                    type="text"
                    name="vehicleYear"
                    value={form.vehicleYear}
                    onChange={handleChange}
                    placeholder="e.g. 2019"
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#a31414] focus:bg-black/50 transition-all"
                  />
                </div>
              </div>

              {/* Row 4: Engine Code & Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-bold mb-2">
                    Engine Code (If Known)
                  </label>
                  <input
                    type="text"
                    name="engineCode"
                    value={form.engineCode}
                    onChange={handleChange}
                    placeholder="e.g. B58B30, M177, 2JZ-GTE, OM642"
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#a31414] focus:bg-black/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-300 font-bold mb-2">
                    Engine Condition Preference
                  </label>
                  <select
                    name="condition"
                    value={form.condition}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-zinc-900/90 border border-white/20 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#a31414] transition-all cursor-pointer"
                  >
                    <option value="Tested Low-Mileage Used" className="bg-zinc-900 text-white">Tested Low-Mileage Used</option>
                    <option value="Reconditioned / Refurbished" className="bg-zinc-900 text-white">Reconditioned / Refurbished</option>
                    <option value="New OEM Crate" className="bg-zinc-900 text-white">New OEM Crate</option>
                    <option value="Any Compatible Option" className="bg-zinc-900 text-white">Any Compatible Option</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Message & VIN */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-300 font-bold mb-2">
                  Additional Details & VIN Number (Optional)
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Provide your 17-character VIN number, delivery destination, or specific accessories needed..."
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#a31414] focus:bg-black/50 transition-all resize-none"
                />
              </div>

              {/* Submit & Disclaimer */}
              <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-red-400" />
                  <span>Physical block codes checked before shipment</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#a31414] hover:bg-[#881010] active:scale-[0.99] transition-all rounded-lg cursor-pointer shadow-lg shadow-red-950/60 flex items-center justify-center gap-2"
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
