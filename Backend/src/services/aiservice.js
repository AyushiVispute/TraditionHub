import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);


export async function generateGuideResponse(place, question) {
  // Support both a full Place object and a simple place name
  const placeData =
    typeof place === "string"
      ? { title: place }
      : place || {};

  const placeName =
    placeData.title || placeData.name || "Unknown";

  const prompt = `
You are TraditionAI, a cultural travel assistant for TraditionHub.

You are helping a traveler who is currently exploring this place:

Place Name: ${placeName}
Location: ${placeData.location || "Not provided"}
State: ${placeData.state || "Not provided"}
Category: ${placeData.category || "Not provided"}
Deity: ${placeData.deity || "Not provided"}
Description: ${placeData.description || "Not provided"}

User Question:
${question}

Instructions:
- Answer specifically about the place provided above.
- Give accurate cultural and historical information.
- Explain traditions and rituals respectfully.
- Mention visitor etiquette when relevant.
- If the question is about nearby experiences, only suggest information supported by the provided context.
- Do not invent specific facts, prices, timings, events, or local services.
- If information is unavailable, clearly say that you don't have enough information.
- Keep the answer friendly, useful, and under 200 words.
- Do not use markdown code fences.
`;

  const models = [
    "gemini-2.5-flash",
    "gemini-1.5-flash",
  ];

  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
      });

      const result = await model.generateContent(prompt);

      return result.response.text().trim();
    } catch (error) {
      console.error(
        `${modelName} failed:`,
        error.message
      );
    }
  }

  return `I'm having trouble reaching TraditionAI right now.

I couldn't generate a reliable answer about ${placeName} at the moment.

Please try again in a few moments.`;
}