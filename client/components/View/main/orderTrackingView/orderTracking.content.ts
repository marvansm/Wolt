import { t, type Dictionary } from "intlayer";

const orderTrackingContent = {
  key: "order-tracking",
  content: {
    tabs: {
      status: t({
        en: "status",
        tr: "durum",
      }),
      details: t({
        en: "details",
        tr: "detaylar",
      }),
      addMore: t({
        en: "add more",
        tr: "daha fazla ekle",
      }),
    },
    status: {
      enjoy: t({
        en: "Enjoy!",
        tr: "Afiyet olsun!",
      }),
      delivered: t({
        en: "Delivered",
        tr: "Teslim edildi",
      }),
      secondsUntil: t({
        en: "seconds\nuntil delivered",
        tr: "saniye içinde\nteslim edilecek",
      }),
      back: t({
        en: "Back",
        tr: "Geri",
      }),
      shareTracking: t({
        en: "Share tracking",
        tr: "Takibi paylaş",
      }),
    },
    steps: {
      step1: {
        title: t({
          en: "That's it, we have your order!",
          tr: "İşte bu kadar, siparişiniz bizde!",
        }),
        sub: t({
          en: "Kick back and relax - we'll let you know when it's ready.",
          tr: "Arkanıza yaslanın ve rahatlayın - hazır olduğunda size haber vereceğiz.",
        }),
      },
      step2: {
        title: t({
          en: "Super! A human being has seen your order.",
          tr: "Süper! Bir insan siparişinizi gördü.",
        }),
      },
      step3: {
        title: t({
          en: "Almost there! Your order is being prepared now.",
          tr: "Neredeyse geldik! Siparişiniz şu anda hazırlanıyor.",
        }),
      },
      step4: {
        title: t({
          en: "Done! Your order is ready and being delivered.",
          tr: "Bitti! Siparişiniz hazır ve teslim ediliyor.",
        }),
      },
      step5: {
        title: t({
          en: "Your order should've been delivered by now. Enjoy!",
          tr: "Siparişiniz şimdiye kadar teslim edilmiş olmalıydı. Afiyet olsun!",
        }),
      },
    },
    details: {
      viewVenue: t({
        en: "View venue info",
        tr: "Mekan bilgisini gör",
      }),
      orderPlaced: t({
        en: "Order placed",
        tr: "Sipariş verildi",
      }),
      orderId: t({
        en: "Order ID",
        tr: "Sipariş No",
      }),
      deliveredTo: t({
        en: "Delivered to",
        tr: "Teslimat adresi",
      }),
      items: t({
        en: "Items",
        tr: "Ürünler",
      }),
      subtotal: t({
        en: "Subtotal",
        tr: "Ara toplam",
      }),
      bagFee: t({
        en: "Bag fee",
        tr: "Poşet ücreti",
      }),
      serviceFee: t({
        en: "Service fee",
        tr: "Hizmet bedeli",
      }),
      deliveryFee: t({
        en: "Delivery fee",
        tr: "Teslimat ücreti",
      }),
      total: t({
        en: "Total",
        tr: "Toplam",
      }),
    },
    addMore: {
      title: t({
        en: "Add more for less",
        tr: "Daha az ödemek için daha fazla ekle",
      }),
      timeLeft: t({
        en: "left",
        tr: "kaldı",
      }),
      promo: t({
        en: "AZN0 delivery fee. Minimum order applies.",
        tr: "0 AZN teslimat ücreti. Minimum sipariş tutarı geçerlidir.",
      }),
    },
    ui: {
      orderNotFound: t({
        en: "Order not found",
        tr: "Sipariş bulunamadı",
      }),
      orderNotFoundDesc: t({
        en: "We couldn't find the order you're looking for. It might have been cleared or the ID is incorrect.",
        tr: "Aradığınız siparişi bulamadık. Silinmiş olabilir veya kimlik numarası yanlıştır.",
      }),
      backToDiscovery: t({
        en: "Back to Discovery",
        tr: "Keşfete Dön",
      }),
    },
  },
} satisfies Dictionary;

export default orderTrackingContent;
