"use client";

import { ChevronDown, ChevronRight, ShoppingBag, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex items-center gap-3">
            <div className="relative" ref={dropdownRef}>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors py-[4px] px-[4px] pr-[12px] rounded-full cursor-pointer h-[40px]"
                >
                    <div className="bg-[#f0e3c8] text-[#556b2f] w-[32px] h-[32px] rounded-full flex items-center justify-center font-medium text-[14px]">
                        MM
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-white"
                    >
                        <ChevronDown size={16} strokeWidth={2} />
                    </motion.div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-[calc(100%+8px)] right-0 w-[300px] bg-[#202125] rounded-[16px] py-[8px] flex flex-col shadow-xl z-50 border border-[#ffffff14]"
                        >
                            <Link
                                href="/profile"
                                className="px-[16px] py-[12px] hover:bg-[#ffffff14] transition-colors flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#f0e3c8] text-[#556b2f] w-[40px] h-[40px] rounded-full flex items-center justify-center font-medium text-[16px]">
                                        MM
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[16px] font-medium text-white leading-tight">Mervan Memmedli</span>
                                        <span className="text-[14px] text-gray-400 mt-[2px]">Profile</span>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </Link>

                            <div className="h-[1px] bg-[#ffffff14] my-[8px] w-full" />

                            <Link
                                href="/wolt-plus"
                                className="px-[16px] py-[12px] hover:bg-[#ffffff14] transition-colors flex items-center"
                            >
                                <span className="text-[15px] font-medium text-[#009de0]">Wolt+</span>
                            </Link>

                            <Link
                                href="/wolt-plus/status"
                                className="px-[16px] py-[12px] hover:bg-[#ffffff14] transition-colors flex items-center justify-between"
                            >
                                <div className="flex flex-col">
                                    <span className="text-[15px] font-medium text-white leading-tight">Wolt+</span>
                                    <span className="text-[13px] text-gray-400 mt-[2px]">Expired Mar 7, 2026</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[16px]">🇦🇿</span>
                                </div>
                            </Link>

                            <Link
                                href="/redeem"
                                className="px-[16px] py-[12px] hover:bg-[#ffffff14] transition-colors flex items-center justify-between"
                            >
                                <span className="text-[15px] font-medium text-white">Redeem Wolt+ code</span>
                                <ChevronRight size={16} className="text-gray-400" />
                            </Link>

                            <div className="h-[1px] bg-[#ffffff14] my-[8px] w-full" />

                            <Link
                                href="/language"
                                className="px-[16px] py-[12px] hover:bg-[#ffffff14] transition-colors flex items-center justify-between"
                            >
                                <div className="flex flex-col">
                                    <span className="text-[15px] font-medium text-white leading-tight">Language</span>
                                    <span className="text-[13px] text-gray-400 mt-[2px]">English</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </Link>

                            <div className="h-[1px] bg-[#ffffff14] my-[8px] w-full" />

                            <Link
                                href="/support"
                                className="px-[16px] py-[12px] hover:bg-[#ffffff14] transition-colors flex items-center"
                            >
                                <span className="text-[15px] font-medium text-white">Contact Support</span>
                            </Link>

                            <button
                                onClick={() => {
                                    logout();
                                    setIsOpen(false);
                                    router.push("/");
                                }}
                                className="w-full text-left px-[16px] py-[12px] hover:bg-[#ffffff14] transition-colors flex items-center"
                            >
                                <LogOut size={16} className="mr-[12px] text-[#8e8e93]" />
                                <span className="text-[15px] font-medium text-white">Log out</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="w-[40px] h-[40px] bg-white/10 hover:bg-white/20 transition-colors rounded-full flex items-center justify-center cursor-pointer">
                <ShoppingBag size={20} className="text-white" />
            </div>
        </div>
    );
}
