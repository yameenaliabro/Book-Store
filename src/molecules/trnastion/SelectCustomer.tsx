import { UseGetCustomer } from '@src/apis'
import { Card, Form, Modal, } from 'antd'
import React, { useState, Ref, useCallback, useImperativeHandle, forwardRef } from 'react'

type CreateCustomerModalProps = {
    createloading: boolean,
}

export type SelecteCustomerdModalRef = {
    open: VoidFunction,
}

const SelectCustomerModal = (props: CreateCustomerModalProps, reference: Ref<SelecteCustomerdModalRef>) => {
    const { data, isLoading } = UseGetCustomer()
    const { createloading } = props
    const [form] = Form.useForm()
    const [open, setopen] = useState(false)

    const OnCancel = useCallback(() => {
        setopen(false)
        form.resetFields()
    }, [form])

    const onFinish = useCallback(async (v: any) => {
        console.log(v)
        OnCancel()
    }, [OnCancel,])

    useImperativeHandle(reference, () => ({
        open: () => setopen(true)
    }), [])

    return (
        <Modal
            title={"SelectCustomer"}
            confirmLoading={createloading}
            okText={"Selected"}
            onCancel={OnCancel}
            onOk={form.submit}
            open={open}
            className=' flex flex-col justify-center'
        >
            <div>
                {data?.map((item) => {
                    return (
                        <div key={item._id}>
                            <Card>
                                <span>{item.fullname}</span><br />
                                <span>{item.email}</span><br />
                                <span>{item.phonenumber}</span>
                            </Card>
                        </div>
                    )
                })}
                {/* <Card className="flex justify-center items-center w-full">
                    <Form
                        className='w-[450px] flex justify-center flex-col '
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            name="fullname"
                            rules={[
                                { required: true, message: "please enter a full name!" }
                            ]}>
                            <Select placeholder="Country/Region" >
                            </Select>
                        </Form.Item>
                    </Form>
                </Card> */}
            </div>
        </Modal>
    )
}

export default forwardRef(SelectCustomerModal)