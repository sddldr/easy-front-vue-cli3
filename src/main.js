import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import 'vant/lib/index.css';
import './components';

Vue.config.productionTip = false;
Vue.use(Vant);

// 检查是否登录
// router.beforeEach(async(to, from, next) => {
//   const token = await store.dispatch('postData', {
//     url: '/user/get-auth-token',
//     data: {}
//   });
//   if (to.path !== '/login' && !token) {
//     return next('/login');
//   } else if (to.path === '/login' && token) {
//     return next('/home');
//   } else {
//     next();
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
