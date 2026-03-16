"use client";

import { useState } from "react";
import {
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    CheckCircle2,
    Clock,
    AlertCircle,
    XCircle,
    X
} from "lucide-react";

const initialOrders = [
    { id: "#ORD-7421", customer: "John Doe", items: ["Pepperoni Pizza x1", "Coca-Cola x2"], total: "24.50", status: "delivered", createdAt: "2024-03-20 14:32" },
    { id: "#ORD-7420", customer: "Jane Smith", items: ["Chicken Doner x2", "Ayran x2"], total: "42.00", status: "preparing", createdAt: "2024-03-20 15:10" },
    { id: "#ORD-7419", customer: "Michael Brown", items: ["Sushi Mix Set x1"], total: "18.90", status: "pending", createdAt: "2024-03-20 15:45" },
    { id: "#ORD-7418", customer: "Alice Johnson", items: ["Lentil Soup x1", "Cheeseburger x1"], total: "35.20", status: "delivered", createdAt: "2024-03-20 12:20" },
];

export default function OrdersPage() {
    const [orders, setOrders] = useState(initialOrders);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const handleOpenStatusModal = (order: any) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const updateStatus = (status: string) => {
        setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status } : o));
        setIsModalOpen(false);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "delivered": return <CheckCircle2 size={16} className="text-green-500" />;
            case "preparing": return <Clock size={16} className="text-blue-500" />;
            case "pending": return <AlertCircle size={16} className="text-yellow-500" />;
            case "cancelled": return <XCircle size={16} className="text-red-500" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
                <p className="text-[#a3a3a3]">Monitor and update active customer orders.</p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1f1f1f] bg-[#141414]/50 flex items-center justify-between">
                    <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                        <input
                            type="text"
                            placeholder="Search by ID or customer..."
                            className="w-full bg-[#1f1f1f] border border-[#2b2b2b] rounded-lg py-2 pl-10 pr-4 text-sm"
                        />
                    </div>
                    <div className="flex gap-2">
                        {["all", "pending", "preparing", "delivered"].map((f) => (
                            <button key={f} className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase bg-[#1f1f1f] text-[#a3a3a3] hover:text-white transition-colors">
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#141414] text-[#a3a3a3] text-xs uppercase tracking-wider font-bold">
                                <th className="px-6 py-4">Order Details</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1f1f1f]">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-[#141414] transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-white">{order.id}</span>
                                            <span className="text-[#737373] text-xs mt-1">{order.createdAt}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{order.customer}</span>
                                            <span className="text-[#737373] text-[10px] uppercase font-bold tracking-tighter">
                                                {order.items.length} items
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${order.status === "delivered" ? "bg-green-500/10 text-green-500" :
                                            order.status === "preparing" ? "bg-blue-500/10 text-blue-500" :
                                                order.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                                                    "bg-red-500/10 text-red-500"
                                            }`}>
                                            {getStatusIcon(order.status)}
                                            <span className="text-[10px] font-bold uppercase tracking-wider">{order.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold">AZN {order.total}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleOpenStatusModal(order)}
                                            className="p-2 hover:bg-[#1f1f1f] rounded-lg text-[#a3a3a3] hover:text-white"
                                        >
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-[#1f1f1f] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-[#1f1f1f] flex justify-between items-center">
                            <h3 className="text-xl font-bold">Update Status</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-[#737373] hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-3">
                            <p className="text-sm text-[#a3a3a3] mb-4">Set status for order <span className="text-white font-bold">{selectedOrder?.id}</span></p>
                            {["pending", "preparing", "delivered", "cancelled"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => updateStatus(status)}
                                    className={`w-full text-left px-4 py-3 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-between border transition-all ${selectedOrder?.status === status
                                        ? "bg-[#009de0] border-[#009de0] text-white"
                                        : "bg-[#141414] border-[#1f1f1f] text-[#a3a3a3] hover:border-[#2b2b2b]"
                                        }`}
                                >
                                    {status}
                                    {selectedOrder?.status === status && <CheckCircle2 size={16} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
