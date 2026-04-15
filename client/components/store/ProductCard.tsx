import Image from "next/image";
import { Plus } from "lucide-react";
import { ProductCardProps } from "@/types/global";



export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card rounded-xl overflow-hidden hover:brightness-110 transition-all duration-200 cursor-pointer flex p-3 h-[140px] relative group border border-border/50 shadow-sm"
    >
      <div className="flex-1 flex flex-col justify-between pr-4">
        <div>
          <h4 className="text-foreground font-bold text-sm line-clamp-2 leading-tight mb-1">
            {product.name}
          </h4>
          {product.description && (
            <p className="text-muted-foreground text-xs line-clamp-2 leading-snug mb-2 font-medium">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-blue-500 dark:text-blue-400 font-bold text-sm">AZN {Number(product.price || 0).toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground/60 text-xs line-through">AZN {Number(product.originalPrice).toFixed(2)}</span>
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
          <div className="w-full h-full bg-muted rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 bg-foreground/10 rounded-full" />
          </div>
        )}

        <button className="absolute bottom-2 right-2 w-7 h-7 bg-secondary/80 hover:bg-[#009de0] hover:text-white rounded-lg flex items-center justify-center text-[#009de0] shadow-sm transition-all">
          <Plus size={18} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
