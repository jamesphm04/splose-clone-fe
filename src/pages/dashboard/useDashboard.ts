import { useAuth } from '../../contexts/AuthContext';


export const useDashboard = () => {
    const { user, logout } = useAuth();


    const handleLogout = () => {
        logout();
    }


    return {
        user,
        handleLogout,
    }
}