import { ChevronRight } from "lucide-react";
import ImageCard from "../../common/ImageCard";
import Reveal from "../../common/Reveal";

export default function CarrierSection() {
  return (
    <section className="max-w-[1920px] mx-auto px-[32px] pt-[7.5rem]">
      <div className="grid grid-cols-2 gap-[32px]">
        <Reveal direction="left" delay={0.1} className="w-full">
          <ImageCard
            imageSrc="https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?q=90&fm=webp"
            alt="courier"
            title="Become a courier partner"
            description="Earn by delivering to local customers. Set your own schedule, deliver when and where you want."
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
                For couriers <ChevronRight size={16} strokeWidth={2} />
              </button>
            }
          />
        </Reveal>
        <Reveal direction="right" delay={0.2} className="w-full">
          <ImageCard
            imageSrc="https://images.ctfassets.net/23u853certza/1FZ1mDc4bJVwtMTJz2Wtfa/71060334acbb1bbd9c1f270a94599fc2/photocard_merchant_v2.jpg?w=960&q=90&fm=webp"
            alt="merchant"
            title="Reach new customers"
            description="We help you to grow your business by helping thousands of people find your venue."
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
                For merchants <ChevronRight size={16} strokeWidth={2} />
              </button>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
