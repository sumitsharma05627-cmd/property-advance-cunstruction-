import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../data/mockData';
import { X, ClipboardCheck, Phone, MapPin, Database, RefreshCw, Trash2 } from 'lucide-react';

interface OwnerEditGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerEditGuideModal: React.FC<OwnerEditGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('apc_leads') || '[]');
        setLeads(stored);
      } catch {
        setLeads([]);
      }
    }
  }, [isOpen]);

  const clearLeads = () => {
    localStorage.removeItem('apc_leads');
    setLeads([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0F1420] border border-[#EAE6DF] dark:border-[#C5A880]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-slate-200 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="text-xs uppercase font-bold tracking-widest text-[#8B6D33] dark:text-[#C5A880] mb-1">
            Website Proposal &amp; Setup Notes
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
            Client Presentation &amp; Content Handover Guide
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Prepared specifically for Advance Property Construction (+91 86026 40017).
          </p>
        </div>

        <div className="space-y-6 text-xs text-slate-700 dark:text-slate-300">
          {/* Section 1: Business Details Verification */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#141A26] border border-[#EAE6DF] dark:border-white/10">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880]" />
              <span>Verified Business Information Configured</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600 dark:text-slate-400">
              <div>
                <span className="text-slate-500 block">Business Name:</span>
                <span className="text-slate-900 dark:text-white font-semibold">{BUSINESS_INFO.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Contact Phone:</span>
                <span className="text-slate-900 dark:text-white font-semibold">{BUSINESS_INFO.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Location:</span>
                <span className="text-slate-900 dark:text-white font-semibold">{BUSINESS_INFO.location}</span>
              </div>
              <div>
                <span className="text-slate-500 block">WhatsApp Route:</span>
                <span className="text-slate-900 dark:text-white font-semibold">wa.me/{BUSINESS_INFO.phoneClean}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Captured Test Enquiries */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#141A26] border border-[#EAE6DF] dark:border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-[#8B6D33] dark:text-[#C5A880]" />
                <span>Captured Enquiries in Demo ({leads.length})</span>
              </h4>
              {leads.length > 0 && (
                <button
                  onClick={clearLeads}
                  className="inline-flex items-center gap-1 text-[11px] text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear Test Leads</span>
                </button>
              )}
            </div>

            {leads.length === 0 ? (
              <p className="text-slate-500 italic">
                No enquiries submitted yet. Test any form on the site (e.g., &quot;Enquire Now&quot; or Property details) to see leads recorded here instantly.
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-2.5 rounded-lg bg-white dark:bg-[#0B0F17] border border-[#EAE6DF] dark:border-white/5 text-[11px]">
                    <div className="flex items-center justify-between text-slate-900 dark:text-white font-semibold">
                      <span>{lead.name} ({lead.phone})</span>
                      <span className="text-slate-400 font-normal">{new Date(lead.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 mt-1">
                      {lead.requirement} · {lead.propertyType} · {lead.preferredLocation} · {lead.budget}
                    </div>
                    {lead.message && (
                      <div className="text-slate-500 italic mt-0.5">&quot;{lead.message}&quot;</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Easy Steps to Add Actual Inventory */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#141A26] border border-[#EAE6DF] dark:border-white/10">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              Next Steps for Launching with Live Inventory
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>Supply actual property photographs and pricing for active Gwalior inventory.</li>
              <li>Provide business operating hours to replace the [Add Business Hours] placeholder.</li>
              <li>Provide real team photos for the &quot;Meet Our Team&quot; section on the About page.</li>
              <li>Connect backend webhook or CRM to directly receive instant SMS/email notifications for every lead.</li>
            </ol>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white dark:text-[#0B0E14] bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] rounded-md transition-colors shadow-xs"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
