import { Button, Card, Flex, Form, Input, Select, DatePicker } from "antd";
import { Header } from "antd/es/layout/layout";
import { MessageOutlined, MailOutlined, MoreOutlined, EditOutlined } from '@ant-design/icons';
import ButtonGroup from "antd/es/button/ButtonGroup"
import { useDetails } from "./useDetails";
import "./styles.css";
import { SideBar } from "../../../../components/molecules/sidebar/SideBar";
import { CardRow } from "../../../../components/atoms/card-row/CardRow";

export const Details: React.FC = () => {
    const {
        patient,
        form,
        loading,
        sideBarItems,
        selectedSideBarItem,
        isEditing,
        handleEdit,
        handleNewSMS,
        handleNewEmail,
        handleActions,
        handleSideBarItemClick,
        handleCancel,
        handleSubmitEdit,
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
                        <Card
                            className="card"
                            title="General details"
                            extra={
                                isEditing ? (
                                    <Flex gap="small">
                                        <Button size="small" loading={loading} onClick={handleCancel}>
                                            Cancel
                                        </Button>
                                        <Button size="small" type="primary" loading={loading} onClick={() => form.submit()}>
                                            Save
                                        </Button>
                                    </Flex>
                                ) : (
                                    <Button size="small" onClick={handleEdit}>
                                        Edit <EditOutlined />
                                    </Button>
                                )
                            }
                        >
                            {isEditing ? (
                                <Form form={form} layout="vertical" onFinish={handleSubmitEdit}>
                                    <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="Date of Birth" name="dateOfBirth">
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item name="gender" label="Gender:" required>
                                        <Select options={[
                                            { label: 'Male', value: 'male' },
                                            { label: 'Female', value: 'female' },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Unknown', value: 'unknown' }
                                        ]} />
                                    </Form.Item>

                                    <Form.Item label="Email" name="email" required tooltip="This email will be used for email notifications (if enabled).">
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="Phone Number" name="phoneNumber" required tooltip="This phone number will be used for SMS notifications (if enabled).">
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="Full Address" name="fullAddress" required>
                                        <Input />
                                    </Form.Item>
                                </Form>
                            ) : (
                                <Flex gap="small" orientation="vertical">
                                    <CardRow label="First Name" value={patient.firstName} />
                                    <CardRow label="Last Name" value={patient.lastName} />
                                    <CardRow label="Date of Birth" value={patient.dateOfBirth} />
                                    <CardRow label="Gender" value={patient.gender} />
                                    <CardRow label="Email" value={patient.email} />
                                    <CardRow label="Phone Number" value={patient.phoneNumber} />
                                    <CardRow label="Full Address" value={patient.fullAddress} />
                                </Flex>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}