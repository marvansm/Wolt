"use client";

import Link from "next/link";
import { Store } from "@/types/global";
import { cn } from "@/lib/utils";

interface StoreCardProps {
    store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
    return (
        <Link 
            href={`/store/${store._id}`}
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
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                            Sponsored
                        </span>
                    </div>
                )}
            </div>
            
            <div className="bg-[#1a1a1a] p-4 group-hover:bg-[#222222] transition-colors">
                <h3 className="text-white text-[14px] font-bold truncate">
                    {store.name}
                </h3>
                {store.isSponsored && (
                   <div className="h-[14px]" /> 
                )}
            </div>
        </Link>
    );
}
