import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [conversationStep, setConversationStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [lastMeal, setLastMeal] = useState(null); // New state for last meal
  const messagesEndRef = useRef(null);

  const questions = [
    "Hello! I'm your personalized meal assistant. To help me learn and improve, could you tell me about your last meal? What did you eat?",
    "Thank you! And how was your experience with that meal? Did you enjoy it? Was the portion size right?",
    "Based on your feedback and past orders, I can suggest an optimal quantity for your next meal to minimize waste and ensure satisfaction. Would you like to hear my suggestion?",
    "Great! I'm analyzing your consumption patterns, time of day, and other inputs to dynamically adjust your portion size and price. Please wait a moment."
  ];

  useEffect(() => {
    // Initial message from the chatbot
    if (messages.length === 0) {
      addMessage('bot', questions[0]);
    }
  }, []);

  // Simulate fetching last meal data (replace with actual API call)
  useEffect(() => {
    const fetchLastMeal = () => {
      // In a real application, this would be an API call to your backend
      // For now, we'll simulate a last meal
      const simulatedLastMeal = {
        name: 'Chicken Biryani',
        date: '2023-10-26',
        quantity: 'standard',
        price: 'Rs. 350',
        feedback: 'Delicious, but a bit too much for one person.'
      };
      setLastMeal(simulatedLastMeal);
    };
    fetchLastMeal();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (sender, text) => {
    setMessages((prevMessages) => [...prevMessages, { sender, text }]);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = input.trim();
    addMessage('user', userMessage);
    setInput('');

    // Handle conversation flow based on steps
    switch (conversationStep) {
      case 0:
        // User provides last meal
        setUserData((prevData) => ({ ...prevData, lastMeal: userMessage }));
        setConversationStep(1);
        setTimeout(() => {
          addMessage('bot', questions[1]);
        }, 500);
        break;
      case 1:
        // User provides feedback on last meal
        setUserData((prevData) => ({ ...prevData, mealFeedback: userMessage }));
        setConversationStep(2);
        setTimeout(() => {
          addMessage('bot', questions[2]);
        }, 500);
        break;
      case 2:
        // User responds to suggestion for optimal quantity
        if (userMessage.toLowerCase().includes('yes')) {
          setConversationStep(3);
          setTimeout(() => {
            addMessage('bot', questions[3]);
            // Simulate AI analysis and suggestion
            setTimeout(() => {
              const optimalQuantity = 'half portion'; // This would come from AI/backend
              const adjustedPrice = 'Rs. 175'; // This would come from AI/backend
              addMessage('bot', `Based on your feedback, I recommend an ${optimalQuantity} for your next ${lastMeal.name || 'meal'}. The adjusted price would be ${adjustedPrice}.`);
              addMessage('bot', 'Would you like to place an order with these adjustments?');
              setConversationStep(4); // Move to a new step for order confirmation
            }, 2000);
          }, 500);
        } else {
          addMessage('bot', 'No problem! What else can I help you with?');
          setConversationStep(0); // Restart or go to a general query state
        }
        break;
      case 3:
        // AI analysis and suggestion (bot speaks, no user input expected here)
        break;
      case 4:
        // User confirms order with adjustments
        if (userMessage.toLowerCase().includes('yes')) {
          const { optimalQuantity, adjustedPrice } = userData;
          addMessage('bot', `Great! Placing an order for ${lastMeal.name || 'meal'} with ${optimalQuantity} at ${adjustedPrice}.`);
          // Here you would integrate with your order placement system
          addMessage('bot', 'Your order has been placed!');
        } else {
          addMessage('bot', 'Order cancelled. What else can I help you with?');
        }
        setConversationStep(0); // Reset conversation
        break;
      default:
        // General conversation or fallback
        addMessage('bot', 'I am not sure how to respond to that. Can you please rephrase?');
        break;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">AI Meal Planner Chatbot</h2>
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-800'}`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 border border-neutral-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={conversationStep < questions.length ? "Type your response..." : ""}
          disabled={conversationStep === 3} // Disable input when AI is analyzing
        />
        <button
          className="bg-primary-500 text-white px-6 py-2 rounded-r-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
          onClick={handleSendMessage}
          disabled={conversationStep === 3}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;