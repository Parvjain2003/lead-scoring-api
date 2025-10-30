const fs = require("fs");
const csv = require("csv-parser");

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
        rows.push(normalized);
      })
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

module.exports = {
  parseCsvFile,
};
