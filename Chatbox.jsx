import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatApp.css';

function ChatApp() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const sendMessage = async () => {
        if (inputMessage.trim() === '') return;

        
        setMessages(prevMessages => [...prevMessages, { text: inputMessage, sender: 'user' }]);

        try {
            
            const response = await axios.post('http://localhost:8000/openai/text-generation', { prompt: inputMessage });
            const generatedText = response.data.generatedText;

            
            setMessages(prevMessages => [...prevMessages, { text: generatedText, sender: 'bot' }]);
        } catch (error) {
            console.error('Error:', error.message);
            

            setMessages(prevMessages => [...prevMessages, { text: 'Bot is not responding', sender: 'bot' }]);
        }

        // Clear input field
        setInputMessage('');
    };

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-container">
                <input
                    type="text"
                    className="message-input"
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                />
                <button className="send" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatApp;
