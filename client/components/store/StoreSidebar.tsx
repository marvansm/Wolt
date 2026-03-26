import { StoreSidebarProps } from "@/types/global";
import { Compass, Percent, Star, Tag, Zap, Coffee, Pizza, Utensils, Apple } from "lucide-react";



const CATEGORY_ICONS: Record<string, any> = {
  "Deals": <Percent size={18} className="text-wolt-red" />,
  "Most ordered": <Star size={18} className="text-wolt-yellow" />,
  "New": <Zap size={18} className="text-wolt-blue" />,
  "Fruit & Vegetables": <Apple size={18} />,
  "Beverages": <Coffee size={18} />,
  "Fast Food": <Pizza size={18} />,
  "Restaurants": <Utensils size={18} />,
  "Other": <Tag size={18} />,
};

export default function StoreSidebar({ categories, activeCategory }: StoreSidebarProps) {
  if (!categories || categories.length === 0) return null;

  const discoverItems = ["Deals", "Most ordered", "New"].filter(item => categories.includes(item));
  const mainCategories = categories.filter(item => !["Deals", "Most ordered", "New"].includes(item));

  return (
    <div className="w-full lg:w-64 sticky top-24 self-start bg-black/40 backdrop-blur-md lg:bg-transparent z-30 lg:z-auto py-2 lg:py-0 border-b border-white/10 lg:border-none mb-6 lg:mb-0 hidden md:block">
      <ul className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible hide-scrollbar lg:pr-6 whitespace-nowrap font-medium px-4 sm:px-6 lg:px-0">
        <li>
          <a 
            href="#discover"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
              !activeCategory || activeCategory === 'discover'
                ? "bg-[#183442] text-[#00C2E8] shadow-[inset_4px_0_0_0_#00C2E8]"
                : "text-[#a3a3a3] hover:bg-[#202020] hover:text-white"
            }`}
          >
            <Compass size={18} />
            Discover
          </a>
        </li>

        {discoverItems.map((item) => (
          <li key={item} className="ml-4 lg:ml-0 overflow-hidden">
            <a 
              href={`#${item.replace(/\s+/g, '-').toLowerCase()}`}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                activeCategory === item.replace(/\s+/g, '-').toLowerCase()
                  ? "text-white font-bold"
                  : "text-[#a3a3a3] hover:bg-[#202020] hover:text-white"
              }`}
            >
              <span className="shrink-0">{CATEGORY_ICONS[item] || <Tag size={16} />}</span>
              {item}
            </a>
          </li>
        ))}

        <div className="h-px bg-white/5 my-2 mx-4 hidden lg:block" />
        
        {mainCategories.map((category) => {
          const catId = category.replace(/\s+/g, '-').toLowerCase();
          const isActive = activeCategory === catId;
          return (
            <li key={category}>
               <a 
                 href={`#${catId}`}
                 className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                   isActive 
                    ? "text-white font-bold"
                    : "text-[#a3a3a3] hover:bg-[#202020] hover:text-white"
                 }`}
               >
                 <span className="shrink-0 opacity-70">{CATEGORY_ICONS[category] || <Tag size={18} />}</span>
                 {category}
               </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
