import { Button, Card, Flex } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { MessageOutlined, MailOutlined, MoreOutlined } from '@ant-design/icons';
import ButtonGroup from "antd/es/button/ButtonGroup"
import { useDetails } from "./useDetails";
import "./styles.css";
import { SideBar } from "../../../../components/molecules/sidebar/SideBar";
import { CardRow } from "../../../../components/atoms/card-row/CardRow";

export const Details: React.FC = () => {
    const {
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
                        <span className="page-title">Details</span>
                    </Header>
                    <div className="card-container">
                        <Card className="card" title="General details">
                            <Flex gap="small" orientation="vertical">
                                <CardRow label="First Name" value={patient.firstName} />
                                <CardRow label="Last Name" value={patient.lastName} />
                                <CardRow label="Date of Birth" value={patient.dateOfBirth} />
                                <CardRow label="Gender" value={patient.gender} />
                                <CardRow label="Email" value={patient.email} />
                                <CardRow label="Phone Number" value={patient.phoneNumber} />
                                <CardRow label="Full Address" value={patient.fullAddress} />
                            </Flex>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}