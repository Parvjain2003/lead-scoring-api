const csvParser = require("../utils/csvParser");
const storage = require("../services/dataServices");

exports.uploadCSV = async (req, res, next) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "CSV file required in field file" });

    const leads = await csvParser.parseCsvFile(req.file.path);

    const normalized = leads.map((r) => ({
      id: r.id || null,
      name: r.name || "",
      role: r.role || "",
      company: r.company || "",
      industry: r.industry || "",
      location: r.location || "",
      linkedin_bio: r.linkedin_bio || "",
    }));

    await storage.saveLeads(normalized);
    res.json({ count: normalized.length });
  } catch (err) {
    next(err);
  }
};

exports.getLeads = async (req, res, next) => {
  try {
    const leads = await storage.getLeads();
    res.json({ leads });
  } catch (err) {
    next(err);
  }
};
