"use client";

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { loginWithToken } = useAuth();
    const processedRef = React.useRef(false);

    useEffect(() => {
        if (processedRef.current) return;

        const token = searchParams.get('token');
        const userStr = searchParams.get('user');

        if (token && userStr) {
            processedRef.current = true;
            try {
                const decodedUser = decodeURIComponent(userStr);
                const user = JSON.parse(decodedUser);
                loginWithToken(token, user);
                router.replace('/');
            } catch (error) {
                console.error('Error parsing social login data', error);
                router.replace('/?error=social_login_failed');
            }
        }
    }, [searchParams, router, loginWithToken]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a] text-white">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Authenticating...</h2>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#009de0] mx-auto"></div>
            </div>
        </div>
    );
}
