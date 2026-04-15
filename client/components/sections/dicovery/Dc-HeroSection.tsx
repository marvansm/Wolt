"use client";

import { Compass, Store, Utensils } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useIntlayer } from "react-intlayer";

export default function DiscoveryHeroSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const discovery = useIntlayer("discovery");
  
  const activeTab = searchParams.get("tab") || "Discovery";

  const handleTabClick = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tabId === "Discovery") {
      params.delete("tab");
    } else {
      params.set("tab", tabId);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const tabs = [
    { name: discovery.tabs.discovery, id: "Discovery", icon: <Compass size={20} /> },
    { name: discovery.tabs.restaurants, id: "Restaurants", icon: <Utensils size={20} /> },
    { name: discovery.tabs.stores, id: "Stores", icon: <Store size={20} /> },
  ];

  return (
    <section>
      <div className="flex items-center justify-center py-[24px]">
        <ul className="flex items-center gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id}>
                <button
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    py-[8px] px-[16px] rounded-[80px] text-[14px] leading-[1.4] 
                    font-poppins font-semibold flex items-center gap-2 transition-colors cursor-pointer duration-200
                    ${isActive
                      ? "text-white bg-[#009de0]"
                      : "text-muted-foreground hover:bg-secondary bg-transparent"
                    }
                  `}
                >
                  {tab.icon}
                  {tab.name as any}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
