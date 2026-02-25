import { useState, useEffect } from "react";
import { patientAPI } from "../../../../services/api";
import type { Patient } from "../../../../types/Patient";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const sideBarItems = [
    { label: 'Details', key: 'details' },
    { label: 'Appointments', key: 'appointments' },
    { label: 'Progress notes', key: 'progress-notes' },
    { label: 'Invoices', key: 'invoices' },
]


export const useDetails = () => {
    const [patient, setPatient] = useState<Patient | null>(null)

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
    return {
        patient,
        sideBarItems,
        selectedSideBarItem,
        handleNewSMS,
        handleNewEmail,
        handleActions,
        handleSideBarItemClick,
    }
}