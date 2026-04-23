import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface TradeData {
  productName: string;
  executiveSummary: string;
  metrics: {
    volatility: string;
    cycleTime: string;
    demand: string;
  };
  sourcing: {
    country: string;
    cost: string;
    quality: string;
    regulations: string;
    advantages: string[];
  }[];
  markets: {
    country: string;
    competition: string;
    margin: string;
    duties: string;
    regulations: string;
  }[];
  logistics: {
    freight: string[];
    couriers: string[];
    costs: string;
    safety: string[];
  };
  terms: string[];
}

export async function analyzeTradeRoute(prompt: string): Promise<TradeData> {
  const systemPrompt = `You are TradeOS, an expert global trade, import/export, and supply chain consultant.
Analyze the user's prompt regarding importing/exporting a specific product.
Provide detailed, realistic, and up-to-date insights formatted EXACTLY as a JSON object matching the requested schema.
Ensure your advice covers government rules, quality vs price, couriers, margin estimates, and market competition deeply.`;

  const jsonSchemaFormat = `
  {
    "productName": "string (The refined name of the product being analyzed)",
    "executiveSummary": "string (A punchy 2-3 sentence strategic summary of the import/export viability)",
    "metrics": {
      "volatility": "string (e.g. High / 15% fluctuations due to raw material costs)",
      "cycleTime": "string (e.g. 45-60 days end-to-end)",
      "demand": "string (e.g. Strong upward trend in North America)"
    },
    "sourcing": [
      {
        "country": "string",
        "cost": "string (e.g. Low, High, Medium, or specific estimates)",
        "quality": "string",
        "regulations": "string (key govt rules, manufacturing standards needed)",
        "advantages": ["string"]
      }
    ],
    "markets": [
      {
        "country": "string",
        "competition": "string",
        "margin": "string (e.g. 35-50% estimated gross)",
        "duties": "string",
        "regulations": "string (customs rules, certification required)"
      }
    ],
    "logistics": {
      "freight": ["string (e.g. Ocean FCL, Air Freight)"],
      "couriers": ["string (e.g. DHL, FedEx)"],
      "costs": "string (estimated freight charges per TEU/kg)",
      "safety": ["string (transit risks, packaging needs, insurance advice)"]
    },
    "terms": ["string (Recommended Incoterms, payment terms, contracts recommendations)"]
  }`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: [
      systemPrompt,
      "EXPECTED JSON FORMAT (Object only, no markdown wrappers):\n" + jsonSchemaFormat,
      "USER REQUEST:\n" + prompt
    ],
    config: {
      temperature: 0.2,
      responseMimeType: 'application/json',
      tools: [{ googleSearch: {} }]
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  try {
    return JSON.parse(text) as TradeData;
  } catch (e) {
    console.error("Failed to parse JSON", text);
    throw new Error("Failed to parse the trade data. Please try again.");
  }
}
