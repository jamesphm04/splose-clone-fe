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

export interface NoteAPICreateUpdateRequest {
    patientId: string;
    userId: string;
    title: string;
    content: string;
}

export interface NoteAPICreateResponse {
    success: boolean;
    data?: {
        noteId: string;
        conversationId: string;
    }
    error?: string;
    message?: string;
}

export interface NoteAPIGetByIdResponse {
    success: boolean;
    data?: Note;
    error?: string;
    message?: string;
}

export class NoteModel implements Note {
    id: string;
    patientId: string;
    userId: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: User;

    constructor(note: Note) {
        this.id = note.id;
        this.patientId = note.patientId;
        this.userId = note.userId;
        this.title = note.title;
        this.content = note.content;
        this.createdAt = note.createdAt;
        this.updatedAt = note.updatedAt;
        this.user = note.user;
    }

    static fromDB(db: any): NoteModel {
        const user: User = {
            id: db.user.id,
            username: db.user.username,
            email: db.user.email,
        }

        return new NoteModel({
            id: db.id,
            patientId: db.patientId,
            userId: db.userId,
            title: db.title,
            content: db.content,
            createdAt: db.createdAt,
            updatedAt: db.updatedAt,
            user: user,
        } as Note);
    }
}