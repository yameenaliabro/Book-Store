import { Layout, Menu, MenuProps, } from 'antd'
import Link from 'next/link'
import React, { useMemo } from 'react'

const { Sider } = Layout

function DashboardSideBar() {

    const menuItems: MenuProps["items"] = useMemo(() => ([
        {
            label: <Link href="/dashboard">Dashboard</Link>,
            key: "dashboard"
        },
        {
            label: <Link href="/dashboard/customer">Customer</Link>,
            key: "dashboard/customer"
        }

    ]), [])

    return (
        <Sider className='h-[90vh]'>
            <Menu theme='dark' items={menuItems} />
        </Sider>
    )
}

export default DashboardSideBar
