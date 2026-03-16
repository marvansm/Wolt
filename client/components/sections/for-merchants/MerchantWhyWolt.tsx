import Image from "next/image";
import { MerchantWhyWoltData } from "@/constant/sections";

export default function MerchantWhyWolt() {
    return (
        <section className="bg-black py-[100px]">
            <div className="max-w-[1280px] px-[48px] mx-auto text-center mb-16">
                <h2 className="text-white font-fredoka font-bold text-[3rem] mb-4">
                    All you need to grow
                </h2>
            </div>
            <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-[48px]">
                {MerchantWhyWoltData.map((item) => (
                    <div key={item.id} className="flex flex-col items-center text-center">
                        <div className="relative w-full h-[300px] mb-8">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-white font-bold font-fredoka text-[1.8rem] mb-4">
                            {item.title}
                        </h3>
                        <p className="text-white font-poppins text-[1.1rem] leading-relaxed">
                            {item.content}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
