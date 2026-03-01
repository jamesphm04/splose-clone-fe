import { useNew } from "./useNew";
import "./styles.css";
import { Content, Header } from 'antd/es/layout/layout'
import { Button, Flex, Form, Select } from "antd";

export const New: React.FC = () => {

    const {
        form,
        loading,
        handleSubmit,
        handleCancel
    } = useNew();

    return (
        <div className="page-container">
            <Header className="header">
                <div className="page-title">New Progress Note</div>
                <Flex gap="small">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" loading={loading} onClick={() => form.submit()}>Create</Button>
                </Flex>
            </Header>
            <Content className="content">
                <Form className="form" layout="vertical" form={form} onFinish={handleSubmit}>
                    <Flex gap="large" align="start">
                        <Flex vertical style={{ flex: 0.5 }}>
                            <h3 className="section-title">Note details</h3>
                            <Form.Item name="noteTemplate" label="Create from Template:" required>
                                <Select options={[
                                    { label: 'Template 1', value: 'template1' },
                                    { label: 'Template 2', value: 'template2' },
                                ]} />
                            </Form.Item>
                        </Flex>
                    </Flex>
                </Form>
            </Content>
        </div>
    )
}