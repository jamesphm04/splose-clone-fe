export interface User {
    id: string;
    email: string;
    username: string;
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
    accessToken?: string;
    refreshToken?: string;
    message?: string;
}

export interface Patient {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    fullAddress: string;
}

export interface PatientDB {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    fullAddress: string;
}
