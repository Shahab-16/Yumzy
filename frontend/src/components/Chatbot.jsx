import React, { useState } from 'react';
import { BsChatDots } from 'react-icons/bs'; // Import a chat icon
import Chatbot from './Chatbot'; // This is your Chatbot component

function ChatbotIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {/* Chat Icon Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        <BsChatDots size={24} />
      </button>
      
      {/* Chatbot Component */}
      {isOpen && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-lg w-80 h-96">
          <Chatbot />
        </div>
      )}
    </div>
  );
}

export default ChatbotIcon;
