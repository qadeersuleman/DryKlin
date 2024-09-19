import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import "./Chatbot.css";
import "../App.css";


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! Welcome to Dryklin. How can I assist you today?",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");

  // Handle opening and closing the chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Function to get bot replies based on user message
  const getBotReply = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("hi") || lowerMessage.includes("hello")) {
      return "Hello! Welcome to Dryklin. How can I assist you today?";
    }
    if (
      lowerMessage.includes("delivery") ||
      lowerMessage.includes("normal delivery")
    ) {
      return "Normal delivery is ₦1000. It takes up to 2 days.";
    }
    if (
      lowerMessage.includes("express") ||
      lowerMessage.includes("express delivery")
    ) {
      return "Normal delivery is ₦1000. It takes up to 2 days.";
    }
    if (lowerMessage.includes("services")) {
      return "We offer pick and drop services for washing and drying clothes. You can choose from various categories.";
    }
    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "Our prices vary by item category. you have to visit price calculator page";
    }
    if (lowerMessage.includes("delivery")) {
      return "We provide same-day delivery for orders placed before 2 PM. Otherwise, delivery will be the next day.";
    }
    if (lowerMessage.includes("items") || lowerMessage.includes("clothes")) {
      return "Here are some items we offer:\n- Corporate: Shirt (₦800), Trouser (₦800)\n- Native: Agbada (₦2000), Buba & Sokoto (₦1000)\n- Casual: Jeans (₦1000), Hoodie/Cardigan (₦1000)";
    }
    if (lowerMessage.includes("track") || lowerMessage.includes("order")) {
      return "You can track your order using the tracking link we provide via email or SMS once your items are picked up.";
    }
    if (lowerMessage.includes("cancel")) {
      return "Yes, you can cancel your order within one hour of placing it. After that, please contact our support for assistance.";
    }
    if (lowerMessage.includes("payment")) {
      return "We accept various payment methods including bank transfers, mobile payments, and cash on delivery.";
    }
    if (
      lowerMessage.includes("areas") ||
      lowerMessage.includes("service areas")
    ) {
      return "We currently provide services in Ibadan, Oyo State. Please check back for updates on new service areas.";
    }
    if (
      lowerMessage.includes("instructions") ||
      lowerMessage.includes("washing instructions")
    ) {
      return "If your items have specific washing instructions, please let us know when placing your order. We'll take care of it!";
    }
    if (
      lowerMessage.includes("pickup") ||
      lowerMessage.includes("delivery times")
    ) {
      return "We offer flexible pickup and delivery times. You can schedule them at your convenience when placing your order.";
    }
    if (
      lowerMessage.includes("satisfied") ||
      lowerMessage.includes("quality guarantee")
    ) {
      return "We strive for customer satisfaction! If you're not happy with our service, please contact us, and we'll make it right.";
    }
    if (lowerMessage.includes("bulk orders")) {
      return "Yes, we do! For bulk orders, please contact our support team for special rates and arrangements.";
    }
    if (lowerMessage.includes("membership")) {
      return "Yes, we offer a membership program with exclusive discounts and benefits. Contact us for more details!";
    }
    if (lowerMessage.includes("thank you") || lowerMessage.includes("thanks")) {
      return "You're welcome! If you have any more questions, feel free to ask.";
    }
    if (lowerMessage.includes("help")) {
      return "Sure! What specific help do you need?";
    }

    // Default response if no matches found
    return "I'm not sure how to respond to that. Could you please clarify?";
  };

  // Handle sending a message and receiving a bot reply
  const handleSendMessage = () => {
    if (userMessage.trim() === "") return;

    // Add user message to the chat
    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);

    // Clear input field
    setUserMessage("");

    // Get bot reply
    const botReply = getBotReply(userMessage);

    // Add bot message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: botReply },
    ]);
  };

  return (
    <div className="chatbot-container">
      {/* Circle Button to toggle chat */}
      <Button onClick={toggleChat} className="chatbot-btn bg-orange">
        💬
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header bg-orange">
            <h5 style={{ fontSize: "15px" }}>DryKlin Chat Assistant</h5>
            <Button variant="light" onClick={toggleChat}>
              X
            </Button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Input to send messages */}
          <InputGroup className="chat-input">
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={userMessage}
              className="contact-input"
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-orange"
              style={{
                marginBottom: "12px",
                position: "relative",
                bottom: "1px",
                border: "none",
                borderRadius: "3px",
              }}
            >
              Send
            </Button>
          </InputGroup>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
