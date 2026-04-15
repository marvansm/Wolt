"use client";

import { ChevronRight } from "lucide-react";
import Reveal from "../../common/Reveal";
import { useIntlayer } from "react-intlayer";

export default function FeaturesSection() {
    const { features, heroCards } = useIntlayer("home");

    return (
        <section className="max-w-[1920px] mx-auto px-[32px] pt-[32px] pb-[7.5rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-[24px]">
                <Reveal direction="left" delay={0.1} className="w-full h-full">
                    <div className="bg-[#fff0f0] dark:bg-[#210f0e] transition-colors duration-300 rounded-[24px] p-[32px] flex flex-col justify-between min-h-[400px] gap-[24px]">
                        <div className="w-full h-[160px] flex items-center justify-center relative">
                            <img
                                src="https://images.ctfassets.net/23u853certza/2alPBNdBAcXwckvXjbjWvH/542aac95909dbaa25b9774eb0e092860/3DLivingroom.png?q=90&fm=webp"
                                alt="Boost sales placeholder"
                                className="object-contain max-h-[160px] w-auto max-w-[80%]"
                            />
                        </div>
                        <div>
                            <h3 className="text-[#ff6b6b] text-[28px] font-fredoka font-bold mb-[12px] leading-[1.1]">
                                {features.boostSales}
                            </h3>
                            <p className="text-gray-800 dark:text-white transition-colors duration-300 text-[16px] font-poppins leading-[1.4]">
                                {features.boostSalesDesc}
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal direction="left" delay={0.2} className="w-full h-full">
                    <div className="bg-[#e6f5fc] dark:bg-[#001c33] transition-colors duration-300 rounded-[24px] p-[32px] flex flex-col justify-between min-h-[400px] gap-[24px]">
                        <div className="w-full h-[160px] flex items-center justify-center relative">
                            <img
                                src="https://images.ctfassets.net/23u853certza/62XiVYgUMckBTyPl11EVgw/9a0abac47bbd4f788800df7c3bc7c705/3DCouriers.png?q=90&fm=webp"
                                alt="Heavy lifting placeholder"
                                className="object-contain max-h-[160px] w-auto max-w-[80%]"
                            />
                        </div>
                        <div>
                            <h3 className="text-[#009de0] text-[28px] font-fredoka font-bold mb-[12px] leading-[1.1]">
                                {features.heavyLifting}
                            </h3>
                            <p className="text-gray-800 dark:text-white transition-colors duration-300 text-[16px] font-poppins leading-[1.4]">
                                {features.heavyLiftingDesc}
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal direction="right" delay={0.1} className="w-full h-full">
                    <div className="bg-[#fcf5e6] dark:bg-[#1c1500] transition-colors duration-300 rounded-[24px] p-[32px] flex flex-col justify-between min-h-[400px] gap-[24px]">
                        <div className="w-full h-[160px] flex items-center justify-center relative">
                            <img
                                src="https://images.ctfassets.net/23u853certza/GWTxYReIUvlZ9CqqZVYi2/2c47a3b3d47030e1dd4c9c498c3bc189/3DYuhoRainjacket.png?q=90&fm=webp"
                                alt="Risk free placeholder"
                                className="object-contain max-h-[160px] w-auto max-w-[80%]"
                            />
                        </div>
                        <div>
                            <h3 className="text-[#f5a623] text-[28px] font-fredoka font-bold mb-[12px] leading-[1.1]">
                                {features.riskFree}
                            </h3>
                            <p className="text-gray-800 dark:text-white transition-colors duration-300 text-[16px] font-poppins leading-[1.4]">
                                {features.riskFreeDesc}
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal direction="right" delay={0.2} className="w-full h-full">
                    <div className="bg-[#eaf5eb] dark:bg-[#001924] transition-colors duration-300 rounded-[24px] p-[32px] flex flex-col justify-between min-h-[400px] gap-[24px]">
                        <div className="w-full h-[160px] flex items-center justify-center relative">
                            <img
                                src="https://images.ctfassets.net/23u853certza/7cXP59KeAyDH1RT7fIi39K/620cc38c08a8a8232bcf0e2db1f15a44/WoltDriveIllustration.png?q=90&fm=webp"
                                alt="Wolt drive placeholder"
                                className="object-contain max-h-[160px] w-auto max-w-[80%]"
                            />
                        </div>
                        <div>
                            <h3 className="text-[#32cd32] text-[28px] font-fredoka font-bold mb-[12px] leading-[1.1]">
                                {features.logistics}
                            </h3>
                            <p className="text-gray-800 dark:text-white transition-colors duration-300 text-[16px] font-poppins leading-[1.4]">
                                {features.logisticsDesc}{" "}
                                <span className="font-bold cursor-pointer hover:underline text-gray-800 dark:text-white transition-colors duration-300 mt-[8px] inline-block">
                                    {features.learnMore.value} {">"}
                                </span>
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                <Reveal direction="left" delay={0.2} className="w-full">
                    <div className="bg-[#e6f5fc] hover:bg-[#ccebf8] dark:bg-[#001a2d] dark:hover:bg-[#00243d] transition-colors duration-300 cursor-pointer rounded-[24px] px-[24px] py-[20px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px] sm:gap-[0]">
                        <div className="flex items-center gap-[24px]">
                            <div className="w-[80px] h-[60px] relative flex items-center justify-center">
                                <img
                                    src="https://images.ctfassets.net/23u853certza/6kRVPn5kxEnlkgCYUTozhL/7846cf51b410e633a8c30a021ec00bde/Restaurant.png?q=90&fm=webp"
                                    alt="For restaurants placeholder"
                                    className="object-contain max-h-full max-w-full"
                                />
                            </div>
                            <h3 className="text-[#009de0] text-[22px] font-fredoka font-bold">
                                {heroCards.growBusinessDesc}
                            </h3>
                        </div>
                        <div className="flex items-center gap-[12px] text-[#009de0] font-poppins text-[16px] font-medium whitespace-nowrap pl-[16px]">
                            {features.forRestaurants}
                            <div className="bg-[#009de0] text-[#001a2d] rounded-full p-[4px] flex items-center justify-center">
                                <ChevronRight size={16} strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal direction="right" delay={0.2} className="w-full">
                    <div className="bg-[#e6f5fc] hover:bg-[#ccebf8] dark:bg-[#001a2d] dark:hover:bg-[#00243d] transition-colors duration-300 cursor-pointer rounded-[24px] px-[24px] py-[20px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px] sm:gap-0">
                        <div className="flex items-center gap-[24px]">
                            <div className="w-[80px] h-[60px] relative flex items-center justify-center">
                                <img
                                    src="https://images.ctfassets.net/23u853certza/4arD8VZQybXkPfyJXchLat/7457eac1b8137a76b50ed70c20cc03b4/Store.png?q=90&fm=webp"
                                    alt="For stores placeholder"
                                    className="object-contain max-h-full max-w-full"
                                />
                            </div>
                            <h3 className="text-[#009de0] text-[22px] font-fredoka font-bold">
                                {heroCards.growBusinessDesc}
                            </h3>
                        </div>
                        <div className="flex items-center gap-[12px] text-[#009de0] font-poppins text-[16px] font-medium whitespace-nowrap pl-[16px]">
                            {features.forStores}
                            <div className="bg-[#009de0] text-[#001a2d] rounded-full p-[4px] flex items-center justify-center">
                                <ChevronRight size={16} strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
