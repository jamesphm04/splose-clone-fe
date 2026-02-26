import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { patientAPI } from '../../../services/api';
import { Form, message as antMessage } from 'antd';

export const useNewPatient = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const { user } = useAuth();

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);
            // validate the required fields
            if (!values.firstName || !values.lastName || !values.dateOfBirth || !values.email || !values.fullAddress || !values.phoneNumber || !values.gender || !values.phoneNumber) {
                antMessage.error('Please fill in all required fields');
                return;
            }

            const payload = {
                email: values.email || '',
                firstName: values.firstName || '',
                lastName: values.lastName || '',
                dateOfBirth: values.dateOfBirth?.format('YYYY-MM-DD') || '',
                gender: values.gender || '',
                fullAddress: values.fullAddress || '',
                phoneNumber: values.phoneNumber || '',
                userId: user?.id || '',
            }
            const response = await patientAPI.create(payload);
            if (response.success) {
                antMessage.success(`Patient ${response.data?.firstName} ${response.data?.lastName} created successfully`);
                navigate(`/patients/${response.data?.id}/details` || '/patients');
                form.resetFields();
            } else {
                antMessage.error(response.message || 'Failed to create patient');
            }
        } catch (error) {
            console.error(error);
            antMessage.error('Failed to create patient');
        } finally {
            setLoading(false);
        }
    }
    return {
        form,
        loading,
        navigate,
        handleSubmit,
        normFile,
    }
}