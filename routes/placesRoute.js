const express = require("express");
const cors = require("cors");
const router = express.Router();

const corsOptions = {
  origin: "https://massagewebsite.netlify.app",
  optionsSuccessStatus: 200,
};

const Place = require("../models/place");
router.get("/getallplaces", cors(corsOptions), async (req, res) => {
  try {
    const places = await Place.find({});
    console.log({ places });
    res.send(places);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getplacebyid", cors(corsOptions), async (req, res) => {
  const placeid = req.body.placeid;
  try {
    const place = await Place.findOne({ _id: placeid });
    res.send(place);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addplace", cors(corsOptions), async (req, res) => {
  try {
    const newplace = new Place(req.body);
    await newplace.save();
    res.send("New Place Added Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});
module.exports = router;
