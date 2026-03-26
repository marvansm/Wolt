"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartContextType, Order } from '@/types/global';
import { useAuth } from './AuthContext';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [items, setItems] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartViewMode, setCartViewMode] = useState<'basket' | 'order'>('basket');

    const cartKey = user ? `wolt_cart_${user.email}` : 'wolt_cart_guest';
    const ordersKey = user ? `wolt_orders_${user.email}` : 'wolt_orders_guest';

    useEffect(() => {
        const savedCart = localStorage.getItem(cartKey);
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to parse cart', error);
                setItems([]);
            }
        } else {
            setItems([]);
        }

        const savedOrders = localStorage.getItem(ordersKey);
        if (savedOrders) {
            try {
                setOrders(JSON.parse(savedOrders));
            } catch (error) {
                console.error('Failed to parse orders', error);
                setOrders([]);
            }
        } else {
            setOrders([]);
        }
    }, [cartKey, ordersKey]);

    useEffect(() => {
        localStorage.setItem(cartKey, JSON.stringify(items));
    }, [items, cartKey]);

    useEffect(() => {
        localStorage.setItem(ordersKey, JSON.stringify(orders));
    }, [orders, ordersKey]);

    const addToCart = (product: any, store: any) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id && item.storeId === (store._id || store.id));
            
            if (existingItem) {
                return prevItems.map(item => 
                    (item._id === product._id && item.storeId === (store._id || store.id))
                        ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                        : item
                );
            }

            const newItem: CartItem = {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: product.quantity || 1,
                storeId: store._id || store.id,
                storeName: store.name,
                storeImage: store.avatar || store.image,
                deliveryTime: store.deliveryTime,
                storeType: store.type || (store.category === 'Store' ? 'store' : 'restaurant')
            };

            return [...prevItems, newItem];
        });
    };

    const removeFromCart = (productId: string) => {
        setItems(prevItems => prevItems.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setItems(prevItems => prevItems.map(item => 
            item._id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setItems([]);
    };

    const placeOrder = () => {
        if (items.length === 0) return;
        
        const newOrder: Order = {
            id: Math.random().toString(36).substr(2, 9),
            items: [...items],
            total: totalAmount,
            date: new Date().toISOString(),
            storeId: items[0].storeId
        };

        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        setIsCartOpen(false);

        alert("Order placed successfully!");
    };

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ 
            items, 
            orders,
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart, 
            placeOrder,
            totalAmount, 
            itemCount,
            isCartOpen,
            setIsCartOpen,
            cartViewMode,
            setCartViewMode
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
