import { useState, useEffect } from "react";
import { patientAPI } from "../../../services/api";
import type { Patient } from "../../../types/Patient";
import { useParams } from "react-router-dom";

export const useDetails = () => {
    const [patient, setPatient] = useState<Patient | null>(null)
    const { id } = useParams<{ id: string }>();

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
    return {
        patient,
        handleNewSMS,
        handleNewEmail,
        handleActions,
    }
}