import { IProduct } from '@src/types';
import React, { ReactNode, createContext, useCallback, useState, useMemo } from 'react';

interface CartItem {
    product: IProduct;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: IProduct) => void;
    removeFromCart: (productId: string) => void;
    incrementQuantity: (producId: string) => void,
    decrementQuantity: (producId: string) => void,

}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const incrementQuantity = useCallback((productId: string) => {
        setCart(preevcart =>
            preevcart.map(item =>
                item.product._id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        )
    }, [])

    const decrementQuantity = useCallback((productId: string) => {
        setCart(prevcart =>
            prevcart.map(item =>
                item.product._id === productId ? { ...item, quantity: item.quantity - 1 } : item
            ))
    }, [])

    const addToCart = useCallback((product: IProduct) => {
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
    }, [cart]);

    const removeFromCart = useCallback((productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
    }, []);

    const contextValue: CartContextType = useMemo(() => ({
        cart,
        addToCart,
        removeFromCart,
        decrementQuantity,
        incrementQuantity
    }), [
        cart,
        removeFromCart,
        addToCart,
        decrementQuantity,
        incrementQuantity
    ])

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};