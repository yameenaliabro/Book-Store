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
        <div className='flex justify-center items-center h-[90vh]'>
            <Card className='flex flex-col items-center'>
                <Typography.Title className='flex justify-center'>Login Account</Typography.Title>
                <Form
                    labelCol={{ span: 6 }}
                    onFinish={onFinish}
                    disabled={loading}
                    className='w-[450px] flex justify-center flex-col'
                >
                    <Form.Item
                        name="email"
                        label="email"
                        rules={[
                            { required: true, message: 'please enter a email adress!' }
                        ]}>
                        <Input type='email' placeholder='enter a email address...' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="password"
                        rules={[
                            { required: true, message: "please enter a password" }
                        ]}>
                        <Input.Password type='' placeholder='enter a password...' />
                    </Form.Item>
                    <Form.Item className='flex justify-center'>
                        <Button type='primary' htmlType='submit'>Login</Button>
                    </Form.Item>
                    <Form.Item className='flex justify-center'>
                        <Button type='primary' danger><Link href="/auth/signup" >Create a new Account!</Link></Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default LoginPage