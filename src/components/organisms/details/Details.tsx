import { Button } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { MessageOutlined, MailOutlined, MoreOutlined } from '@ant-design/icons';
import ButtonGroup from "antd/es/button/ButtonGroup"
import { useDetails } from "./useDetails";
import "./styles.css";

export const Details: React.FC = () => {
    const {
        patient,
        handleNewSMS,
        handleNewEmail,
        handleActions,
    } = useDetails();

    return patient ? (
        <Content className="content">
            <Header className="header">
                <div className="page-title">
                    Patient: {patient.firstName} {patient.lastName}
                </div>
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
        </Content>
    ) : (
        <Content className="content">
            <Header className="header">
                <div className="page-title">Patient not found</div>
            </Header>
        </Content>
    );
}