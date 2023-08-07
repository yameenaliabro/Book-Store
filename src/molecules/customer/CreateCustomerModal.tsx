import { firebaseStorage } from '@src/services'
import { CreateCustomerProps, ICustomer, UpdateCustomerType } from '@src/types'
import { Card, Form, Input, Modal } from 'antd'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState, Ref, useCallback, useImperativeHandle, forwardRef } from 'react'
import UploadImge from '../product/uploadimage'

type CreateCustomerModalProps = {
    createloading: boolean,
    onEditCustomer: (props: UpdateCustomerType) => Promise<void>,
    OnCreateCustomer: (props: CreateCustomerProps) => Promise<void>
}

export type CreateCustomerModalRef = {
    open: VoidFunction,
    edit: (editCustomer: ICustomer) => void
}

const CreateCustomerModal = (props: CreateCustomerModalProps, reference: Ref<CreateCustomerModalRef>) => {
    const { OnCreateCustomer, createloading, onEditCustomer } = props
    const [form] = Form.useForm()
    const [open, setopen] = useState(false)
    const [editcustomer, seteditcustomer] = useState<ICustomer | null>()
    const [customerImage, setCustomerImage] = useState<Blob | null>()

    const OnCancel = useCallback(() => {
        setopen(false)
        form.resetFields(),
            seteditcustomer(null)
    }, [form])

    const onFinish = useCallback(async (v: CreateCustomerProps) => {
        console.log(v)
        if (editcustomer) {
            await onEditCustomer({ id: editcustomer._id, ...v })

        } else {
            let url = ""
            if (customerImage) {
                const imageExt = customerImage.name.split(".")[1]
                const Imageref = ref(firebaseStorage, `uploads/${Date.now()}.${imageExt}`)
                const result = await uploadBytes(Imageref, customerImage)
                url = await getDownloadURL(result.ref)
            }
            await OnCreateCustomer({ ...v, image: url })
        }
        OnCancel()
    }, [OnCancel, editcustomer, onEditCustomer, customerImage, OnCreateCustomer])

    useImperativeHandle(reference, () => ({
        open: () => setopen(true),
        edit: (_editCustomer) => {
            seteditcustomer(_editCustomer)
            setopen(true)
            form.setFieldsValue(_editCustomer)
        }
    }), [form])

    const handleImageSelect = (image: File) => {
        setCustomerImage(image);
    }

    return (
        <Modal
            title={editcustomer ? "Edit Customer" : "Create Customer"}
            confirmLoading={createloading}
            okText={editcustomer ? "Save" : 'Create'}
            onCancel={OnCancel}
            onOk={form.submit}
            open={open}
        >
            <Card className="flex justify-center items-center w-full">
                <Form
                    className='w-[450px]'
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        name="image"
                        className='flex justify-center items-center'
                    >
                        <UploadImge onImageSelect={handleImageSelect} />
                    </Form.Item>

                    <Form.Item name="fullname"
                        rules={[
                            { required: true, message: "please enter a full name!" }
                        ]}>
                        <Input type='text' placeholder='enter a Fullname...' />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: "please enter a email address!" }
                        ]}
                    >
                        <Input type='text' placeholder='enter a email address!' />
                    </Form.Item>
                    <Form.Item
                        name="phonenumber"
                        rules={[
                            { required: true, message: "please enter a phoneNumber!" },
                            { max: 11, message: "must be a 11 character!" },
                            { min: 11, message: "must be a 11 character!" }
                        ]}
                    >
                        <Input type="number" placeholder='enter phone Number... ' />
                    </Form.Item>
                    <Form.Item
                        name="address"
                    >
                        <Input type='text' placeholder='please enter a customer address' />
                    </Form.Item>
                </Form>
            </Card>
        </Modal>
    )
}

export default forwardRef(CreateCustomerModal)