import BannerSection from "@/components/sections/home/BannerSection";
import BrandSection from "@/components/sections/home/BrandSection";
import CarrierSection from "@/components/sections/home/CarrierSection";
import FeaturesSection from "@/components/sections/home/FeaturesSection";
import ForCouriers from "@/components/sections/home/ForCouriers";
import GrowBusiness from "@/components/sections/home/GrowBusiness";
import LifeTastesSection from "@/components/sections/home/LifeTastesSection";
import LearnMore from "@/components/sections/home/LearnMore";

export default function Home() {
  return (
    <div>
      <BannerSection />
      <BrandSection />
      <CarrierSection />
      <LifeTastesSection />
      <GrowBusiness />
      <FeaturesSection />
      <ForCouriers />
      <LearnMore />
    </div>
  );
}
