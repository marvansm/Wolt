"use client";

import SliderCards from "@/components/common/SliderCards";
import Link from "next/link";
import { Restaurant } from "@/types/global";
import ApiLoading from "@/components/common/ApiLoading";

import { useIntlayer } from "react-intlayer";

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
    const discovery = useIntlayer("discovery");

    if (!isLoading && restaurants.length === 0) return null;

    return (
        <section className="w-full bg-background py-8">
            <div className="max-w-[1920px] w-full mx-auto px-[32px]">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-foreground text-[24px] font-bold">
                        {title}
                    </h2>
                    <div className="flex items-center gap-4">
                        <Link
                            href={seeAllLink}
                            className="text-[#009de0] text-[14px] font-bold hover:bg-[#009de010] px-3 py-2 rounded-lg transition-colors"
                        >
                            {discovery.ui.seeAll as any}
                        </Link>
                        <div className="flex gap-2 w-[88px]" />
                    </div>
                </div>

                {isLoading ? (
                    <ApiLoading text={`${discovery.ui.loading as any} ${title.toLowerCase()}...`} />
                ) : (
                    <SliderCards restaurants={restaurants} />
                )}
            </div>
        </section>
    );
}
