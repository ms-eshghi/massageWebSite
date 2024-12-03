import React from "react";
import "../index.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function Place({ place, fromdate,fromtime }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={place.imageurl[0]} alt="" className="smallimg" />
      </div>
      <div className="col-md-7">
        <h1>Address: {place.name}</h1>
        <h2>Type: {place.type}</h2>
        <p>Price : {place.price}€</p>
        <p>Description: {place.description}</p>

        <div style={{ float: "right" }}>
          {(fromdate && fromtime) &&(
          <Link to={`/book/${place._id}/${fromdate}/${fromtime}`}>
            <button className="btn btn-primary m-2">Book Now</button>
          </Link>
        )}
          <button className="btn btn-primary" onClick={handleShow} size="lg">
            View Details{" "}
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {place.type} Massage in {place.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={place.imageurl[0]} alt="" className="bigimg" />
          <p>{place.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Place;
