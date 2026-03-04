import { useState, useRef } from 'react';
import type { ChatMessage } from '@/types/chat';
import { conversationAPI } from '../../../services/api';
import { useParams } from 'react-router-dom';
import { message as antMessage } from 'antd';
import type { SendMessagePayload } from '@/types/chat';

interface UseChatInputProps {
    handleAddChatMessage: (message: ChatMessage) => void;
    scrollToBottom: () => void;
    setLoading: (loading: boolean) => void;
}

export const useChatInput = ({ handleAddChatMessage, scrollToBottom, setLoading }: UseChatInputProps) => {
    const [inputValue, setInputValue] = useState('');
    const [recording, setRecording] = useState(false);
    const [attachment, setAttachment] = useState<File | null>(null);

    // MediaRecorder internals — refs so they don't trigger re-renders
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);

    const { id: noteID } = useParams<{ id: string }>();

    const isAudio = attachment?.type.startsWith('audio/');

    // ── Stop recording ─────────────────────────────────────────────────────────
    // Called by RecordBar's Send button or auto-stop at 60s.
    // Stopping the MediaRecorder fires onstop, which builds the File and sets attachment.
    const handleStopRecording = () => {
        if (mediaRecorderRef.current && recording) {
            mediaRecorderRef.current.stop(); // → triggers onstop below
            setRecording(false);
        }
    };

    const handleOnClickRecord = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            // When the recorder stops, build a File and store it as the attachment.
            // This works whether stop() was called manually or by the auto-stop timer.
            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const file = new File([blob], `recording-${Date.now()}.webm`, {
                    type: 'audio/webm',
                });
                setAttachment(file);
                // Release the mic
                streamRef.current?.getTracks().forEach((t) => t.stop());
                streamRef.current = null;
            };

            mediaRecorder.start();
            setRecording(true);
        } catch {
            antMessage.error('Could not access microphone');
        }
    };

    // ── File upload ────────────────────────────────────────────────────────────
    const handleUploadChange = (info: any) => {
        const latest = info.fileList.slice(-1)[0];
        if (!latest?.originFileObj) return;
        setAttachment(latest.originFileObj as File);
    };

    // ── Send ───────────────────────────────────────────────────────────────────
    const handleSendMessage = async () => {
        if (!noteID || (!inputValue.trim() && !attachment)) return;
        setLoading(true);
        scrollToBottom();
        setInputValue('');
        setAttachment(null);

        try {

            const payload: SendMessagePayload = {
                message: inputValue,
                noteID,
            };

            const userMessage: ChatMessage = {
                role: 'user',
                content: inputValue,
                attachment: attachment ? {
                    name: attachment.name,
                    mimeType: attachment.type,
                    url: URL.createObjectURL(attachment),
                } : undefined,
            };

            if (attachment) {
                payload.attachment = {
                    blob: attachment,
                    mimeType: attachment.type,
                    name: attachment.name,
                };
                userMessage.attachment = attachment ? {
                    name: attachment.name,
                    mimeType: attachment.type,
                    url: URL.createObjectURL(attachment),
                } : undefined;
            }
            handleAddChatMessage(userMessage);

            const response = await conversationAPI.sendMessage(payload);

            if (response.success) {
                handleAddChatMessage({ role: response.data?.role as 'user' | 'assistant', content: response.data?.content || '' });

            } else {
                antMessage.error(response.message || 'Failed to send message');
            }
        } catch (error) {
            console.error(error);
            antMessage.error('Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const clearAttachment = () => {
        setAttachment(null);
    };

    return {
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
    };
};