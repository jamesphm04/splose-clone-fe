// ─── Chat Message ─────────────────────────────────────────────────────────────
export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    attachment?: {
        name: string;
        mimeType: string;
        url: string; // object URL for preview
    };
}

// ─── Send Payload (what gets sent to the API) ─────────────────────────────────

export interface SendMessagePayload {
    message: string;
    noteID: string;
    attachment?: {
        blob: Blob;
        mimeType: string;
        name: string;
    };
}

export interface SendMessageResponseDB {
    success: boolean;
    data?: {
        id: string;
        role: 'user' | 'assistant';
        content: string;
        createdAt: string;
    }
    error?: string;
    message?: string;
}

export interface SendMessageResponse {
    success: boolean;
    data?: {
        id: string;
        content: string;
        role: 'user' | 'assistant';
        createdAt: string;
    }
    error?: string;
    message?: string;
}

export interface GetMessagesResponse {
    success: boolean;
    data?: {
        role: 'user' | 'assistant';
        content: string;
        createdAt: string;
        attachments?: {
            name: string;
            type: string;
            url: string
        }[];
    }[]
    message?: string;
}