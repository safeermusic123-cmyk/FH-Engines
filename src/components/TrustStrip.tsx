import React, { useRef } from 'react';
import { Cog, CheckCircle, MapPin, Globe2 } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';

export const TrustStrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const highlights = [
    {
      title: 'Dedicated Engine Supply',
      description: 'Focused exclusively on complete car engines & engine assemblies',
      icon: Cog,
    },
    {
      title: 'Vehicle Compatibility Assistance',
      description: 'Cross-reference engine codes with vehicle VIN and specifications',
      icon: CheckCircle,
    },
    {
      title: 'UAE-Based Operations',
      description: 'Stock holding and distribution facilities located in the United Arab Emirates',
      icon: MapPin,
    },
    {
      title: 'International Shipping Enquiries',
      description: 'Facilitating secure export crating and global freight arrangements',
      icon: Globe2,
    },
  ];

  useGSAP(
    () => {
      gsap.from('.trust-item', {
        y: 18,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 88%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="trust-strip"
      ref={containerRef}
      className="bg-[#f7f7f6] border-b border-zinc-200/90 py-8 lg:py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`trust-item flex items-start gap-4 ${
                  index === 0 ? 'lg:pr-6' : index === 3 ? 'lg:pl-6' : 'lg:px-6'
                } pt-4 sm:pt-0`}
              >
                <div className="p-2.5 rounded-xs bg-white border border-zinc-200 shadow-2xs text-[#144b37] shrink-0">
                  <Icon className="w-5 h-5 stroke-[1.6]" />
                </div>
                <div>
                  <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-[#121316] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
