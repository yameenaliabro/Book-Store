import { CreateProductType } from '@src/types'
import { Button, Card, Form, Input, Select, Spin, message } from 'antd'
import React, { useCallback, useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { firebaseStorage } from '@src/services'
import UploadImge from '@src/molecules/uploadImage/uploadimage'
import { UseCreateProduct } from '@src/apis'
import { useForm } from 'antd/es/form/Form'
import { useRouter } from 'next/router'

const CreateProduct = () => {
    const { push } = useRouter()
    const [productImage, setproductImage] = useState<Blob | null>()
    const [loading, setloading] = useState(false)
    const { mutateAsync: CreateProduct, isLoading: createloading } = UseCreateProduct()
    const [form] = useForm()
    const onFinish = useCallback(async (v: CreateProductType) => {
        setloading(true)
        let url = ""
        if (productImage) {
            const imageExt = productImage.name.split(".")[1]
            const Imageref = ref(firebaseStorage, `uploads/${Date.now()}.${imageExt}`)
            const result = await uploadBytes(Imageref, productImage)
            url = await getDownloadURL(result.ref)
        }
        await CreateProduct({ ...v, image: url }, {
            onSuccess: () => {
                form.resetFields()
                setloading(false)
                push("/dashboard/products")
                message.success("product sucesfull")

            }
        })
    }, [CreateProduct, productImage, form, push])

    const handleImageSelect = (image: File) => {
        setproductImage(image);
    }

    return (
        <div className='flex flex-col justify-center items-center '>
            <Spin spinning={loading}>
                <Card
                    className="text-white shadow-lg rounded-lg w-[700px] m-10 "
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
                        <Form.Item>
                            <Button type='primary' htmlType="submit" block>AddProduct</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Spin>
        </div>
    )
}

export default CreateProduct