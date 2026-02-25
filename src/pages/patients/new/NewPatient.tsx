import React from 'react'
import "./styles.css"
import { useNewPatient } from "./useNewPatient"
import { Content, Header } from 'antd/es/layout/layout'
import { Button, Flex } from 'antd'
import { CreatePatientForm } from '../../../components/organisms/forms/create-patient/CreatePatientForm'

export const NewPatient: React.FC = () => {
    const { form, loading, navigate, handleSubmit } = useNewPatient()
    return (
        <Content className="content">
            <Header className="header">
                <div className="page-title">Create Patient</div>
                <Flex gap="small">
                    <Button onClick={() => navigate('/patients')}>Cancel</Button>
                    <Button type="primary" loading={loading} onClick={() => form.submit()}>Create</Button>
                </Flex>
            </Header>
            <CreatePatientForm form={form} onFinish={handleSubmit} />
        </Content>
    )
}