import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail, 
  Send, 
  FileText, 
  Truck, 
  Gauge, 
  Share2, 
  Check, 
  Sparkles,
  Calendar,
  Fuel,
  Cpu,
  Layers,
  Wrench,
  PackageCheck
} from 'lucide-react';
import { EngineItem } from '../types/engine';
import { ENGINE_CATALOG } from '../data/engineCatalog';

interface EngineDetailsPageProps {
  engine: EngineItem;
  onBack: () => void;
  onNavigateToEngine: (engine: EngineItem) => void;
  onExploreCatalog: () => void;
}

export const EngineDetailsPage: React.FC<EngineDetailsPageProps> = ({
  engine,
  onBack,
  onNavigateToEngine,
  onExploreCatalog,
}) => {
  const quoteFormRef = useRef<HTMLDivElement>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Enquiry form state
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    vehicleVin: '',
    vehicleYear: engine.modelYears.split('–')[0].trim() || '',
    transmission: 'Automatic',
    message: `Inquiring about stock and shipping quotation for ${engine.name} (${engine.engineCode}). Ready to purchase subject to compression report and freight rate.`,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<typeof form | null>(null);

  // Scroll to top when engine changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSubmittedData(null);
    setForm((prev) => ({
      ...prev,
      vehicleYear: engine.modelYears.split('–')[0].trim() || '',
      message: `Inquiring about stock and shipping quotation for ${engine.name} (${engine.engineCode}). Ready to purchase subject to compression report and freight rate.`,
    }));
  }, [engine]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const scrollToQuote = () => {
    if (quoteFormRef.current) {
      quoteFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email is required';
    if (!form.phone.trim()) errs.phone = 'Phone / WhatsApp is required';
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

  // Find 3 alternative/related engines (excluding current)
  const relatedEngines = ENGINE_CATALOG
    .filter((item) => item.id !== engine.id)
    .slice(0, 3);

  // WhatsApp pre-filled text
  const whatsappMessage = encodeURIComponent(
    `Hello FH Engine Sharjah, I am interested in ordering the ${engine.name} (Code: ${engine.engineCode}, Condition: ${engine.condition}). Please send compression test photos and shipping quote.`
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] pt-24 sm:pt-28 pb-20">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Back button and breadcrumbs */}
            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <span className="text-zinc-300">/</span>

              <button
                onClick={onExploreCatalog}
                className="text-zinc-500 hover:text-[#a31414] font-medium transition-colors cursor-pointer hidden sm:inline"
              >
                Engine Inventory
              </button>

              <span className="text-zinc-300 hidden sm:inline">/</span>

              <span className="text-zinc-500 font-medium hidden md:inline">
                {engine.manufacturer}
              </span>

              <span className="text-zinc-300 hidden md:inline">/</span>

              <span className="text-[#a31414] font-bold truncate max-w-[200px] sm:max-w-[320px]">
                {engine.engineCode}
              </span>
            </div>

            {/* Live Status & Share */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>In Stock · Sharjah Hub</span>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-700 transition-colors cursor-pointer"
                title="Share engine sheet"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 mt-8 sm:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column (7 cols): Visuals, Technical Specs, Inclusions, Fitment */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Engine Main Photo Card */}
            <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden">
                <img
                  src={engine.imageUrl}
                  alt={engine.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-[1.03]"
                />
                
                {/* Physical Verified Stamped Pill */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 bg-[#0f172a]/90 backdrop-blur-md text-white text-xs font-bold rounded-lg border border-zinc-700">
                  <ShieldCheck className="w-4 h-4 text-[#a31414]" />
                  <span>Physical Block Stamped: {engine.engineCode}</span>
                </div>

                <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-md text-zinc-900 text-xs font-bold rounded-lg shadow-sm border border-zinc-200">
                  <MapPin className="w-3.5 h-3.5 text-[#a31414]" />
                  <span>Crated in Sharjah Industrial Area, UAE</span>
                </div>
              </div>

              {/* Photo Highlights Bar */}
              <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified 4-cylinder/6-cylinder/8-cylinder compression logs included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#a31414] shrink-0" />
                  <span>Worldwide ISPM-15 export crating</span>
                </div>
              </div>
            </div>

            {/* Comprehensive Technical Specification Table */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#a31414] block">
                    Engineering Data Sheet
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#0f172a] mt-0.5">
                    Technical Specifications
                  </h3>
                </div>
                <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-bold rounded-md uppercase tracking-wider">
                  OEM Spec
                </span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl">
                  <span className="text-zinc-500 uppercase font-bold text-[11px] block">
                    Engine Code
                  </span>
                  <strong className="text-[#a31414] font-extrabold text-base block mt-0.5">
                    {engine.engineCode}
                  </strong>
                </div>

                <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl">
                  <span className="text-zinc-500 uppercase font-bold text-[11px] block">
                    Manufacturer / Brand
                  </span>
                  <strong className="text-zinc-900 font-extrabold text-base block mt-0.5">
                    {engine.manufacturer}
                  </strong>
                </div>

                <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl">
                  <span className="text-zinc-500 uppercase font-bold text-[11px] block">
                    Displacement
                  </span>
                  <strong className="text-zinc-900 font-bold block mt-0.5">
                    {engine.displacement}
                  </strong>
                </div>

                <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl">
                  <span className="text-zinc-500 uppercase font-bold text-[11px] block">
                    Configuration & Valvetrain
                  </span>
                  <strong className="text-zinc-900 font-bold block mt-0.5">
                    {engine.configuration}
                  </strong>
                </div>

                <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl">
                  <span className="text-zinc-500 uppercase font-bold text-[11px] block">
                    Fuel Type & Induction
                  </span>
                  <strong className="text-zinc-900 font-bold block mt-0.5">
                    {engine.fuelType}
                  </strong>
                </div>

                <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl">
                  <span className="text-zinc-500 uppercase font-bold text-[11px] block">
                    Aspiration
                  </span>
                  <strong className="text-zinc-900 font-bold block mt-0.5">
                    {engine.aspiration}
                  </strong>
                </div>

                <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl">
                  <span className="text-zinc-500 uppercase font-bold text-[11px] block">
                    Power Baseline Rating
                  </span>
                  <strong className="text-zinc-900 font-bold block mt-0.5">
                    {engine.powerOutputGuide || 'Standard OEM Factory Output'}
                  </strong>
                </div>

                <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl">
                  <span className="text-zinc-500 uppercase font-bold text-[11px] block">
                    Compression Ratio
                  </span>
                  <strong className="text-zinc-900 font-bold block mt-0.5">
                    {engine.compressionRatio || 'OEM Calibrated'}
                  </strong>
                </div>

                <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl">
                  <span className="text-zinc-500 uppercase font-bold text-[11px] block">
                    Active Production Years
                  </span>
                  <strong className="text-zinc-900 font-bold block mt-0.5">
                    {engine.modelYears}
                  </strong>
                </div>

                <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl">
                  <span className="text-zinc-500 uppercase font-bold text-[11px] block">
                    Inventory Origin
                  </span>
                  <strong className="text-zinc-900 font-bold block mt-0.5">
                    {engine.originHub}
                  </strong>
                </div>
              </div>
            </div>

            {/* Scope of Delivery / Assembly Inclusions */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#a31414]">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#a31414] block">
                    Assembly Details
                  </span>
                  <h3 className="text-lg sm:text-xl font-heading font-extrabold text-[#0f172a]">
                    Verified Assembly Scope & Inclusions
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                {engine.specsSummary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-zinc-800">Complete cylinder block & tested cylinder head</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-zinc-800">Turbocharger / supercharger unit (if equipped)</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-zinc-800">Intake manifold & throttle body assembly</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-zinc-800">Fuel injectors, high-pressure pump & fuel rail</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-zinc-800">Alternator, water pump & engine wire harness</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-zinc-800">Physical factory engine stamp number matched</span>
                </div>
              </div>
            </div>

            {/* Fitment & Compatibility Guide */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg sm:text-xl font-heading font-extrabold text-[#0f172a] mb-2">
                Vehicle Compatibility & Fitment Notes
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mb-4">
                Compatible with standard factory engine bays across the following production vehicle series:
              </p>

              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl mb-4">
                <div className="text-xs uppercase font-bold text-[#a31414] tracking-wider mb-1">
                  Target Vehicles
                </div>
                <div className="text-sm sm:text-base font-extrabold text-zinc-900">
                  {engine.vehicleCompatibility}
                </div>
                <div className="text-xs text-zinc-500 mt-2">
                  Production Year Range: <strong>{engine.modelYears}</strong>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Need exact compatibility confirmation?</strong> Submit your vehicle's 17-character VIN number in the enquiry form or message our Sharjah technical team on WhatsApp. We verify ECU variant, oil sump pattern, and bellhousing alignment before dispatch.
                </span>
              </div>
            </div>

            {/* Quality Testing Protocol */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg sm:text-xl font-heading font-extrabold text-[#0f172a] mb-4">
                Sharjah 4-Point Inspection & Crating Standards
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-zinc-700">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#a31414] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-zinc-900 block font-bold">Dynamic Cylinder Compression & Leak-Down Verification</strong>
                    <span className="text-zinc-600">Every cylinder is gauge-tested. PSI values must meet OEM thresholds with less than 5% cylinder variance.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#a31414] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-zinc-900 block font-bold">Endoscope Internal Cylinder Bore Examination</strong>
                    <span className="text-zinc-600">High-definition borescope inspection checks cylinder liners for zero scoring, carbon build-up, or valve contact.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#a31414] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-zinc-900 block font-bold">Crankshaft 360° Rotation & Sump Visual Inspection</strong>
                    <span className="text-zinc-600">Manual rotation verifies free-spinning bearing clearances, valve timing alignment, and no metal particulate in the oil pan.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#a31414] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="text-zinc-900 block font-bold">Fumigated Export Crating (ISPM-15) & VCI Vapour Barrier</strong>
                    <span className="text-zinc-600">Each engine is secured inside a heavy-duty wooden crate lined with vapor-corrosion inhibiting barrier for global air/sea transit.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Sticky Pricing, Quick Order & Quotation Form */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Sticky Pricing & Dispatch Card */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-7 shadow-sm sticky top-28">
              
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 bg-red-50 text-[#a31414] border border-red-200 font-extrabold text-xs rounded-md tracking-wider">
                  CODE: {engine.engineCode}
                </span>
                <span className="px-3 py-1 bg-zinc-900 text-white font-bold text-xs rounded-md uppercase tracking-wider">
                  {engine.condition}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0f172a] leading-tight mb-2">
                {engine.name}
              </h1>

              <p className="text-xs text-zinc-500 mb-6">
                Verified genuine powerplant sourced and tested at FH Engine, Sharjah Industrial Area 4, UAE.
              </p>

              {/* Price Banner */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
                      Price Guide (Ex-Sharjah / Export)
                    </span>
                    <span className="text-xl sm:text-2xl font-heading font-extrabold text-[#a31414] block mt-0.5">
                      {engine.guidePrice}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-zinc-500 mt-2 pt-2 border-t border-zinc-200/80">
                  * Final landed quotation includes crating, customs documentation, and optional door-to-door air or ocean freight.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={scrollToQuote}
                  className="w-full py-3.5 px-5 bg-[#a31414] hover:bg-[#881010] active:scale-[0.98] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Request Written Quotation</span>
                </button>

                <a
                  href={`https://wa.me/971585188315?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp (+971 58 518 8315)</span>
                </a>

                <a
                  href="tel:+971585188315"
                  className="w-full py-3 px-5 bg-zinc-100 hover:bg-zinc-200 active:scale-[0.98] text-zinc-800 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#a31414]" />
                  <span>Direct Sharjah Call</span>
                </a>
              </div>

              {/* Guarantees */}
              <div className="space-y-2 pt-4 border-t border-zinc-100 text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Physical engine photos & video test provided before packing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Export paperwork & commercial invoice processed same day</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Air freight dispatch via Dubai (DXB) / Sharjah (SHJ) Cargo</span>
                </div>
              </div>
            </div>

            {/* Direct Quotation Form Card */}
            <div
              ref={quoteFormRef}
              id="request-quote"
              className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-7 shadow-xs"
            >
              <div className="mb-5 pb-4 border-b border-zinc-100">
                <span className="text-xs uppercase font-bold text-[#a31414] tracking-wider block">
                  Rapid RFQ Form
                </span>
                <h3 className="text-lg font-heading font-extrabold text-[#0f172a] mt-0.5">
                  Request Crated Freight Quote
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Fill in your delivery country and vehicle details for an official quote on <strong>{engine.engineCode}</strong>.
                </p>
              </div>

              {submittedData ? (
                <div className="py-6 text-center">
                  <div className="w-12 h-12 bg-red-50 text-[#a31414] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0f172a] mb-1">
                    Quotation Request Logged!
                  </h4>
                  <p className="text-xs text-zinc-600 max-w-sm mx-auto mb-4 leading-relaxed">
                    Thank you, <strong className="text-zinc-900">{submittedData.fullName}</strong>. Our logistics desk will calculate crating and shipping rates for your <strong>{engine.name}</strong> to <strong>{submittedData.country || 'your destination'}</strong>.
                  </p>
                  <a
                    href={`https://wa.me/971585188315?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                  >
                    <span>Follow Up on WhatsApp Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-zinc-700 mb-1">
                      Full Name <span className="text-[#a31414]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Tariq Al-Mansoor"
                      className={`w-full px-3.5 py-2 bg-zinc-50 border rounded-lg text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white ${
                        errors.fullName ? 'border-red-400' : 'border-zinc-200'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-red-500 mt-0.5 block">{errors.fullName}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase font-bold text-zinc-700 mb-1">
                        Email Address <span className="text-[#a31414]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={`w-full px-3.5 py-2 bg-zinc-50 border rounded-lg text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white ${
                          errors.email ? 'border-red-400' : 'border-zinc-200'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-red-500 mt-0.5 block">{errors.email}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-zinc-700 mb-1">
                        Phone / WhatsApp <span className="text-[#a31414]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+971 58 518 8315"
                        className={`w-full px-3.5 py-2 bg-zinc-50 border rounded-lg text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white ${
                          errors.phone ? 'border-red-400' : 'border-zinc-200'
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-red-500 mt-0.5 block">{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase font-bold text-zinc-700 mb-1">
                        Destination Country / City
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        placeholder="e.g. UAE, Saudi Arabia, UK..."
                        className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-zinc-700 mb-1">
                        Vehicle VIN Code (17 digits)
                      </label>
                      <input
                        type="text"
                        name="vehicleVin"
                        value={form.vehicleVin}
                        onChange={handleChange}
                        placeholder="Optional for exact match"
                        className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white uppercase font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-zinc-700 mb-1">
                      Transmission & Installation Preference
                    </label>
                    <select
                      name="transmission"
                      value={form.transmission}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white cursor-pointer"
                    >
                      <option value="Automatic">Automatic Transmission Vehicle</option>
                      <option value="Manual">Manual Transmission Vehicle</option>
                      <option value="Dual Clutch / DCT">Dual-Clutch / DCT / PDK</option>
                      <option value="Project Swap">Custom / Project Car Swap</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-zinc-700 mb-1">
                      Notes / Questions
                    </label>
                    <textarea
                      rows={3}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-[#a31414] focus:bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-5 bg-[#a31414] hover:bg-[#881010] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Submit Quotation Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Alternative Engine Suggestions Section */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#a31414] block">
                Related Stock
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0f172a]">
                Other Engines in Sharjah Warehouse
              </h3>
            </div>

            <button
              onClick={onExploreCatalog}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a31414] hover:text-[#881010] transition-colors cursor-pointer"
            >
              <span>Explore All Engines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedEngines.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 text-xs font-bold text-white bg-[#a31414] rounded">
                        {item.engineCode}
                      </span>
                      <span className="text-[11px] font-semibold text-zinc-500">
                        {item.manufacturer}
                      </span>
                    </div>

                    <h4 className="text-base font-heading font-extrabold text-[#0f172a] line-clamp-1 mb-1">
                      {item.name}
                    </h4>

                    <p className="text-xs text-zinc-600 line-clamp-1 mb-3">
                      {item.vehicleCompatibility}
                    </p>

                    <div className="text-xs font-extrabold text-[#0f172a]">
                      {item.guidePrice}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onNavigateToEngine(item)}
                    className="w-full py-2.5 px-3 bg-[#0f172a] hover:bg-[#a31414] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
