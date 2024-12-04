import { Color } from "antd/es/color-picker";
import React from "react";
import { Link } from "react-router-dom";

function Landingscreen() {
  return (
    <div className="row landing justify-content-center">
      <div class="background ">
        <Link to="/home">
          <button class="custom-btn">Booking</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
