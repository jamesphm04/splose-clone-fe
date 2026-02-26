import type { User } from "./index";

export interface Note {
    id: string;
    patientId: string;
    userId: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export interface NoteAPIGetByPatientIdResponse {
    success: boolean;
    data?: Note[];
    message?: string;
}

