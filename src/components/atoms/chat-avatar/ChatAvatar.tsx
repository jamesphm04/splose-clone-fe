import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './styles.css';

interface AvatarAtomProps {
    role: 'user' | 'assistant';
}

export const ChatAvatar: React.FC<AvatarAtomProps> = ({ role }) => {
    return (
        <Avatar className={`message-avatar ${role}`}>
            {role === 'user' ? (
                <UserOutlined />
            ) : (
                <img
                    src="/assistant-logo.png"
                    alt="assistant"
                    className="assistant-avatar-img"
                />
            )}
        </Avatar>
    );
};