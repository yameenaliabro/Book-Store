import useAuth from '@src/hooks/useAuth'
import React, { useMemo } from 'react'
import { Layout, MenuProps, Typography, Dropdown, Avatar } from "antd"

const DashboardTopBar = () => {
    const { Header } = Layout
    const { signout } = useAuth()

    const items: MenuProps["items"] = useMemo(() => ([
        { label: "Signout", onClick: signout, key: "signout" }
    ]), [signout])

    return (
        <Header className='flex justify-between h-full'>
            <Typography.Title className='text-white'>Dashboard</Typography.Title>
            <Dropdown arrow placement="bottomRight" menu={{ items }} className='mt-4'>
                <Avatar src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" />
            </Dropdown>
        </Header>
    )
}

export default DashboardTopBar