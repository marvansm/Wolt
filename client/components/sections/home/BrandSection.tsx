import { BrandLogosFirstRow, BrandLogosSecondRow } from "@/constant/sections";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function BrandSection() {
  return (
    <section className="bg-black">
      <div className="flex items-center flex-col  gap-6 transform translate-y-[-30px]">
        <Marquee direction="right" speed={15}>
          <div className="flex gap-6">
            {BrandLogosFirstRow &&
              BrandLogosFirstRow.map((b, idx) => (
                <div
                  key={idx}
                  className="rounded-[24px] bg-white overflow-hidden  border border-gray-500 inline-block"
                >
                  <Image src={b} alt="brands" width={104} height={104} />
                </div>
              ))}
          </div>
        </Marquee>
        <Marquee direction="left" speed={15}>
          <div className="flex gap-6">
            {BrandLogosSecondRow &&
              BrandLogosSecondRow.map((b, idx) => (
                <div
                  key={idx}
                  className="rounded-[24px] bg-white overflow-hidden  border border-gray-500 inline-block"
                >
                  <Image src={b} alt="brands" width={104} height={104} />
                </div>
              ))}
          </div>
        </Marquee>
        <button
          className="
          leading-[1.4]
          text-[14px]
          px-[20px] py-[13px]
          flex gap-[8px] items-center
          duration-300
          cursor-pointer
          text-gray-200
          font-poppins
          rounded-full
          "
        >
          Popular around you right now
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
