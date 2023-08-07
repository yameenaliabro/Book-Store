import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { UseGetProduct, } from '@src/apis'
import { Button, Form, Input, Select, Space, Typography } from 'antd'
import React from 'react'

const CustomerItem = () => {
    const { data } = UseGetProduct()
    return (
        <div>
            <Typography.Title className='flex justify-center' level={2}>Order Dashboard</Typography.Title>
            <Form
                className='flex justify-center flex-col'
            >
                <Form.Item>
                    <Select className='w-40' options={data?.map(product => ({ label: product.title, value: product._id }))} />
                </Form.Item>
                <Form.List name="users">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'first']}
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                        <Input placeholder="First Name" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'last']}
                                        rules={[{ required: true, message: 'Missing last name' }]}
                                    >
                                        <Input placeholder="Last Name" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Input type='number' />
                                    </Form.Item>
                                    <Form.Item>
                                        <Input type="number" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Customer
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
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
            </Form>
        </div>
    )
}

export default CustomerItem