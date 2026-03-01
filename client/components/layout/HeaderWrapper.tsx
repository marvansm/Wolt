"use client";

import { useEffect, useState, ReactNode } from "react";

export default function HeaderWrapper({ children }: { children: ReactNode }) {
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
        <header className={`max-w-[1920px] w-full mx-auto px-[32px] py-4 sticky top-0 z-[1000] transition-all duration-300 ${isScrolled ? 'bg-[#242424]' : 'bg-[#000]'}`}>
            {children}
        </header>
    );
}
