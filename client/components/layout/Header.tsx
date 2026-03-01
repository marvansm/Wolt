import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="max-w-[1920px] mx-auto px-[32px] bg-[#000] py-4">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-[15px]">
          <Image src={"/logo.png"} alt="logo" width={120} height={68} />
          <div className="flex items-center gap-4">
            <div className="bg-[#001924] w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center">
              <MapPin color="#009de0" size={20} />
            </div>
            <button className="font-poppins font-medium h-[40px] min-h-[40px] py-[1.6px] text-[#009de0] text-[14px] flex items-center gap-4">
              Baku <ChevronDown size={15} strokeWidth={3} />
            </button>
          </div>
        </div>
        <div>
          <ul className="flex items-center font-poppins gap-[24px]">
            <li className="text-[#fff] hover:text-[#ffffffeb] flex items-center gap-[8px] font-medium cursor-pointer  ">
              Partners <ChevronDown size={15} strokeWidth={2} />
            </li>
            <li className="text-[#fff] hover:text-[#ffffffeb] flex items-center gap-[8px] font-medium cursor-pointer  ">
              Jobs
            </li>
            <li className="text-[#fff] hover:text-[#ffffffeb] flex items-center gap-[8px] font-medium cursor-pointer  ">
              Log in
            </li>
            <li>
              <button className="font-medium font-poppins text-[16px] leading-[24px] text-[#009de0] bg-[#001924] hover:bg-[#002636] min-h-[46px] px-[16px] rounded-[8px] cursor-pointer">
                Sign up 
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
