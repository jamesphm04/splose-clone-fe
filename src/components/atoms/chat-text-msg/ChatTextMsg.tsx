import React from 'react';
import './styles.css';

interface ChatTextMsgProps {
    text: string;
    role: 'user' | 'assistant';
}

export const ChatTextMsg: React.FC<ChatTextMsgProps> = ({ text, role }) => {
    return <p className={`chat-text-msg ${role}`}>{text}</p>;
};
