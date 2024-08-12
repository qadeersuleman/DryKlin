import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './PriceCalculator.css';  // Custom CSS for styling

const PriceCalculator = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Shirt/Blouse', price: 1000, quantity: 2 },
        { id: 2, name: 'Pant Trouser', price: 1200, quantity: 2 },
        { id: 3, name: 'Shorts/Skirts', price: 1000, quantity: 5 },
        { id: 4, name: 'Jean Trouser', price: 1000, quantity: 1 },
        { id: 5, name: 'Sweatshirt', price: 1200, quantity: 3 },
        { id: 6, name: 'Iro and Buba', price: 1500, quantity: 1 },
    ]);

    const deliveryFee = 800;
    const serviceCharge = 500;

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
    const total = subTotal + deliveryFee + serviceCharge;

    return (
        <Container className="price-calculator">
            <Row>
                <Col md={8}>
                    <h3>Price <span className="text-orange">Calculator</span></h3>
                    <p>Get an estimated price for all the items you want to wash.</p>
                    {items.map(item => (
                        <Row key={item.id} className="align-items-center my-3">
                            <Col xs={6}>
                                <span>{item.name}</span>
                                <span className="text-muted">₦{item.price}</span>
                            </Col>
                            <Col xs={6} className="d-flex justify-content-end">
                                <Button variant="outline-danger" style={ {borderColor : "orange" } } onClick={() => handleDecrement(item.id)}>-</Button>
                                <div className="quantity-box">{item.quantity}</div>
                                <Button variant="outline-secondary" style={ {borderColor : "orange" } } onClick={() => handleIncrement(item.id)}>+</Button>
                            </Col>
                        </Row>
                    ))}
                </Col>
                <Col md={4} className="text-right">
                    <div className="summary-box">
                        <div>Sub-total <span className="text-right">₦{subTotal}</span></div>
                        <div>Delivery Fee <span className="text-right">₦{deliveryFee}</span></div>
                        <div>Service Charge <span className="text-right">₦{serviceCharge}</span></div>
                        <div>Total <span className="total-price text-orange">₦{total}</span></div>
                    </div>
                    <p className="terms-text">By clicking on "Proceed", you agree to our <span className="text-orange">Terms of Use</span> and <span className="text-orange">Privacy Policy</span>.</p>
                    <Button className=" proceed-btn" >Proceed to wash</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default PriceCalculator;
