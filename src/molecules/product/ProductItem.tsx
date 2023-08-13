import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { UseEditProduct } from '@src/apis'
import Editproduct, { EditProductModalRefProps } from '@src/pages/dashboard/editproduct'
import { EditProductType, IProduct } from '@src/types'
import { Button, Card, Image, Popconfirm, Rate, Space, message } from 'antd'
import { useRef, useCallback } from "react"

type ProductItemProps = {
    item: IProduct,
    onDelete: (id: string) => void,
}

const ProductItem = (props: ProductItemProps) => {
    const { mutateAsync: onEdit, isLoading } = UseEditProduct()
    const { item, onDelete } = props
    const { _id, description, image, purchaseprice, sellprice, rating, title, } = item
    const { Meta } = Card
    const editProductModalRef = useRef<EditProductModalRefProps>(null);

    const handleeditproduct = useCallback(async (value: EditProductType) => {
        await onEdit(value, {
            onSuccess: () => {
                message.success("product edit suceessfully!")
            }
        })
    }, [onEdit])

    return (
        <div className="flex  flex-row  p-10 h-full  ">
            <Card
                hoverable
                className="w-[340px]  bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg rounded-lg "
                cover={<Image
                    alt={title}
                    src={image}
                    className="h-45 object-cover rounded-t-lg w-300"
                    preview={false}
                />}
                actions={[
                    <Button
                        key={_id}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded"
                        icon={<EditOutlined />}
                        onClick={() => editProductModalRef.current?.edit(item)}
                    >
                        Edit
                    </Button>,
                    <Popconfirm
                        title=" Are you sure you want to delet this Product!"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => onDelete(_id)}
                        key={_id}>
                        <Button
                            key={_id}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold rounded"
                            icon={<DeleteOutlined />}
                        >
                            Delete
                        </Button>
                    </Popconfirm>,
                ]}
            >
                <div className='text-white'>
                    <Meta
                        className='pb-3'
                        title={<span className="text-white">{title}</span>}
                        description={<span className="text-white  truncate">{description}</span>}
                    />
                </div>
                <Space>
                    <span className="bg-white text-gray-800 font-semibold  px-3 py-1 rounded">
                        Sell Price: {sellprice}
                    </span>
                    <span className="bg-white text-gray-800 font-semibold px-3 py-1 pt-2  rounded ">
                        Purchase Price: {purchaseprice}
                    </span>
                </Space>
                <div className="pt-2">
                    <Rate allowHalf defaultValue={rating} disabled />
                </div>
            </Card>
            <Editproduct
                createloading={false}
                onEditProduct={handleeditproduct}
                productToEdit={item}
                key={item._id}
                ref={editProductModalRef}
            />
        </div >
    )
}

export default ProductItem