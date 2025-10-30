const fs = require("fs").promises;
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const offersFile = path.join(dataDir, "offer.json");

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

module.exports = {
  saveOffer,
  getOffer,
};
