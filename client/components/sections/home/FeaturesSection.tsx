import { ChevronRight } from "lucide-react";
import Reveal from "../../common/Reveal";

export default function FeaturesSection() {
    return (
        <section className="max-w-[1920px] mx-auto px-[32px] pt-[32px] pb-[7.5rem]">
            <div className="grid grid-cols-4 gap-[24px] mb-[24px]">
                <Reveal direction="left" delay={0.1} className="w-full h-full">
                    <div className="bg-[#210f0e] rounded-[24px] p-[32px] flex flex-col justify-between min-h-[400px] gap-[24px]">
                        <div className="w-full h-[160px] flex items-center justify-center relative">
                            <img
                                src="https://images.ctfassets.net/23u853certza/2alPBNdBAcXwckvXjbjWvH/542aac95909dbaa25b9774eb0e092860/3DLivingroom.png?q=90&fm=webp"
                                alt="Boost sales placeholder"
                                className="object-contain max-h-[160px] w-auto max-w-[80%]"
                            />
                        </div>
                        <div>
                            <h3 className="text-[#ff6b6b] text-[28px] font-fredoka font-bold mb-[12px] leading-[1.1]">
                                Boost your sales
                            </h3>
                            <p className="text-white text-[16px] font-poppins leading-[1.4]">
                                91% of Wolt orders are extra sales you wouldn't otherwise get.
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal direction="left" delay={0.2} className="w-full h-full">
                    <div className="bg-[#001c33] rounded-[24px] p-[32px] flex flex-col justify-between min-h-[400px] gap-[24px]">
                        <div className="w-full h-[160px] flex items-center justify-center relative">
                            <img
                                src="https://images.ctfassets.net/23u853certza/62XiVYgUMckBTyPl11EVgw/9a0abac47bbd4f788800df7c3bc7c705/3DCouriers.png?q=90&fm=webp"
                                alt="Heavy lifting placeholder"
                                className="object-contain max-h-[160px] w-auto max-w-[80%]"
                            />
                        </div>
                        <div>
                            <h3 className="text-[#009de0] text-[28px] font-fredoka font-bold mb-[12px] leading-[1.1]">
                                We do the heavy lifting
                            </h3>
                            <p className="text-white text-[16px] font-poppins leading-[1.4]">
                                We handle ads, payments, delivery and support.
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal direction="right" delay={0.1} className="w-full h-full">
                    <div className="bg-[#1c1500] rounded-[24px] p-[32px] flex flex-col justify-between min-h-[400px] gap-[24px]">
                        <div className="w-full h-[160px] flex items-center justify-center relative">
                            <img
                                src="https://images.ctfassets.net/23u853certza/GWTxYReIUvlZ9CqqZVYi2/2c47a3b3d47030e1dd4c9c498c3bc189/3DYuhoRainjacket.png?q=90&fm=webp"
                                alt="Risk free placeholder"
                                className="object-contain max-h-[160px] w-auto max-w-[80%]"
                            />
                        </div>
                        <div>
                            <h3 className="text-[#f5a623] text-[28px] font-fredoka font-bold mb-[12px] leading-[1.1]">
                                It's 100% risk-free
                            </h3>
                            <p className="text-white text-[16px] font-poppins leading-[1.4]">
                                There's no fee for joining Wolt. You can quit whenever, for any reason. When you earn, we earn.
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal direction="right" delay={0.2} className="w-full h-full">
                    <div className="bg-[#052107] rounded-[24px] p-[32px] flex flex-col justify-between min-h-[400px] gap-[24px]">
                        <div className="w-full h-[160px] flex items-center justify-center relative">
                            <img
                                src="https://images.ctfassets.net/23u853certza/7cXP59KeAyDH1RT7fIi39K/620cc38c08a8a8232bcf0e2db1f15a44/WoltDriveIllustration.png?q=90&fm=webp"
                                alt="Wolt drive placeholder"
                                className="object-contain max-h-[160px] w-auto max-w-[80%]"
                            />
                        </div>
                        <div>
                            <h3 className="text-[#32cd32] text-[28px] font-fredoka font-bold mb-[12px] leading-[1.1]">
                                Power online sales with same-hour deliveries
                            </h3>
                            <p className="text-white text-[16px] font-poppins leading-[1.4]">
                                Add Wolt Drive logistics for fast, affordable express deliveries for e-commerce.{" "}
                                <span className="font-bold cursor-pointer hover:underline text-white mt-[8px] inline-block">
                                    Learn more {">"}
                                </span>
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-[24px]">
                <Reveal direction="left" delay={0.2} className="w-full">
                    <div className="bg-[#001a2d] hover:bg-[#00243d] transition-colors cursor-pointer rounded-[24px] px-[24px] py-[20px] flex items-center justify-between">
                        <div className="flex items-center gap-[24px]">
                            <div className="w-[80px] h-[60px] relative flex items-center justify-center">
                                <img
                                    src="https://images.ctfassets.net/23u853certza/6kRVPn5kxEnlkgCYUTozhL/7846cf51b410e633a8c30a021ec00bde/Restaurant.png?q=90&fm=webp"
                                    alt="For restaurants placeholder"
                                    className="object-contain max-h-full max-w-full"
                                />
                            </div>
                            <h3 className="text-[#009de0] text-[22px] font-fredoka font-bold">
                                Reach new customers and get more orders
                            </h3>
                        </div>
                        <div className="flex items-center gap-[12px] text-[#009de0] font-poppins text-[16px] font-medium whitespace-nowrap pl-[16px]">
                            For restaurants
                            <div className="bg-[#009de0] text-[#001a2d] rounded-full p-[4px] flex items-center justify-center">
                                <ChevronRight size={16} strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal direction="right" delay={0.2} className="w-full">
                    <div className="bg-[#001a2d] hover:bg-[#00243d] transition-colors cursor-pointer rounded-[24px] px-[24px] py-[20px] flex items-center justify-between">
                        <div className="flex items-center gap-[24px]">
                            <div className="w-[80px] h-[60px] relative flex items-center justify-center">
                                <img
                                    src="https://images.ctfassets.net/23u853certza/4arD8VZQybXkPfyJXchLat/7457eac1b8137a76b50ed70c20cc03b4/Store.png?q=90&fm=webp"
                                    alt="For stores placeholder"
                                    className="object-contain max-h-full max-w-full"
                                />
                            </div>
                            <h3 className="text-[#009de0] text-[22px] font-fredoka font-bold">
                                Become a store partner
                            </h3>
                        </div>
                        <div className="flex items-center gap-[12px] text-[#009de0] font-poppins text-[16px] font-medium whitespace-nowrap pl-[16px]">
                            For stores
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
