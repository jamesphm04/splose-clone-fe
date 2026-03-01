import React from 'react';
import { ChatAvatar } from '@/components/atoms/chat-avatar/ChatAvatar';
import { LoadingOutlined } from '@ant-design/icons';
const TypingIndicatorMolecule: React.FC = () => {
    return (
        <div className="chat-message assistant">
            <ChatAvatar role="assistant" />
            <div className="message-content">
                <p className="typing-indicator">Thinking <LoadingOutlined /></p>
            </div>
        </div>
    );
};

export default TypingIndicatorMolecule;