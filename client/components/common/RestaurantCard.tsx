"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Bike } from "lucide-react";
import { Restaurant } from "@/types/global";

interface RestaurantCardProps {
    restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
    const storeId = restaurant._id || restaurant.id;
    return (
        <Link href={`/store/${storeId}`} className="block">
            <div className="flex flex-col gap-3 min-w-[320px] max-w-[320px] group cursor-pointer">
                <div className="relative w-full h-[180px] rounded-[16px] overflow-hidden bg-[#1f1f1f]">
                <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {restaurant.promo && (
                    <div className="absolute top-3 left-3 bg-[#009de0] text-white text-[11px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                        <span className="text-[14px] leading-none">🏷️</span>
                        {restaurant.promo}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1 px-1">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <h3 className="text-white text-[16px] font-bold leading-tight">
                            {restaurant.name}
                        </h3>
                        <p className="text-[#a3a3a3] text-[13px] line-clamp-1">
                            {restaurant.description}
                        </p>
                    </div>
                    <div className="bg-[#1f1f1f] px-2 py-1 rounded-lg flex flex-col items-center justify-center min-w-[50px]">
                        <span className="text-[#009de0] text-[12px] font-bold leading-tight">
                            {restaurant.deliveryTime}
                        </span>
                        <span className="text-[#737373] text-[10px] uppercase font-bold">
                            min
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                        <Bike className="text-[#009de0]" size={14} />
                        <span className="text-[#009de0] text-[12px] font-bold">
                            AZN {restaurant.deliveryFee}
                        </span>
                    </div>
                    <span className="text-[#737373] text-[12px]">•</span>
                    <span className="text-[#737373] text-[12px] font-medium">
                        {restaurant.priceRange}
                    </span>
                    <span className="text-[#737373] text-[12px]">•</span>
                    <div className="flex items-center gap-1">
                        <Star className="text-white bg-[#1f1f1f] rounded-full p-[2px]" size={14} fill="white" />
                        <span className="text-white text-[12px] font-bold">
                            {Number(restaurant.rating || 0).toFixed(1)}
                        </span>
                    </div>
                </div>
                </div>
            </div>
        </Link>
    );
}
