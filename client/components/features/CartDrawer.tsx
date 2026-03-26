"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export default function CartDrawer() {
  const { 
    items, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    totalAmount,
    itemCount,
    addToCart,
    cartViewMode,
    setCartViewMode
  } = useCart();

  const [activeTab, setActiveTab] = useState<'carts' | 'again'>('carts');
  const isEmpty = items.length === 0;

  const groupedCarts = useMemo(() => {
    const groups: { [key: string]: typeof items } = {};
    items.forEach(item => {
      if (!groups[item.storeId]) groups[item.storeId] = [];
      groups[item.storeId].push(item);
    });
    return groups;
  }, [items]);

  const firstItem = items.length > 0 ? items[0] : null;
  const storePath = firstItem?.storeType === 'store' ? 'stores' : 'restaurants';

  const { data: restaurant } = useQuery({
    queryKey: ["restaurant-cart", firstItem?.storeId],
    queryFn: () => api.getData(`/${storePath}/${firstItem?.storeId}`),
    enabled: !!firstItem?.storeId && cartViewMode === 'order',
  });

  const recommendedItems = useMemo(() => {
    if (!restaurant?.menu || cartViewMode === 'basket') return [];

    const allProducts = restaurant.menu.flatMap((cat: any) => cat.products || []);
        const filtered = allProducts.filter(
      (p: any) => !items.find((item) => item._id === p._id)
    );

    return filtered.slice(0, 4);
  }, [restaurant, items, cartViewMode]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-[#141414] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 pb-2 bg-[#141414] sticky top-0 z-10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[32px] font-extrabold text-white tracking-tight">
                  {cartViewMode === 'basket' ? 'Your orders' : 'Your order'}
                </h2>
                <div className="flex items-center gap-4">
                  <button className="text-[#009de0] font-bold text-lg hover:opacity-80 transition-opacity">
                    Edit
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-10 h-10 rounded-full bg-[#1f1f1f] flex items-center justify-center text-white hover:bg-[#2b2b2b] transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {cartViewMode === 'basket' && (
                <div className="flex p-1 bg-[#1f1f1f] rounded-[14px] mt-4">
                  <button
                    onClick={() => setActiveTab('carts')}
                    className={`flex-1 py-3 text-center rounded-[12px] font-bold text-[15px] transition-all ${
                      activeTab === 'carts' ? 'bg-[#2b2b2b] text-white shadow-lg' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Shopping carts
                  </button>
                  <button
                    onClick={() => setActiveTab('again')}
                    className={`flex-1 py-3 text-center rounded-[12px] font-bold text-[15px] transition-all ${
                      activeTab === 'again' ? 'bg-[#2b2b2b] text-white shadow-lg' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Order again
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto hide-scrollbar p-6 pt-2">
              {isEmpty ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="relative w-48 h-48 opacity-20">
                    <Image
                      src="/wolt_shopping_bag_illustration_1773839218889.png"
                      alt="Empty cart"
                      fill
                      className="object-contain grayscale"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Your cart is empty</h3>
                    <p className="text-gray-400">Add products from your favorite venues!</p>
                  </div>
                </div>
              ) : cartViewMode === 'basket' ? (
                /* SHOPPING CARTS VIEW (Screenshot 1) */
                <div className="space-y-6">
                  {Object.entries(groupedCarts).map(([storeId, storeItems]) => (
                    <div key={storeId} className="bg-[#1f1f1f] rounded-[24px] p-6 border border-white/5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0">
                            <Image src={storeItems[0].storeImage || "/logo.png"} alt={storeItems[0].storeName} fill className="object-cover" />
                          </div>
                          <div>
                            <h4 className="text-white font-black text-lg leading-tight">{storeItems[0].storeName}</h4>
                            <p className="text-gray-400 text-sm font-medium">Delivery in {storeItems[0].deliveryTime || '15-25'} min</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => storeItems.forEach(i => removeFromCart(i._id))}
                          className="w-10 h-10 bg-[#2b2b2b] rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>
                        </button>
                      </div>

                      <div className="border-t border-dashed border-white/10 pt-4" />

                      <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                        {storeItems.map(item => (
                          <div key={item._id} className="relative w-16 h-12 bg-[#2b2b2b] rounded-lg overflow-hidden shrink-0 border border-white/5">
                            <Image src={item.image || "/logo.png"} alt={item.name} fill className="object-cover" />
                          </div>
                        ))}
                      </div>

                      <p className="text-white font-bold">Item subtotal: AZN {storeItems.reduce((acc, i) => acc + i.price * i.quantity, 0).toFixed(2)}</p>

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => setIsCartOpen(false)}
                          className="flex-1 bg-[#25353d] text-[#009de0] py-4 rounded-xl font-bold hover:bg-[#2c424d] transition-colors"
                        >
                          Add more items
                        </button>
                        <Link
                          href="/checkout"
                          onClick={() => {
                            setCartViewMode('order');
                            setIsCartOpen(false);
                          }}
                          className="flex-1 bg-[#009de0] text-white py-4 rounded-xl font-bold hover:bg-[#00b0ff] transition-colors shadow-lg shadow-[#009de0]/20 flex items-center justify-center"
                        >
                          Go to checkout
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* DETAILED ORDER VIEW (Screenshot 2) */
                <div className="space-y-8 pb-32">
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item._id} className="flex gap-4 items-center group">
                        <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden bg-[#1f1f1f] border border-white/5 shrink-0">
                          <Image
                            src={item.image || "/wolt_shopping_bag_illustration_1773839218889.png"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col">
                            <h4 className="text-white font-bold text-lg leading-tight">{item.name}</h4>
                            <div className="flex items-center gap-3 mt-1">
                               <span className="text-[#009de0] font-bold">AZN {item.price.toFixed(2)}</span>
                               {item.price > 5 && (
                                 <span className="bg-[#009de0]/10 text-[#009de0] text-[10px] font-black uppercase px-2 py-0.5 rounded-md">Popular</span>
                               )}
                            </div>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-[#1f1f1f] rounded-xl border border-white/5 flex items-center justify-center text-white font-black text-lg shadow-inner">
                           {item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Comments Section (Screenshot 2 style) */}
                  <div className="bg-[#1f1f1f] rounded-2xl p-6 flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#009de0]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-black text-sm">Add comment for venue</h4>
                        <p className="text-gray-500 text-xs leading-relaxed mt-0.5 max-w-[240px]">
                          Special requests, allergies, dietary restrictions, greeting card text...
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#25353d] text-[#009de0] px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#2c424d] transition-colors">
                      Edit
                    </button>
                  </div>

                  {/* Recommended Section stays for V2 feel */}
                  {recommendedItems.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white">Recommended for you</h3>
                      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                        {recommendedItems.map((p: any) => (
                          <div key={p._id} className="min-w-[240px] bg-[#1f1f1f] rounded-2xl overflow-hidden border border-white/5">
                            <div className="relative aspect-[16/10] bg-[#2b2b2b]">
                              <button 
                                onClick={() => addToCart(p, restaurant)}
                                className="absolute top-2 right-2 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white z-10 hover:bg-[#009de0] transition-colors"
                              >
                                <Plus size={20} />
                              </button>
                              <Image 
                                src={p.image || "/logo.png"} 
                                alt={p.name} 
                                fill 
                                className="object-cover transition-all" 
                              />
                            </div>
                            <div className="p-4">
                               <p className="text-[#009de0] font-black text-sm">AZN {p.price.toFixed(2)}</p>
                               <h4 className="text-white font-bold text-sm truncate">{p.name}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Only in Order Mode */}
            {cartViewMode === 'order' && !isEmpty && (
              <div className="p-6 bg-[#141414] border-t border-white/5 sticky bottom-0 z-20">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-[#009de0] hover:bg-[#00c2e8] text-white h-16 rounded-xl font-black text-[18px] flex items-center justify-between px-6 transition-all shadow-xl shadow-[#009de0]/30"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-sm shadow-inner">{itemCount}</span>
                    <span>Go to checkout</span>
                  </div>
                  <span>AZN {totalAmount.toFixed(2)}</span>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
