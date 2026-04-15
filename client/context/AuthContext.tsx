"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import api from "@/services/api";
import { AuthContextType, User } from "@/types/global";



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("wolt_user");
        const token = localStorage.getItem("wolt_token");
        
        if (storedUser && token) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            // Sync with server to get latest verification status/credits
            if (parsedUser.email) {
                api.getData(`/users/me?email=${parsedUser.email}`)
                    .then(freshUser => {
                        if (freshUser) {
                            setUser(freshUser);
                            localStorage.setItem("wolt_user", JSON.stringify(freshUser));
                        }
                    })
                    .catch(err => console.error("Failed to sync user data:", err));
            }
        }
    }, []);

    const login = useCallback(async (email: string, password?: string) => {
        try {
            const res = await api.PostData("/users/login", { email, password });
            const { user, access_token } = res;
            setUser(user);
            localStorage.setItem("wolt_user", JSON.stringify(user));
            localStorage.setItem("wolt_token", access_token);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }, []);

    const loginWithSocial = useCallback(async (data: any) => {
        try {
            const res = await api.PostData("/users/social-login", data);
            const { user, access_token } = res;
            setUser(user);
            localStorage.setItem("wolt_user", JSON.stringify(user));
            localStorage.setItem("wolt_token", access_token);
        } catch (error) {
            console.error("Social login failed:", error);
            throw error;
        }
    }, []);

    const loginWithToken = useCallback((token: string, user: User) => {
        setUser(user);
        localStorage.setItem("wolt_user", JSON.stringify(user));
        localStorage.setItem("wolt_token", token);
    }, []);

    const signup = useCallback(async (userData: any) => {
        try {
            const res = await api.PostData("/users/signup", userData);
            // If account requires verification, return the flag for the UI to handle
            return res;
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;
        }
    }, []);

    const verifyEmail = useCallback(async (email: string, code: string) => {
        try {
            const res = await api.PostData("/users/verify-email", { email, code });
            const { user, access_token } = res;
            setUser(user);
            localStorage.setItem("wolt_user", JSON.stringify(user));
            localStorage.setItem("wolt_token", access_token);
        } catch (error) {
            console.error("Email verification failed:", error);
            throw error;
        }
    }, []);

    const resendCode = useCallback(async (email: string) => {
        try {
            await api.PostData("/users/resend-code", { email });
        } catch (error) {
            console.error("Resend code failed:", error);
            throw error;
        }
    }, []);

    const changeEmail = useCallback(async (oldEmail: string, newEmail: string) => {
        try {
            const res = await api.PostData("/users/change-email", { oldEmail, newEmail });
            return res;
        } catch (error) {
            console.error("Change email failed:", error);
            throw error;
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("wolt_user");
        localStorage.removeItem("wolt_token");
    }, []);

    const forgotPassword = useCallback(async (email: string) => {
        try {
            const res = await api.PostData("/users/forgot-password", { email });
            return res;
        } catch (error) {
            console.error("Forgot password failed:", error);
            throw error;
        }
    }, []);

    const resetPassword = useCallback(async (data: any) => {
        try {
            const res = await api.PostData("/users/reset-password", data);
            return res;
        } catch (error) {
            console.error("Reset password failed:", error);
            throw error;
        }
    }, []);

    const updateProfile = useCallback(async (data: any) => {
        try {
            // Include user identifier if not present
            const payload = { ...data, userId: user?.id || user?._id, email: user?.email };
            const res = await api.PatchData("/users/update-profile", payload);
            
            // Update local user state
            setUser(res);
            localStorage.setItem("wolt_user", JSON.stringify(res));
            return res;
        } catch (error) {
            console.error("Update profile failed:", error);
            throw error;
        }
    }, [user]);

    const requestProfileVerification = useCallback(async (method: 'email' | 'phone') => {
        try {
            const res = await api.PostData("/users/request-profile-verification", { userId: user?.id || user?._id, email: user?.email, method });
            return res;
        } catch (error) {
            console.error("Request profile verification failed:", error);
            throw error;
        }
    }, [user]);

    const verifyProfileMethod = useCallback(async (method: 'email' | 'phone', code: string) => {
        try {
            const updatedUser = await api.PostData("/users/verify-profile-method", { userId: user?.id || user?._id, email: user?.email, method, code });
            setUser(updatedUser);
            localStorage.setItem("wolt_user", JSON.stringify(updatedUser));
            return updatedUser;
        } catch (error) {
            console.error("Verify profile method failed:", error);
            throw error;
        }
    }, [user]);

    const contextValue = useMemo(() => ({
        user,
        isLoggedIn: !!user,
        login,
        loginWithSocial,
        loginWithToken,
        signup,
        verifyEmail,
        resendCode,
        changeEmail,
        forgotPassword,
        resetPassword,
        updateProfile,
        requestProfileVerification,
        verifyProfileMethod,
        logout
    }), [user, login, loginWithSocial, loginWithToken, signup, verifyEmail, resendCode, changeEmail, forgotPassword, resetPassword, updateProfile, requestProfileVerification, verifyProfileMethod, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
