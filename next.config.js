/** @type {import('next').NextConfig} */

const baseUrl = 'https://elxrdata.portl.live'
//const baseUrl = 'https://elxrdev.local'

const withTM = require('next-transpile-modules')(['@jitsi/react-sdk']);

const nextConfig = {
  reactStrictMode: false,
  env: {
    baseUrl: baseUrl,
    nextSite: "https://elxr.live",
    apiV2: `${baseUrl}/wp-json/api/v2`,
    bossApi: baseUrl + "/wp-json/buddyboss/v1",
    apiURl: baseUrl + "/wp-json/portl/v1",
    portlApi: baseUrl + "/wp-json/portl-social-rest/v1",
    woocomApi: baseUrl + "/wp-json/wc/v3",
    productApi: baseUrl + "/wp-json/portl/v1/product",
    meetApi: baseUrl + "/wp-json/portl/v1/group",
    myAccount: baseUrl + "/wp-json/portl/v1/my-account",
    courseUrl: baseUrl + "/wp-json",
    courseImage: baseUrl + "/wp-json/wp/v2/media",
    authorDetail: baseUrl + "/wp-json/wp/v2/users",
    BASE_API_URL: "https://api.portl.com",
    API_KEY_OPENCAGE: "3ce3fd903a7c4ba5a7322ba462c666a7",
    LIVEPEER_API_TOKEN: "f08a5d27-5b2e-4f65-8798-2d7eff043dba",
    LIVEPEER_API_URL: "https://livepeer.studio/api",
    NEXT_PUBLIC_API_EVENTS_WP:
      "https://events.portl.live/wp-json/tribe/events/v1/",
    NEXT_PUBLIC_GETSTREAM_KEY: "ekpyxjmu458q",
    NEXT_PUBLIC_GETSTREAM_SECRET_KEY:
      "7kdwr33urmx2mxevfqayn9yzd42dw68qdr2casvua7cf8uffqh6adcybs2h6swhz",
    Stripe_Key:
      "pk_live_51L3QBqFNeFjIyfmIOouPJyyUMwoK0hCUN6UXgOYFn1NgMwttawN5vw42WFLzsOmDMecqeMD4znBYRZdr2oVp7fvZ00oSd1rNel",
    NEXT_PUBLIC_BASE_URL: baseUrl,
    WOO_CK: "ck_bffe7ebf6b24954458046f527ace266e9094f61c",
    WOO_CS: "cs_09ab461ac3d8970944bb5a15b7008f2d38d6d16a",
    XAuthEmail: "emilio@elxr.life",
    XAuthKey: "22c9f1184e80b503de16fccd1444dbecbc8f9",
    AccountId: "f9533d9eeedee4c2f15e59148711a3ff",
    SubdomainCloudflare: "customer-5jpqvxf6uqk7jms6.cloudflarestream.com",
  },
  images: {
    domains: ['data.portl.live']
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg')
    )
    fileLoaderRule.exclude = /\.svg$/
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack')
    })
    return config
  }
}

module.exports = withTM(nextConfig);