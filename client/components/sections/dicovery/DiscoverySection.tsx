"use client";

import SliderCards from "@/components/common/SliderCards";
import Link from "next/link";
import { Restaurant } from "@/types/global";

interface DiscoverySectionProps {
    title: string;
    restaurants: Restaurant[];
    isLoading: boolean;
    seeAllLink?: string;
}

export default function DiscoverySection({
    title,
    restaurants,
    isLoading,
    seeAllLink = "#",
}: DiscoverySectionProps) {
    if (!isLoading && restaurants.length === 0) return null;

    return (
        <section className="w-full bg-black py-8">
            <div className="max-w-[1920px] w-full mx-auto px-[32px]">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white text-[24px] font-bold">
                        {title}
                    </h2>
                    <div className="flex items-center gap-4">
                        <Link
                            href={seeAllLink}
                            className="text-[#009de0] text-[14px] font-bold hover:bg-[#009de010] px-3 py-2 rounded-lg transition-colors"
                        >
                            See all
                        </Link>
                        <div className="flex gap-2 w-[88px]" />
                    </div>
                </div>

                {isLoading ? (
                    <div className="text-[#a3a3a3] py-8 text-center font-medium">Loading {title.toLowerCase()}...</div>
                ) : (
                    <SliderCards restaurants={restaurants} />
                )}
            </div>
        </section>
    );
}
