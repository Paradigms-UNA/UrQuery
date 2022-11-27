import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import aboutService from "../services/aboutService";

import logo from "../assets/logo.png";

export const NavigationBar = () => {
  const [show, setShow] = useState(false);
  const [aboutData, setAboutData] = useState({});

  const handleClose = () => setShow(false);

  const makeRequest = async () => {
    try {
      const response = await aboutService.getAbout();

      if (response.status === "404" || response.status === "500") {
        throw new Error(`Error: ${response.status}`);
      }

      setAboutData(response.data[0]);
    } catch (err) {
      toast.error(`Error in the Request or connection: ${err}`);
    }

    setShow(true);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href={null}>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            <span className="nav_title">UrQuery</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href={null} className="active" onClick={makeRequest}>
                About Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>About</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>Work Team</h4>
          <ul>
            {aboutData.workTeam?.map((member, index) => (
              <li key={index}>{member.name}</li>
            ))}
          </ul>
          <h5>About course</h5>
          <ul>
            {aboutData.aboutCourse?.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
