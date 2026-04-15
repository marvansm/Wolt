"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown, MapPin, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { useIntlayer } from "react-intlayer";

const MapComponent = dynamic(() => import("./MapComponent"), { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 dark:bg-[#1a1a1a] animate-pulse rounded-2xl" />
});

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectLocation: (location: string) => void;
}

export default function LocationModal({
    isOpen,
    onClose,
    onSelectLocation,
}: LocationModalProps) {
    const content = useIntlayer("features");
    if (!content) return null;
    const { currentAddress, setCurrentAddress } = useCart();
    const { user, isLoggedIn } = useAuth();
    const [country, setCountry] = useState("Azerbaijan");
    const [search, setSearch] = useState(currentAddress?.details || "");
    const [coords, setCoords] = useState<[number, number]>(
        currentAddress?.lat ? [currentAddress.lat, currentAddress.lng] : [40.4093, 49.8671]
    );
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isLocating, setIsLocating] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && !currentAddress) {
            handleGetCurrentLocation();
        }
    }, [isOpen]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (search.length > 2) {
                try {
                    const response = await fetch(
                        `https://photon.komoot.io/api/?q=${encodeURIComponent(search)}&limit=5`
                    );
                    const data = await response.json();
                    const features = data.features || [];

                    const formatted = features.map((f: any) => {
                        const p = f.properties;
                        const parts = [p.name, p.city, p.country].filter(Boolean);
                        return {
                            details: parts.join(", "),
                            lat: f.geometry.coordinates[1],
                            lng: f.geometry.coordinates[0]
                        };
                    });

                    setSuggestions(formatted);
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                }
            } else {
                setSuggestions([]);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
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
                        const street = address.road || address.street || address.suburb;
                        const city = address.city || address.town || address.village || address.state;
                        const detailedAddress = street && city ? `${street}, ${city}` : (street || city || data.display_name);
                        
                        setSearch(detailedAddress);
                        setCoords([latitude, longitude]);
                    } catch (error) {
                        console.error("Error reverse geocoding:", error);
                    } finally {
                        setIsLocating(false);
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert(content.location.alertLocatingFailed as any);
                    setIsLocating(false);
                }
            );
        } else {
            alert(content.location.alertNotSupported as any);
            setIsLocating(false);
        }
    };

    const handleReverseGeocode = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
            );
            const data = await response.json();
            const address = data.address;
            const street = address.road || address.street || address.suburb;
            const city = address.city || address.town || address.village || address.state;
            const detailedAddress = street && city ? `${street}, ${city}` : (street || city || data.display_name);
            setSearch(detailedAddress);
        } catch (e) {
            console.error("Reverse geocode failed", e);
        }
    };

    const handleConfirm = async () => {
        const addressObj = {
            details: search,
            lat: coords[0],
            lng: coords[1]
        };
        
        setCurrentAddress(addressObj);
        
        if (isLoggedIn && user) {
            try {
                await api.PostData('/addresses', {
                    name: "Home",
                    details: search,
                    userId: user.id || (user as any)._id
                });
            } catch (e) {
                console.error("Failed to save address to profile");
            }
        }
        
        onSelectLocation(search);
        onClose();
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
                        className="bg-white dark:bg-[#1a1a1a] w-full max-w-[500px] rounded-[24px] overflow-hidden shadow-2xl relative flex flex-col transition-colors duration-300"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                        >
                            <X className="text-gray-700 dark:text-white" size={20} />
                        </button>

                        <div className="p-8 pt-12">
                            <h2 className="text-[32px] font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
                                {content.location.title as any}
                            </h2>

                            <div className="space-y-4">
                                {/* Country selector */}
                                <div className="relative group">
                                    <label className="absolute left-4 top-2 text-[12px] text-gray-400 font-medium">
                                        {content.location.country as any}
                                    </label>
                                    <div className="w-full h-16 bg-gray-100 dark:bg-[#262626] border border-gray-200 dark:border-white/10 rounded-xl px-4 pt-6 pb-2 flex items-center justify-between cursor-pointer hover:border-gray-300 dark:hover:border-white/30 transition-all">
                                        <span className="text-gray-900 dark:text-white text-[16px]">{country}</span>
                                        <ChevronDown className="text-gray-400" size={20} />
                                    </div>
                                </div>

                                {/* Street search */}
                                <div className="relative group">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder={content.location.streetPlaceholder as any}
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full h-14 bg-gray-100 dark:bg-[#262626] border border-gray-200 dark:border-white/10 rounded-xl px-4 text-gray-900 dark:text-white text-[16px] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-[#009de0] transition-all pr-12"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={handleGetCurrentLocation}
                                            loading={isLocating}
                                            className={cn(
                                                "absolute right-4 top-1/2 -translate-y-1/2 text-[#009de0] hover:scale-110 transition-transform h-10 w-10",
                                                isLocating && "animate-pulse"
                                            )}
                                        >
                                            <Target size={20} />
                                        </Button>
                                    </div>

                                    {/* Autocomplete suggestions */}
                                    {suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#262626] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-xl z-20">
                                            {suggestions.map((suggestion, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => {
                                                        setSearch(suggestion.details);
                                                        setCoords([suggestion.lat, suggestion.lng]);
                                                        setSuggestions([]);
                                                    }}
                                                    className="w-full px-4 py-3 text-left text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors flex items-center gap-3"
                                                >
                                                    <MapPin size={16} className="text-gray-400" />
                                                    <span>{suggestion.details}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Submit button */}
                                <Button
                                    disabled={!search || isLocating}
                                    onClick={handleConfirm}
                                    className="w-full h-14 bg-[#009de0] hover:bg-[#0088c4] disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 disabled:opacity-50 text-white font-bold rounded-xl transition-all mt-4 text-[16px]"
                                >
                                    {content.location.continue as any}
                                </Button>
                            </div>
                        </div>

                        {/* Map illustration section */}
                        <div className="mt-4 px-8 pb-8">
                            <div className="w-full h-[220px] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-inner">
                                <MapComponent 
                                    center={coords}
                                    destinationCoords={coords}
                                    zoom={15}
                                    interactive={true}
                                    onPositionChange={(newCoords: [number, number]) => {
                                        setCoords(newCoords);
                                        handleReverseGeocode(newCoords[0], newCoords[1]);
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
