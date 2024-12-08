import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        setloading(true);
        const result = (
          await axios.post(
            "https://massagewebsite.onrender.com/api/users/register",
            user
          )
        ).data;
        setloading(false);
        setsuccess(true);
        setname("");
        setemail("");
        setpassword("");
        setcpassword("");
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    } else {
      alert("Passwords do not match");
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            {success && <Success message="Registration successful!" />}
            {error && <Error message="An error occurred. Please try again." />}
            <div className="bs p-4 border rounded shadow">
              <h2 className="text-center mb-4">Register</h2>

              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control w-100"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control w-100"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control w-100"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="cpassword"
                  className="form-control w-100"
                  id="cpassword"
                  placeholder="Confirm Password"
                  value={cpassword}
                  onChange={(e) => setcpassword(e.target.value)}
                  required
                />
              </div>

              <div className="mt-3">
                <button className="btn btn-primary w-100" onClick={register}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
