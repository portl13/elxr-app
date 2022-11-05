/** @type {import('next').NextConfig} */

const baseUrl = 'https://data.portl.live'
//const baseUrl = 'https://devtest.local'

const nextConfig = {
  reactStrictMode: true,
  env: {
    baseUrl: baseUrl,
    nextSite: 'https://channels.portl.live',
    apiV2: `${baseUrl}/wp-json/api/v2`,
    bossApi: baseUrl + '/wp-json/buddyboss/v1',
    apiURl: baseUrl + '/wp-json/portl/v1',
    portlApi: baseUrl + '/wp-json/portl-social-rest/v1',
    woocomApi: baseUrl + '/wp-json/wc/v3',
    productApi: baseUrl + '/wp-json/portl/v1/product',
    meetApi: baseUrl + '/wp-json/portl/v1/group',
    myAccount: baseUrl + '/wp-json/portl/v1/my-account',
    courseUrl: baseUrl + '/wp-json',
    courseImage: baseUrl + '/wp-json/wp/v2/media',
    authorDetail: baseUrl + '/wp-json/wp/v2/users',
    BASE_API_URL: 'https://api.portl.com',
    API_KEY_OPENCAGE: '3ce3fd903a7c4ba5a7322ba462c666a7',
    LIVEPEER_API_TOKEN: '3f431bf4-7b36-4164-aab8-fcf87c136161',
    LIVEPEER_API_URL: 'https://livepeer.studio/api',
    NEXT_PUBLIC_API_EVENTS_WP:
      'https://events.portl.live/wp-json/tribe/events/v1/',
    NEXT_PUBLIC_GETSTREAM_KEY: 'ekpyxjmu458q',
    NEXT_PUBLIC_GETSTREAM_SECRET_KEY:
      '7kdwr33urmx2mxevfqayn9yzd42dw68qdr2casvua7cf8uffqh6adcybs2h6swhz',
    Stripe_Key: 'pk_live_g05hIHuQ9QTYvhZVrV0xA0Dw00pMSBzrNM',
    NEXT_PUBLIC_BASE_URL: baseUrl,
    WOO_CK: 'ck_5ccb27bea35f9bbdc559dfca03ba03e203e41c48',
    WOO_CS: 'cs_a83052d250119d7fda43330ee09b834d63865085',
    XAuthEmail: 'contact@portl.com',
    XAuthKey: 'b587430efb801f7f069181ee50f2ad0e1e91f',
    AccountId: '5c63240b3aa78582ec4d26feb05a28d7',
    SubdomainCloudflare: 'customer-85isopi7l4huoj8o.cloudflarestream.com'
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

module.exports = nextConfig
