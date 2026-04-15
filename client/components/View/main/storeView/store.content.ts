import { t, type Dictionary } from "intlayer";

const storeContent = {
  key: "store",
  content: {
    ui: {
      storeNotFound: t({
        en: "Store not found",
        tr: "Mağaza bulunamadı",
      }),
      recentlyBought: t({
        en: "Recently bought items",
        tr: "Son satın alınan ürünler",
      }),
      reviews: t({
        en: "Reviews",
        tr: "Değerlendirmeler",
      }),
      more: t({
        en: "More",
        tr: "Daha fazla",
      }),
      searchIn: t({
        en: "Search in",
        tr: "Ara:",
      }),
      noProducts: t({
        en: "No products found for this store.",
        tr: "Bu mağaza için ürün bulunamadı.",
      }),
      deals: t({
        en: "Deals",
        tr: "Fırsatlar",
      }),
      products: t({
        en: "Products",
        tr: "Ürünler",
      }),
    },
    banner: {
      delivery: t({
        en: "Delivery",
        tr: "Teslimat",
      }),
      pickup: t({
        en: "Pickup",
        tr: "Gel-al",
      }),
      min: t({
        en: "min",
        tr: "dk",
      }),
      openUntil: t({
        en: "Open until",
        tr: "Kapanış:",
      }),
      minOrder: t({
        en: "Min. order",
        tr: "Min. sipariş",
      }),
      restaurantDetails: t({
        en: "Restaurant details",
        tr: "Restoran detayları",
      }),
      scheduleOrder: t({
        en: "Schedule order",
        tr: "Sipariş planla",
      }),
      orderTogether: t({
        en: "Order together",
        tr: "Birlikte sipariş ver",
      }),
    },
    reviews: {
      reviewsTitle: t({
        en: "Reviews",
        tr: "Değerlendirmeler",
      }),
      rateExperience: t({
        en: "Rate your experience",
        tr: "Deneyiminizi puanlayın",
      }),
      yourReview: t({
        en: "Your review",
        tr: "Yorumunuz",
      }),
      placeholder: t({
        en: "Tell others about the food and service...",
        tr: "Yemek ve hizmet hakkında başkalarına bilsi verin...",
      }),
      postReview: t({
        en: "Post review",
        tr: "Yorum yap",
      }),
      loginPrompt: t({
        en: "Please log in to leave a review",
        tr: "Yorum yapmak için lütfen giriş yapın",
      }),
      login: t({
        en: "Login",
        tr: "Giriş yap",
      }),
      noReviewsYet: t({
        en: "No reviews yet. Be the first!",
        tr: "Henüz yorum yok. İlk siz olun!",
      }),
      error: t({
        en: "An error occurred while sending the review. Please log in again.",
        tr: "Rəy göndərilərkən xəta baş verdi. Zəhmət olmasa yenidən daxil olun.",
      }),
    },
    productModal: {
      weight: t({
        en: "Weight:",
        tr: "Ağırlık:",
      }),
      unitPrice: t({
        en: "Unit Price:",
        tr: "Birim Fiyat:",
      }),
      addToOrder: t({
        en: "Add to order",
        tr: "Siparişe ekle",
      }),
    },
  },
} satisfies Dictionary;

export default storeContent;
