const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");

router.post("/", scoreController.runScoring);
router.get("/results", scoreController.getResults);
router.get("/results/export", scoreController.exportCSV);

module.exports = router;
