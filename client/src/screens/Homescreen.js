import React, { useState, useEffect } from "react";
import axios from "axios";
import Place from "../components/Place";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import dayjs from "dayjs";

function Homescreen() {
  const [places, setPlaces] = useState([]);
  const [duplicateplaces, setduplicateplaces] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();

  const [fromdate, setfromdate] = useState(null);
  const [fromtime, setfromtime] = useState(null);

  const timeFormat = "HH:mm";
  const dateFormat = "DD-MM-YYYY";

  const [searchkey, setsearchkey] = useState("");
  const [type, settype] = useState("all");
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setloading(true);
        // Fetch data from backend API
        const data = (
          await axios.get(
            "https://massagewebsite.onrender.com/api/places/getallplaces"
          )
        ).data;
        console.log(data);
        setPlaces(data);
        setduplicateplaces(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.error(`Error fetching places: ${error.message}`);
        setloading(false);
      }
    };

    fetchPlaces();
  }, []);

  const filterPlaces = (selectedDate, selectedTime) => {
    if (!selectedDate || !selectedTime) {
      setPlaces(duplicateplaces);
      return;
    }

    const filteredPlaces = duplicateplaces.filter((place) => {
      if (place.currentbookings.length === 0) {
        return true; // No bookings, so the place is available
      }

      return !place.currentbookings.some((booking) => {
        return (
          booking.fromdate === selectedDate && booking.fromtime === selectedTime
        );
      });
    });

    setPlaces(filteredPlaces);
  };

  const handleDateChange = (date, dateString) => {
    setfromdate(dateString);
    console.log("Selected Date:", dateString); // Log selected date
    filterPlaces(dateString, fromtime);
  };

  const handleTimeChange = (time, timeString) => {
    setfromtime(timeString);
    console.log("Selected Time:", timeString); // Log selected time
    filterPlaces(fromdate, timeString);
  };

  function filterBysearch() {
    const templaces = duplicateplaces.filter((place) =>
      place.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setPlaces(templaces);
  }

  function filterByType(e) {
    settype(e);
    if (e !== "all") {
      const templaces = duplicateplaces.filter(
        (place) => place.type.toLowerCase() == e.toLowerCase()
      );
      setPlaces(templaces);
    } else {
      setPlaces(duplicateplaces);
    }
  }
  return (
    <div className="container">
      <p className="textbooking" style={{ color: "black" }}>
        Please select date and time to show you available places
      </p>
      <div className="row bs">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <DatePicker format={dateFormat} onChange={handleDateChange} />
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12">
          <TimePicker format={timeFormat} onChange={handleTimeChange} />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <input
            type="text"
            className="'form-control"
            placeholder="search places"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBysearch}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="swedish">Swedish</option>
            <option value="thai">Thai</option>
            <option value="shiatsu">Shiatsu</option>
            <option value="face massage">Face massage</option>
            <option value="hot stone">Hot stone</option>
            <option value="four hands">Four hands</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-3">
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : (
          places.map((place) => (
            <div className="col-md-14 mt-3" key={place._id}>
              <Place place={place} fromdate={fromdate} fromtime={fromtime} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;
// if (!localStorage.getItem("currentUser")) {
//   // If no user is logged in, redirect to login page
//   window.location.href = "/login";
//   return; // Prevent further booking logic from executing
// }
