import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import aboutService from '../service/aboutService'


export const Navbar = () => {

    const [show, setShow] = useState(false);
    const [aboutData, setAboutData] = useState({});
    
    const handleClose = () => setShow(false);

    const makeRequest = async () => {
        await aboutService.getAbout()
            .then(response => response.data)
            .then(data => setAboutData(data))
            .catch(err => toast.error(`Error in the Request or connection: ${err}`));
        setShow(true);
    }


    return (
        <>
            <nav className="navbar navbar-light shadow-lg">
                <div className="container-fluid justify-content-end">
                    <Button className="btn btn-warning px-4 me-3" onClick={makeRequest}>About</Button>
                </div>
            </nav>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>About</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Work Team</h4>
                    <ul>
                        {aboutData.workTeam?.map(member => <li>{member.name}</li>)}
                    </ul>
                    <h5>About course</h5>
                    <ul>
                        {aboutData.aboutCourse?.map( data => <li>{data}</li>)}
                    </ul>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}
