import { DeleteOutlined, EditOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { IProduct } from '@src/types'
import { Avatar, Button, Card, Divider, Image, Popconfirm, Rate, Space, Typography } from 'antd'
import Link from 'next/link'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify';

type ProductItemProps = {
    item: IProduct,
    onEdit: (blog: IProduct) => void,
    onDelete: (id: string) => void
    OnAddCart: (id: string) => void
}

const ProductItem = (props: ProductItemProps) => {
    const { item, onDelete, onEdit, OnAddCart } = props
    const { _id, description, image, purchaseprice, sellprice, rating, title, } = item
    const { Meta } = Card

    return (
        <div className="flex  flex-row  p-10 h-full  ">
            <Card
                hoverable
                className="w-[340px]  bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg rounded-lg "
                cover={<Image
                    alt={title}
                    src={image}
                    className="h-45 object-cover rounded-t-lg w-300"
                    preview={false}
                />}
                actions={[
                    <Button
                        key={_id}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded"
                        onClick={() => onEdit(item)}
                        icon={<EditOutlined />}
                    >
                        Edit
                    </Button>,
                    <Popconfirm
                        title=" Are you sure you want to delet this Product!"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => onDelete(_id)}
                        key={_id}>
                        <Button
                            key={_id}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold rounded"
                            icon={<DeleteOutlined />}
                        >
                            Delete
                        </Button>
                    </Popconfirm>,
                ]}
            >
                <div className='text-white'>
                    <Meta
                        className='pb-3'
                        title={<span className="text-white">{title}</span>}
                        description={<span className="text-white  truncate">{description}</span>}
                    />
                </div>
                <Space>
                    <span className="bg-white text-gray-800 font-semibold  px-3 py-1 rounded">
                        Sell Price: {sellprice}
                    </span>
                    <span className="bg-white text-gray-800 font-semibold px-3 py-1 pt-2  rounded ">
                        Purchase Price: {purchaseprice}
                    </span>
                </Space>
                <div className="pt-2">
                    <Rate allowHalf defaultValue={rating} disabled />
                </div>
            </Card >
        </div >
    )
}

export default ProductItem
{/* <Form.Item
                    name="title"
                    rules={[
                        { required: true, message: "please enter a Title! " }
                    ]}>

                </Form.Item>
                <Form.Item
                    rules={[
                        { required: true, message: "please enter a Description! " }
                    ]}>
                    <Input type="text" placeholder='enter a description' />
                </Form.Item>
                <Form.Item
                    rules={[
                        { required: true, message: "please enter a Quantity ! " }
                    ]}>
                    <Input type='number' placeholder='enter a quantity' />
                </Form.Item>
                <Form.Item
                    rules={[
                        { required: true, message: "please enter a Price " }
                    ]}>
                    <Input type='number' placeholder='enter a price' />
                </Form.Item>
                <Form.Item>
                    <Input type='number' placeholder='total price' />
                </Form.Item> */}