import React, { useState } from 'react';
import { PageId, PropertyItem, PropertyType, PropertyPurpose } from '../types';
import { BUSINESS_INFO, DEMO_PROPERTIES, FAQS, HERO_IMAGE } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { Image } from '../components/Image';
import {
  Search,
  MessageSquare,
  Phone,
  ArrowRight,
  Compass,
  Building,
  Briefcase,
  Hammer,
  MapPin,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  Check,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Bot,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onViewProperty: (property: PropertyItem) => void;
  onOpenEnquiry: (propertyTitle?: string, requirement?: string) => void;
  comparedPropertyIds?: string[];
  onToggleCompare?: (property: PropertyItem) => void;
  onOpenChat?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onViewProperty,
  onOpenEnquiry,
  comparedPropertyIds = [],
  onToggleCompare,
  onOpenChat,
}) => {
  // Search bar filter states
  const [searchType, setSearchType] = useState<PropertyType | 'All'>('All');
  const [searchPurpose, setSearchPurpose] = useState<PropertyPurpose | 'All'>('All');
  const [searchLocation, setSearchLocation] = useState<'Gwalior' | 'Other'>('Gwalior');
  const [searchBudget, setSearchBudget] = useState('Select Budget');

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const featuredProperties = DEMO_PROPERTIES.filter((p) => p.featured).slice(0, 3);

  const openWhatsAppGeneral = () => {
    const encoded = encodeURIComponent(BUSINESS_INFO.defaultWhatsAppMessage);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const journeySteps = [
    { num: '01', title: 'Requirement', desc: 'Tell us your exact location preference, property type and budget parameters in Gwalior.' },
    { num: '02', title: 'Property Search', desc: 'We screen suitable residential, commercial, or plot options from verified local opportunities.' },
    { num: '03', title: 'Shortlisting', desc: 'Review curated options and arrange accompanied on-ground site visits in Gwalior.' },
    { num: '04', title: 'Discussion', desc: 'Clarify documentation, layout parameters, approach road width and structural specifications.' },
    { num: '05', title: 'Next Step', desc: 'Move forward with clarity toward acquisition or turnkey construction execution.' },
  ];

  const whyChooseBenefits = [
    { num: '01', title: 'Local Market Understanding', desc: 'In-depth insight into Gwalior localities, road corridors, price realities and development belts.' },
    { num: '02', title: 'Personalised Guidance', desc: 'Every recommendation is calibrated around your family needs or business requirements.' },
    { num: '03', title: 'Clear Communication', desc: 'Direct, transparent facts without exaggeration, speculative claims, or aggressive sales tactics.' },
    { num: '04', title: 'Requirement-Based Search', desc: 'Curated properties matching your specific criteria, saving time on unfruitful inspections.' },
    { num: '05', title: 'Construction Assistance', desc: 'Bridge land acquisition with civil engineering coordination and architectural planning.' },
    { num: '06', title: 'Easy Enquiry', desc: 'Immediate direct access to local experts via phone (+91 86026 40017) or instant WhatsApp.' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* 1. HERO SECTION — LIGHT EDITORIAL ARCHITECTURAL LAYOUT */}
      <section className="relative pt-8 pb-20 lg:pt-14 lg:pb-28 overflow-hidden border-b border-[#EAE6DF] dark:border-white/[0.08]">
        {/* Subtle architectural background texture */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #9E7B3B 1px, transparent 1px),
              linear-gradient(to bottom, #9E7B3B 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Eyebrow label */}
              <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#8B6D33] dark:text-[#C5A880] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#8B6D33] dark:bg-[#C5A880]" />
                <span>PROPERTY & CONSTRUCTION SOLUTIONS</span>
              </div>

              {/* Mandatory Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                Find the Right Property. <br />
                <span className="text-[#8B6D33] dark:text-[#C5A880] italic font-normal">Build the Right Future.</span>
              </h1>

              {/* Mandatory Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl">
                Professional property consultation and construction solutions in Gwalior, tailored around your requirements.
              </p>

              {/* Sub-line */}
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Serving property requirements across Gwalior
              </p>

              {/* Mandatory Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('properties')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-all shadow-sm hover:shadow-md"
                >
                  <span>Explore Properties</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenEnquiry(undefined, 'Property Consultation')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white bg-white dark:bg-[#151D2C] hover:bg-[#F2EFE8] dark:hover:bg-[#1E293B] border border-[#DDD7CD] dark:border-white/15 rounded-md transition-all shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880]" />
                  <span>Talk to an Expert</span>
                </button>

                {onOpenChat && (
                  <button
                    onClick={onOpenChat}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#8B6D33] dark:text-[#C5A880] bg-[#8B6D33]/10 hover:bg-[#8B6D33]/20 dark:bg-[#C5A880]/15 dark:hover:bg-[#C5A880]/25 border border-[#8B6D33]/25 dark:border-[#C5A880]/30 rounded-md transition-all shadow-xs"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Ask AI Assistant</span>
                  </button>
                )}
              </div>

              {/* Quick direct contact indicator */}
              <div className="pt-6 border-t border-[#EAE6DF] dark:border-white/[0.08] flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-900 dark:text-slate-200">Helpline:</span>
                  <a href={`tel:${BUSINESS_INFO.phoneClean}`} className="text-[#8B6D33] dark:text-[#C5A880] hover:underline font-bold">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                <span>Gwalior, Madhya Pradesh</span>
              </div>

            </div>

            {/* Right Column: Hero Visual Treatment with Floating Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E0D6] dark:border-white/10 shadow-xl bg-white dark:bg-[#0E1420] p-2">
                <div className="rounded-xl overflow-hidden aspect-[16/10] relative">
                  <Image
                    theme="hero"
                    src={HERO_IMAGE}
                    alt="Advance Property Construction Architectural Elevation in Gwalior"
                    aspectRatio="16:9"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                  
                  {/* Subtle Top Label */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-[#FAF8F5]/90 dark:bg-black/80 text-slate-900 dark:text-[#C5A880] border border-[#E5E0D6] dark:border-white/10 backdrop-blur-md">
                      Architectural Elevation · Gwalior
                    </span>
                  </div>
                </div>

                {/* Floating Information Card over Image */}
                <div className="mt-3 p-4 sm:p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#121824] border border-[#EAE6DF] dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880]">
                      Your Property Requirement
                    </span>
                    <span className="block text-sm font-bold text-slate-900 dark:text-white">
                      Let&apos;s find the right opportunity.
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Tailored options for buyers, sellers & builders.
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenEnquiry(undefined, 'Property Requirement')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shrink-0 shadow-xs"
                  >
                    <span>Start Enquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PROPERTY SEARCH SECTION */}
      <section className="relative z-20 -mt-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#121724] border border-[#EAE6DF] dark:border-[#C5A880]/30 rounded-xl p-5 sm:p-7 shadow-lg dark:shadow-2xl">
          <form onSubmit={handleSearchSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              
              {/* Property Type Filter */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Property Type
                </label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] dark:bg-[#0B0E14] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                >
                  <option value="All">All Types</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plot/Land">Plot/Land</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Purpose Filter */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Purpose
                </label>
                <select
                  value={searchPurpose}
                  onChange={(e) => setSearchPurpose(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] dark:bg-[#0B0E14] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                >
                  <option value="All">All Purposes</option>
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                  <option value="Invest">Invest</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Location
                </label>
                <select
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] dark:bg-[#0B0E14] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                >
                  <option value="Gwalior">Gwalior</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Budget
                </label>
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] dark:bg-[#0B0E14] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                >
                  <option value="Select Budget">Select Budget</option>
                  <option value="Under ₹25 Lakhs">Under ₹25 Lakhs</option>
                  <option value="₹25 Lakhs - ₹50 Lakhs">₹25 Lakhs - ₹50 Lakhs</option>
                  <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                  <option value="₹1 Crore - ₹2 Crore">₹1 Crore - ₹2 Crore</option>
                  <option value="Above ₹2 Crore">Above ₹2 Crore</option>
                </select>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Sample property inventory formatted for verified Gwalior listings.
              </span>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. SECTION 01: PROPERTY SOLUTIONS BUILT AROUND YOUR NEEDS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Architectural Section Header */}
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-4xl sm:text-5xl font-display font-light text-[#8B6D33]/40 dark:text-[#C5A880]/30">01</span>
          <div className="h-px flex-1 bg-[#EAE6DF] dark:bg-white/10" />
        </div>

        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] block mb-2">
            Pillar Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mb-3">
            Property Solutions Built Around Your Needs
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            From initial property discovery to on-ground verification and construction coordination, our services are built around transparency and client objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Property Consultation',
              desc: 'Tailored requirement analysis to identify realistic residential, commercial, or plot options in Gwalior.',
              icon: Compass,
            },
            {
              title: 'Property Buying Assistance',
              desc: 'End-to-end guidance through property discovery, comparative analysis, and accompanied site inspections.',
              icon: Building,
            },
            {
              title: 'Property Selling Assistance',
              desc: 'Professional positioning of your property to connect with genuine, qualified prospective buyers.',
              icon: Briefcase,
            },
            {
              title: 'Construction Solutions',
              desc: 'Turnkey and custom civil construction guidance for individual homes, villas, and commercial spaces in Gwalior.',
              icon: Hammer,
            },
            {
              title: 'Site & Location Guidance',
              desc: 'Objective locality review covering approach roads, civic connectivity, and development potential.',
              icon: MapPin,
            },
            {
              title: 'Investment Consultation',
              desc: 'Factual guidance on property growth sectors and asset types aligned with your budget and long-term targets.',
              icon: ShieldCheck,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-xl bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.07] hover:border-[#8B6D33]/40 dark:hover:border-[#C5A880]/30 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md premium-card-hover"
              >
                <div>
                  <div className="w-11 h-11 rounded-lg bg-[#FAF8F5] dark:bg-[#182133] border border-[#E5E0D6] dark:border-[#C5A880]/20 flex items-center justify-center text-[#8B6D33] dark:text-[#C5A880] mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-5 mt-5 border-t border-[#F0ECE1] dark:border-white/[0.05]">
                  <button
                    onClick={() => onOpenEnquiry(undefined, item.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B6D33] dark:text-[#C5A880] hover:text-[#785D2A] dark:hover:text-[#D4B78D] transition-colors"
                  >
                    <span>Discuss Requirement</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SECTION 02: FEATURED PROPERTIES */}
      <section className="py-20 bg-[#F4F1EA] dark:bg-[#080B10] border-y border-[#EAE6DF] dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-4xl sm:text-5xl font-display font-light text-[#8B6D33]/40 dark:text-[#C5A880]/30">02</span>
            <div className="h-px flex-1 bg-[#DDD7CD] dark:bg-white/10" />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] block mb-2">
                Curated Inventory Format
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white">
                Featured Properties in Gwalior
              </h2>
            </div>

            <button
              onClick={() => onNavigate('properties')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white bg-white dark:bg-[#141B28] hover:bg-[#F2EFE8] dark:hover:bg-[#1E293B] border border-[#DDD7CD] dark:border-white/10 rounded-md transition-colors shadow-xs"
            >
              <span>View All Properties</span>
              <ArrowRight className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880]" />
            </button>
          </div>

          <div className="space-y-6">
            {featuredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                layout="horizontal"
                onViewDetails={onViewProperty}
                onEnquire={(p) => onOpenEnquiry(p.title, `Property Enquiry: ${p.title}`)}
                isCompared={comparedPropertyIds.includes(prop.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 5. SECTION 03: WHY CHOOSE US (SPLIT-SCREEN FORMAT) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-4xl sm:text-5xl font-display font-light text-[#8B6D33]/40 dark:text-[#C5A880]/30">03</span>
          <div className="h-px flex-1 bg-[#EAE6DF] dark:bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Prominent Statement */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] block">
              Why Advance Property Construction
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 dark:text-white leading-tight">
              &quot;Property decisions deserve more than a listing.&quot;
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
              In a growing city like Gwalior, finding the right property requires verified documentation, clear title analysis, and dependable on-ground execution. We represent your interests from search to possession.
            </p>

            <div className="pt-6">
              <button
                onClick={() => onOpenEnquiry(undefined, 'Property Advisory')}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-sm"
              >
                <span>Speak With a Specialist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: 6 Benefits Grid with line icons */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyChooseBenefits.map((b) => (
              <div
                key={b.num}
                className="p-5 rounded-xl bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.06] hover:border-[#8B6D33]/40 dark:hover:border-[#C5A880]/30 transition-all shadow-xs"
              >
                <div className="text-xs font-mono text-[#8B6D33] dark:text-[#C5A880] mb-2">{b.num}. BENEFIT</div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{b.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. SECTION 04: PROPERTY JOURNEY (5-PHASE INTERACTIVE HORIZONTAL TIMELINE) */}
      <section className="py-20 bg-[#F4F1EA] dark:bg-[#090D14] border-t border-[#EAE6DF] dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-4xl sm:text-5xl font-display font-light text-[#8B6D33]/40 dark:text-[#C5A880]/30">04</span>
            <div className="h-px flex-1 bg-[#DDD7CD] dark:bg-white/10" />
          </div>

          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] block mb-1">
              Step-by-Step Experience
            </span>
            <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-2">
              The Property Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              A transparent, stress-free path from your initial property enquiry to confident acquisition or construction.
            </p>
          </div>

          {/* Desktop Horizontal Timeline & Mobile Vertical Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {journeySteps.map((step, idx) => (
              <div
                key={step.num}
                className="relative p-5 rounded-xl bg-white dark:bg-[#121824] border border-[#EAE6DF] dark:border-white/[0.07] flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="text-2xl font-display font-bold text-[#8B6D33] dark:text-[#C5A880] mb-2">
                    {step.num}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#F0ECE1] dark:border-white/[0.05] flex items-center justify-between text-[11px] text-slate-400">
                  <span>Phase {step.num}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLIENT STORIES / TESTIMONIALS (Transparent placeholder without fake reviews) */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-[#111724] border border-[#EAE6DF] dark:border-white/[0.08] shadow-sm">
          <div className="max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] block mb-2">
              Verified Feedback
            </span>
            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-3">
              Client Stories Coming Soon
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Advance Property Construction collects verified feedback directly from genuine property buyers, sellers, and construction clients in Gwalior. Testimonials will appear here once authenticated.
            </p>

            <button
              onClick={() => onOpenEnquiry(undefined, 'Property Consultation')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-xs"
            >
              <span>Start Your Journey With Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section className="py-20 bg-[#F4F1EA] dark:bg-[#080B10] border-t border-[#EAE6DF] dark:border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] block mb-2">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white">
              Questions & Clear Answers
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.06] overflow-hidden transition-colors shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8B6D33] dark:text-[#C5A880] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-[#F0ECE1] dark:border-white/[0.04] pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. PROMINENT BOTTOM CTA SECTION (WARM ARCHITECTURAL PALETTE) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-br from-[#F5EFE4] via-[#F8F5EE] to-[#EDE5D5] dark:from-[#172031] dark:via-[#121927] dark:to-[#0D121B] border border-[#DDD5C7] dark:border-[#C5A880]/30 p-8 sm:p-14 overflow-hidden shadow-lg dark:shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] block mb-2">
              Direct Contact & Advisory
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mb-3">
              Looking for the Right Property?
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              Tell us what you are looking for and let us understand your requirement. From residential villas and commercial plots to custom construction in Gwalior.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenEnquiry(undefined, 'Property Requirement')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-sm"
              >
                <span>Start Your Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={openWhatsAppGeneral}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-slate-800 dark:text-white bg-white dark:bg-[#1E293B] hover:bg-[#25D366]/10 border border-[#25D366]/40 rounded-md transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Us: {BUSINESS_INFO.phone}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
