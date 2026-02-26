

import { Menu } from 'antd';
import './styles.css';
import { useSideBar } from './useSideBar';

interface SideBarProps {
    items: { label: string; key: string }[];
    selectedKey?: string | "details";
    handleItemClick: (e: any) => void;
}

export const SideBar: React.FC<SideBarProps> = ({ items, selectedKey, handleItemClick }) => {
    return (
        <Menu
            className="sidebar"
            items={items}
            theme="light"
            mode="inline"
            selectedKeys={selectedKey ? [selectedKey] : []}
            onClick={handleItemClick}
        />
    );
};