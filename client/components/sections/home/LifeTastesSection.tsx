import { ChevronRight } from "lucide-react";
import Image from "next/image";
export default function LifeTastesSection() {
  return (
    <section className="max-w-[1920px] mx-auto px-[32px] pt-[120px]">
      <div className="flex items-center flex-col justify-center">
        <h2 className="mb-[1rem] text-[4.5rem] text-white font-fredoka leading-[1] font-bold">
          {" "}
          Life tastes better with Wolt{" "}
        </h2>{" "}
        <p className="text-[#ffffffa3] mb-[48px] font-bold text-[2rem] font-fredoka">
          {" "}
          Almost everything delivered to you – quickly, reliably, and
          affordably{" "}
        </p>{" "}
      </div>{" "}
      <div className="grid grid-cols-2 gap-[32px]">
        {" "}
        <div className="relative w-full h-[35rem] overflow-hidden rounded-3xl">
          {" "}
          <Image
            fill
            src="https://images.ctfassets.net/23u853certza/7n9PMkDkDocpv1YfONDcsI/616a70ee6e8075816495c1eeb38b0922/support.png?w=960&q=90&fm=webp"
            alt="courier"
            className="object-cover"
            sizes="50vw"
            priority
          />{" "}
          <div className="p-[32px] absolute top-0 left-0">
            {" "}
            <h2 className="mb-[12px] font-fredoka text-white font-bold text-[3.5rem]">
              {" "}
              Real support from real people{" "}
            </h2>{" "}
            <p className="text-[1.5rem] font-poppins leading-[1.75rem] text-white">
              {" "}
              Our world-class support team has your back, with friendly
              assistance and fast response times.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="relative w-full h-[35rem] overflow-hidden rounded-3xl">
          {" "}
          <Image
            fill
            src="https://images.ctfassets.net/23u853certza/5926qGJB2hSNE15qHWNLZn/388c6afaf9c273c328d6ec824f10b0e1/photocard_woltplus.jpg?w=960&q=90&fm=webp"
            alt="courier"
            className="object-cover"
            sizes="50vw"
            priority
          />{" "}
          <div className="p-[32px] absolute top-0 left-0">
            {" "}
            <h2 className="mb-[12px] font-fredoka text-white font-bold text-[3.5rem]">
              {" "}
              0₼ delivery fees with Wolt+{" "}
            </h2>{" "}
            <p className="text-[1.5rem] font-poppins leading-[1.75rem] text-white">
              {" "}
              Enjoy zero delivery fees from the best restaurants and stores  in
              your city.{" "}
            </p>{" "}
          </div>{" "}
          <div className="absolute bottom-0 left-0 p-[32px]">
            {" "}
            <button className=" leading-[1.4] text-[14px] px-[20px] py-[13px] flex gap-[8px] items-center  duration-300 cursor-pointer  text-white font-poppins rounded-full  ">
              {" "}
              <Image
                src={
                  "https://images.ctfassets.net/23u853certza/2djO9HWVlB8lG3mzwmNMiX/ca7dcf7d95dcffb1868d5594cd01c447/Wolt__pill_logo.png?w=300&q=90&fm=webp"
                }
                width={120}
                height={50}
                alt="logo"
              />{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
