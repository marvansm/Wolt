"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { CartItem, CartContextType, Order } from '@/types/global';
import { useAuth } from './AuthContext';
import api from '@/services/api';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [items, setItems] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentAddress, setCurrentAddress] = useState<any>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartViewMode, setCartViewMode] = useState<'basket' | 'order'>('basket');
    const [venueComment, setVenueComment] = useState("");

    const cartKey = user ? `wolt_cart_${user.email}` : 'wolt_cart_guest';
    const ordersKey = user ? `wolt_orders_${user.email}` : 'wolt_orders_guest';
    const commentKey = user ? `wolt_comment_${user.email}` : 'wolt_comment_guest';
    const addressKey = user ? `wolt_address_${user.email}` : 'wolt_address_guest';

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

        const savedComment = localStorage.getItem(commentKey);
        if (savedComment) {
            setVenueComment(savedComment);
        } else {
            setVenueComment("");
        }

        const savedAddress = localStorage.getItem(addressKey);
        if (savedAddress) {
            try {
                setCurrentAddress(JSON.parse(savedAddress));
            } catch (e) {
                console.error("Failed to parse address", e);
            }
        }
    }, [cartKey, ordersKey, commentKey, addressKey]);

    useEffect(() => {
        localStorage.setItem(cartKey, JSON.stringify(items));
    }, [items, cartKey]);

    useEffect(() => {
        localStorage.setItem(ordersKey, JSON.stringify(orders));
    }, [orders, ordersKey]);

    useEffect(() => {
        localStorage.setItem(commentKey, venueComment);
    }, [venueComment, commentKey]);

    useEffect(() => {
        if (currentAddress) {
            localStorage.setItem(addressKey, JSON.stringify(currentAddress));
        }
    }, [currentAddress, addressKey]);

    const totalAmount = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
    const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

    const addToCart = useCallback((product: any, store: any) => {
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
                storeType: store.type || (store.category === 'Store' ? 'store' : 'restaurant'),
                latitude: store.latitude,
                longitude: store.longitude
            };

            return [...prevItems, newItem];
        });
    }, []);

    const removeFromCart = useCallback((productId: string) => {
        setItems(prevItems => prevItems.filter(item => item._id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setItems(prevItems => prevItems.map(item => 
            item._id === productId ? { ...item, quantity } : item
        ));
    }, [removeFromCart]);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const geocodeAddress = useCallback(async (address: string): Promise<{lat: number, lng: number} | null> => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
            const data = await response.json();
            if (data && data.length > 0) {
                return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
            }
        } catch (e) {
            console.error("Geocoding failed", e);
        }
        return null;
    }, []);

    const placeOrder = useCallback(async (
        router?: any, 
        venueComment?: string, 
        paymentMethod: string = 'card',
        metadata?: {
            tip?: number;
            deliveryMode?: string;
            deliveryTimeType?: string;
            isGift?: boolean;
            courierNote?: string;
            deliveryAddress?: string;
        }
    ) => {
        if (items.length === 0) return;
        
        const storeLoc = items[0].latitude && items[0].longitude 
            ? { lat: items[0].latitude, lng: items[0].longitude }
            : { lat: 40.4093, lng: 49.8671 };

        let deliveryLoc = { lat: 40.4200, lng: 49.8800 };
        let deliveryAddress = metadata?.deliveryAddress || "Unknown Address";

        if (!metadata?.deliveryAddress) {
            try {
                const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
                    const options = { timeout: 5000, enableHighAccuracy: true };
                    navigator.geolocation.getCurrentPosition(resolve, reject, options);
                });
                deliveryLoc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${deliveryLoc.lat}&lon=${deliveryLoc.lng}`);
                const data = await response.json();
                if (data && data.address) {
                    const addr = data.address;
                    deliveryAddress = [addr.road, addr.house_number, addr.city || addr.town || addr.village || addr.suburb].filter(Boolean).join(', ') || "Current Location";
                } else {
                    deliveryAddress = "Current Location";
                }
            } catch (e) {
                console.warn("Geolocation failed or was denied, using fallback");
                const geoResult = await geocodeAddress("89 Ilgar Jumshudov Street 40");
                if (geoResult) {
                    deliveryLoc = geoResult;
                    deliveryAddress = "89 Ilgar Jumshudov Street 40";
                }
            }
        }

        const orderData = {
            customerName: user ? `${user.firstName} ${user.lastName}` : "Guest",
            total: totalAmount,
            items: items, // Using full items for JSON
            venueComment: venueComment || "",
            restaurantId: items[0].storeId,
            userId: user?.id || (user as any)?._id,
            deliveryAddress: deliveryAddress,
            status: 'received',
            paymentMethod: paymentMethod,
            ...metadata
        };

        try {
            const createdOrder = await api.PostData('/orders', orderData);
            
            const newOrder: Order = {
                id: createdOrder.id,
                items: [...items],
                total: totalAmount,
                date: new Date().toISOString(),
                storeId: items[0].storeId,
                storeName: items[0].storeName,
                storeImage: items[0].storeImage,
                deliveryAddress: deliveryAddress,
                status: 'received',
                storeLocation: storeLoc,
                deliveryLocation: deliveryLoc,
                paymentMethod: paymentMethod
            };

            setOrders(prev => [newOrder, ...prev]);
            clearCart();
            setVenueComment(""); // Clear comment after order
            setIsCartOpen(false);

            if (router) {
                router.push(`/orders/${newOrder.id}`);
            }
        } catch (error) {
            console.error("Failed to place order via API", error);
            // Fallback to local-only if API fails or alert user
            alert("Sifariş tamamlanarkən xəta baş verdi. Zəhmət olmasa yenidən yoxlayın.");
        }
    }, [items, totalAmount, geocodeAddress, clearCart, user]);

    const updateOrderStatus = useCallback((orderId: string, newStatus: Order['status']) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }, []);

    const contextValue = useMemo(() => ({
        items, 
        orders,
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        placeOrder,
        updateOrderStatus,
        totalAmount, 
        itemCount,
        isCartOpen,
        setIsCartOpen,
        cartViewMode,
        setCartViewMode,
        venueComment,
        setVenueComment,
        currentAddress,
        setCurrentAddress
    }), [items, orders, addToCart, removeFromCart, updateQuantity, clearCart, placeOrder, updateOrderStatus, totalAmount, itemCount, isCartOpen, cartViewMode, venueComment, currentAddress]);

    return (
        <CartContext.Provider value={contextValue}>
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
