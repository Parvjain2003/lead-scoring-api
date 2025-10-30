const express = require("express");
const multer = require("multer");
const router = express.Router();
const leadController = require("../controllers/leadController");

const upload = multer({ dest: "tmp/" });

router.post("/upload", upload.single("file"), leadController.uploadCSV);

router.get("/all", leadController.getLeads);

module.exports = router;
