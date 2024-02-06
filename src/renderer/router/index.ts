import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
export const pageName = {
    index: "index",
    dashboard: "dashboard",
    orderCheckout: "order-checkout",
    orderDetails: "order-details",
    orderQuery: "order-query",
    orderReturn: "order-return",
    orderReturnQuery: "order-return-query",
    productManage: "product-manage",
    productDetails: "product-details",
    productSave: "product-save",
    productPricingSave: "product-pricing-save",
    productReport: "product-report",
    saleReport: "sale-report",
    stockReport: "stock-report",
    stockAlert: "stock-alert"
}
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: 'desktop',
        meta: { pageType: "tab", index: 5 },
        component: () => import("../views/home/Desktop.vue"),
    },
    {
        path: "/index",
        name: 'index',
        meta: { pageType: "tab", index: 5 },
        component: () => import("../views/home/Index.vue"),
    },
    {
        path: "/signIn",
        name: 'signIn',
        meta: { pageType: "tab", index: 5 },
        component: () => import("../views/sign/signIn.vue"),
    },
    {
        path: "/product",
        name: 'product',
        meta: { pageType: "tab", index: 5 },
        component: () => import("../views/product/index.vue"),
    },
    {
        path: "/order-checkout",
        name: pageName.orderCheckout,
        // component: () => import("@/views/order/checkout/OrderCheckout.vue"),
        component: () => import("../views/order/checkout/OrderCheckout.vue"),
    },
];
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router;
