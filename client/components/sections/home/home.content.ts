import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    banner: {
      newUsers: t({
        en: "New users get 14 days of 0₼ delivery",
        tr: "Yeni kullanıcılara 14 gün boyunca 0₼ teslimat ücreti",
      }),
      title: t({
        en: "Flowers. Delivered.",
        tr: "Çiçekler. Teslim Edildi.",
      }),
      placeholder: t({
        en: "Enter delivery address",
        tr: "Teslimat adresini girin",
      }),
      loginSaved: t({
        en: "Log in for saved addresses",
        tr: "Kayıtlı adresler için giriş yapın",
      }),
    },
    brand: {
      popular: t({
        en: "Popular around you right now",
        tr: "Şu an çevrenizde popüler",
      }),
    },
    lifeTastes: {
      title: t({
        en: "Life tastes better with Wolt",
        tr: "Wolt ile hayatın tadı bir başka",
      }),
      description: t({
        en: "Almost everything delivered to you – quickly, reliably, and affordably",
        tr: "Neredeyse her şey size teslim edilir – hızlı, güvenilir ve uygun fiyatlı",
      }),
      supportTitle: t({
        en: "Real support from real people",
        tr: "Gerçek insanlardan gerçek destek",
      }),
      supportDesc: t({
        en: "Our world-class support team has your back, with friendly assistance and fast response times.",
        tr: "Dünya standartlarındaki destek ekibimiz, dostça yardım ve hızlı yanıt süreleriyle yanınızda.",
      }),
      woltPlusTitle: t({
        en: "0₼ delivery fees with Wolt+",
        tr: "Wolt+ ile 0₼ teslimat ücreti",
      }),
      woltPlusDesc: t({
        en: "Enjoy zero delivery fees from the best restaurants and stores in your city.",
        tr: "Şehrinizdeki en iyi restoran ve mağazalardan sıfır teslimat ücretinin tadını çıkarın.",
      }),
    },
    features: {
      boostSales: t({
        en: "Boost your sales",
        tr: "Satışlarınızı artırın",
      }),
      boostSalesDesc: t({
        en: "91% of Wolt orders are extra sales you wouldn't otherwise get.",
        tr: "Wolt siparişlerinin %91'i, başka türlü elde edemeyeceğiniz ek satışlardır.",
      }),
      heavyLifting: t({
        en: "We do the heavy lifting",
        tr: "Ağır işleri biz hallediyoruz",
      }),
      heavyLiftingDesc: t({
        en: "We handle ads, payments, delivery and support.",
        tr: "Reklamları, ödemeleri, teslimatı ve desteği biz yönetiyoruz.",
      }),
      riskFree: t({
        en: "It's 100% risk-free",
        tr: "%100 risktsizdir",
      }),
      riskFreeDesc: t({
        en: "There's no fee for joining Wolt. You can quit whenever, for any reason. When you earn, we earn.",
        tr: "Wolt'a katılmak için herhangi bir ücret yoktur. Herhangi bir nedenle istediğiniz zaman ayrılabilirsiniz. Siz kazandığınızda biz de kazanırız.",
      }),
      logistics: t({
        en: "Power online sales with same-hour deliveries",
        tr: "Aynı saatte teslimatlarla online satışlara güç katın",
      }),
      logisticsDesc: t({
        en: "Add Wolt Drive logistics for fast, affordable express deliveries for e-commerce.",
        tr: "E-ticaret için hızlı, uygun fiyatlı ekspres teslimatlar için Wolt Drive lojistiğini ekleyin.",
      }),
      learnMore: t({
        en: "Learn more",
        tr: "Daha fazla bilgi al",
      }),
      forRestaurants: t({
        en: "For restaurants",
        tr: "Restoranlar için",
      }),
      forStores: t({
        en: "For stores",
        tr: "Mağazalar için",
      }),
    },
    heroCards: {
      growBusiness: t({
        en: "For restaurants and stores",
        tr: "Restoranlar ve mağazalar için",
      }),
      growBusinessDesc: t({
        en: "Let's grow your business together",
        tr: "İşletmenizi birlikte büyütelim",
      }),
      forCouriers: t({
        en: "For couriers",
        tr: "Kuryeler için",
      }),
      forCouriersDesc: t({
        en: "Earn when and where you want",
        tr: "İstediğiniz zaman ve yerde kazanın",
      }),
      getStarted: t({
        en: "Get started",
        tr: "Başlayın",
      }),
    },
    carrier: {
      becomeCourier: t({
        en: "Become a courier partner",
        tr: "Kurye ortağı olun",
      }),
      becomeCourierDesc: t({
        en: "Earn by delivering to local customers. Set your own schedule, deliver when and where you want.",
        tr: "Yerel müşterilere teslimat yaparak kazanın. Kendi programınızı belirleyin, istediğiniz zaman ve yerde teslimat yapın.",
      }),
      reachNewCustomers: t({
        en: "Reach new customers",
        tr: "Yeni müşterilere ulaşın",
      }),
      reachNewCustomersDesc: t({
        en: "We help you to grow your business by helping thousands of people find your venue.",
        tr: "Binlerce insanın mekanınızı bulmasına yardımcı olarak işinizi büyütmenize destek oluyoruz.",
      }),
    },
    learnMore: {
      competitiveEarnings: t({
        en: "Competitive earnings",
        tr: "Rekabetçi kazançlar",
      }),
      competitiveEarningsDesc: t({
        en: "The more you deliver, the more money you can earn. Get paid per delivery and for distance covered.",
        tr: "Ne kadar çok teslimat yaparsanız, o kadar çok para kazanabilirsiniz. Teslimat başına ve katedilen mesafe için ödeme alın.",
      }),
      flexibleHours: t({
        en: "Flexible hours",
        tr: "Esnek saatler",
      }),
      flexibleHoursDesc: t({
        en: "Choose your own hours and set your own schedule. Plus, no delivery experience required.",
        tr: "Kendi saatlerinizi seçin ve kendi programınızı ayarlayın. Ayrıca, teslimat deneyimi gerekmez.",
      }),
    }
  },
} satisfies Dictionary;

export default homeContent;
