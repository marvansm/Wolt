import HeroCard from "@/components/common/HeroCard";
import Reveal from "../../common/Reveal";

export default function ForCouriers() {
    return (
        <section className="max-w-[1920px] mx-auto px-[32px] ">
            <Reveal direction="up" delay={0.2}>
                <HeroCard
                    imageSrc="https://images.ctfassets.net/23u853certza/52xdHKNnGODHWovJvhwvYb/b1a71a75301e7e8fe1266660869c3358/subhero_courier_v2.jpg?q=90&fm=webp"
                    alt="Courier"
                    title="For couriers"
                    description="Earn when and where you want"
                    bottomElement="Get started"
                />
            </Reveal>
        </section>
    );
}