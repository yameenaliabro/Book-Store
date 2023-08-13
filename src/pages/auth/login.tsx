import { MailOutlined, UserOutlined } from '@ant-design/icons'
import useAuth from '@src/hooks/useAuth'
import { LoginProps } from '@src/types'
import { Card, Form, Button, Input, Typography, message } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const LoginPage = () => {
    const { asPath, push } = useRouter()
    const [loading, setloading] = useState<boolean>(false)
    const { login } = useAuth()

    const onFinish = async (props: LoginProps) => {
        try {
            setloading(true)
            await login(props)
            if (asPath === "/auth/login") {
                push("/dashboard")
            }
            message.success("your account is sucesfully created")
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <Card className='flex flex-col items-center'>
                <Typography.Title className='flex justify-center mb-10'>Login Account</Typography.Title>
                <Form
                    labelCol={{ span: 6 }}
                    onFinish={onFinish}
                    disabled={loading}
                    className='w-[400px] flex justify-center flex-col'
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'please enter a email adress!' }
                        ]}>
                        <Input type='email' placeholder='enter a email address...' prefix={<MailOutlined />} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "please enter a password" }
                        ]}>
                        <Input.Password type='' placeholder='enter a password...' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' block>Login</Button>
                    </Form.Item>
                    <Form.Item className='flex justify-center'>
                        <Link href="/auth/signup" >Create a new Account?<Button type='link' className='p-0 m-0'>Signup</Button></Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default LoginPage