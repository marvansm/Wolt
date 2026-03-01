import { HeroCardProps } from "@/types/global";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function HeroCard({
    imageSrc,
    alt,
    title,
    description,
    bottomElement,
    className = "",
    imagePriority = false,
}: HeroCardProps) {
    return (
        <div className="w-full h-[584px] relative rounded-[24px] overflow-hidden group cursor-pointer">
            <Image
                fill
                src={imageSrc}
                alt={alt}
                className="group-hover:scale-[1.1] duration-500"
            />
            <div className="absolute flex items-center justify-center flex-col w-full h-full">
                <p className="text-[2.3rem] font-bold leading-[1.75rem] text-white font-fredoka mb-5">
                    {title} 
                </p>
                <h2 className="mb-[12px] font-fredoka text-white font-bold text-[3.5rem] text-center uppercase leading-15">
                    {description} 
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
                    {bottomElement}  <ChevronRight size={16} strokeWidth={2} />
                </button>
            </div>
        </div>
    );
}