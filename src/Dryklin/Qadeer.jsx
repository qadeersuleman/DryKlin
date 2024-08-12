import React from "react";
import { Accordion, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Faq.css";

function Qadeer() {
  return (
    <div className="containeres" style={ {marginLeft : "350px" }}>
      <h2 className="text-center">
        Frequently Asked <span style={{ color: "#cc5500" }}>Questions</span>
      </h2>
      <p className="text-center">Everything you need to know about our services.</p>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Item eventKey="0">
            <Accordion.Header>How does DryKlin work?</Accordion.Header>
            <Accordion.Body>
              DryKlin simplifies your laundry care. Just request a pickup via the web app, and our professionals will handle the rest, returning your laundry fresh and clean.
            </Accordion.Body>
          </Accordion.Item>
        </Card>
        <Card>
          <Accordion.Item eventKey="1">
            <Accordion.Header>What type of laundry services do you offer?</Accordion.Header>
            <Accordion.Body>
              We offer a range of laundry services including washing, drying, folding, and dry cleaning.
            </Accordion.Body>
          </Accordion.Item>
        </Card>
        <Card>
          <Accordion.Item eventKey="2">
            <Accordion.Header>How do I pay for my laundry?</Accordion.Header>
            <Accordion.Body>
              You can pay through our web app using credit/debit cards or mobile payment methods.
            </Accordion.Body>
          </Accordion.Item>
        </Card>
        <Card>
          <Accordion.Item eventKey="3">
            <Accordion.Header>What is your cancellation policy?</Accordion.Header>
            <Accordion.Body>
              You can cancel your order up to 24 hours before the scheduled pickup time.
            </Accordion.Body>
          </Accordion.Item>
        </Card>
        <Card>
          <Accordion.Item eventKey="4">
            <Accordion.Header>What if I have special instructions for my laundry?</Accordion.Header>
            <Accordion.Body>
              You can add special instructions when placing your order, and our team will follow them.
            </Accordion.Body>
          </Accordion.Item>
        </Card>
        <Card>
          <Accordion.Item eventKey="5">
            <Accordion.Header>How do I contact DryKlin’s customer support?</Accordion.Header>
            <Accordion.Body>
              You can contact our customer support via email or through the contact form on our website.
            </Accordion.Body>
          </Accordion.Item>
        </Card>
      </Accordion>
    </div>
  );
}

export default Qadeer;
