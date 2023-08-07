import React, { useState } from 'react';
import { Modal, Form, Input, Button, message, Space } from 'antd';
import { ITransation, UpdateTransationType } from '@src/types';

interface EditModalProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (editedRecord: ITransation) => Promise<void>;
    record: any;
}

const EditModal: React.FC<EditModalProps> = ({ visible, onCancel, onSave, record }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            onSave({ record, ...values });
            form.resetFields();
            onCancel();
        } catch (error) {
            console.error(error);
            message.error('Failed to save changes');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Edit Transaction"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="save" type="primary" loading={loading} onClick={handleSave}>
                    Save
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={record}>
                <Form.Item
                    name="customer">
                    <Input />
                </Form.Item>
                <Form.List name="purchasedProducts">
                    {(fields, { }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'product']}
                                        rules={[{ required: true, message: 'please enter a product!' }]}
                                    >
                                        <Input placeholder="Enter a Product" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'price']}
                                        rules={[{ required: true, message: 'Please enter Price!' }]}
                                    >
                                        <Input placeholder="Enter a price" type='number' />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'quantity']}
                                        rules={[{ required: true, message: 'Please enter a Quantity!' }]}
                                    >
                                        <Input placeholder="Enter a Quantity" type='number' />
                                    </Form.Item>
                                </Space>
                            ))}

                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default EditModal;
