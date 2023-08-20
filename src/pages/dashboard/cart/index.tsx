import React from 'react';
import { List, Image, Typography, Button, Popconfirm } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '@src/hooks/useCart';

const CartUI: React.FC = () => {
    const { cart: cartItems, removeFromCart } = useCart()

    return (
        <List
            itemLayout="vertical"
            dataSource={cartItems}
            renderItem={item => (
                <List.Item
                    key={item.product._id}
                    extra={<Image width={100} src={item.product.image} alt={item.product.title} />}
                >
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
                    >
                        <Button type="primary" danger><DeleteOutlined /></Button>
                    </Popconfirm>
                </List.Item>
            )}
        />
    );
};

export default CartUI;
