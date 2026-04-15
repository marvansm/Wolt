"use client";

import { ChevronDown, MapPin, Menu, X } from "lucide-react";
import Image from "next/image";
import HeaderWrapper from "./HeaderWrapper";
import ScrollSearch from "../features/ScrollSearch";
import PartnersDropdown from "../features/PartnersDropdown";
import { useState } from "react";
import LocationModal from "../features/LocationModal";
import SearchModal from "../features/SearchModal";
import AuthModal from "../features/AuthModal";
import UserDropdown from "../features/UserDropdown";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingBag, Sun, Moon } from "lucide-react";
import { useIntlayer } from "react-intlayer";

export default function Header() {
  const router = useRouter();
  const { header } = useIntlayer("layout");
  if (!header) return null;
  const { setIsCartOpen, itemCount, totalAmount, setCartViewMode, currentAddress } = useCart();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const { isLoggedIn, user } = useAuth();

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const displayLocation = currentAddress?.details || (user?.id ? header.addAddress : header.defaultLocation);

  return (
    <HeaderWrapper>
      <nav className="flex items-center justify-between relative">
        <div className="flex items-center gap-[15px]">
          <Link href={"/"}>
            <Image src={"/logo.png"} alt="logo" width={120} height={68} className="logo-theme transition-all duration-300 min-w-[80px]" />
          </Link>
          <div className="hidden sm:flex items-center gap-4 cursor-pointer">
            <div className="bg-[#e6f5fc] dark:bg-[#001924] w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center transition-colors">
              <MapPin color="#009de0" size={20} />
            </div>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="font-poppins font-medium h-[40px] min-h-[40px] py-[1.6px] text-[#009de0] text-[14px] cursor-pointer flex items-center gap-4"
            >
              {displayLocation} <ChevronDown size={15} strokeWidth={3} />
            </button>
          </div>
        </div>

        <ScrollSearch 
          onLocationClick={() => setIsLocationModalOpen(true)} 
          onSearchClick={() => setIsSearchModalOpen(true)}
        />

        <div className="flex items-center gap-4">
          <ul className="hidden lg:flex items-center font-poppins gap-[24px]">
            <li>
              <PartnersDropdown />
            </li>
            <li className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white flex items-center gap-[8px] font-medium cursor-pointer transition-colors duration-300">
              {header.jobs}
            </li>

            {isLoggedIn ? (
              <li>
                <UserDropdown />
              </li>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => openAuthModal("login")}
                    className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white flex items-center gap-[8px] font-medium cursor-pointer transition-colors duration-300"
                  >
                    {header.login}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="font-medium font-poppins text-[16px] leading-[24px] text-[#009de0] bg-secondary hover:brightness-110 min-h-[46px] px-[16px] rounded-[8px] cursor-pointer transition-colors"
                  >
                    {header.signup}
                  </button>
                </li>
              </>
            )}
            {itemCount > 0 && (
              <li>
                <button 
                  onClick={() => {
                    setCartViewMode('order');
                    setIsCartOpen(true);
                  }}
                  className="flex items-center gap-3 bg-[#009de0] hover:bg-[#0088c2] transition-colors h-[40px] px-4 rounded-full text-white font-bold text-sm shadow-lg shadow-[#009de0]/20"
                >
                  <div className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center text-[12px]">
                    {itemCount}
                  </div>
                  <span>{header.viewOrder}</span>
                  <span className="ml-auto">AZN {totalAmount.toFixed(2)}</span>
                </button>
              </li>
            )}
            <li>
              <div 
                onClick={() => {
                  setCartViewMode('basket');
                  setIsCartOpen(true);
                }}
                className="w-[40px] h-[40px] bg-[#e6f5fc] hover:bg-[#ccebf8] dark:bg-[#001924] dark:hover:bg-[#002636] transition-colors duration-300 rounded-full flex items-center justify-center cursor-pointer relative"
              >
                <ShoppingBag size={20} className="text-[#009de0]" />
                {itemCount === 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#009de0] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#141414]">
                    0
                  </span>
                )}
              </div>
            </li>
          </ul>
          
          <button 
            className="lg:hidden p-2 text-gray-800 dark:text-gray-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

     
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-[#111111] p-6 flex flex-col gap-6 shadow-md border-t border-gray-100 dark:border-gray-800 z-50">
          <div className="flex sm:hidden items-center gap-4 cursor-pointer pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="bg-[#e6f5fc] dark:bg-[#001924] w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center transition-colors">
              <MapPin color="#009de0" size={20} />
            </div>
            <button
              onClick={() => {
                setIsLocationModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="font-poppins font-medium text-[#009de0] text-[16px] cursor-pointer flex items-center gap-4"
            >
              {displayLocation} <ChevronDown size={15} strokeWidth={3} />
            </button>
          </div>
          
          <div>
            <PartnersDropdown />
          </div>
          
          <div className="text-gray-800 dark:text-gray-200 font-medium font-poppins text-[16px]">
            {header.jobs}
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            {isLoggedIn ? (
              <UserDropdown />
            ) : (
              <>
                <button
                  onClick={() => {
                    openAuthModal("login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-800 dark:text-gray-200 font-medium text-[16px]"
                >
                  {header.login}
                </button>
                <button
                  onClick={() => {
                    openAuthModal("signup");
                    setIsMobileMenuOpen(false);
                  }}
                  className="font-medium text-[16px] text-center text-[#009de0] bg-secondary min-h-[46px] px-[16px] rounded-[8px]"
                >
                  {header.signup}
                </button>
              </>
            )}
            
            <div className="flex items-center gap-4 mt-2">
              <div 
                onClick={() => {
                  setCartViewMode('basket');
                  setIsCartOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-[40px] h-[40px] bg-[#e6f5fc] dark:bg-[#001924] rounded-full flex items-center justify-center cursor-pointer relative"
              >
                <ShoppingBag size={20} className="text-[#009de0]" />
                {itemCount === 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#009de0] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#141414]">
                    0
                  </span>
                )}
              </div>
              
              {itemCount > 0 && (
                <button 
                  onClick={() => {
                    setCartViewMode('order');
                    setIsCartOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex flex-1 items-center justify-between bg-[#009de0] h-[40px] px-4 rounded-full text-white font-bold text-sm"
                >
                  <div className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center text-[12px]">
                    {itemCount}
                  </div>
                  <span>{header.viewOrder}</span>
                  <span>AZN {totalAmount.toFixed(2)}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={() => {}}
      />

      <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
      />
    </HeaderWrapper>
  );
}
