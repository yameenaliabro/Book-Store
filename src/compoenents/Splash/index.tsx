import React from 'react'
import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons'

const Splash = () => {
    return (
        <div className='h-full flex justify-center item-center'>
            <Spin indicator={<LoadingOutlined />} size="large" />
        </div>
    )
}
export default Splash
