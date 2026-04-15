import { t, type Dictionary } from "intlayer";

const checkoutContent = {
  key: "checkout",
  content: {
    title: t({
      en: "Checkout",
      tr: "Ödeme",
    }),
    adjustPin: t({
      en: "Adjust pin",
      tr: "Pimi ayarla",
    }),
    back: t({
      en: "Back",
      tr: "Geri",
    }),
    delivery: t({
      en: "Delivery",
      tr: "Teslimat",
    }),
    pickup: t({
      en: "Pickup",
      tr: "Gel-al",
    }),
    where: t({
      en: "Where?",
      tr: "Nereye?",
    }),
    selectedAddress: t({
      en: "Selected Address",
      tr: "Seçili Adres",
    }),
    chooseAddress: t({
      en: "Choose address",
      tr: "Adres seçin",
    }),
    tapToChoose: t({
      en: "Tap to choose or find location",
      tr: "Konumu seçmek veya bulmak için dokunun",
    }),
    leaveAtDoor: t({
      en: "Leave order at the door",
      tr: "Siparişi kapıya bırak",
    }),
    sendAsGift: t({
      en: "Send as a gift",
      tr: "Hediye olarak gönder",
    }),
    active: t({
      en: "Active",
      tr: "Aktif",
    }),
    addCourierNote: t({
      en: "Add note for the courier",
      tr: "Kurye için not ekle",
    }),
    when: t({
      en: "When?",
      tr: "Ne zaman?",
    }),
    priority: t({
      en: "Priority",
      tr: "Öncelikli",
    }),
    priorityDesc: t({
      en: "25-35 min • Direct to you",
      tr: "25-35 dk • Doğrudan size",
    }),
    new: t({
      en: "New",
      tr: "Yeni",
    }),
    standard: t({
      en: "Standard",
      tr: "Standart",
    }),
    standardDesc: t({
      en: "30-40 min",
      tr: "30-40 dk",
    }),
    schedule: t({
      en: "Schedule",
      tr: "Planla",
    }),
    scheduleDesc: t({
      en: "Choose a delivery time",
      tr: "Bir teslimat zamanı seçin",
    }),
    orderItems: t({
      en: "Order items",
      tr: "Sipariş ürünleri",
    }),
    addMore: t({
      en: "Add more",
      tr: "Daha fazla ekle",
    }),
    addVenueComment: t({
      en: "Add comment for venue",
      tr: "Mekan için yorum ekle",
    }),
    venueCommentPlaceholder: t({
      en: "Special requests, allergies, or any context for the chef...",
      tr: "Özel istekler, alerjiler veya şef için herhangi bir not...",
    }),
    edit: t({
      en: "Edit",
      tr: "Düzenle",
    }),
    add: t({
      en: "Add",
      tr: "Ekle",
    }),
    payment: t({
      en: "Payment",
      tr: "Ödeme",
    }),
    paymentMethod: t({
      en: "Payment method",
      tr: "Ödeme yöntemi",
    }),
    card: t({
      en: "Visa/Mastercard",
      tr: "Visa/Mastercard",
    }),
    cash: t({
      en: "Pay by Cash",
      tr: "Nakit Öde",
    }),
    credits: t({
      en: "Wolt Credits",
      tr: "Wolt Kredileri",
    }),
    tapToChangePayment: t({
      en: "Tap to change payment method",
      tr: "Ödeme yöntemini değiştirmek için dokunun",
    }),
    promoPlaceholder: t({
      en: "Enter gift card or promo code",
      tr: "Hediye kartı veya promosyon kodu girin",
    }),
    submit: t({
      en: "Submit",
      tr: "Gönder",
    }),
    addCourierTip: t({
      en: "Add courier tip",
      tr: "Kurye bahşişi ekle",
    }),
    tipDesc: t({
      en: "They'll get 100% of your tip after the delivery.",
      tr: "Teslimattan sonra bahşişinizin %100'ü onlara ulaşacaktır.",
    }),
    other: t({
      en: "Other",
      tr: "Diğer",
    }),
    summary: t({
      en: "Summary",
      tr: "Özet",
    }),
    inclTaxes: t({
      en: "Incl. taxes (if applicable)",
      tr: "Vergiler dahil (varsa)",
    }),
    howFeesWork: t({
      en: "How fees work",
      tr: "Ücretler nasıl işler?",
    }),
    subtotal: t({
      en: "Item subtotal",
      tr: "Ürün ara toplamı",
    }),
    bagFee: t({
      en: "Bag fee",
      tr: "Poşet ücreti",
    }),
    serviceFee: t({
      en: "Service fee",
      tr: "Hizmet ücreti",
    }),
    deliveryFee: t({
      en: "Delivery",
      tr: "Teslimat",
    }),
    total: t({
      en: "Total",
      tr: "Toplam",
    }),
    onlyWithWoltPlus: t({
      en: "Only with Wolt+",
      tr: "Sadece Wolt+ ile",
    }),
    woltPlusPromo: t({
      en: "Get AZN 0 delivery fee and more with Wolt+.",
      tr: "Wolt+ ile 0 AZN teslimat ücreti ve daha fazlasını alın.",
    }),
    learnMore: t({
      en: "Learn more",
      tr: "Daha fazla bilgi al",
    }),
    startSaving: t({
      en: "Start saving now",
      tr: "Şimdi tasarruf etmeye başlayın",
    }),
    pleaseAddPayment: t({
      en: "Please add a payment method to",
      tr: "Siparişinize devam etmek için",
    }),
    continueWithOrder: t({
      en: "continue with your order",
      tr: "lütfen bir ödeme yöntemi ekleyin",
    }),
    finishOrder: t({
      en: "Finish order",
      tr: "Siparişi tamamla",
    }),
    selectAddressError: t({
      en: "Please select or add a delivery address.",
      tr: "Lütfen bir teslimat adresi seçin veya ekleyin.",
    }),
    noteForCourier: t({
      en: "Note for the courier",
      tr: "Kurye için not",
    }),
    notePlaceholder: t({
      en: "Door code, building number, or how to reach you...",
      tr: "Kapı kodu, bina numarası veya size nasıl ulaşılacağı...",
    }),
    cancel: t({
      en: "Cancel",
      tr: "İptal",
    }),
    saveNote: t({
      en: "Save note",
      tr: "Notu kaydet",
    }),
    saveComment: t({
      en: "Save",
      tr: "Kaydet",
    }),
  },
} satisfies Dictionary;

export default checkoutContent;
