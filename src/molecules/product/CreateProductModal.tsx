import { CreateProductType, EditProductType, IProduct } from '@src/types'
import { Card, Form, Input, Modal, Select } from 'antd'
import React, { Ref, forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { firebaseStorage } from '@src/services'
import UploadImge from './uploadimage'

type CreateProductModalProps = {
    createloading: boolean,
    onCreateProduct: (props: CreateProductType) => Promise<void>,
    onEditProduct: (props: EditProductType) => Promise<void>
}

export type CreateProductModalRefProps = {
    open: VoidFunction,
    edit: (eidtProduct: IProduct) => void
}

const CreateProductModal = (props: CreateProductModalProps, reference: Ref<CreateProductModalRefProps>) => {
    const { createloading, onCreateProduct, onEditProduct } = props
    const [form] = Form.useForm()
    const [open, setopen] = useState(false)
    const [editproduct, seteditproduct] = useState<IProduct | null>(null)
    const [productImage, setproductImage] = useState<Blob | null>()

    const onCancel = useCallback(() => {
        seteditproduct(null)
        form.resetFields()
        setopen(false)
    }, [form])

    const onFinish = useCallback(async (v: CreateProductType) => {
        console.log(v)
        if (editproduct) {
            await onEditProduct({ id: editproduct._id, ...v })
        } else {
            let url = ""
            if (productImage) {
                const imageExt = productImage.name.split(".")[1]
                const Imageref = ref(firebaseStorage, `uploads/${Date.now()}.${imageExt}`)
                const result = await uploadBytes(Imageref, productImage)
                url = await getDownloadURL(result.ref)
            }
            await onCreateProduct({ ...v, image: url })
        }
        onCancel()
    }, [onCancel, editproduct, onEditProduct, productImage, onCreateProduct])

    useImperativeHandle(reference, () => ({
        open: () => setopen(true),
        edit: (_editProduct) => {
            seteditproduct(_editProduct)
            setopen(true)
            form.setFieldsValue(_editProduct)
        }
    }), [form])

    const handleImageSelect = (image: File) => {
        setproductImage(image);
    }

    return (
        <Modal
            title={editproduct ? "Edit Prouct" : "Create Product"}
            okText={editproduct ? "Save" : "Create"}
            open={open}
            onCancel={onCancel}
            onOk={form.submit}
            confirmLoading={createloading}
        >
            <Card
                className=" bg-gradient-to-r from-pink-600 to-amber-600 text-white shadow-lg rounded-lg"

                bordered={false}
            >
                <Form
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        className='flex  justify-center'
                        name="image"
                    >
                        <UploadImge onImageSelect={handleImageSelect} />
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
    )
}

export default forwardRef(CreateProductModal)