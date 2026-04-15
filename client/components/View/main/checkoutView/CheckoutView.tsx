"use client";

import React, { useState, useMemo } from "react";
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
  Bike,
  Lock,
  Star,
  Check,
  Trash2 as TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import LocationModal from "@/components/features/LocationModal";
import { useIntlayer } from "react-intlayer";
import { Button } from "@/components/ui/button";

const MapComponent = dynamic(
  () => import("@/components/features/MapComponent"),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#1a1a1a] animate-pulse" />,
  },
);

export default function CheckoutPageView() {
  const checkout = useIntlayer("checkout");
  if (!checkout) return null;
  const router = useRouter();
  const { items, totalAmount, placeOrder, venueComment, setVenueComment, currentAddress } = useCart();
  const { user } = useAuth();
  
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "credit">("card");
  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">("delivery");
  const [tip, setTip] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [courierNote, setCourierNote] = useState("");
  const [deliveryTimeOption, setDeliveryTimeOption] = useState<"standard" | "priority" | "schedule">("standard");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [tempComment, setTempComment] = useState("");
  const [tempNote, setTempNote] = useState("");
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const itemIds = useMemo(() => items.map(i => i._id || (i as any).id), [items]);

  const { data: ratings } = useQuery({
    queryKey: ["product-ratings", itemIds],
    queryFn: () => api.PostData("/reviews/averages", { ids: itemIds, type: "product" }),
    enabled: itemIds.length > 0,
  });

  const getRating = (id: string) => {
    const r = ratings?.find((item: any) => item.id === id);
    return r ? { average: r.average, count: r.count } : null;
  };

  const bagFee = 0.1;
  const serviceFee = 0.66;
  const deliveryFee = 1.99;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#009de0]/30 pb-20 transition-colors duration-300">
      {/* Header with Map Background */}
      <div className="relative h-[280px] w-full overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <MapComponent 
            center={currentAddress?.lat ? [currentAddress.lat, currentAddress.lng] : [40.4093, 49.8671]} 
            zoom={15} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2">
           <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#009de0] border-4 border-white shadow-xl flex items-center justify-center">
                <MapPin size={20} className="text-white fill-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-lg border border-white/10 uppercase tracking-widest">
                {checkout.adjustPin || "Adjust pin"}
              </div>
           </div>
        </div>

        <div className="absolute top-6 left-6 z-20">
          <button
            onClick={() => {
              const returnUrl = typeof window !== 'undefined' ? sessionStorage.getItem('returnUrl') || '/discovery' : '/discovery';
              router.push(returnUrl);
            }}
            className="flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white transition-all border border-white/10"
          >
            <ArrowLeft size={18} />
            <span className="font-bold text-sm">{checkout.back || "Back"}</span>
          </button>
        </div>

        <div className="absolute bottom-6 left-20 z-20">
          <h1 className="text-[48px] font-black tracking-tight text-white leading-tight">
            {checkout.title}
          </h1>
          <p className="text-white/80 font-bold text-lg tracking-tight">
            Shaurma №1 Binagadi
          </p>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 w-full space-y-16">
            <div className="flex bg-[#18191b] p-1 rounded-full w-fit border border-white/5">
              <button
                onClick={() => setDeliveryMode("delivery")}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all ${
                  deliveryMode === "delivery"
                    ? "bg-white/10 text-white shadow-lg"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <Bike size={16} />
                {checkout.delivery}
              </button>
              <button
                onClick={() => setDeliveryMode("pickup")}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all ${
                  deliveryMode === "pickup"
                    ? "bg-white/10 text-white shadow-lg"
                    : "text-white/40 hover:text-white"
                }`}
              >
                🚶 {checkout.pickup}
              </button>
            </div>

            <section className="space-y-6">
              <h2 className="text-[20px] font-black tracking-tight text-foreground">{checkout.where}</h2>
              <div className="bg-[#18191b] rounded-[16px] overflow-hidden border border-white/5 divide-y divide-white/5">
                <button 
                  onClick={() => setIsLocationModalOpen(true)}
                  className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-white opacity-60">
                      <MapPin size={22} />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                         <span className="text-white font-bold text-sm">
                           {currentAddress?.details ? checkout.selectedAddress : checkout.chooseAddress}
                         </span>
                         <span className="text-white/40 text-xs font-medium truncate max-w-[200px]">
                            {currentAddress?.details || checkout.tapToChoose}
                         </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-white/20" />
                </button>

                <div className="w-full p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-white opacity-60">
                      <Lock size={22} />
                    </div>
                    <span className="text-white font-bold text-sm">{checkout.leaveAtDoor}</span>
                  </div>
                  <div 
                    onClick={() => {}} 
                    className="w-11 h-6 bg-white/10 rounded-full relative cursor-pointer border border-white/5"
                  >
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full transition-all" />
                  </div>
                </div>

                <button 
                  onClick={() => setIsGift(!isGift)}
                  className={`w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors ${isGift ? 'bg-[#009de0]/5' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-white ${isGift ? 'opacity-100 text-[#009de0]' : 'opacity-60'}`}>
                      <Gift size={22} />
                    </div>
                    <span className={`font-bold text-sm ${isGift ? 'text-[#009de0]' : 'text-white'}`}>
                      {checkout.sendAsGift} {isGift ? `(${checkout.active})` : ''}
                    </span>
                  </div>
                  {isGift ? <Check size={18} className="text-[#009de0]" /> : <ChevronRight size={18} className="text-white/20" />}
                </button>

                <button 
                  onClick={() => {
                    setTempNote(courierNote);
                    setIsNoteModalOpen(true);
                  }}
                  className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4 text-white/40">
                    <MessageSquare size={22} />
                    <span className={`font-bold text-sm italic ${courierNote ? 'text-[#009de0]' : ''}`}>
                      {courierNote || checkout.addCourierNote}
                    </span>
                  </div>
                </button>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-[20px] font-black tracking-tight text-white">{checkout.when}</h2>
              <div className="space-y-2">
                {[
                  {
                    id: "priority",
                    title: checkout.priority,
                    desc: checkout.priorityDesc,
                    price: "+AZN2.29",
                    badge: checkout.new,
                    icon: "⚡",
                  },
                  {
                    id: "standard",
                    title: checkout.standard,
                    desc: checkout.standardDesc,
                    price: "",
                    current: true,
                  },
                  {
                    id: "schedule",
                    title: checkout.schedule,
                    desc: checkout.scheduleDesc,
                    price: "",
                  },
                ].map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setDeliveryTimeOption(option.id as any)}
                    className={`p-4 bg-[#18191b] rounded-[16px] border cursor-pointer transition-all ${deliveryTimeOption === option.id ? "border-[#009de0]" : "border-white/5"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliveryTimeOption === option.id ? "border-[#009de0]" : "border-white/20"}`}
                        >
                          {deliveryTimeOption === option.id && (
                            <div className="w-2.5 h-2.5 bg-[#009de0] rounded-full" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-sm">
                              {option.title}
                            </span>
                            {option.icon && (
                              <span className="text-[#009de0] text-xs">
                                {option.icon}
                              </span>
                            )}
                            {option.badge && (
                              <span className="bg-[#009de0] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase">
                                {option.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-white/40 text-xs font-medium">
                            {option.desc}
                          </p>
                        </div>
                      </div>
                      <span className="text-white font-bold text-sm">
                        {option.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-black tracking-tight text-white">
                  {checkout.orderItems}
                </h2>
                <button
                  onClick={() => {
                    const returnUrl = typeof window !== 'undefined' ? sessionStorage.getItem('returnUrl') || '/discovery' : '/discovery';
                    router.push(returnUrl);
                  }}
                  className="text-[#009de0] font-black text-sm hover:underline flex items-center gap-1.5"
                >
                  <Plus size={16} />
                  {checkout.addMore}
                </button>
              </div>

              <div className="bg-[#18191b] rounded-[16px] overflow-hidden border border-white/5 divide-y divide-white/5">
                {items.map((item) => (
                  <div key={item._id} className="p-4 flex gap-4 items-center group">
                    <div className="relative w-12 h-12 rounded-[8px] overflow-hidden bg-white/5 shrink-0 border border-white/5">
                      <Image
                        src={item.image || "/logo.png"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-sm truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[#009de0] font-bold text-sm">
                          AZN {item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-white/5 rounded-[6px] flex items-center justify-center text-white font-bold text-sm border border-white/5">
                      {item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="bg-[#18191b] rounded-[16px] p-6 flex items-center justify-between border border-white/5 mt-8 hover:bg-white/5 transition-all group shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#009de0]/10 flex items-center justify-center text-[#009de0] group-hover:scale-110 transition-all">
                    <MessageSquare size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-lg">
                      {checkout.addVenueComment}
                    </h4>
                    <p className="text-white/40 text-sm font-medium mt-1 leading-relaxed max-w-[340px]">
                      {venueComment || checkout.venueCommentPlaceholder}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setTempComment(venueComment);
                    setIsCommentModalOpen(true);
                  }}
                  className="bg-white/10 text-[#009de0] px-6 py-2 rounded-xl font-bold text-sm hover:bg-white/20 transition-all border border-white/5"
                >
                  {venueComment ? checkout.edit : checkout.add}
                </button>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-[20px] font-black tracking-tight text-white">{checkout.payment}</h2>
              <div className="bg-[#18191b] rounded-[16px] border border-white/5 divide-y divide-white/5">
                <button 
                  onClick={() => setIsPaymentModalOpen(true)} 
                  className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-white opacity-60">
                      <CreditCard size={22} />
                    </div>
                    <div className="text-left">
                      <span className="text-white font-bold text-sm block">
                        {paymentMethod === 'card' ? checkout.card : paymentMethod === 'cash' ? checkout.cash : checkout.credits}
                      </span>
                      <span className="text-white/40 text-xs font-bold">{checkout.tapToChangePayment}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-white/20" />
                </button>

                <div className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-white opacity-60">
                      <Ticket size={22} />
                    </div>
                    <input 
                       type="text" 
                       placeholder={checkout.promoPlaceholder}
                       value={promoCode}
                       onChange={(e) => setPromoCode(e.target.value)}
                       className="bg-transparent text-white font-bold text-sm outline-none w-full placeholder:text-white/40"
                    />
                  </div>
                  <button 
                    onClick={() => {
                        if (promoCode.toUpperCase().startsWith('WOLT')) {
                            setPromoDiscount(5);
                            alert("Promo code applied! 5 AZN discount.");
                        } else {
                            alert("Invalid promo code.");
                        }
                    }}
                    className="bg-[#009de0] hover:bg-[#0088c2] text-white px-6 py-2 rounded-lg font-bold text-sm transition-all"
                  >
                    {checkout.submit}
                  </button>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-[20px] font-black tracking-tight text-white">{checkout.addCourierTip}</h2>
              <div className="bg-[#18191b] rounded-[16px] p-6 border border-white/5">
                <p className="text-white/40 text-sm font-medium mb-6">
                  {checkout.tipDesc}
                </p>
                <div className="flex gap-2">
                   {[0, 1, 2, 3].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTip(amount)}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                        tip === amount
                          ? "bg-[#009de0] text-white"
                          : "bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      AZN {amount}
                    </button>
                  ))}
                  <button className="flex-1 py-3 bg-white/5 text-white/60 rounded-xl font-bold text-sm hover:bg-white/10">
                    {checkout.other}
                  </button>
                </div>
              </div>
            </section>
          </div>

          <aside className="w-full lg:w-[380px] shrink-0">
            <div className="sticky top-10 space-y-4">
              <div className="bg-[#18191b] rounded-[16px] p-6 border border-white/5 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-white">{checkout.summary}</h3>
                  <span className="text-white/20 text-xs font-bold uppercase">{checkout.inclTaxes}</span>
                </div>

                <div className="space-y-4 text-sm font-bold">
                  <button className="text-[#009de0] hover:underline mb-2 block text-left">{checkout.howFeesWork} </button>
                  
                  <div className="flex justify-between text-white/60">
                    <span>{checkout.subtotal}</span>
                    <span className="text-white">AZN {totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>{checkout.bagFee}</span>
                    <span className="text-white">AZN {bagFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>{checkout.serviceFee}</span>
                    <span className="text-white">AZN {serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>{checkout.deliveryFee}</span>
                    <span className="text-white">AZN {deliveryFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5 flex justify-between items-baseline">
                    <span className="text-2xl font-black text-white">{checkout.total}</span>
                    <span className="text-2xl font-black text-white">AZN {(totalAmount + bagFee + serviceFee + deliveryFee + (tip || 0) - promoDiscount).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-br from-[#4e31aa] to-[#8c52ff] rounded-[12px] p-4 relative overflow-hidden group">
                   <div className="flex items-center gap-2 mb-3">
                      <div className="bg-white/10 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black text-white italic">Wolt+</div>
                      <span className="text-white/60 text-[10px] font-bold">{checkout.onlyWithWoltPlus}</span>
                      <span className="ml-auto text-white/40 text-[10px] font-bold line-through">AZN {(totalAmount + bagFee + serviceFee + deliveryFee + (tip || 0)).toFixed(2)}</span>
                      <span className="text-white text-[10px] font-bold">AZN {(totalAmount + bagFee + serviceFee + (tip || 0)).toFixed(2)}</span>
                   </div>
                   <p className="text-white text-[11px] font-medium leading-relaxed mb-4">
                     {checkout.woltPlusPromo} <br/>
                     <button className="underline opacity-60">{checkout.learnMore}</button>
                   </p>
                   <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-lg font-black text-xs transition-all">
                     {checkout.startSaving}
                   </button>
                </div>

                <div className="mt-6">
                   <button 
                     disabled={loading}
                     onClick={async () => {
                        if (!currentAddress) {
                            alert(checkout.selectAddressError);
                            setIsLocationModalOpen(true);
                            return;
                        }
                        setLoading(true);
                        await placeOrder(router, venueComment, paymentMethod, {
                            tip: tip || 0,
                            deliveryMode,
                            deliveryTimeType: deliveryTimeOption,
                            isGift,
                            courierNote,
                            deliveryAddress: currentAddress?.details
                        });
                        setLoading(false);
                     }}
                     className="w-full bg-[#009de0] hover:bg-[#00b0ff] disabled:bg-[#009de0] disabled:opacity-100 text-white p-4 rounded-xl font-black text-sm transition-all shadow-lg flex flex-col items-center gap-1"
                   >
                     {!paymentMethod ? (
                        <>
                          <span>{checkout.pleaseAddPayment}</span>
                          <span>{checkout.continueWithOrder}</span>
                        </>
                     ) : (
                        <span>{checkout.finishOrder}</span>
                     )}
                   </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Global Location Modal */}
      <LocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={() => {}} 
      />

      {/* Payment Method Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsPaymentModalOpen(false)} />
          <div className="relative bg-[#202125] w-full max-w-[400px] rounded-[32px] p-8 border border-white/5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-black mb-6 text-white tracking-tight">{checkout.paymentMethod}</h3>
            <div className="space-y-3">
              {[
                { id: 'card', name: checkout.card, icon: <CreditCard size={18} /> },
                { id: 'cash', name: checkout.cash, icon: <div className="text-xl">💵</div> },
                { id: 'credit', name: checkout.credits, icon: <div className="text-xl">💰</div>, badge: `AZN ${user?.credit?.toFixed(2) || '0.00'}` }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => {
                    setPaymentMethod(method.id as any);
                    setIsPaymentModalOpen(false);
                  }}
                  className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${
                    paymentMethod === method.id ? 'bg-[#009de0]/10 border-[#009de0]' : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={paymentMethod === method.id ? 'text-[#009de0]' : 'text-white/60'}>
                      {method.icon}
                    </div>
                    <div className="text-left">
                      <span className="text-white font-bold text-sm block">{method.name}</span>
                      {method.badge && <span className="text-[#009de0] text-xs font-black">{method.badge}</span>}
                    </div>
                  </div>
                  {paymentMethod === method.id && <Check size={18} className="text-[#009de0]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Courier Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsNoteModalOpen(false)} />
          <div className="relative bg-[#202125] w-full max-w-[500px] rounded-[32px] p-8 border border-white/5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-black mb-6 text-white tracking-tight">{checkout.noteForCourier}</h3>
            <textarea
              className="w-full h-40 bg-white/5 border border-white/5 rounded-2xl p-4 text-white font-medium outline-none focus:border-[#009de0]/50 transition-all resize-none mb-6"
              placeholder={checkout.notePlaceholder}
              value={tempNote}
              onChange={(e) => setTempNote(e.target.value)}
              autoFocus
            />
            <div className="flex gap-4">
              <button 
                onClick={() => setIsNoteModalOpen(false)} 
                className="flex-1 py-4 rounded-xl font-bold bg-white/5 text-white"
              >
                {checkout.cancel}
              </button>
              <button 
                onClick={() => {
                  setCourierNote(tempNote);
                  setIsNoteModalOpen(false);
                }}
                className="flex-1 py-4 rounded-xl font-bold bg-[#009de0] text-white shadow-xl shadow-[#009de0]/20"
              >
                {checkout.saveNote}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal for Venue */}
      {isCommentModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCommentModalOpen(false)} />
          <div className="relative bg-[#202125] w-full max-w-[500px] rounded-[32px] p-8 border border-white/5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-black mb-6 text-white tracking-tight">{checkout.addVenueComment}</h3>
            <textarea
              className="w-full h-40 bg-white/5 border border-white/5 rounded-2xl p-4 text-white font-medium outline-none focus:border-[#009de0]/50 transition-all resize-none mb-6"
              placeholder={checkout.venueCommentPlaceholder}
              value={tempComment}
              onChange={(e) => setTempComment(e.target.value)}
              autoFocus
            />
            <div className="flex gap-4">
              <button 
                onClick={() => setIsCommentModalOpen(false)} 
                className="flex-1 py-4 rounded-xl font-bold bg-white/5 text-white"
              >
                {checkout.cancel}
              </button>
              <button 
                onClick={() => {
                  setVenueComment(tempComment);
                  setIsCommentModalOpen(false);
                }}
                className="flex-1 py-4 rounded-xl font-bold bg-[#009de0] text-white shadow-xl shadow-[#009de0]/20"
              >
                {checkout.saveComment}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
