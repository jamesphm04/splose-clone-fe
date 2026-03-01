import React, { useState } from 'react';
import { Input, Upload, Button, Flex, type MenuProps, Dropdown, Collapse } from 'antd';
import { PaperClipOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import './styles.css';
import RecordBar from '@/components/molecules/record-bar/RecordBar';
import type { ChatMessage } from '../../../types';
import { useChatInput } from './useChatInput';

const { TextArea } = Input;


interface ChatInputProps {
    loading: boolean;
    handleAddChatMessage: (message: ChatMessage) => void;
    scrollToBottom: () => void;
    setLoading: (loading: boolean) => void;
}


const ChatInput: React.FC<ChatInputProps> = ({
    loading,
    handleAddChatMessage,
    scrollToBottom,
    setLoading,
}) => {

    const {
        recording,
        inputValue,
        handleStopRecording,
        setInputValue,
        handleKeyDown,
        handleSendMessage,
        handleUploadChange,
        handleOnClickRecord
    } = useChatInput({ handleAddChatMessage, scrollToBottom, setLoading });
    return (
        <Flex vertical gap={8} className="custom-container">
            {recording &&
                <RecordBar recording={recording} handleStopRecording={handleStopRecording} />
            }
            <Flex gap={16}>
                <TextArea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask assistant..."
                    autoSize={{ minRows: 4, maxRows: 4 }}
                    disabled={loading}
                    className="chat-input"
                />

                <Flex gap={4}>

                    <Upload
                        fileList={[]}
                        onChange={handleUploadChange}
                        beforeUpload={() => false}
                        maxCount={1}
                        showUploadList={false}
                    >
                        <Button icon={<PaperClipOutlined />} disabled={loading} />
                    </Upload>
                    <Button
                        danger={recording}
                        icon={<AudioOutlined />}
                        disabled={loading}
                        onClick={handleOnClickRecord}
                    />
                    <Button
                        type="primary"

                        icon={<SendOutlined />}
                        onClick={handleSendMessage}
                        disabled={loading || (!inputValue.trim())}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ChatInput;