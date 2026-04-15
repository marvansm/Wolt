import { t, type Dictionary } from "intlayer";

const discoveryContent = {
  key: "discovery",
  content: {
    tabs: {
      discovery: t({
        en: "Discovery",
        tr: "Keşfet",
      }),
      restaurants: t({
        en: "Restaurants",
        tr: "Restoranlar",
      }),
      stores: t({
        en: "Stores",
        tr: "Mağazalar",
      }),
    },
    sections: {
      orderAgain: t({
        en: "Order again",
        tr: "Tekrar sipariş ver",
      }),
      ramadan: t({
        en: "Discounted offers for Ramadan",
        tr: "Ramazan için indirimli teklifler",
      }),
      featured: t({
        en: "Featured on Wolt",
        tr: "Wolt'ta öne çıkanlar",
      }),
      burgers: t({
        en: "Burgers",
        tr: "Burgerler",
      }),
      chicken: t({
        en: "Fried chicken",
        tr: "Kızarmış tavuk",
      }),
      fastest: t({
        en: "Fastest delivery",
        tr: "En hızlı teslimat",
      }),
      popularStores: t({
        en: "Popular stores",
        tr: "Popüler mağazalar",
      }),
    },
    ui: {
      seeAll: t({
        en: "See all",
        tr: "Hepsini gör",
      }),
      loading: t({
        en: "Loading...",
        tr: "Yükleniyor...",
      }),
      loadingCategories: t({
        en: "Loading categories...",
        tr: "Kategoriler yükleniyor...",
      }),
      noRestaurants: t({
        en: "No restaurants found for",
        tr: "Şunun için restoran bulunamadı:",
      }),
      restaurantsSuffix: t({
        en: "Restaurants",
        tr: "Restoranları",
      }),
    },
  },
} satisfies Dictionary;

export default discoveryContent;
