import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../../../types';
import type { UploadFile } from 'antd';
import { chatAPI } from '../../../services/mockAPI';
import type { MessageInstance } from 'antd/es/message/interface';

const useChatbox = (antMessage: MessageInstance) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hello! How can I assist you today?',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim() && fileList.length === 0) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date(),
            imageUrl: fileList.length > 0 ? URL.createObjectURL(fileList[0].originFileObj as Blob) : undefined,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setFileList([]);
        setLoading(true);

        try {
            const response = await chatAPI.sendMessage(
                inputValue,
                fileList[0]?.originFileObj as File
            );
            setMessages((prev) => [...prev, response]);
        } catch (error) {
            antMessage.error('Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                stream.getTracks().forEach((track) => track.stop());

                setLoading(true);
                try {
                    const transcription = await chatAPI.processVoiceRecording(audioBlob);

                    const userMessage: ChatMessage = {
                        id: Date.now().toString(),
                        role: 'user',
                        content: transcription,
                        timestamp: new Date(),
                    };

                    setMessages((prev) => [...prev, userMessage]);

                    const response = await chatAPI.sendMessage(transcription);
                    setMessages((prev) => [...prev, response]);
                } catch (error) {
                    antMessage.error('Failed to process voice recording');
                } finally {
                    setLoading(false);
                }
            };

            mediaRecorder.start();
            setRecording(true);
            antMessage.info('Recording started...');
        } catch (error) {
            antMessage.error('Failed to access microphone');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && recording) {
            mediaRecorderRef.current.stop();
            setRecording(false);
            antMessage.success('Recording stopped');
        }
    };

    const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
        setFileList(fileList.slice(-1));
    };

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return {
        messages,
        inputValue,
        loading,
        recording,
        fileList,
        messagesEndRef,
        setInputValue,
        handleSendMessage,
        startRecording,
        stopRecording,
        formatTime,
        handleKeyDown,
        handleUploadChange,
    }
}

export default useChatbox;