import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import home from '@/components/tabbar/home.vue'
import cart from "@/components/tabbar/cart.vue";
import user from "@/components/tabbar/user.vue";
import newslist from "@/components/news/newslist.vue";
import newsdetail from "@/components/news/newsdetail.vue";
import goodslist from "@/components/goods/goodslist.vue";
import goodsdetail from "@/components/goods/goodsdetail.vue";
import photo from "@/components/photo/photo.vue";
import login from '@/components/users/login.vue';
import addressmanage from '@/components/address/addressmanage.vue'
import addressadd from '@/components/address/addressadd.vue'
import addressedit from '@/components/address/addressedit.vue'
import order from '@/components/order/order.vue'
import register from '@/components/users/register.vue';

const routes = [{
        path: '/',
        redirect: {
            name: 'home'
        }
    }, {
        path: '/home',
        name: 'home',
        component: home
    }, {
        path: '/cart',
        name: 'cart',
        component: cart
    },
    {
        path: '/user/:user_id',
        component: user,
        props: true
    },
    {
        path: "/newslist",
        name: 'newslist',
        component: newslist
    },
    {
        path: "/newsdetail/:id",
        name: 'newsdetail',
        component: newsdetail,
        props: true
    },
    {
        path: "/goodslist",
        name: 'goodslist',
        component: goodslist
    },
    {
        path: "/goodsdetail/:id",
        component: goodsdetail,
        props: true
    },
    {
        path: "/photo",
        name: 'photo',
        component: photo
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/addressmanage',
        component: addressmanage
    },
    {
        path: '/addressadd',
        component: addressadd
    },
    {
        path: '/addressedit/:addressInfo',
        component: addressedit
    },
    {
        path: '/order',
        component: order
    },
]

const router = new VueRouter({
    routes
})

export default router
