import { UseDelteTransation, UseGeTransation, UseUpdateTransation } from '@src/apis'
import { ITransation, } from '@src/types'
import { Avatar, Button, Card, Divider, FloatButton, Popconfirm, Space, Table, Typography, message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useCallback, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import Link from 'next/link'
import EditModal from '../createtransation/edit-modal'

const Dashboard = () => {
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [selectedRecord, setSelectedRecord] = useState<any>();
    const { data, refetch } = UseGeTransation()
    const { mutateAsync: onEdit } = UseUpdateTransation()
    const { mutateAsync: OnDelete } = UseDelteTransation()
    console.log(data)

    const OnDelteTransation = useCallback(async (id: string) => {
        await OnDelete({ id }, {
            onSuccess: () => {
                message.success("TransationDeleted sucessfull")
                refetch()
            }
        })
    }, [OnDelete, refetch])

    const handleEditClick = useCallback((record: ITransation) => {
        setSelectedRecord(record);
        setEditModalVisible(true);
    }, []);

    const OnEditTransation = useCallback(async (v: ITransation) => {
        setEditModalVisible(true);
        await onEdit(selectedRecord, {
            onSuccess: () => {
                message.success("your a sucessfull edit Transation"),
                    refetch()
            }
        })
    }, [onEdit, refetch, selectedRecord])

    const handleEditCancel = useCallback(() => {
        setSelectedRecord(null);
        setEditModalVisible(false);
    }, []);

    const columns: ColumnsType<ITransation> = [
        {
            title: 'Order',
            key: "Customer_id",
            render: (_, record) => (
                <Space>
                    <p>{record._id}</p>
                </Space>
            )
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Customer',
            key: "cutomer",
            render: (_, record) => (
                <Space>
                    <div className="flex items-center">
                        <Link href={record.customer.image} target='_blank'><Avatar src={record.customer.image} size="large" /></Link>
                        <div className="ml-4">
                            <p className="text-lg font-semibold text-gray-600">{record.customer.fullname}</p>
                            <p className="text-gray-500">{record.customer.email}</p>
                        </div>
                    </div>
                </Space>
            )
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Items',
            key: "item",
            render: (_, record) => (
                <Space>
                    <span>
                        {record.purchasedProducts.reduce((total, item) => total + item.product.count, 0)}
                    </span>
                </Space>
            )
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Price',
            key: "price",
            render: (_, record) => (
                <Space>
                    <span>
                        {record.purchasedProducts.reduce((total, item) =>
                            total + (item.product.sellprice + item.product.purchaseprice * item.product.count), 0)}
                    </span>
                </Space>
            )
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Action',
            key: "price",
            render: (_, record) => (
                <Space>
                    <Popconfirm
                        title="Are You sure you want to delete this Trnsation!"
                        onConfirm={() => OnDelteTransation(record._id)}
                        okText="ok"
                        cancelText="cancel"
                    >
                        <Button type='primary' danger>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        },
        Table.EXPAND_COLUMN,
    ];

    return (
        <div>
            <div className='flex justify-center mb-10 mt-2'>
                <Typography.Title
                    className='h-full'>Transation Dashboard</Typography.Title>
            </div>
            <Table
                dataSource={data}
                columns={columns}
                className='flex justify-center'
                expandable={{
                    expandedRowRender: (record) => (
                        <div className='flex flex-wrap'>
                            {record.purchasedProducts.map(item => (
                                <Card key={item.product._id} className='m-2' hoverable>
                                    <Link href={item.product.image} target='_blank'>
                                        <Avatar src={item.product.image} />
                                    </Link>
                                    <div className='flex flex-col'>
                                        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.product.title}</p>
                                        <p>{item.product.description}</p>
                                        <div className='flex justify-between'>
                                            <span className='text-[16px] text-green-500'>{item.product.count}</span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )
                }}
            />

            <EditModal
                onCancel={handleEditCancel}
                onSave={OnEditTransation}
                record={selectedRecord}
                visible={editModalVisible} />

            <Link href="/dashboard/createtransation">
                <FloatButton icon={<PlusOutlined />} type='primary' />
            </Link>
        </div>
    )
}

export default Dashboard