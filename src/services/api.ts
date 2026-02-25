import axios from 'axios';
import type { AuthResponse, LoginCredentials } from '../types';
import { PatientModel, type PatientDB, type PatientAPIFetchResponse, type PatientAPIGetByIdResponse, type Patient, type PatientAPICreateResponse } from '../types/Patient';

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
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const { data } = await api.post('/auth/refresh', { refreshToken });
                    if (data.success) {
                        const { accessToken, refreshToken } = data.data.tokens;
                        localStorage.setItem('accessToken', accessToken);
                        localStorage.setItem('refreshToken', refreshToken);
                        originalRequest.headers.set('Authorization', `Bearer ${accessToken}`);
                        return api.request(originalRequest);
                    }
                } catch {
                    return Promise.reject(error);
                }
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
    // async logout(): Promise<void> {
    //     await api.post('/auth/logout');
    // }
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
    }
}

