'use client';

import { getItem, setItem } from '@/lib/localStorage';
import { CartItem } from '@/types/cart';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';


export type CartContextValue = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (item: CartItem) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export type CartProviderProps = {
  children: React.ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {

    const LOCAL_STORAGE_CART_KEY = 'easy-drive-cart';
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = getItem<CartItem[]>(LOCAL_STORAGE_CART_KEY);
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);

    const addToCart = useCallback((item: CartItem) => {
        setCart((prev) => {
            const newCart = [...prev, item];
            setItem<CartItem[]>(LOCAL_STORAGE_CART_KEY, newCart);
            return newCart;
        });
    }, []);

    const removeFromCart = useCallback((item: CartItem) => {
        setCart((prev) => {
            const newCart = prev.filter((i) => i.identifier !== item.identifier);
            setItem<CartItem[]>(LOCAL_STORAGE_CART_KEY, newCart);
            return newCart;
        });
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
        setItem<CartItem[]>(LOCAL_STORAGE_CART_KEY, []);
    }, []);

    const value = useMemo(() => ({
        cart,
        addToCart,
        removeFromCart,
        clearCart,
    }), [cart, addToCart, removeFromCart, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartProvider(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}

