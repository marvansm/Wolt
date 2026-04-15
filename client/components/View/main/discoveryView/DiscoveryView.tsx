"use client";

import CategorySection from "@/components/sections/dicovery/CategorySection";
import DiscoveryHeroSection from "@/components/sections/dicovery/Dc-HeroSection";
import DiscoverySection from "@/components/sections/dicovery/DiscoverySection";
import PopularStoresSection from "@/components/sections/dicovery/PopularStoresSection";
import { useQuery } from "@/providers/TanstackQueryProvider";
import api from "@/services/api";
import { Restaurant, Store } from "@/types/global";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import PageLoading from "@/components/common/PageLoading";
import { useIntlayer } from "react-intlayer";

export default function DiscoveryView() {
  const discovery = useIntlayer("discovery");
  if (!discovery) return null;
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "Discovery";
  const activeCategory = searchParams.get("category");
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  const { data: restaurants = [], isLoading: restaurantsLoading } = useQuery<Restaurant[]>({
    queryKey: ["restaurants"],
    queryFn: () => api.getData("/restaurants"),
  });

  const { data: stores = [], isLoading: storesLoading } = useQuery<Store[]>({
    queryKey: ["stores"],
    queryFn: () => api.getData("/stores"),
  });

  const filteredRestaurants = useMemo(() => {
    let result = restaurants;

    if (activeCategory) {
      result = result.filter(r => {
        const cat = activeCategory.toLowerCase();
        const rCategory = (r as any).category ? String((r as any).category).toLowerCase() : "";
        return (
          rCategory.includes(cat) ||
          r.tags?.some(t => t.toLowerCase().includes(cat)) ||
          r.name.toLowerCase().includes(cat) ||
          r.description?.toLowerCase().includes(cat)
        );
      });
    }

    if (searchQuery) {
      result = result.filter(r => 
        r.name.toLowerCase().includes(searchQuery) ||
        r.tags?.some(t => t.toLowerCase().includes(searchQuery)) ||
        r.description?.toLowerCase().includes(searchQuery)
      );
    }

    return result;
  }, [restaurants, activeCategory, searchQuery]);

  const filteredStores = useMemo(() => {
    let result = stores;

    if (activeCategory) {
      result = result.filter(s => {
        const cat = activeCategory.toLowerCase();
        const sAny = s as any;
        const sCategory = sAny.category ? String(sAny.category).toLowerCase() : "";
        return (
          sCategory.includes(cat) ||
          sAny.tags?.some((t: string) => t.toLowerCase().includes(cat)) ||
          s.name.toLowerCase().includes(cat) ||
          sAny.description?.toLowerCase().includes(cat)
        );
      });
    }

    if (searchQuery) {
      const sq = searchQuery.toLowerCase();
      result = result.filter(s => {
        const sAny = s as any;
        return s.name.toLowerCase().includes(sq) ||
        sAny.tags?.some((t: string) => t.toLowerCase().includes(sq)) ||
        sAny.description?.toLowerCase().includes(sq)
      });
    }

    return result;
  }, [stores, activeCategory, searchQuery]);

  const sections = useMemo(() => {
    if (restaurantsLoading || !filteredRestaurants.length) return [];

    const orderAgain = filteredRestaurants.slice(0, 4);

    const ramadanOffers = filteredRestaurants.filter(
      (r) =>
        r.promo?.toLowerCase().includes("ramadan") ||
        r.tags?.some((t) => t.toLowerCase().includes("ramadan")) ||
        r.promo,
    );

    const featured = filteredRestaurants.filter(
      (r) =>
        r.tags?.some((t) => t.toLowerCase() === "featured") || r.rating >= 9.2,
    );

    const burgers = filteredRestaurants.filter(
      (r) =>
        r.tags?.some((t) => t.toLowerCase().includes("burger")) ||
        r.name.toLowerCase().includes("burger"),
    );

    const friedChicken = filteredRestaurants.filter(
      (r) =>
        r.tags?.some((t) => t.toLowerCase().includes("chicken")) ||
        r.name.toLowerCase().includes("chicken"),
    );
    const fastestDelivery = [...filteredRestaurants].sort((a, b) => {
      const timeA = parseInt(a.deliveryTime.split("-")[0]);
      const timeB = parseInt(b.deliveryTime.split("-")[0]);
      return timeA - timeB;
    });

    return [
      { title: discovery.sections.orderAgain, items: orderAgain, link: "/discovery/orders" },
      {
        title: discovery.sections.ramadan,
        items: ramadanOffers,
        link: "/discovery/ramadan",
      },
      {
        title: discovery.sections.featured,
        items: featured,
        link: "/discovery/featured",
      },
      { title: discovery.sections.burgers, items: burgers, link: "/discovery/burgers" },
      {
        title: discovery.sections.chicken,
        items: friedChicken,
        link: "/discovery/chicken",
      },
      {
        title: discovery.sections.fastest,
        items: fastestDelivery,
        link: "/discovery/fastest",
      },
    ].filter(s => s.items.length > 0);
  }, [filteredRestaurants, restaurantsLoading, discovery]);

  const isLoading = restaurantsLoading || storesLoading;

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <DiscoveryHeroSection />
      <CategorySection />

      <div id="discovery-results" className="scroll-mt-24">
        {(activeTab === "Discovery" || activeTab === "Stores") && (
          <PopularStoresSection stores={filteredStores} isLoading={storesLoading} />
        )}

        {(activeTab === "Discovery" || activeTab === "Restaurants") && (
          activeCategory ? (
            <div>
              {filteredRestaurants.length > 0 ? (
                <DiscoverySection
                  title={`${activeCategory} ${discovery.ui.restaurantsSuffix}`}
                  restaurants={filteredRestaurants}
                  isLoading={false}
                />
              ) : (
                <div className="py-12 text-center text-lg text-gray-400 font-semibold font-poppins">
                  {discovery.ui.noRestaurants} {activeCategory}
                </div>
              )}
            </div>
          ) : (
            sections.map((section: any, idx: number) => (
              <DiscoverySection
                key={idx}
                title={section.title}
                restaurants={section.items}
                isLoading={false}
                seeAllLink={section.link}
              />
            ))
          )
        )}
      </div>
    </>
  );
}
