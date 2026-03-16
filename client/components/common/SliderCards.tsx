"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RestaurantCard from "./RestaurantCard";
import { Restaurant } from "@/types/global";

interface SliderCardsProps {
  restaurants: Restaurant[];
}

export default function SliderCards({ restaurants }: SliderCardsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [restaurants]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/slider w-full">
      <div className="absolute -top-14 right-0 flex gap-2 z-10">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all duration-300 ${canScrollLeft
            ? "bg-[#1f1f1f] text-white hover:bg-[#2b2b2b]"
            : "bg-[#141414] text-[#404040] cursor-not-allowed"
            }`}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all duration-300 ${canScrollRight
            ? "bg-[#1f1f1f] text-white hover:bg-[#2b2b2b]"
            : "bg-[#141414] text-[#404040] cursor-not-allowed"
            }`}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 scroll-smooth"
      >
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id || restaurant.id} restaurant={restaurant} />
        ))}
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
    </div>
  );
}
