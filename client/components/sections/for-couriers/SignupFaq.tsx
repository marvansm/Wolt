"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CourierFaqData } from "@/constant/sections";

export default function SignupFaq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-black py-[100px]">
            <div className="max-w-[1280px] px-[48px] mx-auto flex flex-col items-center">
               

                <div className="w-full max-w-[800px]">
                    <h2 className="text-white font-fredoka font-bold text-[3rem] text-center mb-10">
                        Frequently asked questions
                    </h2>
                    <div className="space-y-4">
                        {CourierFaqData.map((item, index) => (
                            <div
                                key={item.id}
                                className="border border-[#ffffff1a] rounded-[16px] overflow-hidden transition-all duration-300 bg-[#0a0a0a]"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#ffffff05] transition-colors"
                                >
                                    <span className="text-white font-bold font-poppins text-[1.1rem]">
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={`text-white transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                        size={24}
                                    />
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-[200px] pb-6" : "max-h-0"
                                        }`}
                                >
                                    <p className="text-[#ffffffa3] font-poppins leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
