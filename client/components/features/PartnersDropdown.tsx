"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PartnersDropdown() {
  const [isPartnersOpen, setIsPartnersOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsPartnersOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <li
      ref={dropdownRef}
      className="relative text-[#fff] hover:text-[#ffffffeb] flex items-center gap-[8px] font-medium cursor-pointer"
      onClick={() => setIsPartnersOpen(!isPartnersOpen)}
    >
      Partners
      <motion.div
        animate={{ rotate: isPartnersOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown size={15} strokeWidth={2} />
      </motion.div>
      <AnimatePresence>
        {isPartnersOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-[calc(100%+24px)] left-[-16px] w-[200px] bg-[#202125] rounded-[8px] py-[8px] flex flex-col shadow-xl z-50 border border-[#ffffff14]"
          >
            <Link
              href="for-couriers"
              className="px-[16px] py-[12px] text-[14px] font-medium text-white hover:bg-[#ffffff14] transition-colors"
            >
              For couriers
            </Link>
            <Link
              href="for-merchants"
              className="px-[16px] py-[12px] text-[14px] font-medium text-white hover:bg-[#ffffff14] transition-colors"
            >
              For merchants
            </Link>
            <Link
              href="#"
              className="px-[16px] py-[12px] text-[14px] font-medium text-white hover:bg-[#ffffff14] transition-colors"
            >
              For companies
            </Link>
            <Link
              href="#"
              className="px-[16px] py-[12px] text-[14px] font-medium text-white hover:bg-[#ffffff14] transition-colors"
            >
              Wolt Drive
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
