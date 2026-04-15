"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Globe, Accessibility, Moon, Cookie } from "lucide-react";
import { ThemeModal } from "@/components/features/ThemeModal";
import { useIntlayer, useLocale } from "react-intlayer";

export default function Footer() {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const { footer } = useIntlayer("layout");
  if (!footer) return null;
  const { locale, setLocale, availableLocales } = useLocale();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "tr" : "en";
    setLocale(nextLocale);
  };

  return (
    <footer className="bg-[#f8f8f8] dark:bg-[#111111] text-[#707070] dark:text-[#b3b3b3] pt-[64px] pb-[32px] px-[32px] font-poppins text-[14px] mt-20 transition-colors duration-300">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-[80px]">
          <div className="flex flex-col gap-[24px] col-span-2 md:col-span-3 lg:col-span-1 mb-6 lg:mb-0">
            <Image
              src="/logo.png"
              alt="Wolt Logo"
              width={100}
              height={40}
              className="mb-[16px] logo-theme transition-all duration-300"
            />
            <div className="flex gap-[12px] flex-wrap">
              <Image
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                width={140}
                height={42}
                className="cursor-pointer"
                style={{ height: 'auto' }}
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                width={140}
                height={42}
                className="cursor-pointer"
                style={{ height: 'auto' }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[16px]">
            <h3 className="text-black dark:text-white font-medium text-[16px] mb-[4px] transition-colors">{footer.partner}</h3>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">{footer.couriers}</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">{footer.merchants}</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">{footer.affiliates}</Link>
          </div>

          <div className="flex flex-col gap-[16px]">
            <h3 className="text-black dark:text-white font-medium text-[16px] mb-[4px] transition-colors">{footer.company}</h3>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">{footer.about}</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">{footer.standFor}</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">{footer.jobs}</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">{footer.sustainability}</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">{footer.security}</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">{footer.investors}</Link>
          </div>

          <div className="flex flex-col gap-[16px]">
            <h3 className="text-black dark:text-white font-medium text-[16px] mb-[4px] transition-colors">{footer.products}</h3>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Wolt Drive</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Wolt Market</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Wolt for Work</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Wolt Ads</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Wolt Storefront</Link>
          </div>

          <div className="flex flex-col gap-[16px]">
            <h3 className="text-black dark:text-white font-medium text-[16px] mb-[4px] transition-colors">{footer.links}</h3>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">{footer.support}</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Newsroom</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Speak up</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Promo codes</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Developers</Link>
          </div>

          <div className="flex flex-col gap-[16px]">
            <h3 className="text-black dark:text-white font-medium text-[16px] mb-[4px] transition-colors">{footer.follow}</h3>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Blog</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Engineering Blog</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Facebook</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">X</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">LinkedIn</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Wolt Life</Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-[12px] pt-[24px]">
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-[16px] md:gap-[24px]">
            <button className="flex items-center gap-[8px] hover:text-black dark:hover:text-white transition-colors">
              <span className="w-5 h-5 bg-[#e0e0e0] dark:bg-[#b3b3b3] rounded-full flex items-center justify-center text-black text-[10px] font-bold">AZ</span>
              Azerbaijan
            </button>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-[8px] hover:text-black dark:hover:text-white transition-colors"
            >
              <Globe size={16} /> {footer.language}: {locale === 'en' ? 'English' : 'Türkçe'}
            </button>
            <button 
              onClick={() => setIsThemeModalOpen(true)}
              className="flex items-center gap-[8px] hover:text-black dark:hover:text-white transition-colors"
            >
              <Moon size={16} /> {footer.theme}
            </button>
            <button className="flex items-center gap-[8px] hover:text-black dark:hover:text-white transition-colors">
              <Cookie size={16} /> {footer.cookies}
            </button>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-[16px] md:gap-[24px]">
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Accessibility Statement</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">User Terms of Service</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Statement</Link>
            <span>© Wolt 2026</span>
          </div>
        </div>
      </div>
      <ThemeModal isOpen={isThemeModalOpen} onClose={() => setIsThemeModalOpen(false)} />
    </footer>
  );
}
