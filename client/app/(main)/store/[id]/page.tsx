"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@/providers/TanstackQueryProvider";
import { Loader2, Search } from "lucide-react";
import api from "@/services/api";
import StoreBanner from "@/components/store/StoreBanner";
import StoreSidebar from "@/components/store/StoreSidebar";
import ProductList from "@/components/store/ProductList";
import ProductModal from "@/components/store/ProductModal";

export default function StorePage() {
  const params = useParams();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", params.id],
    queryFn: () => api.getData(`/restaurants/${params.id}`),
    enabled: !!params.id,
  });

  const categories = useMemo(() => {
    if (!restaurant?.menu) return [];

    const cats: Record<string, any[]> = {};
    const deals: any[] = [];

    restaurant.menu.forEach((item: any) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        deals.push(item);
      }

      const category = item.category || "Products";
      if (!cats[category]) {
        cats[category] = [];
      }
      cats[category].push(item);
    });

    const result = Object.keys(cats).map(key => ({
      name: key,
      products: cats[key]
    }));

    if (deals.length > 0) {
      result.unshift({
        name: "Deals",
        products: deals
      });
    }

    return result;
  }, [restaurant]);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-wolt-blue" />
      </div>
    );
  }

  if (!restaurant) {
    return <div className="text-center py-20 text-xl font-bold text-white">Store not found</div>;
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      <StoreBanner restaurant={restaurant} />

      <div className=" max-w-[1920px] w-full mx-auto px-[32px] sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <StoreSidebar
            categories={categories.map(c => c.name)}
            activeCategory={categories.length > 0 ? categories[0].name.replace(/\s+/g, '-').toLowerCase() : undefined}
          />

          <div className="flex-1 w-full min-w-0">
            <div className="relative mb-8 max-w-2xl">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#737373]">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder={`Search in ${restaurant.name}`}
                className="w-full bg-[#141414] border border-[#2b2b2b] rounded-full py-3.5 pl-12 pr-6 text-white text-base focus:outline-none focus:border-wolt-blue transition-colors placeholder:text-[#737373]"
              />
            </div>

            {categories.map((category) => (
              <ProductList
                key={category.name}
                categoryName={category.name}
                categoryId={category.name.replace(/\s+/g, '-').toLowerCase()}
                products={category.products}
                onProductClick={setSelectedProduct}
              />
            ))}
            {categories.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                No products found for this store.
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
