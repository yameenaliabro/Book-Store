import React, { useRef } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, message } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { IProduct, createtransationType } from '@src/types';
import { UseCreateTransation, UseGetCustomer, UseGetProduct } from '@src/apis';

const Transtion = () => {
    const formRef = useRef<FormInstance>(null)
    const { data: products, } = UseGetProduct()
    const { data: customer, } = UseGetCustomer()
    const { mutateAsync: createtransation } = UseCreateTransation()
    const onFinish = (values: createtransationType) => {
        createtransation(values, {
            onSuccess: () => {
                message.success("transaction is created")
            }
        })
        formRef.current?.resetFields()
    };

    return (
        <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            className='p-10'
            ref={formRef}
        >
            <Form.Item name="customer"
                rules={[
                    { required: true, message: "please enter a customer" }
                ]}>
                <Select options={customer?.map(customer => ({ label: customer.fullname, value: customer._id }))}
                    placeholder="Please select a Customer"></Select>
            </Form.Item>
            <Form.List
                name="purchasedProducts">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, "product"]}
                                    rules={[{ required: true, message: 'please enter a product!' }]}
                                >
                                    <Select className='w-[300px]' options={products?.map((product: IProduct) => ({ label: product.title, value: product._id }))}
                                        placeholder="please select a product"></Select>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'quantity']}
                                    rules={[
                                        { required: true, message: "please enter qunatity!" }
                                    ]}
                                >
                                    <Input type="number" placeholder="Enter quantity" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add field
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >
    )
}
export default Transtion;