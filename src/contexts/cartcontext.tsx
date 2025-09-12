import { createContext, useContext, useState, useMemo } from 'react';

// Minimal Product type — replace or import your real Product definition
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
};

// createContext should receive a typed default (undefined is fine when using a guard in the hook)
export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within a CartProvider');
    return ctx;
};

export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart(prevCart => [...prevCart, product]);
    };

    const removeFromCart = (productId: Product['id']) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const cleanCart = () => {
        setCart([]);
    };

    // memoize the value so the provider doesn't provide a new object each render
    const value = useMemo(
        () => ({ cart, addToCart, removeFromCart, cleanCart }),
        [cart]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}