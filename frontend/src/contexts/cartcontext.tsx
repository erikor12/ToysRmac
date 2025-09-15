import { createContext, useContext, useState, useMemo, useEffect } from 'react';

interface Product {
    id: string | number;
    name?: string;
    price?: number;
}

type CartContextType = {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: Product['id']) => void;
    cleanCart: () => void;
    totalItems: number;
    totalPrice: number;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within a CartProvider');
    return ctx;
};

export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [cart, setCart] = useState<Product[]>(() => {
        const storedCart = sessionStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart(prevCart => [...prevCart, product]);
    };

    const removeFromCart = (productId: Product['id']) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const cleanCart = () => {
        setCart([]);
    };

    const totalItems = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    const value = useMemo(
        () => ({ cart, addToCart, removeFromCart, cleanCart, totalItems, totalPrice }),
        [cart]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}