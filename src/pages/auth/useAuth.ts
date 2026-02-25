import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { useAuth as useAuthContext } from '../../contexts/AuthContext';
import type { LoginCredentials } from '../../types';
import './styles.css';
import { message as antMessage } from 'antd';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const handleLogin = async (values: LoginCredentials) => {
        try {
            setLoading(true);
            const response = await authAPI.login({ email: values.email, password: values.password });
            console.log(response);
            if (response.success && response.user && response.accessToken && response.refreshToken) {
                await login(response.user, response.accessToken, response.refreshToken);
                antMessage.success('Login successful');
                navigate('/dashboard');
            } else {
                antMessage.error(response.message || 'Login failed');
            }
        } catch (error) {
            console.log(error);
            const message = error instanceof Error ? error.message : 'Unknown error';
            antMessage.error(`An error occurred during login: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return { loading, handleLogin };
};
