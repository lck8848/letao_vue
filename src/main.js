import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

import '@/util/filter.js';

import { Lazyload,Toast } from "vant";
Vue.use(Lazyload, {
  lazyComponent: true,
});

Vue.prototype.$toast = Toast;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
