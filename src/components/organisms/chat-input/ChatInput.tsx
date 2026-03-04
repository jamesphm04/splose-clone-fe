import React from 'react';
import { Input, Upload, Button, Flex, Tooltip } from 'antd';
import {
    PaperClipOutlined,
    AudioOutlined,
    SendOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import './styles.css';
import RecordBar from '@/components/molecules/record-bar/RecordBar';
import type { ChatMessage } from '@/types/chat';
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
        isAudio,
        inputValue,
        attachment,
        handleStopRecording,
        setInputValue,
        handleKeyDown,
        handleSendMessage,
        handleUploadChange,
        handleOnClickRecord,
        clearAttachment,
    } = useChatInput({ handleAddChatMessage, scrollToBottom, setLoading });


    const canSend = !loading && (!!inputValue.trim() || !!attachment);
    const btnDisabled = loading || recording || !!attachment;
    return (
        <Flex vertical gap={8} className="custom-container">

            {/* ── Recording bar ── */}
            {recording && (
                <RecordBar
                    recording={recording}
                    handleStopRecording={handleStopRecording}
                />
            )}

            {/* ── Attachment preview chip ── */}
            {attachment && !recording && (
                <Flex align="center" gap={8} className="attachment-chip">
                    {isAudio ? (
                        <>
                            <AudioOutlined />
                            <span className="attachment-name">{attachment.name}</span>
                            <audio
                                src={URL.createObjectURL(attachment)}
                                controls
                                className="audio-player"
                            />
                        </>
                    ) : (
                        <>
                            <PaperClipOutlined />
                            <span className="attachment-name">{attachment.name}</span>
                        </>
                    )}
                    <Tooltip title="Remove attachment">
                        <Button
                            type="text"
                            size="small"
                            icon={<CloseOutlined />}
                            onClick={clearAttachment}
                            style={{ marginLeft: 'auto', color: '#8c8c8c' }}
                        />
                    </Tooltip>
                </Flex>
            )}

            {/* ── Input row ── */}
            <Flex gap={16}>
                <TextArea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={recording ? 'Recording in progress…' : 'Ask assistant...'}
                    autoSize={{ minRows: 4, maxRows: 4 }}
                    disabled={loading}
                    className="chat-input"
                />

                <Flex gap={4} align="flex-start">
                    {/* File upload */}
                    <Tooltip title={attachment ? 'Remove attachment first' : 'Attach file'}>
                        <Upload
                            fileList={[]}
                            onChange={handleUploadChange}
                            beforeUpload={() => false}
                            maxCount={1}
                            showUploadList={false}
                            disabled={btnDisabled}
                        >
                            <Button
                                icon={<PaperClipOutlined />}
                                disabled={btnDisabled}
                            />
                        </Upload>
                    </Tooltip>

                    {/* Record */}
                    <Tooltip title={attachment ? 'Remove attachment first' : 'Record audio'}>
                        <Button
                            icon={<AudioOutlined />}
                            disabled={btnDisabled}
                            onClick={handleOnClickRecord}
                        />
                    </Tooltip>

                    {/* Send */}
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={handleSendMessage}
                        disabled={!canSend}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ChatInput;