import React from 'react'
import { Layout, Avatar, Dropdown } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

import { useDashboard } from './useDashboard';
import MarkdownEditor from '../../components/organisms/markdownEditor/MarkdownEditor';
import Chatbox from '../../components/organisms/chatbox/Chatbox';
import './styles.css';

const { Header, Content } = Layout;

const Dashboard: React.FC = () => {
    const { user, handleLogout } = useDashboard();


    const menuItems: MenuProps['items'] = [
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: handleLogout
        }
    ]

    return (
        <Layout className="dashboard-layout">
            <Header className="dashboard-header">
                <div className="header-left">
                    <h2>Practice Management System</h2>
                </div>
                <div className="header-right">
                    <span className="user-name">{user?.name}</span>
                    <Dropdown menu={{ items: menuItems }} placement="bottomRight">
                        <Avatar icon={<UserOutlined />} className="user-avatar" />
                    </Dropdown>
                </div>
            </Header>

            <Content className="dashboard-content">
                <div className="workspace">
                    <div className="workspace-left">
                        <MarkdownEditor />
                    </div>
                    <div className="workspace-divider" />
                    <div className="workspace-right">
                        <Chatbox />
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default Dashboard;