import React from 'react';
import { PageId } from '../types';
import { SERVICES, BUSINESS_INFO } from '../data/mockData';
import { Image } from '../components/Image';
import {
  Compass,
  Building,
  Briefcase,
  MapPin,
  TrendingUp,
  Hammer,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: (propertyTitle?: string, requirement?: string) => void;
}

const iconMap = {
  compass: Compass,
  building: Building,
  briefcase: Briefcase,
  'map-pin': MapPin,
  'trending-up': TrendingUp,
  hammer: Hammer,
  'shield-check': ShieldCheck,
};

// Map each service to a representative architectural visual theme
const serviceVisualThemes: Record<string, 'luxury-villa' | 'commercial-plaza' | 'residential-apartment' | 'prime-plot' | 'construction-site' | 'upcoming-development'> = {
  'property-consultation': 'luxury-villa',
  'buying-assistance': 'residential-apartment',
  'selling-assistance': 'luxury-villa',
  'plot-land-consultation': 'prime-plot',
  'commercial-property': 'commercial-plaza',
  'construction-solutions': 'construction-site',
  'investment-guidance': 'upcoming-development',
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const openWhatsApp = () => {
    const encoded = encodeURIComponent(BUSINESS_INFO.defaultWhatsAppMessage);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#8B6D33] dark:text-[#C5A880] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6D33] dark:bg-[#C5A880]" />
            <span>COMPREHENSIVE ADVISORY & SOLUTIONS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white mb-4">
            Services Built Around Your Property Objectives
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Whether exploring your first home purchase in Gwalior, seeking high-visibility commercial premises, or planning structural construction, our advisory provides clarity and dependable execution.
          </p>
        </div>

        {/* Editorial Alternating Layout (Image/Text alternating) */}
        <div className="space-y-12 mb-20">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.iconType] || Compass;
            const visualTheme = serviceVisualThemes[service.id] || 'luxury-villa';
            const isEven = index % 2 === 1;

            return (
              <div
                key={service.id}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.08] shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Text Column */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] dark:bg-[#182133] border border-[#E5E0D6] dark:border-[#C5A880]/30 flex items-center justify-center text-[#8B6D33] dark:text-[#C5A880] shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-[#8B6D33] dark:text-[#C5A880] font-bold">
                          0{index + 1}. SERVICE
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {service.fullDesc}
                    </p>

                    {/* What this includes checklist */}
                    <div className="mb-6 bg-[#FAF8F5] dark:bg-[#0C1017] p-4 rounded-xl border border-[#EAE6DF] dark:border-white/[0.05]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
                        Key Deliverables
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                        {service.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onOpenEnquiry(undefined, service.title)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-xs"
                      >
                        <span>Discuss Your Requirement</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          const msg = `Hello Advance Property Construction, I would like to discuss: ${service.title}.`;
                          window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
                        }}
                        className="p-2.5 rounded-md bg-[#FAF8F5] hover:bg-[#25D366]/10 border border-[#E2DDD5] text-slate-700 hover:text-[#25D366] dark:bg-[#161D2B] dark:text-slate-300 transition-colors"
                        title="Chat on WhatsApp about this service"
                      >
                        <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      </button>
                    </div>
                  </div>

                  {/* Architectural Visual Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="rounded-xl overflow-hidden border border-[#EAE6DF] dark:border-white/10 shadow-xs relative">
                      <Image
                        theme={visualTheme}
                        alt={`${service.title} - Architectural Concept`}
                        aspectRatio="4:3"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 left-3 bg-[#FAF8F5]/90 dark:bg-black/80 px-2.5 py-1 rounded text-[11px] font-semibold text-slate-800 dark:text-[#C5A880] border border-[#DDD7CD] dark:border-white/10 backdrop-blur-md">
                        {service.title}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Lead Capture Banner */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#F5EFE4] via-[#F8F5EE] to-[#EDE5D5] dark:from-[#172031] dark:via-[#121927] dark:to-[#0D121B] border border-[#DDD5C7] dark:border-[#C5A880]/30 text-center max-w-4xl mx-auto shadow-sm dark:shadow-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] block mb-2">
            Personalised Guidance in Gwalior
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mb-3">
            Have a Specific Property or Construction Need?
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto mb-8">
            Tell us about your target location, budget, or structural preferences. We will connect with verified insights without sales pressure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenEnquiry(undefined, 'Service Consultation')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-xs"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={openWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-slate-800 dark:text-white bg-white dark:bg-[#1A2335] hover:bg-[#25D366]/10 border border-[#25D366]/40 rounded-md transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp: {BUSINESS_INFO.phone}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
