"use client";

import { LocateFixed, MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useIntlayer } from "react-intlayer";

export default function ScrollSearch({ 
    onLocationClick,
    onSearchClick
}: { 
    onLocationClick?: () => void;
    onSearchClick?: () => void;
}) {
    const { header } = useIntlayer("layout");
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    
    const isDiscovery = pathname === "/discovery";

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 250) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isScrolled && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: -20, x: "-50%" }}
                    className="absolute left-1/2 flex items-center bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#202125] focus-within:border-[#009de0] dark:focus-within:border-[#009de0] transition-colors duration-300 rounded-full px-[1rem] min-w-[400px] h-[48px] shadow-sm"
                >
                    <div className="mr-[12px]">
                        {isDiscovery ? <Search size={20} className="text-gray-500 dark:text-[#b3b3b3] transition-colors" /> : <MapPin size={20} className="text-gray-500 dark:text-[#b3b3b3] transition-colors" />}
                    </div>
                    <input
                        type="text"
                        name="search"
                        readOnly={true}
                        onClick={isDiscovery ? onSearchClick : onLocationClick}
                        placeholder={isDiscovery ? (header.searchPlaceholder as any) : (header.enterAddress as any)}
                        className="text-gray-900 dark:text-[#fff] bg-transparent py-[1rem] pl-0 pr-[1rem] outline-0 border-0 w-full font-poppins text-[14px] placeholder:text-gray-500 dark:placeholder:text-[#b3b3b3] transition-colors cursor-pointer"
                    />
                    {!isDiscovery && (
                        <div 
                            onClick={onLocationClick}
                            className="bg-[#e6f5fc] hover:bg-[#ccebf8] dark:bg-[#001924] dark:hover:bg-[#002636] cursor-pointer w-[32px] h-[32px] min-w-[32px] min-h-[32px] rounded-full flex items-center justify-center transition-colors duration-300"
                        >
                            <LocateFixed color="#009de0" size={16} />
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
