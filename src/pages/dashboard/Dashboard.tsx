import React from 'react'
import { Layout } from 'antd';
import MarkdownEditor from '../../components/organisms/markdownEditor/MarkdownEditor';
import Chatbox from '../../components/organisms/chatbox/Chatbox';
import './styles.css';

const { Content } = Layout;

const Dashboard: React.FC = () => {
    return (
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
    );
};

export default Dashboard;