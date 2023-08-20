import React from 'react';
import { List, Image, Typography, Button, Popconfirm, Input } from 'antd';
import { DeleteOutlined, MinusCircleTwoTone, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '@src/hooks/useCart';

const CartUI = () => {
    const { cart: cartItems, removeFromCart, decrementQuantity, incrementQuantity } = useCart()
    return (
        <div>
            <List
                itemLayout="vertical"
                className='m-20'
                dataSource={cartItems}
                renderItem={item => (
                    <List.Item
                        key={item.product._id}
                        extra={<Image width={100} src={item.product.image} alt={item.product.title} />}
                        className='flex flex-row'
                    >
                        <Button
                            type='primary'
                            danger
                            onClick={() => decrementQuantity(item.product._id)}
                            disabled={item.quantity == 1}
                            icon={<MinusOutlined />}
                            className='mr-2'
                        >
                        </Button>
                        <Typography.Text>{item.quantity}</Typography.Text>
                        <Button
                            type='primary'
                            onClick={() => incrementQuantity(item.product._id)}
                            className='ml-2'
                            icon={<PlusOutlined />}
                        >
                        </Button>
                        <List.Item.Meta
                            title={item.product.title}
                            description={`Price: $${item.product.purchaseprice.toFixed(2)}`}
                        />
                        <Typography.Text>Quantity: {item.quantity}</Typography.Text>
                        <Popconfirm
                            title="are you sure you want to delete this product!"
                            okText="ok"
                            cancelText="cancel"
                            onConfirm={() => removeFromCart(item.product._id)}
                            className='ml-3'
                        >
                            <Button type="primary" danger><DeleteOutlined /></Button>
                        </Popconfirm>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default CartUI;
