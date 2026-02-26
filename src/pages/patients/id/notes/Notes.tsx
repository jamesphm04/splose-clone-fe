import { useNotes } from "./useNotes";
import "./styles.css";
import { Button, Input, Table } from "antd";
import { Header } from "antd/es/layout/layout";
import { MessageOutlined, MailOutlined, MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import ButtonGroup from "antd/es/button/ButtonGroup"
import { useDetails } from "../details/useDetails";
import { SideBar } from "../../../../components/molecules/sidebar/SideBar";

export const Notes: React.FC = () => {

    const {
        noteTableColumns,
        notes,
        patient,
        sideBarItems,
        selectedSideBarItem,
        handleNewSMS,
        handleNewEmail,
        handleActions,
        handleSideBarItemClick,
    } = useDetails();


    return patient ? (
        <div className="page-container">
            <Header className="header">
                <span className="page-title">
                    Patient: {patient.firstName} {patient.lastName}
                </span>
                <ButtonGroup>
                    <Button icon={<MessageOutlined />} onClick={handleNewSMS}>
                        New SMS
                    </Button>
                    <Button icon={<MailOutlined />} onClick={handleNewEmail}>
                        New Email
                    </Button>
                    <Button icon={<MoreOutlined />} onClick={handleActions}>
                        Actions
                    </Button>
                </ButtonGroup>
            </Header>
            <div className="main">
                <SideBar items={sideBarItems} selectedKey={selectedSideBarItem} handleItemClick={handleSideBarItemClick} />
                <div className="content">
                    <Header className="header font-24" >
                        <span className="page-title">Progress notes</span>
                        <Button type="primary" icon={<PlusOutlined />}>New note</Button>
                    </Header>
                    <div className="table-container">
                        <div className="table-search-container">
                            <Input placeholder="Search for content and title" />
                            <Button icon={<SearchOutlined />}>Search</Button>
                        </div>
                        <Table dataSource={notes} columns={noteTableColumns} />
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}