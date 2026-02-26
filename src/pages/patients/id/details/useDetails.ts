import { useState, useEffect } from "react";
import { patientAPI } from "../../../../services/api";
import type { Patient, PatientDB } from "../../../../types/Patient";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Form, message } from "antd";
import dayjs from "dayjs";
export const sideBarItems = [
    { label: 'Details', key: 'details' },
    { label: 'Appointments', key: 'appointments' },
    { label: 'Progress notes', key: 'progress-notes' },
    { label: 'Invoices', key: 'invoices' },
]

export const useDetails = () => {
    const [patient, setPatient] = useState<Patient | null>(null)
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const selectedSideBarItem = sideBarItems.find(item =>
        location.pathname.endsWith(item.key)
    )?.key || 'details';

    const handleSideBarItemClick = (e: any) => {
        if (!id) return;
        navigate(`/patients/${id}/${e.key}`);
    }

    useEffect(() => {
        fetchPatient()
    }, [id])

    const fetchPatient = async () => {
        if (!id) return;
        const response = await patientAPI.getById(id)
        if (response.success) {
            setPatient(response.data || null)
        }
    }
    const handleNewSMS = () => {
        console.log('new SMS', patient)
    }
    const handleNewEmail = () => {
        console.log('new email', patient)
    }
    const handleActions = () => {
        console.log('actions', patient)
    }
    const handleEdit = () => {
        if (!patient) return;
        setIsEditing(true);
        form.setFieldsValue({
            ...patient,
            dateOfBirth: dayjs(patient.dateOfBirth),
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSubmitEdit = async () => {
        const values = await form.validateFields();
        console.log("Updated values:", values);

        if (!id) return;

        const payload: PatientDB = {
            firstName: values.firstName,
            lastName: values.lastName,
            dateOfBirth: values.dateOfBirth?.format('YYYY-MM-DD'),
            gender: values.gender,
            email: values.email,
            phoneNumber: values.phoneNumber,
            fullAddress: values.fullAddress,
        }

        try {
            setLoading(true);
            const response = await patientAPI.update(id, payload);
            if (response.success) {
                message.success('Patient detailsupdated successfully');
                setPatient(response.data || null);
                setIsEditing(false);
                form.resetFields();
            } else {
                message.error(response.message || 'Failed to update patient details');
            }
        } catch (error) {
            console.error(error);
            message.error('Failed to update patient details');
        } finally {
            setLoading(false);
        }
        setIsEditing(false);
    };
    return {
        patient,
        isEditing,
        loading,
        form,
        sideBarItems,
        selectedSideBarItem,
        handleEdit,
        handleNewSMS,
        handleNewEmail,
        handleActions,
        handleSideBarItemClick,
        handleCancel,
        handleSubmitEdit,
    }
}