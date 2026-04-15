const _NPgVJ76HMZEY53h6BJz4 = require('../dictionary/auth.json');
const _KdbyWZsHBMP9YGkMHxew = require('../dictionary/checkout.json');
const _rCYjkA0ZvJxtkrbzVgtu = require('../dictionary/discovery.json');
const _BUkXwF5wQDB5ambLuzZW = require('../dictionary/features.json');
const _s04eP5BK37ArgMZHgI7e = require('../dictionary/home.json');
const _nkqsvpSgkQXZeES4yS0c = require('../dictionary/layout.json');
const _0AeKYZBGFpQMG6THFAbS = require('../dictionary/order-tracking.json');
const _dpWTzSZQWmg7MOaCiJFI = require('../dictionary/profile.json');
const _5YRpBLI93iphWfzmpO3E = require('../dictionary/store.json');

const dictionaries = {
  "auth": _NPgVJ76HMZEY53h6BJz4,
  "checkout": _KdbyWZsHBMP9YGkMHxew,
  "discovery": _rCYjkA0ZvJxtkrbzVgtu,
  "features": _BUkXwF5wQDB5ambLuzZW,
  "home": _s04eP5BK37ArgMZHgI7e,
  "layout": _nkqsvpSgkQXZeES4yS0c,
  "order-tracking": _0AeKYZBGFpQMG6THFAbS,
  "profile": _dpWTzSZQWmg7MOaCiJFI,
  "store": _5YRpBLI93iphWfzmpO3E
};
const getDictionaries = () => dictionaries;

module.exports.getDictionaries = getDictionaries;
module.exports = dictionaries;
