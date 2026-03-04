import React from 'react';
import { ChatAvatar } from '@/components/atoms/chat-avatar/ChatAvatar';
import { ChatMsg as ChatTextMsgAtom } from '@/components/atoms/chat-text-msg/ChatTextMsg';
import './styles.css';
import type { ChatMessage } from '@/types/chat';

interface ChatTextMsgWithAvatarProps {
    message: ChatMessage;
}

const ChatTextMsgWithAvatar: React.FC<ChatTextMsgWithAvatarProps> = ({
    message,
}) => {
    return (
        <div className={`chat-message ${message.role}`}>
            <ChatAvatar role={message.role} />
            <div className="message-content">
                <ChatTextMsgAtom message={message} />
            </div>
        </div>
    );
};

export default ChatTextMsgWithAvatar;