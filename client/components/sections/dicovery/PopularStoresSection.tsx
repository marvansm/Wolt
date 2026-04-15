"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import StoreCard from "@/components/common/StoreCard";
import { Store } from "@/types/global";
import { useIntlayer } from "react-intlayer";

interface PopularStoresSectionProps {
    stores: Store[];
    isLoading: boolean;
}

export default function PopularStoresSection({ stores, isLoading }: PopularStoresSectionProps) {
    const discovery = useIntlayer("discovery");
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
    }, [stores]);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    if (!isLoading && stores.length === 0) return null;

    return (
        <section className="w-full bg-background py-8 transition-colors duration-300">
            <div className="max-w-[1920px] w-full mx-auto px-[32px]">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-foreground text-[24px] font-bold">
                            {discovery.sections.popularStores as any}
                        </h2>
                        <ShoppingCart className="text-foreground" size={24} />
                    </div>
                    
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all duration-300 ${canScrollLeft
                                ? "bg-secondary text-foreground hover:brightness-110"
                                : "bg-muted/50 text-foreground/20 cursor-not-allowed"
                                }`}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all duration-300 ${canScrollRight
                                ? "bg-secondary text-foreground hover:brightness-110"
                                : "bg-muted/50 text-foreground/20 cursor-not-allowed"
                                }`}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-4 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
                >
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, idx) => (
                            <div key={idx} className="min-w-[200px] w-[200px] h-[250px] bg-secondary rounded-2xl animate-pulse" />
                        ))
                    ) : (
                        stores.map((store) => (
                            <StoreCard key={store._id} store={store} />
                        ))
                    )}
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
