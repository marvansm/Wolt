const internationalization = {
  "locales": [
    "en",
    "tr"
  ],
  "defaultLocale": "en"
};
const routing = {
  "mode": "prefix-all",
  "storage": {
    "cookies": [
      {
        "name": "INTLAYER_LOCALE",
        "attributes": {}
      }
    ],
    "headers": [
      {
        "name": "x-intlayer-locale"
      }
    ]
  },
  "basePath": ""
};
const editor = {
  "editorURL": "http://localhost:8000",
  "cmsURL": "https://app.intlayer.org",
  "backendURL": "https://back.intlayer.org",
  "port": 8000,
  "enabled": false,
  "dictionaryPriorityStrategy": "local_first",
  "liveSync": true,
  "liveSyncPort": 4000,
  "liveSyncURL": "http://localhost:4000"
};
const log = {
  "mode": "default",
  "prefix": "\u001b[38;5;239m[intlayer] \u001b[0m"
};
const configuration = { internationalization, routing, editor, log };

export { internationalization, routing, editor, log, configuration };
export default configuration;
