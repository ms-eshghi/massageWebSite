import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Divider, Flex, Tag } from 'antd';

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  console.log(user?._id);
  
  const [bookings, setbokings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setloading(true)
        const data   = await axios.post("/api/bookings/getbookingsbuyuserid", {
          userid: user?._id,
          
        });
        console.log("API response:",data);
        console.log("Bookings received:", data.data.booking);
        setbokings(data.data.bookings || []);
        setloading(false)
        console.log("API response:", data);
if (!data.bookings || data.bookings.length === 0) {
  console.warn("No bookings found for this user");
}
if (data.bookings && data.bookings.length > 0) {
  setbokings(data.bookings);
} else {
  console.warn("No bookings found in response");
}
      } catch (error) {
        console.log(error);
        setloading(false)
        seterror(error)
      }
    };
    fetchBookings();
  }, []);
  //cancelbooking
async function cancelBooking(bookingid, placeid){
  try {
    setloading(true)

    // Log the values being sent
    console.log("Booking ID:", bookingid);
    console.log("Place ID:", placeid);

    const result=await( axios.post("/api/bookings/cancelbooking",{bookingid,placeid}))
    console.log(result.data);
    setloading(false)
    alert("Your bookind has been cancelled");
      window.location.href = '/profile';
    
    
  } catch (error) {
    console.log("Error canceling booking:",error);
    setloading(false)
    
    
  }

}
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {error && <Error message={error} />}
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="bs">
                <p><b>Booking Id:</b> {booking._id}</p>
              <p><b>Name:</b> {booking.place}</p>
                <p><b>From Date: </b>{booking.fromdate}</p>
                <p><b>From Time:</b> {booking.fromtime}</p>
                <p><b>Amount :</b> {booking.totalamount}</p>
                <p><b>Status  </b>{""}
                {booking.status=='cancelled' ?    (<Tag color="red">Cancelled</Tag>):(<Tag color="green">Confirmed</Tag>)}

                </p>
                 {booking.status!=='cancelled'&& (<div className="text-right">
                  <button className="btn btn-primary" onClick={()=>{cancelBooking(booking._id,booking.placeid)}}>Cancel Booking</button>
                </div>)}
                
            
              </div>
            )) 
            
          ) : (
            !loading && <h2>No bookings found</h2>
          )}
        </div>
      </div>
    </div>
  );
}

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};

  useEffect(() => {
    if (!user || !user.name) {
      window.location.href = "/login";
    }
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Profile",
      children: (
        <div className="ml-3 mt-3">
          <h1>My Profile</h1>
          <br />
          <h1>Name: {user?.name}</h1>
          <h1>Email: {user?.email}</h1>
          <h1>isAdmin: {user?.isAdmin ? "Yes" : "No"}</h1>
        </div>
      ),
    },
    {
      key: "2",
      label: "Bookings",
      children: <MyBookings />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default Profilescreen;
