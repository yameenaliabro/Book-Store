import { CarOutlined, HistoryOutlined, HomeOutlined, ShoppingCartOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import { useCart } from '@src/hooks/useCart'
import { Avatar, Badge, Layout, Menu, MenuProps, } from 'antd'
import Link from 'next/link'
import React, { useMemo } from 'react'

const { Sider } = Layout

function DashboardSideBar() {
    const { cart } = useCart()
    const menuItems: MenuProps["items"] = useMemo(() => ([
        {
            label: <Link href="/dashboard">Dashboard</Link>, icon: <HomeOutlined />,
            key: "dashboard"
        },
        {
            label: <Link href="/dashboard/customer">Customer</Link>, icon: <UserOutlined />,
            key: "dashboard/customer"
        },
        {
            label: <Link href="/dashboard/products">Products</Link>, icon: <ShoppingCartOutlined />,
            key: "dashboard/products"
        },
        {
            label: <Link href="/dashboard/transation">Transation</Link>, icon: <UnorderedListOutlined />,
            key: "/dashboard/checktransation"
        },
        {
            label: (
                <Link href="/dashboard/cart">
                    <Badge count={cart.length} showZero>
                        <ShoppingCartOutlined style={{ fontSize: '24px', marginBottom: '16px' }} />
                    </Badge>
                    Cart
                </Link>
            ),
            key: "dashboard/cart"
        },
    ]), [cart])

    return (
        <Sider className=' bottom-0 flex justify-center gap-x1-0'>
            <Menu theme='dark' items={menuItems} />
        </Sider>
    )
}

export default DashboardSideBar
