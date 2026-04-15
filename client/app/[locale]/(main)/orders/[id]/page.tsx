"use client";

import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import OrderTrackingView from "@/components/View/main/orderTrackingView/OrderTrackingView";
import { useIntlayer } from "react-intlayer";

export default function OrderTrackingPage() {
    const { ui: content } = useIntlayer("order-tracking");
    const { id } = useParams();
    const router = useRouter();
    const { orders } = useCart();

    const order = orders.find((o) => o.id === id);

    if (!order) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-4xl font-black mb-4 tracking-tight">{content.orderNotFound as any}</h1>
                <p className="text-gray-500 mb-8 max-w-md">
                    {content.orderNotFoundDesc as any}
                </p>
                <button 
                    onClick={() => router.push('/discovery')}
                    className="bg-[#009de0] text-white px-8 py-3 rounded-xl font-black hover:bg-[#00b0ff] transition-all"
                >
                    {content.backToDiscovery as any}
                </button>
            </div>
        );
    }

    return <OrderTrackingView order={order} />;
}
