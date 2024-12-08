import { Color } from "antd/es/color-picker";
import React from "react";
import { Link } from "react-router-dom";
import LeftImage from '../images/Left-side.png';
import RightImage from '../images/Right-side.png';


function Landingscreen() {
  return (
    <div className="container-fluid">
    <div className="row">
      {/* Left Column */}
      <div
        className="col-md-6 col-12 d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${LeftImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
           <Link to="/home" className="mt-auto mb-4">
        <button className="btn btn-primary custom-btn  ">Booking</button>
        </Link>
      </div>

      {/* Right Column */}
      <div
        className="col-md-6 col-12"
        style={{
          backgroundImage: `url(${RightImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      ></div>
    </div>
  </div>
  
  );
}

export default Landingscreen;
