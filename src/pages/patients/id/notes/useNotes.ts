import { useEffect, useState } from "react"
import type { Note } from "../../../../types";
import { noteAPI } from "../../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";


export const useNotes = () => {
    const { id: patientId } = useParams<{ id: string }>();
    const [notes, setNotes] = useState<Note[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        fetchProgressNotes()
    }, [patientId])

    const fetchProgressNotes = async () => {
        if (!patientId) return;
        const response = await noteAPI.getByPatientId(patientId)
        if (response.success) {
            setNotes(response.data || [])
        } else {
            message.error(response.message || `Failed to fetch notes for patient ${patientId}`)
        }
    }

    const handleRowDoubleClick = (record: Note) => {
        if (!record.id) return;
        navigate(`/notes/${record.id}/edit?patientId=${record.patientId}`)
    }

    return {
        notes,
        handleRowDoubleClick,
    }
}