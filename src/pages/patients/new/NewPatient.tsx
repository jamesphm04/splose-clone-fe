import React from 'react'
import "./styles.css"
import { useNewPatient } from "./useNewPatient"
import { Content, Header } from 'antd/es/layout/layout'
import { Button, DatePicker, Flex, Form, Input, Select, Upload } from 'antd'
import { PlusOutlined } from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea"


export const NewPatient: React.FC = () => {
    const { form, loading, navigate, handleSubmit, normFile } = useNewPatient()
    return (
        <div className="page-container">
            <Header className="header">
                <div className="page-title">Create Patient</div>
                <Flex gap="small">
                    <Button onClick={() => navigate('/patients')}>Cancel</Button>
                    <Button type="primary" loading={loading} onClick={() => form.submit()}>Create</Button>
                </Flex>
            </Header>
            <Content className="content">
                <Form className="form" layout="vertical" form={form} onFinish={handleSubmit}>
                    <Flex gap="large" align="start">
                        {/* LEFT COLUMN */}
                        <Flex vertical style={{ flex: 1 }}>
                            <h3 className="section-title">General details</h3>

                            <Flex gap="small">
                                <Form.Item name="firstName" label="First Name:" required style={{ flex: 1 }}>
                                    <Input />
                                </Form.Item>

                                <Form.Item name="lastName" label="Last Name:" required style={{ flex: 1 }}>
                                    <Input />
                                </Form.Item>
                            </Flex>

                            <Form.Item name="gender" label="Gender:" required>
                                <Select options={[
                                    { label: 'Male', value: 'male' },
                                    { label: 'Female', value: 'female' },
                                    { label: 'Other', value: 'other' },
                                    { label: 'Unknown', value: 'unknown' }
                                ]} />
                            </Form.Item>

                            <Form.Item name="dateOfBirth" label="Date of Birth:" required>
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item name="email" label="Email:" required tooltip="This email will be used for email notifications (if enabled)." >
                                <Input />
                            </Form.Item>

                            <Form.Item name="phoneNumber" label="Phone Number:" required tooltip="This phone number will be used for SMS notifications (if enabled).">
                                <Input />
                            </Form.Item>

                            <Form.Item name="fullAddress" label="Address:" required>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Notes:">
                                <TextArea rows={4} name="notes" />
                            </Form.Item>
                        </Flex>

                        {/* RIGHT COLUMN */}
                        <Flex vertical align="start" style={{ flex: 1 }}>
                            <Form.Item
                                label="Profile Image"
                                name="avatar"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload
                                    listType="picture-card"
                                    maxCount={1}
                                    accept="image/*"
                                    beforeUpload={() => false}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Flex>
                    </Flex>
                </Form>
            </Content>
        </div >
    )
}