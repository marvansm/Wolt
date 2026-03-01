import HeroCard from "@/components/common/HeroCard";
import Reveal from "../../common/Reveal";

export default function GrowBusiness() {
  return (
    <section className="max-w-[1920px] mx-auto px-[32px] pt-[7.5rem]">
      <Reveal direction="up" delay={0.2}>
        <HeroCard
          imageSrc="https://images.ctfassets.net/23u853certza/6Cv99BeTRgtrg88Ateht1U/3ea23a65fc86d6e5b7e606a58cf2b063/subhero_merchant.jpg?w=1920&q=90&fm=webp"
          alt="subhero"
          title="For restaurants and stores"
          description="Let's grow your  business together"
          bottomElement={"Get started"}
        />
      </Reveal>
    </section>
  );
}
