import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    contentDir: ["./"],
  },
  internationalization: {
    locales: [Locales.ENGLISH, Locales.TURKISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-all",
  },
};

export default config;
