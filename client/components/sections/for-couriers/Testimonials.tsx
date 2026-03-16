import Image from "next/image";
import { CourierTestimonialsData } from "@/constant/sections";

export default function Testimonials() {
    return (
        <section className="bg-[#1F1F1F] py-[100px]">
            <div className="max-w-[1280px] px-[48px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {CourierTestimonialsData.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#1a1a1a] rounded-[24px] overflow-hidden flex flex-col h-full shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                        >
                            <div className="relative w-full h-[280px]">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-8 flex flex-col flex-grow justify-between">
                                <p className="text-[#ffffffcc] font-poppins italic leading-relaxed mb-8 text-[1.1rem]">
                                    "{item.quote}"
                                </p>
                                <div>
                                    <h4 className="text-white font-bold font-fredoka text-[1.2rem] mb-1">
                                        {item.name}
                                    </h4>
                                    <p className="text-[#ffffffa3] font-poppins text-[1rem]">
                                        {item.city}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
