import { createContext, useContext, useState, useMemo, useEffect } from 'react';

interface Product {
    id: string | number;
    name?: string;
    price?: number;
}

interface CartItem extends Product {
    quantity: number;
}

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: Product['id'], quantity?: number) => void;
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
    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = sessionStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, quantity: number = 1) => {
        if (quantity <= 0) return;
        setCart(prevCart => {
            const idx = prevCart.findIndex(item => item.id === product.id);
            if (idx === -1) {
                const newItem: CartItem = { ...product, quantity };
                return [...prevCart, newItem];
            }
            const newCart = [...prevCart];
            newCart[idx] = { ...newCart[idx], quantity: newCart[idx].quantity + quantity };
            return newCart;
        });
    };
    const removeFromCart = (productId: Product['id'], quantity: number = 1) => {
        if (quantity <= 0) return;
        setCart(prevCart => {
            const idx = prevCart.findIndex(item => item.id === productId);
            if (idx === -1) return prevCart;
            const item = prevCart[idx];
            if (item.quantity > quantity) {
                const newCart = [...prevCart];
                newCart[idx] = { ...item, quantity: item.quantity - quantity };
                return newCart;
            }
            // eliminar el item si la cantidad resultante es 0 o menor
            return prevCart.filter((_, i) => i !== idx);
        });
    };

    const cleanCart = () => {
        setCart([]);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    const value = useMemo(
        () => ({ cart, addToCart, removeFromCart, cleanCart, totalItems, totalPrice }),
        [cart]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}