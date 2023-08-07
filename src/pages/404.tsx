import { Empty, Result, Spin, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'

function Error() {
    const { query } = useRouter()

    return (
        <div className='flex justify-center items-center bg-blue-400 h-full'>
            <div className='bg-white relative h-[120%] w-[50%] shadow-2xl rounded-xl p-5'>
                <Result
                    status={"404"}
                    title={<Link href="/dashboard">Page is Not Found Got Dahshboard Page </Link>}
                />
            </div>
        </div>
    )
}

export default Error