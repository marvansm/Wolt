import { t, type Dictionary } from "intlayer";

const layoutContent = {
  key: "layout",
  content: {
    header: {
      jobs: t({
        en: "Jobs",
        tr: "İş İlanları",
      }),
      login: t({
        en: "Log in",
        tr: "Giriş yap",
      }),
      signup: t({
        en: "Sign up",
        tr: "Kaydol",
      }),
      viewOrder: t({
        en: "View order",
        tr: "Siparişi görüntüle",
      }),
      addAddress: t({
        en: "Add an address",
        tr: "Adres ekle",
      }),
      defaultLocation: t({
        en: "Baku",
        tr: "Bakü",
      }),
      enterAddress: t({
        en: "Enter delivery address",
        tr: "Teslimat adresi girin",
      }),
      searchPlaceholder: t({
        en: "Search in Wolt",
        tr: "Wolt'ta ara",
      }),
    },
    footer: {
      partner: t({
        en: "Partner with Wolt",
        tr: "Wolt ile ortak olun",
      }),
      couriers: t({
        en: "For couriers",
        tr: "Kuryeler için",
      }),
      merchants: t({
        en: "For merchants",
        tr: "Tüccarlar (Mağazalar) için",
      }),
      affiliates: t({
         en: "For affiliates",
         tr: "İştirakler için",
      }),
      company: t({
        en: "Company",
        tr: "Şirket",
      }),
      about: t({
        en: "About us",
        tr: "Hakkımızda",
      }),
      standFor: t({
        en: "What we stand for",
        tr: "Neyi temsil ediyoruz",
      }),
      jobs: t({
        en: "Jobs",
        tr: "İş İlanları",
      }),
      sustainability: t({
        en: "Sustainability",
        tr: "Sürdürülebilirlik",
      }),
      security: t({
        en: "Security",
        tr: "Güvenlik",
      }),
      investors: t({
        en: "Investors",
        tr: "Yatırımcılar",
      }),
      products: t({
        en: "Products",
        tr: "Ürünler",
      }),
      links: t({
        en: "Useful links",
        tr: "Faydalı bağlantılar",
      }),
      support: t({
        en: "Support",
        tr: "Destek",
      }),
      follow: t({
        en: "Follow us",
        tr: "Bizi takip edin",
      }),
      theme: t({
        en: "Theme",
        tr: "Tema",
      }),
      language: t({
        en: "Language",
        tr: "Dil",
      }),
      cookies: t({
        en: "Cookies",
        tr: "Çerezler",
      })
    },
  },
} satisfies Dictionary;

export default layoutContent;
