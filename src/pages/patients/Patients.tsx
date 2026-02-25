import React from 'react'
import { useLocation } from 'react-router-dom'
import './styles.css'
import { Table } from '../../components/organisms/table/Table'
import { Details } from '../../components/organisms/details/Details'
import { usePatients } from './usePatients'

const Patients: React.FC = () => {
    const location = useLocation()
    const isList = location.pathname === '/patients'

    return isList ? <Table /> : <Details />
}

export default Patients