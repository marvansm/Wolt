"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, ChevronRight, Star, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ProductReviewModal from "./ProductReviewModal";
import { useIntlayer } from "react-intlayer";

export default function CartDrawer() {
  const content = useIntlayer("features");
  if (!content) return null;
  const { 
    items, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    totalAmount,
    itemCount,
    addToCart,
    clearCart,
    cartViewMode,
    setCartViewMode,
    venueComment,
    setVenueComment
  } = useCart();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'carts' | 'again'>('carts');
  const [loading, setLoading] = useState(false);
  const [reviewingProduct, setReviewingProduct] = useState<any>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [tempComment, setTempComment] = useState("");
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

  const { data: restaurant, error: restaurantError } = useQuery({
    queryKey: ["restaurant-cart", firstItem?.storeId],
    queryFn: () => api.getData(`/${storePath}/${firstItem?.storeId}`),
    enabled: !!firstItem?.storeId && cartViewMode === 'order',
    retry: false,
  });

  const isStaleRestaurant = (restaurantError as any)?.response?.status === 404;

  const recommendedItems = useMemo(() => {
    if (!restaurant?.menu || cartViewMode === 'basket') return [];

    const allProducts = restaurant.menu.flatMap((cat: any) => cat.products || []);
    const filtered = allProducts.filter(
      (p: any) => !items.find((item) => item._id === p._id)
    );

    return filtered.slice(0, 4);
  }, [restaurant, items, cartViewMode]);

  const itemIds = useMemo(() => items.map(i => i._id || (i as any).id), [items]);

  const { data: ratings } = useQuery({
    queryKey: ["product-ratings", itemIds],
    queryFn: () => api.PostData("/reviews/averages", { ids: itemIds, type: "product" }),
    enabled: itemIds.length > 0,
  });

  const getRating = (id: string) => {
    const r = ratings?.find((item: any) => item.id === id);
    return r ? { average: r.average, count: r.count } : null;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
        
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

         
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-card shadow-2xl z-50 flex flex-col border-l border-border/10 transition-colors duration-300"
          >
            
            <div className="p-6 pb-2 bg-card sticky top-0 z-10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[32px] font-extrabold text-foreground tracking-tight">
                  {cartViewMode === 'basket' ? content.cart.yourOrders : content.cart.yourOrder}
                </h2>
                <div className="flex items-center gap-4">
                  <button className="text-[#009de0] font-bold text-lg hover:opacity-80 transition-opacity">
                    {content.cart.edit}
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-secondary transition-colors border border-border/30"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {cartViewMode === 'basket' && (
                <div className="flex p-1 bg-muted rounded-[14px] mt-4 border border-border/20">
                  <button
                    onClick={() => setActiveTab('carts')}
                    className={`flex-1 py-3 text-center rounded-[12px] font-bold text-[15px] transition-all ${
                      activeTab === 'carts' ? 'bg-secondary text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {content.cart.shoppingCarts}
                  </button>
                  <button
                    onClick={() => setActiveTab('again')}
                    className={`flex-1 py-3 text-center rounded-[12px] font-bold text-[15px] transition-all ${
                      activeTab === 'again' ? 'bg-secondary text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {content.cart.orderAgain}
                  </button>
                </div>
              )}
            </div>

        
            <div className="flex-1 overflow-y-auto hide-scrollbar p-6 pt-2">
              {isStaleRestaurant ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                    <AlertTriangle size={48} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">{content.cart.staleVenue as any}</h3>
                    <p className="text-muted-foreground max-w-[300px] mx-auto">
                      {content.cart.staleDesc}
                    </p>
                    <Button 
                      onClick={clearCart}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all"
                    >
                      {content.cart.clearStale}
                    </Button>
                  </div>
                </div>
              ) : isEmpty ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border border-border/20">
                    <ShoppingBag size={36} className="text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">{content.cart.emptyTitle as any}</h3>
                    <p className="text-muted-foreground">{content.cart.emptyDesc as any}</p>
                  </div>
                </div>
              ) : cartViewMode === 'basket' ? (
          
                <div className="space-y-6">
                  {Object.entries(groupedCarts).map(([storeId, storeItems]) => (
                    <div key={storeId} className="bg-muted rounded-[24px] p-6 border border-border/10 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 border border-border/20">
                            <Image src={storeItems[0].storeImage || "/logo.png"} alt={storeItems[0].storeName} fill className="object-cover" />
                          </div>
                          <div>
                            <h4 className="text-foreground font-black text-lg leading-tight">{storeItems[0].storeName}</h4>
                            <p className="text-muted-foreground text-sm font-medium">{content.cart.deliveryIn as any} {storeItems[0].deliveryTime || '15-25'} {content.cart.min as any}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => storeItems.forEach(i => removeFromCart(i._id))}
                          className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors border border-border/30"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>
                        </button>
                      </div>

                      <div className="border-t border-dashed border-border/20 pt-4" />

                      <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                        {storeItems.map(item => (
                          <div key={item._id} className="relative w-16 h-12 bg-secondary rounded-lg overflow-hidden shrink-0 border border-border/30">
                            <Image src={item.image || "/logo.png"} alt={item.name} fill className="object-cover" />
                          </div>
                        ))}
                      </div>

                      <p className="text-foreground font-bold">{content.cart.itemSubtotal as any}: AZN {storeItems.reduce((acc, i) => acc + i.price * i.quantity, 0).toFixed(2)}</p>

                      <div className="flex gap-3 pt-2">
                        <Button
                          variant="secondary"
                          onClick={() => setIsCartOpen(false)}
                          className="flex-1 bg-secondary text-[#009de0] py-4 rounded-xl font-bold hover:brightness-110 transition-all h-auto border border-border/30 shadow-sm"
                        >
                          {content.cart.addMore}
                        </Button>
                        <Button
                          onClick={async () => {
                            setLoading(true);
                            setCartViewMode('order');
                            sessionStorage.setItem('returnUrl', window.location.pathname + window.location.search);
                            router.push('/checkout');
                            setIsCartOpen(false);
                            setLoading(false);
                          }}
                          loading={loading}
                          className="flex-1 bg-[#009de0] text-white py-4 rounded-xl font-bold hover:bg-[#00b0ff] transition-colors shadow-lg shadow-[#009de0]/20 flex items-center justify-center h-auto"
                        >
                          {content.cart.goToCheckout}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
            
                <div className="space-y-8 pb-32">
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item._id} className="flex gap-4 items-center group">
                        <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden bg-muted border border-border/30 shrink-0">
                          <Image
                            src={item.image || "/wolt_shopping_bag_illustration_1773839218889.png"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col">
                            <h4 className="text-foreground font-bold text-lg leading-tight flex items-center gap-2">
                              {item.name}
                              {getRating(item._id || (item as any).id) && (
                                <span className="flex items-center gap-1 text-[12px] bg-yellow-400/10 text-yellow-500 px-1.5 py-0.5 rounded-md">
                                  <Star size={10} className="fill-yellow-500" />
                                  {getRating(item._id || (item as any).id)?.average.toFixed(1)}
                                </span>
                              )}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-[#009de0] font-bold">AZN {item.price.toFixed(2)}</span>
                                <button 
                                  onClick={() => setReviewingProduct(item)}
                                  className="text-[11px] font-black uppercase tracking-wider text-yellow-500 hover:text-yellow-600 transition-colors flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded-md"
                                >
                                  <Star size={10} className="fill-yellow-500" />
                                  {content.cart.rate}
                                </button>
                                {item.price > 5 && (
                                 <span className="bg-[#009de0]/10 text-[#009de0] text-[10px] font-black uppercase px-2 py-0.5 rounded-md">{content.cart.popular as any}</span>
                               )}
                            </div>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-muted rounded-xl border border-border/30 flex items-center justify-center text-foreground font-black text-lg shadow-inner">
                           {item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

             
                  <div className="bg-muted rounded-2xl p-6 flex items-center justify-between border border-border/20 shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-[#009de0]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-foreground font-black text-sm">{content.cart.addComment as any}</h4>
                        <p className="text-muted-foreground text-xs leading-relaxed mt-0.5 max-w-[240px]">
                          {content.cart.commentDesc}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setTempComment(venueComment);
                        setIsCommentModalOpen(true);
                      }}
                      className="bg-secondary text-[#009de0] px-4 py-2 rounded-xl font-bold text-sm hover:brightness-110 transition-all border border-border/30"
                    >
                      {venueComment ? content.cart.edit : content.cart.add}
                    </button>
                  </div>

                  {venueComment && (
                    <div className="bg-[#009de0]/5 border border-[#009de0]/10 p-4 rounded-xl animate-in slide-in-from-top-2">
                       <p className="text-[#009de0] text-sm font-bold flex items-center gap-2">
                         <Star size={14} className="fill-[#009de0]" />
                         {content.cart.yourNote as any}: "{venueComment}"
                       </p>
                    </div>
                  )}

                  {recommendedItems.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-foreground">{content.cart.recommended as any}</h3>
                      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                        {recommendedItems.map((p: any) => (
                          <div key={p._id} className="min-w-[240px] bg-muted rounded-2xl overflow-hidden border border-border/20 shadow-sm transition-all duration-300">
                            <div className="relative aspect-[16/10] bg-background">
                              <button 
                                onClick={() => addToCart(p, restaurant)}
                                className="absolute top-2 right-2 w-8 h-8 bg-background/50 backdrop-blur-md rounded-full flex items-center justify-center text-foreground z-10 hover:bg-[#009de0] hover:text-white transition-all border border-border/30"
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
                               <h4 className="text-foreground font-bold text-sm truncate">{p.name}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

 
            {cartViewMode === 'order' && !isEmpty && (
              <div className="p-6 bg-card border-t border-border/20 sticky bottom-0 z-20 shadow-[0_-4px_24px_rgba(0,0,0,0.1)]">
                <Button
                  onClick={async () => {
                    setLoading(true);
                    sessionStorage.setItem('returnUrl', window.location.pathname + window.location.search);
                    router.push('/checkout');
                    setIsCartOpen(false);
                    setLoading(false);
                  }}
                  loading={loading}
                  className="w-full bg-[#009de0] hover:bg-[#00c2e8] text-white h-16 rounded-xl font-black text-[18px] flex items-center justify-between px-6 transition-all shadow-xl shadow-[#009de0]/30"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-sm shadow-inner">{itemCount}</span>
                    <span>{content.cart.goToCheckout}</span>
                  </div>
                  <span>AZN {totalAmount.toFixed(2)}</span>
                </Button>
              </div>
            )}
          </motion.div>
          
     
          {reviewingProduct && (
            <ProductReviewModal 
              product={reviewingProduct} 
              onClose={() => setReviewingProduct(null)} 
            />
          )}

      
          {isCommentModalOpen && (
            <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCommentModalOpen(false)} />
              <div className="relative bg-card w-full max-w-[440px] rounded-[28px] p-6 border border-border/10 shadow-2xl animate-in zoom-in-95">
                <h3 className="text-xl font-black mb-4">{content.cart.addNotePlaceholder as any}</h3>
                <textarea 
                  className="w-full h-32 bg-muted/50 border border-border/10 rounded-xl p-4 text-foreground outline-none focus:border-[#009de0]"
                  placeholder={content.cart.addNotePlaceholder as any}
                  value={tempComment}
                  onChange={(e) => setTempComment(e.target.value)}
                  autoFocus
                />
                <div className="flex gap-3 mt-4">
                  <Button variant="secondary" onClick={() => setIsCommentModalOpen(false)} className="flex-1 rounded-xl font-bold">{content.cart.cancel as any}</Button>
                  <Button onClick={() => { setVenueComment(tempComment); setIsCommentModalOpen(false); }} className="flex-1 rounded-xl font-bold bg-[#009de0]">{content.cart.save as any}</Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
