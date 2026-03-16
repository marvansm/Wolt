import Heading from "@/components/common/Heading";
import Image from "next/image";
import { MerchantHeroData } from "@/constant/sections";

export default function MerchantHero() {
    return (
        <section>
            <div className="flex items-center justify-center flex-col max-w-[1280px] px-[48px] mx-auto my-[48px] text-center">
                <Heading title={MerchantHeroData.title} />
                <p className="text-[#ffffffa3] font-poppins text-[1.2rem] mb-8 max-w-[600px]">
                    {MerchantHeroData.description}
                </p>
                <button className="bg-[#009de0] rounded-[12px] hover:bg-[#008ac5] duration-300 cursor-pointer text-[#202125] h-[56px] px-[32px] py-[12px] font-bold font-poppins text-[1.1rem]">
                    Start for free
                </button>
            </div>
            <div className="w-full h-[600px] relative">
                <Image
                    fill
                    src={MerchantHeroData.image}
                    alt="merchant hero"
                    className="object-cover"
                    priority
                />
            </div>
        </section>
    );
}
