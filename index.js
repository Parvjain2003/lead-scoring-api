require("dotenv").config();

const express = require("express");
const cors = require("cors");
const offerRoutes = require("./src/routes/offerRoutes");
const leadRoutes = require("./src/routes/leadRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/offer", offerRoutes);
app.use("/leads", leadRoutes);

app.get("/", (req, res) => res.json({ ok: true, msg: "Lead Scoring API" }));

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
