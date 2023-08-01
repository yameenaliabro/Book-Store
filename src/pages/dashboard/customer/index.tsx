import { Table } from 'antd'
import React from 'react'

const Customer = () => {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            photourl: "some"
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            photourl: "some"

        },
        {
            key: '3',
            name: 'John',
            age: 42,
            photourl: "some"

        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Photourl',
            dataIndex: 'photourl',
            key: 'photourl',
        },
    ]
    return (
        <Table dataSource={dataSource} columns={columns}></Table>

    )
}

export default Customer