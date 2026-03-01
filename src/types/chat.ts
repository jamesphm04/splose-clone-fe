export type AttachmentKind = 'audio' | 'file';

export interface Attachment {
    kind: AttachmentKind;
    /** Object URL for preview / playback */
    previewUrl: string;
    /** The raw blob/file to be sent with the request */
    blob: Blob;
    /** Display name shown in the preview chip */
    name: string;
    /** MIME type e.g. "audio/webm" or "image/png" */
    mimeType: string;
}

// ─── Chat Message ─────────────────────────────────────────────────────────────

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    attachment?: Attachment;
}

// ─── Send Payload (what gets sent to the API) ─────────────────────────────────

export interface SendMessagePayload {
    text: string;
    attachment?: {
        blob: Blob;
        mimeType: string;
        name: string;
    };
}