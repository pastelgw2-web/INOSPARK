
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  /**
   * Analyzes an innovation idea to suggest categories and technical skills needed.
   */
  async analyzeInnovation(title: string, description: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this innovation project: 
        Title: ${title}
        Description: ${description}
        
        Provide:
        1. A concise professional tagline.
        2. A list of 3-5 technical skills required for volunteers.
        3. A brief feasibility score (0-100).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tagline: { type: Type.STRING },
              requiredSkills: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              feasibilityScore: { type: Type.NUMBER }
            }
          }
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return null;
    }
  },

  /**
   * Matches a volunteer's skills to available projects.
   */
  async matchVolunteer(skills: string[], projectDescriptions: string[]) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Given these user skills: ${skills.join(", ")}, 
        And these project descriptions: ${projectDescriptions.join(" || ")},
        Rank the projects by matching relevance and explain why briefly.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Matching Error:", error);
      return "Match analysis currently unavailable.";
    }
  }
};
