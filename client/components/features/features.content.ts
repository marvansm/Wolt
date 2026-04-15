import { t, type Dictionary } from "intlayer";

const featuresContent = {
  key: "features",
  content: {
    cart: {
      yourOrders: t({
        en: "Your orders",
        tr: "Siparişleriniz",
      }),
      yourOrder: t({
        en: "Your order",
        tr: "Siparişiniz",
      }),
      edit: t({
        en: "Edit",
        tr: "Düzenle",
      }),
      shoppingCarts: t({
        en: "Shopping carts",
        tr: "Alışveriş sepetleri",
      }),
      orderAgain: t({
        en: "Order again",
        tr: "Tekrar sipariş ver",
      }),
      staleVenue: t({
        en: "Venue no longer available",
        tr: "Mekan artık mevcut değil",
      }),
      staleDesc: t({
        en: "This restaurant or store is no longer in our database. Your saved cart is out of date.",
        tr: "Bu restoran veya mağaza artık veritabanımızda yok. Kayıtlı sepetiniz güncelliğini yitirmiş.",
      }),
      clearStale: t({
        en: "Clear stale cart",
        tr: "Eski sepeti temizle",
      }),
      emptyTitle: t({
        en: "Your cart is empty",
        tr: "Sepetiniz boş",
      }),
      emptyDesc: t({
        en: "Add products from your favorite venues!",
        tr: "Favori mekanlarınızdan ürünler ekleyin!",
      }),
      deliveryIn: t({
        en: "Delivery in",
        tr: "Teslimat:",
      }),
      min: t({
        en: "min",
        tr: "dk",
      }),
      itemSubtotal: t({
        en: "Item subtotal",
        tr: "Ürün ara toplamı",
      }),
      addMore: t({
        en: "Add more items",
        tr: "Daha fazla ürün ekle",
      }),
      goToCheckout: t({
        en: "Go to checkout",
        tr: "Ödemeye geç",
      }),
      rate: t({
        en: "Rate",
        tr: "Oyla",
      }),
      popular: t({
        en: "Popular",
        tr: "Popüler",
      }),
      addComment: t({
        en: "Add comment for venue",
        tr: "Mekan için yorum ekle",
      }),
      commentDesc: t({
        en: "Special requests, allergies, dietary restrictions, greeting card text...",
        tr: "Özel istekler, alerjiler, diyet kısıtlamaları, tebrik kartı metni...",
      }),
      add: t({
        en: "Add",
        tr: "Ekle",
      }),
      yourNote: t({
        en: "Your note",
        tr: "Notunuz",
      }),
      recommended: t({
        en: "Recommended for you",
        tr: "Sizin için önerilenler",
      }),
      cancel: t({
        en: "Cancel",
        tr: "İptal",
      }),
      save: t({
        en: "Save",
        tr: "Kaydet",
      }),
      addNotePlaceholder: t({
        en: "E.g. no onions, allergic to...",
        tr: "Örn: soğan olmasın, şuna alerjim var...",
      }),
    },
    location: {
      title: t({
        en: "Add new address",
        tr: "Yeni adres ekle",
      }),
      country: t({
        en: "Country",
        tr: "Ülke",
      }),
      streetPlaceholder: t({
        en: "Street name and number",
        tr: "Sokak adı ve numara",
      }),
      continue: t({
        en: "Continue",
        tr: "Devam et",
      }),
      alertLocatingFailed: t({
        en: "Could not get your location. Please check permissions.",
        tr: "Konumunuz alınamadı. Lütfen izinleri kontrol edin.",
      }),
      alertNotSupported: t({
        en: "Geolocation is not supported by your browser.",
        tr: "Coğrafi konum tarayıcınız tarafından desteklenmiyor.",
      }),
    },
    search: {
      placeholder: t({
        en: "Search in Wolt",
        tr: "Wolt'ta ara",
      }),
      emptyPrompt: t({
        en: "Search for restaurants, stores or items",
        tr: "Restoran, mağaza veya ürün ara",
      }),
      restaurantsAndStores: t({
        en: "Restaurants and stores",
        tr: "Restoranlar ve mağazalar",
      }),
      relatedItems: t({
        en: "Related items",
        tr: "İlgili ürünler",
      }),
      seeAll: t({
        en: "See all",
        tr: "Hepsini gör",
      }),
      noResults: t({
        en: 'No results found for "{query}"',
        tr: '"{query}" için sonuç bulunamadı',
      }),
    },
    userDropdown: {
      loggingOut: t({
        en: "Logging out...",
        tr: "Çıkış yapılıyor...",
      }),
      profile: t({
        en: "Profile",
        tr: "Profil",
      }),
      woltPlusActive: t({
        en: "Active until",
        tr: "Şu tarihe kadar aktif:",
      }),
      joinWoltPlus: t({
        en: "Join Wolt+ and save",
        tr: "Wolt+'a katılın ve tasarruf edin",
      }),
      redeemCode: t({
        en: "Redeem Wolt+ code",
        tr: "Wolt+ kodu kullan",
      }),
      language: t({
        en: "Language",
        tr: "Dil",
      }),
      contactSupport: t({
        en: "Contact Support",
        tr: "Destekle İletişime Geç",
      }),
      logout: t({
        en: "Log out",
        tr: "Çıkış yap",
      }),
    },
    partnersDropdown: {
      title: t({
        en: "Partners",
        tr: "Ortaklar",
      }),
      forCouriers: t({
        en: "For couriers",
        tr: "Kuryeler için",
      }),
      forMerchants: t({
        en: "For merchants",
        tr: "Tüccarlar (Mağazalar) için",
      }),
      forCompanies: t({
        en: "For companies",
        tr: "Şirketler için",
      }),
      woltDrive: t({
        en: "Wolt Drive",
        tr: "Wolt Drive",
      }),
    },
    theme: {
      title: t({
        en: "Theme",
        tr: "Tema",
      }),
      auto: t({
        en: "Auto",
        tr: "Otomatik",
      }),
      light: t({
        en: "Light",
        tr: "Açık",
      }),
      dark: t({
        en: "Dark",
        tr: "Koyu",
      }),
      highContrast: t({
        en: "High Contrast",
        tr: "Yüksek Kontrast",
      }),
      done: t({
        en: "Done",
        tr: "Bitti",
      }),
    },
    review: {
      title: t({
        en: "Rate this product",
        tr: "Bu ürünü oyla",
      }),
      loginPrompt: t({
        en: "Please log in to leave a review",
        tr: "Yorum bırakmak için lütfen giriş yapın",
      }),
      login: t({
        en: "Login",
        tr: "Giriş yap",
      }),
      howManyStars: t({
        en: "How many stars?",
        tr: "Kaç yıldız?",
      }),
      yourFeedback: t({
        en: "Your feedback",
        tr: "Geri bildiriminiz",
      }),
      feedbackPlaceholder: t({
        en: "Tell others what you liked or didn't like...",
        tr: "Başkalarına neyi sevip sevmediğinizi söyleyin...",
      }),
      postReview: t({
        en: "Post review",
        tr: "Yorumu gönder",
      }),
      alertSuccess: t({
        en: "Review submitted successfully!",
        tr: "Yorum başarıyla gönderildi!",
      }),
      alertError: t({
        en: "An error occurred while sending the review. Please log in again.",
        tr: "Yorum gönderilirken bir hata oluştu. Lütfen tekrar giriş yapın.",
      }),
    },
    common: {
      sponsored: t({
        en: "Sponsored",
        tr: "Sponsorlu",
      }),
      noImage: t({
        en: "No image",
        tr: "Görüntü yok",
      }),
      min: t({
        en: "min",
        tr: "dk",
      }),
    },
  },
} satisfies Dictionary;

export default featuresContent;
