import GetStarted from "@/components/sections/for-couriers/GetStarted";
import HeroSection from "@/components/sections/for-couriers/HeroSection";
import WhyWolt from "@/components/sections/for-couriers/WhyWolt";
import SignupFaq from "@/components/sections/for-couriers/SignupFaq";
import Testimonials from "@/components/sections/for-couriers/Testimonials";

export default function ForCouriers() {
  return (
    <div>
      <HeroSection />
      <WhyWolt />
      <GetStarted />
      <Testimonials />

      <SignupFaq />
    </div>
  );
}
