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

const sensors = require('sa-sdk-javascript/sensorsdata.min.js');

sensors.init({
  server_url: 'https://jinghangapps.datasink.sensorsdata.cn/sa?project=production&token=3847889d9f7d7480',
  heatmap: {
     //是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
     //需要 JSSDK 版本号大于 1.7
     clickmap:'default',
     //是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
     //需要 JSSDK 版本号大于 1.9.1
     scroll_notice_map:'not_collect'
  }
});
// sensors.login(user_id);

router.beforeEach(function (to,from,next){
  setTimeout(function (){
    next();
    // sensors.quick("autoTrackSinglePage"); // after the next(); statement
    
    sensors.quick('autoTrack');
  },0);
});
new Vue({
  router,
  store,
  
  render: h => h(App)
}).$mount('#app')
