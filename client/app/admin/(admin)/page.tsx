"use client";

import {
    TrendingUp,
    ShoppingBag,
    Utensils,
    Users,
    ArrowUpRight
} from "lucide-react";

const stats = [
    { name: "Total Revenue", value: "AZN 12,450", change: "+12.5%", icon: TrendingUp, color: "text-green-500" },
    { name: "Total Orders", value: "842", change: "+18.2%", icon: ShoppingBag, color: "text-blue-500" },
    { name: "Active Restaurants", value: "48", change: "+4.3%", icon: Utensils, color: "text-[#009de0]" },
    { name: "New Customers", value: "156", change: "+24.1%", icon: Users, color: "text-purple-500" },
];

const recentOrders = [
    { id: "#ORD-7421", customer: "John Doe", total: "24.50", status: "delivered", time: "2 mins ago" },
    { id: "#ORD-7420", customer: "Jane Smith", total: "42.00", status: "preparing", time: "15 mins ago" },
    { id: "#ORD-7419", customer: "Michael Brown", total: "18.90", status: "pending", time: "24 mins ago" },
    { id: "#ORD-7418", customer: "Alice Johnson", total: "35.20", status: "delivered", time: "1 hour ago" },
    { id: "#ORD-7417", customer: "Robert Wilson", total: "12.00", status: "cancelled", time: "3 hours ago" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-[#a3a3a3]">Welcome back to your administration panel.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-[#0a0a0a] border border-[#1f1f1f] p-6 rounded-2xl hover:border-[#009de0] transition-colors duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-[#1f1f1f] ${stat.color}`}>
                                    <Icon size={24} />
                                </div>
                                <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                                    {stat.change}
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[#a3a3a3] text-sm font-medium">{stat.name}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-[#1f1f1f] flex justify-between items-center">
                    <h2 className="text-xl font-bold">Recent Orders</h2>
                    <button className="text-[#009de0] text-sm font-bold hover:underline">View all orders</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#141414] text-[#a3a3a3] text-xs uppercase tracking-wider font-bold">
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1f1f1f]">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-[#141414] transition-colors duration-200">
                                    <td className="px-6 py-4 font-medium">{order.id}</td>
                                    <td className="px-6 py-4 text-[#a3a3a3]">{order.customer}</td>
                                    <td className="px-6 py-4 font-bold">AZN {order.total}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.status === "delivered" ? "bg-green-500/10 text-green-500" :
                                                order.status === "preparing" ? "bg-blue-500/10 text-blue-500" :
                                                    order.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                                                        "bg-red-500/10 text-red-500"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[#737373] text-sm">{order.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
