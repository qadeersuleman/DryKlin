import React from 'react';
import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './config'; // Configuration file

const MyChatbot = () => {
  return <Chatbot config={config} />;
};

export default MyChatbot;
