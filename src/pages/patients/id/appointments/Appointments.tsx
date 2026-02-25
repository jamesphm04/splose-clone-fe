import { useAppointments } from "./useAppointments";
import "./styles.css";
import { Content, Header } from "antd/es/layout/layout";
import { Table } from "antd";

export const Appointments: React.FC = () => {
    const { appointments, columns } = useAppointments();
    return (
        <div className="page-container">
            <Header className="header">
                <span className="page-title">Appointments</span>
            </Header>
            <Content className="content">
                <Table dataSource={appointments} columns={columns} />
            </Content>
        </div>
    )
}