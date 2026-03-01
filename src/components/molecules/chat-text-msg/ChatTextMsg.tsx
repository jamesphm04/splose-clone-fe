import React from 'react';
import { ChatAvatar } from '@/components/atoms/chat-avatar/ChatAvatar';
import { ChatTextMsg as ChatTextMsgAtom } from '@/components/atoms/chat-text-msg/ChatTextMsg';
import './styles.css';

interface ChatTextMsgProps {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    imageUrl?: string;
}

const ChatTextMsg: React.FC<ChatTextMsgProps> = ({
    role,
    content,
    imageUrl,
}) => {
    return (
        <div className={`chat-message ${role}`}>
            <ChatAvatar role={role} />
            <div className="message-content">
                {imageUrl && <img src={imageUrl} alt="Uploaded" className="message-image" />}
                <ChatTextMsgAtom text={content} role={role} />
            </div>
        </div>
    );
};

export default ChatTextMsg;