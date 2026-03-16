"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/services/api";
import { AuthContextType, User } from "@/types/global";



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("wolt_user");
        const token = localStorage.getItem("wolt_token");
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string) => {
        try {
            const res = await api.PostData("/users/login", { email });
            const { user, access_token } = res;
            setUser(user);
            localStorage.setItem("wolt_user", JSON.stringify(user));
            localStorage.setItem("wolt_token", access_token);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const signup = async (userData: any) => {
        try {
            const res = await api.PostData("/users/signup", userData);
            const { user, access_token } = res;
            setUser(user);
            localStorage.setItem("wolt_user", JSON.stringify(user));
            localStorage.setItem("wolt_token", access_token);
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("wolt_user");
        localStorage.removeItem("wolt_token");
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout }}>
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
