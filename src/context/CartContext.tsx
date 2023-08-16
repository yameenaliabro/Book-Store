import { IProduct } from '@src/types';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface CartItem {
    product: IProduct;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: IProduct) => void;
    removeFromCart: (productId: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: IProduct) => {
        const existingItem = cart.find(item => item.product._id === product._id);
        if (existingItem) {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            setCart(prevCart => [...prevCart, { product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
    };

    const contextValue: CartContextType = {
        cart,
        addToCart,
        removeFromCart,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
