import React from 'react';
import { PageId } from '../types';
import { BUSINESS_INFO, WHY_CHOOSE_US, ABOUT_IMAGE_1, ABOUT_IMAGE_2 } from '../data/mockData';
import { Image } from '../components/Image';
import { Phone, MessageSquare, ArrowRight, UserPlus, CheckCircle2, Shield, MapPin, Building2, Sparkles } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: (propertyTitle?: string, requirement?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
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
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#8B6D33] dark:text-[#C5A880] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6D33] dark:bg-[#C5A880]" />
            <span>ABOUT ADVANCE PROPERTY CONSTRUCTION</span>
          </div>
          {/* Mandatory Headline */}
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white mb-6 leading-tight">
            Property Decisions Start With The Right Guidance.
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Based in Gwalior, Madhya Pradesh, Advance Property Construction provides grounded property consulting, real estate discovery, and construction coordination built around your specific objectives.
          </p>
        </div>

        {/* Visual Architectural Showcase (Real Photography with Resilient Fallback) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          <div className="md:col-span-8 rounded-2xl overflow-hidden shadow-lg border border-[#EAE6DF] dark:border-white/10 relative aspect-[16/9] group">
            <Image
              src={ABOUT_IMAGE_1}
              theme="luxury-villa"
              alt="Advance Property Construction Architectural Elevation in Gwalior"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              containerClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">Gwalior Operations</span>
                <p className="text-sm font-semibold">Architectural & Construction Guidance</p>
              </div>
              <span className="text-xs px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-white/15">
                Gwalior, M.P.
              </span>
            </div>
          </div>

          <div className="md:col-span-4 rounded-2xl overflow-hidden shadow-lg border border-[#EAE6DF] dark:border-white/10 relative aspect-[4/3] md:aspect-auto group">
            <Image
              src={ABOUT_IMAGE_2}
              theme="construction-site"
              alt="Architectural Planning, Blueprints and Civil Coordination"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              containerClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">Turnkey Solutions</span>
              <p className="text-sm font-semibold">Planning & Structural Execution</p>
            </div>
          </div>
        </div>

        {/* Narrative & Focus Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-20 border-b border-[#EAE6DF] dark:border-white/[0.08]">
          <div className="lg:col-span-7 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              Gwalior-Focused Property & Construction Services
            </h2>
            <p>
              Navigating the real estate landscape in Gwalior requires on-ground awareness—understanding locality growth patterns, road connectivity, title legitimacy, and practical construction realities.
            </p>
            <p>
              At Advance Property Construction, our focus is simple: we provide clear, reliable consultation so you can evaluate property opportunities with confidence. Whether you are searching for a residential plot for your family home, exploring commercial premises for your venture, or seeking structured construction assistance, we are here to support every phase of your journey.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-xl bg-white dark:bg-[#111724] border border-[#EAE6DF] dark:border-white/[0.06] shadow-xs">
                <div className="flex items-center gap-2 text-[#8B6D33] dark:text-[#C5A880] font-bold text-xs mb-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>Local Market Concentration</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Dedicated specifically to properties and construction opportunities across Gwalior.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-[#111724] border border-[#EAE6DF] dark:border-white/[0.06] shadow-xs">
                <div className="flex items-center gap-2 text-[#8B6D33] dark:text-[#C5A880] font-bold text-xs mb-1.5">
                  <Building2 className="w-4 h-4" />
                  <span>End-to-End Solutions</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Connecting property search, acquisition advisory, and civil construction solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-[#121825] border border-[#EAE6DF] dark:border-[#C5A880]/30 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#8B6D33] dark:text-[#C5A880] mb-4">
              Our Core Service Pillars
            </h3>
            <ul className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880] shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 dark:text-white">Property Consultation:</strong> In-depth assessment of your requirements before suggesting options.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880] shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 dark:text-white">Property Discovery:</strong> Curating residential homes, commercial units, and verified plots.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880] shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 dark:text-white">Buying & Selling Support:</strong> Assisting buyers and sellers with structured on-ground coordination.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880] shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 dark:text-white">Construction Execution:</strong> Bridging land purchase with quality structural and architectural guidance.</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-[#F0ECE1] dark:border-white/10 flex flex-col gap-2.5">
              <span className="text-[11px] text-slate-500">Have a specific question for our team?</span>
              <a
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Principles / Benefits */}
        <div className="py-20 border-b border-[#EAE6DF] dark:border-white/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] block mb-2">
              Our Professional Approach
            </span>
            <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white">
              Built on Client Integrity & Clear Counsel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.06] shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EDITABLE "MEET OUR TEAM" SECTION */}
        <div className="py-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] block mb-2">
                Company Leadership & Specialists
              </span>
              <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white">
                Meet Our Team
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
              Placeholders ready for the business owner to insert verified team member photographs and names.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                role: 'Principal Property Consultant / Founder',
                dept: 'Property Advisory & Client Guidance',
              },
              {
                role: 'Construction & Civil Head',
                dept: 'Site Planning & Structural Coordination',
              },
              {
                role: 'Client Relationship & Site Manager',
                dept: 'Property Inspections & Locality Coordination',
              },
            ].map((slot, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-[#111622] border border-dashed border-[#DDD7CD] dark:border-white/20 hover:border-[#8B6D33]/50 dark:hover:border-[#C5A880]/50 transition-colors flex flex-col justify-between shadow-xs"
              >
                <div>
                  {/* Photo Slot Placeholder */}
                  <div className="w-full aspect-[4/3] rounded-xl bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#EAE6DF] dark:border-white/5 flex flex-col items-center justify-center p-4 text-center mb-4">
                    <UserPlus className="w-8 h-8 text-[#8B6D33]/60 dark:text-[#C5A880]/60 mb-2" />
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">[Add Team Member Photo]</span>
                    <span className="text-[10px] text-slate-400 mt-1">Replace with portrait photograph</span>
                  </div>

                  <div className="text-xs font-mono text-[#8B6D33] dark:text-[#C5A880] mb-1 font-semibold">0{i + 1} // Team Profile</div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">[Add Name]</h3>
                  <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">{slot.role}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    [Add professional background and areas of specialization in Gwalior real estate]
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0ECE1] dark:border-white/[0.06] text-[11px] text-slate-500">
                  <span>{slot.dept}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#F5EFE4] via-[#F8F5EE] to-[#EDE5D5] dark:from-[#172031] dark:via-[#121927] dark:to-[#0D121B] border border-[#DDD5C7] dark:border-[#C5A880]/30 text-center max-w-4xl mx-auto shadow-sm">
          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-3">
            Ready to Discuss Your Property Requirement?
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto mb-6">
            Get in touch directly with Advance Property Construction to schedule a personal discussion or explore suitable property options in Gwalior.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenEnquiry(undefined, 'Property Consultation')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-xs"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={openWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-slate-800 dark:text-white bg-white dark:bg-[#1A2335] hover:bg-[#25D366]/10 border border-[#25D366]/40 rounded-md transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Us: {BUSINESS_INFO.phone}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
