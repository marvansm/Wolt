"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown, MapPin, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectLocation: (location: string) => void;
}

const BAKU_STREETS = [
    "Nizami Street",
    "Neftchilar Avenue",
    "Istiglaliyyat Street",
    "Rashid Behbudov Street",
    "Uzeyir Hajibeyov Street",
    "Azerbaijan Avenue",
    "Tiblisi Avenue",
    "Heydar Aliyev Avenue",
    "Bulbul Avenue",
    "Zarifa Aliyeva Street",
    "28 May Street",
    "Huseyn Javid Avenue",
];

export default function LocationModal({
    isOpen,
    onClose,
    onSelectLocation,
}: LocationModalProps) {
    const [country, setCountry] = useState("Azerbaijan");
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLocating, setIsLocating] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (search.length > 1) {
            const filtered = BAKU_STREETS.filter((street) =>
                street.toLowerCase().includes(search.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [search]);

    const handleGetCurrentLocation = () => {
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
                        );
                        const data = await response.json();
                        const address = data.address;
                        const street = address.road || address.street || address.suburb || address.city || data.display_name;

                        setSearch(street);
                    } catch (error) {
                        console.error("Error reverse geocoding:", error);
                        setSearch("Current Location (" + position.coords.latitude.toFixed(4) + ", " + position.coords.longitude.toFixed(4) + ")");
                    } finally {
                        setIsLocating(false);
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Could not get your location. Please check permissions.");
                    setIsLocating(false);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
            setIsLocating(false);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="bg-[#1a1a1a] w-full max-w-[500px] rounded-[24px] overflow-hidden shadow-2xl relative flex flex-col"
                    >

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                        >
                            <X className="text-white" size={20} />
                        </button>

                        <div className="p-8 pt-12">
                            <h2 className="text-[32px] font-bold text-white mb-8 tracking-tight">
                                Add new address
                            </h2>

                            <div className="space-y-4">

                                <div className="relative group">
                                    <label className="absolute left-4 top-2 text-[12px] text-gray-400 font-medium">
                                        Country
                                    </label>
                                    <div className="w-full h-16 bg-[#262626] border border-white/10 rounded-xl px-4 pt-6 pb-2 flex items-center justify-between cursor-pointer hover:border-white/30 transition-all">
                                        <span className="text-white text-[16px]">{country}</span>
                                        <ChevronDown className="text-gray-400" size={20} />
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Street name and number"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full h-14 bg-[#262626] border border-white/10 rounded-xl px-4 text-white text-[16px] placeholder:text-gray-500 focus:outline-none focus:border-[#009de0] transition-all pr-12"
                                        />
                                        <button
                                            onClick={handleGetCurrentLocation}
                                            className={cn(
                                                "absolute right-4 top-1/2 -translate-y-1/2 text-[#009de0] hover:scale-110 transition-transform",
                                                isLocating && "animate-pulse"
                                            )}
                                        >
                                            <Target size={20} />
                                        </button>
                                    </div>


                                    {suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#262626] border border-white/10 rounded-xl overflow-hidden shadow-xl z-20">
                                            {suggestions.map((street, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => {
                                                        setSearch(street);
                                                        setSuggestions([]);
                                                    }}
                                                    className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                                                >
                                                    <MapPin size={16} className="text-gray-400" />
                                                    <span>{street}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button
                                    disabled={!search}
                                    onClick={() => {
                                        onSelectLocation(search);
                                        onClose();
                                    }}
                                    className="w-full h-14 bg-[#009de0] hover:bg-[#0088c4] disabled:bg-gray-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all mt-4 text-[16px]"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 bg-[#1a1a1a] p-4 flex justify-center items-center pb-12">
                            <div className="relative w-full max-w-[300px] aspect-[4/3] bg-gradient-to-t from-[#262626]/50 to-transparent rounded-3xl overflow-hidden flex items-center justify-center">
                                <svg viewBox="0 0 400 300" className="w-full h-full">
                                    <rect x="100" y="200" width="60" height="100" fill="#a5d6a7" />
                                    <rect x="160" y="150" width="80" height="150" fill="#81c784" />
                                    <rect x="240" y="220" width="60" height="80" fill="#ffccbc" />
                                    <rect x="100" y="195" width="60" height="5" fill="#4caf50" />
                                    <rect x="160" y="145" width="80" height="5" fill="#388e3c" />
                                    <rect x="240" y="215" width="60" height="5" fill="#ff8a65" />
                                    <rect x="110" y="210" width="10" height="10" fill="white" opacity="0.5" />
                                    <rect x="140" y="210" width="10" height="10" fill="white" opacity="0.5" />
                                    <rect x="175" y="165" width="20" height="20" fill="white" opacity="0.5" />
                                    <rect x="205" y="165" width="20" height="20" fill="white" opacity="0.5" />
                                    <circle cx="150" cy="100" r="15" fill="#009de0" />
                                    <circle cx="250" cy="180" r="15" fill="#009de0" />
                                    <circle cx="320" cy="120" r="15" fill="#009de0" />
                                    <circle cx="150" cy="100" r="5" fill="white" />
                                    <circle cx="250" cy="180" r="5" fill="white" />
                                    <circle cx="320" cy="120" r="5" fill="white" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
