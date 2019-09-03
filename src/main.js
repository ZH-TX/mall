import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"

import store from './store'
import VueLazyLoad from 'vue-lazyload'




Vue.config.productionTip = false


Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),

  router,store 
}).$mount('#app')
