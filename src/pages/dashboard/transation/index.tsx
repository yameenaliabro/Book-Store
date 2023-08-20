import { UseDelteTransation, UseGeTransation, UseUpdateTransation } from '@src/apis'
import { ITransation, } from '@src/types'
import { Avatar, Button, Card, Divider, FloatButton, Popconfirm, Space, Table, Typography, message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useCallback, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import Link from 'next/link'

const Dashboard = () => {
    const [expandedRowKey, setExpandedRowKey] = useState<string | null>(null);
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

    const columns: ColumnsType<ITransation> = [
        {
            title: 'Order',
            key: "Customer_id",
            dataIndex: "_id",
            render: (_, record) => `#${record._id.substring(0, 5)}`
        },
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
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Items',
            key: "item",
            render: (_, record) => (
                <Space>
                    <span>
                        {record.purchasedProducts.reduce((total, item) => total + (item.product?.count || 0), 0)}
                    </span>
                </Space>
            )
        },
        {
            title: 'Price',
            key: "price",
            render: (_, record) => (
                <Space>
                    <span>
                        {record.purchasedProducts.reduce((total, item) =>
                            total + (item.product?.sellprice + item.product?.purchaseprice * item.product?.count || 0), 0)}
                    </span>
                </Space>
            )
        },
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
    ];

    const handleRowExpand = (record: ITransation) => {
        if (expandedRowKey === record._id) {
            setExpandedRowKey(null);
        } else {
            setExpandedRowKey(record._id);
        }
    };

    return (
        <div>
            <div className='flex justify-center'>
                <Typography.Title
                    className='h-full'>Transation Dashboard</Typography.Title>
            </div>
            <Table
                dataSource={data}
                columns={columns}
                className='p-10'
                expandable={{
                    expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
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
                    ),
                    expandIconColumnIndex: -1,
                }}
            />
            <Link href="/dashboard/createtransation">
                <FloatButton icon={<PlusOutlined />} type='primary' />
            </Link>
        </div>
    )
}

export default Dashboard