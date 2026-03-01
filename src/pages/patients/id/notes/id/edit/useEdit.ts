import { useState, useEffect } from "react";
import { noteAPI, patientAPI } from '@/services/api';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { message as antMessage } from 'antd';
import { useAuth } from "@/contexts/AuthContext";
import { type NoteAPICreateUpdateRequest } from "@/types/Note";
import { type Patient } from "@/types/Patient";

export const useEdit = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [patient, setPatient] = useState<Patient | null>(null)
    const [isChanged, setIsChanged] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { id: noteId } = useParams();

    const [searchParams] = useSearchParams();
    const patientId = searchParams.get("patientId");

    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        loadPatient();
        loadNote();
    }, []);

    const loadPatient = async () => {
        if (!patientId) return;
        try {
            const response = await patientAPI.getById(patientId);
            if (response.success) {
                setPatient(response.data || null);
            }
            else {
                antMessage.error(response.message || 'Failed to fetch patient');
            }
        }
        catch (error: any) {
            console.error(error);
            antMessage.error(error.response?.data?.message || error.message || 'Failed to fetch patient');
        }
    }

    const loadNote = async () => {
        if (!noteId) return;
        setLoading(true);


        try {
            const response = await noteAPI.getById(noteId);
            if (response.success) {
                setContent(response.data?.content || '');
                setTitle(response.data?.title || '');
                setLoading(false);
            }
            else {
                antMessage.error(response.message || 'Failed to fetch note');
            }
        } catch (error: any) {
            console.error(error);
            antMessage.error(error.response?.data?.message || error.message || 'Failed to fetch note');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        console.log(noteId, patient?.id, user?.id);
        if (!noteId || !patient?.id || !user?.id) {
            antMessage.error('Note ID, patient ID, or user ID is missing');
            return;
        };
        try {
            setLoading(true);
            const payload: NoteAPICreateUpdateRequest = {
                patientId: patient?.id,
                userId: user.id,
                title: title,
                content: content,
            }

            const response = await noteAPI.update(noteId, payload);
            if (response.success) {
                antMessage.success('Note updated successfully');
            }
            else {
                antMessage.error(response.message || 'Failed to update note');
            }
        } catch (error: any) {
            console.error(error);
            antMessage.error(error.response?.data?.message || error.message || 'Failed to update note');
        } finally {
            setLoading(false);
        }
    };

    const handleChangeContent = (value: string) => {
        setContent(value);
        setIsChanged(true);
    }

    const handleChangeTitle = (value: string) => {
        setTitle(value);
        setIsChanged(true);
    }

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    }

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    }

    const handleConfirmDelete = async () => {
        if (!noteId) return;
        try {
            setLoading(true);
            const response = await noteAPI.delete(noteId);
            if (response.success) {
                antMessage.success('Note deleted successfully');
                navigate(`/patients/${patient?.id}/notes`);
            }
        }
        catch (error: any) {
            console.error(error);
            antMessage.error(error.response?.data?.message || error.message || 'Failed to delete note');
        } finally {
            setLoading(false);
        }
    }

    return {
        isChanged,
        isDeleteModalOpen,
        loading,
        content,
        title,
        patient,
        navigate,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete,
        handleChangeTitle,
        handleChangeContent,
        handleSave,
    }
}