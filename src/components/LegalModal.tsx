import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0F1420] border border-[#EAE6DF] dark:border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-slate-200 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' ? (
          <div>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-4">
              Privacy Policy — Advance Property Construction
            </h3>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                At Advance Property Construction (Gwalior, Madhya Pradesh), we respect the privacy of our visitors and clients. This Privacy Policy outlines how property enquiries and personal contact details are handled.
              </p>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white pt-2">1. Information Collection</h4>
              <p>
                When you submit an enquiry form, contact us by phone (+91 86026 40017), or initiate a WhatsApp chat, we may collect your name, phone number, email address, and property specifications.
              </p>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white pt-2">2. Use of Information</h4>
              <p>
                Your contact details are strictly utilized to respond to your specific property consultation requests, arrange property viewings, discuss construction requirements, and provide relevant updates. We do not sell or rent personal information to external marketers.
              </p>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white pt-2">3. Communications</h4>
              <p>
                You may receive direct calls, SMS, or WhatsApp messages from Advance Property Construction regarding your property enquiry. You may request to discontinue communications at any time.
              </p>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white pt-2">4. Data Security</h4>
              <p>
                We maintain appropriate administrative safeguards to protect your personal information against unauthorized disclosure.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-4">
              Terms &amp; Conditions — Advance Property Construction
            </h3>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                Please review these Terms &amp; Conditions governing the use of the Advance Property Construction web platform and property consulting services.
              </p>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white pt-2">1. Informational &amp; Proposal Nature</h4>
              <p>
                Property descriptions, layout representations, and architectural drawings displayed on this website are provided for discovery and consultation purposes. Sample listings are clearly demarcated as demo inventory until confirmed by verified documentation.
              </p>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white pt-2">2. Verification &amp; Independent Due Diligence</h4>
              <p>
                All property purchases, plot registries, and construction agreements in Gwalior require formal title verification, physical site survey, and mutually executed legal contracts. Visitors are encouraged to conduct standard legal verification prior to financial commitments.
              </p>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white pt-2">3. No Guaranteed Returns</h4>
              <p>
                Property market conditions fluctuate. Advance Property Construction provides factual market guidance and does not guarantee financial appreciation or speculative returns.
              </p>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white pt-2">4. Contact &amp; Jurisdiction</h4>
              <p>
                For any queries regarding these terms, contact Advance Property Construction at +91 86026 40017. All matters are subject to local jurisdiction in Gwalior, Madhya Pradesh.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#EAE6DF] dark:border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-800 dark:text-white bg-[#F2EFE8] dark:bg-[#1A2335] hover:bg-[#EAE5DC] dark:hover:bg-[#25324B] rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
