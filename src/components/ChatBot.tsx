import React, { useState, useRef, useEffect } from 'react';
import { PageId, PropertyItem } from '../types';
import { BUSINESS_INFO, DEMO_PROPERTIES } from '../data/mockData';
import { Image } from './Image';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Phone,
  Bot,
  User,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  HelpCircle,
  Compass,
  FileText,
  BadgeCheck,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedProperties?: PropertyItem[];
  actionOptions?: {
    label: string;
    action: () => void;
    icon?: React.ReactNode;
    primary?: boolean;
  }[];
  propertyCard?: PropertyItem;
  badge?: string;
}

interface ChatBotProps {
  currentPage: PageId;
  currentProperty?: PropertyItem | null;
  onNavigate: (page: PageId) => void;
  onViewProperty: (property: PropertyItem) => void;
  onOpenEnquiry: (propertyTitle?: string, requirement?: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface SuggestedActionItem {
  id: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  handler: () => void;
  highlight?: boolean;
}

export const ChatBot: React.FC<ChatBotProps> = ({
  currentPage,
  currentProperty,
  onNavigate,
  onViewProperty,
  onOpenEnquiry,
  isOpen,
  onToggle,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(true);

  // Proactive conversational flow state
  // null | 'awaiting_visit_slot' | 'awaiting_property_selection'
  const [activeFlowProperty, setActiveFlowProperty] = useState<PropertyItem | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate welcome message based on page
  const generateInitialMessage = (): ChatMessage => {
    if (currentPage === 'property-detail' && currentProperty) {
      return {
        id: 'welcome-detail',
        sender: 'assistant',
        text: `Hello! I noticed you are viewing **${currentProperty.title}** in **${currentProperty.locality}, Gwalior**.\n\nI can verify real-time availability, schedule a private walkthrough, or provide neighborhood pricing specs. How can I help you today?`,
        timestamp: 'Just now',
        badge: 'Viewing Property Details',
        actionOptions: [
          {
            label: '🔍 Check Availability Status',
            action: () => handleInitiateAvailabilityCheck(currentProperty),
            primary: true,
          },
          {
            label: '📅 Schedule Site Walkthrough',
            action: () => handleInitiateVisitScheduling(currentProperty),
          },
          {
            label: '📝 Submit Direct Enquiry',
            action: () => onOpenEnquiry(currentProperty.title, `Enquiry for ${currentProperty.title}`),
          },
        ],
      };
    }

    if (currentPage === 'properties') {
      return {
        id: 'welcome-properties',
        sender: 'assistant',
        text: `Welcome to our **Gwalior Property Catalog**! We have curated verified independent villas, commercial spaces, and clear-title plots across Gwalior.\n\nWould you like me to help narrow down options based on your preference?`,
        timestamp: 'Just now',
        badge: 'Property Catalog',
        actionOptions: [
          {
            label: '💎 Luxury Villas in City Centre',
            action: () => handleFilterByQuery('Show me luxury villas in City Centre Extension Gwalior'),
          },
          {
            label: '🏢 Commercial Showrooms & Offices',
            action: () => handleFilterByQuery('Commercial retail showrooms near Maharaj Bada Gwalior'),
          },
          {
            label: '📐 Clear-Title Plots on Airport Road',
            action: () => handleFilterByQuery('Residential plots on Airport Road Gwalior'),
          },
        ],
      };
    }

    if (currentPage === 'projects') {
      return {
        id: 'welcome-projects',
        sender: 'assistant',
        text: `Welcome to **Advance Projects & Construction**. We manage end-to-end turnkey architectural developments and civil engineering projects across Gwalior.\n\nAsk about ongoing project milestones, structural specifications, or book a builder conference!`,
        timestamp: 'Just now',
        badge: 'Projects & Developments',
      };
    }

    return {
      id: 'welcome-general',
      sender: 'assistant',
      text: `Hello! Welcome to **ADVANCE PROPERTY CONSTRUCTION**. I am your virtual property and construction advisor for **Gwalior, Madhya Pradesh**.\n\nYou can explore verified properties, check real-time availability, schedule on-site walkthroughs, or request turnkey civil construction guidance.`,
      timestamp: 'Just now',
      badge: 'Gwalior Real Estate Advisor',
    };
  };

  // Initialize or update welcome message if chat is empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([generateInitialMessage()]);
    }
  }, [currentPage, currentProperty]);

  useEffect(() => {
    if (isOpen) {
      setHasUnreadNotification(false);
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 150);
    }
  }, [isOpen, messages]);

  // Helper to open WhatsApp directly with prefilled message
  const handleOpenWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  // Proactive Flow 1: Availability Check for a specific property
  const handleInitiateAvailabilityCheck = (prop: PropertyItem) => {
    setActiveFlowProperty(prop);

    const userMsg: ChatMessage = {
      id: `user-avail-${Date.now()}`,
      sender: 'user',
      text: `Is "${prop.title}" currently available for inspection?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const assistantMsg: ChatMessage = {
      id: `assistant-avail-${Date.now()}`,
      sender: 'assistant',
      badge: 'Verified Availability',
      text: `✅ **AVAILABILITY CONFIRMED: Ready for Inspection & Booking**\n\n• **Property**: **${prop.title}**\n• **Locality**: ${prop.locality}, ${prop.location}\n• **Guide Price**: **${prop.price}**\n• **Type & Purpose**: ${prop.type} (${prop.purpose})\n• **Configuration**: ${prop.size} ${prop.bedrooms ? `· ${prop.bedrooms} BHK` : ''}\n• **Status**: Open for accompanied site walkthroughs.\n\nWould you like to reserve a private inspection slot or speak with our property manager?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      propertyCard: prop,
      actionOptions: [
        {
          label: '📅 Pick Site Visit Time Slot',
          action: () => handleInitiateVisitScheduling(prop),
          primary: true,
        },
        {
          label: '📝 Submit Enquiry Form',
          action: () => onOpenEnquiry(prop.title, `Availability confirmed. Requesting official brochure & pricing breakdown for ${prop.title}`),
        },
        {
          label: '💬 Chat on WhatsApp',
          action: () => handleOpenWhatsApp(`Hello Advance Property, I checked availability for "${prop.title}" on your website and would like further details.`),
        },
      ],
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  // Proactive Flow 2: Schedule Site Walkthrough
  const handleInitiateVisitScheduling = (prop: PropertyItem) => {
    setActiveFlowProperty(prop);

    const userMsg: ChatMessage = {
      id: `user-visit-${Date.now()}`,
      sender: 'user',
      text: `I'd like to schedule an accompanied site inspection for "${prop.title}".`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const assistantMsg: ChatMessage = {
      id: `assistant-visit-${Date.now()}`,
      sender: 'assistant',
      badge: 'Site Inspection Booking',
      text: `We would be pleased to coordinate a private walkthrough of **${prop.title}** in **${prop.locality}, Gwalior**!\n\nOur property manager will escort you on-site, verify layout demarcation, and review registry/legal paperwork.\n\n**Please select your preferred visit window:**`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionOptions: [
        {
          label: '🌅 Tomorrow Morning (10:00 AM – 1:00 PM)',
          action: () => handleConfirmVisitSlot(prop, 'Tomorrow Morning (10:00 AM – 1:00 PM)'),
          primary: true,
        },
        {
          label: '🌇 Tomorrow Evening (3:30 PM – 6:30 PM)',
          action: () => handleConfirmVisitSlot(prop, 'Tomorrow Evening (3:30 PM – 6:30 PM)'),
        },
        {
          label: '🗓️ This Weekend (Saturday or Sunday)',
          action: () => handleConfirmVisitSlot(prop, 'This Weekend (Saturday/Sunday)'),
        },
        {
          label: '⚡ Same-Day Priority Inspection',
          action: () => handleConfirmVisitSlot(prop, 'Same-Day Priority Inspection (Today)'),
        },
      ],
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  // Proactive Flow 3: Confirm chosen visit slot
  const handleConfirmVisitSlot = (prop: PropertyItem, slot: string) => {
    const userMsg: ChatMessage = {
      id: `user-slot-${Date.now()}`,
      sender: 'user',
      text: `Preferred slot: ${slot}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const assistantMsg: ChatMessage = {
      id: `assistant-slot-confirm-${Date.now()}`,
      sender: 'assistant',
      badge: 'Gate Pass Reservation Ready',
      text: `🎯 **Walkthrough Reservation Prepared!**\n\n• **Listing**: **${prop.title}**\n• **Preferred Window**: **${slot}**\n• **Meeting Locality**: ${prop.locality}, Gwalior\n• **Coordinator**: Er. Site Consultant, Advance Property Construction\n\nTo assign your on-site representative and send the gate pass, please choose how you would like to complete confirmation:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionOptions: [
        {
          label: '📝 Complete Verification Form (Instant)',
          action: () => onOpenEnquiry(prop.title, `Site Visit Requested: ${prop.title} | Slot: ${slot}`),
          primary: true,
        },
        {
          label: '📲 WhatsApp Confirmation',
          action: () => handleOpenWhatsApp(`Hello Advance Property Construction, I want to confirm my site inspection for "${prop.title}" (${prop.locality}, Gwalior) for: ${slot}.`),
        },
        {
          label: `📞 Call Helpline (${BUSINESS_INFO.phone})`,
          action: () => {
            window.location.href = `tel:${BUSINESS_INFO.phoneClean}`;
          },
        },
      ],
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  // Proactive Flow 4: General Property Availability Selector
  const handleGeneralAvailabilityFlow = () => {
    const userMsg: ChatMessage = {
      id: `user-avail-general-${Date.now()}`,
      sender: 'user',
      text: `Check availability of Gwalior properties.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const assistantMsg: ChatMessage = {
      id: `assistant-avail-selector-${Date.now()}`,
      sender: 'assistant',
      badge: 'Live Inventory Status',
      text: `Which property would you like me to inspect availability for right now? Click any of our active listings in Gwalior below:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionOptions: DEMO_PROPERTIES.slice(0, 4).map((prop) => ({
        label: `📍 ${prop.title} (${prop.locality})`,
        action: () => handleInitiateAvailabilityCheck(prop),
      })),
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  const handleFilterByQuery = (queryText: string) => {
    handleSendMessage(queryText);
  };

  const findRelevantProperties = (query: string): PropertyItem[] => {
    const q = query.toLowerCase();
    if (q.includes('villa') || q.includes('independent') || q.includes('home') || q.includes('house')) {
      return DEMO_PROPERTIES.filter((p) => p.type === 'Residential').slice(0, 2);
    }
    if (q.includes('commercial') || q.includes('shop') || q.includes('office') || q.includes('retail') || q.includes('showroom')) {
      return DEMO_PROPERTIES.filter((p) => p.type === 'Commercial').slice(0, 2);
    }
    if (q.includes('plot') || q.includes('land')) {
      return DEMO_PROPERTIES.filter((p) => p.type === 'Plot/Land').slice(0, 2);
    }
    if (q.includes('all') || q.includes('available') || q.includes('show') || q.includes('properties') || q.includes('list')) {
      return DEMO_PROPERTIES.slice(0, 3);
    }
    return [];
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    // Check if the input is an availability question about current property
    const lower = text.toLowerCase();
    const isAvailabilityQuery =
      lower.includes('available') ||
      lower.includes('availability') ||
      lower.includes('vacant') ||
      lower.includes('ready') ||
      lower.includes('is this');

    const isSiteVisitQuery =
      lower.includes('visit') ||
      lower.includes('schedule') ||
      lower.includes('walkthrough') ||
      lower.includes('inspect') ||
      lower.includes('timing');

    // If viewing a detail page and asking availability or visit, route into proactive flow
    if (currentPage === 'property-detail' && currentProperty) {
      if (isAvailabilityQuery) {
        handleInitiateAvailabilityCheck(currentProperty);
        setInputValue('');
        return;
      }
      if (isSiteVisitQuery) {
        handleInitiateVisitScheduling(currentProperty);
        setInputValue('');
        return;
      }
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const relevantProps = findRelevantProperties(text);

    try {
      // Call server-side Gemini API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const replyText =
        data.reply ||
        'Thank you for your enquiry. Our property specialists in Gwalior will be happy to assist you directly at +91 86026 40017.';

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProperties: relevantProps.length > 0 ? relevantProps : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.warn('Backend chat fetch issue, using local property engine:', err);
      // Fallback local response
      let localReply = `Thank you for asking! For verified property opportunities and turnkey construction advisory in Gwalior, Advance Property Construction is here to help.\n\nYou can reach our principal consultant directly at **${BUSINESS_INFO.phone}** via call or WhatsApp.`;

      const q = text.toLowerCase();
      if (q.includes('availab') || q.includes('status')) {
        localReply = `All our primary Gwalior listings—including independent villas in City Centre Extension and commercial units near Maharaj Bada—are open for immediate inspection and title verification. Would you like to schedule an accompanied site walkthrough?`;
      } else if (q.includes('villa') || q.includes('apartment') || q.includes('residential')) {
        localReply = `We offer premium residential choices in Gwalior including independent multi-level luxury villas in City Centre Extension and 3 BHK family residences in Lashkar and Morar. Feel free to inspect them below or call **${BUSINESS_INFO.phone}**.`;
      } else if (q.includes('commercial') || q.includes('shop') || q.includes('office')) {
        localReply = `We support commercial clients with high-visibility retail shopfronts and corporate floors on Maharaj Bada and Jhansi Road corridors in Gwalior.`;
      } else if (q.includes('plot') || q.includes('land')) {
        localReply = `We consult on clear-title residential and commercial plots in developing belts of Gwalior such as Airport Road and Thatipur Extension, with wide approach roads and immediate construction readiness.`;
      } else if (q.includes('construct') || q.includes('build')) {
        localReply = `Advance Property Construction provides complete civil and architectural construction coordination in Gwalior—from site layout planning to structural finishing. Speak with our engineering team at **${BUSINESS_INFO.phone}**.`;
      } else if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('call')) {
        localReply = `Our official phone and WhatsApp helpline is **${BUSINESS_INFO.phone}**. We are based in Gwalior, Madhya Pradesh, India.`;
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: localReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProperties: relevantProps.length > 0 ? relevantProps : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([generateInitialMessage()]);
  };

  const formatTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-bold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Dynamic Suggested Actions Menu based on the user's current page
  const getPageSuggestedActions = (): SuggestedActionItem[] => {
    if (currentPage === 'property-detail' && currentProperty) {
      return [
        {
          id: 'check-availability',
          label: 'Check Availability',
          sublabel: 'Live inventory status',
          icon: <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />,
          handler: () => handleInitiateAvailabilityCheck(currentProperty),
          highlight: true,
        },
        {
          id: 'schedule-visit',
          label: 'Schedule Site Visit',
          sublabel: 'Accompanied walkthrough',
          icon: <Calendar className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />,
          handler: () => handleInitiateVisitScheduling(currentProperty),
          highlight: true,
        },
        {
          id: 'enquire-property',
          label: 'Direct Enquiry Form',
          sublabel: 'Official quotation',
          icon: <FileText className="w-3.5 h-3.5" />,
          handler: () => onOpenEnquiry(currentProperty.title, `Direct Enquiry: ${currentProperty.title}`),
        },
        {
          id: 'pricing-breakdown',
          label: 'Pricing & Loan Guidance',
          sublabel: 'Financial clarity',
          icon: <Sparkles className="w-3.5 h-3.5" />,
          handler: () => handleSendMessage(`What are the pricing details, payment terms, and loan eligibility for ${currentProperty.title}?`),
        },
        {
          id: 'whatsapp-agent',
          label: 'WhatsApp Specialist',
          sublabel: 'Instant chat',
          icon: <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />,
          handler: () => handleOpenWhatsApp(`Hello Advance Property, I am reviewing "${currentProperty.title}" and would like to ask a few questions.`),
        },
      ];
    }

    if (currentPage === 'properties') {
      return [
        {
          id: 'check-any-avail',
          label: 'Check Availability',
          sublabel: 'Select listing',
          icon: <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />,
          handler: handleGeneralAvailabilityFlow,
          highlight: true,
        },
        {
          id: 'luxury-villas',
          label: 'City Centre Villas',
          sublabel: 'Premium residential',
          icon: <Building2 className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />,
          handler: () => handleFilterByQuery('Show me luxury villas in City Centre Extension Gwalior'),
        },
        {
          id: 'commercial-spaces',
          label: 'Commercial Showrooms',
          sublabel: 'Maharaj Bada & VIP Rd',
          icon: <Building2 className="w-3.5 h-3.5" />,
          handler: () => handleFilterByQuery('Tell me about commercial showrooms in Gwalior'),
        },
        {
          id: 'plots-airport',
          label: 'Plots on Airport Road',
          sublabel: 'Clear-title land',
          icon: <Compass className="w-3.5 h-3.5" />,
          handler: () => handleFilterByQuery('What residential plots are available on Airport Road Gwalior?'),
        },
      ];
    }

    if (currentPage === 'projects') {
      return [
        {
          id: 'project-timeline',
          label: 'Construction Timeline',
          sublabel: 'Execution schedule',
          icon: <Clock className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />,
          handler: () => handleSendMessage('What is the timeline and phased delivery for your ongoing construction projects in Gwalior?'),
        },
        {
          id: 'turnkey-consult',
          label: 'Book Builder Meeting',
          sublabel: 'Civil & Architectural',
          icon: <Calendar className="w-3.5 h-3.5" />,
          handler: () => onOpenEnquiry(undefined, 'Turnkey Construction & Builder Meeting Request'),
          highlight: true,
        },
        {
          id: 'spec-sheet',
          label: 'Structural Specs',
          sublabel: 'Materials & Standards',
          icon: <FileText className="w-3.5 h-3.5" />,
          handler: () => handleSendMessage('What civil standards, materials, and structural warranties are provided by Advance Property Construction?'),
        },
      ];
    }

    if (currentPage === 'about') {
      return [
        {
          id: 'legal-verification',
          label: 'Legal & Title Process',
          sublabel: 'Due diligence in Gwalior',
          icon: <BadgeCheck className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />,
          handler: () => handleSendMessage('How does Advance Property verify land titles and registry legitimacy in Gwalior?'),
          highlight: true,
        },
        {
          id: 'visit-office',
          label: 'Office Directions',
          sublabel: 'Gwalior, M.P.',
          icon: <MapPin className="w-3.5 h-3.5" />,
          handler: () => handleSendMessage('Where is Advance Property Construction located in Gwalior and what are your visiting hours?'),
        },
        {
          id: 'consult-call',
          label: 'Direct Consultation',
          sublabel: 'Phone helpline',
          icon: <Phone className="w-3.5 h-3.5" />,
          handler: () => {
            window.location.href = `tel:${BUSINESS_INFO.phoneClean}`;
          },
        },
      ];
    }

    // Default: Home, Services, Consultation, Contact
    return [
      {
        id: 'home-avail',
        label: 'Check Property Availability',
        sublabel: 'Verified inventory',
        icon: <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />,
        handler: handleGeneralAvailabilityFlow,
        highlight: true,
      },
      {
        id: 'home-villas',
        label: 'Residential Villas',
        sublabel: 'City Centre & VIP Road',
        icon: <Building2 className="w-3.5 h-3.5 text-[#8B6D33] dark:text-[#C5A880]" />,
        handler: () => handleFilterByQuery('Tell me about available residential villas in Gwalior'),
      },
      {
        id: 'home-construction',
        label: 'Turnkey Construction',
        sublabel: 'Planning & structural',
        icon: <Compass className="w-3.5 h-3.5" />,
        handler: () => handleSendMessage('What turnkey civil construction and architectural planning services do you offer in Gwalior?'),
      },
      {
        id: 'home-consult',
        label: 'Schedule Consultation',
        sublabel: '1-on-1 session',
        icon: <Calendar className="w-3.5 h-3.5" />,
        handler: () => onOpenEnquiry(undefined, 'Consultation Session Request'),
      },
    ];
  };

  const suggestedActions = getPageSuggestedActions();

  // Page title / badge helper
  const getPageContextLabel = (): string => {
    switch (currentPage) {
      case 'property-detail':
        return currentProperty ? `Viewing: ${currentProperty.title}` : 'Property Detail';
      case 'properties':
        return 'Browsing Gwalior Catalog';
      case 'projects':
        return 'Projects & Turnkey Construction';
      case 'about':
        return 'About Advance Property';
      case 'contact':
        return 'Direct Contact & Helpline';
      default:
        return 'Advance Property Gwalior';
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end pointer-events-auto">
        {/* Unread banner when closed */}
        {!isOpen && hasUnreadNotification && (
          <div
            onClick={onToggle}
            className="mb-2.5 max-w-[260px] p-2.5 rounded-xl bg-white dark:bg-[#111724] border border-[#DDD7CD] dark:border-[#C5A880]/40 shadow-xl text-xs text-slate-700 dark:text-slate-200 cursor-pointer animate-bounce flex items-center gap-2 group"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-slate-900 dark:text-white group-hover:text-[#8B6D33] dark:group-hover:text-[#C5A880] transition-colors block truncate">
                {currentPage === 'property-detail' && currentProperty
                  ? `Check ${currentProperty.title.slice(0, 24)}...`
                  : 'Chat with Property Assistant'}
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                Availability · Walkthroughs · Advisory
              </span>
            </div>
          </div>
        )}

        {/* Trigger Button */}
        <button
          onClick={onToggle}
          className="relative inline-flex items-center justify-center gap-2.5 p-3 sm:px-4 sm:py-3.5 rounded-full bg-gradient-to-r from-[#8B6D33] to-[#A48243] hover:from-[#785D2A] hover:to-[#917135] dark:from-[#C5A880] dark:to-[#D4B78D] text-white dark:text-[#0B0E14] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-95 border border-white/20"
          aria-label={isOpen ? 'Close chat' : 'Open property assistant chat'}
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <>
              <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                Ask AI Assistant
              </span>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0B0E14]" />
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 sm:bottom-22 right-4 sm:right-6 z-40 w-[95vw] sm:w-[420px] max-h-[85vh] h-[640px] flex flex-col rounded-2xl bg-white dark:bg-[#0E131E] border border-[#EAE6DF] dark:border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl animate-scale-in">
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-[#FAF8F5] dark:bg-[#131A27] border-b border-[#EAE6DF] dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#8B6D33] dark:bg-[#C5A880] text-white dark:text-[#0B0E14] flex items-center justify-center font-bold shadow-xs shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white truncate">
                    Advance Property AI
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Gwalior Property & Construction Advisor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <a
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="p-1.5 sm:p-2 text-slate-500 hover:text-[#8B6D33] dark:hover:text-[#C5A880] rounded-lg transition-colors"
                title={`Call ${BUSINESS_INFO.phone}`}
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={handleResetChat}
                className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors"
                title="Reset conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onToggle}
                className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors"
                aria-label="Minimize chat"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Ribbon: shows current page & quick phone */}
          <div className="px-3.5 py-1.5 bg-[#F4F1EA] dark:bg-[#182133] border-b border-[#EAE6DF] dark:border-white/5 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
            <span className="truncate max-w-[230px] font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B6D33] dark:bg-[#C5A880]" />
              <strong className="text-slate-900 dark:text-white truncate">{getPageContextLabel()}</strong>
            </span>
            <button
              onClick={() => onOpenEnquiry(currentProperty?.title, 'Site Walkthrough Enquiry')}
              className="text-[#8B6D33] dark:text-[#C5A880] font-bold hover:underline shrink-0 text-[10px] uppercase tracking-wider"
            >
              Book Visit →
            </button>
          </div>

          {/* PAGE-AWARE SUGGESTED ACTIONS MENU */}
          <div className="bg-[#FAF8F5]/90 dark:bg-[#111724]/90 border-b border-[#EAE6DF] dark:border-white/5 transition-all">
            <div className="px-3.5 py-1.5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#8B6D33] dark:text-[#C5A880]" />
                Suggested Actions
              </span>
              <button
                onClick={() => setIsActionsMenuOpen((prev) => !prev)}
                className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-0.5"
              >
                {isActionsMenuOpen ? (
                  <>
                    <span>Hide</span> <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    <span>Show</span> <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>

            {isActionsMenuOpen && (
              <div className="px-3 pb-2.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {suggestedActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.handler}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all shadow-2xs whitespace-nowrap ${
                      action.highlight
                        ? 'bg-[#8B6D33] text-white hover:bg-[#785D2A] dark:bg-[#C5A880] dark:text-[#0B0E14] dark:hover:bg-[#D4B78D]'
                        : 'bg-white dark:bg-[#1A2234] hover:bg-[#F0ECE3] dark:hover:bg-[#232D42] text-slate-700 dark:text-slate-200 border border-[#DDD7CD] dark:border-white/10'
                    }`}
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-[#8B6D33]/15 dark:bg-[#C5A880]/20 text-[#8B6D33] dark:text-[#C5A880] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="max-w-[88%] space-y-2">
                  {/* Assistant badge tag if present */}
                  {msg.badge && msg.sender === 'assistant' && (
                    <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-[#8B6D33] dark:text-[#C5A880] px-2 py-0.5 rounded bg-[#8B6D33]/10 dark:bg-[#C5A880]/15 border border-[#8B6D33]/20 dark:border-[#C5A880]/20">
                      {msg.badge}
                    </span>
                  )}

                  {/* Message bubble */}
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#8B6D33] text-white dark:bg-[#C5A880] dark:text-[#0B0E14] rounded-tr-xs'
                        : 'bg-[#F8F6F1] dark:bg-[#161D2B] text-slate-800 dark:text-slate-200 border border-[#EAE6DF] dark:border-white/5 rounded-tl-xs'
                    }`}
                  >
                    {formatTextWithBold(msg.text)}
                  </div>

                  {/* Property Card Detail preview if attached to message */}
                  {msg.propertyCard && (
                    <div className="p-3 rounded-xl bg-white dark:bg-[#192233] border border-[#EAE6DF] dark:border-white/10 shadow-xs flex items-center gap-3">
                      <Image
                        src={msg.propertyCard.imageUrl}
                        theme={msg.propertyCard.visualTheme}
                        alt={msg.propertyCard.title}
                        className="w-16 h-14 rounded-lg object-cover shrink-0"
                        containerClassName="w-16 h-14 rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-[#8B6D33] dark:text-[#C5A880] block truncate">
                          {msg.propertyCard.type} · {msg.propertyCard.locality}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {msg.propertyCard.title}
                        </h4>
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block">
                          {msg.propertyCard.price}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Proactive Action Options (Buttons) inside the message */}
                  {msg.actionOptions && msg.actionOptions.length > 0 && (
                    <div className="flex flex-col gap-1.5 pt-1">
                      {msg.actionOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={opt.action}
                          className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-semibold transition-all flex items-center justify-between gap-2 shadow-2xs ${
                            opt.primary
                              ? 'bg-[#8B6D33] text-white hover:bg-[#785D2A] dark:bg-[#C5A880] dark:text-[#0B0E14] dark:hover:bg-[#D4B78D]'
                              : 'bg-white dark:bg-[#1A2336] text-slate-800 dark:text-slate-200 border border-[#DDD7CD] dark:border-white/10 hover:border-[#8B6D33]/50 dark:hover:border-[#C5A880]/50 hover:bg-[#F8F6F1] dark:hover:bg-[#202B42]'
                          }`}
                        >
                          <span className="truncate">{opt.label}</span>
                          <ArrowRight className="w-3 h-3 shrink-0 opacity-70" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Render Suggested Property Cards if any */}
                  {msg.recommendedProperties && msg.recommendedProperties.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Suggested Properties in Gwalior:
                      </span>
                      {msg.recommendedProperties.map((prop) => (
                        <div
                          key={prop.id}
                          className="p-2.5 rounded-xl bg-white dark:bg-[#1B2436] border border-[#EAE6DF] dark:border-white/10 flex items-center gap-3 shadow-xs hover:border-[#8B6D33]/40 dark:hover:border-[#C5A880]/40 transition-colors"
                        >
                          <Image
                            src={prop.imageUrl}
                            theme={prop.visualTheme}
                            alt={prop.title}
                            className="w-14 h-12 rounded-lg object-cover shrink-0"
                            containerClassName="w-14 h-12 rounded-lg shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] uppercase tracking-wider font-bold text-[#8B6D33] dark:text-[#C5A880]">
                              {prop.type} · {prop.locality}
                            </span>
                            <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                              {prop.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                onClick={() => {
                                  onViewProperty(prop);
                                  onToggle();
                                }}
                                className="text-[10px] font-bold text-[#8B6D33] dark:text-[#C5A880] hover:underline flex items-center gap-0.5"
                              >
                                View Details <ArrowRight className="w-2.5 h-2.5" />
                              </button>
                              <span className="text-slate-300 dark:text-slate-700">·</span>
                              <button
                                onClick={() => handleInitiateAvailabilityCheck(prop)}
                                className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                              >
                                Availability
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="block text-[9px] text-slate-400 px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500">
                <div className="w-6 h-6 rounded-full bg-[#8B6D33]/15 dark:bg-[#C5A880]/20 flex items-center justify-center text-[#8B6D33] dark:text-[#C5A880]">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl bg-[#F8F6F1] dark:bg-[#161D2B] border border-[#EAE6DF] dark:border-white/5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B6D33] dark:bg-[#C5A880] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B6D33] dark:bg-[#C5A880] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B6D33] dark:bg-[#C5A880] animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ / Prompt Chips Bar */}
          <div className="px-3 py-2 bg-[#FAF8F5] dark:bg-[#131A27] border-t border-[#EAE6DF] dark:border-white/5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {[
              '🔍 Available in Gwalior',
              '📅 Schedule Site Visit',
              '🏗️ Construction Planning',
              '🏢 Commercial Showrooms',
              '📍 Airport Road Plots',
              '📞 Contact & WhatsApp',
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (q.includes('Schedule Site Visit') && currentPage === 'property-detail' && currentProperty) {
                    handleInitiateVisitScheduling(currentProperty);
                  } else if (q.includes('Available in Gwalior')) {
                    handleGeneralAvailabilityFlow();
                  } else {
                    handleSendMessage(q);
                  }
                }}
                disabled={isLoading}
                className="shrink-0 text-[10px] font-medium px-2.5 py-1 rounded-full bg-white dark:bg-[#1A2234] hover:bg-[#F2EFE8] dark:hover:bg-[#232D42] text-slate-700 dark:text-slate-300 border border-[#DDD7CD] dark:border-white/10 transition-colors whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white dark:bg-[#0E131E] border-t border-[#EAE6DF] dark:border-white/10 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                currentPage === 'property-detail' && currentProperty
                  ? `Ask about availability, visit timing, price...`
                  : 'Ask about Gwalior properties, construction...'
              }
              disabled={isLoading}
              className="flex-1 text-xs bg-[#FAF8F5] dark:bg-[#161D2B] text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl border border-[#DDD7CD] dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-[#8B6D33] dark:focus:ring-[#C5A880] placeholder-slate-400"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-xl bg-[#8B6D33] hover:bg-[#785D2A] dark:bg-[#C5A880] dark:hover:bg-[#D4B78D] text-white dark:text-[#0B0E14] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
