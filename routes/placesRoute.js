const express = require("express");
const cors = require("cors");
const router = express.Router();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const Place = require("../models/place");
router.get("/getallplaces", cors(corsOptions), async (req, res) => {
  try {
    const places = await Place.find({});
    res.send(places);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
module.exports = router;
