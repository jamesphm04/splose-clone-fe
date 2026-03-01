import { Button, Input, Table } from 'antd'
import './styles.css'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Content, Header } from 'antd/es/layout/layout'
import React from 'react'
import { usePatients } from './usePatients'

const Patients: React.FC = () => {
    const {
        patients,
        columns,
        loading,
        searchValue,
        setSearchValue,
        search,
        navigate,
    } = usePatients()
    return (
        <Content className="content">
            <Header className="header">
                <div className="page-title">Patients</div>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/patients/new')}>New Patient</Button>
            </Header>
            <div>
                <div className="search-container">
                    <Input placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <Button icon={<SearchOutlined />} onClick={() => search('')}>Search</Button>
                </div>
                <div className="table-container">
                    <Table
                        dataSource={patients}
                        columns={columns}
                        loading={loading}
                        rowKey="id"
                        onRow={(record) => ({
                            onDoubleClick: () => {
                                navigate(`/patients/${record.id}/details`)
                            },
                        })}
                    />
                </div>
            </div>
        </Content>)
}

export default Patients