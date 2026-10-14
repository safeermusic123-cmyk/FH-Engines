import React, { useState } from 'react';
import { SmoothScrollProvider, useSmoothScroll } from './components/SmoothScrollProvider';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ContinuousMarquee } from './components/ContinuousMarquee';
import { EngineCatalog } from './components/EngineCatalog';
import { AboutSection } from './components/AboutSection';
import { EnquirySection } from './components/EnquirySection';
import { Footer } from './components/Footer';
import { EngineDetailsModal } from './components/EngineDetailsModal';
import { EngineItem } from './types/engine';

function MainWebsite() {
  const { scrollTo } = useSmoothScroll();
  const [prefilledEngine, setPrefilledEngine] = useState<EngineItem | null>(null);
  const [inspectingEngine, setInspectingEngine] = useState<EngineItem | null>(null);

  const handleSelectEngineForEnquiry = (engine: EngineItem) => {
    setPrefilledEngine(engine);
    scrollTo('#contact', { offset: -70, duration: 1.2 });
  };

  const handleRequestQuote = () => {
    scrollTo('#contact', { offset: -70, duration: 1.2 });
  };

  const handleExploreEngines = () => {
    scrollTo('#engine-catalog', { offset: -70, duration: 1.1 });
  };

  return (
    <div className="relative min-h-screen bg-white text-[#0f172a] font-sans selection:bg-[#a31414] selection:text-white">
      {/* Top Navigation Bar */}
      <Header
        onRequestQuote={handleRequestQuote}
        onExploreEngines={handleExploreEngines}
      />

      {/* Main Flow */}
      <main>
        {/* 1. Exact Hero Section (Dubai showroom, Burj Khalifa view, engine on right) */}
        <Hero
          onExploreEngines={handleExploreEngines}
          onRequestQuote={handleRequestQuote}
        />

        {/* 2. Seamless Typography Ticker */}
        <ContinuousMarquee />

        {/* 3. Filterable Engine Catalogue (Easily filter by brand, condition, fuel, search) */}
        <EngineCatalog
          onSelectEngineForEnquiry={handleSelectEngineForEnquiry}
          onViewDetails={(engine) => setInspectingEngine(engine)}
        />

        {/* 4. About The Company (Dubai Engine Supply) */}
        <AboutSection />

        {/* 5. Customer Enquiries & Quote Requests Form */}
        <EnquirySection
          prefilledEngine={prefilledEngine}
          onClearPrefill={() => setPrefilledEngine(null)}
        />
      </main>

      {/* 6. Footer (Synchronized with top bar AE branding, red accents, Dubai contact) */}
      <Footer />

      {/* Engine Technical Specifications Sheet Modal */}
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
