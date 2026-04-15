"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@/providers/TanstackQueryProvider";
import api from "@/services/api";
import ImageCard from "@/components/common/ImageCard";
import ApiLoading from "@/components/common/ApiLoading";
import { useIntlayer } from "react-intlayer";

export default function CategorySection() {
  const discovery = useIntlayer("discovery");
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const activeCategory = searchParams.get("category");

  const handleCategoryClick = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeCategory === categoryName) {
      params.delete("category");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    } else {
      params.set("category", categoryName);
      router.push(`${pathname}?${params.toString()}#discovery-results`, { scroll: true });
    }
  };

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.getData("/categories"),
  });

  const firstRow = categories.slice(0, 10);
  const secondRow = categories.slice(10);

  const getBgColor = (index: number) => {
    const colors = [
      "bg-[#2b2100]", "bg-[#0b1f0b]", "bg-[#001f3f]", "bg-[#2b0a0a]",
      "bg-[#002b2b]", "bg-[#2b1600]", "bg-[#140b2b]", "bg-[#2b002b]",
      "bg-[#2b2500]", "bg-[#0b2b0b]"
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="w-full bg-background py-8 transition-all duration-300">
      <div className="max-w-[1920px] w-full mx-auto px-[32px] ">
        <div className="flex flex-col">
          <div className="flex items-start gap-4 overflow-x-auto no-scrollbar pb-2">
            {isLoading ? (
              <div className="w-full flex justify-center py-4">
                <ApiLoading text={discovery.ui.loadingCategories as any} />
              </div>
            ) : firstRow.map((category: any, index: number) => (
              <div
                key={category.id || category._id || index}
                onClick={() => handleCategoryClick(category.name)}
                className={`flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer ${
                  activeCategory === category.name ? "opacity-100 scale-105" : "hover:opacity-100"
                }`}
              >
                <div
                  className={`w-[150px] h-[100px] ${getBgColor(index)} rounded-[24px] flex items-center justify-center transition-all duration-300 group-hover:scale-105 overflow-hidden relative ${
                    activeCategory === category.name ? "ring-4 ring-[#009de0] shadow-lg shadow-[#009de0]/50" : ""
                  }`}
                >
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      style={{ width: '80px', height: '80px' }}
                      className="object-contain"
                    />
                  )}
                </div>
                <span className="text-foreground text-[12px] font-semibold text-center leading-tight max-w-[90px] font-poppins">
                  {category.name}
                </span>
              </div>
            ))}

            {categories.length > 10 && (
              <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer"
              >
                <div className="w-[100px] h-[100px] bg-secondary rounded-[24px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <ChevronDown
                    className={`text-[#009de0] transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`}
                    size={32}
                  />
                </div>
                <span className="text-transparent text-[12px] select-none">
                  More
                </span>
              </div>
            )}
          </div>

          <div
            className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isExpanded ? "grid-rows-[1fr] mt-6" : "grid-rows-[0fr] mt-0"}`}
          >
            <div className="overflow-hidden">
              <div
                className={`flex items-start gap-4 transition-all duration-500 ease-in-out ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
              >
                {secondRow.map((category: any, index: number) => (
                  <div
                    key={category.id || category._id || index}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer ${
                      activeCategory === category.name ? "opacity-100 scale-105" : "hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`w-[100px] h-[100px] ${getBgColor(index + 10)} rounded-[24px] flex items-center justify-center transition-all duration-300 group-hover:scale-105 overflow-hidden relative ${
                        activeCategory === category.name ? "ring-4 ring-[#009de0] shadow-lg shadow-[#009de0]/50" : ""
                      }`}
                    >
                      {category.image && (
                        <img
                          src={category.image}
                          alt={category.name}
                          style={{ width: '80px', height: '80px' }}
                          className="object-contain"
                        />
                      )}
                    </div>
                    <span className="text-foreground text-[12px] font-semibold text-center leading-tight max-w-[90px] font-poppins">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-[24px] pt-10">
          <ImageCard imageSrc="https://imageproxy.wolt.com/wolt-frontpage-images/content_editor/banners/images/8dfac258-ba0f-11f0-b900-f6ccb5b10f4b_faf8caa1_6cef_4ff5_8b09_ccf7bbb2804a.png" />
          <ImageCard imageSrc="https://imageproxy.wolt.com/wolt-frontpage-images/content_editor/banners/images/d9bb8f9e-0cd8-11f1-a29c-a252827184db_325c9968_71e9_4bbe_a993_3cd913b4d985.png" />
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
