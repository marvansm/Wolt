"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntlayer } from "react-intlayer";

export default function PartnersDropdown() {
  const { partnersDropdown: content } = useIntlayer("features");
  if (!content) return null;
  const [isPartnersOpen, setIsPartnersOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={dropdownRef}
      className="relative text-gray-800 dark:text-[#fff] hover:text-black dark:hover:text-[#ffffffeb] flex items-center gap-[8px] font-medium cursor-pointer transition-colors select-none"
      onClick={() => setIsPartnersOpen((prev) => !prev)}
    >
      {content.title}
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
            className="absolute top-[calc(100%+24px)] left-[-16px] w-[200px] bg-white dark:bg-[#202125] rounded-[8px] py-[8px] flex flex-col shadow-xl z-50 border border-gray-100 dark:border-[#ffffff14] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href="for-couriers"
              onClick={() => setIsPartnersOpen(false)}
              className="px-[16px] py-[12px] text-[14px] font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-[#ffffff14] transition-colors"
            >
              {content.forCouriers}
            </Link>
            <Link
              href="for-merchants"
              onClick={() => setIsPartnersOpen(false)}
              className="px-[16px] py-[12px] text-[14px] font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-[#ffffff14] transition-colors"
            >
              {content.forMerchants}
            </Link>
            <Link
              href="#"
              onClick={() => setIsPartnersOpen(false)}
              className="px-[16px] py-[12px] text-[14px] font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-[#ffffff14] transition-colors"
            >
              {content.forCompanies}
            </Link>
            <Link
              href="#"
              onClick={() => setIsPartnersOpen(false)}
              className="px-[16px] py-[12px] text-[14px] font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-[#ffffff14] transition-colors"
            >
              {content.woltDrive}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
