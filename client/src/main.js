import Vue from 'vue'
import App from './App.vue'
import axios from './http'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'
import '../public/css/reset.css'
import '../public/css/common.css'


import router from './router'
import store from './store'

Vue.use(ElementUI)
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
