"use client";

import { ProductModalProps } from "@/types/global";
import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import ReviewSection from "./ReviewSection";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { useIntlayer } from "react-intlayer";

export default function ProductModal({ product, onClose, restaurant }: ProductModalProps) {
  const { store } = useIntlayer("store");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-card w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh] border border-border/50">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/50 hover:bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center text-foreground transition-colors border border-border/30"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto hide-scrollbar flex-1">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-muted rounded-t-2xl overflow-hidden flex items-center justify-center p-8">
            {product.image ? (
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-contain p-8" 
              />
            ) : (
              <div className="w-24 h-24 bg-foreground/10 rounded-full" />
            )}

          </div>

          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex justify-between items-start gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                {product.name}
              </h2>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-xl sm:text-2xl font-bold text-[#009de0]">
                  AZN {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through text-sm">
                    AZN {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

             {product.description && (
               <p className="text-muted-foreground text-base leading-relaxed">
                 {product.description}
               </p>
             )}

             <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground bg-secondary/50 p-4 rounded-xl">
              {product.weight && (
                <div className="flex items-center gap-2">
                   <span className="font-semibold text-foreground">{store.productModal.weight as any}</span>
                   <span>{product.weight}</span>
                </div>
              )}
              {product.unitPrice && (
                <div className="flex items-center gap-2">
                   <span className="font-semibold text-foreground">{store.productModal.unitPrice as any}</span>
                   <span>AZN {product.unitPrice}/kg</span>
                </div>
              )}
            </div>

            <div className="pt-8 border-t border-border/10">
              <ReviewSection productId={String(product._id || product.id)} />
            </div>
          </div>
        </div>

        <div className="p-6 bg-muted border-t border-border/50 flex items-center gap-4 sticky bottom-0">
          <div className="flex items-center bg-background rounded-xl p-1 border border-border/30">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 flex items-center justify-center text-foreground hover:bg-secondary rounded-lg transition-colors disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <Minus size={20} />
            </button>
            <span className="w-12 text-center font-bold text-lg text-foreground">
              {quantity}
            </span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 flex items-center justify-center text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>

          <button 
            onClick={() => {
              addToCart({ ...product, quantity }, restaurant);
              onClose();
            }}
            className="flex-1 bg-[#009de0] hover:bg-[#0088c2] text-white h-14 rounded-xl font-bold text-lg flex items-center justify-between px-6 transition-colors shadow-lg shadow-[#009de0]/20"
          >
            <span>{store.productModal.addToOrder as any}</span>
            <span>AZN {(product.price * quantity).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
