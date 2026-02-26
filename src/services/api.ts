import axios from 'axios';
import type { AuthResponse, LoginCredentials, User } from '../types';
import { PatientModel, type PatientDB, type PatientAPIFetchResponse, type PatientAPIGetByIdResponse, type Patient, type PatientAPICreateResponse, type PatientAPIUpdateResponse } from '../types/Patient';
import { type Note, type NoteAPIGetByPatientIdResponse } from '../types/Note';
import { authLogout } from '../utils/auth';
import { message } from 'antd';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/login') &&
            !originalRequest.url.includes('/auth/refresh')
        ) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                authLogout();
                return Promise.reject(error);
            }

            try {
                const { data } = await api.post('/auth/refresh', { refreshToken });

                if (data.success) {
                    const { accessToken, refreshToken: newRefreshToken } = data.data.tokens;

                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', newRefreshToken);

                    originalRequest.headers.set('Authorization', `Bearer ${accessToken}`);
                    return api(originalRequest);
                }
                message.error('Session expired. Please login again.');
                authLogout();
                return Promise.reject(error);

            } catch (err) {
                authLogout();
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);


export default api;

export const authAPI = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const { data } = await api.post('/auth/login', credentials);

            if (data.success) {
                const { accessToken, refreshToken } = data.data.tokens;
                const { id, username, email } = data.data.user;
                return { success: true, user: { id, username, email }, accessToken, refreshToken };
            }

            return { success: false, message: data.error || 'Login failed' };
        } catch (err: any) {
            return { success: false, message: err.response?.data?.error || err.message || 'Login failed' };
        }
    },
    async logout(): Promise<void> {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }
};

export const patientAPI = {
    async fetch(): Promise<PatientAPIFetchResponse> {
        try {
            const { data } = await api.get('/patients');
            if (data.success) {
                const response: PatientAPIFetchResponse = {
                    success: true,
                    data: data.data.map(
                        (db: any) => PatientModel.fromDB(db)
                    ),
                    message: data.message
                }
                return response;
            }
            return { success: false, message: data.error || 'Failed to fetch patients' };
        } catch (err: any) {
            return { success: false, message: err.response?.data?.error || err.message || 'Failed to fetch patients' };
        }
    },
    async getById(id: string): Promise<PatientAPIGetByIdResponse> {
        try {
            const { data } = await api.get(`/patients/${id}`);
            if (data.success) {
                return { success: true, data: PatientModel.fromDB(data.data), message: data.message };
            }
            return { success: false, message: data.error || 'Failed to fetch patient' };
        } catch (err: any) {
            return { success: false, message: err.response?.data?.error || err.message || 'Failed to fetch patient' };
        }
    },
    async create(payload: PatientDB): Promise<PatientAPICreateResponse> {
        try {
            const { data } = await api.post('/patients', payload);
            if (data.success) {
                const response: PatientAPICreateResponse = {
                    success: true,
                    data: PatientModel.fromDB(data.data),
                    message: data.message
                }
                return response;
            }
            return { success: false, message: data.error || 'Failed to create patient' };
        } catch (err: any) {
            return { success: false, message: err.response?.data?.error || err.message || 'Failed to create patient' };
        }
    },
    async update(id: string, payload: PatientDB): Promise<PatientAPIUpdateResponse> {
        try {
            const { data } = await api.patch(`/patients/${id}`, payload);
            if (data.success) {
                const response: PatientAPIUpdateResponse = {
                    success: true,
                    data: PatientModel.fromDB(data.data),
                    message: data.message
                }
                return response;
            }
            return { success: false, message: data.error || 'Failed to update patient' };
        } catch (err: any) {
            return { success: false, message: err.response?.data?.error || err.message || 'Failed to update patient' };
        }
    }
}

export const noteAPI = {
    async getByPatientId(patientId: string): Promise<NoteAPIGetByPatientIdResponse> {
        try {
            const { data } = await api.get(`/notes/patient/${patientId}`);
            if (data.success) {

                const notes: Note[] = data.data.map((db: any) => {

                    const user: User = {
                        id: db.user.id,
                        username: db.user.username,
                        email: db.user.email,
                    }
                    return {
                        id: db.id,
                        patientId: db.patientId,
                        userId: db.userId,
                        title: db.title,
                        content: db.content,
                        createdAt: db.createdAt,
                        updatedAt: db.updatedAt,
                        user: user,
                    } as Note;
                })
                const response: NoteAPIGetByPatientIdResponse = {
                    success: true,
                    data: notes,
                    message: data.message
                }
                return response;
            }
            return { success: false, message: data.error || `Failed to fetch notes for patient ${patientId}` };
        } catch (err: any) {
            return { success: false, message: err.response?.data?.error || err.message || `Failed to fetch notes for patient ${patientId}` };
        }
    }
}