import React, { useState } from 'react';
import { PageId } from '../types';
import { BUSINESS_INFO } from '../data/mockData';
import { Phone, MapPin, MessageSquare, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: (propertyTitle?: string, requirement?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requirement, setRequirement] = useState('Property Consultation');
  const [propertyType, setPropertyType] = useState('Residential');
  const [preferredLocation, setPreferredLocation] = useState('Gwalior');
  const [budget, setBudget] = useState('Select Budget');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please provide your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    const leadData = {
      id: 'lead-' + Date.now(),
      createdAt: new Date().toISOString(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      requirement,
      propertyType,
      preferredLocation,
      budget,
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
    const encoded = encodeURIComponent(BUSINESS_INFO.defaultWhatsAppMessage);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppForward = () => {
    const text = `*New Property Consultation Request*\nName: ${name}\nPhone: ${phone}\nRequirement: ${requirement}\nProperty Type: ${propertyType}\nLocation: ${preferredLocation}\nBudget: ${budget}\nMessage: ${message || 'Interested in consultation'}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#8B6D33] dark:text-[#C5A880] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6D33] dark:bg-[#C5A880]" />
            <span>DIRECT CONNECT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-white mb-3">
            Contact Advance Property Construction
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            We are here to assist with your residential, commercial, plot, or construction requirements across Gwalior.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Phone */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.08] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] dark:bg-[#182133] border border-[#E5E0D6] dark:border-[#C5A880]/30 flex items-center justify-center text-[#8B6D33] dark:text-[#C5A880] mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Direct Telephone
              </span>
              <a
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="text-lg font-bold text-slate-900 dark:text-white hover:text-[#8B6D33] dark:hover:text-[#C5A880] transition-colors block mb-2"
              >
                {BUSINESS_INFO.phone}
              </a>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Call directly for immediate assistance and property inquiries.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F0ECE1] dark:border-white/[0.06]">
              <a
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B6D33] dark:text-[#C5A880] hover:underline"
              >
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.08] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] dark:bg-[#182133] border border-[#25D366]/30 flex items-center justify-center text-[#25D366] mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                WhatsApp Messaging
              </span>
              <span className="text-lg font-bold text-slate-900 dark:text-white block mb-2">
                Instant Chat Support
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Share requirement details, ask questions, or request property brochures on WhatsApp.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F0ECE1] dark:border-white/[0.06]">
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:underline"
              >
                <span>Start WhatsApp Chat</span>
              </button>
            </div>
          </div>

          {/* Card 3: Location & Business Hours */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.08] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] dark:bg-[#182133] border border-[#E5E0D6] dark:border-[#C5A880]/30 flex items-center justify-center text-[#8B6D33] dark:text-[#C5A880] mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Location & City
              </span>
              <span className="text-base font-bold text-slate-900 dark:text-white block mb-2">
                {BUSINESS_INFO.location}
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mt-2">
                <Clock className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />
                <span>Business Hours: <em className="text-slate-800 dark:text-slate-300 font-semibold">[{BUSINESS_INFO.businessHours}]</em></span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F0ECE1] dark:border-white/[0.06] text-[11px] text-slate-400">
              Hours placeholder will be updated with actual timings.
            </div>
          </div>
        </div>

        {/* Form + Map Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B6D33] dark:text-[#C5A880] block mb-1">
                Online Enquiry Form
              </span>
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Send Us Your Property Requirement
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Fill in your details below and our team will get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-2">
                  Enquiry Submitted Successfully
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                  Thank you, <span className="font-semibold text-slate-900 dark:text-white">{name}</span>. Advance Property Construction has recorded your enquiry. We will contact you at <span className="text-[#8B6D33] dark:text-[#C5A880] font-bold">{phone}</span>.
                </p>

                <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#141C2B] border border-[#EAE6DF] dark:border-white/10 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                  <div>
                    <span className="text-xs font-bold text-[#25D366] uppercase tracking-wider block">Want a Faster Response?</span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">Forward these submitted details directly to our official WhatsApp.</span>
                  </div>
                  <button
                    onClick={handleWhatsAppForward}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-md transition-colors shrink-0 shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send on WhatsApp</span>
                  </button>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 bg-[#F2EFE8] dark:bg-[#1A2232] rounded-md border border-[#DDD7CD] dark:border-white/10"
                >
                  Submit Another Enquiry
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
                      placeholder="e.g. Anand Verma"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number <span className="text-[#8B6D33] dark:text-[#C5A880]">*</span>
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
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="anand@example.com"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Requirement
                    </label>
                    <select
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                    >
                      <option value="Property Buying">Property Buying</option>
                      <option value="Property Selling">Property Selling</option>
                      <option value="Construction Solutions">Construction Solutions</option>
                      <option value="Plot & Land Consultation">Plot & Land Consultation</option>
                      <option value="Commercial Property">Commercial Property</option>
                      <option value="Property Consultation">General Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Property Type
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
                      Preferred Location
                    </label>
                    <input
                      type="text"
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      placeholder="e.g. City Centre, Gwalior"
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
                      <option value="To Be Discussed">To Be Discussed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Message / Specific Requirement
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide additional details regarding plot size, bedrooms, road width, or construction stage..."
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#0C1017] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Enquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Map & Location Detail Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Google Maps Presentation Box */}
            <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.08] shadow-xs">
              <div className="p-4 border-b border-[#F0ECE1] dark:border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <MapPin className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880]" />
                  <span>Visit / Contact Us</span>
                </div>
                <span className="text-[11px] text-slate-500">Gwalior Region</span>
              </div>

              {/* Responsive Google Maps Embed centering on Gwalior, MP */}
              <div className="w-full aspect-[4/3] bg-[#F2EFE9] dark:bg-[#0A0E15] relative">
                <iframe
                  title="Advance Property Construction Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114542.49386348128!2d78.10952093557451!3d26.214155106173075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c5d1792291fb%3A0xff4fb56d65bc3ada!2sGwalior%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="p-4 text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-[#FAF8F5] dark:bg-[#0C1017]">
                <div className="text-slate-900 dark:text-white font-bold">Advance Property Construction</div>
                <div>Gwalior, Madhya Pradesh, India</div>
                <div className="text-[11px] text-slate-500 pt-1">
                  Serving City Centre, Lashkar, Morar, Thatipur, Airport Road, and surrounding development sectors.
                </div>
              </div>
            </div>

            {/* Direct Assurance Box */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111622] border border-[#EAE6DF] dark:border-white/[0.08] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B6D33] dark:text-[#C5A880] mb-2">
                <ShieldCheck className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880]" />
                <span>Direct Client Promise</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Your contact details are strictly used to coordinate your specific property enquiry. We do not engage in unsolicited third-party promotions.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
