require("dotenv").config();

const express = require("express");
const cors = require("cors");
const offerRoutes = require("./routes/offerRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/offer", offerRoutes);

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
