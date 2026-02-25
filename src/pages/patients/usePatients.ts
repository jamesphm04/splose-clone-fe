import { useState, useEffect } from "react";
import { patientAPI } from "../../services/api";
import type { Patient } from "../../types/Patient";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from 'react-router-dom'

const columns: ColumnsType<Patient> = [
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Date of Birth', dataIndex: 'dateOfBirth', key: 'dateOfBirth' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Address', dataIndex: 'fullAddress', key: 'fullAddress' },
]

export const usePatients = () => {
    const [patients, setPatients] = useState<Patient[]>([])
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        fetchPatients()
    }, [])

    const fetchPatients = async () => {
        setLoading(true)
        const response = await patientAPI.fetch()
        setPatients(response.data || [])
        setLoading(false)
    }

    const search = async (searchValue: string) => {
        setLoading(true)
        // const response = await patientAPI.search(searchValue)
        console.log(searchValue)
        // setPatients(response.data)
        setLoading(false)
    }
    return {
        patients,
        columns,
        loading,
        searchValue,
        selectedPatient,
        setSearchValue,
        search,
        navigate,
        setSelectedPatient,
    }
}