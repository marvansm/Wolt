"use client";

import React, { useRef } from "react";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const { signup, login } = useAuth();
    const [step, setStep] = React.useState(1);
    const [email, setEmail] = React.useState("");
    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        country: "Azerbaijan",
        phonePrefix: "AZ +994",
        phoneNumber: "",
    });

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    const handleNext = async () => {
        if (mode === "signup" && step === 1) {
            setStep(2);
        } else if (mode === "signup" && step === 2) {
            await signup({ email, ...formData });
            onClose();
        } else {
            login(email);
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
                        className="bg-[#1a1a1a] w-full max-w-[500px] rounded-[24px] overflow-hidden shadow-2xl relative flex flex-col p-8"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                        >
                            <X className="text-white" size={20} />
                        </button>

                        <h2 className="text-[32px] font-bold text-white mb-8 tracking-tight mt-4">
                            {mode === "login"
                                ? "Log in to Wolt"
                                : step === 1 ? "Create a Wolt account" : "Create an account"
                            }
                        </h2>

                        {step === 1 ? (
                            <>
                                <div className="space-y-3">
                                    <button className="w-full h-14 bg-black border border-white/10 rounded-xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all">
                                        <svg viewBox="0 0 24 24" width="20" height="20" className="mr-2">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        <span className="text-white font-bold text-[16px]">Continue with Google</span>
                                    </button>

                                    <button className="w-full h-14 bg-white rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all">
                                        <svg viewBox="0 0 384 512" width="20" height="20" className="mr-2">
                                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-43.8-22.1-75.3-21.3-40.7 1-78.2 24.4-99.3 62-43 76-11 187.7 30 248.3 20.5 29.8 45.4 63.3 77.4 62 31.5-1.3 43.1-20.3 81-20.3 37.9 0 49.3 20.3 81.8 19.7 33-1 57.3-30.8 77.7-60.6 23.3-34.1 32.9-67 33.3-68.7-.8-.4-64.6-24.9-64.7-98.8zM240.3 103.4c16.1-20.1 27-48.1 24-76-23.9 1-52.7 16.4-69.8 36.4-15.3 18-28.5 46.2-25.5 73.1 26.6 2.1 54.1-12.2 71.3-33.5z" />
                                        </svg>
                                        <span className="text-black font-bold text-[16px]">Continue with Apple</span>
                                    </button>

                                    <button className="w-full h-14 bg-[#1877F2] rounded-xl flex items-center justify-center gap-3 hover:bg-[#166fe5] transition-all">
                                        <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2">
                                            <path fill="white" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        <span className="text-white font-bold text-[16px]">Continue with Facebook</span>
                                    </button>
                                </div>

                                <div className="relative flex items-center py-8">
                                    <div className="flex-grow border-t border-white/10"></div>
                                    <span className="flex-shrink mx-4 text-gray-400 text-sm">or continue with email</span>
                                    <div className="flex-grow border-t border-white/10"></div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-white font-bold text-[16px]">Enter your email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full h-14 bg-[#262626] border border-white/10 rounded-xl px-4 text-white text-[16px] placeholder:text-gray-500 focus:outline-none focus:border-[#009de0] transition-all"
                                            placeholder="Example: name@email.com"
                                        />
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        disabled={!email}
                                        className="w-full h-14 bg-[#009de0] rounded-xl text-white font-bold text-[16px] hover:bg-[#0089c4] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-gray-400 text-[14px] font-medium">Country</label>
                                    <div className="relative">
                                        <select
                                            value={formData.country}
                                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                            className="w-full h-14 bg-[#262626] border border-white/10 rounded-xl px-4 text-white text-[16px] appearance-none focus:outline-none focus:border-[#009de0] transition-all"
                                        >
                                            <option value="Azerbaijan">Azerbaijan</option>
                                            <option value="Turkey">Turkey</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-white font-bold text-[14px]">First name</label>
                                        <input
                                            type="text"
                                            placeholder="First name"
                                            className="w-full h-14 bg-[#262626] border border-white/10 rounded-xl px-4 text-white text-[16px] placeholder:text-gray-500 focus:outline-none focus:border-[#009de0] transition-all"
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white font-bold text-[14px]">Last name</label>
                                        <input
                                            type="text"
                                            placeholder="Last name"
                                            className="w-full h-14 bg-[#262626] border border-white/10 rounded-xl px-4 text-white text-[16px] placeholder:text-gray-500 focus:outline-none focus:border-[#009de0] transition-all"
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex gap-4">
                                        <div className="flex-[0.35] space-y-2">
                                            <label className="text-white font-bold text-[14px]">Country</label>
                                            <div className="relative">
                                                <select
                                                    value={formData.phonePrefix}
                                                    onChange={(e) => setFormData({ ...formData, phonePrefix: e.target.value })}
                                                    className="w-full h-14 bg-[#262626] border border-white/10 rounded-xl px-4 text-white text-[16px] appearance-none focus:outline-none focus:border-[#009de0] transition-all pr-10"
                                                >
                                                    <option value="AZ +994">AZ +994</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            </div>
                                        </div>
                                        <div className="flex-[0.65] space-y-2">
                                            <label className="text-white font-bold text-[14px]">Phone number</label>
                                            <input
                                                type="tel"
                                                className="w-full h-14 bg-[#262626] border border-white/10 rounded-xl px-4 text-white text-[16px] focus:outline-none focus:border-[#009de0] transition-all"
                                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-[12px]">We'll only use your number if we need to contact you about your order.</p>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <div className="flex gap-3 items-start">
                                        <div className="mt-1">
                                            <input type="checkbox" className="w-5 h-5 accent-[#009de0] rounded bg-transparent border-white/10" />
                                        </div>
                                        <p className="text-white text-[14px] leading-tight">
                                            I've read and agree with the <span className="text-[#009de0]">User Terms of Service</span>. I understand that my personal data will be processed in accordance with Wolt's <span className="text-[#009de0]">Privacy Statement</span>.
                                            <br />
                                            <span className="text-[#009de0] text-[13px] block mt-1">Read more</span>
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <div className="mt-1">
                                            <input type="checkbox" className="w-5 h-5 accent-[#009de0] rounded bg-transparent border-white/10" />
                                        </div>
                                        <p className="text-white text-[14px] leading-tight">
                                            Wolt can transfer my personal data that Wolt has collected and processed to countries outside Azerbaijan.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleNext}
                                    className="w-full h-14 bg-[#009de0] rounded-xl text-white font-bold text-[16px] hover:bg-[#0089c4] transition-all mt-4"
                                >
                                    Next
                                </button>
                            </div>
                        )}

                        <div className="mt-8 text-center">
                            <p className="text-gray-400 text-[13px] leading-relaxed">
                                Please visit{" "}
                                <a href="#" className="text-[#009de0] hover:underline transition-all">
                                    Wolt Privacy Statement
                                </a>{" "}
                                to learn about personal data processing at Wolt.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
