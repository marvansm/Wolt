"use client";

import React, { useState, useEffect } from 'react';
import { StoreBannerProps } from "@/types/global";
import { Star, Clock, Info, Search, Heart, Share, Users } from "lucide-react";
import { useIntlayer } from "react-intlayer";

export default function StoreBanner({ restaurant }: StoreBannerProps) {
  const { store } = useIntlayer("store");
  if (!store) return null;
  const getInitialAvatar = (avatar?: string) => {
    if (!avatar) return null;
    if (avatar.startsWith('http')) return avatar;
    if (avatar.startsWith('assets/')) {
       const id = avatar.split('/').pop();
       return `https://imageproxy.wolt.com/wolt-menu-images-venue-avatar/${id}`;
    }
    return avatar;
  };

  const [avatarSrc, setAvatarSrc] = useState<string | null>(getInitialAvatar(restaurant.avatar));
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setAvatarSrc(getInitialAvatar(restaurant.avatar));
    setRetryCount(0);
  }, [restaurant]);

  const handleAvatarError = () => {
    if (retryCount === 0 && restaurant.avatar?.startsWith('assets/')) {
      const id = restaurant.avatar.split('/').pop();
      setAvatarSrc(`https://imageproxy.wolt.com/venue-images/${id}`);
      setRetryCount(1);
    } else if (retryCount <= 1 && restaurant.image) {
      setAvatarSrc(restaurant.image);
      setRetryCount(2);
    } else {
      setAvatarSrc(null);
    }
  };

  return (
    <div className="relative bg-background transition-colors duration-300">
      <div 
        className="w-full h-[320px] bg-cover bg-center bg-muted relative overflow-hidden"
        style={{ 
          backgroundImage: restaurant.banner || restaurant.image ? `url(${restaurant.banner || restaurant.image})` : 'none',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>

      <div className="max-w-[1920px] w-full mx-auto px-[32px] sm:px-6 lg:px-8 -mt-20 relative z-10 flex items-end gap-6 mb-4">
        <div className="w-[124px] h-[124px] rounded-xl bg-card shadow-xl flex items-center justify-center overflow-hidden border-4 border-background shrink-0 relative transition-colors">
           {avatarSrc ? (
               <img 
                 src={avatarSrc} 
                 alt={restaurant.name} 
                 className="w-full h-full object-cover" 
                 onError={handleAvatarError}
               />
           ) : (
               <div className="w-full h-full flex items-center justify-center bg-muted text-foreground font-bold text-4xl uppercase">
                 {restaurant.name?.charAt(0) || "W"}
               </div>
           )}
        </div>

        <div className="flex-grow flex flex-col justify-end h-full pb-2">
          <h1 className="text-4xl md:text-[44px] tracking-tight font-extrabold text-foreground leading-none mb-1">{restaurant.name}</h1>
          <p className="text-muted-foreground font-medium text-base mt-2">{restaurant.description || "I'm lovin' it!"}</p>
        </div>
      </div>
      
      <div className="bg-background border-y border-border/10 py-3 transition-colors">
        <div className="max-w-[1920px] w-full mx-auto px-[32px] sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
            <div className="flex bg-muted/50 p-1 rounded-full border border-border/10 shrink-0">
              <button className="flex items-center gap-2 px-4 py-1.5 bg-secondary text-foreground rounded-full text-sm font-semibold transition-all shadow-sm">
                <Clock size={16} className="text-[#009de0]" />
                {store.banner.delivery as any} 35–45 {store.banner.min as any}
              </button>
              <button className="flex items-center gap-2 px-4 py-1.5 text-muted-foreground text-sm font-semibold hover:text-foreground transition-all">
                <Users size={16} />
                {store.banner.pickup as any}
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium whitespace-nowrap">
              <div className="flex items-center gap-1.5 text-yellow-500">
                <Star size={16} fill="currentColor" className="text-yellow-500" />
                <span className="text-foreground">{restaurant.rating || "8.6"}</span>
              </div>
              <span className="text-muted-foreground/30 font-bold">·</span>
              <span className="text-foreground">{store.banner.openUntil as any} 03:00</span>
              <span className="text-muted-foreground/30 font-bold">·</span>
              <span className="text-foreground">{store.banner.minOrder as any} AZN {restaurant.minOrderAmount?.toFixed(2) || "6.00"}</span>
              <span className="text-muted-foreground/30 font-bold">·</span>
              <span className="text-[#009de0] font-semibold">{restaurant.deliveryFee || "AZN 0.49"}</span>
              <span className="text-muted-foreground/30 font-bold">·</span>
              <button className="text-[#009de0] font-semibold hover:underline">{store.banner.restaurantDetails as any}</button>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#009de0]/10 text-[#009de0] rounded-full text-sm font-semibold hover:brightness-110 transition-all border border-[#009de0]/20">
              <Clock size={18} />
              {store.banner.scheduleOrder as any}
              <span className="ml-1 opacity-60">▼</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#009de0]/10 text-[#009de0] rounded-full text-sm font-semibold hover:brightness-110 transition-all border border-[#009de0]/20">
              <Users size={18} />
              {store.banner.orderTogether as any}
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-[#009de0]/10 text-[#009de0] rounded-full hover:brightness-110 transition-all border border-[#009de0]/20">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
