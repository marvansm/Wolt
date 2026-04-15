"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import ImageCard from "../../common/ImageCard";
import Reveal from "../../common/Reveal";
import { useIntlayer } from "react-intlayer";

export default function LifeTastesSection() {
  const { lifeTastes } = useIntlayer("home");

  return (
    <section className="max-w-[1920px] mx-auto px-[32px] pt-[120px]">
      <Reveal direction="up" delay={0.1}>
        <div className="flex items-center flex-col justify-center">
          <h2 className="mb-[1rem] text-[2.5rem] md:text-[4.5rem] text-center text-black dark:text-white transition-colors duration-300 font-fredoka leading-[1] font-bold">
            {lifeTastes.title}
          </h2>
          <p className="text-gray-600 dark:text-[#ffffffa3] transition-colors duration-300 mb-[48px] font-bold text-[1.25rem] md:text-[2rem] text-center font-fredoka">
            {lifeTastes.description}
          </p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
        <Reveal direction="left" delay={0.2} className="w-full">
          <ImageCard
            imageSrc="https://images.ctfassets.net/23u853certza/7n9PMkDkDocpv1YfONDcsI/616a70ee6e8075816495c1eeb38b0922/support.png?q=90&fm=webp"
            alt="Careers"
            title={lifeTastes.supportTitle.value}
            description={lifeTastes.supportDesc.value}
          >

            <div className="absolute top-[46%] right-[32%] w-[42px] h-[42px] rounded-[50%] overflow-hidden border-[2px] border-[#ffffff33] shadow-lg z-10 animate-float">
              <img src="https://i.pravatar.cc/150?img=47" alt="support agent 1" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-[55%] right-[15%] w-[60px] h-[60px] rounded-[50%] overflow-hidden border-[2px] border-[#ffffff33] shadow-lg z-10 animate-float-delayed">
              <img src="https://i.pravatar.cc/150?img=44" alt="support agent 2" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-[58%] left-[30%] w-[50px] h-[50px] rounded-[50%] overflow-hidden border-[2px] border-[#ffffff33] shadow-lg z-10 animate-float-slow">
              <img src="https://i.pravatar.cc/150?img=41" alt="support agent 3" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-[5%] left-[19%] w-[84px] h-[84px] rounded-[50%] overflow-hidden border-[2px] border-[#ffffff33] shadow-lg z-10 bg-white animate-float-delayed">
              <img src="https://i.pravatar.cc/150?img=33" alt="support agent 4" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-[14%] left-[29%] w-[68px] h-[68px] rounded-[50%] overflow-hidden border-[2px] border-[#ffffff33] shadow-lg z-10 bg-white animate-float">
              <img src="https://i.pravatar.cc/150?img=12" alt="support agent 5" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-[23%] -right-[15px] w-[60px] h-[60px] rounded-[50%] overflow-hidden border-[2px] border-[#ffffff33] shadow-lg z-10 bg-white animate-float-slow">
              <img src="https://i.pravatar.cc/150?img=68" alt="support agent 6" className="w-full h-full object-cover" />
            </div>
          </ImageCard>
        </Reveal>
        <Reveal direction="right" delay={0.3} className="w-full">
          <ImageCard
            imageSrc="https://images.ctfassets.net/23u853certza/5926qGJB2hSNE15qHWNLZn/388c6afaf9c273c328d6ec824f10b0e1/photocard_woltplus.jpg?w=960&q=90&fm=webp"
            alt="wolt+"
            title={lifeTastes.woltPlusTitle.value}
            description={lifeTastes.woltPlusDesc.value}
            bottomElement={
              <button className="leading-[1.4] text-[14px] px-[20px] py-[13px] flex gap-[8px] items-center duration-300 cursor-pointer text-white font-poppins rounded-full bg-[#fff3] hover:bg-[#ffffff47] backdrop-blur-[12px] shadow-[0_0_8px_0_#2021251f,inset_0_0_0_1px_#ffffff14]">
                <Image
                  src="https://images.ctfassets.net/23u853certza/2djO9HWVlB8lG3mzwmNMiX/ca7dcf7d95dcffb1868d5594cd01c447/Wolt__pill_logo.png?w=300&q=90&fm=webp"
                  width={120}
                  height={50}
                  alt="logo"
                />
              </button>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
