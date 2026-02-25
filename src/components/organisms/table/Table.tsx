import { useTable } from "./useTable"
import { Button, Input, Table as AntTable } from 'antd'
import './styles.css'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Content, Header } from 'antd/es/layout/layout'
import React from 'react'

export const Table: React.FC = () => {
    const {
        patients,
        columns,
        loading,
        searchValue,
        setSearchValue,
        search,
        navigate,
    } = useTable()
    return (
        <Content className="content">
            <Header className="header">
                <div className="page-title">Patients</div>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/patients/new')}>New Client</Button>
            </Header>
            <div>
                <div className="search-container">
                    <Input placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <Button icon={<SearchOutlined />} onClick={() => search('')}>Search</Button>
                </div>
                <div className="table-container">
                    <AntTable
                        dataSource={patients}
                        columns={columns}
                        loading={loading}
                        rowKey="id"
                        onRow={(record) => ({
                            onDoubleClick: () => {
                                navigate(`/patients/${record.id}`)
                            },
                        })}
                    />
                </div>
            </div>
        </Content>
    )
}