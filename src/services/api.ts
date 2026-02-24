import axios from 'axios';
import type { AuthResponse, LoginCredentials } from '../types';

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
    }
};