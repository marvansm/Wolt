"use client";

import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ProductModalProps {
  product: any;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#141414] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto hide-scrollbar flex-1">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-white/5 flex items-center justify-center p-8">
            {product.image ? (
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-contain p-8 mix-blend-screen" 
              />
            ) : (
              <div className="w-24 h-24 bg-white/10 rounded-full" />
            )}
            {product.badge && (
               <div className="absolute top-4 left-4 z-10 bg-wolt-red text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">
                 {product.badge}
               </div>
            )}
          </div>

          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex justify-between items-start gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {product.name}
              </h2>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-xl sm:text-2xl font-bold text-wolt-blue">
                  AZN {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    AZN {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

             {product.description && (
               <p className="text-[#a3a3a3] text-base leading-relaxed">
                 {product.description}
               </p>
             )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-[#737373] bg-[#1f1f1f] p-4 rounded-xl">
              {product.weight && (
                <div className="flex items-center gap-2">
                   <span className="font-semibold text-white">Weight:</span>
                   <span>{product.weight}</span>
                </div>
              )}
              {product.unitPrice && (
                <div className="flex items-center gap-2">
                   <span className="font-semibold text-white">Unit Price:</span>
                   <span>AZN {product.unitPrice}/kg</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#1a1a1a] border-t border-[#2b2b2b] flex items-center gap-4 sticky bottom-0">
          <div className="flex items-center bg-[#2b2b2b] rounded-xl p-1">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 flex items-center justify-center text-white hover:bg-[#3f3f3f] rounded-lg transition-colors disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <Minus size={20} />
            </button>
            <span className="w-12 text-center font-bold text-lg text-white">
              {quantity}
            </span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 flex items-center justify-center text-white hover:bg-[#3f3f3f] rounded-lg transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>

          <button className="flex-1 bg-[#009de0] hover:bg-[#0088c2] text-white h-14 rounded-xl font-bold text-lg flex items-center justify-between px-6 transition-colors shadow-lg shadow-[#009de0]/20">
            <span>Add to order</span>
            <span>AZN {(product.price * quantity).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
