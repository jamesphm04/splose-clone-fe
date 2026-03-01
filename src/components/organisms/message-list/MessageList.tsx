import React, { type RefObject } from 'react';
import MessageMolecule from '@/components/molecules/chat-text-msg/ChatTextMsg';
import TypingIndicatorMolecule from '@/components/molecules/typing-indicator/TypingIndicator';
import { useMessageList } from './useMessageList';
import './styles.css';

interface MessageListProps {
    messages: any[];
    loading: boolean;
    messagesEndRef: RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({
    messages,
    loading,
    messagesEndRef,
}) => {
    return (
        <div className="chat-messages">
            {messages.map((msg) => (
                <MessageMolecule
                    key={msg.id}
                    id={msg.id}
                    role={msg.role}
                    content={msg.content}
                    imageUrl={msg.imageUrl}
                />
            ))}
            {loading && <TypingIndicatorMolecule />}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;