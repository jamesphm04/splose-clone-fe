import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export default api;

export const login = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    return response.data;
}