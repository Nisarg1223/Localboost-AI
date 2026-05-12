import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/config.js";

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

const generateSEOKeywords = async ({ businessName, location, category }) => {
  const prompt = `
    Generate 15 local SEO keywords for an Indian small business.
    Business: ${businessName}
    Location: ${location}
    Category: ${category}

    Rules:
    - Include Hindi/Hinglish keywords
    - Include "near me" variations
    - Include location-specific keywords
    - Return ONLY a JSON array of 15 strings, nothing else
  `;

  try {
    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();
    const cleaned = raw.replace(/```json|```/gi, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("[Gemini Error]:", err.message);
  }
};

const generatePosts = async ({ businessName, location, category }) => {
  const prompt = `
    Generate 10 local SEO posts for an Indian small business.
    Business: ${businessName}
    Location: ${location}
    Category: ${category}
    Rules:
    - Include Hindi/Hinglish keywords
    - Include "near me" variations
    - Include location-specific keywords
    - Return ONLY a JSON array of 10 strings, nothing else
    `
    try {
    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();
    const cleaned = raw.replace(/```json|```/gi, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("[Gemini Error]:", err.message);
  }

}

const analyzeCompetitor = async ({ businessName, location, category }) =>{
    const prompt = `
    You are a local business analyst for Indian small businesses.
 
    Give competitor analysis for:
    Business: ${businessName}
    Location: ${location}
    Category: ${category}
 
    Return exactly 3 likely local competitors this business faces in this Indian locality.
    For each competitor return:
    - name: a realistic local business name for this area
    - type: what kind of competitor (e.g. "Nearby same-category shop")
    - theirStrength: what they are likely doing well on Google Maps
    - yourOpportunity: one gap ${businessName} can exploit
    - actionTip: one specific action ${businessName} should take this week to outrank them
 
    Return ONLY a valid JSON array of 3 objects, nothing else.
  `;
 
  try {
    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();
    const cleaned = raw.replace(/```json|```/gi, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("[Gemini Competitor Error]:", err.message);
    return [
      {
        name: "Local Competitor",
        type: "Nearby same-category shop",
        theirStrength: "Has more Google reviews",
        yourOpportunity: "You can post more regularly on Google Business",
        actionTip: "Add 5 photos and post a weekly offer on Google Business Profile",
      },
    ];
  }
}

const generateWhatsAppPost = async ({ businessName, location, category }) => {
  const prompt = `
    You are a WhatsApp marketing expert for Indian local businesses.
 
    Write 1 WhatsApp broadcast post for:
    Business: ${businessName}
    Location: ${location}
    Category: ${category}
 
    Rules:
    - Start with a warm greeting in Hinglish
    - Mention the business name and location naturally
    - Write a short offer or update (1-2 lines)
    - End with a soft call to action (visit, call, reply)
    - Add 4-5 relevant hashtags at the end
    - Use 2-3 relevant emojis throughout
    - Keep it under 100 words
    - Tone: friendly, local, trustworthy — not spammy
 
    Return ONLY the raw post text as a plain string. No JSON, no explanation.
  `;
 
  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error("[Gemini WhatsApp Error]:", err.message);
    return `Namaste! 🙏 ${businessName} mein aapka swagat hai!\n\nIs hafte khaas offers hain — aaj hi visit karein ya call karein.\n\n📍 ${location}\n\n#${category.replace(/\s+/g, "")} #${location.replace(/\s+/g, "")} #LocalBusiness #IndiaFirst`;
  }
};

export { generateSEOKeywords, generatePosts ,analyzeCompetitor, generateWhatsAppPost }; 
