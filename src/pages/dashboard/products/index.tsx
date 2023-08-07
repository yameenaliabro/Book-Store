//@ts-nocheck
import { PlusOutlined } from "@ant-design/icons"
import { UseCreateProduct, UseDeleteProduct, UseEditProduct, UseGetProduct } from "@src/apis"
import { ProductItem } from "@src/molecules/product"
import CreateProductModal, { CreateProductModalRefProps } from "@src/molecules/product/CreateProductModal"
import { CreateProductType, EditProductType, IProduct } from "@src/types"
import { FloatButton, Typography, message } from "antd"
import { useCallback, useRef } from "react"

function Products() {
    const { data, isLoading, refetch } = UseGetProduct()
    const createproductmodal = useRef<CreateProductModalRefProps>(null)

    const { mutateAsync: editproduct, isLoading: editloading } = UseEditProduct()
    const { mutateAsync: createproduct, isLoading: createloading } = UseCreateProduct()
    const { mutateAsync: deleteproduct, } = UseDeleteProduct()

    const OncreateProduct = useCallback(async (v: CreateProductType) => {
        await createproduct(v, {
            onSuccess: () => {
                message.success("your product sucessfully created!")
                refetch()
            }
        })
    }, [createproduct, refetch])

    const OneditProduct = useCallback(async (v: EditProductType) => {
        await editproduct(v, {
            onSuccess: () => {
                message.success("your edit sucessfully"),
                    refetch()
            }
        })
    }, [editproduct, refetch])

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

    const OnOpenCreateModal = () => createproductmodal.current?.open()

    const OnEdit = useCallback(async (blog: IProduct) => {
        createproductmodal.current?.edit(blog)
    }, [])

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
                            onEdit={OnEdit} />
                    ))
                }

                <CreateProductModal
                    onCreateProduct={OncreateProduct}
                    onEditProduct={OneditProduct}
                    createloading={createloading | editloading}
                    ref={createproductmodal}
                />

                <FloatButton
                    onClick={OnOpenCreateModal}
                    type="primary"
                    icon={<PlusOutlined />} />
            </div>
        </div>
    )
}
export default Products