import Image from "next/image";
import { Plus } from "lucide-react";
import { ProductCardProps } from "@/types/global";



export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-[#191919] rounded-xl overflow-hidden hover:bg-[#222222] transition-colors duration-200 cursor-pointer flex p-3 h-[140px] relative group border border-transparent"
    >
      <div className="flex-1 flex flex-col justify-between pr-4">
        <div>
          <h4 className="text-white font-bold text-sm line-clamp-2 leading-tight mb-1">
            {product.name}
          </h4>
          {product.description && (
            <p className="text-white/60 text-xs line-clamp-2 leading-snug mb-2 font-medium">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-blue-400 font-bold text-sm">AZN {product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-white/40 text-xs line-through">AZN {product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>

      <div className="relative w-[110px] h-full shrink-0">
        {product.image ? (
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-110 duration-500"
              sizes="110px"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-[#141414] rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-600/20 rounded-full" />
          </div>
        )}

        <button className="absolute bottom-2 right-2 w-7 h-7 bg-[#1A3340] hover:bg-wolt-blue hover:text-white rounded-lg flex items-center justify-center text-wolt-blue shadow-lg transition-all">
          <Plus size={18} strokeWidth={3} color="blue" />
        </button>
      </div>
    </div>
  );
}
