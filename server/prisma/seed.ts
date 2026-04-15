import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateMenuItems = (count: number, venueName: string) => {
  const foodImages = [
    "https://imageproxy.wolt.com/menu/menu-images/619fa310d231d26bed536888/0bd70b26-c1d0-11ee-84f0-9e6da65d8e80_cola_500_ml_glass.png",
    "https://imageproxy.wolt.com/menu/menu-images/5da81839730678ea9375b87d/68e6e5aa-f8da-11eb-92df-6ae6a6492c56_dogramac.jpeg",
    "https://imageproxy.wolt.com/menu/menu-images/603a697c651ac3dafd2cf16b/a2cf9c16-170c-11ed-96f1-f26f6b14445f________________________2022_08_08t152409.595.jpeg",
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
    "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80"
  ];

  const menuBank = [
    { category: "Pizza", names: ["Margarita", "Pepperoni", "Tavuklu", "Qarışıq Pizza", "Pendirli Məhəbbət"], descTemplate: ["Ən təzə inqrediyentlərlə hazırlanan odun sobasında bişmiş {name}.", "Bol mozzarella pendiri və xüsusi sousla ləzzətli {name}.", "Orijinal İtalyan resepti ilə hazırlanan ağızda əriyən {name}."] },
    { category: "Dönər və Şaurma", names: ["Ət Dönər", "Toyuq Dönər", "Şaurma", "Tantuni", "Kabab Çörəkdə"], descTemplate: ["Xüsusi ədviyyatlarla marinə edilmiş ləzzətli {name}.", "Közdə qızarmış xırtıldayan lavoşda super {name}.", "Əsl türk sayağı doyumlu və sulu {name}."] },
    { category: "İsti Yeməklər", names: ["Mərci Şorbası", "Toyuq Şorbası", "Lülə Kabab", "Tikə Kabab", "Pide", "Lahmacun"], descTemplate: ["İsti-isti ev yeməyi dadında {name} xüsusi sousla.", "Aşpazımızın xüsusi resepti ilə hazırlanmış çox ləzzətli {name}.", "Günün hər saatında iştahınızı açacaq təzə {name}."] },
    { category: "Fast Food", names: ["Cheeseburger", "Double Burger", "Chicken Roll", "Kartof Fri", "Soğan Həlqələri"], descTemplate: ["Sürətli ləzzət! Xırtıldayan dadda və yüksək keyfiyyətli {name}.", "Xüsusi burger sousu və turşu xiyar ilə fərqlənən təkrarolunmaz {name}.", "Dostlarla paylaşmaq üçün ən ideal seçim - dadlı {name}."] },
    { category: "İçkilər", names: ["Coca-Cola 330ml", "Ayran 200ml", "Fanta 0.5L", "Təbii Şirə", "Sprite 0.5L", "Limonad"], descTemplate: ["Buz kimi sərinləşdirici {name}.", "Yeməklərin ən yaxşı dostu olan təravətləndirici {name}.", "Klassik ləzzət - {name} ilə iştahınızı tamamlayın."] },
    { category: "Desertlər", names: ["Tiramisu", "San Sebastian", "Paxlava", "Şokoladlı Keks", "Südlac", "Dondurma"], descTemplate: ["Ağızda əriyən {name} ilə gününüzü şirinləşdirin.", "Gününü unudulmaz etmək istəyənlər üçün xüsusi {name}.", "Usta əllərindən çıxmış ləzzətli və təzə {name}."] }
  ];

  const allItems: any[] = [];
  menuBank.forEach(bank => {
    bank.names.forEach(name => {
      bank.descTemplate.forEach(desc => {
        allItems.push({ category: bank.category, name, descTemplate: desc });
      });
    });
  });

  const shuffled = allItems.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);
  
  const menu: any[] = [];
  let index = 0;

  for (const item of selected) {
    const price = (Math.random() * 12 + 3).toFixed(2);
    const hasDiscount = Math.random() > 0.75;
    const finalDesc = item.descTemplate.replace("{name}", item.name);
    
    const venuePrefix = Math.random() > 0.6 ? `${venueName} fərqi ilə ` : "";

    menu.push({
      id: `${venueName}-${item.name}-${item.category}`.toLowerCase().replace(/\s+/g, '-'),
      name: item.name,
      price: parseFloat(price),
      originalPrice: hasDiscount ? parseFloat((parseFloat(price) + (Math.random() * 4 + 1)).toFixed(2)) : null,
      category: item.category,
      description: venuePrefix + finalDesc,
      image: foodImages[Math.floor(Math.random() * foodImages.length)],
      weight: (Math.floor(Math.random() * 3) + 1) * 100 + "g",
      unitPrice: price,
      badge: hasDiscount ? "Endirim" : ""
    });
  }
  return menu;
};

async function main() {
  console.log('🌱 Wolt API-dan əsl verilənlər çəkilir (Fetching real data from Wolt)...');
  
  try {
    const res = await fetch("https://restaurant-api.wolt.com/v1/pages/front?lat=40.4093&lon=49.8671");
    const data = await res.json();
    
    let woltVenues: any[] = [];
    if (data.sections) {
      for (const section of data.sections) {
        if (section.items) {
          for (const item of section.items) {
            if (item.venue && woltVenues.length < 15) { // Limiting to top 15 for speed
              if (!woltVenues.find(v => v.venue.id === item.venue.id)) {
                 woltVenues.push({
                   venue: item.venue,
                   image_url: item.image?.url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                 });
              }
            }
          }
        }
      }
    }

    console.log(`✅ ${woltVenues.length} real restoran tapıldı. Menyular çəkilir...`);

    const restaurantData: any[] = [];

    for (const w of woltVenues) {
      const v = w.venue;
      console.log(`🍴 ${v.name} üçün menyu çəkilir...`);
      
      try {
        const menuRes = await fetch(`https://restaurant-api.wolt.com/v4/venues/${v.id}/menu`);
        const menuData = await menuRes.json();
        
        const mappedMenu: any[] = [];
        
        if (menuData.items) {
          menuData.items.slice(0, 50).forEach((item: any) => {
            const categoryObj = menuData.categories?.find((c: any) => c.id === item.category);
            const categoryName = categoryObj ? categoryObj.name : "Products";

      
            const rawPrice = item.base_price ?? item.baseprice ?? item.original_price ?? 0;
            const price = Number(rawPrice) / 100;

           
            if (price > 0) {
              mappedMenu.push({
                id: item.id,
                name: item.name,
                description: item.description || "Dadlı seçim",
                basePrice: price,
                price: price,
                image: item.image || w.image_url,
                category: categoryName,
                unitPrice: price.toFixed(2),
                badge: item.badges?.[0]?.text || ""
              });
            }
          });
        }

        const priceRangeStr = "$".repeat(v.price_range || 2);
        const formattedDeliveryFee = typeof v.delivery_price === 'number' 
          ? (v.delivery_price / 100).toFixed(2) + " AZN" 
          : "1.50 AZN";
        
        restaurantData.push({
          id: v.id,
          name: v.name,
          description: v.short_description || "Dadlı yeməklər",
          image: w.image_url,
          banner: w.image_url,
          avatar: v.brand_image?.url || w.image_url,
          deliveryTime: v.estimate_range || "30-40",
          rating: v.rating?.score || 8.5,
          priceRange: priceRangeStr,
          deliveryFee: formattedDeliveryFee,
          minOrderAmount: 10,
          address: v.address || "Baku",
          latitude: v.location ? v.location[1] : null,
          longitude: v.location ? v.location[0] : null,
          menu: mappedMenu
        });

     
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (menuError) {
        console.error(`❌ ${v.name} menyusu çəkilərkən xəta:`, menuError);
      }
    }

    console.log('🗑️ Verilənlər bazası təmizlənir...');
    await prisma.restaurant.deleteMany();

    console.log('🌱 Yeni real restoranlar və menyular əlavə edilir...');
    const result = await prisma.restaurant.createMany({
      data: restaurantData,
      skipDuplicates: true,
    });

    console.log(`🎉 Möhtəşəm! ${result.count} ədəd tam real Wolt restoranı və menyusu Supabase-ə aktarıldı!`);

  } catch (error) {
    console.error("❌ Xəta baş verdi:", error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('✅ Tohumlama (seed) tamamlandı.');
  });
