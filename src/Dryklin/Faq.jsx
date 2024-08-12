import { Accordion, Card, Button } from "react-bootstrap";
import "./Faq.css";

function Faq() {
  return (
    <div className="container my-5">
      <h2 className="text-center">Frequently Asked <span style={{ color: '#cc5500' }}>Questions</span></h2>
      <p className="text-center">Everything you need to know about our services.</p>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            How does DryKlin work?
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              DryKlin simplifies your laundry care. Just request a pickup via the web app, and our
              professionals will handle the rest, returning your laundry fresh and clean.
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            What type of laundry services do you offer?
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              We offer a range of laundry services including washing, drying, folding, and dry cleaning.
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            How do I pay for my laundry?
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              You can pay through our web app using credit/debit cards or mobile payment methods.
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            What is your cancellation policy?
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              You can cancel your order up to 24 hours before the scheduled pickup time.
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="4">
            What if I have special instructions for my laundry?
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
            <Card.Body>
              You can add special instructions when placing your order, and our team will follow them.
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="5">
            How do I contact DryKlin’s customer support?
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="5">
            <Card.Body>
              You can contact our customer support via email or through the contact form on our website.
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default Faq;
