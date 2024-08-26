import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './PriceCalculator.css';  // Custom CSS for styling

import BillingModal from "./BillingModal"
import { Link } from 'react-router-dom';



const PriceCalculator = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Shirt/Blouse', price: 1000, quantity: 1 },
        { id: 2, name: 'Pant Trouser', price: 1200, quantity: 1 },
        { id: 3, name: 'Shorts/Skirts', price: 1000, quantity: 1 },
        { id: 4, name: 'Jean Trouser', price: 1000, quantity: 1 },
        { id: 5, name: 'Sweatshirt', price: 1200, quantity: 1 },
        { id: 6, name: 'Iro and Buba', price: 1500, quantity: 1 },
        { id: 1, name: 'Shirt/Blouse', price: 1000, quantity: 1 },
        { id: 2, name: 'Pant Trouser', price: 1200, quantity: 1 },
        { id: 3, name: 'Shorts/Skirts', price: 1000, quantity: 1 },
        { id: 4, name: 'Jean Trouser', price: 1000, quantity: 1 },
        { id: 5, name: 'Sweatshirt', price: 1200, quantity: 1 },
        { id: 6, name: 'Iro and Buba', price: 1500, quantity: 1 },
    ]);

    const deliveryFee = 1000;

    const handleIncrement = (id) => {
        const updatedItems = items.map(item => 
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setItems(updatedItems);
    };

    const handleDecrement = (id) => {
        const updatedItems = items.map(item => 
            item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setItems(updatedItems);
    };

    const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subTotal + deliveryFee ;


 

 
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
    return (
        <Container className="price-calculator mt-5">
            <Row className="justify-content-center text-center mb-4">
                <Col md={12}>
                    <h3 className="text-center">Price <span className="text-orange">Calculator</span></h3>
                    <p className="text-center">Get an estimated price for all the items you want to wash.</p>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="items-list">
                    {items.map(item => (
                        <Row key={item.id} className="align-items-center my-3">
                            <Col xs={6}>
                                <span>{item.name}</span>
                                <div className="text-muteds">₦{item.price}</div>
                            </Col>
                            <Col xs={6} className="d-flex justify-content-end">
                                <Button variant="outline-danger" className='btn-hov' onClick={() => handleDecrement(item.id)}>-</Button>
                                <div className="mx-4 mt-2">{item.quantity}</div>
                                <Button variant="outline-secondary" className='btn-hov' onClick={() => handleIncrement(item.id)}>+</Button>
                            </Col>
                        </Row>
                    ))}
                </Col>
                <Col md={6} className="text-right">
                    <div className="summary-box">
                        <div>Sub-total <span className="text-right">₦{subTotal}</span></div>
                        <div>Delivery Fee <span className="text-right">₦{deliveryFee}</span></div>
                        <hr className='mt-5'></hr>
                        <div>Total <span className="total-price text-orange">₦{total}</span></div>
                    </div>
                    <p className="terms-text text-center">By clicking on "Proceed", you agree to our <span className="text-orange">Terms of Use</span> and <span className="text-orange">Privacy Policy</span>.</p>
                    {/* <Button className=" proceed-btn" onClick={handleRequestPickupClick}>Proceed to was </Button>
                    {showFlow && <Washbnt openFlow={showFlow} />} */}
                    
                    <Button className=" proceed-btn mt-4">Proceed to wash </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default PriceCalculator;
