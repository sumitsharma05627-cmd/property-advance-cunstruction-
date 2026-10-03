import React, { useState } from 'react';
import { PageId } from '../types';
import { BUSINESS_INFO } from '../data/mockData';
import {
  Calendar,
  Clock,
  Phone,
  MessageSquare,
  CheckCircle2,
  Send,
  ShieldCheck,
  Building,
  UserCheck,
} from 'lucide-react';

interface ConsultationPageProps {
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: (propertyTitle?: string, requirement?: string) => void;
}

export const ConsultationPage: React.FC<ConsultationPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [consultationMode, setConsultationMode] = useState('In-Person Meeting in Gwalior');
  const [requirement, setRequirement] = useState('Property Buying Advice');
  const [propertyType, setPropertyType] = useState('Residential');
  const [preferredLocation, setPreferredLocation] = useState('Gwalior');
  const [budget, setBudget] = useState('Select Budget');
  const [preferredDay, setPreferredDay] = useState('As soon as possible');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }

    const leadData = {
      id: 'consultation-' + Date.now(),
      createdAt: new Date().toISOString(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      requirement: `${requirement} (${consultationMode})`,
      propertyType,
      preferredLocation,
      budget,
      preferredDay,
      message: message.trim(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('apc_leads') || '[]');
      existing.unshift(leadData);
      localStorage.setItem('apc_leads', JSON.stringify(existing));
    } catch {}

    setErrorMsg('');
    setSubmitted(true);
  };

  const openWhatsApp = () => {
    const text = `Hello Advance Property Construction, I would like to schedule a property consultation with your team in Gwalior.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppForward = () => {
    const text = `*New Consultation Booking*\nName: ${name}\nPhone: ${phone}\nMode: ${consultationMode}\nTopic: ${requirement}\nProperty Type: ${propertyType}\nLocation: ${preferredLocation}\nBudget: ${budget}\nPreferred Timing: ${preferredDay}\nNotes: ${message || 'Ready for consultation'}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#8B6D33] dark:text-[#C5A880] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6D33] dark:bg-[#C5A880]" />
            <span>PERSONALISED CONSULTATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white mb-3">
            Schedule a Property Consultation
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Discuss your residential, commercial, plot, or construction requirements directly with Advance Property Construction in Gwalior.
          </p>
        </div>

        {/* Content Split: Consultation Benefits & Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: What to expect in consultation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.08] shadow-xs">
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-4">
                What to Expect During Your Session
              </h2>
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] dark:bg-[#182133] border border-[#E5E0D6] dark:border-[#C5A880]/30 flex items-center justify-center text-[#8B6D33] dark:text-[#C5A880] shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Tailored Assessment</h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      We listen to your specific parameters regarding locality preferences, budget constraints, and intended usage timeline.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] dark:bg-[#182133] border border-[#E5E0D6] dark:border-[#C5A880]/30 flex items-center justify-center text-[#8B6D33] dark:text-[#C5A880] shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Unbiased Locality Guidance</h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      Practical review of emerging sectors in Gwalior, road connectivity, water supply, and upcoming civic infrastructure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] dark:bg-[#182133] border border-[#E5E0D6] dark:border-[#C5A880]/30 flex items-center justify-center text-[#8B6D33] dark:text-[#C5A880] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Zero Sales Pressure</h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      Factual advice designed to help you make informed, confident choices rather than rushing into purchase decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Connect Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F5EFE4] to-[#EDE5D5] dark:from-[#172031] dark:to-[#0D121B] border border-[#DDD5C7] dark:border-[#C5A880]/30 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] block mb-1">
                Need Immediate Answers?
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-4">
                You can reach us directly right now via telephone or WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`tel:${BUSINESS_INFO.phoneClean}`}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>
                <button
                  onClick={openWhatsApp}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-800 dark:text-white bg-white dark:bg-[#1A2536] hover:bg-[#25D366]/10 border border-[#25D366]/40 rounded-md transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Comprehensive Schedule Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] block mb-1">
                Consultation Request
              </span>
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Book Your Consultation
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Provide your details to arrange a focused one-on-one session.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-2">
                  Consultation Request Received
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                  Thank you, <span className="font-semibold text-slate-900 dark:text-white">{name}</span>. Advance Property Construction will contact you at <span className="text-[#8B6D33] dark:text-[#C5A880] font-bold">{phone}</span> to coordinate timing.
                </p>

                <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#141C2B] border border-[#EAE6DF] dark:border-white/10 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                  <div>
                    <span className="text-xs font-bold text-[#25D366] uppercase tracking-wider block">Connect On WhatsApp</span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">Forward these consultation notes directly to our WhatsApp.</span>
                  </div>
                  <button
                    onClick={handleWhatsAppForward}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-md transition-colors shrink-0 shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 bg-[#F2EFE8] dark:bg-[#1A2232] rounded-md border border-[#DDD7CD] dark:border-white/10"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Full Name <span className="text-[#8B6D33] dark:text-[#C5A880]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Suresh Singhal"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Number <span className="text-[#8B6D33] dark:text-[#C5A880]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 86026 40017"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Consultation Format
                    </label>
                    <select
                      value={consultationMode}
                      onChange={(e) => setConsultationMode(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                    >
                      <option value="In-Person Meeting in Gwalior">In-Person Meeting in Gwalior</option>
                      <option value="Detailed Phone Consultation">Detailed Phone Consultation</option>
                      <option value="WhatsApp Discussion">WhatsApp Discussion</option>
                      <option value="On-Site Property Inspection">On-Site Property Inspection</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Primary Subject
                    </label>
                    <select
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                    >
                      <option value="Property Buying Advice">Property Buying Advice</option>
                      <option value="Property Selling Valuation & Strategy">Property Selling Support</option>
                      <option value="Construction Advisory & Planning">Construction Advisory & Planning</option>
                      <option value="Plot & Land Scouting">Plot & Land Scouting</option>
                      <option value="Commercial Real Estate Investment">Commercial Real Estate Investment</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Property Category
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Plot/Land">Plot/Land</option>
                      <option value="Construction">Construction</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Preferred Locality
                    </label>
                    <input
                      type="text"
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      placeholder="e.g. City Centre / Morar"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                    >
                      <option value="Select Budget">Select Budget</option>
                      <option value="Under ₹25 Lakhs">Under ₹25 Lakhs</option>
                      <option value="₹25 Lakhs - ₹50 Lakhs">₹25 Lakhs - ₹50 Lakhs</option>
                      <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                      <option value="₹1 Crore - ₹2 Crore">₹1 Crore - ₹2 Crore</option>
                      <option value="Above ₹2 Crore">Above ₹2 Crore</option>
                      <option value="Flexible / To Be Discussed">Flexible / To Be Discussed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Timing / Availability
                  </label>
                  <input
                    type="text"
                    value={preferredDay}
                    onChange={(e) => setPreferredDay(e.target.value)}
                    placeholder="e.g. Tomorrow afternoon, Weekend morning, or Specific Date"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Specific Notes or Questions
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us any specific criteria, documents ready, or construction questions you'd like to discuss..."
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                  />
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Consultation Booking</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
