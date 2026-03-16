import Heading from "@/components/common/Heading";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section>
      <div className="flex items-center justify-center flex-col max-w-[1280px] px-[48px] mx-auto my-[48px]">
        <Heading title={"Become a Wolt Courier Partner"} />
        <button className="bg-[#009de0] rounded-[12px] hover:bg-[#008ac5] duration-300 cursor-pointer text-[#202125] h-[56px] px-[20px] py-[12px] font-medium font-poppins">
          Sign up now
        </button>
      </div>
      <div className="w-full h-[576px] relative">
        <Image
          fill
          src={
            "https://images.ctfassets.net/23u853certza/2eJ21PphUYa2qeRb8XtVyF/2c70da7ce3bdf9cdf430b3a33e14356d/aze-hero-banner.png?w=3840&q=75&fm=webp"
          }
          alt="banner"
          className="object-cover "
        />
      </div>
    </section>
  );
}
