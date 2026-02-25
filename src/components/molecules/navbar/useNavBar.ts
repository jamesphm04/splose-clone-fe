
import { useNavigate, useLocation } from 'react-router-dom';

const useNavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        { label: 'Dashboard', key: '/dashboard' },
        { label: 'Patients', key: '/patients' },
        { label: 'Prompts', key: '/prompts' },
    ];

    const handleItemClick = (e: any) => {
        navigate(e.key);
    };

    const selectedKey = items.find(item =>
        location.pathname.startsWith(item.key)
    )?.key;
    return {
        items,
        selectedKey,
        handleItemClick,
    }
}

export default useNavBar;