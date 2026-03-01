import BannerSection from "@/components/sections/home/BannerSection";
import BrandSection from "@/components/sections/home/BrandSection";
import CarrierSection from "@/components/sections/home/CarrierSection";
import GrowBusiness from "@/components/sections/home/GrowBusiness";
import LifeTastesSection from "@/components/sections/home/LifeTastesSection";

export default function Home() {
  return (
    <div>
      <BannerSection />
      <BrandSection />
      <CarrierSection />
      <LifeTastesSection />
      <GrowBusiness />
    </div>
  );
}
