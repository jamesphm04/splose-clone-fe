export interface User {
    id: string;
    email: string;
    name: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    imageUrl?: string;
    audioUrl?: string;
}

export interface ProgressNote {
    id: string;
    patientName: string;
    sessionDate: string;
    content: string;
    lastModified: Date;
}

export interface AuthResponse {
    success: boolean;
    user?: User;
    token?: string;
    message?: string;
}
