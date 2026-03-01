import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react";
import { message as antMessage, Form } from "antd";
import { noteAPI } from "@/services/api";
import type { NoteAPICreateUpdateRequest } from "@/types/Note";

const noteTemplates = [
    {
        id: 'template1',
        title: 'Template 1',
        content: '## 🦷 Dental Procedure Note\n\n**Tooth:** 36  \n**Procedure:** Composite filling\n\n### Steps\n1. Local anaesthesia\n2. Caries removal\n3. Composite placement\n\n### Materials\n| Item | Brand |\n|--------|---------|\n| Composite | 3M Filtek |\n| Etchant | Scotchbond |\n\n### Post-Op Advice\n- Avoid chewing for 1 hr\n- No hot drinks today\n',
    },
    {
        id: 'template2',
        title: 'Template 2',
        content: '## 📝 SOAP Note\n\n**Date:** 2026-02-26  \n**Clinician:** Dr. Kane Splose\n\n### S — Subjective\n- Persistent lower back pain (6/10)\n- Worse in mornings, improves with movement\n\n### O — Objective\n| Test | Result |\n|------|----------|\n| ROM | Reduced flexion |\n| Palpation | Paraspinal tenderness |\n| Neuro exam | Normal |\n\n### A — Assessment\n- Mechanical lower back pain\n\n### P — Plan\n- Physiotherapy referral\n- Core strengthening exercises\n- Ibuprofen 400mg BID x 5 days\n',
    },
]

export const useNew = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const patientId = searchParams.get('patientId');

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!patientId || !user?.id) return;
        try {
            setLoading(true);
            const selectedTemplate = noteTemplates.find(template => template.id === form.getFieldValue('noteTemplate'));
            if (!selectedTemplate) {
                antMessage.error('Please select a template');
                return;
            }
            const payload: NoteAPICreateUpdateRequest = {
                patientId: patientId,
                userId: user.id,
                title: selectedTemplate.title,
                content: selectedTemplate.content,
            }
            const response = await noteAPI.create(payload);
            if (response.success) {
                antMessage.success('Note created successfully');
                navigate(`/notes/${response.data?.noteId}/edit?patientId=${patientId}`);
            } else {
                antMessage.error(response.message || 'Failed to create note');
            }

        } catch (error: any) {
            console.error(error);
            antMessage.error(error.response?.data?.message || error.message || 'Failed to create note');
        } finally {
            setLoading(false);
        }
    }

    const handleCancel = () => {
        navigate(`/patients/${patientId}/notes`);
    }

    return {
        form,
        loading,
        handleSubmit,
        handleCancel,
    }
}