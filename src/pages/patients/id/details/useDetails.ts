import { useState, useEffect } from "react";
import { patientAPI, noteAPI } from "../../../../services/api";
import type { Patient, PatientDB } from "../../../../types/Patient";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Form, message } from "antd";
import dayjs from "dayjs";
import type { Note, User } from "../../../../types";
import type { ColumnsType } from "antd/es/table";

export const sideBarItems = [
    { label: 'Details', key: 'details' },
    { label: 'Appointments', key: 'appointments' },
    { label: 'Progress notes', key: 'notes' },
    { label: 'Invoices', key: 'invoices' },
]

export const noteTableColumns: ColumnsType<Note> = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Created By', dataIndex: 'user', key: 'user', render: (user: User) => `${user.username}` },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt: string) => dayjs(createdAt).format('dddd DD MMM YYYY, hh:mm A')
    },
    {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (updatedAt: string) => dayjs(updatedAt).format('dddd DD MMM YYYY, hh:mm A')
    },
]

export const useDetails = () => {
    const [patient, setPatient] = useState<Patient | null>(null)
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { id: patientId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const selectedSideBarItem = sideBarItems.find(item =>
        location.pathname.endsWith(item.key)
    )?.key || 'details';

    const handleSideBarItemClick = (e: any) => {
        if (!patientId) return;
        navigate(`/patients/${patientId}/${e.key}`);
    }

    useEffect(() => {
        fetchPatient()
    }, [patientId])

    const fetchPatient = async () => {
        if (!patientId) return;
        const response = await patientAPI.getById(patientId)
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

        if (!patientId) return;

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
            const response = await patientAPI.update(patientId, payload);
            if (response.success) {
                message.success('Patient details updated successfully');
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
    const handleNewNote = () => {
        if (!patientId) return;
        navigate(`/notes/new?patientId=${patientId}`);
    }
    return {
        patient,
        noteTableColumns,
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
        handleNewNote,
    }
}