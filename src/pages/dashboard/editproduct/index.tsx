import React, { useState, forwardRef, useImperativeHandle, useEffect, useCallback } from 'react';
import { Modal, Form, Input, Card, Select, Button } from 'antd';
import { EditProductType, IProduct } from '@src/types';
import UploadImge from '@src/molecules/uploadImage/uploadimage';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { firebaseStorage } from '@src/services';

type EditProductModalProps = {
    createloading: boolean;
    onEditProduct: (props: EditProductType) => Promise<void>;
    productToEdit: IProduct
};

export type EditProductModalRefProps = {
    edit: (editProduct: IProduct) => void;
};

const EditProductModal = (props: EditProductModalProps, refproduct: React.Ref<EditProductModalRefProps>) => {
    const [form] = Form.useForm();
    const { createloading, onEditProduct, productToEdit } = props;
    const [open, setOpen] = useState(false);
    const [productImage, setProductImage] = useState<File | null>(null);

    useEffect(() => {
        if (productToEdit) {
            form.setFieldsValue(productToEdit);
        }
    }, [productToEdit, form]);

    const onCancel = useCallback(() => {
        form.resetFields();
        setOpen(false);
    }, [form]);

    const onFinish = useCallback(async (values: EditProductType) => {
        const { _id, image, ...rest } = values
        let url = productToEdit?.image || ""
        if (productImage) {
            const imageExt = productImage.name.split(".")[1]
            const Imageref = ref(firebaseStorage, `uploads/${Date.now()}.${imageExt}`)
            const result = await uploadBytes(Imageref, productImage)
            url = await getDownloadURL(result.ref)
        }
        await onEditProduct({ _id, ...rest, image: url })
        onCancel();
    }, [onCancel, onEditProduct, productImage, productToEdit]);

    useImperativeHandle(refproduct, () => ({
        edit: (editProduct: IProduct) => {
            setProductImage(null);
            setOpen(true);
            form.setFieldsValue(editProduct);
        },
    }), [form]);

    const handleImageSelect = useCallback((image: File) => {
        setProductImage(image);
    }, [])

    return (
        <Modal
            title="Edit Product"
            okText="Save"
            visible={open}
            onCancel={onCancel}
            onOk={form.submit}
            confirmLoading={createloading}
        >
            <Card bordered={false}>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item name="image">
                        <UploadImge onImageSelect={handleImageSelect} />
                    </Form.Item>
                    <Form.Item name="_id">
                        <Input type='string' />
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
                            name="purchaseprice"
                            rules={[
                                { required: true, message: "please enter a purchaseprice here!" }
                            ]}>
                            <Input type='number' placeholder='enter a purcahseprice ' />
                        </Form.Item>
                        <Form.Item
                            name="sellprice"
                            rules={[
                                { required: true, message: "please enter a sellprice" }
                            ]}>
                            <Input type='number' placeholder='enter sellprice ' />
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
                    <Form.Item
                        name="description"
                        rules={[
                            { required: true, message: "Please eneter a description!" },
                            { min: 10, message: "must be a 10 character" }
                        ]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Card>
        </Modal>
    );
};

export default forwardRef(EditProductModal);
