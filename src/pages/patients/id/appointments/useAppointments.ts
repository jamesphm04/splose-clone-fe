import type { ColumnsType } from "antd/es/table"

export interface Appointment {
    id: string;
    date: string;
    time: string;
    status: string;
}

const columns: ColumnsType<Appointment> = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
]
export const useAppointments = () => {
    return {
        columns,
        appointments: [],
    }
}