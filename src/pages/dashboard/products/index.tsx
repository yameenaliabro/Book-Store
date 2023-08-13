import { PlusOutlined } from "@ant-design/icons"
import { UseDeleteProduct, UseEditProduct, UseGetProduct } from "@src/apis"
import { ProductItem } from "@src/molecules/product"
import { EditProductType, IProduct } from "@src/types"
import { FloatButton, Skeleton, Typography, message } from "antd"
import Link from "next/link"
import { useCallback, useState } from "react"

function Products() {
    const { data, isLoading, refetch } = UseGetProduct()
    const { mutateAsync: deleteproduct, } = UseDeleteProduct()
    const OndeleteProduct = useCallback(async (id: string) => {
        await deleteproduct({ id }, {
            onSuccess: () => {
                message.success("product deleted sucesfully"),
                    refetch()
            },
            onError: () => {
                message.error("something went wrong")
            }
        })
    }, [deleteproduct, refetch])



    return (
        <div>
            <Typography.Title className='flex justify-center text-center mt-2'>Products Dashboard</Typography.Title>
            <div className='flex justify-center flex-wrap mt-5'>
                {
                    (data || []).map((item) => (
                        <ProductItem
                            key={item._id}
                            item={item}
                            onDelete={OndeleteProduct}
                        />
                    ))
                }

                <Link href="/dashboard/createproduct">
                    <FloatButton
                        type="primary"
                        icon={<PlusOutlined />} />
                </Link>
            </div>
        </div >
    )
}
export default Products