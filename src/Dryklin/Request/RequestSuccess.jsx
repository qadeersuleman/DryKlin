import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RequestSuccess = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Request Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Dummy content for Request Success.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Back
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RequestSuccess;
