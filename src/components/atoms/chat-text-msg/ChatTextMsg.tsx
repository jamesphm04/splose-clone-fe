import React from 'react';
import './styles.css';
import { Flex } from 'antd';
import type { ChatMessage } from '@/types/chat';
import ReactMarkdown from 'react-markdown';

interface ChatMsgProps {
    message: ChatMessage;
}

export const ChatMsg: React.FC<ChatMsgProps> = ({ message }) => {
    return (
        <Flex vertical gap={6}>
            {message.attachment && (
                <div style={{ marginTop: 6 }}>
                    {message.attachment.mimeType.startsWith('audio/') ? (
                        <audio src={message.attachment.url} className="attach-audio" controls />
                    ) : message.attachment.mimeType.startsWith('image/') ? (
                        <img src={message.attachment.url} alt={message.attachment.name} className="attach-image" />
                    ) : (
                        <a href={message.attachment.url} download={message.attachment.name} className="attach-file">
                            📎 {message.attachment.name}
                        </a>
                    )}
                </div>
            )}
            <p className={`chat-text-msg ${message.role}`}>
                <ReactMarkdown>{message.content}</ReactMarkdown>
            </p>
        </Flex>
    )
};
