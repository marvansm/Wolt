"use client";

import { LocateFixed, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollSearch() {
    const [isScrolled, setIsScrolled] = useState(false);

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
                    className="absolute left-1/2 flex items-center bg-[#111111] border border-[#202125] focus-within:border-[#009de0] transition-colors rounded-full px-[1rem] min-w-[400px] h-[48px]"
                >
                    <div className="mr-[12px]">
                        <MapPin color="#b3b3b3" size={20} />
                    </div>
                    <input
                        type="text"
                        name="search"
                        placeholder="Enter delivery address"
                        className="text-[#fff] bg-transparent py-[1rem] pl-0 pr-[1rem] outline-0 border-0 w-full font-poppins text-[14px] placeholder:text-[#b3b3b3]"
                    />
                    <div className="bg-[#001924] hover:bg-[#002636] cursor-pointer w-[32px] h-[32px] min-w-[32px] min-h-[32px] rounded-full flex items-center justify-center transition-colors">
                        <LocateFixed color="#009de0" size={16} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
