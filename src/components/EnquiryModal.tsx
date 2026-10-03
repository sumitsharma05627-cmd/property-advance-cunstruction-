import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/mockData';
import { X, CheckCircle2, MessageSquare, Phone, Send } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPropertyTitle?: string;
  initialRequirement?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialPropertyTitle = '',
  initialRequirement = 'Consultation / Site Visit',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requirement, setRequirement] = useState(initialRequirement);
  const [propertyType, setPropertyType] = useState('Residential');
  const [preferredLocation, setPreferredLocation] = useState('Gwalior');
  const [budget, setBudget] = useState('Select Budget');
  const [message, setMessage] = useState(
    initialPropertyTitle ? `I would like to enquire about: ${initialPropertyTitle}` : ''
  );

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
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
      propertyTitle: initialPropertyTitle || undefined,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('apc_leads') || '[]');
      existing.unshift(leadData);
      localStorage.setItem('apc_leads', JSON.stringify(existing));
    } catch {}

    setErrorMsg('');
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `*New Property Enquiry*\nName: ${name || 'Prospective Client'}\nPhone: ${phone}\nRequirement: ${requirement}\nProperty Type: ${propertyType}\nLocation: ${preferredLocation}\nBudget: ${budget}\nMessage: ${message || 'Interested in consultation'}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-white dark:bg-[#0F1420] border border-[#EAE6DF] dark:border-[#C5A880]/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-2">
              Enquiry Received Successfully
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
              Thank you, <span className="font-semibold text-slate-900 dark:text-white">{name}</span>. Advance Property Construction has received your details. Our representative will contact you at <span className="text-[#8B6D33] dark:text-[#C5A880] font-bold">{phone}</span>.
            </p>

            {/* Direct WhatsApp follow-up button */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#141C2B] border border-[#EAE6DF] dark:border-white/10 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div>
                <span className="text-xs font-bold text-[#25D366] uppercase tracking-wider block">Instant WhatsApp Connect</span>
                <span className="text-xs text-slate-600 dark:text-slate-400">Prefer an immediate response? Forward your details directly to our WhatsApp.</span>
              </div>
              <button
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-md transition-colors shrink-0 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp</span>
              </button>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-[#F2EFE8] dark:bg-[#1A2232] rounded-md border border-[#DDD7CD] dark:border-white/10"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="text-xs uppercase font-bold tracking-widest text-[#8B6D33] dark:text-[#C5A880] mb-1">
                Advance Property Construction
              </div>
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                {initialPropertyTitle ? 'Enquire About Property' : 'Schedule a Property Consultation'}
              </h2>
              {initialPropertyTitle && (
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                  Regarding: <span className="text-slate-900 dark:text-slate-200 font-semibold">{initialPropertyTitle}</span>
                </p>
              )}
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Name <span className="text-[#8B6D33] dark:text-[#C5A880]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#161D2B] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
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
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#161D2B] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
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
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#161D2B] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Requirement Type
                  </label>
                  <select
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#161D2B] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                  >
                    <option value="Property Buying">Property Buying</option>
                    <option value="Property Selling">Property Selling</option>
                    <option value="Construction Solutions">Construction Solutions</option>
                    <option value="General Consultation">General Consultation</option>
                    <option value="Site Visit Request">Site Visit Request</option>
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
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#161D2B] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
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
                    placeholder="e.g. City Centre / Gwalior"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#161D2B] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#161D2B] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
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
                  Message / Specific Criteria
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about specific preferences such as facing, road width, timeline, or construction scope..."
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#161D2B] border border-[#E2DDD5] dark:border-white/10 rounded-md text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#8B6D33] dark:focus:border-[#C5A880]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />
                  <span>Call directly: {BUSINESS_INFO.phone}</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Enquiry</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
