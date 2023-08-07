import { ICustomer, IProduct, } from '@src/types'
import { Avatar, Button, Card, Popconfirm, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import React from 'react'

type ProductRow = IProduct & {
    checked: boolean,
    quantity: number
};
type CustomerItemProps = {
    data: ICustomer[],
    OnDelete: (id: string) => void,
    onEdit: (props: ICustomer) => void
}


const CustomerItem = (props: CustomerItemProps) => {
    const { OnDelete, data, onEdit } = props
    const columns: ColumnsType<ICustomer> = [
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'ImageUrl',
            key: "Image",
            dataIndex: "image",
            render: (imageUrl: string) => {
                const shortImageUrl = imageUrl.substring(0, 5);
                return <Link href={imageUrl} target='_blank'><Avatar src={imageUrl} /></Link>
            },
        }, {
            title: 'phoneNumber',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button onClick={() => onEdit(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure you want to delete this user?"
                        onConfirm={() => OnDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <Typography.Title className='flex justify-center' level={2}>Customer Dashboard</Typography.Title>
            <Table dataSource={data} columns={columns} className='mt-10'></Table>
        </div>
    )
}

export default CustomerItem