require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

function buildPrompt({ lead, offer }) {
  return `
You are a sales-ready assistant. Given the product/offer and a single prospect, classify their buying intent into one of three labels: High, Medium, Low.

Product/Offer:
Name: ${offer.name}
Value props: ${offer.value_props ? offer.value_props.join("; ") : ""}
Ideal use cases / ICP: ${
    offer.ideal_use_cases ? offer.ideal_use_cases.join("; ") : ""
  }
Extra: ${offer.description || ""}

Prospect:
Name: ${lead.name}
Role: ${lead.role}
Company: ${lead.company}
Industry: ${lead.industry}
Location: ${lead.location}
LinkedIn bio: ${lead.linkedin_bio}

Instructions:
1) Output strictly a JSON object with keys: "intent" and "reasoning".
2) "intent" must be exactly one of "High", "Medium", or "Low".
3) "reasoning" must be 1-2 short sentences explaining why.

Example:
{"intent":"High","reasoning":"Role is Head of Growth at a mid-market SaaS, which matches ICP and shows buying authority."}

Now classify the prospect above.
`;
}

async function classifyIntent({ lead, offer }) {
  try {
    const prompt = buildPrompt({ lead, offer });

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        parsed = {
          intent: "Low",
          reasoning: `AI parse error. Raw: ${text.substring(0, 200)}`,
        };
      }
    }

    let intent = parsed.intent || "Low";
    if (!["High", "Medium", "Low"].includes(intent)) intent = "Failure";

    return { intent, reasoning: parsed.reasoning || "" };
  } catch (err) {
    console.error("AI classification error:", err.message || err);
    return { intent: "Failure", reasoning: "AI service error" };
  }
}

module.exports = { classifyIntent };
