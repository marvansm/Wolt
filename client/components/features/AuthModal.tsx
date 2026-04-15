"use client";

import React, { useRef, useState, useMemo } from "react";
import { X, ChevronDown, Mail, RefreshCw, Pencil, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { useIntlayer } from "react-intlayer";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
    const content = useIntlayer("auth");
    
    if (!content) return null;
    const modalRef = useRef<HTMLDivElement>(null);
    const { signup, login, verifyEmail, resendCode, changeEmail, forgotPassword, resetPassword } = useAuth();
    const [step, setStep] = useState(1);
    const [loadingAction, setLoadingAction] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pendingEmail, setPendingEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [resendCooldown, setResendCooldown] = useState(0);
    const [editingEmail, setEditingEmail] = useState(false);
    const [newEmailInput, setNewEmailInput] = useState("");
    const [emailEditError, setEmailEditError] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        country: "Azerbaijan",
        phonePrefix: "AZ +994",
        phoneNumber: "",
    });

    // Dynamic validation schemas
    const step1Schema = useMemo(() => yup.object().shape({
        email: yup.string().email(content.validation.invalidEmail as any).required(content.validation.emailRequired as any),
    }), [content]);

    const loginSchema = useMemo(() => yup.object().shape({
        password: yup.string().required(content.validation.passwordRequired as any),
    }), [content]);

    const signupSchema = useMemo(() => yup.object().shape({
        firstName: yup.string().min(2, String(content.validation.minChar).replace("{count}", "2")).required(content.validation.firstNameRequired as any),
        lastName: yup.string().min(2, String(content.validation.minChar).replace("{count}", "2")).required(content.validation.lastNameRequired as any),
        password: yup.string().min(6, String(content.validation.minChar).replace("{count}", "6")).required(content.validation.passwordRequired as any),
        phoneNumber: yup.string().min(7, content.validation.invalidPhone as any).required(content.validation.phoneRequired as any),
    }), [content]);

    const startResendCooldown = () => {
        setResendCooldown(60);
        const timer = setInterval(() => {
            setResendCooldown(prev => {
                if (prev <= 1) { clearInterval(timer); return 0; }
                return prev - 1;
            });
        }, 1000);
    };

    const handleSaveEmail = async () => {
        if (!newEmailInput || !/\S+@\S+\.\S+/.test(newEmailInput)) {
            setEmailEditError(content.validation.invalidEmail as any);
            return;
        }
        if (newEmailInput === pendingEmail) {
            setEditingEmail(false);
            return;
        }
        setLoadingAction('change-email');
        try {
            const res = await changeEmail(pendingEmail, newEmailInput);
            setPendingEmail(res.email);
            setEditingEmail(false);
            setEmailEditError("");
            startResendCooldown();
            setVerificationCode("");
            setErrors({});
        } catch (error: any) {
            const msg = error.response?.data?.message;
            setEmailEditError(msg === 'This email is already registered'
                ? (content.messages.emailExists as any)
                : msg || (content.messages.generalError as any));
        } finally {
            setLoadingAction(null);
        }
    };

    const handleNext = async () => {
        setErrors({});
        try {
            if (step === 1) {
                await step1Schema.validate({ email }, { abortEarly: false });
                setLoadingAction("next");
                setStep(2);
            } else if (mode === "signup" && step === 2) {
                await signupSchema.validate({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    password,
                    phoneNumber: formData.phoneNumber
                }, { abortEarly: false });
                setLoadingAction("signup");
                const res = await signup({ email, password, ...formData });
                if (res?.requiresVerification) {
                    setPendingEmail(res.email);
                    startResendCooldown();
                    setStep(3);
                } else {
                    onClose();
                }
            } else if (mode === "login" && step === 2) {
                await loginSchema.validate({ password }, { abortEarly: false });
                setLoadingAction("login");
                await login(email, password);
                onClose();
            }
        } catch (error: any) {
            if (error instanceof yup.ValidationError) {
                const newErrors: Record<string, string> = {};
                error.inner.forEach((err) => {
                    if (err.path) newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
            } else {
                const backendMessage = error.response?.data?.message;
                const status = error.response?.status;

                if (backendMessage === "User not found") {
                    setErrors({ email: content.messages.userNotFound as any });
                } else if (
                    backendMessage === "This email is already registered" ||
                    backendMessage === "An account with this email already exists" ||
                    status === 409
                ) {
                    setErrors({ email: content.messages.emailExists as any });
                } else if (backendMessage === "Invalid credentials" || status === 401) {
                    if (step === 2) {
                        setErrors({ password: content.messages.incorrectPassword as any });
                    } else {
                        setErrors({ general: content.messages.incorrectPassword as any });
                    }
                } else if (typeof backendMessage === "string") {
                    setErrors({ general: backendMessage });
                } else {
                    setErrors({ general: content.messages.generalError as any });
                }
            }
        } finally {
            setLoadingAction(null);
        }
    };

    const handleVerify = async () => {
        setErrors({});
        if (!verificationCode || verificationCode.length !== 6) {
            setErrors({ code: content.validation.enter6Digit as any });
            return;
        }
        setLoadingAction("verify");
        try {
            await verifyEmail(pendingEmail, verificationCode);
            onClose();
        } catch (error: any) {
            const backendMessage = error.response?.data?.message;
            setErrors({ code: backendMessage === "Invalid verification code"
                ? (content.messages.incorrectCode as any)
                : (content.messages.generalError as any)
            });
        } finally {
            setLoadingAction(null);
        }
    };

    const handleResendCode = async () => {
        if (resendCooldown > 0) return;
        setLoadingAction("resend");
        try {
            await resendCode(pendingEmail);
            startResendCooldown();
            setErrors({});
        } catch {
            setErrors({ general: content.messages.generalError as any });
        } finally {
            setLoadingAction(null);
        }
    };

    const handleForgotPassword = async () => {
        setLoadingAction("forgot-password");
        setErrors({});
        try {
            await forgotPassword(email);
            setPendingEmail(email);
            setStep(5);
            startResendCooldown();
        } catch (error: any) {
            const msg = error.response?.data?.message;
            setErrors({ email: msg || (content.messages.generalError as any) });
        } finally {
            setLoadingAction(null);
        }
    };

    const handleResetPassword = async () => {
        if (!resetCode || resetCode.length !== 6) {
            setErrors({ code: content.validation.enter6Digit as any });
            return;
        }
        if (!newPassword || newPassword.length < 6) {
            setErrors({ newPassword: (content.validation.passwordMin6 as any) });
            return;
        }
        setLoadingAction("reset-password");
        setErrors({});
        try {
            await resetPassword({ email: pendingEmail, code: resetCode, newPassword });
            setStep(2);
            setPassword("");
            setSuccess(content.messages.passwordUpdated as any);
            setTimeout(() => setSuccess(""), 5000);
        } catch (error: any) {
            const msg = error.response?.data?.message;
            setErrors({ code: msg || (content.messages.generalError as any) });
        } finally {
            setLoadingAction(null);
        }
    };

    const handleSocialLogin = (provider: 'google' | 'github') => {
        setLoadingAction(provider);
        window.location.href = `http://localhost:5000/auth/${provider}`;
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (step === 3) handleVerify();
            else handleNext();
        }
    };

    const clearError = (field: string) => {
        if (errors[field]) {
            setErrors(prev => {
                const updated = { ...prev };
                delete updated[field];
                return updated;
            });
        }
        if (errors.general) setErrors(prev => ({ ...prev, general: "" }));
    };

    const getTitle = () => {
        if (step === 3) return content.titles.confirmEmail;
        if (step === 5) return content.titles.resetPassword;
        if (mode === "login") return step === 1 ? content.titles.loginWolt : content.titles.enterPassword;
        return step === 1 ? content.titles.createAccount : content.titles.completeProfile;
    };

    // Shared input class
    const inputBase = "w-full h-14 rounded-xl px-4 text-[16px] focus:outline-none transition-all bg-gray-100 dark:bg-[#262626] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500";
    const inputBorder = (hasError: boolean) =>
        hasError
            ? "border border-red-500 focus:border-red-500"
            : "border border-gray-200 dark:border-white/10 focus:border-[#009de0]";

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="bg-white dark:bg-[#1a1a1a] w-full max-w-[500px] rounded-[24px] overflow-hidden shadow-2xl relative flex flex-col p-8"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                        >
                            <X className="text-gray-700 dark:text-white" size={20} />
                        </button>

                        <h2 className="text-[32px] font-bold text-gray-900 dark:text-white mb-8 tracking-tight mt-4">
                            {getTitle() as any}
                        </h2>

                        {errors.general && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium">
                                {errors.general}
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm font-medium">
                                {success}
                            </div>
                        )}

                        <AnimatePresence mode="wait">
                            {/* ─── STEP 3: EMAIL VERIFICATION ─── */}
                            {step === 3 ? (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="flex flex-col items-center text-center space-y-3 py-2">
                                        <div className="w-16 h-16 rounded-full bg-[#009de0]/10 flex items-center justify-center">
                                            <Mail size={32} className="text-[#009de0]" />
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed">
                                            {content.messages.sentCodeTo as any}
                                        </p>

                                        {editingEmail ? (
                                            <div className="w-full space-y-2">
                                                <input
                                                    type="email"
                                                    value={newEmailInput}
                                                    onChange={(e) => { setNewEmailInput(e.target.value); setEmailEditError(""); }}
                                                    className={`w-full h-12 rounded-xl px-4 text-[15px] text-center focus:outline-none transition-all bg-gray-100 dark:bg-[#262626] text-gray-900 dark:text-white ${
                                                        emailEditError ? 'border border-red-500' : 'border border-[#009de0] focus:border-[#009de0]'
                                                    }`}
                                                    placeholder={content.labels.email as any}
                                                    autoFocus
                                                    onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEmail(); if (e.key === 'Escape') setEditingEmail(false); }}
                                                />
                                                {emailEditError && <p className="text-red-500 text-xs font-medium">{emailEditError}</p>}
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={handleSaveEmail}
                                                        loading={loadingAction === 'change-email'}
                                                        disabled={loadingAction !== null && loadingAction !== 'change-email'}
                                                        className="flex-1 h-10 bg-[#009de0] rounded-xl text-white font-bold text-sm hover:bg-[#0089c4] transition-all"
                                                    >
                                                        <Check size={16} className="mr-1" /> {content.buttons.save as any}
                                                    </Button>
                                                    <button
                                                        onClick={() => { setEditingEmail(false); setEmailEditError(""); }}
                                                        className="flex-1 h-10 bg-gray-100 dark:bg-white/10 rounded-xl text-gray-700 dark:text-white font-bold text-sm hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
                                                    >
                                                        {content.buttons.cancel as any}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => { setNewEmailInput(pendingEmail); setEditingEmail(true); setEmailEditError(""); }}
                                                className="flex items-center gap-2 text-gray-900 dark:text-white font-bold hover:text-[#009de0] transition-colors group"
                                            >
                                                <span>{pendingEmail}</span>
                                                <Pencil size={14} className="text-gray-400 group-hover:text-[#009de0] transition-colors" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className={`font-bold text-[16px] ${errors.code ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                                            {content.labels.verificationCode as any}
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={6}
                                            value={verificationCode}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                setVerificationCode(val);
                                                clearError('code');
                                            }}
                                            onKeyDown={handleKeyDown}
                                            className={`${inputBase} text-[24px] font-bold text-center tracking-[0.5em] placeholder:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-base placeholder:tracking-normal ${inputBorder(!!errors.code)}`}
                                            placeholder="000000"
                                            autoFocus
                                        />
                                        {errors.code && <p className="text-red-500 text-xs mt-1 font-medium">{errors.code}</p>}
                                    </div>

                                    <Button
                                        onClick={handleVerify}
                                        loading={loadingAction === 'verify'}
                                        disabled={loadingAction !== null && loadingAction !== 'verify'}
                                        className="w-full h-14 bg-[#009de0] rounded-xl text-white font-bold text-[16px] hover:bg-[#0089c4] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        {content.buttons.verifyContinue as any}
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">{content.messages.didntReceive as any}</span>
                                        <button
                                            onClick={handleResendCode}
                                            disabled={resendCooldown > 0 || loadingAction === 'resend'}
                                            className="text-[#009de0] font-bold hover:underline disabled:opacity-40 disabled:no-underline flex items-center gap-1 transition-all"
                                        >
                                            {loadingAction === 'resend' ? (
                                                <RefreshCw size={14} className="animate-spin" />
                                            ) : null}
                                            {resendCooldown > 0 ? `${content.buttons.resendIn as any} ${resendCooldown}s` : (content.buttons.resendCode as any)}
                                        </button>
                                    </div>
                                </motion.div>
                            ) : step === 1 ? (
                                /* ─── STEP 1: EMAIL ─── */
                                <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div className="space-y-3">
                                        <Button
                                            onClick={() => handleSocialLogin('google')}
                                            loading={loadingAction === 'google'}
                                            disabled={loadingAction !== null && loadingAction !== 'google'}
                                            className="w-full h-14 bg-gray-100 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-200 dark:hover:bg-white/5 transition-all text-gray-900 dark:text-white font-bold"
                                        >
                                            {!loadingAction || loadingAction !== 'google' ? (
                                                <>
                                                    <svg viewBox="0 0 24 24" width="20" height="20" className="mr-2">
                                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                    </svg>
                                                    {content.social.google}
                                                </>
                                            ) : content.social.connectingGoogle}
                                        </Button>

                                        <Button
                                            onClick={() => handleSocialLogin('github')}
                                            loading={loadingAction === 'github'}
                                            disabled={loadingAction !== null && loadingAction !== 'github'}
                                            className="w-full h-14 bg-[#24292e] rounded-xl flex items-center justify-center gap-3 hover:bg-[#1b1f23] transition-all text-white font-bold"
                                        >
                                            {!loadingAction || loadingAction !== 'github' ? (
                                                <>
                                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                    </svg>
                                                    {content.social.github}
                                                </>
                                            ) : content.social.connectingGithub}
                                        </Button>
                                    </div>

                                    <div className="relative flex items-center py-8">
                                        <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
                                        <span className="flex-shrink mx-4 text-gray-400 text-sm">{content.social.orEmail}</span>
                                        <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className={`font-bold text-[16px] ${errors.email ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{content.labels.enterEmail as any}</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                                                onKeyDown={handleKeyDown}
                                                className={`${inputBase} ${inputBorder(!!errors.email)}`}
                                                placeholder="Example: name@email.com"
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                                        </div>
                                        <Button
                                            onClick={handleNext}
                                            loading={loadingAction === 'next'}
                                            disabled={loadingAction !== null && loadingAction !== 'next'}
                                            className="w-full h-14 bg-[#009de0] rounded-xl text-white font-bold text-[16px] hover:bg-[#0089c4] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            {content.buttons.next as any}
                                        </Button>
                                    </div>
                                </motion.div>
                            ) : step === 2 && mode === "login" ? (
                                /* ─── STEP 2: LOGIN PASSWORD ─── */
                                <motion.div key="step2-login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className={`font-bold text-[16px] ${errors.password ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{content.labels.password as any}</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
                                            onKeyDown={handleKeyDown}
                                            className={`${inputBase} ${inputBorder(!!errors.password)}`}
                                            placeholder={content.labels.enterPassword as any}
                                            autoFocus
                                        />
                                        {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
                                    </div>
                                    <Button
                                        onClick={handleNext}
                                        disabled={loadingAction !== null && loadingAction !== 'login'}
                                        loading={loadingAction === 'login'}
                                        className="w-full h-14 bg-[#009de0] rounded-xl text-white font-bold text-[16px] hover:bg-[#0089c4] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        {content.buttons.login as any}
                                    </Button>
                                    <button
                                        onClick={handleForgotPassword}
                                        className="w-full text-center text-[#009de0] font-bold hover:underline"
                                    >
                                        {content.buttons.forgotPassword as any}
                                    </button>
                                    <button
                                        onClick={() => setStep(1)}
                                        className="w-full text-center text-gray-400 font-bold hover:underline text-sm"
                                    >
                                        {content.buttons.backToEmail as any}
                                    </button>
                                </motion.div>
                            ) : step === 5 ? (
                                /* ─── STEP 5: RESET PASSWORD ─── */
                                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <div className="text-center space-y-2 mb-4">
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">{content.messages.sentResetCodeTo as any} <span className="text-gray-900 dark:text-white font-bold">{pendingEmail}</span></p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className={`font-bold text-[14px] ${errors.code ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{content.labels.resetCode as any}</label>
                                            <input
                                                type="text"
                                                maxLength={6}
                                                value={resetCode}
                                                onChange={(e) => { setResetCode(e.target.value.replace(/\D/g, '')); clearError('code'); }}
                                                className={`${inputBase} text-center tracking-[0.5em] ${inputBorder(!!errors.code)}`}
                                                placeholder="000000"
                                            />
                                            {errors.code && <p className="text-red-500 text-xs font-medium">{errors.code}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className={`font-bold text-[14px] ${errors.newPassword ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{content.labels.newPassword as any}</label>
                                            <input
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => { setNewPassword(e.target.value); clearError('newPassword'); }}
                                                className={`${inputBase} ${inputBorder(!!errors.newPassword)}`}
                                                placeholder={content.labels.enterPassword as any}
                                            />
                                            {errors.newPassword && <p className="text-red-500 text-xs font-medium">{errors.newPassword}</p>}
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleResetPassword}
                                        loading={loadingAction === 'reset-password'}
                                        disabled={loadingAction !== null && loadingAction !== 'reset-password'}
                                        className="w-full h-14 bg-[#009de0] rounded-xl text-white font-bold text-[16px] hover:bg-[#0089c4] transition-all"
                                    >
                                        {content.buttons.resetPassword as any}
                                    </Button>
                                    <button
                                        onClick={() => setStep(2)}
                                        className="w-full text-center text-[#009de0] font-bold hover:underline"
                                    >
                                        {content.buttons.backToLogin as any}
                                    </button>
                                </motion.div>
                            ) : (
                                /* ─── STEP 2: SIGNUP PROFILE ─── */
                                <motion.div key="step2-signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className={`font-bold text-[14px] ${errors.firstName ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{content.labels.firstName as any}</label>
                                            <input
                                                type="text"
                                                placeholder={content.labels.firstName as any}
                                                onKeyDown={handleKeyDown}
                                                className={`${inputBase} ${inputBorder(!!errors.firstName)}`}
                                                onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }); clearError('firstName'); }}
                                            />
                                            {errors.firstName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.firstName}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className={`font-bold text-[14px] ${errors.lastName ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{content.labels.lastName as any}</label>
                                            <input
                                                type="text"
                                                placeholder={content.labels.lastName as any}
                                                onKeyDown={handleKeyDown}
                                                className={`${inputBase} ${inputBorder(!!errors.lastName)}`}
                                                onChange={(e) => { setFormData({ ...formData, lastName: e.target.value }); clearError('lastName'); }}
                                            />
                                            {errors.lastName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.lastName}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className={`font-bold text-[14px] ${errors.password ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{content.labels.password as any}</label>
                                        <input
                                            type="password"
                                            placeholder={content.labels.createPassword as any}
                                            onKeyDown={handleKeyDown}
                                            className={`${inputBase} ${inputBorder(!!errors.password)}`}
                                            onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
                                        />
                                        {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex gap-4">
                                            <div className="flex-[0.35] space-y-2">
                                                <label className="font-bold text-[14px] text-gray-900 dark:text-white">{content.labels.prefix as any}</label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.phonePrefix}
                                                        onChange={(e) => setFormData({ ...formData, phonePrefix: e.target.value })}
                                                        className="w-full h-14 bg-gray-100 dark:bg-[#262626] border border-gray-200 dark:border-white/10 rounded-xl px-4 text-gray-900 dark:text-white text-[16px] appearance-none focus:outline-none focus:border-[#009de0] transition-all pr-10"
                                                    >
                                                        <option value="AZ +994">AZ +994</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                </div>
                                            </div>
                                            <div className="flex-[0.65] space-y-2">
                                                <label className={`font-bold text-[14px] ${errors.phoneNumber ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{content.labels.phoneNumber as any}</label>
                                                <input
                                                    type="tel"
                                                    onKeyDown={handleKeyDown}
                                                    className={`${inputBase} ${inputBorder(!!errors.phoneNumber)}`}
                                                    onChange={(e) => { setFormData({ ...formData, phoneNumber: e.target.value }); clearError('phoneNumber'); }}
                                                />
                                            </div>
                                        </div>
                                        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phoneNumber}</p>}
                                    </div>

                                    <div className="space-y-4 pt-2">
                                        <div className="flex gap-3 items-start">
                                            <div className="mt-1">
                                                <input type="checkbox" className="w-5 h-5 accent-[#009de0] rounded bg-transparent border-gray-300 dark:border-white/10" />
                                            </div>
                                            <p className="text-gray-600 dark:text-white text-[14px] leading-tight opacity-70">
                                                {content.messages.agreeTo as any} <span className="text-[#009de0]">{content.messages.userTerms as any}</span> and <span className="text-[#009de0]">{content.messages.privacyStatement as any}</span>.
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleNext}
                                        disabled={loadingAction !== null && loadingAction !== 'signup'}
                                        loading={loadingAction === 'signup'}
                                        className="w-full h-14 bg-[#009de0] rounded-xl text-white font-bold text-[16px] hover:bg-[#0089c4] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
                                    >
                                        {content.buttons.createAccount as any}
                                    </Button>
                                    <button
                                        onClick={() => setStep(1)}
                                        className="w-full text-center text-[#009de0] font-bold hover:underline"
                                    >
                                        {content.buttons.back as any}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {step !== 3 && (
                            <div className="mt-8 text-center">
                                <p className="text-gray-400 text-[13px] leading-relaxed">
                                    {content.messages.processedData as any}
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
