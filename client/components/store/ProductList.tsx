import { ChevronRight, ArrowLeft } from "lucide-react";
import ProductCard from "./ProductCard";
import { ProductListProps } from "@/types/global";



export default function ProductList({ categoryName, categoryId, products, onProductClick }: ProductListProps) {
  if (!products || products.length === 0) return null;

  return (
    <div id={categoryId} className="mb-12 pt-4 scroll-mt-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground tracking-tight capitalize">{categoryName}</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center text-[#009de0] font-bold hover:brightness-110 transition-colors text-sm px-2 py-1">
            See all
          </button>
          <div className="flex items-center gap-2 ml-2">
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground/40 hover:text-foreground transition-colors border border-border/10 shadow-sm">
              <ChevronRight size={20} className="rotate-180" />
            </button>
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-[#009de0] hover:brightness-110 transition-colors border border-border/10 shadow-sm">
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
