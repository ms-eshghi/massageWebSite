const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Place = require("../models/place");
const { route } = require("./placesRoute");
const { model } = require("mongoose");
const cors = require("cors");
const moment = require("moment");
const mongoose = require("mongoose");

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
      fromdate: fromdate,
      fromtime: fromtime,
      userid: userid,
      status: booking.status,
    });
    await placetemp.save();

    res.send("Place Booked Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});
router.post("/getbookingsbuyuserid", async (req, res) => {
  const userid = req.body.userid;

  if (!userid) {
    console.error("No User ID provided");
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const bookings = await Booking.find({ userid });
    console.log("Bookings fetched from DB:", bookings); // Log fetched bookings

    if (bookings.length === 0) {
      console.warn("No bookings found for User ID:", userid);
    }

    res.status(200).send({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(400).json({ error: "Error fetching bookings" });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, placeid } = req.body;

  if (!bookingid || !placeid) {
    return res
      .status(400)
      .json({ error: "Booking ID and Place ID are required" });
  }

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });
    if (!bookingitem) {
      return res.status(404).json({ error: "Booking not found" });
    }

    bookingitem.status = "cancelled";
    await bookingitem.save();

    const place = await Place.findOne({ _id: placeid });

    if (!place || !Array.isArray(place.currentbookings)) {
      throw new Error("Invalid place or currentbookings is not an array");
    }

    const bookings = place.currentbookings;
    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );
    place.currentbookings = temp;

    await place.save();

    res.send("Your booking cancelled successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
module.exports = router;

// const stripe = require("stripe")(
//   "sk_test_51QQD9rKfgFH8HMsO22KAdx4Z7TkUoZiyQRVS5UCiW6HSGx8WrmVQIp3OvkPYxfB9dupXOz0flMYxjzYG9oPhGegv00NwLwZctW"
// );

// try {
//   const customer = await stripe.customers.create({
//     email: token.email,
//     source: token.id,
//   });
//   const payment = await stripe.charges.create(
//     {
//       amount: totalamount * 100,
//       customer: customer.id,
//       currency: "EUR",
//       receipt_email: token.email,
//     },
//     {
//       idempotencykey: uuidv4(),
//     }
//   );

//   if (payment) {

//       const newbooking = new Booking({
//         place: place.name,
//         placeid: place._id,
//         userid,
//         fromdate,
//         fromtime,
//         totalamount,
//         transactionid: "1234",
//       });
//       const booking = await newbooking.save();

//       const placetemp = await Place.findOne({ _id: place._id });
//       placetemp.currentbookings.push({
//         bookingid: booking._id,
//         fromdate: moment(fromdate).format("DD-MM-YYYY"),
//         fromtime: moment(fromtime).format("HH:mm"),
//         userid: userid,
//         status: booking.status,
//       });

//       await placetemp.save();
//       res.send("Room Booked Successfully");

//   }
//   res.send("Payment successful, Your room is booked");
// } catch (error) {
//   return res.status(400).json({ error });
// }
