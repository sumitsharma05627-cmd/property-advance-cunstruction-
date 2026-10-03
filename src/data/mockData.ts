import { PropertyItem, ProjectItem, ServiceItem } from '../types';

export const BUSINESS_INFO = {
  name: 'ADVANCE PROPERTY CONSTRUCTION',
  tagline: 'Property & Construction Solutions in Gwalior',
  phone: '+91 86026 40017',
  phoneClean: '918602640017',
  location: 'Gwalior, Madhya Pradesh, India',
  city: 'Gwalior',
  state: 'Madhya Pradesh',
  businessCategory: 'Property Consultant / Real Estate / Property Construction',
  businessHours: 'Add Business Hours',
  defaultWhatsAppMessage: 'Hello Advance Property Construction, I found your website and would like to discuss a property requirement.',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'property-consultation',
    title: 'PROPERTY CONSULTATION',
    shortDesc: 'Help clients understand available property opportunities and identify options according to their requirements.',
    fullDesc: 'Comprehensive advisory to navigate the local Gwalior real estate market. We listen to your specific residential, commercial, or plot criteria and guide you through viable locations, property formats, and market dynamics.',
    deliverables: [
      'Tailored requirement assessment',
      'Location and connectivity analysis',
      'Guidance on property types and spatial layouts',
      'Direct one-on-one consultation with local specialists'
    ],
    iconType: 'compass',
  },
  {
    id: 'buying-assistance',
    title: 'PROPERTY BUYING ASSISTANCE',
    shortDesc: 'Support clients through property discovery, comparison and enquiry.',
    fullDesc: 'End-to-end guidance for buyers seeking homes, plots, or commercial spaces in Gwalior. From screening potential options to arranging site visits and clarifying property parameters.',
    deliverables: [
      'Targeted shortlist aligned with your budget',
      'Accompanied on-ground property viewings',
      'Comparative clarity on location strengths',
      'Direct facilitation of owner and developer discussions'
    ],
    iconType: 'building',
  },
  {
    id: 'selling-assistance',
    title: 'PROPERTY SELLING ASSISTANCE',
    shortDesc: 'Help property owners present their property professionally and connect with potential buyers.',
    fullDesc: 'Assistance for property owners in Gwalior who want to position their residential, commercial, or land asset effectively. We help present your property cleanly and connect you with qualified enquiries.',
    deliverables: [
      'Professional property positioning and presentation',
      'Enquiry screening and buyer alignment',
      'Structured coordination for serious buyers',
      'Transparent communication at every stage'
    ],
    iconType: 'briefcase',
  },
  {
    id: 'plot-land-consultation',
    title: 'PLOT & LAND CONSULTATION',
    shortDesc: 'Support clients looking for plots and land opportunities.',
    fullDesc: 'Specialized assistance for residential plots, commercial land parcels, and development plots across developing and prime sectors of Gwalior.',
    deliverables: [
      'Plot dimension and approach road assessment',
      'Location zoning and sector orientation review',
      'Assistance for individual homebuilders and long-term holders',
      'Boundary and locality inspection guidance'
    ],
    iconType: 'map-pin',
  },
  {
    id: 'commercial-property',
    title: 'COMMERCIAL PROPERTY',
    shortDesc: 'Assistance for clients exploring commercial property opportunities.',
    fullDesc: 'Targeted support for retail showrooms, office suites, shopfronts, and commercial establishments requiring high footfall and connectivity in Gwalior.',
    deliverables: [
      'High-visibility commercial location assessment',
      'Layout suitability for retail, clinic, or corporate office use',
      'Road frontage and parking accessibility review',
      'Negotiation and requirement structuring'
    ],
    iconType: 'trending-up',
  },
  {
    id: 'construction-solutions',
    title: 'CONSTRUCTION SOLUTIONS',
    shortDesc: 'Present construction-related services offered by the business. Keep detailed claims editable until confirmed by the owner.',
    fullDesc: 'End-to-end residential and commercial construction support in Gwalior. [Add specific construction capability details, materials, and turnkey packages here upon owner confirmation].',
    deliverables: [
      'Site planning and spatial layout advisory',
      'Structural coordination and civil construction guidance',
      'Material quality alignment and execution supervision',
      'Turnkey and custom construction options [Add details]'
    ],
    iconType: 'hammer',
  },
  {
    id: 'investment-guidance',
    title: 'PROPERTY INVESTMENT GUIDANCE',
    shortDesc: 'Provide general property-investment consultation based on location, property type and client objectives. Do not promise returns.',
    fullDesc: 'Strategic consultation for clients planning property acquisitions based on location growth corridors, civic infrastructure expansion, and long-term personal utility. No speculative returns promised.',
    deliverables: [
      'Analysis of Gwalior infrastructure and growth sectors',
      'Risk and liquidity considerations per property type',
      'Balanced comparison between plotted land and built assets',
      'Transparent advisory focused on client goals'
    ],
    iconType: 'shield-check',
  },
];

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80';
export const ABOUT_IMAGE_1 = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80';
export const ABOUT_IMAGE_2 = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80';

export const DEMO_PROPERTIES: PropertyItem[] = [
  {
    id: 'prop-demo-1',
    title: 'Contemporary Luxury Independent Villa',
    isDemo: true,
    type: 'Residential',
    purpose: 'Buy',
    location: 'City Centre Extension, Gwalior',
    locality: 'City Centre Extension',
    price: '[Add Price Details]',
    size: '2,850 sq.ft (Approx.)',
    bedrooms: 4,
    bathrooms: 4,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription: 'Modern multi-level independent villa featuring clean architectural lines, spacious family lounge, and private terrace.',
    fullDescription: 'This sample listing illustrates how residential villas will appear on your website. Features modern elevation with wide balconies, open-plan dining and living areas, and landscaped entrance space. Replace this description with your actual property features, RERA registration (if applicable), and pricing.',
    keyFeatures: [
      'Independent multi-level structure',
      'Wide road frontage & parking',
      'Spacious master suites with balconies',
      'Dedicated utility & terrace lounge'
    ],
    amenities: [
      'Covered Parking',
      'Private Terrace',
      'Wide Approach Road',
      'Vastu-Compliant Layout',
      '24/7 Water Supply Provision'
    ],
    architecturalStyle: 'Modern Contemporary Stone & Glass Elevation',
    visualTheme: 'luxury-villa',
  },
  {
    id: 'prop-demo-2',
    title: 'Prime Commercial Retail & Office Floor',
    isDemo: true,
    type: 'Commercial',
    purpose: 'Invest',
    location: 'Maharaj Bada Commercial Corridor, Gwalior',
    locality: 'Maharaj Bada Vicinity',
    price: '[Add Price Details]',
    size: '1,450 sq.ft (Approx.)',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription: 'High-visibility corner commercial space suitable for corporate offices, retail stores, or medical clinics.',
    fullDescription: 'Sample commercial property listing demonstrating commercial presentation. Ideal for business owners or investors seeking rental income opportunities in busy commercial belts of Gwalior. Fully customizable specifications upon providing inventory details.',
    keyFeatures: [
      'Corner frontage with maximum visibility',
      'High footfall commercial corridor',
      'Adaptable open layout for showroom or clinic',
      'Dedicated elevator & generator backup access'
    ],
    amenities: [
      'Main Road Visibility',
      'Customer Parking Access',
      'High Ceiling Clearance',
      'Power Backup Provision',
      'Fire Safety Compliance'
    ],
    architecturalStyle: 'Contemporary Glass Curtain Wall Facade',
    visualTheme: 'commercial-plaza',
  },
  {
    id: 'prop-demo-3',
    title: 'Gated Residential Plot in Developing Corridor',
    isDemo: true,
    type: 'Plot/Land',
    purpose: 'Buy',
    location: 'Airport Road / Morar Corridor, Gwalior',
    locality: 'Airport Road',
    price: '[Add Price Details]',
    size: '1,800 sq.ft (Plot Area)',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription: 'Prime east-facing residential plot in an emerging residential enclave, ready for custom villa construction.',
    fullDescription: 'Sample plot listing. Highlights clear demarcations, wide internal roads, and immediate connectivity to civic transit corridors in Gwalior. Easily editable to specify colony approvals, registry status, and exact dimensions.',
    keyFeatures: [
      'Clear boundary demarcation',
      '30-foot wide internal concrete road',
      'Immediate construction readiness',
      'Direct connectivity to main arterial highway'
    ],
    amenities: [
      'Paved Internal Road',
      'Underground Drainage Layout',
      'Street Lighting Provision',
      'Clear Title Verification'
    ],
    architecturalStyle: 'Demarcated Residential Plot Parcel',
    visualTheme: 'prime-plot',
  },
  {
    id: 'prop-demo-4',
    title: 'Premium 3 BHK Spacious Residential Apartment',
    isDemo: true,
    type: 'Residential',
    purpose: 'Buy',
    location: 'Lashkar West, Gwalior',
    locality: 'Lashkar West',
    price: '[Add Price Details]',
    size: '1,620 sq.ft (Super Built-up)',
    bedrooms: 3,
    bathrooms: 3,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription: 'Thoughtfully planned family residence offering dual balconies, modular kitchen provision, and modern security.',
    fullDescription: 'Sample residential apartment listing showcasing interior layout details, room sizes, and building amenities. Add your actual builder tie-ups, floor numbers, and booking terms here.',
    keyFeatures: [
      'Cross-ventilated living & dining layout',
      'Balconies overlooking open green view',
      'Covered stilt car parking space',
      'Centrally accessible location in Gwalior'
    ],
    amenities: [
      'Automatic Lift',
      'Intercom Security',
      'Rainwater Harvesting',
      'Covered Car Parking'
    ],
    architecturalStyle: 'Modern Multi-Storey Residential Complex',
    visualTheme: 'residential-apartment',
  },
  {
    id: 'prop-demo-5',
    title: 'Commercial Showroom on Arterial Road',
    isDemo: true,
    type: 'Commercial',
    purpose: 'Buy',
    location: 'Jhansi Road Corridor, Gwalior',
    locality: 'Jhansi Road',
    price: '[Add Price Details]',
    size: '2,200 sq.ft (Ground Floor)',
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription: 'Expansive ground floor showroom space with 35-foot glass frontage on a high-traffic transit route.',
    fullDescription: 'Sample listing showing format for standalone showrooms and brand outlets. Replace with verified commercial listings from your portfolio.',
    keyFeatures: [
      '35-foot wide road frontage',
      'Column-free floor plan flexibility',
      'Dedicated front visitor parking',
      'High visibility signage provision'
    ],
    amenities: [
      'Heavy Vehicle Unloading Space',
      '3-Phase Commercial Power Line',
      'High Ceiling Clearance (14 ft)'
    ],
    architecturalStyle: 'Commercial Showroom Facade',
    visualTheme: 'commercial-plaza',
  },
  {
    id: 'prop-demo-6',
    title: 'Corner Commercial / Residential Land Parcel',
    isDemo: true,
    type: 'Plot/Land',
    purpose: 'Invest',
    location: 'Thatipur Extension, Gwalior',
    locality: 'Thatipur Extension',
    price: '[Add Price Details]',
    size: '3,200 sq.ft (Plot Area)',
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription: 'Strategic corner plot offering dual road access, optimal for commercial development or independent multi-family residence.',
    fullDescription: 'Sample land listing illustrating how developmental land parcels can be showcased. Tailor with exact plot coordinates, ownership documentation status, and zoning specifics.',
    keyFeatures: [
      'Dual road corner frontage',
      'Ideal for mixed-use or commercial building',
      'Rapidly appreciating institutional belt',
      'Clear demarcation with boundary posts'
    ],
    amenities: [
      'Dual 40-foot & 30-foot Roads',
      'Direct Highway Access',
      'Immediate Possession Opportunity'
    ],
    architecturalStyle: 'Mixed-Use Land Parcel',
    visualTheme: 'prime-plot',
  }
];

export const DEMO_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-demo-1',
    title: 'The Advance Heights [Sample Project]',
    isDemo: true,
    category: 'Residential',
    location: 'City Centre Extension, Gwalior',
    status: 'In Progress / Demonstration',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    overview: 'This is a sample project profile demonstrating how your past, ongoing, or upcoming residential developments will be presented to clients. Replace all bracketed details with verified project specifications.',
    highlights: [
      'Earthquake-resistant RCC framed structure',
      'Modern architectural elevation with stone cladding',
      'Optimized natural lighting and cross-ventilation',
      'Dedicated basement parking and security perimeter'
    ],
    specifications: [
      { label: 'Project Type', value: 'Residential Apartments / Floors' },
      { label: 'Location', value: 'City Centre Extension, Gwalior' },
      { label: 'Structure', value: 'RCC Frame Structure' },
      { label: 'Status', value: '[Add Project Status]' },
      { label: 'Units', value: '[Add Total Units]' },
      { label: 'RERA Number', value: '[Add RERA Number when applicable]' }
    ],
    visualTheme: 'luxury-villa',
  },
  {
    id: 'proj-demo-2',
    title: 'Advance Trade Centre [Sample Project]',
    isDemo: true,
    category: 'Commercial',
    location: 'Prime Business Sector, Gwalior',
    status: 'Planned / Demonstration',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    overview: 'A demonstration profile for commercial complexes, corporate offices, or retail shopping hubs in Gwalior. Designed to showcase modern glass elevation, customer movement corridors, and parking logistics.',
    highlights: [
      'High-visibility glass facade with energy-efficient glazing',
      'Wide escalators and high-speed passenger elevators',
      'Multi-level parking facility for customers and tenants',
      'Flexible floor plates from 500 sq.ft to 5,000 sq.ft'
    ],
    specifications: [
      { label: 'Project Type', value: 'Commercial Complex / Retail Hub' },
      { label: 'Location', value: 'Commercial Sector, Gwalior' },
      { label: 'Floor Space', value: '[Add Total Built-up Area]' },
      { label: 'Parking', value: '[Add Parking Capacity]' },
      { label: 'Status', value: '[Add Project Status]' }
    ],
    visualTheme: 'commercial-plaza',
  },
  {
    id: 'proj-demo-3',
    title: 'Bespoke Turnkey Villa Construction [Sample]',
    isDemo: true,
    category: 'Construction',
    location: 'Morar / Thatipur Zone, Gwalior',
    status: 'Delivered / Demonstration',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    overview: 'Demonstrating custom private bungalow and residential construction services. Shows your end-to-end execution capabilities from foundation casting to structural completion and architectural finishing.',
    highlights: [
      'Custom architectural floor plans tailored to family needs',
      'Rigorous material testing for cement, steel, and aggregates',
      'Vastu-compliant layout planning and civil execution',
      'On-time milestone delivery with transparent updates'
    ],
    specifications: [
      { label: 'Service Type', value: 'Full Turnkey Civil & Architectural Construction' },
      { label: 'Plot Size', value: '[Add Sample Plot Size]' },
      { label: 'Built-up Area', value: '[Add Built-up Area]' },
      { label: 'Execution Time', value: '[Add Timeline details]' },
      { label: 'Location', value: 'Gwalior, M.P.' }
    ],
    visualTheme: 'construction-site',
  },
  {
    id: 'proj-demo-4',
    title: 'Modern Enclave Residential Colony [Sample]',
    isDemo: true,
    category: 'Upcoming',
    location: 'Emerging Growth Corridor, Gwalior',
    status: 'Upcoming / Demonstration',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    overview: 'Demonstration card for planned plotted residential colonies or township developments in Gwalior. Use this template to announce upcoming opportunities before official launch.',
    highlights: [
      'Planned wide asphalt internal roads with tree avenues',
      'Demarcated plot dimensions with clear corner markings',
      'Provisions for central community park and green zones',
      'Convenient proximity to schools, hospitals, and transit'
    ],
    specifications: [
      { label: 'Development Type', value: 'Plotted Residential Enclave' },
      { label: 'Total Land Area', value: '[Add Land Area]' },
      { label: 'Plot Sizes', value: '[Add Available Dimensions]' },
      { label: 'Launch Phase', value: '[Add Launch Date]' }
    ],
    visualTheme: 'upcoming-development',
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Local Market Understanding',
    description: 'Deep familiarity with Gwalior neighbourhoods, growth corridors, price benchmarks, and emerging infrastructure pockets.',
  },
  {
    title: 'Personalised Property Guidance',
    description: 'Every client has unique family requirements or commercial targets. We tailor our search and advisory strictly around your parameters.',
  },
  {
    title: 'Clear Communication',
    description: 'Transparent updates on property status, documentation realities, and location considerations without exaggeration or ambiguity.',
  },
  {
    title: 'Property Search Support',
    description: 'Save valuable time and avoid unfruitful site visits. We curate options that genuinely match your criteria and arrange organized inspections.',
  },
  {
    title: 'Construction Assistance',
    description: 'From initial site planning to civil construction coordination, we bridge the gap between land acquisition and quality structural execution.',
  },
  {
    title: 'Client-Focused Approach',
    description: 'We prioritize your long-term satisfaction and security over quick transactions, building relationships rooted in integrity and dependability.',
  }
];

export const CLIENT_JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Tell Us Your Requirement',
    description: 'Share your property objectives, preferred Gwalior location, budget parameters, and timeline through a quick call, WhatsApp, or consultation form.',
  },
  {
    step: '02',
    title: 'Explore Suitable Options',
    description: 'We evaluate relevant property opportunities, plotted land, or construction pathways that align precisely with your criteria.',
  },
  {
    step: '03',
    title: 'Discuss & Compare',
    description: 'Inspect short-listed options with on-ground visits. We examine location advantages, road access, and legal documentation together.',
  },
  {
    step: '04',
    title: 'Move Forward With Confidence',
    description: 'Finalize your property decision with clarity, structured negotiation assistance, and clear next steps for acquisition or construction.',
  }
];

export const FAQS = [
  {
    question: 'How can I enquire about a property?',
    answer: 'You can enquire directly by calling our public business number at +91 86026 40017, sending a message on WhatsApp via the buttons throughout this website, or submitting the enquiry form with your contact details and property requirement.',
  },
  {
    question: 'Can you help me find property in Gwalior?',
    answer: 'Yes. Advance Property Construction assists clients in discovering residential villas, apartments, commercial shops, office floors, and residential/commercial plots across major corridors and localities in Gwalior, Madhya Pradesh.',
  },
  {
    question: 'Can I contact you regarding selling my property?',
    answer: 'Yes. If you own a residential, commercial, or plot property in Gwalior that you wish to sell, you can reach out to us with your property details. We help present your asset cleanly and connect with genuine buyers.',
  },
  {
    question: 'Do you assist with commercial properties?',
    answer: 'Yes. We assist clients exploring commercial property opportunities in Gwalior, including high-visibility retail shopfronts, office premises, and commercial land parcels suited for business operations or investment.',
  },
  {
    question: 'Can I discuss construction requirements?',
    answer: 'Yes. In addition to property consulting, we provide construction-related guidance and solutions for clients planning to build residential homes, private bungalows, or commercial structures in Gwalior.',
  },
  {
    question: 'How do I schedule a consultation?',
    answer: 'You can schedule a consultation anytime by clicking "Schedule a Consultation" or "Enquire Now" on this site, or by messaging our team on WhatsApp at +91 86026 40017. We will coordinate a convenient time to discuss your requirement.',
  },
];
