import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import ManageLayout from "../views/manage/layout.vue";
import ManageLogin from "../views/manage/login.vue";
import ManageMyProduct from "../views/manage/myProduct.vue";
import ManageProduct from "../views/manage/product.vue";
import ManageAllOrder from "../views/manage/allOrder.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/shopme/manage',
            redirect: '/shopme/manage/main'
        },
        {
            path: '/shopme/manage/main',
            name: 'manage_layout',
            component: ManageLayout,
            children: [{
                path: 'myProduct',
                name: 'manage_my_product',
                component: ManageMyProduct
            },
            {
                path: 'allOrder',
                name: 'manage_all_order',
                component: ManageAllOrder
            },
            {
                path: 'product',
                name: 'manage_product',
                component: ManageProduct
            }]
        },
        {
            path: '/shopme/manage/logout',
            name: 'manage_login',
            component: ManageLogin
        },
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ "../views/About.vue")
        }
    ]
});
