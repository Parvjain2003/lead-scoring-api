const storage = require("../services/dataServices");
const { validateOffer } = require("../utils/offerValidator");

exports.createOffer = async (req, res, next) => {
  try {
    const error = validateOffer(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    await storage.saveOffer(req.body);
    res.json({ offer: req.body });
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
