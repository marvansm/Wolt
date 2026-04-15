import { t, type Dictionary } from "intlayer";

const profileContent = {
  key: "profile",
  content: {
    title: t({
      en: "Profile",
      tr: "Profil",
    }),
    contactSupport: t({
      en: "Contact Support",
      tr: "Destekle İletişime Geç",
    }),
    tabs: {
      personalInfo: t({
        en: "Personal info",
        tr: "Kişisel bilgiler",
      }),
      paymentMethods: t({
        en: "Payment methods",
        tr: "Ödeme yöntemleri",
      }),
      addresses: t({
        en: "Addresses",
        tr: "Adresler",
      }),
      loyaltyCards: t({
        en: "Loyalty cards",
        tr: "Sadakat kartları",
      }),
      orderHistory: t({
        en: "Order history",
        tr: "Sipariş geçmişi",
      }),
      earnCredits: t({
        en: "Earn Wolt credits",
        tr: "Wolt kredisi kazan",
      }),
      redeemCode: t({
        en: "Redeem code",
        tr: "Kod kullan",
      }),
      settings: t({
        en: "Settings",
        tr: "Ayarlar",
      }),
    },
    personalInfo: {
      edit: t({
        en: "Edit",
        tr: "Düzenle",
      }),
      cancel: t({
        en: "Cancel",
        tr: "İptal",
      }),
      delete: t({
        en: "Delete",
        tr: "Sil",
      }),
      firstName: t({
        en: "First name",
        tr: "Ad",
      }),
      lastName: t({
        en: "Last name",
        tr: "Soyad",
      }),
      phoneNumber: t({
        en: "Phone number",
        tr: "Telefon numarası",
      }),
      email: t({
        en: "Email address",
        tr: "E-posta adresi",
      }),
      notProvided: t({
        en: "Not provided",
        tr: "Belirtilmemiş",
      }),
      saveChanges: t({
        en: "Save changes",
        tr: "Değişiklikleri kaydet",
      }),
      saving: t({
        en: "Saving...",
        tr: "Kaydediliyor...",
      }),
      verified: t({
        en: "Verified",
        tr: "Doğrulandı",
      }),
      unverified: t({
        en: "Unverified",
        tr: "Doğrulanmadı",
      }),
      verifyEmail: t({
        en: "Verify EMail",
        tr: "E-postayı Doğrula",
      }),
      verifyPhone: t({
        en: "Verify Phone",
        tr: "Telefonu Doğrula",
      }),
      enterCode: t({
        en: "Enter the 6-digit code sent to your",
        tr: "Şuraya gönderilen 6 haneli kodu girin:",
      }),
      verify: t({
        en: "Verify",
        tr: "Doğrula",
      }),
      giftCards: t({
        en: "Wolt gift cards",
        tr: "Wolt hediye kartları",
      }),
      giftCardsDesc: t({
        en: "You can use gift cards to pay for your orders.",
        tr: "Siparişleriniz için hediye kartlarını kullanabilirsiniz.",
      }),
      buyGiftCard: t({
        en: "Buy gift card",
        tr: "Hediye kartı satın al",
      }),
      viewGiftCards: t({
        en: "View gift cards",
        tr: "Hediye kartlarını gör",
      }),
      woltCredits: t({
        en: "Wolt credits",
        tr: "Wolt kredileri",
      }),
      woltCreditsDesc: t({
        en: "You can use credits to pay for your orders.",
        tr: "Siparişleriniz için kredileri kullanabilirsiniz.",
      }),
      yourFavorites: t({
        en: "Your favorites",
        tr: "Favorileriniz",
      }),
      favoritesDesc: t({
        en: "You'll find your favorite restaurants and stores here. You can add favorites by tapping the heart icon.",
        tr: "Favori restoranlarınızı ve mağazalarınızı burada bulacaksınız. Kalp simgesine dokunarak favoriler ekleyebilirsiniz.",
      }),
      favourite: t({
        en: "Favourite",
        tr: "Favori",
      }),
      risingStar: t({
        en: "RISING STAR",
        tr: "YÜKSELEN YILDIZ",
      }),
      seeMore: t({
        en: "See more",
        tr: "Daha fazlasını gör",
      }),
    },
    orderHistory: {
      backToHistory: t({
        en: "Back to order history",
        tr: "Sipariş geçmişine dön",
      }),
      orderPlaced: t({
        en: "Order placed",
        tr: "Sipariş verildi",
      }),
      delivery: t({
        en: "Delivery",
        tr: "Teslimat",
      }),
      orderId: t({
        en: "Order ID",
        tr: "Sipariş No",
      }),
      orderAgain: t({
        en: "Order again",
        tr: "Tekrar sipariş ver",
      }),
      items: t({
        en: "Items",
        tr: "Ürünler",
      }),
      totalSum: t({
        en: "Total sum",
        tr: "Toplam tutar",
      }),
      noOrders: t({
        en: "You haven't placed any orders yet.",
        tr: "Henüz hiç sipariş vermediniz.",
      }),
      track: t({
        en: "Track",
        tr: "Takip et",
      }),
      upToDate: t({
        en: "Good news, everything's up to date",
        tr: "Güzel haber, her şey güncel",
      }),
      loadMore: t({
        en: "Load more",
        tr: "Daha fazla yükle",
      }),
      emptySection: t({
        en: "This section is currently empty.",
        tr: "Bu bölüm şu anda boş.",
      }),
    },
    messages: {
      updateSuccess: t({
        en: "Profile updated successfully!",
        tr: "Profil başarıyla güncellendi!",
      }),
      updateVerifyPrompt: t({
        en: "Profile updated! Please verify any new contact details.",
        tr: "Profil güncellendi! Lütfen yeni iletişim bilgilerini doğrulayın.",
      }),
      uploadSuccess: t({
        en: "Profile picture updated!",
        tr: "Profil resmi güncellendi!",
      }),
      uploadFailed: t({
        en: "Failed to upload image",
        tr: "Resim yüklenemedi",
      }),
      codeSent: t({
        en: "code sent!",
        tr: "kodu gönderildi!",
      }),
      verifySuccess: t({
        en: "verified successfully!",
        tr: "başarıyla doğrulandı!",
      }),
    },
  },
} satisfies Dictionary;

export default profileContent;
