import MerchantHero from "@/components/sections/for-merchants/MerchantHero";
import MerchantWhyWolt from "@/components/sections/for-merchants/MerchantWhyWolt";
import MerchantHowItWorks from "@/components/sections/for-merchants/MerchantHowItWorks";
import SignupFaq from "@/components/sections/for-couriers/SignupFaq";

export default function ForMerchants() {
    return (
        <main className="bg-black min-h-screen">
            <MerchantHero />
            <MerchantWhyWolt />
            <MerchantHowItWorks />
            <SignupFaq />
        </main>
    );
}
