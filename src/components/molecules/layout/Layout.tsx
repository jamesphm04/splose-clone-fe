// src/pages/dashboard/DashboardLayout.tsx
import { Layout as AntLayout } from 'antd';
import Navbar from '../navbar/NavBar';
import type { ReactNode } from 'react';
import './styles.css';

const { Content } = AntLayout;

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <AntLayout>
            <Navbar />
            <Content>{children}</Content>
        </AntLayout>
    );
};

export default Layout;