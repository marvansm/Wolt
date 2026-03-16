import Image from "next/image";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: {
    _id?: string;
    name: string;
    price: number;
    originalPrice?: number;
    description?: string;
    image?: string;
    weight?: string;
    unitPrice?: string;
    badge?: string;
  };
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-[#1f1f1f] rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-200 cursor-pointer flex flex-col h-full relative group shadow-lg border border-white/5"
    >
      <div className="bg-white relative aspect-square w-full flex items-center justify-center p-6 m-0">
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-wolt-red text-white text-[11px] font-extrabold px-2 py-1 rounded-lg shadow-md">
            {product.badge}
          </div>
        )}

        {product.image ? (
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
          </div>
        )}

        <button className="absolute top-3 right-3 w-9 h-9 bg-gray-600 hover:bg-[#2b2b2b] rounded-xl flex items-center justify-center text-wolt-blue shadow-lg border border-white/5 transition-all">
          <Plus size={20} color="white" />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="text-wolt-blue text-red-500 font-bold text-base leading-none">AZN {product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-500 text-xs line-through leading-none">AZN {product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <h4 className="text-white font-bold text-sm line-clamp-2 leading-snug mb-3">
          {product.name}
        </h4>

        <div className="mt-auto flex items-center justify-between text-[11px] font-bold text-[#737373] tracking-tight">
          <span className="uppercase">{product.weight}</span>
          <span>{product.unitPrice && `AZN ${product.unitPrice}/kg`}</span>
        </div>
      </div>
    </div>
  );
}
