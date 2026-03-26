import React, { useState, useEffect } from 'react';
import { StoreBannerProps } from "@/types/global";
import { Star, Clock, Info, Search, Heart, Share, Users } from "lucide-react";


export default function StoreBanner({ restaurant }: StoreBannerProps) {
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
    <div className="relative bg-black">
      <div 
        className="w-full h-[320px] bg-cover bg-center bg-[#1f1f1f] relative overflow-hidden"
        style={{ 
          backgroundImage: restaurant.banner || restaurant.image ? `url(${restaurant.banner || restaurant.image})` : 'none',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent" />
      </div>

      <div className="max-w-[1920px] w-full mx-auto px-[32px] sm:px-6 lg:px-8 -mt-20 relative z-10 flex items-end gap-6 mb-4">
        <div className="w-[124px] h-[124px] rounded-xl bg-[#1f1f1f] shadow-xl flex items-center justify-center overflow-hidden border-4 border-black shrink-0 relative">
           {avatarSrc ? (
               <img 
                 src={avatarSrc} 
                 alt={restaurant.name} 
                 className="w-full h-full object-cover" 
                 onError={handleAvatarError}
               />
           ) : (
               <div className="w-full h-full flex items-center justify-center bg-[#2b2b2b] text-white font-bold text-4xl uppercase">
                 {restaurant.name?.charAt(0) || "W"}
               </div>
           )}
        </div>

        <div className="flex-grow flex flex-col justify-end h-full pb-2">
          <h1 className="text-4xl md:text-[44px] tracking-tight font-extrabold text-white leading-none mb-1">{restaurant.name}</h1>
          <p className="text-white/70 font-medium text-base mt-2">{restaurant.description || "I'm lovin' it!"}</p>
        </div>
      </div>
      
      <div className="bg-black border-y border-[#1f1f1f] py-3">
        <div className="max-w-[1920px] w-full mx-auto px-[32px] sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
            <div className="flex bg-[#141414] p-1 rounded-full border border-[#2b2b2b] shrink-0">
              <button className="flex items-center gap-2 px-4 py-1.5 bg-[#2b2b2b] rounded-full text-white text-sm font-semibold transition-all">
                <Clock size={16} color="blue" />
                Delivery 35–45 min
              </button>
              <button className="flex items-center gap-2 px-4 py-1.5 text-white/50 text-sm font-semibold hover:text-white transition-all">
                <Users size={16} />
                Pickup
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium whitespace-nowrap">
              <div className="flex items-center gap-1.5 text-yellow-300">
                <Star size={16} fill="currentColor" color="white" />
                <span>{restaurant.rating || "8.6"}</span>
              </div>
              <span className="text-white/20 font-bold">·</span>
              <span className="text-white">Open until 03:00</span>
              <span className="text-white/20 font-bold">·</span>
              <span className="text-white">Min. order AZN {restaurant.minOrderAmount?.toFixed(2) || "6.00"}</span>
              <span className="text-white/20 font-bold">·</span>
              <span className="text-blue-400 font-semibold">{restaurant.deliveryFee || "AZN 0.49"}</span>
              <span className="text-white/20 font-bold">·</span>
              <button className="text-blue-400 font-semibold hover:underline">Restaurant details</button>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1a3a4a] text-blue-400 rounded-full text-sm font-semibold hover:brightness-110 transition-all border border-blue-400/20">
              <Clock size={18} />
              Schedule order
              <span className="ml-1 opacity-60">▼</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1a3a4a] text-blue-400 rounded-full text-sm font-semibold hover:brightness-110 transition-all border border-blue-400/20">
              <Users size={18} />
              Order together
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-[#1a3a4a] text-blue-400 rounded-full hover:brightness-110 transition-all border border-blue-400/20">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
