import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import urls from './config/urls'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

const globalBus = new Vue();

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
Vue.prototype.$bus = globalBus;
Vue.prototype.$api = urls;
Vue.prototype.$store = store;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    axios.get(urls.isLogin).then((res) => {
      if (!res.data.data.isLogin) {
        next({
          path: '/signin',
          query: {redirect: to.fullPath}
        })
      } else {
        next()
      }
    }).catch((res) => {
      next()
    })
  } else {
    next() // 确保一定要调用 next()
  }
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
