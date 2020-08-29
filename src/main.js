import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

import '@/util/filter.js';

import { Lazyload } from "vant";
Vue.use(Lazyload, {
  lazyComponent: true,
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
