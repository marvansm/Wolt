"use client";

import CategorySection from "@/components/sections/dicovery/CategorySection";
import DiscoveryHeroSection from "@/components/sections/dicovery/Dc-HeroSection";
import DiscoverySection from "@/components/sections/dicovery/DiscoverySection";
import PopularStoresSection from "@/components/sections/dicovery/PopularStoresSection";
import { useQuery } from "@/providers/TanstackQueryProvider";
import api from "@/services/api";
import { Restaurant, Store } from "@/types/global";
import { useMemo } from "react";

export default function DiscoveryView() {
  const { data: restaurants = [], isLoading: restaurantsLoading } = useQuery<
    Restaurant[]
  >({
    queryKey: ["restaurants"],
    queryFn: () => api.getData("/restaurants"),
  });

  const { data: stores = [], isLoading: storesLoading } = useQuery<Store[]>({
    queryKey: ["stores"],
    queryFn: () => api.getData("/stores"),
  });

  const isLoading = restaurantsLoading || storesLoading;

  const sections = useMemo(() => {
    if (restaurantsLoading || !restaurants.length) return [];

    const orderAgain = restaurants.slice(0, 4);

    const ramadanOffers = restaurants.filter(
      (r) =>
        r.promo?.toLowerCase().includes("ramadan") ||
        r.tags?.some((t) => t.toLowerCase().includes("ramadan")) ||
        r.promo,
    );

    const featured = restaurants.filter(
      (r) =>
        r.tags?.some((t) => t.toLowerCase() === "featured") || r.rating >= 9.2,
    );

    const burgers = restaurants.filter(
      (r) =>
        r.tags?.some((t) => t.toLowerCase().includes("burger")) ||
        r.name.toLowerCase().includes("burger"),
    );

    const friedChicken = restaurants.filter(
      (r) =>
        r.tags?.some((t) => t.toLowerCase().includes("chicken")) ||
        r.name.toLowerCase().includes("chicken"),
    );
    const fastestDelivery = [...restaurants].sort((a, b) => {
      const timeA = parseInt(a.deliveryTime.split("-")[0]);
      const timeB = parseInt(b.deliveryTime.split("-")[0]);
      return timeA - timeB;
    });

    return [
      { title: "Order again", items: orderAgain, link: "/discovery/orders" },
      {
        title: "Discounted offers for Ramadan",
        items: ramadanOffers,
        link: "/discovery/ramadan",
      },
      {
        title: "Featured on Wolt",
        items: featured,
        link: "/discovery/featured",
      },
      { title: "Burgers", items: burgers, link: "/discovery/burgers" },
      {
        title: "Fried chicken",
        items: friedChicken,
        link: "/discovery/chicken",
      },
      {
        title: "Fastest delivery",
        items: fastestDelivery,
        link: "/discovery/fastest",
      },
    ];
  }, [restaurants, restaurantsLoading]);

  return (
    <>
      <DiscoveryHeroSection />
      <CategorySection />

      <PopularStoresSection stores={stores} isLoading={storesLoading} />

      {isLoading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <DiscoverySection
              key={i}
              title="Loading..."
              restaurants={[]}
              isLoading={true}
            />
          ))}
        </div>
      ) : (
        sections.map((section) => (
          <DiscoverySection
            key={section.title}
            title={section.title}
            restaurants={section.items}
            isLoading={false}
            seeAllLink={section.link}
          />
        ))
      )}
    </>
  );
}
