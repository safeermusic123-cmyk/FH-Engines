import React, { useState, useEffect } from 'react';
import { SmoothScrollProvider, useSmoothScroll } from './components/SmoothScrollProvider';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ContinuousMarquee } from './components/ContinuousMarquee';
import { RecentArrivalsSection } from './components/RecentArrivalsSection';
import { EngineCatalog } from './components/EngineCatalog';
import { AboutSection } from './components/AboutSection';
import { EnquirySection } from './components/EnquirySection';
import { Footer } from './components/Footer';
import { EngineDetailsPage } from './components/EngineDetailsPage';
import { EngineItem } from './types/engine';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

function MainWebsite() {
  const { scrollTo } = useSmoothScroll();
  const [currentPage, setCurrentPage] = useState<'home' | 'engines' | 'engine-details'>('home');
  const [activeTab, setActiveTab] = useState<'Home' | 'Engines' | 'About' | 'Contact'>('Home');
  const [prefilledEngine, setPrefilledEngine] = useState<EngineItem | null>(null);
  const [selectedEngine, setSelectedEngine] = useState<EngineItem | null>(null);
  const [previousPage, setPreviousPage] = useState<'home' | 'engines'>('home');

  // Scroll spy to detect active section when scrolling through the home page
  useEffect(() => {
    if (currentPage !== 'home') {
      setActiveTab('Engines');
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      const contactEl = document.getElementById('contact');
      const aboutEl = document.getElementById('about-us');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveTab('Contact');
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveTab('About');
      } else {
        setActiveTab('Home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavigate = (
    page: 'home' | 'engines',
    targetSection?: string,
    label?: 'Home' | 'Engines' | 'About' | 'Contact'
  ) => {
    if (label) {
      setActiveTab(label);
    }

    if (page === 'engines') {
      setCurrentPage('engines');
      setActiveTab('Engines');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if ((currentPage === 'engines' || currentPage === 'engine-details') && page === 'home') {
      setCurrentPage('home');
      if (targetSection) {
        setTimeout(() => {
          scrollTo(targetSection, { offset: -70, duration: 1.2 });
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Already on home page
    if (targetSection) {
      scrollTo(targetSection, { offset: -70, duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenEngineDetails = (engine: EngineItem) => {
    setPreviousPage(currentPage === 'engine-details' ? previousPage : (currentPage as 'home' | 'engines'));
    setSelectedEngine(engine);
    setCurrentPage('engine-details');
    setActiveTab('Engines');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEngineForEnquiry = (engine: EngineItem) => {
    setPrefilledEngine(engine);
    if (currentPage === 'home') {
      setActiveTab('Contact');
      scrollTo('#contact', { offset: -70, duration: 1.2 });
    } else if (currentPage === 'engines') {
      // In engines page, scroll down to the quote section on the page
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // From details page, navigate home to contact form
      handleNavigate('home', '#contact', 'Contact');
    }
  };

  const handleRequestQuote = () => {
    if (currentPage === 'home') {
      setActiveTab('Contact');
      scrollTo('#contact', { offset: -70, duration: 1.2 });
    } else if (currentPage === 'engines') {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        handleNavigate('home', '#contact', 'Contact');
      }
    } else {
      // On details page, scroll to quote form or return to contact
      const contactEl = document.getElementById('request-quote');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        handleNavigate('home', '#contact', 'Contact');
      }
    }
  };

  const handleExploreEngines = () => {
    setCurrentPage('engines');
    setActiveTab('Engines');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-white text-[#0f172a] font-sans selection:bg-[#a31414] selection:text-white">
      {/* Top Navigation Bar with transparent styling & active tab animations */}
      <Header
        currentPage={currentPage}
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onRequestQuote={handleRequestQuote}
        onExploreEngines={handleExploreEngines}
      />

      {/* Main Flow based on currentPage */}
      <main>
        {currentPage === 'home' ? (
          <>
            {/* 1. Hero Section (Dubai UAE, Pure Engine on Stand, No Text Overlays) */}
            <Hero
              onExploreEngines={handleExploreEngines}
              onRequestQuote={handleRequestQuote}
            />

            {/* 2. Seamless Marquee Ticker */}
            <ContinuousMarquee />

            {/* 3. Automatic Recent Arrival Engines Slider: Only 6 engines, Specs button removed */}
            <RecentArrivalsSection
              onSelectEngineForEnquiry={handleSelectEngineForEnquiry}
              onViewDetails={handleOpenEngineDetails}
              onViewAllEngines={handleExploreEngines}
            />

            {/* 4. About FH Engine (Sharjah, UAE) */}
            <AboutSection />

            {/* 5. Customer Enquiries & Quote Requests Form */}
            <EnquirySection
              prefilledEngine={prefilledEngine}
              onClearPrefill={() => setPrefilledEngine(null)}
            />
          </>
        ) : currentPage === 'engines' ? (
          /* Dedicated Engines Inventory Page */
          <div className="pt-24 sm:pt-28">
            {/* Page Breadcrumb & Header Banner */}
            <div className="bg-[#0f172a] text-white py-12 sm:py-16 border-b border-zinc-800">
              <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                <button
                  onClick={() => handleNavigate('home', '#hero', 'Home')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors mb-6 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#a31414] font-bold mb-3">
                      <span className="w-2 h-2 rounded-full bg-[#a31414]" />
                      <span>FULL WAREHOUSE INVENTORY · SHARJAH HUB</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
                      Automotive Engine Catalogue
                    </h1>
                    <p className="text-sm sm:text-base text-zinc-300 mt-3 max-w-2xl font-normal leading-relaxed">
                      Filter our current stock of tested petrol and diesel car engines ready for immediate dispatch from our Sharjah facility or crated export worldwide.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-800/80 rounded-lg text-xs font-semibold text-zinc-200 border border-zinc-700">
                      <ShieldCheck className="w-4 h-4 text-[#a31414]" />
                      <span>Compression Verified</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-800/80 rounded-lg text-xs font-semibold text-zinc-200 border border-zinc-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>OEM Stamped Codes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filterable Engine Catalogue Component: Single 'View Details' option */}
            <EngineCatalog
              onSelectEngineForEnquiry={handleSelectEngineForEnquiry}
              onViewDetails={handleOpenEngineDetails}
            />

            {/* Direct Enquiry Section on Engines page */}
            <EnquirySection
              prefilledEngine={prefilledEngine}
              onClearPrefill={() => setPrefilledEngine(null)}
            />
          </div>
        ) : (
          /* Dedicated Engine Details Page */
          selectedEngine ? (
            <EngineDetailsPage
              engine={selectedEngine}
              onBack={() => {
                if (previousPage === 'home') {
                  setCurrentPage('home');
                } else {
                  setCurrentPage('engines');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToEngine={(engine) => {
                setSelectedEngine(engine);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreCatalog={handleExploreEngines}
            />
          ) : (
            /* Fallback if no engine selected */
            <div className="pt-32 pb-20 text-center">
              <h2 className="text-xl font-bold mb-4">No Engine Selected</h2>
              <button
                onClick={handleExploreEngines}
                className="px-6 py-2.5 bg-[#a31414] text-white text-xs font-bold uppercase rounded-lg"
              >
                Go to Catalogue
              </button>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(page, target) => {
          const label =
            target === '#about-us'
              ? 'About'
              : target === '#contact'
              ? 'Contact'
              : target === '#engine-catalog'
              ? 'Engines'
              : 'Home';
          handleNavigate(page, target, label);
        }}
        onRequestQuote={handleRequestQuote}
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

