import { Color } from "antd/es/color-picker";
import React from "react";
import { Link } from "react-router-dom";

function Landingscreen() {
  return (
    <div className="row landing justify-content-center">
      <div
        className="col-md-9 my-auto  text-center"
        style={{ borderRight: "8px solid blue" }}
      >
        <h2 style={{ color: "blue", fontSize: "12vh" }}>MassageWebsite</h2>
        <h1 style={{ color: "blue" }}>
          Relax your soul and mind with a massage.
        </h1>
        <img src="../images/Untitled.png" alt="" />
        <Link to="/home">
          <button
            className="btn landingbtn"
            style={{ color: "white", backgroundColor: "black" }}
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
