import React from 'react';
import MessageList from '@/components/organisms/message-list/MessageList';
import ChatInput from '@/components/organisms/chat-input/ChatInput';
import { useChatbox } from './useChatbox'
import './styles.css';

const Chatbox: React.FC = () => {
    const {
        messages,
        messagesEndRef,
        loading,
        setLoading,
        handleAddChatMessage,
        scrollToBottom,
    } = useChatbox();

    return (
        <div className="chat-box">
            <div className="chat-header">
                <h3>AI Assistant</h3>
                <p>Ask questions or request help with documentation</p>
            </div>

            <MessageList
                messages={messages}
                loading={loading}
                messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
            />

            <ChatInput
                handleAddChatMessage={handleAddChatMessage}
                scrollToBottom={scrollToBottom}
                setLoading={setLoading}
                loading={loading}
            />
        </div>
    );
};

export default Chatbox;