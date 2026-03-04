import React, { type RefObject } from 'react';
import ChatTextMsgWithAvatar from '@/components/molecules/chat-text-msg/ChatTextMsg';
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
                <ChatTextMsgWithAvatar
                    message={msg}
                />
            ))}
            {loading && <TypingIndicatorMolecule />}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;