import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function GrowBusiness() {
  return (
    <section className="max-w-[1920px] mx-auto px-[32px] pt-[7.5rem]">
      <div className="w-full h-[584px] relative rounded-[24px] overflow-hidden group cursor-pointer">
        <Image
          fill
          src={
            "https://images.ctfassets.net/23u853certza/6Cv99BeTRgtrg88Ateht1U/3ea23a65fc86d6e5b7e606a58cf2b063/subhero_merchant.jpg?w=1920&q=90&fm=webp"
          }
          alt="subhero"
          className="group-hover:scale-[1.1] duration-500"
        />
        <div className="absolute flex items-center justify-center flex-col w-full h-full">
          <p className="text-[2.3rem] font-bold leading-[1.75rem] text-white font-fredoka mb-5">
            {" "}
            For restaurants and stores
          </p>
          <h2 className="mb-[12px] font-fredoka text-white font-bold text-[3.5rem] text-center uppercase leading-15">
            {" "}
            Let's grow your <br /> business together
          </h2>{" "}
          <button
            className="
            mt-2
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
            Get started <ChevronRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
