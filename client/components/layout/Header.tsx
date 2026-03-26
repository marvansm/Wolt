"use client";

import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";
import HeaderWrapper from "./HeaderWrapper";
import ScrollSearch from "../features/ScrollSearch";
import PartnersDropdown from "../features/PartnersDropdown";
import { useState } from "react";
import LocationModal from "../features/LocationModal";
import AuthModal from "../features/AuthModal";
import UserDropdown from "../features/UserDropdown";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const { setIsCartOpen, itemCount, totalAmount, setCartViewMode } = useCart();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [currentLocation, setCurrentLocation] = useState("Baku");
  const { isLoggedIn } = useAuth();

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLocationSelect = (loc: string) => {
    setCurrentLocation(loc);
    router.push("/discovery");
  };

  return (
    <HeaderWrapper>
      <nav className="flex items-center justify-between relative">
        <div className="flex items-center gap-[15px]">
          <Link href={"/"}>
            <Image src={"/logo.png"} alt="logo" width={120} height={68} />
          </Link>
          <div className="flex items-center gap-4 cursor-pointer">
            <div className="bg-[#001924] w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center">
              <MapPin color="#009de0" size={20} />
            </div>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="font-poppins font-medium h-[40px] min-h-[40px] py-[1.6px] text-[#009de0] text-[14px] cursor-pointer flex items-center gap-4"
            >
              {currentLocation} <ChevronDown size={15} strokeWidth={3} />
            </button>
          </div>
        </div>

        <ScrollSearch />

        <div>
          <ul className="flex items-center font-poppins gap-[24px]">
            <PartnersDropdown />
            <li className="text-[#fff] hover:text-[#ffffffeb] flex items-center gap-[8px] font-medium cursor-pointer">
              Jobs
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
                    className="text-[#fff] hover:text-[#ffffffeb] flex items-center gap-[8px] font-medium cursor-pointer"
                  >
                    Log in
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="font-medium font-poppins text-[16px] leading-[24px] text-[#009de0] bg-[#001924] hover:bg-[#002636] min-h-[46px] px-[16px] rounded-[8px] cursor-pointer transition-colors"
                  >
                    Sign up
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
                  <span>View order</span>
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
                className="w-[40px] h-[40px] bg-[#001924] hover:bg-[#002636] transition-colors rounded-full flex items-center justify-center cursor-pointer relative"
              >
                <ShoppingBag size={20} className="text-white" />
                {itemCount === 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#009de0] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#141414]">
                    0
                  </span>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={handleLocationSelect}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
      />
    </HeaderWrapper>
  );
}
