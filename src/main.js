import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/index.js'
Vue.use(Vuex); // 安装后，在其他组件可以通过 this.$store.***来调用其身上相关的属性

import '@/util/filter.js';

import { Lazyload,Toast } from "vant";

Vue.use(Vuex);
Vue.use(Lazyload, {
  lazyComponent: true,
});

Vue.prototype.$toast = Toast;
Vue.config.productionTip = false

import store from "@/store/carStore";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
