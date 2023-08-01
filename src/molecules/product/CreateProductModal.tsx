import { Form, Input, Modal, Select } from 'antd'
import React from 'react'
import UploadImge from './uploadimage'

const CreateProductModal = () => {
    return (
        <Modal>
            <Form>
                <Form.Item>
                </Form.Item>
                <Form.Item
                    name="title"
                    rules={[
                        { required: true, message: "please a title here!" }
                    ]}>
                    <Input type='text' placeholder='enter a title...' />
                </Form.Item>
                <Form.Item>
                    <Form.Item
                        name="price"
                        rules={[
                            { required: true, message: "please enter a price here!" }
                        ]}>
                        <Input type='number' placeholder='enter a price ' />
                    </Form.Item>
                    <Form.Item name="rating"
                        rules={[
                            { required: true, message: "please enter a rating here!" }
                        ]}>
                        <Select placeholder="Enter Rating" options={[
                            { value: 1, label: 1 },
                            { value: 2, label: 2 },
                            { value: 3, label: 3 },
                            { value: 4, label: 4 },
                            { value: 5, label: 5 },
                        ]}>
                        </Select>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateProductModal