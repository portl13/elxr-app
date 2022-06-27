/** @type {import('next').NextConfig} */

const baseUrl = 'https://data.portl.live'

const nextConfig = {
  reactStrictMode: true,
  env: {
    baseUrl: baseUrl,
    nextSite: 'https://channels.portl.live',
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
    LIVEPEER_API_URL: 'https://livepeer.com/api',
    NEXT_PUBLIC_API_EVENTS_WP:
      'https://events.portl.live/wp-json/tribe/events/v1/',
    NEXT_PUBLIC_GETSTREAM_KEY: 'ekpyxjmu458q',
    NEXT_PUBLIC_GETSTREAM_SECRET_KEY:
      '7kdwr33urmx2mxevfqayn9yzd42dw68qdr2casvua7cf8uffqh6adcybs2h6swhz',
    Stripe_Key: 'pk_live_g05hIHuQ9QTYvhZVrV0xA0Dw00pMSBzrNM',
    NEXT_PUBLIC_BASE_URL: baseUrl,
  },
  images: {
    domains: ['data.portl.live'],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg')
    )
    fileLoaderRule.exclude = /\.svg$/
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack'),
    })
    return config
  },
}

module.exports = nextConfig
