import { DeleteOutlined, EditOutlined, MoreOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { IProduct } from '@src/types'
import { Avatar, Button, Card, Image, Popconfirm, Rate, Typography } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'

type ProductItemProps = {
    item: IProduct,
    onEdit: (blog: IProduct) => void,
    onDelete: (id: string) => void

}

const ProductItem = (props: ProductItemProps) => {
    const unit = "$"
    const { item, onDelete, onEdit } = props
    const { _id, description, image, price, rating, title, updatedAt } = item
    const { Meta } = Card
    return (
        <div className='flex justify-center flex-wrap'>
            <Card className='flex flex-col  flex-wrap w-[300px] m-10'
                cover={
                    <Image
                        src={image}
                        alt='example'
                        preview={false}
                        className='w-[300px] h-[200px]'
                    />
                }
                actions={[
                    <Popconfirm
                        title="Are you sure you want to delete the blog!"
                        key={_id}
                        cancelText="cancel"
                        okText="ok"
                        onConfirm={() => onDelete(_id)}
                    >
                        <DeleteOutlined key="setting" />,
                    </Popconfirm>,
                    <EditOutlined key="edit" onClick={() => onEdit(item)} />,
                    <Button type='text' shape="default" icon={<ShoppingCartOutlined />} key={_id} />
                ]}
            >
                <div>
                    <Rate disabled defaultValue={rating} />
                    <Meta
                        avatar={<Avatar src="https://thumbs.dreamstime.com/b/unknown-male-avatar-profile-image-businessman-vector-unknown-male-avatar-profile-image-businessman-vector-profile-179373829.jpg" />}
                        title={title}
                        description={description}
                    />
                    <Typography.Text>
                        {unit}
                        {price}
                    </Typography.Text>
                </div>
            </Card>
        </div >
    )
}

export default ProductItem