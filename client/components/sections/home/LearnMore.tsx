import ImageCard from "@/components/common/ImageCard";
import { ChevronRight } from "lucide-react";
import Reveal from "../../common/Reveal";

export default function LearnMore() {
    return (
        <section className="max-w-[1920px] mx-auto px-[32px] pt-10">
            <div className="grid grid-cols-2 gap-[32px]">
                <Reveal direction="left" delay={0.1} className="w-full">
                    <ImageCard
                        imageSrc="https://images.ctfassets.net/23u853certza/1CTswohkY0RySIw1tV30wt/26823bac3c49bd1a31a503eabccb00fe/5ef9f6cb20e0ac7e92b8dd720fb0fb7f.png?q=90&fm=webp"
                        alt="courier"
                        title="Competitive earnings"
                        description="The more you deliver, the more money you can earn. Get paid per delivery and for distance covered."
                        imagePriority={true}
                        bottomElement={
                            <button
                                className="
            leading-[1.4]
            text-[14px]
            px-[20px] py-[13px]
            flex gap-[8px] items-center
            hover:bg-[#ffffff47]
            duration-300
            cursor-pointer
            bg-[#fff3]
            text-white
            font-poppins
            rounded-full
            backdrop-blur-[12px]
            shadow-[0_0_8px_0_#2021251f,inset_0_0_0_1px_#ffffff14]
            "
                            >
                                Learn more <ChevronRight size={16} strokeWidth={2} />
                            </button>
                        }
                    />
                </Reveal>
                <Reveal direction="right" delay={0.2} className="w-full">
                    <ImageCard
                        imageSrc="https://images.ctfassets.net/23u853certza/14E5PXvsGT5GDxRarQIItq/ad42c51662ddae52e44d93a7f9dbafe2/photocard_courier_flexible_hours.jpg?q=90&fm=webp"
                        alt="merchant"
                        title="Flexible hours"
                        description="Choose your own hours and set your own schedule. Plus, no delivery experience required."
                        imagePriority={true}
                        bottomElement={
                            <button
                                className="
            leading-[1.4]
            text-[14px]
            px-[20px] py-[13px]
            flex gap-[8px] items-center
            hover:bg-[#ffffff47]
            duration-300
            cursor-pointer
            bg-[#fff3]
            text-white
            font-poppins
            rounded-full
            backdrop-blur-[12px]
            shadow-[0_0_8px_0_#2021251f,inset_0_0_0_1px_#ffffff14]
            "
                            >
                                Learn more <ChevronRight size={16} strokeWidth={2} />
                            </button>
                        }
                    />
                </Reveal>
            </div>
        </section>
    );
}