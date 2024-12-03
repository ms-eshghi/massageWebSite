import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import "../index.css";

function Bookingscreen() {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [place, setplace] = useState(); // Correct setter function name
  const { placeid, fromdate, fromtime } = useParams(); // Access the route parameter
  const [totalamount, settotalamount] = useState(0);

  useEffect(() => {
    const fetchPlace = async () => {
      
      try {
        setloading(true);
        const response = await axios.post(
          "http://localhost:5000/api/places/getplacebyid",
          { placeid }
        );

        setplace(response.data); // Correct setter usage
        settotalamount(response.data.price);
        setloading(false);
      } catch (error) {
        console.error(error);
        setloading(false);
        seterror(true);
      }
    };

    fetchPlace();
  }, [placeid]);

 async function bookPlace(){
  
  const bookingDetails = {
     place,
     userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
     fromtime,
     totalamount
    };
    
    try {
      const result = await axios.post(
        "http://localhost:5000/api/bookings/bookplace",
        bookingDetails
      );
      console.log(result.data); // Log the success message from the server
      alert("Booking Successful!");
      window.location.href = '/profile'; // Redirect after alert
    } catch (error) {
      console.error("Error booking place:", error);
      alert("Booking failed. Please try again.");
    }

 }
  // async function onToken(token) {
  //   console.log("Payment Token Received:", token);
  //   const bookingDetails = {
  //     place,
  //     userid: JSON.parse(localStorage.getItem("currentUser"))._id,
  //     fromdate,
  //     fromtime,
  //     totalamount,
  //     token,
  //   };
  //   axios
  //     .post("/api/bookings/bookplace", bookingDetails)
  //     .then((response) => {
  //       alert("Payment successful! Booking confirmed.");
  //     })
  //     .catch((error) => {
  //       console.error("Error processing payment:", error);
  //       alert("Payment failed. Please try again.");
  //     });
  // }

  return (
    <div className="m-5">
      {loading && <Loader />}
      {place && (
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-5 justify-content-center">
            <h2>{place.type} Massage</h2>
            <img src={place.imageurl[0]} alt="" className="img-fluid paymentimg" />
          </div>

          <div className="col-md-5 mt-5">
            <div style={{ textAlign: "center" }} className="justify-content-center">
              <h1>
                {" "}
                <b>Booking Details</b>
              </h1>
              <hr />
              <b>
                <p> Address: {place.name}</p>
                <p> Date: {fromdate} </p>{" "}
                {/* Use `fromdate` from `useParams` */}
                <p>Time: {fromtime}</p>
                <p>Total Amount: {totalamount}€ </p>
              </b>
            </div>

                     <div style={{ textAlign: "center" }}>
            <button className="btn btn-primary mt-3" onClick={bookPlace}>Pay Now</button>
              {/* <StripeCheckout
                amount={totalamount * 100}
                token={onToken}
                currency="EUR"
                stripeKey="pk_test_51QQD9rKfgFH8HMsOMoRJxCg1antTUtMQG8aQ5hVW1gklco8hrce9zNd4LbcLgoTVswmQN1wnqWONMHyoMH34fpeG000N7UY66O"
              >
                <button className="btn btn-primary mt-3">Pay Now</button>
              </StripeCheckout> */}
            </div>
          </div>
        </div>
      )}
      {error && <Error />}
    </div>
  );
}

export default Bookingscreen;