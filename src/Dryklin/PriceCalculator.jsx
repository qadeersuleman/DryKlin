import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ModalFlowManager from './Request/ModalFlowManager';
import "./PriceCalculator.css";

const PriceCalculator = () => {
  const [items, setItems] = useState([
    // Corporate
    { id: 1, category: "Corporate", name: "Shirt", price: 800, quantity: 0 },
    { id: 2, category: "Corporate", name: "Trouser", price: 800, quantity: 0 },
    { id: 3, category: "Corporate", name: "Jacket/Blazer", price: 1500, quantity: 0 },
    { id: 4, category: "Corporate", name: "Gown", price: 1000, quantity: 0 },
    { id: 5, category: "Corporate", name: "Blouse", price: 800, quantity: 0 },
    { id: 6, category: "Corporate", name: "Suit", price: 2000, quantity: 0 },
  
    // Native
    { id: 7, category: "Native", name: "Buba & Sokoto", price: 1000, quantity: 0 },
    { id: 8, category: "Native", name: "Agbada", price: 2000, quantity: 0 },
    { id: 9, category: "Native", name: "Native Gown", price: 1000, quantity: 0 },
    { id: 10, category: "Native", name: "Blouse & Wrapper", price: 1500, quantity: 0 },
  
    // Casual
    { id: 11, category: "Casual", name: "Vest", price: 800, quantity: 0 },
    { id: 12, category: "Casual", name: "Jeans", price: 1000, quantity: 0 },
    { id: 13, category: "Casual", name: "Sport Tracksuit", price: 1000, quantity: 0 },
    { id: 14, category: "Casual", name: "Short/Skirt", price: 800, quantity: 0 },
    { id: 15, category: "Casual", name: "Joggers", price: 1000, quantity: 0 },
    { id: 16, category: "Casual", name: "Hoodie/Cardigan", price: 1000, quantity: 0 },
  
    // Others
    { id: 17, category: "Others", name: "Underwear (Singlet, Socks, Boxers)", price: 500, quantity: 0 },
    { id: 18, category: "Others", name: "Towel", price: 1000, quantity: 0 },
    { id: 19, category: "Others", name: "Bedsheet", price: 1000, quantity: 0 },
    { id: 20, category: "Others", name: "Duvet/Blanket", price: 3000, quantity: 0 },
    { id: 21, category: "Others", name: "Hand Towel", price: 800, quantity: 0 },
    { id: 22, category: "Others", name: "Wedding Gown", price: 5000, quantity: 0 },
    { id: 23, category: "Others", name: "Gele", price: 800, quantity: 0 },
    { id: 24, category: "Others", name: "Sneakers/Shoes", price: 1000, quantity: 0 },
    { id: 25, category: "Others", name: "Caps", price: 500, quantity: 0 },
    { id: 26, category: "Others", name: "Pyjamas/Bathrobe", price: 1500, quantity: 0 }
  ]);
  
  // Get unique categories
  const categories = [...new Set(items.map(item => item.category))];

  const deliveryFee = 1000;

  const handleIncrement = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updatedItems);
  };

  const handleDecrement = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setItems(updatedItems);
  };

  const subTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subTotal + deliveryFee;

  const selectedItems = items.filter((item) => item.quantity > 0);
  console.warn(selectedItems)

  const orderData = {
    subTotal,
    deliveryFee,
    serviceCharge: 500,
    total,
  };

  return (
    <Container className="price-calculator mt-5">
       <Row className="justify-content-center text-center mb-4">
        <Col md={12}>
          <h3 className="text-center">
            Price <span className="text-orange txt-size-chng">Calculator</span>
          </h3>
          <p className="text-center">
            Get an estimated price for all the items you want to wash.
          </p>
        </Col>
      </Row>
      <Row>
      <Col md={6} className="items-list">
    {categories.map(category => (
      <div key={category}>
        {/* Display the category heading */}
        <h3 className='text-orange text-center' style={{fontSize : "20px"}}>{category}</h3>
        {items
          .filter(item => item.category === category)
          .map(item => (
            <Row key={item.id} className="align-items-center my-3">
              <Col xs={6}>
                <span>{item.name}</span>
                <div className="text-muted">₦{item.price}</div>
              </Col>
              <Col xs={6} className="d-flex justify-content-end">
                <Button
                  variant="outline-danger"
                  className="btn-hov"
                  onClick={() => handleDecrement(item.id)}
                >
                  -
                </Button>
                <div className="mx-4 mt-2">{item.quantity}</div>
                <Button
                  variant="outline-secondary"
                  className="btn-hov"
                  onClick={() => handleIncrement(item.id)}
                >
                  +
                </Button>
              </Col>
            </Row>
          ))}
      </div>
    ))}
  </Col>
        <Col md={6} className="text-right">
          <div className="summary-box">
            <div>
              Sub-total <span className="text-right">₦{subTotal}</span>
            </div>
            <div>
              Delivery Fee <span className="text-right">₦{deliveryFee}</span>
            </div>
            <hr className="mt-5"></hr>
            <div>
              Total <span className="total-price text-orange">₦{total}</span>
            </div>
          </div>
          <p className="terms-text text-center">
            By clicking on "Proceed", you agree to our{" "}
            <span className="text-orange">Terms of Use</span> and{" "}
            <span className="text-orange">Privacy Policy</span>.
          </p>
      <ModalFlowManager
        buttonText="Proceed to wash"
        buttonClass="proceed-btn mt-4 bg-orange"
        ShowIcon={false}
        fontSize="18px"
        selectedItems={selectedItems}
        total={total}
        orderData={orderData} // Pass orderData here
      />
      </Col>
      </Row>
    </Container>
  );
};

export default PriceCalculator;



