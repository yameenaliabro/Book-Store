import React, { useState } from 'react'
import { Card, Form, Input, Button, Typography, message } from "antd"
import { SignUpProps } from '@src/types'
import useAuth from '@src/hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { MailOutlined, UserOutlined } from '@ant-design/icons'

const SignUpPage = () => {
    const [loading, setloading] = useState<boolean>(false)
    const { asPath, push } = useRouter()
    const { signup } = useAuth()

    const onFinish = async (props: SignUpProps) => {
        console.log(props)
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
        <div className='flex justify-center items-center h-[90vh] '>
            <Card className='flex flex-col item-center  '>
                <Typography.Title className='flex justify-center mb-10'>Create Account</Typography.Title>
                <Form
                    labelCol={{ span: 6 }}
                    onFinish={onFinish}
                    className='w-[400px] flex flex-col'>
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: "please enter a name" }
                        ]}>
                        <Input placeholder='enter a username...' prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: "please enter a email address!" }
                        ]}>
                        <Input type='email'
                            placeholder='enter a email address...'
                            prefix={<MailOutlined />} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "please enter a password" },
                            { min: 6, message: "must be a six character!" }
                        ]}>
                        <Input.Password placeholder='enter a password...' />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType='submit' block>Register</Button>
                    </Form.Item>
                    <Form.Item className='flex justify-center'>
                        <Link href="/auth/login" >Already have a  account?<Button type='link' className='m-0 p-0'>Login</Button></Link>
                    </Form.Item>
                </Form>
            </Card>
        </div >
    )
}

export default SignUpPage