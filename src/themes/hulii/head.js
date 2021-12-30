export default {
  title: 'Hulii',
  titleTemplate: '%s - Your Renewed Marketplace',
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { charset: 'utf-8' },
    { vmid: 'description', name: 'description', content: 'Hulii.com is a marketplace for high quality refurbished phones. Certified & tested by professionals - everything is equal, except the price.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, minimal-ui' },
    { name: 'robots', content: 'index, follow' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'theme-color', content: '#ffffff' },
    { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' },
    { property: 'og:title', content: 'Hulii' },
    { property: 'og:description', content: 'Hulii - Your Renewed Marketplace' },
    { property: 'og:image', content: 'https://e-com-magento-imges.s3-ap-southeast-1.amazonaws.com/images/hulii-social-sharing.jpg' },
    { property: 'og:url', content: 'https://hulii.com' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:site_name', content: 'Hulii' },
    { property: 'twitter:image:alt', content: 'Hulii - Your Renewed Marketplace' },
    { property: 'twitter:site', content: '@HuliiOfficial' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/assets/favicon-32x32.png', sizes: '32x32' },
    { rel: 'icon', type: 'image/png', href: '/assets/favicon-16x16.png', sizes: '16x16' },
    { rel: 'apple-touch-icon', href: '/assets/apple-touch-icon.png' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_2048.png', sizes: '2048x2732' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_1668.png', sizes: '1668x2224' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_1536.png', sizes: '1536x2048' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_1125.png', sizes: '1125x2436' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_1242.png', sizes: '1242x2208' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_750.png', sizes: '750x1334' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_640.png', sizes: '640x1136' },
    { rel: 'manifest', href: '/assets/manifest.json' },
    { rel: 'preload', href: '/assets/fonts/Gilroy-Medium.woff', as: 'font', crossorigin: 'anonymous' },
    { rel: 'preload', href: '/assets/fonts/Gilroy-Regular.woff', as: 'font', crossorigin: 'anonymous' },
    { rel: 'preload', href: '/assets/fonts/Gilroy-ExtraBold.woff', as: 'font', crossorigin: 'anonymous' },
    { rel: 'preload', href: '/assets/fonts/Gilroy-SemiBold.woff', as: 'font', crossorigin: 'anonymous' },
    { rel: 'preload', href: '/assets/fonts/Gilroy-Bold.woff', as: 'font', crossorigin: 'anonymous' }
  ],
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/pwacompat@2.0.6/pwacompat.min.js',
      async: true,
      integrity: 'sha384-GOaSLecPIMCJksN83HLuYf9FToOiQ2Df0+0ntv7ey8zjUHESXhthwvq9hXAZTifA',
      crossorigin: 'anonymous'
    }
  ]
}
