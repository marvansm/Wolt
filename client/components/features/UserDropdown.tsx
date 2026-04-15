"use client";

import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useIntlayer } from "react-intlayer";

export default function UserDropdown() {
    const { userDropdown: content } = useIntlayer("features");
    if (!content) return null;
    const { user, logout } = useAuth();
    const { setIsCartOpen, itemCount } = useCart();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
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

    const handleLogout = async () => {
        setIsLoggingOut(true);
        setIsOpen(false);
        // Add a small delay for the animation to feel smooth
        await new Promise(resolve => setTimeout(resolve, 800));
        logout();
        router.push("/");
    };

    const initials = user?.firstName && user?.lastName 
        ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
        : user?.firstName 
            ? user.firstName[0].toUpperCase()
            : "U";

    const fullName = user?.firstName && user?.lastName 
        ? `${user.firstName} ${user.lastName}` 
        : user?.firstName || user?.email || "User";

    return (
        <>
            <AnimatePresence>
                {isLoggingOut && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center"
                    >
                        <motion.div
                            animate={{ 
                                scale: [1, 1.1, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="w-12 h-12 border-4 border-[#009de0] border-t-transparent rounded-full animate-spin" />
                            <p className="text-white font-medium text-lg tracking-wide">{content.loggingOut}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-3">
                <div className="relative" ref={dropdownRef}>
                    <div
                        onClick={() => !isLoggingOut && setIsOpen(!isOpen)}
                        className={`flex items-center gap-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors duration-300 py-[4px] px-[4px] pr-[12px] rounded-full cursor-pointer h-[40px] ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div className="bg-[#f0e3c8] text-[#556b2f] w-[32px] h-[32px] rounded-full flex flex-shrink-0 items-center justify-center font-medium text-[14px] overflow-hidden relative">
                            {user?.avatar ? (
                                <Image src={user.avatar} alt="Profile" fill className="object-cover" />
                            ) : (
                                initials
                            )}
                        </div>
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-gray-800 dark:text-white transition-colors duration-300"
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
                                className="absolute top-[calc(100%+8px)] right-0 w-[300px] bg-white dark:bg-[#202125] rounded-[16px] py-[8px] flex flex-col shadow-xl z-50 border border-gray-100 dark:border-[#ffffff14] transition-colors duration-300"
                            >
                                <Link
                                    href="/profile"
                                    className="px-[16px] py-[12px] hover:bg-gray-100 dark:hover:bg-[#ffffff14] transition-colors flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#f0e3c8] text-[#556b2f] w-[40px] h-[40px] rounded-full flex flex-shrink-0 items-center justify-center font-medium text-[16px] overflow-hidden relative">
                                            {user?.avatar ? (
                                                <Image src={user.avatar} alt="Profile" fill className="object-cover" />
                                            ) : (
                                                initials
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[16px] font-medium text-gray-800 dark:text-white transition-colors duration-300 leading-tight">{fullName}</span>
                                            <span className="text-[14px] text-gray-400 mt-[2px]">{content.profile}</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400" />
                                </Link>

                                <div className="h-[1px] bg-gray-200 dark:bg-[#ffffff14] my-[8px] w-full" />

                                <Link
                                    href="/wolt-plus"
                                    className="px-[16px] py-[12px] hover:bg-gray-100 dark:hover:bg-[#ffffff14] transition-colors flex items-center justify-between"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-[15px] font-medium text-[#009de0] leading-tight">Wolt+</span>
                                        <span className="text-[13px] text-gray-400 mt-[2px]">
                                            {user?.isWoltPlus 
                                                ? `${content.woltPlusActive} ${new Date(user.woltPlusExpiresAt!).toLocaleDateString()}` 
                                                : content.joinWoltPlus}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[16px]">🇦🇿</span>
                                    </div>
                                </Link>

                                <Link
                                    href="/redeem"
                                    className="px-[16px] py-[12px] hover:bg-gray-100 dark:hover:bg-[#ffffff14] transition-colors flex items-center justify-between"
                                >
                                    <span className="text-[15px] font-medium text-gray-800 dark:text-white transition-colors duration-300">{content.redeemCode}</span>
                                    <ChevronRight size={16} className="text-gray-400" />
                                </Link>

                                <div className="h-[1px] bg-gray-200 dark:bg-[#ffffff14] my-[8px] w-full" />

                                <Link
                                    href="/language"
                                    className="px-[16px] py-[12px] hover:bg-gray-100 dark:hover:bg-[#ffffff14] transition-colors flex items-center justify-between"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-[15px] font-medium text-gray-800 dark:text-white transition-colors duration-300 leading-tight">{content.language}</span>
                                        <span className="text-[13px] text-gray-400 mt-[2px]">English</span>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400" />
                                </Link>

                                <div className="h-[1px] bg-gray-200 dark:bg-[#ffffff14] my-[8px] w-full" />

                                <Link
                                    href="/support"
                                    className="px-[16px] py-[12px] hover:bg-gray-100 dark:hover:bg-[#ffffff14] transition-colors flex items-center"
                                >
                                    <span className="text-[15px] font-medium text-gray-800 dark:text-white transition-colors duration-300">{content.contactSupport}</span>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="w-full text-left px-[16px] py-[12px] hover:bg-gray-100 dark:hover:bg-[#ffffff14] transition-colors flex items-center group disabled:opacity-50"
                                >
                                    <LogOut size={16} className="mr-[12px] text-gray-500 group-hover:text-gray-900 dark:text-[#8e8e93] dark:group-hover:text-white transition-colors" />
                                    <span className="text-[15px] font-medium text-gray-800 dark:text-white transition-colors duration-300">{content.logout}</span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </>
    );
}
