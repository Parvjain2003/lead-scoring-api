const storage = require("../services/dataServices");

exports.createOffer = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body || !body.name) {
      return res.status(400).json({ error: "Offer name required" });
    }
    await storage.saveOffer(body);
    res.json({ ok: true, offer: body });
  } catch (err) {
    next(err);
  }
};

exports.getOffer = async (req, res, next) => {
  try {
    const offer = await storage.getOffer();
    res.json({ offer });
  } catch (err) {
    next(err);
  }
};
