import React, { ReactNode } from 'react'
import { Layout } from "antd"
import { DashboardSideBar, DashboardTopBar } from './components'
import { AuthGuard } from '@src/guard'

type DashboardLayoutProps = {
    children: ReactNode
}

const DashboardLayout = (props: DashboardLayoutProps) => {
    const { children } = props
    const { Content } = Layout

    return (
        <Layout className='h-full'>
            <DashboardTopBar />
            <Layout>
                <DashboardSideBar />
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

const WithAuth = (props: DashboardLayoutProps) => {
    return (
        <AuthGuard>
            <DashboardLayout {...props} />
        </AuthGuard>
    )
}

export default WithAuth