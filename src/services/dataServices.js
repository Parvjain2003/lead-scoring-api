const fs = require("fs").promises;
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const offersFile = path.join(dataDir, "offer.json");
const leadsFile = path.join(dataDir, "leads.json");
const resultsFile = path.join(dataDir, "results.json");

async function ensureDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (e) {}
}

async function saveOffer(offer) {
  await ensureDir();
  await fs.writeFile(offersFile, JSON.stringify(offer, null, 2));
}

async function getOffer() {
  try {
    const str = await fs.readFile(offersFile, "utf8");
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

async function saveLeads(leads) {
  await ensureDir();
  await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2));
}

async function getLeads() {
  try {
    const str = await fs.readFile(leadsFile, "utf8");
    return JSON.parse(str);
  } catch (e) {
    return [];
  }
}

async function saveResults(results) {
  await ensureDir();
  await fs.writeFile(resultsFile, JSON.stringify(results, null, 2));
}

async function getResults() {
  try {
    const str = await fs.readFile(resultsFile, "utf8");
    return JSON.parse(str);
  } catch (e) {
    return [];
  }
}

module.exports = {
  saveOffer,
  getOffer,
  saveLeads,
  getLeads,
  saveResults,
  getResults,
};
