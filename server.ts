import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI on the server side
// Uses model gemini-3.8-flash for text/chat per gemini-api skill
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `You are the official Virtual Real Estate & Construction Assistant for ADVANCE PROPERTY CONSTRUCTION in Gwalior, Madhya Pradesh, India.
Business Profile:
- Name: ADVANCE PROPERTY CONSTRUCTION
- Category: Property Consultant / Real Estate / Property Construction
- Public Phone / WhatsApp: +91 86026 40017
- Location: Gwalior, Madhya Pradesh, India
- Primary Locality Focus in Gwalior: City Center Extension, VIP Road, Thatipur, Morar Corridor, Lashkar, Maharaj Bada vicinity, Patel Nagar, Airport Road corridor.
- Services Offered:
  1. Property Consultation (Understanding client requirements & matching verified opportunities in Gwalior)
  2. Property Buying Assistance (Accompanied inspections, price and location clarity)
  3. Property Selling Assistance (Professional asset positioning, qualified buyer screening)
  4. Plot & Land Consultation (Residential plots, commercial land parcels, demarcations, approach road verification)
  5. Commercial Property (Retail showrooms, corporate office floors, high footfall corridors)
  6. Construction Solutions (Residential villas, private bungalows, civil coordination, structural guidance)
  7. Property Investment Guidance (Gwalior growth belts and civic transit corridors)

Tone & Guidelines:
- Highly polite, professional, concise, trustworthy, and knowledgeable.
- Use natural Indian English phrasing suitable for Gwalior real-estate clientele.
- Answer property questions clearly. Always mention that users can call or WhatsApp +91 86026 40017 or use the 'Enquire Now' button for personalized assistance.
- Never invent fake RERA numbers, fake government guarantees, or speculative ROI claims.
- Keep responses concise (2-4 short paragraphs or bullet points).`;

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    if (ai) {
      // Build conversation contents
      const conversationContents: any[] = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item.sender === 'user') {
            conversationContents.push({ role: 'user', parts: [{ text: item.text }] });
          } else if (item.sender === 'assistant') {
            conversationContents.push({ role: 'model', parts: [{ text: item.text }] });
          }
        }
      }
      conversationContents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: conversationContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const reply = response.text || 'Thank you for reaching out to Advance Property Construction. For immediate property assistance or on-site inspections in Gwalior, please call or WhatsApp us at +91 86026 40017.';
      return res.json({ reply });
    } else {
      // Graceful fallback if GEMINI_API_KEY is not configured yet
      return res.json({
        fallback: true,
        reply: generateRuleBasedReply(message),
      });
    }
  } catch (error: any) {
    console.error('Gemini API error in /api/chat:', error);
    return res.json({
      fallback: true,
      reply: generateRuleBasedReply(message),
    });
  }
});

// Rule-based fallback helper for Advance Property Construction
function generateRuleBasedReply(input: string): string {
  const lower = input.toLowerCase();

  // Availability & site visit handling
  if (lower.includes('availab') || lower.includes('status') || lower.includes('vacant') || lower.includes('ready')) {
    return `Yes! Our featured properties in Gwalior—including luxury villas in City Centre Extension, prime commercial spaces near Maharaj Bada, and residential plots on Airport Road—are currently open for inspection and active acquisition.

Would you like to check the availability of a specific property or book an accompanied site visit? You can click the "Schedule Visit" button in this chat or call our coordinator at **+91 86026 40017**.`;
  }

  if (lower.includes('visit') || lower.includes('schedule') || lower.includes('inspect') || lower.includes('walkthrough') || lower.includes('timing')) {
    return `We offer accompanied site visits 7 days a week across Gwalior (10:00 AM to 6:30 PM). Our local consultant will meet you at the site, guide you through demarcations, verify approach roads, and answer technical questions.

Please let us know your preferred date/time or message us directly on WhatsApp at **+91 86026 40017** to reserve your inspection pass.`;
  }

  if (lower.includes('contact') || lower.includes('phone') || lower.includes('number') || lower.includes('call') || lower.includes('whatsapp')) {
    return `You can reach ADVANCE PROPERTY CONSTRUCTION directly by calling or messaging on WhatsApp at **+91 86026 40017**. We are based in Gwalior, Madhya Pradesh, and provide property guidance across the region.`;
  }

  if (lower.includes('villa') || lower.includes('house') || lower.includes('home') || lower.includes('residential')) {
    return `We assist with residential properties across Gwalior, including luxury independent villas in City Centre Extension, spacious 3 BHK apartments in Lashkar & Morar, and turnkey private residences. You can browse our "Properties" page or contact us at **+91 86026 40017** to discuss your exact criteria.`;
  }

  if (lower.includes('commercial') || lower.includes('shop') || lower.includes('office') || lower.includes('showroom')) {
    return `Advance Property Construction assists with high-visibility commercial spaces, including retail showrooms and office suites in busy corridors like Maharaj Bada and Jhansi Road in Gwalior. Would you like to schedule an inspection or receive property details? Contact us at **+91 86026 40017**.`;
  }

  if (lower.includes('plot') || lower.includes('land')) {
    return `We offer consultation for residential and commercial plots in developing belts of Gwalior, such as Airport Road, Thatipur Extension, and Morar corridor. We help assess approach roads, demarcations, and location connectivity. Reach us at **+91 86026 40017** for available plot options.`;
  }

  if (lower.includes('construct') || lower.includes('build') || lower.includes('renovate')) {
    return `Advance Property Construction provides turnkey residential and commercial construction coordination in Gwalior. We assist from architectural planning and spatial layout advisory to civil engineering execution and structural supervision. Speak with our team directly at **+91 86026 40017**.`;
  }

  if (lower.includes('consult') || lower.includes('meeting') || lower.includes('appointment')) {
    return `You can schedule a one-on-one consultation with our property advisors. Click the "Schedule a Consultation" button on this website or WhatsApp us at **+91 86026 40017** to set up a convenient time.`;
  }

  return `Welcome to Advance Property Construction! We provide specialized property consulting, real estate discovery, and construction solutions across Gwalior, Madhya Pradesh. How can we help you today? You can ask about our residential villas, commercial spaces, plots, construction services, or call us directly at **+91 86026 40017**.`;
}

// Dev server or Production server setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Advance Property Construction server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
