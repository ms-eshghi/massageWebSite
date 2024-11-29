const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Place = require("../models/place");
const { route } = require("./placesRoute");
const { model } = require("mongoose");
const cors = require("cors");
const moment = require("moment");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

router.post("/bookplace", cors(corsOptions), async (req, res) => {
  const { place, userid, fromdate, fromtime, totalamount } = req.body;

  try {
    const newbooking = new Booking({
      place: place.name,
      placeid: place._id,
      userid,
      fromdate,
      fromtime,
      totalamount,
      transactionid: "1234",
    });
    const booking = await newbooking.save();

    const placetemp = await Place.findOne({ _id: place._id });
    placetemp.currentbookings.push({
      bookingid: booking._id,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      fromtime: moment(fromtime).format("HH:mm"),
      userid: userid,
      status: booking.status
    });

    await placetemp.save()
    res.send("Room Booked Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});
module.exports = router;
