"use client";

import React, { useState, useEffect } from "react";
import { 
    ArrowLeft, 
    ChevronRight, 
    MapPin, 
    Clock, 
    Phone, 
    Share2, 
    Info,
    Plus,
    CheckCircle2,
    RotateCcw,
    Bike
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Order } from "@/types/global";
import { useCart } from "@/context/CartContext";
import { CircularProgressBar } from "@/components/features/CircularProgressBar";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { useIntlayer } from "react-intlayer";

const MapComponent = dynamic(
    () => import("@/components/features/MapComponent"),
    { 
        ssr: false,
        loading: () => <div className="w-full h-full bg-[#1a1a1a] animate-pulse" />
    }
);

interface OrderTrackingViewProps {
    order: Order;
}

export default function OrderTrackingView({ order }: OrderTrackingViewProps) {
    const content = useIntlayer("order-tracking");
  if (!content) return null;
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"status" | "details" | "add-more">("status");
    const [timeLeft, setTimeLeft] = useState(15);
    const [courierProgress, setCourierProgress] = useState(0);
    const [totalProgress, setTotalProgress] = useState(0);
    const [currentStepId, setCurrentStepId] = useState(1);
    const [viewStartTime] = useState(Date.now());

    const restaurantCoords: [number, number] = order.storeLocation 
        ? [order.storeLocation.lat, order.storeLocation.lng] 
        : [40.4093, 49.8671];
    
    const destinationCoords: [number, number] = order.deliveryLocation 
        ? [order.deliveryLocation.lat, order.deliveryLocation.lng] 
        : [40.4200, 49.8800];

    const { updateOrderStatus } = useCart();

    useEffect(() => {
        if (activeTab !== "status") return;

        const socket = io("http://localhost:5000"); // Base URL of server
        
        socket.on("connect", () => {
            console.log("Connected to tracking gateway");
            socket.emit("subscribeTracking", { orderId: order.id, duration: 60000 });
        });

        socket.on("trackingUpdate", (data: { progress: number, timeLeft: number, status: string }) => {
            setTotalProgress(data.progress);
            setTimeLeft(data.timeLeft);
            
            // Sync courier progress with new logic
            if (data.progress < 0.5) {
                setCourierProgress(0);
            } else {
                setCourierProgress((data.progress - 0.5) * 2);
            }

            // Sync step IDs
            if (data.status === 'received') setCurrentStepId(1);
            else if (data.status === 'accepted') setCurrentStepId(2);
            else if (data.status === 'preparing') setCurrentStepId(3);
            else if (data.status === 'delivering') setCurrentStepId(4);
            else if (data.status === 'delivered') {
                setCurrentStepId(5);
                if (order.status !== 'delivered') {
                    updateOrderStatus(order.id, 'delivered');
                }
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [activeTab, order.id, order.status, updateOrderStatus]);

    const formatTimeLabel = () => {
        if (totalProgress >= 1) return content.status.enjoy;
        return `${timeLeft}`;
    };

    const formatSubLabel = () => {
        if (totalProgress >= 1) return content.status.delivered;
        return content.status.secondsUntil;
    };

    useEffect(() => {
        if (totalProgress >= 1) {
            const timer = setTimeout(() => {
                const returnUrl = typeof window !== 'undefined' ? sessionStorage.getItem('returnUrl') || '/discovery' : '/discovery';
                router.push(returnUrl);
            }, 1500); // Wait 1.5 seconds
            return () => clearTimeout(timer);
        }
    }, [totalProgress, router]);

    const steps = [
        { id: 1, text: content.steps.step1.title, sub: content.steps.step1.sub, status: currentStepId > 1 ? "completed" : currentStepId === 1 ? "active" : "pending" },
        { id: 2, text: content.steps.step2.title, sub: "", status: currentStepId > 2 ? "completed" : currentStepId === 2 ? "active" : "pending" },
        { id: 3, text: content.steps.step3.title, sub: "", status: currentStepId > 3 ? "completed" : currentStepId === 3 ? "active" : "pending" },
        { id: 4, text: content.steps.step4.title, sub: "", status: currentStepId > 4 ? "completed" : currentStepId === 4 ? "active" : "pending" },
        { id: 5, text: content.steps.step5.title, sub: "", status: currentStepId >= 5 ? "completed" : "pending" },
    ];

    const bagFee = 0.10;
    const serviceFee = 0.66;
    const deliveryFee = 1.99;

    const tabs = [
        { id: "status", label: content.tabs.status },
        { id: "details", label: content.tabs.details },
        { id: "add-more", label: content.tabs.addMore }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#009de0]/30 overflow-x-hidden transition-colors duration-300">
            <div className="fixed top-0 left-0 right-0 z-[2000] bg-background/80 backdrop-blur-md border-b border-border/10">
                <div className="max-w-[1000px] mx-auto flex items-center justify-center h-14">
                    <div className="flex gap-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={cn(
                                    "relative h-14 px-2 text-sm font-black uppercase tracking-widest transition-colors",
                                    activeTab === tab.id ? "text-[#009de0]" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div 
                                        layoutId="tab-underline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#009de0]" 
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="pt-14 pb-32">
                <AnimatePresence mode="wait">
                    {activeTab === "status" && (
                        <motion.div
                            key="status"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="relative"
                        >
                            <div className="relative h-[450px] w-full border-b border-border/10 overflow-hidden">
                                <div className="absolute inset-0 bg-muted/20">
                                    <MapComponent 
                                        center={restaurantCoords} 
                                        zoom={14} 
                                        courierProgress={courierProgress}
                                        restaurantCoords={restaurantCoords}
                                        destinationCoords={destinationCoords}
                                        restaurantImage={(order as any).storeImage || (order as any).image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60'}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />
                            </div>

                            <div className="relative z-[1000] max-w-[1000px] mx-auto px-8 -mt-20">
                                <div className="bg-card border border-border/10 rounded-[42px] p-12 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] transition-colors duration-300">
                                    <div className="mb-12 space-y-8">
                                        <Link 
                                            href="/discovery"
                                            className="inline-flex items-center gap-3 bg-foreground/5 backdrop-blur-md px-5 py-2.5 rounded-full hover:bg-foreground/10 transition-all border border-border/10 group text-foreground"
                                        >
                                            <ArrowLeft size={18} />
                                            <span className="font-black text-sm uppercase tracking-widest">{content.status.back}</span>
                                        </Link>

                                        <h1 className="text-[64px] font-black tracking-tighter leading-none text-foreground">
                                            {order.storeName}
                                        </h1>
                                    </div>

                                    <div className="flex flex-col lg:flex-row gap-12">
                                <div className="flex-1 space-y-4">
                                    {steps.map((step) => (
                                        <div 
                                            key={step.id} 
                                            className={cn(
                                                "p-6 rounded-[24px] border transition-all flex items-start gap-6",
                                                step.status === "active" || step.status === "completed" ? "bg-muted/50 border-border/10 shadow-sm" : "bg-transparent border-transparent opacity-40"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black text-sm",
                                                step.status === "completed" ? "bg-[#009de0] text-white" : step.status === "active" ? "bg-foreground text-background" : "bg-foreground/5 text-muted-foreground border border-border/10"
                                            )}>
                                                {step.status === "completed" ? <CheckCircle2 size={24} /> : step.id}
                                            </div>
                                            <div className="space-y-1">
                                                <p className="font-bold text-lg leading-tight text-foreground">{step.text}</p>
                                                {step.sub && <p className="text-muted-foreground text-sm font-medium">{step.sub}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <aside className="w-full lg:w-[400px] flex flex-col items-center justify-center">
                                    <CircularProgressBar 
                                        progress={totalProgress}
                                        minutesLabel={formatTimeLabel()}
                                        subLabel={formatSubLabel()}
                                    />

                                    <button className="mt-12 text-[#009de0] font-black text-sm hover:brightness-110 transition-all flex items-center gap-2 bg-[#009de0]/10 px-6 py-3 rounded-full border border-[#009de0]/20 shadow-sm">
                                        <Share2 size={16} />
                                        {content.status.shareTracking}
                                    </button>
                                </aside>
                            </div>
                        </div>
                    </div>
                        </motion.div>
                    )}

                    {activeTab === "details" && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-[800px] mx-auto px-8 py-12"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-[48px] font-black tracking-tighter leading-tight text-foreground">
                                    {order.storeName}
                                </h1>
                                <button className="bg-secondary text-[#009de0] px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all whitespace-nowrap border border-border/30">
                                    {content.details.viewVenue}
                                </button>
                            </div>

                            <div className="space-y-1 text-muted-foreground font-bold mb-10">
                                <p>202 Binagadi , AZ1000, Baku</p>
                                <p>+994552001389</p>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-4">
                                <div className="bg-muted border border-border/10 px-4 py-3 rounded-2xl flex flex-col shadow-sm">
                                    <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-black">{content.details.orderPlaced}</span>
                                    <span className="text-sm font-bold text-foreground mt-0.5">March 26, 2026 7:37 PM</span>
                                </div>
                                <div className="bg-muted border border-border/10 px-4 py-3 rounded-2xl flex flex-col shadow-sm">
                                    <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-black">{content.details.orderId}</span>
                                    <span className="text-sm font-bold text-foreground mt-0.5 uppercase">{order.id}</span>
                                </div>
                            </div>
                            
                            <div className="bg-muted border border-border/10 px-4 py-3 rounded-2xl flex flex-col mb-12 shadow-sm">
                                <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-black">{content.details.deliveredTo}</span>
                                <span className="text-sm font-bold text-foreground mt-0.5">89 Ilgar Jumshudov Street 40</span>
                            </div>

                            <h2 className="text-[32px] font-black tracking-tight mb-8 text-foreground">{content.details.items}</h2>
                            
                            <div className="space-y-6 border-t border-border/10 pt-8 pb-12">
                                {order.items.map((item: any) => (
                                    <div key={item._id} className="flex justify-between items-center group">
                                        <div className="flex-1">
                                            <p className="text-foreground font-black text-lg group-hover:text-[#009de0] transition-colors">{item.name}</p>
                                        </div>
                                        <div className="flex items-center gap-8 text-muted-foreground font-bold">
                                            <span>{item.price.toFixed(2)}</span>
                                            <span className="bg-foreground/10 px-2 py-0.5 rounded-md text-xs">×{item.quantity}</span>
                                            <span className="text-foreground w-20 text-right">{ (item.price * item.quantity).toFixed(2) }</span>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-8 space-y-3">
                                    <div className="flex justify-between text-muted-foreground font-bold">
                                        <span>{content.details.subtotal}</span>
                                        <span className="text-foreground">{order.total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground font-bold">
                                        <span>{content.details.bagFee}</span>
                                        <span className="text-foreground">{bagFee.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground font-bold">
                                        <span>{content.details.serviceFee}</span>
                                        <span className="text-foreground">{serviceFee.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground font-bold">
                                        <span>{content.details.deliveryFee}</span>
                                        <span className="text-foreground">{deliveryFee.toFixed(2)}</span>
                                    </div>
                                    <div className="pt-6 border-t border-border/10 flex justify-between items-end">
                                        <span className="text-[32px] font-black tracking-tight leading-none uppercase text-foreground">{content.details.total}</span>
                                        <span className="text-[48px] font-black text-[#009de0] tracking-tighter leading-none">
                                            AZN {(order.total + bagFee + serviceFee + deliveryFee).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[2000] w-[calc(100%-48px)] max-w-[500px]">
                <div className="bg-white rounded-[24px] p-1.5 flex items-center justify-between shadow-2xl group cursor-pointer hover:scale-[1.02] transition-all">
                    <div className="flex items-center gap-4 pl-4">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-black font-black text-[15px]">{content.addMore.title}</span>
                                <span className="text-black font-bold text-[13px] bg-black/5 px-2 py-0.5 rounded-lg">19:46 {content.addMore.timeLeft}</span>
                            </div>
                            <p className="text-gray-500 text-[13px] font-medium">{content.addMore.promo}</p>
                        </div>
                    </div>
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0">
                        <Image
                            src="/logo.png"
                            alt="Add more"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
