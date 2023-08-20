import React from 'react';
import { List, Image, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '@src/hooks/useCart';

const CartUI: React.FC = () => {
    const { cart: cartItems } = useCart()

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
                </List.Item>
            )}
        />
    );
};

export default CartUI;
