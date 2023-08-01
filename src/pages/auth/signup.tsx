import React, { useState } from 'react'
import { Card, Form, Input, Button, Typography, message } from "antd"
import { SignUpProps } from '@src/types'
import useAuth from '@src/hooks/useAuth'
import { useRouter } from 'next/router'

const SignUpPage = () => {
    const [loading, setloading] = useState<boolean>(false)
    const { asPath, push } = useRouter()
    const { signup } = useAuth()
    const onFinish = async (props: SignUpProps) => {
        console.log(props)
        try {
            setloading(true)
            await signup(props)
            if (asPath === "/auth/signup") {
                push("/dashboard")
            }
            message.success("your account is sucessfully created!")
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    return (
        <div className='flex justify-center items-center h-[90vh]'>
            <Card className='flex flex-col item-center  bg-slate-50 '>
                <Typography.Title className='flex justify-center mb-5'>Create Account</Typography.Title>
                <Form
                    labelCol={{ span: 6 }}
                    onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        label="username"
                        rules={[
                            { required: true, message: "please enter a name" }
                        ]}>
                        <Input placeholder='enter a username...' />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="email"
                        rules={[
                            { required: true, message: "please enter a email address!" }
                        ]}>
                        <Input type='email' placeholder='enter a email address...' />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="profile"
                        rules={[
                            { required: true, message: "please enter a profile" }
                        ]}>
                        <Input type="file" placeholder='enter a profile...' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="password"
                        rules={[
                            { required: true, message: "please enter a password" },
                            { min: 6, message: "must be a six character!" }
                        ]}>
                        <Input.Password placeholder='enter a password...' />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType='submit' block>Register</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div >
    )
}

export default SignUpPage