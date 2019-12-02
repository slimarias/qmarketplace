
export default {
  index: {
    permission: null,
    activated: true,
    path: 'tiendas/categoria/:slug',
    name: 'stores.index',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.store',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  store: {
    permission: null,
    activated: true,
    path: 'tienda/:slug',
    name: 'stores.show',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/show'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.store',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  product: {
    permission: null,
    activated: true,
    path: 'tienda/:slug/:product',
    name: 'stores.product.show',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/products/show'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.store',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  category: {
    permission: null,
    activated: true,
    path: 'tienda/:slug/categoria/:category',
    name: 'stores.product.index',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/products/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.store',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  checkout: {
    permission: null,
    activated: true,
    path: 'tienda/:slug/checkout/',
    name: 'marketplace.checkout',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/checkout/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.checkout',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  aboutAs: {
    permission: null,
    activated: true,
    path: 'tienda/:slug/nosotros',
    name: 'marketplace.about',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/about'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.aboutAs',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
}
