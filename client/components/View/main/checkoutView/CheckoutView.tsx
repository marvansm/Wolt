"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Gift,
  Plus,
  ChevronRight,
  Info,
  CreditCard,
  MessageSquare,
  Ticket,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const MapComponent = dynamic(
  () => import("@/components/features/MapComponent"),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#1a1a1a] animate-pulse" />,
  },
);

export default function CheckoutPageView() {
  const { items, totalAmount, placeOrder } = useCart();
  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const [tip, setTip] = useState<number | null>(0);

  const bagFee = 0.1;
  const serviceFee = 0.66;
  const deliveryFee = 1.99;
  const finalTotal =
    totalAmount + bagFee + serviceFee + deliveryFee + (tip || 0);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#009de0]/30 pb-20">
      <div className="relative h-[380px] w-full overflow-hidden border-b border-white/10 group">
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <MapComponent center={[40.4093, 49.8671]} zoom={15} />
        </div>

        <div className="absolute top-8 left-8 z-[1000]">
          <Link
            href="/discovery"
            className="w-12 h-12 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black transition-all border border-white/5 shadow-2xl group-hover:scale-110 active:scale-95"
          >
            <ArrowLeft className="text-white" size={24} />
          </Link>
        </div>

        <div className="absolute bottom-12 left-8 z-[1000]">
          <h1 className="text-[64px] font-black tracking-tight leading-none drop-shadow-2xl">
            Checkout
          </h1>
          <p className="text-white/80 font-bold ml-1 mt-2 text-xl tracking-tight">
            Shaurma №1 Binagadi
          </p>
        </div>

        {/* Adjust pin button overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none">
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#009de0] border-[5px] border-white shadow-[0_0_25px_rgba(0,157,224,0.8)] animate-pulse" />
            <span className="bg-black/95 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 shadow-2xl">
              Adjust pin
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 w-full space-y-16">
            <div className="flex p-1.5 bg-[#141414] rounded-[22px] w-fit border border-white/5 shadow-inner">
              <button
                onClick={() => setDeliveryMode("delivery")}
                className={`flex items-center gap-2.5 px-8 py-3.5 rounded-[18px] font-black text-sm transition-all duration-300 ${
                  deliveryMode === "delivery"
                    ? "bg-[#25353d] text-[#009de0] shadow-lg scale-[1.02]"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                Delivery
              </button>
              <button
                onClick={() => setDeliveryMode("pickup")}
                className={`flex items-center gap-2.5 px-8 py-3.5 rounded-[18px] font-black text-sm transition-all duration-300 ${
                  deliveryMode === "pickup"
                    ? "bg-[#25353d] text-[#009de0] shadow-lg scale-[1.02]"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  🚶
                </div>
                Pickup
              </button>
            </div>

            <section className="space-y-8">
              <h2 className="text-[36px] font-black tracking-tight">Where?</h2>

              <div className="space-y-4">
                <button className="w-full bg-[#141414] hover:bg-[#1a1a1a] rounded-[28px] p-6 flex items-center justify-between border border-white/5 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#009de0] group-hover:scale-110 transition-transform">
                      <MapPin size={24} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-white font-black text-lg">Home</h4>
                      <p className="text-gray-500 text-sm font-medium">
                        89 Ilgar Jumshudov Street
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-600 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="bg-[#141414] rounded-[28px] p-6 flex items-center justify-between border border-white/5">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400">
                      <div className="w-6 h-6 border-2 border-gray-600 rounded-md" />
                    </div>
                    <h4 className="text-white font-black text-lg">
                      Leave order at the door
                    </h4>
                  </div>
                  <div className="w-14 h-8 bg-[#009de0] rounded-full relative cursor-pointer shadow-lg border border-white/5">
                    <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-md" />
                  </div>
                </div>

                <button className="w-full bg-[#141414] hover:bg-[#1a1a1a] rounded-[28px] p-6 flex items-center justify-between border border-white/5 transition-all outline-none">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400">
                      <Gift size={24} />
                    </div>
                    <h4 className="text-white font-black text-lg">
                      Send as a gift
                    </h4>
                  </div>
                  <ChevronRight className="text-gray-600" />
                </button>

                <button className="w-full bg-[#141414] hover:bg-[#1a1a1a] rounded-[28px] p-6 flex items-center justify-between border border-white/5 transition-all outline-none">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400">
                      <div className="w-6 h-6 border-2 border-dashed border-gray-600 rounded-md" />
                    </div>
                    <h4 className="text-white font-black text-lg">
                      Add note for the courier
                    </h4>
                  </div>
                  <Plus className="text-[#009de0]" />
                </button>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-[36px] font-black tracking-tight">When?</h2>

              <div className="space-y-3">
                {[
                  {
                    id: "priority",
                    title: "Priority",
                    desc: "15-25 min • Direct to you",
                    price: "+AZN2.29",
                    badge: "New",
                    icon: "⚡",
                  },
                  {
                    id: "standard",
                    title: "Standard",
                    desc: "20-30 min",
                    price: "",
                    current: true,
                  },
                  {
                    id: "schedule",
                    title: "Schedule",
                    desc: "Choose a delivery time",
                    price: "",
                  },
                ].map((option) => (
                  <div
                    key={option.id}
                    className={`p-6 bg-[#141414] rounded-[28px] border cursor-pointer transition-all hover:bg-[#1a1a1a] ${option.current ? "border-[#009de0] ring-2 ring-[#009de0]/20" : "border-white/5"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${option.current ? "border-[#009de0]" : "border-gray-600"}`}
                        >
                          {option.current && (
                            <div className="w-3 h-3 bg-[#009de0] rounded-full" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-black text-lg">
                              {option.title}
                            </span>
                            {option.icon && (
                              <span className="text-[#009de0]">
                                {option.icon}
                              </span>
                            )}
                            {option.badge && (
                              <span className="bg-[#009de0] text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-tight">
                                {option.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-500 text-sm font-medium">
                            {option.desc}
                          </p>
                        </div>
                      </div>
                      <span className="text-white font-bold">
                        {option.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-[36px] font-black tracking-tight">
                  Order items
                </h2>
                <Link
                  href="/discovery"
                  className="text-[#009de0] font-black text-sm hover:underline flex items-center gap-1.5 px-5 py-2.5 bg-[#141414] rounded-2xl border border-white/5 shadow-lg"
                >
                  <Plus size={18} />
                  Add more
                </Link>
              </div>

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-6 items-center group">
                    <div className="relative w-24 h-24 rounded-[24px] overflow-hidden bg-[#141414] border border-white/5 shrink-0 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={item.image || "/logo.png"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-black text-xl tracking-tight leading-tight">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[#009de0] font-bold text-lg">
                          AZN {item.price.toFixed(2)}
                        </span>
                        {item.price > 5 && (
                          <span className="bg-[#009de0]/10 text-[#009de0] text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-[#141414] rounded-2xl border border-white/5 flex items-center justify-center text-white font-black text-xl shadow-inner group-hover:bg-[#1a1a1a] transition-all">
                      {item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#141414] rounded-[32px] p-8 flex items-center justify-between border border-white/5 mt-12 hover:bg-[#1a1a1a] transition-all group shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#009de0]/10 flex items-center justify-center text-[#009de0] group-hover:scale-110 transition-all">
                    <MessageSquare size={32} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-black text-xl">
                      Add comment for venue
                    </h4>
                    <p className="text-gray-500 text-sm font-medium mt-1 leading-relaxed max-w-[340px]">
                      Special requests, allergies, or any context for the
                      chef...
                    </p>
                  </div>
                </div>
                <button className="bg-[#25353d] text-[#009de0] px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-[#2c424d] transition-all shadow-lg active:scale-95">
                  Edit
                </button>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-[36px] font-black tracking-tight">Payment</h2>
              <button className="w-full bg-[#141414] hover:bg-[#1a1a1a] rounded-[36px] p-8 flex items-center justify-between border border-white/5 transition-all group shadow-2xl">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#009de0]/10 rounded-2xl flex items-center justify-center text-[#009de0] group-hover:scale-110 transition-all">
                    <CreditCard size={32} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-black text-2xl tracking-tight">
                      Choose a payment method
                    </h4>
                    <p className="text-gray-500 font-medium mt-1">
                      Please add a payment method to continue
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-gray-600 group-hover:translate-x-1 transition-transform" />
              </button>
            </section>

            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-[36px] font-black tracking-tight">
                  Add courier tip
                </h2>
                <div className="bg-[#009de0]/10 text-[#009de0] px-5 py-2 rounded-xl text-xs font-black uppercase tracking-[0.1em]">
                  Optional
                </div>
              </div>
              <div className="bg-[#141414] rounded-[36px] p-10 border border-white/5 shadow-2xl">
                <p className="text-gray-400 font-medium mb-10 text-xl leading-relaxed">
                  They&apos;ll get 100% of your tip after the delivery.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[0, 1, 2, 3].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTip(amount)}
                      className={`px-6 py-3 rounded-[16px] font-black text-base transition-all duration-300 ${
                        tip === amount
                          ? "bg-[#009de0] text-white shadow-[0_0_20px_rgba(0,157,224,0.4)] scale-105"
                          : "bg-[#1f1f1f] text-gray-300 hover:bg-[#2a2a2a] border border-white/5"
                      }`}
                    >
                      AZN {amount}
                    </button>
                  ))}
                  <button className="px-6 py-3 rounded-[16px] bg-[#1f1f1f] text-gray-300 font-black text-base border border-white/5 hover:bg-[#2a2a2a] transition-all">
                    Other
                  </button>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-[36px] font-black tracking-tight">
                Redeem code
              </h2>
              <div className="flex gap-5">
                <div className="flex-1 relative group">
                  <Ticket
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#009de0] transition-colors"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Enter code..."
                    className="w-full bg-[#141414] border border-white/5 outline-none rounded-[24px] py-4 pl-14 pr-6 font-bold text-lg focus:border-[#009de0]/50 transition-all placeholder:text-gray-800 shadow-inner"
                  />
                </div>
                <button className="bg-[#009de0] hover:bg-[#00b0ff] text-white px-8 rounded-[24px] font-black text-base shadow-xl shadow-[#009de0]/20 active:scale-95 transition-all">
                  Submit
                </button>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Summary Sidebar */}
          <aside className="w-full lg:w-[420px] shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Wolt+ Promo Banner */}
              <div className="bg-gradient-to-br from-[#4e31aa] via-[#8c52ff] to-[#4e31aa] rounded-[36px] p-10 relative overflow-hidden group shadow-[0_20px_50px_rgba(140,82,255,0.3)]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[80px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="bg-white text-[#4e31aa] px-4 py-1.5 rounded-xl text-[11px] font-black italic tracking-tighter shadow-xl">
                      Wolt+
                    </span>
                    <span className="text-white font-bold text-sm tracking-tight">
                      Only with Wolt+
                    </span>
                  </div>
                  <h3 className="text-white text-[28px] font-black leading-[1.2] mb-3 tracking-tight">
                    Only with Wolt+ get AZN 0.00 delivery fee
                  </h3>
                  <p className="text-white/70 text-base font-medium mb-8 leading-relaxed">
                    Start your 30-day free trial today and save on every order.
                  </p>
                  <button className="w-full bg-white text-[#4e31aa] py-5 rounded-2xl font-black text-[20px] hover:shadow-2xl hover:scale-[1.02] transition-all active:scale-95">
                    Start saving now
                  </button>
                </div>
              </div>

              <div className="bg-[#141414] rounded-[36px] p-10 border border-white/10 shadow-2xl space-y-10">
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <h3 className="text-[32px] font-black tracking-tight">
                    Summary
                  </h3>
                  <button className="text-gray-600 hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
                    <Info size={24} />
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between text-gray-400 font-bold text-xl">
                    <span>Item subtotal</span>
                    <span className="text-white tracking-tight">
                      AZN {totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-bold text-xl">
                    <span>Bag fee</span>
                    <span className="text-white tracking-tight">
                      AZN {bagFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-bold text-xl">
                    <span>Service fee</span>
                    <span className="text-white tracking-tight">
                      AZN {serviceFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-bold text-xl">
                    <span>Delivery fee</span>
                    <span className="text-white tracking-tight">
                      AZN {deliveryFee.toFixed(2)}
                    </span>
                  </div>
                  {tip !== null && tip > 0 && (
                    <div className="flex justify-between text-[#009de0] font-black text-xl animate-in fade-in slide-in-from-bottom-2">
                      <span>Courier tip</span>
                      <span className="tracking-tight">
                        AZN {tip.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-10 border-t border-white/10 flex justify-between items-baseline gap-4">
                  <span className="text-[36px] font-black tracking-tight leading-none">
                    Total
                  </span>
                  <div className="text-right">
                    <span className="text-[48px] font-black text-[#009de0] tracking-tighter block leading-none">
                      AZN {finalTotal.toFixed(2)}
                    </span>
                    <span className="text-gray-700 text-[10px] font-black uppercase tracking-[0.2em] mt-3 block">
                      Incl. taxes if applicable
                    </span>
                  </div>
                </div>

                <div className="pt-6 space-y-8">
                  <div className="bg-[#bf1a2f]/10 border border-[#bf1a2f]/30 p-6 rounded-3xl flex items-start gap-5 shadow-inner">
                    <div className="w-10 h-10 bg-[#bf1a2f] rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#bf1a2f]/20">
                      <Info size={20} className="text-white" />
                    </div>
                    <p className="text-[#ff4d6d] text-base font-black leading-snug tracking-tight">
                      Please add a payment method to complete your order.
                    </p>
                  </div>

                  <button
                    onClick={placeOrder}
                    className="w-full bg-[#009de0] hover:bg-[#00b0ff] text-white h-[64px] rounded-[20px] font-black text-[18px] tracking-tight transition-all shadow-2xl shadow-[#009de0]/20 active:scale-95"
                  >
                    Finish order
                  </button>
                </div>
              </div>

              <p className="px-6 text-[12px] text-gray-700 font-bold leading-relaxed text-center tracking-tight">
                By clicking &quot;Finish order&quot; you agree to the{" "}
                <span className="underline text-gray-500 cursor-pointer hover:text-white transition-colors">
                  Terms and Conditions
                </span>{" "}
                and the{" "}
                <span className="underline text-gray-500 cursor-pointer hover:text-white transition-colors">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
