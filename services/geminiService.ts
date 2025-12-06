import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateCreativeResponse = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key is missing. Please configure the environment.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are Pulse, the AI assistant for CyberSync Studio, a futuristic video editing agency. 
        Your tone is professional yet edgy, cyberpunk, and high-energy. 
        You help creators with video ideas, title suggestions, and explain CyberSync's services (Editing, Thumbnails, Growth Packages).
        Keep responses concise (under 100 words unless asked for more) and use formatting like bullet points where appropriate.
        If asked about pricing, refer them to the Pricing page generally.`,
      }
    });

    return response.text || "I'm having trouble connecting to the grid. Try again later.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection interrupted. Signal lost.";
  }
};
