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
import { useCart } from "@/context/CartContext";

export default function StorePageView() {
  const params = useParams();
  const { orders } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", params.id],
    queryFn: () => api.getData(`/restaurants/${params.id}`),
    enabled: !!params.id,
  });

  const orderedProducts = useMemo(() => {
    const products: any[] = [];
    const seenIds = new Set();
    
    orders.forEach(order => {
      if (order.storeId === (restaurant?._id || restaurant?.id)) {
        order.items.forEach(item => {
          if (!seenIds.has(item._id)) {
            seenIds.add(item._id);
            products.push(item);
          }
        });
      }
    });
    return products;
  }, [orders, restaurant]);

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

      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-[#1f1f1f]">
        <div className="max-w-[1920px] w-full mx-auto px-[32px] sm:px-6 lg:px-8 flex items-center justify-between h-[64px]">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-2 mr-4">
            {orderedProducts.length > 0 && (
              <a 
                href="#order-again"
                className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap bg-[#1A3340] text-wolt-blue transition-all"
              >
                Recently bought items
              </a>
            )}
            {categories.map((category, index) => (
              <a 
                key={category.name}
                href={`#${category.name.replace(/\s+/g, '-').toLowerCase()}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                  index === 0 && orderedProducts.length === 0
                    ? "text-white"
                    : "text-[#a3a3a3] hover:text-white"
                }`}
              >
                {category.name}
              </a>
            ))}
            {categories.length > 5 && (
              <button className="px-4 py-2 text-[#a3a3a3] text-sm font-semibold whitespace-nowrap hover:text-white flex items-center gap-1">
                More ({categories.length - 5}) <span>▼</span>
              </button>
            )}
          </div>

          <div className="relative w-[300px] shrink-0 hidden md:block">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/40">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder={`Search in ${restaurant.name}...`}
              className="w-full bg-[#141414] border border-[#2b2b2b] rounded-full py-2 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-wolt-blue transition-colors placeholder:text-white/40"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] w-full mx-auto px-[32px] sm:px-6 lg:px-8 mt-12">
        <div className="">
          <div className="w-full">
            {orderedProducts.length > 0 && (
              <ProductList
                categoryName="Recently bought items"
                categoryId="order-again"
                products={orderedProducts}
                onProductClick={setSelectedProduct}
              />
            )}

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
          restaurant={restaurant}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
