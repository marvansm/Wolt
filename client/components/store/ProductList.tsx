import { ChevronRight, ArrowLeft } from "lucide-react";
import ProductCard from "./ProductCard";

interface ProductListProps {
  categoryName: string;
  categoryId?: string;
  products: any[];
  onProductClick?: (product: any) => void;
}

export default function ProductList({ categoryName, categoryId, products, onProductClick }: ProductListProps) {
  if (!products || products.length === 0) return null;

  return (
    <div id={categoryId} className="mb-12 pt-4 scroll-mt-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">{categoryName}</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center text-wolt-blue font-bold hover:text-wolt-blue/80 transition-colors text-sm">
            See all
          </button>
          <div className="flex items-center gap-2 ml-2">
            <button className="w-10 h-10 rounded-full bg-[#1f1f1f] flex items-center justify-center text-[#737373] hover:text-white transition-colors border border-white/5">
              <ChevronRight size={20} className="rotate-180" />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#1f1f1f] flex items-center justify-center text-wolt-blue hover:brightness-110 transition-colors border border-white/5">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product, idx) => (
          <ProductCard 
            key={product._id || idx} 
            product={product} 
            onClick={() => onProductClick && onProductClick(product)} 
          />
        ))}
      </div>
    </div>
  );
}
