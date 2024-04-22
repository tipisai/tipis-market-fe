/** @type {import('next-i18next').UserConfig} */
const path = require("path")
module.exports = {
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US", "zh-CN", "ja-JP", "de-DE", "zh-TW"],
    localeDetection: false,
    localePath: path.resolve("./public/locales"),
  },
}
