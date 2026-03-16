"use client";

import { Compass, Store, Utensils } from "lucide-react";
import { useState } from "react";

export default function DiscoveryHeroSection() {
  const [activeTab, setActiveTab] = useState("Discovery");

  const tabs = [
    { name: "Discovery", icon: <Compass size={20} /> },
    { name: "Restaurants", icon: <Utensils size={20} /> },
    { name: "Stores", icon: <Store size={20} /> },
  ];

  return (
    <section>
      <div className="flex items-center justify-center py-[24px]">
        <ul className="flex items-center gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <li key={tab.name}>
                <button
                  onClick={() => setActiveTab(tab.name)}
                  className={`
                    py-[8px] px-[16px] rounded-[80px] text-[14px] leading-[1.4] 
                    font-poppins font-semibold flex items-center gap-2 transition-colors cursor-pointer duration-200
                    ${isActive
                      ? "text-[#202125] bg-[#009de0]"
                      : "text-gray-400 hover:bg-[#1f1f1f] bg-transparent"
                    }
                  `}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
