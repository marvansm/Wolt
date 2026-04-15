"use client";

import { Store, Restaurant } from "@/types/global";
import { Bike, Smile } from "lucide-react";
import { useIntlayer } from "react-intlayer";

interface SearchProductCardProps {
    product: any;
    store: Store | Restaurant;
    onClick: () => void;
}

export default function SearchProductCard({ product, store, onClick }: SearchProductCardProps) {
    const { common: content } = useIntlayer("features");
    if (!content) return null;
    const storeAny = store as any;

    return (
        <div
            onClick={onClick}
            className="flex items-stretch justify-between cursor-pointer group w-full rounded-2xl hover:bg-white/5 transition-colors p-2 -ml-2 gap-4"
        >
            <div className="flex-1 min-w-0 flex flex-col justify-center py-1">
                <span className="text-[#009de0] font-medium text-[13px] mb-1">
                    AZN {product.price?.toFixed(2) || "0.00"}
                </span>

                <h3 className="text-white font-bold text-[15px] leading-tight mb-1 truncate">
                    {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#a3a3a3] text-[13px] truncate">
                        {store.name}
                    </span>
                    <div className="bg-[#009de0]/20 text-[#009de0] text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center shrink-0">
                        W+
                    </div>
                </div>

                <div className="flex items-center gap-3 text-[#a3a3a3] text-[12px]">
                    <div className="flex items-center gap-1">
                        <Bike size={14} />
                        <span className="text-[#009de0]">AZN {storeAny.deliveryFee === "0.00" || !storeAny.deliveryFee ? "0.00" : storeAny.deliveryFee}</span>
                    </div>
                    <span>•</span>
                    <span>{storeAny.deliveryTime || "25-35"} {content.min}</span>
                    {storeAny.rating && (
                        <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <Smile size={14} />
                                <span>{storeAny.rating}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="relative w-[120px] shrink-0 h-[80px] bg-[#fbc511] rounded-xl overflow-hidden flex items-center justify-center">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="text-black/20 font-bold text-center leading-tight">{content.noImage}</div>
                )}
            </div>
        </div>
    );
}
