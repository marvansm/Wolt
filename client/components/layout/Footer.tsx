import Image from "next/image";
import Link from "next/link";
import { Globe, Accessibility, Moon, Cookie } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[#b3b3b3] pt-[64px] pb-[32px] px-[32px] font-poppins text-[14px] mt-20">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex justify-between items-start mb-[80px]">
          <div className="flex flex-col gap-[24px]">
            <Image
              src="/logo.png"
              alt="Wolt Logo"
              width={100}
              height={40}
              className="mb-[16px] brightness-0 invert"
            />
            <div className="flex gap-[12px]">
              <Image
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                width={140}
                height={42}
                className="cursor-pointer"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                width={140}
                height={42}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[16px]">
            <h3 className="text-white font-medium text-[16px] mb-[4px]">Partner with Wolt</h3>
            <Link href="#" className="hover:text-white transition-colors">For couriers</Link>
            <Link href="#" className="hover:text-white transition-colors">For merchants</Link>
            <Link href="#" className="hover:text-white transition-colors">For affiliates</Link>
          </div>

          <div className="flex flex-col gap-[16px]">
            <h3 className="text-white font-medium text-[16px] mb-[4px]">Company</h3>
            <Link href="#" className="hover:text-white transition-colors">About us</Link>
            <Link href="#" className="hover:text-white transition-colors">What we stand for</Link>
            <Link href="#" className="hover:text-white transition-colors">Jobs</Link>
            <Link href="#" className="hover:text-white transition-colors">Sustainability</Link>
            <Link href="#" className="hover:text-white transition-colors">Security</Link>
            <Link href="#" className="hover:text-white transition-colors">Investors</Link>
          </div>

          <div className="flex flex-col gap-[16px]">
            <h3 className="text-white font-medium text-[16px] mb-[4px]">Products</h3>
            <Link href="#" className="hover:text-white transition-colors">Wolt Drive</Link>
            <Link href="#" className="hover:text-white transition-colors">Wolt Market</Link>
            <Link href="#" className="hover:text-white transition-colors">Wolt+</Link>
            <Link href="#" className="hover:text-white transition-colors">Wolt for Work</Link>
            <Link href="#" className="hover:text-white transition-colors">Wolt Ads</Link>
            <Link href="#" className="hover:text-white transition-colors">Wolt Storefront</Link>
          </div>

          <div className="flex flex-col gap-[16px]">
            <h3 className="text-white font-medium text-[16px] mb-[4px]">Useful links</h3>
            <Link href="#" className="hover:text-white transition-colors">Support</Link>
            <Link href="#" className="hover:text-white transition-colors">Newsroom</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
            <Link href="#" className="hover:text-white transition-colors">Speak up</Link>
            <Link href="#" className="hover:text-white transition-colors">Promo codes</Link>
            <Link href="#" className="hover:text-white transition-colors">Developers</Link>
          </div>

          <div className="flex flex-col gap-[16px]">
            <h3 className="text-white font-medium text-[16px] mb-[4px]">Follow us</h3>
            <Link href="#" className="hover:text-white transition-colors">Blog</Link>
            <Link href="#" className="hover:text-white transition-colors">Engineering Blog</Link>
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
            <Link href="#" className="hover:text-white transition-colors">X</Link>
            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
            <Link href="#" className="hover:text-white transition-colors">Wolt Life</Link>
          </div>
        </div>

        <div className="flex justify-between items-center text-[12px] pt-[24px]">
          <div className="flex items-center gap-[24px]">
            <button className="flex items-center gap-[8px] hover:text-white transition-colors">
              <span className="w-5 h-5 bg-[#b3b3b3] rounded-full inline-block flex items-center justify-center text-black text-[10px] font-bold">AZ</span>
              Azerbaijan
            </button>
            <button className="flex items-center gap-[8px] hover:text-white transition-colors">
              <Globe size={16} /> English
            </button>
            <button className="flex items-center gap-[8px] hover:text-white transition-colors">
              <Moon size={16} /> Theme
            </button>
            <button className="flex items-center gap-[8px] hover:text-white transition-colors">
              <Cookie size={16} /> Cookies
            </button>
          </div>
          <div className="flex items-center gap-[24px]">
            <Link href="#" className="hover:text-white transition-colors">Accessibility Statement</Link>
            <Link href="#" className="hover:text-white transition-colors">User Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Statement</Link>
            <span>© Wolt 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
