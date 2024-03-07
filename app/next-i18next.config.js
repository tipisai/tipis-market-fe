/** @type {import('next-i18next').UserConfig} */
const path = require("path")
module.exports = {
  i18n: {
    defaultLocale: "en-US",
    locales: [
      "en-US",
      "zh-CN",
      "ja-JP",
      "ko-KR",
      "cs-CZ",
      "da-DK",
      "de-DE",
      "el-GR",
      "es-ES",
      "fi-FI",
      "fr-FR",
      "it-IT",
      "nl-NL",
      "no-NO",
      "pl-PL",
      "pt-PT",
      "ru-RU",
      "ro-RO",
      "sv-SE",
      "uk-UA",
    ],
    localeDetection: false,
    localePath: path.resolve("./public/locales"),
  },
}
