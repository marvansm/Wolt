import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function CarrierSection() {
  return (
    <section className="max-w-[1920px] mx-auto px-[32px] pt-[7.5rem]">
      <div className="grid grid-cols-2 gap-[32px]">
        <div className="relative w-full h-[35rem] overflow-hidden rounded-3xl">
          <Image
            fill
            src="https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?q=90&fm=webp"
            alt="courier"
            className="object-cover"
            sizes="50vw"
            priority
          />
          <div className="p-[32px] absolute top-0 left-0">
            <h2 className="mb-[12px] font-fredoka text-white font-bold text-[3.5rem]">
              Become a courier partner
            </h2>
            <p className="text-[1.5rem] font-poppins leading-[1.75rem] text-white">
              Earn by delivering to local customers. Set your own schedule,
              deliver when and where you want.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 p-[32px]">
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
          </div>
        </div>
        <div className="relative w-full h-[35rem] overflow-hidden rounded-3xl">
          <Image
            fill
            src="https://images.ctfassets.net/23u853certza/1FZ1mDc4bJVwtMTJz2Wtfa/71060334acbb1bbd9c1f270a94599fc2/photocard_merchant_v2.jpg?w=960&q=90&fm=webp"
            alt="courier"
            className="object-cover"
            sizes="50vw"
            priority
          />
          <div className="p-[32px] absolute top-0 left-0">
            <h2 className="mb-[12px] font-fredoka text-white font-bold text-[3.5rem]">
              Reach new customers
            </h2>
            <p className="text-[1.5rem] font-poppins leading-[1.75rem] text-white">
              We help you to grow your business by helping thousands of people
              find your venue.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 p-[32px]">
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
          </div>
        </div>
      </div>
    </section>
  );
}
