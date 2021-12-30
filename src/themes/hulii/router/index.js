const Home = () => import(/* webpackChunkName: "vsf-home" */ 'theme/pages/Home.vue')
const PageNotFound = () => import(/* webpackChunkName: "vsf-not-found" */ 'theme/pages/PageNotFound.vue')
const ErrorPage = () => import(/* webpackChunkName: "vsf-error" */ 'theme/pages/Error.vue')
const Product = () => import(/* webpackChunkName: "vsf-product" */ 'theme/pages/Product.vue')
const Category = () => import(/* webpackChunkName: "vsf-category" */ 'theme/pages/Category.vue')
const CmsPage = () => import(/* webpackChunkName: "vsf-cms" */ 'theme/pages/CmsPage.vue')
const Checkout = () => import(/* webpackChunkName: "vsf-checkout" */ 'theme/pages/Checkout.vue')
const Compare = () => import(/* webpackChunkName: "vsf-compare" */ 'theme/pages/Compare.vue')
const MyAccount = () => import(/* webpackChunkName: "vsf-my-account" */ 'theme/pages/MyAccount.vue')
const Static = () => import(/* webpackChunkName: "vsf-static" */ 'theme/pages/Static.vue')
const Cart = () => import(/* webpackChunkName: "vsf-cart" */ 'theme/pages/Cart.vue')
const Register = () => import(/* webpackChunkName: "vsf-auth" */ 'theme/pages/Register.vue')
const Blog = () => import(/* webpackChunkName: "vsf-data" */ 'theme/pages/Blog')
const BlogPost = () => import(/* webpackChunkName: "vsf-data" */ 'theme/pages/BlogPost')
const HelpCenter = () => import(/* webpackChunkName: "vsf-static" */ 'theme/pages/HelpCenter.vue')
const Brand = () => import(/* webpackChunkName: "vsf-static" */ 'theme/pages/Brand.vue')
const Search = () => import(/* webpackChunkName: "vsf-static" */ 'theme/pages/Search.vue')
const FinaliseOrder = () => import(/* webpackChunkName: "vsf-static" */ 'theme/pages/FinaliseOrder.vue')
const ComingSoon = () => import(/* webpackChunkName: "vsf-static" */ 'theme/pages/ComingSoon.vue')
const SellerPage = () => import(/* webpackChunkName: "vsf-seller" */ 'theme/pages/StoreSeller.vue')
const BuyBackLanding = () => import(/* webpackChunkName: "vsf-seller" */ 'theme/pages/BuyBackLanding.vue')
const BuyBackDevice = () => import(/* webpackChunkName: "vsf-seller" */ 'theme/pages/BuyBackDevice.vue')
const BuyBackDetails = () => import(/* webpackChunkName: "vsf-seller" */ 'theme/pages/BuyBackDetails.vue')
const BuyBackThankyou = () => import(/* webpackChunkName: "vsf-seller" */ 'theme/pages/BuybackThankyou.vue')

let routes = [
  { name: 'home', path: '/', component: Home, alias: '/pwa.html' },
  { name: 'checkout', path: '/checkout', component: Checkout },
  { name: 'cart', path: '/cart', component: Cart },
  { name: 'legal', path: '/legal', component: Static, props: {page: 'lorem', title: 'Legal Notice'}, meta: {title: 'Legal Notice', description: 'Legal Notice - example of description usage'} },
  { name: 'privacy', path: '/privacy', component: Static, props: {page: 'lorem', title: 'Privacy'} },
  { name: 'magazine', path: '/magazine', component: Static, props: {page: 'lorem', title: 'Magazine'} },
  { name: 'sale', path: '/sale', component: Static, props: {page: 'lorem', title: 'Sale'} },
  { name: 'order-tracking', path: '/order-tracking', component: Static, props: {page: 'lorem', title: 'Track my Order'} },
  { name: 'Register', path: '/register', props: true, component: Register },
  { name: 'my-account', path: '/my-account', component: MyAccount, meta: { requiresAuth: true } },
  { name: 'my-shipping-details', path: '/my-account/shipping-details', component: MyAccount, props: { activeBlock: 'MyShippingDetails' }, meta: { requiresAuth: true } },
  { name: 'my-newsletter', path: '/my-account/newsletter', component: MyAccount, props: { activeBlock: 'MyNewsletter' }, meta: { requiresAuth: true } },
  { name: 'my-orders', path: '/my-account/orders', component: MyAccount, props: { activeBlock: 'MyOrders' }, meta: { requiresAuth: true } },
  { name: 'my-order', path: '/my-account/orders/:orderId', component: MyAccount, props: { activeBlock: 'MyOrder' }, meta: { requiresAuth: true } },
  { name: 'my-favourites', path: '/my-account/favourites', component: MyAccount, props: { activeBlock: 'MyFavourites' }, meta: { requiresAuth: true } },
  { name: 'about-us', path: '/about-us', component: Static, props: {page: 'lorem', title: 'About us'} },
  { name: 'faq', path: '/help-center/faq', component: HelpCenter, props: {title: 'Top FAQs'} },
  { name: 'shipping', path: '/help-center/shipping-and-delivery', component: HelpCenter, props: {title: 'Shipping & Delivery'} },
  { name: 'returns', path: '/help-center/returns', component: HelpCenter, props: {title: 'Returns'} },
  { name: 'warranty', path: '/help-center/warranty', component: HelpCenter, props: {title: 'Warranty'} },
  { name: 'product-quality', path: '/help-center/product-quality', component: HelpCenter, props: {title: 'Product Quality'} },
  { name: 'product-conditions', path: '/help-center/product-conditions', component: HelpCenter, props: {title: 'Product Conditions'} },
  { name: 'making-an-order', path: '/help-center/making-an-order', component: HelpCenter, props: {title: 'Making an Order'} },
  { name: 'about-hulii', path: '/help-center/about-hulii', component: HelpCenter, props: {title: 'About Hulii'} },
  { name: 'terms-of-use', path: '/help-center/terms-of-use', component: HelpCenter, props: {title: 'Terms of Use'} },
  { name: 'privacy-policy', path: '/help-center/privacy-policy', component: HelpCenter, props: {title: 'Privacy Policy'} },
  { name: 'contact-us', path: '/help-center/contact-us', component: HelpCenter, props: {title: 'Contact Us'} },
  { name: 'contact', path: '/contact', component: Static, props: {page: 'contact', title: 'Contact'} },
  { name: 'compare', path: '/compare', component: Compare, props: {title: 'Compare Products'} },
  { name: 'page-not-found', path: '/page-not-found', component: PageNotFound },
  { name: 'error', path: '/error', component: ErrorPage, meta: { layout: 'default' } },
  { name: 'blog', path: '/blog', component: Blog },
  { name: 'blog-post', path: '/blog/:slug', component: BlogPost },
  { name: 'virtual-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'bundle-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'simple-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'downloadable-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'grouped-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'configurable-product', path: '/p/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'product', path: '/p/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'category', path: '/c/:slug', component: Category },
  { name: 'brand', path: '/b/:slug', component: Brand },
  { name: 'search', path: '/s', component: Search },
  { name: 'cms-page', path: '/i/:slug', component: CmsPage },
  { name: 'finalise-order', path: 'finalise-order', component: FinaliseOrder },
  { name: 'coming-soon', path: 'coming-soon', component: ComingSoon },
  { name: 'store-seller', path: '/seller/:slug', component: SellerPage }
  // { name: 'buyBackLanding', path: '/buyback/landing', component: BuyBackLanding, alias: '/buyback/landing.html' },
  // { name: 'buyBackDevice', path: '/buyback/yourdevice', component: BuyBackDevice, alias: '/buyback/yourdevice.html' },
  // { name: 'buyBackDetails', path: '/buyback/your-details/:id/:grade', component: BuyBackDetails, alias: '/buyback/your-details.html' },
  // { name: 'buyBackThankyou', path: '/buyback/thankyou', component: BuyBackThankyou, alias: '/buyback/thankyou.html' }
]

export default routes
