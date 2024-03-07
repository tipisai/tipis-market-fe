const { i18n } = require("./next-i18next.config")
const package = require("./package.json")

const getUsedEnv = (env) => {
  const usedEnv = {}
  Object.keys(env).forEach((key) => {
    if (key.startsWith("ILLA_")) {
      let value = env[key]
      if (key === 'ILLA_APP_VERSION') {
        value = package.version
      }
      usedEnv[key] = value
    }
  })
  return usedEnv
}

/** @type {import("next").NextConfig} */
const nextConfig = {
  i18n,
  react: { useSuspense: false },
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  output: 'standalone',
  compiler: {
    emotion: true,
  },
  transpilePackages: ["@illa-public/*"],
  env: getUsedEnv(process.env),
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: /react/,
        use: [{
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              multipass: true,
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
                "prefixIds",
              ],
            },
          },
        }],
      },
      {
        ...fileLoaderRule,
        resourceQuery: { not: [/react/] },
      }
    )
    return config
  },
}

module.exports = nextConfig
