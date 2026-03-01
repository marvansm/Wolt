import { ChevronRight, LocateFixed, MapPin } from "lucide-react";

export default function BannerSection() {
  return (
    <section className="bg-[#00c2e8] pb-[2.625rem]">
      <div className="w-full max-w-[960px] h-full mx-auto px-[32px] flex flex-col items-center justify-center pt-[120px] pb-[75px] gap-[24px]">
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
          New users get 14 days of 0₼ delivery{" "}
          <ChevronRight size={16} strokeWidth={2} />
        </button>
        <div>
          <h2 className="uppercase font-bold font-fredoka leading-[1] min-h-[88px] text-[88px]  text-center text-white">
            Flowers. <br /> Deli vered.
          </h2>
        </div>
        <div className="flex items-center bg-[#fff] border border-[#e4e4e5] rounded-full px-[1rem] min-w-[400px] focus:outline-[2px] focus:outline-[var(--outlineFocused)]">
          <MapPin color="#202125a3" />
          <input
            type="text"
            name="search"
            placeholder="Enter delivery address"
            className="text-[#202125] py-[1rem] px-[1rem] outline-0 border-0 w-full"
          />
          <div className="bg-[#ebf7fd] hover:bg-[#d6effa] w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center">
            <LocateFixed color="#009de0" size={20} />
          </div>
        </div>
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
          Log in for saved addresses <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
