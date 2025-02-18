import React, { useState } from 'react';
import ChatBox from './Chatbox';
import { IconButton } from '@mui/material';
import { SmartToy } from '@mui/icons-material'; 

function ChatIcon() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {isOpen ? (
                <div className="chat-app-container">
                    <ChatBox />
                </div>
            ) : (
                <IconButton 
                    onClick={toggleChat} 
                    style={{ 
                        backgroundColor: '#0084ff', 
                        color: '#fff', 
                        borderRadius: '50px', 
                        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 10px'
                    }}>
                    <SmartToy style={{ fontSize: 32 }} /> {/* Modern chatbot icon */}
                </IconButton>
            )}
        </div>
    );
}

export default ChatIcon;
