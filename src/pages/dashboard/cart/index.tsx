import { useCart } from '@src/hooks/useCart';
import { Button, Card, Empty, Image } from 'antd';
import React from 'react'


const CartPage = () => {
    const { addToCart, cart, removeFromCart } = useCart();
    return (
        <div>
            {cart.length == 0 ? (
                <Empty description="this is data not availalable" />
            ) : (
                cart.map(item => (
                    <Card
                        cover={<Image alt='product image' src={item.product.image} />}
                        key={item.product._id}
                        hoverable>
                        <p>{item.product.description}</p>
                        <p>{item.product.title}</p>
                        <p>{item.product.purchaseprice}</p>
                        <p>{item.product.rating}</p>
                        <span>{item.quantity}</span>
                        <Button type='primary' danger onClick={() => removeFromCart(item.product._id)}>Delete</Button>

                    </Card>
                ))
            )}
        </div>
    )
}
export default CartPage
