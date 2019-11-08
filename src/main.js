import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from 'axios'
import  './assets/js/flexble.js'
import audio from "./lib/audio"
Vue.use(audio)
Vue.prototype.$axios=axios
Vue.config.productionTip = false

import VueAwesomeSwiper from 'vue-awesome-swiper'
import clipboard from 'clipboard';
//注册到vue原型上
Vue.prototype.clipboard = clipboard;
// require styles
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)


new Vue({
  router,
  store,
  
  render: h => h(App)
}).$mount('#app')
