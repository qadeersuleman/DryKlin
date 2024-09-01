import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
  } from "@chakra-ui/react";
import { Container } from "react-bootstrap";

  
  function Faq() {
    return (
      <Container className="my-3">
        <Accordion allowMultiple>
        {faqData.map((faq, index) => (
          <AccordionItem key={index} border="none" color="black" className="sain">
            {({ isExpanded }) => (
              <>
                <h2 className="jani">
                  <AccordionButton
                    _hover={{ backgroundColor: "transparent" }} // Removes background on hover
                    _focus={{ boxShadow: "none" }} // Removes focus border
                    border="none" // Removes border
                    padding="5px 0" // Adjust padding
                    fontSize="14px" // Adjust font size
                    fontWeight="normal" // Adjust font weight if needed
                    backgroundColor="white"
                    color="black"
                  >
                    <Box as="span" flex="1" textAlign="left">
                      {faq.question}
                    </Box>
                    <i
                      className={isExpanded ? "fas fa-minus" : "fas fa-plus"}
                      style={{ fontSize: "12px", color : "orangered", border : "1px solid orangered" ,borderRadius : "50%", padding : "3px"}}
                    />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontSize="12px" color="black">{faq.answer}</AccordionPanel>
                <hr/>
              </>
              
            )}
          </AccordionItem>
        ))}
      </Accordion>

      </Container>
    );
  }
  
  const faqData = [
    {
      question: "How does Dryklin work?",
      answer:
        "Dryklin provides a convenient laundry service where you can schedule pickups, and we'll handle the rest. Your laundry will be washed, dried, and delivered back to you.",
    },
    {
      question: "How do I pay for my laundry?",
      answer:
        "You can pay for your laundry services through our secure online payment system using a credit card, debit card, or mobile payment options.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "You can cancel your laundry service up to 24 hours before the scheduled pickup time without any charges. Cancellations made within 24 hours may incur a fee.",
    },
    {
      question: "What if I have special instructions for my laundry?",
      answer:
        "If you have any special instructions, such as handling delicate fabrics or using specific detergents, you can include them when scheduling your service.",
    },
    {
      question: "How do I contact Dryklin's customer support?",
      answer:
        "You can contact Dryklin's customer support via our hotline, email, or live chat on our website. We're available 24/7 to assist you.",
    },
  ];
  
  export default Faq;
  