import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import home from '@/components/tabbar/home.vue'
import cart from "@/components/tabbar/cart.vue";
import user from "@/components/tabbar/user.vue";
import newslist from "@/components/news/newslist.vue";

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
    }, {
        path: '/user',
        name: 'user',
        component: user
    },
    {
        path: "/newslist",
        component: newslist
    }
]

const router = new VueRouter({
    routes
})

export default router
