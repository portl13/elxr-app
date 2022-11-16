# Nextjs project configuration

## Getting Started

First set the environment variables:

Rename the file __.env.example__ to __.env__.

configure the seed for authentication by jwt has to be shared with the seed found in wp-cofing

__wp-config.php__
```php
define('JWT_AUTH_SECRET_KEY', 'SEED');
```

__.ENV__
```
JWT_SECRET=SEED
```

### configuration of the next-auth

- put in the .env file

__.ENV__
```
NEXTAUTH_SECRET=''
NEXTAUTH_URL=''
```

### configuration of the next.config.js file

- set the base url of the WordPress site in the variable.

```js
const baseUrl = 'https://elxr.portl.live'
```

- stripe configuration

configure the production domain of the site in next and stripe api key

```js
const nextConfig = {
    env: {
        ...moreSetings,
        nextSite: 'https://site-next.example',
        Stripe_Key: 'API_KEY'
    }
}
```
- woocommerce configuration

you have to create a customer key and a secret key in WordPress in the Woocommerce > settings > advanced > API REST section and set the variables.

```js
const nextConfig = {
    env: {
        ...moreSetings,
        WOO_CK: 'WOO_CK',
        WOO_CS: 'WOO_CS',
    }
}
```
- Cloudflare Configuration

```js
const nextConfig = {
    env: {
        ...moreSetings,
        XAuthEmail: 'cloudflare@example.com',
        XAuthKey: 'XAuthKey',
        AccountId: 'AccountId',
        SubdomainCloudflare: 'customer-example.cloudflarestream.com'
    }
}
```

- Additional configurations

```bash
npm run dev
# or
yarn dev
```