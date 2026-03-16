import Image from "next/image";
import { MerchantHowItWorksData } from "@/constant/sections";

export default function MerchantHowItWorks() {
    return (
        <section className="bg-black py-[100px]">
            <div className="max-w-[1280px] px-[48px] mx-auto text-center mb-16">
                <h2 className="text-white font-fredoka font-bold text-[3rem] mb-4">
                    This is how Wolt works
                </h2>
            </div>
            <div className="max-w-[1280px] px-[48px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                {MerchantHowItWorksData.map((item) => (
                    <div key={item.id} className="flex flex-col items-center text-center">
                        <div className="relative w-full h-[250px] mb-8 bg-[#1a1a1a] rounded-[24px] overflow-hidden p-8">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-contain p-4"
                            />
                        </div>
                        <div className="bg-[#009de0] w-12 h-12 rounded-full flex items-center justify-center font-bold text-white mb-4">
                            {item.step}
                        </div>
                        <h3 className="text-white font-bold font-fredoka text-[1.5rem] mb-2">
                            {item.title}
                        </h3>
                        <p className="text-[#ffffffa3] font-poppins text-[1rem]">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
