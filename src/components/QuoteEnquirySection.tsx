import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  UploadCloud, 
  ShieldCheck, 
  FileCheck, 
  X, 
  Sparkles,
  Phone,
  Mail,
  AlertCircle
} from 'lucide-react';
import { EngineItem, EngineEnquiryPayload } from '../types/engine';
import { gsap, useGSAP } from '../lib/gsap';

interface QuoteEnquirySectionProps {
  prefilledEngine: EngineItem | null;
  onClearPrefill: () => void;
}

export const QuoteEnquirySection: React.FC<QuoteEnquirySectionProps> = ({
  prefilledEngine,
  onClearPrefill,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<EngineEnquiryPayload>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    engineCode: '',
    displacement: '',
    condition: 'Tested Low-Mileage Used',
    shippingDestination: 'UAE (Local Delivery)',
    message: '',
    fileName: undefined,
  });

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedPayload, setSubmittedPayload] = useState<EngineEnquiryPayload | null>(null);

  // When an engine is selected from catalog, update form fields
  useEffect(() => {
    if (prefilledEngine) {
      setFormData((prev) => ({
        ...prev,
        vehicleMake: prefilledEngine.manufacturer,
        vehicleModel: prefilledEngine.vehicleCompatibility.split(',')[0] || '',
        vehicleYear: prefilledEngine.modelYears.split('–')[0].trim() || '',
        engineCode: prefilledEngine.engineCode,
        displacement: prefilledEngine.displacement,
        condition: prefilledEngine.condition,
        message: `Inquiring about catalogue listing: ${prefilledEngine.name} (${prefilledEngine.engineCode}). Please confirm stock availability and freight pricing.`,
      }));
    }
  }, [prefilledEngine]);

  useGSAP(
    () => {
      gsap.from('.enquiry-reveal', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 78%',
        },
      });
    },
    { scope: containerRef }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      setFormData((prev) => ({ ...prev, fileName: file.name }));
    }
  };

  const removeFile = () => {
    setSelectedFileName(null);
    setFormData((prev) => ({ ...prev, fileName: undefined }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone or WhatsApp number with country code is required';
    if (!formData.country.trim()) errs.country = 'Country of residence is required';
    if (!formData.vehicleMake.trim()) errs.vehicleMake = 'Vehicle make is required';
    if (!formData.vehicleModel.trim()) errs.vehicleModel = 'Vehicle model is required';
    if (!formData.vehicleYear.trim()) errs.vehicleYear = 'Vehicle year is required';

    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate clean dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedPayload({ ...formData });
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedPayload(null);
    onClearPrefill();
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      country: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      engineCode: '',
      displacement: '',
      condition: 'Tested Low-Mileage Used',
      shippingDestination: 'UAE (Local Delivery)',
      message: '',
      fileName: undefined,
    });
    setSelectedFileName(null);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-20 lg:py-28 bg-[#fafaf9] border-b border-zinc-200/90 relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="enquiry-reveal inline-flex items-center gap-2 px-3 py-1 bg-zinc-200/80 border border-zinc-300 rounded-xs text-[11px] font-mono uppercase tracking-widest text-zinc-700 font-semibold mb-4">
            <Mail className="w-3.5 h-3.5 text-[#144b37]" />
            <span>COMMERCIAL ENQUIRY DESK</span>
          </div>

          <h2 className="enquiry-reveal text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111215] tracking-tight leading-tight mb-4">
            Tell Us Which Engine You Need.
          </h2>

          <p className="enquiry-reveal text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            Provide your vehicle details and engine requirements so our team can understand your enquiry.
          </p>
        </div>

        {/* Selected Engine Banner if pre-filled */}
        {prefilledEngine && !isSubmitted && (
          <div className="mb-6 p-4 rounded-xs bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <div className="text-xs">
                <span className="font-semibold text-emerald-950">Pre-selected Engine:</span>{' '}
                <span className="text-emerald-900 font-mono font-medium">{prefilledEngine.name}</span>{' '}
                <span className="text-emerald-700 font-mono">({prefilledEngine.engineCode})</span>
              </div>
            </div>
            <button
              onClick={onClearPrefill}
              className="text-xs text-emerald-800 hover:text-black font-mono underline cursor-pointer"
            >
              Clear Selection
            </button>
          </div>
        )}

        {/* Form Container */}
        <div className="enquiry-reveal bg-white border border-zinc-200 rounded-xs shadow-xs p-6 sm:p-10">
          {isSubmitted && submittedPayload ? (
            <div className="py-6 text-center">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-[#144b37] mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-heading font-bold text-zinc-900 mb-2">
                Enquiry Successfully Logged
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 max-w-lg mx-auto mb-8 leading-relaxed">
                Thank you, <strong className="text-zinc-900">{submittedPayload.fullName}</strong>. Your engine enquiry for the{' '}
                <strong className="text-zinc-900">
                  {submittedPayload.vehicleYear} {submittedPayload.vehicleMake} {submittedPayload.vehicleModel}
                </strong>{' '}
                has been recorded in the UAE consultation system.
              </p>

              {/* Receipt / Demo Inspection block */}
              <div className="max-w-xl mx-auto bg-zinc-50 border border-zinc-200 rounded-xs p-5 text-left text-xs font-mono space-y-2 mb-8">
                <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  // ENQUIRY DOSSIER SUMMARY
                </div>
                <div className="text-zinc-700">Client: {submittedPayload.fullName} ({submittedPayload.email})</div>
                <div className="text-zinc-700">Phone / WhatsApp: {submittedPayload.phone} ({submittedPayload.country})</div>
                <div className="text-zinc-700">Vehicle: {submittedPayload.vehicleYear} {submittedPayload.vehicleMake} {submittedPayload.vehicleModel}</div>
                <div className="text-zinc-700">Engine Code: {submittedPayload.engineCode || 'N/A (Pending Identification)'}</div>
                <div className="text-zinc-700">Condition Requirement: {submittedPayload.condition}</div>
                <div className="text-zinc-700">Destination: {submittedPayload.shippingDestination}</div>
                {submittedPayload.fileName && (
                  <div className="text-zinc-700">Attachment: {submittedPayload.fileName}</div>
                )}
                <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-200">
                  * System Status: Front-End Demonstration. In live production, this payload dispatches to your UAE CRM, WhatsApp Business API, or sales inbox.
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#144b37] hover:bg-[#0f3829] rounded-xs transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Section 1: Contact Details */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-4 pb-2 border-b border-zinc-100">
                  01 // Client Contact Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Tariq Al-Mansoor / John Miller"
                      className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                        errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                      } rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. name@company.com"
                      className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                        errors.email ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                      } rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all`}
                    />
                    {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                      Phone / WhatsApp (with Country Code) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +971 50 123 4567 or +44 7123 456789"
                      className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                        errors.phone ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                      } rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                      Country of Residence <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="e.g. United Arab Emirates, Saudi Arabia, United Kingdom"
                      className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                        errors.country ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                      } rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all`}
                    />
                    {errors.country && <p className="text-[11px] text-red-600 mt-1">{errors.country}</p>}
                  </div>
                </div>
              </div>

              {/* Section 2: Vehicle & Engine Specifications */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-4 pb-2 border-b border-zinc-100">
                  02 // Vehicle & Engine Specifications
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                      Vehicle Make <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={handleInputChange}
                      placeholder="e.g. BMW, Toyota, Porsche"
                      className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                        errors.vehicleMake ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                      } rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all`}
                    />
                    {errors.vehicleMake && <p className="text-[11px] text-red-600 mt-1">{errors.vehicleMake}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                      Vehicle Model <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleInputChange}
                      placeholder="e.g. 540i, Supra, 911 GT3"
                      className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                        errors.vehicleModel ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                      } rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all`}
                    />
                    {errors.vehicleModel && <p className="text-[11px] text-red-600 mt-1">{errors.vehicleModel}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                      Vehicle Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={handleInputChange}
                      placeholder="e.g. 2018, 2022"
                      className={`w-full px-3.5 py-2.5 bg-zinc-50 border ${
                        errors.vehicleYear ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                      } rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all`}
                    />
                    {errors.vehicleYear && <p className="text-[11px] text-red-600 mt-1">{errors.vehicleYear}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                      Engine Code or Displacement
                    </label>
                    <input
                      type="text"
                      name="engineCode"
                      value={formData.engineCode}
                      onChange={handleInputChange}
                      placeholder="e.g. B58B30, 2JZ-GTE, 4.0L V8"
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                      Required Condition
                    </label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="Tested Low-Mileage Used">Tested Low-Mileage Used</option>
                      <option value="Reconditioned / Refurbished">Reconditioned / Refurbished</option>
                      <option value="New OEM Crate">New OEM Crate</option>
                      <option value="Any Compatible Option">Any Compatible Option</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                      Preferred Shipping Destination
                    </label>
                    <select
                      name="shippingDestination"
                      value={formData.shippingDestination}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="UAE (Local Delivery / Sharjah Yard)">UAE (Local Delivery / Yard Pickup)</option>
                      <option value="GCC - Saudi Arabia">GCC - Saudi Arabia</option>
                      <option value="GCC - Oman / Kuwait / Bahrain / Qatar">GCC - Other Gulf Countries</option>
                      <option value="Europe / United Kingdom">Europe / United Kingdom</option>
                      <option value="Africa / Middle East">Africa / Mediterranean</option>
                      <option value="North America (USA / Canada)">North America (USA / Canada)</option>
                      <option value="Other International Port">Other International Port</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Notes & Attachment */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-4 pb-2 border-b border-zinc-100">
                  03 // Additional Requirements & VIN / Engine Plate Photo
                </h4>

                <div className="mb-5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Additional Message & VIN Details
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter chassis number (VIN), engine accessories needed (e.g. bare long block vs full assembly with turbos/wiring), or specific garage delivery notes..."
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xs text-xs text-zinc-900 focus:outline-none focus:border-[#144b37] focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Optional Document Attachment */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold mb-2">
                    Optional Attachment (VIN Photo, Engine Plate, Registration)
                  </label>
                  <div className="border border-dashed border-zinc-300 rounded-xs p-4 bg-zinc-50 text-center hover:bg-zinc-100/60 transition-colors">
                    {selectedFileName ? (
                      <div className="flex items-center justify-between max-w-sm mx-auto p-2 bg-white border border-zinc-200 rounded-xs text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="truncate text-zinc-800 font-mono text-[11px]">{selectedFileName}</span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 text-zinc-400 hover:text-red-500 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <UploadCloud className="w-6 h-6 text-zinc-400 mx-auto mb-1.5" />
                        <span className="text-xs font-medium text-zinc-700 block">
                          Click to attach engine plate photo, registration card or spec sheet
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 block mt-0.5">
                          PDF, JPG, PNG up to 15MB
                        </span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button & Security Note */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-100">
                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                  <ShieldCheck className="w-4 h-4 text-[#144b37]" />
                  <span>Enquiries are handled directly by UAE technical engine sourcing staff</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-9 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#144b37] hover:bg-[#0f3829] active:scale-[0.99] transition-all rounded-xs cursor-pointer shadow-xs flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Processing Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Engine Enquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
