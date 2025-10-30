const scoringService = require("../services/scoringService");
const storage = require("../services/dataServices");
const Papa = require("papaparse");
const fs = require("fs").promises;
const path = require("path");

exports.runScoring = async (req, res, next) => {
  try {
    const offers = await storage.getOffer();
    if (!offers)
      return res
        .status(400)
        .json({ error: "No offer found. POST /offer first." });

    const leads = await storage.getLeads();
    if (!leads || leads.length === 0)
      return res
        .status(400)
        .json({ error: "No leads uploaded. POST /leads/upload first." });

    const results = await scoringService.scoreLeads(leads, offers);
    await storage.saveResults(results);
    res.json({ ok: true, count: results.length, results });
  } catch (err) {
    next(err);
  }
};

exports.getResults = async (req, res, next) => {
  try {
    const results = await storage.getResults();
    res.json(results || []);
  } catch (err) {
    next(err);
  }
};

exports.exportCSV = async (req, res, next) => {
  try {
    const results = await storage.getResults();
    const csv = Papa.unparse(results, { header: true });
    res.header("Content-Type", "text/csv");
    res.attachment("results.csv");
    res.send(csv);
  } catch (err) {
    next(err);
  }
};
