import "intlayer";
import _8UYPCgGkr0YvUEyFU7Cm from './auth.ts';
import _UrBf2yNTiIJbZ7Qwvn8q from './checkout.ts';
import _1Uvd4hVqwEMieEZ8cQ39 from './discovery.ts';
import _SVWUYXfKdF80Z8bXTm3g from './features.ts';
import _DZkiUZ0m655UZKDSQzbA from './home.ts';
import _EFGE0svIhKhXZaRKmh2j from './layout.ts';
import _TAJKiRKpmLKVeNXLwcNz from './order-tracking.ts';
import _iq9k2OtNtYExaTcmH1ps from './profile.ts';
import _vOfaiPiz2wOtr7Q8Z1Rm from './store.ts';

declare module 'intlayer' {
  interface __DictionaryRegistry {
    "auth": typeof _8UYPCgGkr0YvUEyFU7Cm;
    "checkout": typeof _UrBf2yNTiIJbZ7Qwvn8q;
    "discovery": typeof _1Uvd4hVqwEMieEZ8cQ39;
    "features": typeof _SVWUYXfKdF80Z8bXTm3g;
    "home": typeof _DZkiUZ0m655UZKDSQzbA;
    "layout": typeof _EFGE0svIhKhXZaRKmh2j;
    "order-tracking": typeof _TAJKiRKpmLKVeNXLwcNz;
    "profile": typeof _iq9k2OtNtYExaTcmH1ps;
    "store": typeof _vOfaiPiz2wOtr7Q8Z1Rm;
  }

  interface __DeclaredLocalesRegistry {
    "en": 1;
    "tr": 1;
  }

  interface __RequiredLocalesRegistry {
    "en": 1;
    "tr": 1;
  }

  interface __SchemaRegistry {

  }

  interface __StrictModeRegistry { mode: 'inclusive' }

  interface __EditorRegistry { enabled : false } 
}
