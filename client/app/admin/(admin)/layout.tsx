"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    UtensilsCrossed,
    Grid2X2,
    LogOut
} from "lucide-react";

const sidebarItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Restaurants", href: "/admin/restaurants", icon: UtensilsCrossed },
    { name: "Categories", href: "/admin/categories", icon: Grid2X2 },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-black text-white">
            <aside className="w-64 border-r border-[#1f1f1f] flex flex-col fixed h-full">
                <div className="p-6 border-b border-[#1f1f1f]">
                    <Link href="/" className="text-[#009de0] text-2xl font-bold italic tracking-tighter">
                        Wolt <span className="text-white not-italic font-normal text-sm">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-2">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? "bg-[#009de0] text-white"
                                    : "text-[#a3a3a3] hover:bg-[#1f1f1f] hover:text-white"
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-[#1f1f1f]">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#a3a3a3] hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </Link>
                </div>
            </aside>

            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
