import { Menu, Layout, type MenuProps, Avatar, Dropdown } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../../contexts/AuthContext';

import './styles.css';
import useNavBar from './useNavBar';

const { Header } = Layout;


const Navbar = () => {
    const { user, logout } = useAuth();
    const menuItems: MenuProps['items'] = [
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: logout
        }
    ]

    const { selectedKey, items, handleItemClick } = useNavBar();

    return (
        <Header className="header">
            <div className="logo">Splose Clone AI</div>
            <Menu
                className="menu"
                items={items}
                theme="light"
                mode="horizontal"
                selectedKeys={selectedKey ? [selectedKey] : []}
                onClick={handleItemClick}
            />
            <div className="user-info">
                <span className="user-name">{user?.username}</span>
                <Dropdown menu={{ items: menuItems }} placement="bottomRight">
                    <Avatar icon={<UserOutlined />} className="user-avatar" />
                </Dropdown>
            </div>
        </Header>
    );
};

export default Navbar;