"use client";

import { useMemo, useState } from "react";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQuery } from "@/providers/TanstackQueryProvider";
import { Loader2, Search } from "lucide-react";
import api from "@/services/api";
import StoreBanner from "@/components/store/StoreBanner";
import StoreSidebar from "@/components/store/StoreSidebar";
import ProductList from "@/components/store/ProductList";
import ProductModal from "@/components/store/ProductModal";
import { useCart } from "@/context/CartContext";
import PageLoading from "@/components/common/PageLoading";
import ReviewSection from "@/components/store/ReviewSection";
import { useIntlayer } from "react-intlayer";

export default function StorePageView() {
  const store = useIntlayer("store");
  if (!store) return null;
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { orders } = useCart();

  const storeIdentifier = params.id || params.storeName;
  const productIdFromUrl = searchParams.get("product");

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", storeIdentifier],
    queryFn: () => api.getData(`/restaurants/${storeIdentifier}`),
    enabled: !!storeIdentifier,
  });

  const selectedProduct = useMemo(() => {
    if (!productIdFromUrl || !restaurant?.menu) return null;
    return restaurant.menu.find((item: any) => {
      const itemId = String(item._id || item.id);
      return itemId === productIdFromUrl;
    });
  }, [productIdFromUrl, restaurant]);

  const handleProductClick = (product: any) => {
    const params = new URLSearchParams(searchParams.toString());
    const pid = product._id || product.id;
    params.set("product", pid);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeProductModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("product");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const orderedProducts = useMemo(() => {
    const products: any[] = [];
    const seenIds = new Set();
    
    orders.forEach(order => {
      if (order.storeId === (restaurant?._id || restaurant?.id)) {
        order.items.forEach(item => {
          const itemId = item._id || (item as any).id;
          if (!seenIds.has(itemId)) {
            seenIds.add(itemId);
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

      const category = item.category || store.ui.products;
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
        name: store.ui.deals as any,
        products: deals
      });
    }

    return result;
  }, [restaurant, store.ui.products, store.ui.deals]);

  if (isLoading) {
    return <PageLoading />;
  }

  if (!restaurant) {
    return <div className="text-center py-20 text-xl font-bold text-foreground">{store.ui.storeNotFound as any}</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20 transition-colors duration-300">
      <StoreBanner restaurant={restaurant} />

      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/10">
        <div className="max-w-[1920px] w-full mx-auto px-[32px] sm:px-6 lg:px-8 flex items-center justify-between h-[64px]">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-2 mr-4">
            {orderedProducts.length > 0 && (
              <a 
                href="#order-again"
                className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap bg-primary/10 text-primary transition-all"
              >
                {store.ui.recentlyBought as any}
              </a>
            )}
            {categories.map((category, index) => (
              <a 
                key={category.name}
                href={`#${category.name.replace(/\s+/g, '-').toLowerCase()}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                  index === 0 && orderedProducts.length === 0
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.name}
              </a>
            ))}
            <a 
              href="#reviews"
              className="px-4 py-2 rounded-full text-sm font-semibold capitalize whitespace-nowrap transition-all text-muted-foreground hover:text-foreground"
            >
              {store.ui.reviews as any}
            </a>
            {categories.length > 5 && (
              <button className="px-4 py-2 text-muted-foreground text-sm font-semibold whitespace-nowrap hover:text-foreground flex items-center gap-1 transition-colors">
                {store.ui.more as any} ({categories.length - 5}) <span>▼</span>
              </button>
            )}
          </div>

          <div className="relative w-[300px] shrink-0 hidden md:block">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground/40">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder={`${store.ui.searchIn as any} ${restaurant.name}...`}
              className="w-full bg-muted border border-border/10 rounded-full py-2 pl-11 pr-4 text-foreground text-sm focus:outline-none focus:border-[#009de0] transition-colors placeholder:text-muted-foreground/40"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] w-full mx-auto px-[32px] sm:px-6 lg:px-8 mt-12">
        <div className="">
          <div className="w-full">
            {orderedProducts.length > 0 && (
              <ProductList
                categoryName={store.ui.recentlyBought as any}
                categoryId="order-again"
                products={orderedProducts}
                onProductClick={handleProductClick}
              />
            )}

            {categories.map((category) => (
              <ProductList
                key={category.name}
                categoryName={category.name}
                categoryId={category.name.replace(/\s+/g, '-').toLowerCase()}
                products={category.products}
                onProductClick={handleProductClick}
              />
            ))}
            {categories.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                {store.ui.noProducts as any}
              </div>
            )}
            
            <div id="reviews" className="scroll-mt-32">
              <ReviewSection restaurantId={restaurant._id || restaurant.id} />
            </div>
          </div>
        </div>
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct} 
          restaurant={restaurant}
          onClose={closeProductModal}
        />
      )}
    </div>
  );
}
