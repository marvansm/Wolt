import { Star, Clock, Info, Search, Heart, Share, Users } from "lucide-react";

interface StoreBannerProps {
  restaurant: {
    name: string;
    description: string;
    image?: string;
    banner?: string;
    avatar?: string;
    deliveryTime: string;
    rating: number;
    priceRange: string;
    deliveryFee: string;
    minOrderAmount?: number;
  }
}

export default function StoreBanner({ restaurant }: StoreBannerProps) {
  return (
    <div className="relative">
      <div 
        className="w-full h-[250px] md:h-[320px] bg-cover bg-center bg-[#1f1f1f]"
        style={{ 
          backgroundImage: restaurant.banner || restaurant.image ? `url(${restaurant.banner || restaurant.image})` : 'none',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-[#00C2E8] shadow-lg flex items-center justify-center overflow-hidden border-4 border-black shrink-0">
           {restaurant.avatar ? (
               <img src={restaurant.avatar} alt={restaurant.name} className="w-full h-full object-cover" />
           ) : (
               <span className="text-white font-bold text-2xl text-center leading-tight">Wolt<br/>Market</span>
           )}
        </div>

        <div className="flex-grow flex flex-col justify-end pb-2">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">{restaurant.name}</h1>
          <p className="text-gray-200 font-medium text-sm md:text-base mt-1 line-clamp-1">{restaurant.description}</p>
        </div>
      </div>
      
      <div className="border-b border-white/10 bg-black pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap hide-scrollbar py-2">
             <div className="flex items-center bg-[#282828] rounded-full p-1 pl-3 pr-4 shadow-sm border border-white/5">
                <Clock size={16} className="text-wolt-blue mr-2" />
                <span className="text-white text-sm font-semibold">{restaurant.deliveryTime}</span>
             </div>
             
             <div className="flex items-center gap-1.5 text-wolt-yellow font-bold text-sm bg-black px-2 py-1 rounded-full border border-white/10">
                <Star size={18} fill="currentColor" />
                <span>{restaurant.rating}</span>
             </div>

             <div className="text-gray-400 text-sm flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                <span className="hidden sm:inline">Min. order AZN {restaurant.minOrderAmount ? restaurant.minOrderAmount.toFixed(2) : "10.00"}</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full mx-1"></span>
                <span>{restaurant.deliveryFee}</span>
             </div>
             
             <div className="text-wolt-blue font-semibold text-sm cursor-pointer hover:text-wolt-blue/80 transition-colors">
                Venue details
             </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
             <div className="bg-[#1A3340] text-wolt-blue flex items-center px-4 py-2 rounded-full cursor-pointer hover:brightness-110 transition-all font-medium text-sm border border-[#00B4D8]/20">
               <Clock size={16} className="mr-2" />
               Schedule order
             </div>
             <div className="bg-[#1A3340] text-wolt-blue flex items-center px-4 py-2 rounded-full cursor-pointer hover:brightness-110 transition-all font-medium text-sm border border-[#00B4D8]/20 hidden sm:flex">
               <Users size={16} className="mr-2" />
               Order together
             </div>
             <div className="w-10 h-10 rounded-full bg-[#1A3340] flex items-center justify-center text-wolt-blue cursor-pointer hover:brightness-110 transition-all border border-[#00B4D8]/20 shrink-0">
               <Heart size={18} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
