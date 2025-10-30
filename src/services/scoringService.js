const aiService = require("./aiService");

const aiMapping = { High: 50, Medium: 30, Low: 10 };

async function scoreLeads(leads, offer) {
  const tasks = leads.map(async (lead, index) => {
    await new Promise((res) => setTimeout(res, index * 10000));

    const ruleScore = computeRuleScore(lead, offer);
    const aiResponse = await aiService.classifyIntent({ lead, offer });
    const aiLabel = aiResponse.intent;
    const aiPoints = aiMapping[aiLabel];
    const finalScore = Math.min(100, ruleScore + aiPoints);

    return {
      id: lead.id || null,
      name: lead.name,
      role: lead.role,
      company: lead.company,
      industry: lead.industry,
      location: lead.location,
      linkedin_bio: lead.linkedin_bio,
      intent: aiLabel,
      reasoning: aiResponse.reasoning || "",
      score: finalScore,
    };
  });

  return Promise.all(tasks);
}

function computeRuleScore(lead, offer) {
  let score = 0;

  // role relevance — simple keyword mapping
  const role = (lead.role || "").toLowerCase();
  const decisionMakerKeywords = [
    "ceo",
    "founder",
    "co-founder",
    "cto",
    "cpo",
    "cxo",
    "chief",
    "head of",
    "vp",
    "vice president",
    "director",
  ];
  const influencerKeywords = [
    "manager",
    "lead",
    "principal",
    "senior",
    "associate",
    "analyst",
    "growth",
  ];

  if (decisionMakerKeywords.some((k) => role.includes(k))) score += 20;
  else if (influencerKeywords.some((k) => role.includes(k))) score += 10;

  const industry = (lead.industry || "").toLowerCase();

  const icp = [];
  if (offer.ideal_use_cases && Array.isArray(offer.ideal_use_cases)) {
    offer.ideal_use_cases.forEach((s) => icp.push(String(s).toLowerCase()));
  }
  if (offer.icp_industries && Array.isArray(offer.icp_industries)) {
    offer.icp_industries.forEach((s) => icp.push(String(s).toLowerCase()));
  }

  let matched = false;
  for (const candidate of icp) {
    if (!candidate) continue;
    if (
      industry === candidate ||
      industry.includes(candidate) ||
      candidate.includes(industry)
    ) {
      score += 20;
      matched = true;
      break;
    }
  }
  if (!matched) {
    // adjacent: partial keywords intersection
    const industryTokens = industry.split(/[\s\/,&-]+/).filter(Boolean);
    const icpTokens = icp
      .flatMap((s) => (s ? s.split(/[\s\/,&-]+/) : []))
      .filter(Boolean);
    const intersection = industryTokens.filter((t) => icpTokens.includes(t));
    if (intersection.length > 0) score += 10;
  }

  const allPresent = [
    "name",
    "role",
    "company",
    "industry",
    "location",
    "linkedin_bio",
  ].every((k) => Boolean(lead[k] && String(lead[k]).trim().length > 0));
  if (allPresent) score += 10;

  return score;
}

module.exports = {
  scoreLeads,
  computeRuleScore,
};
