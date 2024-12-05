import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";

import Loader from "../components/Loader";
import Error from "../components/Error";

const items = [
  {
    key: "1",
    label: "Booking",
    children: <Bookings />,
  },
  {
    key: "2",
    label: "Places",
    children: <Places />,
  },
  {
    key: "3",
    label: "Add Place",
    children: <Addplace />,
  },
  {
    key: "4",
    label: "Users",
    children: <Users />,
  },
];

function Adminscreen() {
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser || !JSON.parse(currentUser).isAdmin) {
      window.location.href = "/home";
    }
  }, []);
  return (
    <div className="mt-3 ml-3 bs">
      <h2 className="text-center " style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default Adminscreen;

//bookings list components
export function Bookings() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("https://massagewebsite.onrender.com/api/bookings/getallbookings");
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        {loading && <Loader />}
        {error && <Error message="Error fetching bookings" />}
        {!loading && bookings.length > 0 && (
          <h1>There are {bookings.length} total bookings</h1>
        )}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Places</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.userid}</td>
                <td>{booking.place}</td>
                <td>{booking.fromdate}</td>
                <td>{booking.fromtime}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//Place list components
export function Places() {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("https://massagewebsite.onrender.com/api/places/getallplaces");
        setPlaces(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        {loading && <Loader />}
        {error && <Error message="Error fetching places" />}
        {!loading && places.length > 0 && (
          <h1>There are {places.length} total places</h1>
        )}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Place Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place) => (
              <tr key={place._id}>
                <td>{place._id}</td>
                <td>{place.name}</td>
                <td>{place.type}</td>
                <td>{place.price}</td>
                <td>{place.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//Users list components
export function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://massagewebsite.onrender.com/api/users/getallusers");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>isAdmin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
//Add place components

export function Addplace() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl, setImageurl] = useState("");

  async function addPlace() {
    if (!name || !type || !price || !description || !imageurl) {
      alert("Please fill in all fields");
      return;
    }

    const newPlace = { name, type, price, description, imageurl };

    try {
      setLoading(true);
      const result = await axios.post("https://massagewebsite.onrender.com/api/places/addplace", newPlace);
      console.log(result);
      alert("New Place Added Successfully");
      window.location.href = "/home";
    } catch (err) {
      console.error(err);
      setError(err.message);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-md-5">
          {loading && <Loader />}
          <input
            type="text"
            className="form-control"
            placeholder="Place Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image Url"
            value={imageurl}
            onChange={(e) => setImageurl(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 text-right">
          <button className="btn btn-primary mt-4" onClick={addPlace}>
            Add Place
          </button>
        </div>
      </div>
    </>
  );
}
