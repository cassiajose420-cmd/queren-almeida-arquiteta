import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const CACHE_KEY = 'ai_generated_bio_images';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

interface CachedImages {
  images: string[];
  timestamp: number;
}

export async function generateBioImages() {
  // 1. Check Cache
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: CachedImages = JSON.parse(cached);
      const now = Date.now();
      if (now - parsed.timestamp < CACHE_EXPIRY) {
        console.log("Using cached AI images.");
        return parsed.images;
      }
    }
  } catch (e) {
    console.warn("Failed to read from cache:", e);
  }

  // 2. Check API Key
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY is missing. Skipping AI image generation.");
    return null;
  }

  try {
    const response1 = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A professional female architect with curly hair, wearing elegant business casual attire, sitting in a modern, bright architectural studio. She is smiling and showing a digital project on a tablet to an unseen client. The background is a stylish office with architectural models and sketches. High quality, professional photography, warm lighting.',
          },
        ],
      },
    });

    let img1 = "";
    for (const part of response1.candidates[0].content.parts) {
      if (part.inlineData) {
        img1 = `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    const response2 = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'Close-up shot of an architect\'s workspace. A pair of hands is carefully arranging material samples like wood, marble, and high-quality fabrics on a mood board next to a detailed architectural blueprint and a professional pen. Soft natural light, shallow depth of field, focusing on the textures of the materials. Elegant and professional.',
          },
        ],
      },
    });

    let img2 = "";
    for (const part of response2.candidates[0].content.parts) {
      if (part.inlineData) {
        img2 = `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    const result = [img1, img2];

    // 3. Save to Cache
    if (img1 && img2) {
      const cacheData: CachedImages = {
        images: result,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    }

    return result;
  } catch (error: any) {
    // Handle 429 specifically
    if (error?.status === "RESOURCE_EXHAUSTED" || error?.message?.includes("429")) {
      console.warn("Gemini API quota exceeded. Falling back to default images.");
    } else {
      console.error("Error generating AI images:", error);
    }
    return null;
  }
}
