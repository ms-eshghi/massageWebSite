import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function Login() {
    const user = {
      email,
      password,
    };
    try {
      setloading(true);
      const result = (
        await axios.post(
          "https://massagewebsite.onrender.com/api/users/login",
          user
        )
      ).data;
      setloading(false);
      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }
  return ( <div>
    {loading && <Loader />}
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4"> {/* Adjusted for responsiveness */}
          {error && <Error message="Invalid Credentials" />}
          <div className="bs p-4 border rounded shadow">
            <h2 className="text-center mb-4">Login</h2>

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

            <div className="text-center">
              <button
                className="btn btn-primary w-100"
                onClick={Login}
                disabled={loading} // Disable button during loading
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Loginscreen;
