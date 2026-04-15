"use client";

import { useQuery } from "@/providers/TanstackQueryProvider";
import api from "@/services/api";
import { Restaurant, Store } from "@/types/global";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState, useRef } from "react";
import StoreCard from "@/components/common/StoreCard";
import SearchProductCard from "./SearchProductCard";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useIntlayer } from "react-intlayer";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const content = useIntlayer("features");
    if (!content) return null;
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Debounce query to avoid spamming the backend
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => clearTimeout(handler);
    }, [query]);

    const { data: restaurants = [], isLoading: isRestaurantsLoading } = useQuery<Restaurant[]>({
        queryKey: ["restaurants", debouncedQuery],
        queryFn: () => debouncedQuery.trim() 
            ? api.getData(`/restaurants/search?q=${debouncedQuery}`) 
            : api.getData("/restaurants"),
        enabled: isOpen,
    });

    const { data: stores = [], isLoading: isStoresLoading } = useQuery<Store[]>({
        queryKey: ["stores", debouncedQuery],
        queryFn: () => debouncedQuery.trim() 
            ? api.getData(`/stores/search?q=${debouncedQuery}`) 
            : api.getData("/stores"),
        enabled: isOpen,
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = "auto";
            setQuery("");
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen]);

    const { matchingStores, matchingProducts } = useMemo(() => {
        if (!debouncedQuery.trim()) return { matchingStores: [], matchingProducts: [] };
        
        const sq = debouncedQuery.toLowerCase();
        const allEntities = [...restaurants, ...stores];
        
        // Results are already filtered by backend, but we might want to prioritize specific matches
        const s = allEntities.filter(entity => {
            const eAny = entity as any;
            return entity.name.toLowerCase().includes(sq) ||
                (eAny.description && eAny.description.toLowerCase().includes(sq));
        }).slice(0, 8); // Top 8 stores

        const p: { product: any; store: any }[] = [];
        for (const entity of allEntities) {
            const menu = (entity as any).menu || [];
            for (const item of menu) {
                if (item.name?.toLowerCase().includes(sq) || item.description?.toLowerCase().includes(sq)) {
                    p.push({ product: item, store: entity });
                }
            }
        }
        
        return { matchingStores: s, matchingProducts: p.slice(0, 12) }; // Top 12 products
    }, [debouncedQuery, restaurants, stores]);

    const handleProductClick = (store: any, product: any) => {
        onClose();
        const slug = store.name.replace(/\s+/g, '-').toLowerCase();
        router.push(`/store/${slug}?product=${product._id || product.id}`);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[3000] bg-[#1a1a1a] flex flex-col items-center overflow-y-auto"
                >
                    {/* Header */}
                    <div className="w-full max-w-[1200px] px-[32px] pt-6 pb-4 flex items-center justify-between sticky top-0 bg-[#1a1a1a] z-10">
                        <div className="w-[120px]">
                            <Image src="/logo.png" alt="Wolt" width={80} height={40} className="object-contain" />
                        </div>
                        
                        <div className="flex-1 max-w-[600px] mx-8">
                            <div className="relative w-full rounded-full border-2 border-[#009de0] bg-[#262626] flex items-center h-[52px] shadow-[0_0_15px_rgba(0,157,224,0.15)]">
                                <div className="pl-4 pr-3 flex items-center justify-center text-white">
                                    <Search size={22} strokeWidth={2.5} />
                                </div>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={content.search.placeholder as any}
                                    className="w-full h-full bg-transparent border-0 outline-none text-white text-[16px] font-poppins placeholder:text-white/40"
                                />
                                {query && (
                                    <button 
                                        onClick={() => setQuery("")}
                                        className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                                    >
                                        <div className="bg-white/10 rounded-full p-1"><X size={16} strokeWidth={3} /></div>
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="w-[120px] flex justify-end">
                            <button
                                onClick={onClose}
                                className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
                            >
                                <X size={24} className="text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full max-w-[1200px] px-[32px] py-8 flex-1">
                        {!query.trim() ? (
                            <div className="text-center text-white/40 py-20 text-lg font-poppins">
                                {content.search.emptyPrompt}
                            </div>
                        ) : (
                            <div className="space-y-12 pb-20">
                                {matchingStores.length > 0 && (
                                    <motion.section
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-[24px] font-bold text-white tracking-tight">{content.search.restaurantsAndStores}</h2>
                                            <button className="text-[#009de0] hover:bg-[#009de0]/10 px-4 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer">
                                                {content.search.seeAll}
                                            </button>
                                        </div>
                                        <motion.div layout className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible transition-colors duration-300">
                                            <AnimatePresence mode="popLayout">
                                                {matchingStores.map((store) => (
                                                    <motion.div 
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        transition={{ duration: 0.2 }}
                                                        key={store._id} 
                                                        onClick={onClose} 
                                                        className="min-w-[280px] sm:min-w-0"
                                                    >
                                                        <StoreCard store={store as any} />
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </motion.div>
                                    </motion.section>
                                )}

                                {matchingProducts.length > 0 && (
                                    <motion.section
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.05 }}
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-[24px] font-bold text-white tracking-tight">{content.search.relatedItems}</h2>
                                            <button className="text-[#009de0] hover:bg-[#009de0]/10 px-4 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer">
                                                {content.search.seeAll}
                                            </button>
                                        </div>
                                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                            <AnimatePresence mode="popLayout">
                                                {matchingProducts.map((match, idx) => (
                                                    <motion.div
                                                        layout
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -10 }}
                                                        transition={{ duration: 0.2 }}
                                                        key={`${match.product._id || idx}-${match.store._id}`}
                                                    >
                                                        <SearchProductCard 
                                                            product={match.product}
                                                            store={match.store}
                                                            onClick={() => handleProductClick(match.store, match.product)}
                                                        />
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </motion.div>
                                    </motion.section>
                                )}

                                {matchingStores.length === 0 && matchingProducts.length === 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="text-center text-white/40 py-20 text-lg font-poppins"
                                    >
                                        {String(content.search.noResults).replace("{query}", query)}
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
