Freequently
import React, { useState } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const FAQ = () => {
  const [activeKey, setActiveKey] = useState(null);

  const toggleIcon = (key) => {
    return activeKey === key ? faMinus : faPlus;
  };

  return (
    <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            How does DryKlin work?
            <FontAwesomeIcon
              icon={toggleIcon('0')}
              style={{ marginLeft: '10px' }}
            />
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            DryKlin simplifies your laundry care. Just request a pickup via
            the web app, and our professionals will handle the rest,
            returning your laundry fresh and clean.
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="1">
            What type of laundry services do you offer?
            <FontAwesomeIcon
              icon={toggleIcon('1')}
              style={{ marginLeft: '10px' }}
            />
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            We offer a variety of laundry services including washing, drying,
            ironing, and dry cleaning.
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="2">
            How do I pay for my laundry?
            <FontAwesomeIcon
              icon={toggleIcon('2')}
              style={{ marginLeft: '10px' }}
            />
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            You can pay via credit card, debit card, or through our secure
            online payment system.
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="3">
            What is your cancellation policy?
            <FontAwesomeIcon
              icon={toggleIcon('3')}
              style={{ marginLeft: '10px' }}
            />
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <Card.Body>
            Cancellations are allowed up to 24 hours before the scheduled
            pickup time. Please contact customer support for any
            cancellations.
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="4">
            What if I have special instructions for my laundry?
            <FontAwesomeIcon
              icon={toggleIcon('4')}
              style={{ marginLeft: '10px' }}
            />
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="4">
          <Card.Body>
            You can provide any special instructions when placing your order
            in the app.
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="5">
            How do I contact DryKlin’s customer support?
            <FontAwesomeIcon
              icon={toggleIcon('5')}
              style={{ marginLeft: '10px' }}
            />
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="5">
          <Card.Body>
            You can contact our customer support via email at support@dryklin.com
            or call us at 1-800-123-4567.
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default FAQ;
