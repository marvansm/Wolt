"use client";

import { useAuth } from "@/context/AuthContext";
import { MessageSquare, Edit2, Trash2, Heart, ChevronRight, CreditCard, MapPin, History, Gift, Settings, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("Personal info");
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

    const tabs = [
        "Personal info",
        "Payment methods",
        "Addresses",
        "Loyalty cards",
        "Order history",
        "Earn Wolt credits",
        "Redeem code",
        "Settings"
    ];

    const mockOrders = [
        {
            id: 1,
            name: "McDonald's & McCafe Binagadi",
            date: "05/02/2026, 13:04",
            price: "AZN27.96",
            address: "Shovket Memmedova 5, AZ1000, Baku",
            phone: "+994774880120",
            orderNumber: 450,
            orderId: "69845d3af6a9976a063c67ff",
            deliveryTo: "89 Ilgar Jumshudov Street 40",
            deliveredAt: "05/02/2026, 13:36",
            items: [
                { name: "Hamburger", price: 3.10, qty: 2, total: 6.20 },
                {
                    name: "Friends Menyusu",
                    price: 18.55,
                    qty: 1,
                    total: 18.55,
                    options: ["Oyuncaq: Reyçl oyuncağı", "Sendviç: Big Mac®", "İçki: Coca-Cola® (0.4L)"]
                }
            ],
            costs: {
                delivery: 0.00,
                serviceFee: 0.74,
                tip: 2.47
            }
        },
        { id: 2, name: "Wolt Market Binagadi", date: "05/02/2026, 01:10", price: "AZN33.78" },
        { id: 3, name: "Beef Tantuni Azadliq", date: "08/01/2026, 00:36", price: "AZN16.15" },
        { id: 4, name: "McDonald's & McCafe Nasimi", date: "25/11/2025, 15:21", price: "AZN48.09" },
        { id: 5, name: "Bibari Cig Köfte 8 Noyabr", date: "13/07/2025, 03:22", price: "AZN9.84" },
        { id: 6, name: "Bibari Cig Köfte 8 Noyabr", date: "13/07/2025, 03:20", price: "--" },
        { id: 7, name: "Aloe Aptek Vorovski", date: "10/07/2025, 13:16", price: "AZN12.07" },
        { id: 8, name: "Aloe Aptek Vorovski", date: "10/07/2025, 13:15", price: "--" },
    ];

    const selectedOrder = mockOrders.find(o => o.id === selectedOrderId);

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-4 md:px-8 pb-12">
            <div className="max-w-[1200px] mx-auto">

                {!selectedOrderId && (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-[40px] font-black tracking-tight">Profile</h1>
                            <button className="flex items-center gap-2 bg-[#009de0]/10 hover:bg-[#009de0]/20 text-[#009de0] px-6 py-3 rounded-xl font-bold transition-all border border-[#009de0]/20">
                                <MessageSquare size={20} />
                                Contact Support
                            </button>
                        </div>

                        <div className="flex overflow-x-auto gap-8 border-b border-white/10 mb-12 no-scrollbar">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 text-[16px] font-bold whitespace-nowrap transition-all relative ${activeTab === tab ? "text-white" : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {selectedOrderId && selectedOrder ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button
                            onClick={() => setSelectedOrderId(null)}
                            className="flex items-center gap-2 text-[#009de0] font-bold hover:underline mb-8"
                        >
                            <ChevronRight size={20} className="rotate-180" />
                            Back to order history
                        </button>

                        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                            <div className="space-y-4">
                                <h1 className="text-[40px] font-black tracking-tight leading-tight">{selectedOrder.name}</h1>
                                <div className="text-gray-400 space-y-1">
                                    <p>{selectedOrder.address}</p>
                                    <p>{selectedOrder.phone}</p>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        Order placed: {selectedOrder.date}
                                        <span className="bg-white/10 px-3 py-1 rounded-lg text-white font-bold text-xs uppercase">Delivery</span>
                                        <span className="bg-green-500 px-3 py-1 rounded-lg text-white font-bold text-xs uppercase">Delivered</span>
                                    </div>
                                </div>
                                <div className="text-gray-400 text-sm space-y-1 pt-2">
                                    <p>Your order number: {selectedOrder.orderNumber}</p>
                                    <p>Order ID: {selectedOrder.orderId}</p>
                                    <p>Delivered to: {selectedOrder.deliveryTo}</p>
                                    <p>Order delivered: {selectedOrder.deliveredAt}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-full md:w-fit">
                                <button className="bg-[#009de0] hover:bg-[#0089c4] text-white px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap">
                                    Order again
                                </button>
                                <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap border border-white/5">
                                    View venue info
                                </button>
                            </div>
                        </div>

                        <div className="pt-12">
                            <h2 className="text-[24px] font-black mb-8">Items</h2>
                            <div className="space-y-8">
                                {selectedOrder.items?.map((item, i) => (
                                    <div key={i} className="border-b border-white/10 pb-8 last:border-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                                                {item.options?.map((opt, idx) => (
                                                    <p key={idx} className="text-sm text-gray-400 leading-relaxed">{opt}</p>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-6 text-sm font-medium">
                                                <span className="text-gray-400">{item.price?.toFixed(2)}</span>
                                                <span className="text-gray-400">×{item.qty}</span>
                                                <span className="min-w-[60px] text-right">{item.total?.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-center text-gray-400">
                                <span className="text-sm font-bold">Delivery {selectedOrder.deliveryTo}</span>
                                <span className="font-medium">0.00</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-400 pt-2 border-t border-white/5">
                                <span className="text-sm font-bold">Service fee</span>
                                <span className="font-medium">{selectedOrder.costs?.serviceFee?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-400 pt-2 border-t border-white/5">
                                <span className="text-sm font-bold">Add courier tip</span>
                                <span className="font-medium">{selectedOrder.costs?.tip?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-400 pl-4 py-1">
                                <span className="text-xs font-bold">Tip</span>
                                <span className="text-xs font-medium">{selectedOrder.costs?.tip?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-8 border-t border-white/10">
                                <span className="text-[20px] font-black">Total sum</span>
                                <span className="text-[20px] font-black">{selectedOrder.price}</span>
                            </div>
                        </div>
                    </div>
                ) : activeTab === "Personal info" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
                        <div className="space-y-12">
                            <div className="flex items-start gap-8">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-24 h-24 rounded-full bg-[#fdf2d0] flex items-center justify-center border-4 border-[#fdf2d0]">
                                        <span className="text-[#966b2b] text-[28px] font-bold">
                                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                                        </span>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="text-[#009de0] font-bold text-sm hover:underline">Edit</button>
                                        <button className="text-[#ff3b30] font-bold text-sm hover:underline">Delete</button>
                                    </div>
                                </div>
                                <div className="space-y-6 pt-2">
                                    <div>
                                        <h2 className="text-[24px] font-bold mb-4">{user?.firstName} {user?.lastName}</h2>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-gray-400 text-sm font-bold mb-1">Email</p>
                                                <p className="text-white font-medium">{user?.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm font-bold mb-1">Phone number</p>
                                                <p className="text-white font-medium">{user?.phoneNumber || "Not provided"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[#1a1a1b] p-8 rounded-[24px] border border-white/5">
                                    <h3 className="text-[18px] font-bold mb-2">Wolt gift cards</h3>
                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">You can use gift cards to pay for your orders.</p>
                                    <div className="flex gap-4">
                                        <button className="text-[#009de0] font-bold text-[15px] hover:underline">Buy gift card</button>
                                        <button className="text-[#009de0] font-bold text-[15px] hover:underline">View gift cards</button>
                                    </div>
                                </div>
                                <div className="bg-[#1a1a1b] p-8 rounded-[24px] border border-white/5 flex justify-between items-start">
                                    <div>
                                        <h3 className="text-[18px] font-bold mb-2">Wolt credits</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">You can use credits to pay for your orders.</p>
                                    </div>
                                    <span className="text-gray-400 font-bold">AZN 0.00</span>
                                </div>
                            </div>

                            <div className="space-y-6 pt-4">
                                <h2 className="text-[32px] font-black tracking-tight">Your favorites</h2>
                                <p className="text-gray-400 max-w-[600px] leading-relaxed">
                                    You'll find your favorite restaurants and stores here. You can add favorites by tapping the heart icon.
                                </p>
                                <div className="flex items-center gap-4 bg-[#1a1a1b] p-4 rounded-2xl w-fit pr-8 cursor-pointer hover:bg-white/5 transition-all border border-white/5">
                                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                                        <Heart className="text-red-500" fill="currentColor" size={20} />
                                    </div>
                                    <span className="font-bold">Favourite</span>
                                    <div className="ml-4 opacity-50">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative group overflow-hidden rounded-[32px]">
                            <div className="relative z-10 mt-12">
                                <Image
                                    src="https://consumer-static-assets.wolt.com/loyalty/tier_images/level_2_v2.png"
                                    alt="Rising Star Mascot"
                                    width={686}
                                    height={384}
                                    className="object-contain"
                                />
                                <div className="absolute bottom-6 left-6 z-10">
                                    <h2 className="text-white text-[28px] font-bold leading-none mb-4">RISING STAR</h2>
                                    <button className="flex items-center gap-2 text-white font-bold text-[18px] hover:underline">
                                        See more <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : activeTab === "Order history" ? (
                    <div className="space-y-8">
                        <div className="space-y-1">
                            {mockOrders.map((order) => (
                                <div
                                    key={order.id}
                                    onClick={() => setSelectedOrderId(order.id)}
                                    className="flex items-center justify-between py-6 px-4 hover:bg-white/5 rounded-2xl transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-8 flex-1">
                                        <h3 className="text-[17px] font-bold text-white min-w-[280px]">{order.name}</h3>
                                        <span className="text-gray-400 text-[15px]">{order.date}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-gray-300 font-medium text-[15px]">{order.price}</span>
                                        <ChevronRight size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-6 pt-8">
                            <p className="text-gray-400 text-[15px]">Good news, everything's up to date 🥳</p>
                            <button className="bg-[#009de0] hover:bg-[#0089c4] text-white px-8 py-3 rounded-xl font-bold transition-all w-fit">
                                Load more
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                        <History size={48} className="mb-4 opacity-20" />
                        <p className="text-[18px] font-medium">This section is currently empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
