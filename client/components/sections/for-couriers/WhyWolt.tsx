import Heading from "@/components/common/Heading";
import { WhyWoltContent } from "@/constant/sections";
import Image from "next/image";

export default function WhyWolt() {
  return (
    <section className="py-[68px] max-w-[1300px] mx-auto">
      <div className="flex items-center justify-center flex-col">
        <Heading title={"Why Deliver With Wolt?"} />
        <p className="font-bold font-fredoka text-[2rem] text-[#ffffffa3] text-center">
          As a Wolt Courier Partner, you can earn money <br /> by delivering
          orders to local customers. You <br /> set your own schedule, so you
          deliver when <br /> and where you want. It's easy to start earning{" "}
          <br /> - no previous delivery experience is required!
        </p>
      </div>
      <div className="grid grid-cols-3 mt-[7.5rem] gap-[16px]">
        {WhyWoltContent &&
          WhyWoltContent.map((item) => (
            <div
              key={item?.id}
              style={{ backgroundColor: item?.bg }}
              className={`box  px-[24px] pt-[24px] pb-[56px] rounded-[16px]`}
            >
              <div className="h-[20rem] relative w-full mb-[32px] overflow-hidden rounded-[16px]">
                <Image
                  fill
                  src={item?.img}
                  alt="logo"
                  className="object-cover"
                />
              </div>
              <div className="flex items-start justify-center flex-col">
                <h2 className="mb-[16px] text-white font-bold font-fredoka text-[2rem]">
                  {item?.title}
                </h2>
                <h3 className="mb-[1rem] text-[#ffffffa3] font-poppins">
                  {item?.firstFeat}
                </h3>
                <h4 className="mb-[1rem] text-[#ffffffa3] font-poppins">
                  {item?.scndFeat}
                </h4>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
