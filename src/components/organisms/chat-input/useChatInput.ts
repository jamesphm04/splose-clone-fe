import { useState } from 'react';
import type { ChatMessage } from '../../../types';

interface UseChatInputProps {
    handleAddChatMessage: (message: ChatMessage) => void;
    scrollToBottom: () => void;
    setLoading: (loading: boolean) => void;
}

export const useChatInput = ({ handleAddChatMessage, scrollToBottom, setLoading }: UseChatInputProps) => {
    const [inputValue, setInputValue] = useState('');
    const [recording, setRecording] = useState(false);

    const handleStopRecording = () => {
        setRecording(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSendMessage = () => {
        console.log('Send message');
        setLoading(true);
        //API call
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date(),
        };

        const assistantMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'assistant',
            content: 'Please wait while I process your request...',
            timestamp: new Date(),
        };

        handleAddChatMessage(userMsg);
        handleAddChatMessage(assistantMsg);
        scrollToBottom()
        setLoading(false);
    };

    const handleOnClickRecord = () => {
        console.log('Start recording');
        setRecording(true);
    };

    const handleUploadChange = (info: any) => {
        console.log('Upload change', info);
    };

    return {
        recording,
        inputValue,
        handleStopRecording,
        setInputValue,
        handleKeyDown,
        handleSendMessage,
        handleUploadChange,
        handleOnClickRecord
    }
}