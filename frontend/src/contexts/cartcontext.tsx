/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useReducer } from "react";

type Product = { id: string; brand?: string; title: string; price: number; img?: string };
type CartItem = Product & { qty: number };

type State = {
    items: CartItem[];
    drawerOpen: boolean;
};

type Action =
    | { type: "add"; product: Product }
    | { type: "dec"; id: string }
    | { type: "remove"; id: string }
    | { type: "clear" }
    | { type: "open" }
    | { type: "close" }
    | { type: "toggle" }
    | { type: "set"; state: State };

const INITIAL: State = { items: [], drawerOpen: false };

const CartContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function reducer(state: State, action: Action): State {
    console.log("CART ACTION:", action, "BEFORE:", state);
    switch (action.type) {
        case "add": {
            const idx = state.items.findIndex(i => i.id === action.product.id);
            if (idx >= 0) {
                const items = state.items.slice();
                items[idx] = { ...items[idx], qty: items[idx].qty + 1 };
                const next = { ...state, items };
                console.log("CART NEXT:", next);
                return next;
            }
            const next = { ...state, items: [...state.items, { ...action.product, qty: 1 }] };
            console.log("CART NEXT:", next);
            return next;
        }
        case "dec": {
            const items = state.items
                .map(i => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
                .filter(i => i.qty > 0);
            const next = { ...state, items };
            console.log("CART NEXT:", next);
            return next;
        }
        case "remove": {
            const next = { ...state, items: state.items.filter(i => i.id !== action.id) };
            console.log("CART NEXT:", next);
            return next;
        }
        case "clear": {
            const next = { ...state, items: [] };
            console.log("CART NEXT:", next);
            return next;
        }
        case "open":
            return { ...state, drawerOpen: true };
        case "close":
            return { ...state, drawerOpen: false };
        case "toggle":
            console.log("TOGGLE ->", !state.drawerOpen);
            return { ...state, drawerOpen: !state.drawerOpen };
        case "set":
            return action.state;
        default:
            return state;
    }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL, initial => {
        try {
            const raw = globalThis.localStorage?.getItem("cart_v1");
            return raw ? { ...initial, ...(JSON.parse(raw) as Partial<State>) } : initial;
        } catch (e) {
            console.warn('cartcontext: failed to read cart_v1', e);
            return initial;
        }
    });

    useEffect(() => {
        try {
            // persist only items, keep drawer closed on reload
            globalThis.localStorage?.setItem("cart_v1", JSON.stringify({ items: state.items }));
        } catch (e) {
            console.warn('cartcontext: failed to persist cart_v1', e);
        }
    }, [state.items]);

    const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        console.error("useCart usado fuera de CartProvider - devolviendo stub seguro");
        // fallback seguro para evitar crash en dev mientras diagnosticas
        return {
            state: { items: [], drawerOpen: false },
            dispatch: () => { }
        };
    }
    return ctx;
}

