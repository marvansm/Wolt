"use client";

import { useAuth } from "@/context/AuthContext";
import {
  MessageSquare,
  Edit2,
  Trash2,
  Heart,
  ChevronRight,
  CreditCard,
  MapPin,
  History,
  Gift,
  Settings,
  Star,
  Camera,
  Copy,
  Check,
  Plus,
  Home,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useMemo, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { useIntlayer } from "react-intlayer";
import api from "@/services/api";
import { useTheme } from "@/context/ThemeContext";


export default function ProfileUi() {
  const content = useIntlayer("profile");
  if (!content) return null;
  const { user, updateProfile } = useAuth();
  const { orders } = useCart();
  const [activeTab, setActiveTab] = useState("Personal info");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingObj, setIsUploadingObj] = useState(false);

  const { requestProfileVerification, verifyProfileMethod: confirmProfileMethod } = useAuth();
  const [verifyMethod, setVerifyMethod] = useState<'email' | 'phone' | null>(null);
  const [verifyCode, setVerifyCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);


  const [addresses, setAddresses] = useState<any[]>([]);
  const [redeemCodeInput, setRedeemCodeInput] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState("");
  const [copiedReferral, setCopiedReferral] = useState(false);
  const referralCode = useMemo(() => {
    const id = user?.id || user?._id || "";
    return id.substring(0, 8).toUpperCase().replace(/[^A-Z0-9]/g, "X") || "WOLT1234";
  }, [user]);

  const [sendReceipts, setSendReceipts] = useState(true);
  const { theme: currentTheme, setTheme } = useTheme();


  useEffect(() => {
    if (activeTab === "Addresses" && user) {
      api.getData("/addresses").then((data: any[]) => setAddresses(data || [])).catch(() => setAddresses([]));
    }
  }, [activeTab, user]);

  const handleRequestVerification = async (method: 'email' | 'phone') => {
    try {
      setIsVerifying(true);
      await requestProfileVerification(method);
      setVerifyMethod(method);
      setSuccess(`${method === 'email' ? 'Email' : 'SMS'} ${content.messages.codeSent}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || `Failed to send code to ${method}`);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleConfirmVerification = async () => {
    if (!verifyCode || verifyCode.length !== 6 || !verifyMethod) return;
    try {
      setIsVerifying(true);
      await confirmProfileMethod(verifyMethod, verifyCode);
      setVerifyMethod(null);
      setVerifyCode("");
      setSuccess(`${verifyMethod === 'email' ? 'Email' : 'Phone'} ${content.messages.verifySuccess}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid verification code");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleEditToggle = () => {
    if (!isEditing) {
      setFirstName(user?.firstName || "");
      setLastName(user?.lastName || "");
      setPhoneNumber(user?.phoneNumber || "");
      setEmail(user?.email || "");
      setError(null);
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    if (!firstName || !lastName || !email) {
      setError("First name, last name and email are required");
      return;
    }
    
    setIsSaving(true);
    setError(null);
    try {
      await updateProfile({ firstName, lastName, phoneNumber, email });
      setIsEditing(false);
      if (email !== user?.email || phoneNumber !== user?.phoneNumber) {
        setSuccess(content.messages.updateVerifyPrompt as any);
      } else {
        setSuccess(content.messages.updateSuccess as any);
      }
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingObj(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://localhost:5000/upload", {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (data.secure_url) {
            await updateProfile({ avatar: data.secure_url });
            setSuccess(content.messages.uploadSuccess as any);
            setTimeout(() => setSuccess(null), 3000);
        }
    } catch(err) {
        setError(content.messages.uploadFailed as any);
    } finally {
        setIsUploadingObj(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const tabs = [
    { id: "Personal info", label: content.tabs.personalInfo },
    { id: "Payment methods", label: content.tabs.paymentMethods },
    { id: "Addresses", label: content.tabs.addresses },
    { id: "Loyalty cards", label: content.tabs.loyaltyCards },
    { id: "Order history", label: content.tabs.orderHistory },
    { id: "Earn Wolt credits", label: content.tabs.earnCredits },
    { id: "Redeem code", label: content.tabs.redeemCode },
    { id: "Settings", label: content.tabs.settings },
  ];

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 px-4 md:px-8 pb-12 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto">
        {!selectedOrderId && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-[40px] font-black tracking-tight">{content.title}</h1>
              <button className="flex items-center gap-2 bg-[#009de0]/10 hover:bg-[#009de0]/20 text-[#009de0] px-6 py-3 rounded-xl font-bold transition-all border border-[#009de0]/20">
                <MessageSquare size={20} />
                {content.contactSupport}
              </button>
            </div>

            <div className="flex overflow-x-auto gap-8 border-b border-border/10 mb-12 no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-[16px] font-bold whitespace-nowrap transition-all relative ${
                    activeTab === tab.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground"></div>
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
              {content.orderHistory.backToHistory}
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="space-y-4">
                <h1 className="text-[40px] font-black tracking-tight leading-tight text-foreground">
                  {selectedOrder.storeName}
                </h1>
                <div className="text-muted-foreground space-y-1">
                  <p>{selectedOrder.deliveryAddress}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    {content.orderHistory.orderPlaced}: {new Date(selectedOrder.date).toLocaleString()}
                    <span className="bg-foreground/10 px-3 py-1 rounded-lg text-foreground font-bold text-xs uppercase">
                      {content.orderHistory.delivery}
                    </span>
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-white font-bold text-xs uppercase",
                      selectedOrder.status === 'delivered' ? "bg-green-500" : "bg-[#009de0]"
                    )}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
                <div className="text-muted-foreground text-sm space-y-1 pt-2">
                  <p>{content.orderHistory.orderId}: {selectedOrder.id}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-fit">
                <button className="bg-[#009de0] hover:bg-[#0089c4] text-white px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap">
                  {content.orderHistory.orderAgain}
                </button>
              </div>
            </div>

            <div className="pt-12">
              <h2 className="text-[24px] font-black mb-8 text-foreground">{content.orderHistory.items}</h2>
              <div className="space-y-8 border-t border-border/10 pt-8">
                {selectedOrder.items?.map((item, i) => (
                  <div
                    key={i}
                    className="border-b border-border/10 pb-8 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1 text-foreground">{item.name}</h3>
                      </div>
                      <div className="flex items-center gap-6 text-sm font-bold">
                        <span className="text-muted-foreground">
                          {item.price?.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground px-2 py-0.5 bg-foreground/5 rounded-md">×{item.quantity}</span>
                        <span className="min-w-[80px] text-right text-foreground">
                          {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10">
              <div className="flex justify-between items-center pt-4">
                <span className="text-[24px] font-black uppercase tracking-tighter">{content.orderHistory.totalSum}</span>
                <span className="text-[32px] font-black text-[#009de0]">
                  AZN {selectedOrder.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ) : activeTab === "Personal info" ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
            <div className="space-y-12">
              <div className="flex items-start gap-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative group/avatar cursor-pointer w-24 h-24 rounded-full bg-[#fdf2d0] flex items-center justify-center border-4 border-[#009de0]/10 overflow-hidden shadow-sm" onClick={() => fileInputRef.current?.click()}>
                    {user?.avatar ? (
                      <Image src={user.avatar} alt="Profile" fill className="object-cover" />
                    ) : (
                      <span className="text-[#966b2b] text-[28px] font-bold">
                        {user?.firstName?.[0]}
                        {user?.lastName?.[0]}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                      {isUploadingObj ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Camera className="text-white" size={24} />
                      )}
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={handleEditToggle}
                      className="text-[#009de0] font-bold text-sm hover:underline"
                    >
                      {isEditing ? content.personalInfo.cancel : content.personalInfo.edit}
                    </button>
                    {!isEditing && (
                      <button className="text-[#ff3b30] font-bold text-sm hover:underline">
                        {content.personalInfo.delete}
                      </button>
                    )}
                  </div>
                </div>
                <div className="space-y-6 pt-2 flex-1">
                  <div>
                    {isEditing ? (
                      <div className="space-y-4 max-w-[400px]">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-muted-foreground text-sm font-bold mb-1 block">{content.personalInfo.firstName}</label>
                            <input 
                              type="text" 
                              value={firstName} 
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full bg-muted border border-border/10 rounded-xl px-4 py-2 text-foreground focus:outline-none focus:border-[#009de0] transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-muted-foreground text-sm font-bold mb-1 block">{content.personalInfo.lastName}</label>
                            <input 
                              type="text" 
                              value={lastName} 
                              onChange={(e) => setLastName(e.target.value)}
                              className="w-full bg-muted border border-border/10 rounded-xl px-4 py-2 text-foreground focus:outline-none focus:border-[#009de0] transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-muted-foreground text-sm font-bold mb-1 block">{content.personalInfo.phoneNumber}</label>
                          <input 
                            type="tel" 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full bg-muted border border-border/10 rounded-xl px-4 py-2 text-foreground focus:outline-none focus:border-[#009de0] transition-all"
                            placeholder={content.personalInfo.notProvided as any}
                          />
                        </div>
                        <div>
                          <label className="text-muted-foreground text-sm font-bold mb-1 block">{content.personalInfo.email}</label>
                          <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-muted border border-border/10 rounded-xl px-4 py-2 text-foreground focus:outline-none focus:border-[#009de0] transition-all"
                          />
                        </div>
                        {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
                        {success && <p className="text-green-500 text-xs font-bold">{success}</p>}
                        <button 
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="bg-[#009de0] hover:bg-[#0089c4] text-white px-8 py-2 rounded-xl font-bold transition-all disabled:opacity-50"
                        >
                          {isSaving ? content.personalInfo.saving : content.personalInfo.saveChanges}
                        </button>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-[24px] font-bold mb-4 text-foreground">
                          {user?.firstName} {user?.lastName}
                        </h2>
                        {success && <p className="text-green-500 text-sm font-bold mb-4 animate-in fade-in slide-in-from-top-1">{success}</p>}
                        <div className="space-y-6">
                          {/* Code Verification Input Form */}
                          {verifyMethod && (
                            <div className="bg-muted p-4 rounded-xl border border-border/10 space-y-3 animate-in fade-in slide-in-from-top-2">
                              <p className="text-sm font-bold">{content.personalInfo.enterCode} {verifyMethod === 'email' ? 'Email' : 'Phone'}:</p>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  maxLength={6}
                                  value={verifyCode}
                                  onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                                  className="w-full max-w-[200px] bg-background border border-border/10 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-[#009de0] tracking-widest text-center"
                                  placeholder="------"
                                />
                                <button
                                  onClick={handleConfirmVerification}
                                  disabled={isVerifying || verifyCode.length !== 6}
                                  className="bg-[#009de0] hover:bg-[#0089c4] text-white px-6 py-2 rounded-lg font-bold transition-all disabled:opacity-50"
                                >
                                  {isVerifying ? "..." : content.personalInfo.verify}
                                </button>
                                <button
                                  onClick={() => setVerifyMethod(null)}
                                  className="text-muted-foreground hover:text-foreground font-bold px-4"
                                >
                                  {content.personalInfo.cancel}
                                </button>
                              </div>
                              {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
                            </div>
                          )}

                          <div className="flex justify-between items-center group">
                            <div>
                              <p className="text-muted-foreground text-sm font-bold mb-1">
                                {content.personalInfo.email}
                              </p>
                              <p className="text-foreground font-medium flex items-center gap-2">
                                {user?.email}
                                {user?.isEmailVerified ? (
                                  <span className="text-green-500 bg-green-500/10 px-2 py-0.5 rounded text-xs font-bold">{content.personalInfo.verified}</span>
                                ) : (
                                  <span className="text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded text-xs font-bold">{content.personalInfo.unverified}</span>
                                )}
                              </p>
                            </div>
                            {!user?.isEmailVerified && !verifyMethod && (
                              <button 
                                onClick={() => handleRequestVerification('email')}
                                disabled={isVerifying}
                                className="text-[#009de0] text-sm font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                {content.personalInfo.verifyEmail}
                              </button>
                            )}
                          </div>
                          <div className="flex justify-between items-center group">
                            <div>
                              <p className="text-muted-foreground text-sm font-bold mb-1">
                                {content.personalInfo.phoneNumber}
                              </p>
                              <p className="text-foreground font-medium flex items-center gap-2">
                                {user?.phoneNumber || content.personalInfo.notProvided}
                                {user?.phoneNumber && (user?.isPhoneVerified ? (
                                  <span className="text-green-500 bg-green-500/10 px-2 py-0.5 rounded text-xs font-bold">{content.personalInfo.verified}</span>
                                ) : (
                                  <span className="text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded text-xs font-bold">{content.personalInfo.unverified}</span>
                                ))}
                              </p>
                            </div>
                            {user?.phoneNumber && !user?.isPhoneVerified && !verifyMethod && (
                              <button 
                                onClick={() => handleRequestVerification('phone')}
                                disabled={isVerifying}
                                className="text-[#009de0] text-sm font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                {content.personalInfo.verifyPhone}
                              </button>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-8 rounded-[24px] border border-border/10 shadow-sm transition-colors">
                  <h3 className="text-[18px] font-bold mb-2 text-foreground">
                    {content.personalInfo.giftCards}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {content.personalInfo.giftCardsDesc}
                  </p>
                  <div className="flex gap-4">
                    <button className="text-[#009de0] font-bold text-[15px] hover:underline">
                      {content.personalInfo.buyGiftCard}
                    </button>
                    <button className="text-[#009de0] font-bold text-[15px] hover:underline">
                      {content.personalInfo.viewGiftCards}
                    </button>
                  </div>
                </div>
                <div className="bg-card p-8 rounded-[24px] border border-border/10 flex justify-between items-start shadow-sm transition-colors">
                  <div>
                    <h3 className="text-[18px] font-bold mb-2 text-foreground">{content.personalInfo.woltCredits}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {content.personalInfo.woltCreditsDesc}
                    </p>
                  </div>
                  <span className="text-muted-foreground font-bold">AZN {user?.credit?.toFixed(2) || "0.00"}</span>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <h2 className="text-[32px] font-black tracking-tight text-foreground">
                  {content.personalInfo.yourFavorites}
                </h2>
                <p className="text-muted-foreground max-w-[600px] leading-relaxed">
                  {content.personalInfo.favoritesDesc}
                </p>
                <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-2xl w-fit pr-8 cursor-pointer hover:bg-muted transition-all border border-border/10 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <Heart
                      className="text-red-500"
                      fill="currentColor"
                      size={20}
                    />
                  </div>
                  <span className="font-bold text-foreground">{content.personalInfo.favourite}</span>
                  <div className="ml-4 opacity-50 text-muted-foreground">
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
                  <h2 className="text-white text-[28px] font-bold leading-none mb-4">
                    {content.personalInfo.risingStar}
                  </h2>
                  <button className="flex items-center gap-2 text-white font-bold text-[18px] hover:underline">
                    {content.personalInfo.seeMore} <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === "Order history" ? (
          <div className="space-y-8">
            <div className="space-y-1">
              {orders.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                   <p className="text-lg font-medium">{content.orderHistory.noOrders}</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-6 px-4 hover:bg-muted/50 rounded-2xl transition-all group cursor-default"
                  >
                    <div className="flex items-center gap-8 flex-1" onClick={() => setSelectedOrderId(order.id)}>
                      <h3 className="text-[17px] font-bold text-foreground min-w-[280px] cursor-pointer group-hover:text-[#009de0]">
                        {order.storeName}
                      </h3>
                      <span className="text-muted-foreground text-[15px]">
                        {new Date(order.date).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={cn(
                        "text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg",
                        order.status === 'delivered' ? "bg-green-500/20 text-green-500" : "bg-[#009de0]/20 text-[#009de0]"
                      )}>
                        {order.status}
                      </span>
                      {order.status !== 'delivered' && (
                        <Link href={`/orders/${order.id}`} className="text-[#009de0] hover:underline text-sm font-bold">
                          {content.orderHistory.track}
                        </Link>
                      )}
                      <span className="text-muted-foreground font-bold text-[15px] min-w-[80px] text-right">
                        AZN {order.total.toFixed(2)}
                      </span>
                      <ChevronRight
                        size={20}
                        className="text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer"
                        onClick={() => setSelectedOrderId(order.id)}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex flex-col items-center gap-6 pt-8">
              <p className="text-gray-400 text-[15px]">
                {content.orderHistory.upToDate} 🥳
              </p>
              <button className="bg-[#009de0] hover:bg-[#0089c4] text-white px-8 py-3 rounded-xl font-bold transition-all w-fit">
                {content.orderHistory.loadMore}
              </button>
            </div>
          </div>
        ) : activeTab === "Payment methods" ? (
          <div className="space-y-10">
            <h2 className="text-[28px] font-black tracking-tight text-foreground">Payment methods</h2>

            {/* Credit and debit cards */}
            <div className="space-y-4">
              <h3 className="text-[16px] font-bold text-foreground">Credit and debit cards</h3>
              <button className="flex items-center gap-2 text-[#009de0] font-bold text-[15px] hover:underline transition-all">
                <Plus size={18} />
                Add new card
              </button>
            </div>

            <div className="border-t border-border/10" />

            {/* Other methods */}
            <div className="space-y-1">
              <h3 className="text-[16px] font-bold text-foreground mb-4">Other methods</h3>
              {[
                { name: "Apple Pay", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" },
                { name: "Google Pay", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" },
                { name: "Cash", emoji: "💵" },
              ].map((method) => (
                <div key={method.name} className="flex items-center justify-between py-4 border-b border-border/10 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-7 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                      {method.logo ? (
                        <img src={method.logo} alt={method.name} className="w-full h-full object-contain p-0.5" />
                      ) : (
                        <span className="text-base">{method.emoji}</span>
                      )}
                    </div>
                    <span className="font-bold text-foreground text-[15px]">{method.name}</span>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        ) : activeTab === "Addresses" ? (
          <div className="space-y-8">
            <div className="divide-y divide-border/10">
              {addresses.length === 0 && (
                <p className="text-muted-foreground text-center py-12">No saved addresses yet.</p>
              )}
              {addresses.map((addr: any, i: number) => (
                <div key={addr._id || i} className="flex items-center justify-between py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted border border-border/10 flex items-center justify-center text-muted-foreground">
                      {addr.name?.toLowerCase() === "home" ? <Home size={18} /> : <MapPin size={18} />}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-[15px]">{addr.name || "Address"}</p>
                      <p className="text-muted-foreground text-sm">{addr.details}</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center pt-4">
              <button
                onClick={() => {}}
                className="flex items-center gap-2 bg-[#009de0] hover:bg-[#0089c4] text-white font-bold px-8 py-3 rounded-xl transition-all"
              >
                <Plus size={18} />
                Add new address
              </button>
            </div>
          </div>

        ) : activeTab === "Loyalty cards" ? (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-6">
            <Image
              src="https://consumer-static-assets.wolt.com/frontpage-assets/loyalty-card-empty-state.png"
              alt="No loyalty cards"
              width={220}
              height={200}
              className="object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="space-y-2">
              <h2 className="text-[22px] font-black text-foreground">You haven&apos;t added any loyalty cards yet</h2>
              <p className="text-muted-foreground text-sm max-w-[360px] mx-auto">Add loyalty cards to collect points with your Wolt orders!</p>
            </div>
            <button className="flex items-center gap-2 bg-[#009de0] hover:bg-[#0089c4] text-white font-bold px-8 py-3 rounded-xl transition-all">
              <Plus size={18} />
              Add new card
            </button>
          </div>

        ) : activeTab === "Earn Wolt credits" ? (
          <div className="max-w-[600px] mx-auto flex flex-col items-center text-center gap-8 py-8">
            <Image
              src="https://consumer-static-assets.wolt.com/frontpage-assets/referral-illustration.png"
              alt="Earn credits"
              width={200}
              height={160}
              className="object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="space-y-4 w-full">
              <h2 className="text-[28px] font-black text-foreground">Invite friends and get discounts</h2>
              <div className="space-y-3 text-left">
                {[
                  "Your friends will get AZN 3.00 in Wolt credits when they use your code for each of their first 2 delivery orders.",
                  "You'll get AZN 3.00 in Wolt credits for each of your friend's first 2 delivery orders. You can earn a maximum of AZN 15.00 in credits by inviting your friends to join Wolt.",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#009de0] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
              <button className="text-[#009de0] font-bold text-sm hover:underline">How do referral codes work?</button>
            </div>

            <div className="w-full space-y-3">
              <p className="text-muted-foreground text-sm font-medium text-left">Your referral code</p>
              <div className="flex items-center justify-between bg-muted border border-border/10 rounded-xl px-4 py-3">
                <span className="font-black text-foreground tracking-widest">{referralCode}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(referralCode);
                    setCopiedReferral(true);
                    setTimeout(() => setCopiedReferral(false), 2000);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copiedReferral ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
              </div>
              <button className="text-[#009de0] font-bold text-sm hover:underline">Share your promo code</button>
            </div>
          </div>

        ) : activeTab === "Redeem code" ? (
          <div className="max-w-[500px] mx-auto flex flex-col items-center text-center gap-8 py-8">
            <Image
              src="https://consumer-static-assets.wolt.com/frontpage-assets/redeem-code-illustration.png"
              alt="Redeem code"
              width={220}
              height={180}
              className="object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="space-y-3">
              <h2 className="text-[28px] font-black text-foreground">Redeem code</h2>
              <p className="text-muted-foreground text-sm max-w-[360px] mx-auto">If you have a Wolt gift card or promo code, enter it below to claim your benefits!</p>
            </div>
            {redeemSuccess && (
              <div className="w-full p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm font-bold">{redeemSuccess}</div>
            )}
            <div className="flex gap-3 w-full">
              <input
                type="text"
                placeholder="Enter code..."
                value={redeemCodeInput}
                onChange={(e) => setRedeemCodeInput(e.target.value.toUpperCase())}
                className="flex-1 bg-muted border border-border/10 rounded-xl px-4 py-3 text-foreground font-bold focus:outline-none focus:border-[#009de0] transition-all placeholder:text-muted-foreground/50 tracking-widest"
              />
              <button
                disabled={!redeemCodeInput || isRedeeming}
                onClick={async () => {
                  setIsRedeeming(true);
                  try {
                    await api.PostData("/users/redeem-code", {
                      code: redeemCodeInput,
                      userId: user?.id || user?._id,
                      email: user?.email,
                    });
                    setRedeemSuccess("Code redeemed successfully!");
                    setRedeemCodeInput("");
                    setTimeout(() => setRedeemSuccess(""), 4000);
                  } catch {
                    setRedeemSuccess("");
                    alert("Invalid or expired code.");
                  } finally {
                    setIsRedeeming(false);
                  }
                }}
                className="bg-[#009de0] hover:bg-[#0089c4] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-all"
              >
                {isRedeeming ? "Redeeming..." : "Redeem"}
              </button>
            </div>
          </div>


        ) : activeTab === "Settings" ? (
          <div className="max-w-[800px] space-y-0 divide-y divide-border/10">
            {/* Country */}
            <div className="flex items-start justify-between py-6">
              <div className="space-y-1">
                <p className="font-bold text-foreground text-[15px]">Country</p>
                <p className="text-[#009de0] text-sm">The selected country determines the currency of your referral code</p>
              </div>
              <div className="relative">
                <select
                  defaultValue="Azerbaijan"
                  className="appearance-none bg-muted border border-border/20 text-foreground font-bold px-4 py-2 pr-8 rounded-xl focus:outline-none focus:border-[#009de0] transition-all cursor-pointer"
                >
                  <option>Azerbaijan</option>
                  <option>Turkey</option>
                  <option>Germany</option>
                  <option>United States</option>
                </select>
                <ChevronRight size={16} className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between py-5">
              <p className="font-bold text-foreground text-[15px]">Email</p>
              <p className="text-[#009de0] font-medium text-[15px]">{user?.email}</p>
            </div>

            {/* Mobile number */}
            <div className="flex items-center justify-between py-5">
              <p className="font-bold text-foreground text-[15px]">Mobile number</p>
              <p className="text-[#009de0] font-medium text-[15px]">{user?.phoneNumber || "—"}</p>
            </div>

            {/* Name */}
            <div className="flex items-center justify-between py-5">
              <p className="font-bold text-foreground text-[15px]">Name</p>
              <p className="text-[#009de0] font-medium text-[15px]">{user?.firstName} {user?.lastName}</p>
            </div>

            {/* Delete account */}
            <div className="flex items-center justify-between py-5">
              <p className="font-bold text-foreground text-[15px]">Delete account</p>
              <button className="text-red-500 font-bold text-[15px] hover:underline transition-colors">Delete</button>
            </div>

            {/* Send receipts */}
            <div className="flex items-center justify-between py-5">
              <p className="font-bold text-foreground text-[15px]">Send receipts to email</p>
              <button
                onClick={() => setSendReceipts(!sendReceipts)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
                  sendReceipts ? "bg-[#009de0]" : "bg-muted border border-border/20"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                    sendReceipts ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Clear auto-translation */}
            <div className="flex items-center justify-between py-5">
              <p className="font-bold text-foreground text-[15px]">Clear auto-translation settings</p>
              <button className="text-[#009de0] font-bold text-[15px] hover:underline transition-colors">Reset</button>
            </div>

            {/* Clear age data */}
            <div className="flex items-center justify-between py-5">
              <p className="font-bold text-foreground text-[15px]">Clear age data</p>
              <button className="text-[#009de0] font-bold text-[15px] hover:underline transition-colors">Clear</button>
            </div>

            {/* Log out */}
            <div className="flex items-center justify-between py-5">
              <p className="font-bold text-foreground text-[15px]">Log out of Wolt</p>
              <button
                onClick={() => { if (typeof window !== 'undefined') { localStorage.removeItem('wolt_user'); localStorage.removeItem('wolt_token'); window.location.href = '/'; } }}
                className="text-[#009de0] font-bold text-[15px] hover:underline transition-colors"
              >Log out</button>
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between py-5">
              <p className="font-bold text-foreground text-[15px]">Theme</p>
              <div className="flex rounded-xl border border-border/20 overflow-hidden">
                {(["auto", "light", "dark", "high-contrast"] as const).map((t, i) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-4 py-2 text-sm font-bold transition-all capitalize ${
                      currentTheme === t
                        ? "bg-transparent border border-[#009de0] text-foreground"
                        : "bg-transparent text-muted-foreground hover:text-foreground"
                    } ${i > 0 ? "border-l border-border/20" : ""}`}
                  >
                    {t === "high-contrast" ? "High Contrast" : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <History size={48} className="mb-4 opacity-20" />
            <p className="text-[18px] font-medium">
              {content.orderHistory.emptySection}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
