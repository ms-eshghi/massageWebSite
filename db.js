const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoURL = process.env.MONGO_CONNECTION; // Mo
// Replace this with your MongoDB connection string
mongoose.connect(mongoURL);
console.log(mongoURL);
mongoose.connect(mongoURL, {
  useNewUrlParser: true, // Ensures the use of the new MongoDB connection string parser.
  useUnifiedTopology: true, // Enables the new unified topology engine.
});
var connection = mongoose.connection;
connection.on("error", () => {
  console.log("mongo db connection failed");
});
connection.on("connected", () => {
  console.log("mongo DB connection successful");
});

module.exports = mongoose;
