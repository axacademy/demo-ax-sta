import { GoogleGenAI } from "@google/genai";
import type { CompanyProfile, ParsedStrategy } from "../types";
import { getPromptForStep } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStepContent = async (step: number, profile: CompanyProfile, history: ParsedStrategy): Promise<string> => {
  const prompt = getPromptForStep(step, profile, history);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error(`Error generating content for step ${step} with Gemini API:`, error);
    throw new Error("Failed to communicate with the AI model.");
  }
};