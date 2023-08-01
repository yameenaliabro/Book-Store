import useAuth from '@src/hooks/useAuth'
import { LoginProps } from '@src/types'
import { Card, Form, Button, Input, Typography, message } from 'antd'
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
            if (asPath === "/auth/sign") {
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
            <Card className='flex flex-col items-center bg-slate-100'>
                <Typography.Title className='flex justify-center'>Login Account</Typography.Title>
                <Form
                    labelCol={{ span: 6 }}
                    onFinish={onFinish}
                    disabled={loading}
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
                    <Form.Item>
                        <Button type='primary' block>Login</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default LoginPage