const express = require("express");

const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "https://massagewebsite.netlify.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const dbConfig = require("./db");
const placesRoute = require("./routes/placesRoute");
const usersRoute = require("./routes/usersRoute");

const bookingsRoute = require("./routes/bookingsRoute");

app.use(express.json());

app.use("/api/places", placesRoute);
app.use("/api/users", usersRoute);
app.use(express.json());
app.use("/api/bookings", bookingsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node server started on port ${port}`));
