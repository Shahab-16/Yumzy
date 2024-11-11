import React from 'react';

function ChatMessage({ message }) {
    return (
        <div className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"} mb-2`}>
            <div className={`rounded-lg p-2 ${message.sender === "bot" ? "bg-gray-200" : "bg-blue-500 text-white"}`}>
                {message.text}
            </div>
        </div>
    );
}

export default ChatMessage;
