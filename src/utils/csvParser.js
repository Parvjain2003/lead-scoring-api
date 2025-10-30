const fs = require("fs");
const csv = require("csv-parser");
const { v4: uuidv4 } = require("uuid");

function parseCsvFile(path) {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (data) => {
        // normalize column names to lowercase with underscores
        const normalized = {};
        Object.entries(data).forEach(([k, v]) => {
          const key = k.trim().toLowerCase().replace(/\s+/g, "_");
          normalized[key] = v ? v.trim() : "";
        });
        if (!normalized.id) normalized.id = uuidv4();
        rows.push(normalized);
      })
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

module.exports = {
  parseCsvFile,
};
