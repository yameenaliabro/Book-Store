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
        },
        {
            label: <Link href="/dashboard/products">Products</Link>,
            key: "dashboard/products"
        },
        {
            label: <Link href="/dashboard/transation">Transation</Link>,
            key: "/dashboard/checktransation"
        },
    ]), [])

    return (
        <Sider className=' bottom-0'>
            <Menu theme='dark' items={menuItems} />
        </Sider>
    )
}

export default DashboardSideBar
