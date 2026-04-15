"use client";

import Link from "next/link";
import { Store } from "@/types/global";
import { cn } from "@/lib/utils";
import { useIntlayer } from "react-intlayer";

interface StoreCardProps {
    store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
    const { common: content } = useIntlayer("features");
    if (!content) return null;
    
    return (
        <Link 
            href={`/store/${store.name.replace(/\s+/g, '-').toLowerCase()}`}
            className="flex flex-col min-w-[200px] w-[200px] h-[250px] rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] cursor-pointer group"
        >
            <div 
                className="relative flex-1 flex items-center justify-center"
                style={{ backgroundColor: store.bgColor || "#f5f5f5" }}
            >
                
                <div className="relative w-full aspect-square text-black">
                    <img 
                        src={store.image} 
                        alt={store.name}
                        className="w-full h-full object-contain"
                    />
                </div>

                {store.isSponsored && (
                    <div className="absolute bottom-2 left-3">
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                            {content.sponsored}
                        </span>
                    </div>
                )}
            </div>
            
            <div className="bg-card p-4 group-hover:brightness-110 transition-all duration-300">
                <h3 className="text-foreground text-[14px] font-bold truncate">
                    {store.name}
                </h3>
                {store.isSponsored && (
                   <div className="h-[14px]" /> 
                )}
            </div>
        </Link>
    );
}
