import Vue from 'vue'
import Router from 'vue-router'
import IndexHome from "../views/indexHome"
import Spell from "../views/spell"
import Assemble from "../views/Assemble"
import Payment from "../views/payment"
import Login from "../views/Login"
import Activation from "../views/activation"
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
      name: 'Assemble',
      component: Assemble,

    },
    {
      path: '/act',
      name: 'Activation',
      component: Activation,

    },
    {
      path: '/login',
      name: 'Login',
      component: Login,

    },  
    {
      path: '/spell',
      name: 'spell',
      component: Spell,

    },
    {
      path: '/ass',
      name: 'IndexHome',
      component: IndexHome,

    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,

    },
  ]
})
