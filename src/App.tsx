import React, { useState } from 'react';
import { SmoothScrollProvider, useSmoothScroll } from './components/SmoothScrollProvider';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ContinuousMarquee } from './components/ContinuousMarquee';
import { EngineCatalog } from './components/EngineCatalog';
import { SignatureEditorial } from './components/SignatureEditorial';
import { CompatibilityFinder } from './components/CompatibilityFinder';
import { SourcingProcess } from './components/SourcingProcess';
import { ShippingSection } from './components/ShippingSection';
import { AboutSection } from './components/AboutSection';
import { QuoteEnquirySection } from './components/QuoteEnquirySection';
import { Footer } from './components/Footer';
import { EngineDetailsModal } from './components/EngineDetailsModal';
import { EngineItem } from './types/engine';

function MainWebsite() {
  const { scrollTo } = useSmoothScroll();
  const [prefilledEngine, setPrefilledEngine] = useState<EngineItem | null>(null);
  const [inspectingEngine, setInspectingEngine] = useState<EngineItem | null>(null);

  const handleSelectEngineForEnquiry = (engine: EngineItem) => {
    setPrefilledEngine(engine);
    scrollTo('#contact', { offset: -70, duration: 1.4 });
  };

  const handleOpenSearch = () => {
    scrollTo('#engine-range', { offset: -70, duration: 1.2 });
  };

  const handleRequestQuote = () => {
    scrollTo('#contact', { offset: -70, duration: 1.4 });
  };

  const handleExploreEngines = () => {
    scrollTo('#engine-range', { offset: -70, duration: 1.2 });
  };

  return (
    <div className="relative min-h-screen bg-[#fafaf9] text-[#121316] font-sans selection:bg-[#144b37] selection:text-white">
      {/* Slim Header & Navigation */}
      <Header
        onOpenSearch={handleOpenSearch}
        onRequestQuote={handleRequestQuote}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Cinematic Hero Section */}
        <Hero
          onExploreEngines={handleExploreEngines}
          onRequestQuote={handleRequestQuote}
        />

        {/* 2. Trust & Business Highlights */}
        <TrustStrip />

        {/* 3. Continuous Typography Marquee */}
        <ContinuousMarquee />

        {/* 4. Our Engine Range & Catalogue */}
        <EngineCatalog
          onSelectEngineForEnquiry={handleSelectEngineForEnquiry}
          onViewDetails={(engine) => setInspectingEngine(engine)}
        />

        {/* 5. Signature Editorial Section */}
        <SignatureEditorial
          onDiscussRequirements={handleRequestQuote}
        />

        {/* 6. Find The Right Engine (Vehicle Compatibility) */}
        <CompatibilityFinder
          onSuccessRedirect={handleRequestQuote}
        />

        {/* 7. Engine Sourcing Process */}
        <SourcingProcess />

        {/* 8. UAE Base & Global Shipping */}
        <ShippingSection
          onEnquireShipping={handleRequestQuote}
        />

        {/* 9. About The Company */}
        <AboutSection />

        {/* 10. Customer Enquiries & Quote Requests */}
        <QuoteEnquirySection
          prefilledEngine={prefilledEngine}
          onClearPrefill={() => setPrefilledEngine(null)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Engine Technical Details Modal */}
      <EngineDetailsModal
        engine={inspectingEngine}
        onClose={() => setInspectingEngine(null)}
        onEnquire={handleSelectEngineForEnquiry}
      />
    </div>
  );
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <MainWebsite />
    </SmoothScrollProvider>
  );
}
