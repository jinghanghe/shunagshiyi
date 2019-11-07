import Vue from 'vue'
import Router from 'vue-router'
import IndexHome from "../views/indexHome"
import Spell from "../views/spell"
import Assemble from "../views/Assemble"
// import axios from 'axios';
// var vm = new Vue({el:"#index"});
// Vue.prototype.$httpAxios = axios;
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  
    {
      path: '/',
      name: 'indexhome',
      component: IndexHome,

    },  
    {
      path: '/spell',
      name: 'spell',
      component: Spell,

    },
    {
      path: '/ass',
      name: 'spell',
      component: Assemble,

    },
  ]
})
