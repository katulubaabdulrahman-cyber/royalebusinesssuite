
import { GoogleGenAI, Type } from "@google/genai";
import { Product, Sale } from '../types';

export const getBusinessAdvice = async (products: Product[], sales: Sale[]): Promise<string> => {
  // Always use {apiKey: process.env.API_KEY} directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const context = `
    Current Inventory: ${JSON.stringify(products.map(p => ({ name: p.name, qty: p.quantity, threshold: p.lowStockThreshold })))}
    Recent Sales: ${JSON.stringify(sales.slice(-10).map(s => ({ total: s.totalAmount, date: new Date(s.timestamp).toLocaleDateString() })))}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional business consultant for a small retail shop in Uganda. Based on this data, provide 3 short, actionable tips to improve sales or stock management. Keep it practical. Data: ${context}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    // Use .text property to get the string result
    return response.text || "Unable to generate advice at this moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Keep monitoring your low stock items and ensure high-margin products are always available.";
  }
};

export const chatWithRoyale = async (history: { role: string, parts: { text: string }[] }[], message: string): Promise<string> => {
  // Create instance right before API call to ensure valid key usage
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: "You are Royale Assistant, a helpful business partner for shop owners. You specialize in retail management, inventory optimization, and growth strategies for small businesses in emerging markets.",
      }
    });
    
    // chat.sendMessage returns GenerateContentResponse; use .text property
    const response = await chat.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I am currently offline. Please try again later.";
  }
};
