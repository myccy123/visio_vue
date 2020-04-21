import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import urls from './config/urls'
import axios from 'axios'
import './plugins';
import echarts from "echarts";
import lodash from "lodash";
import store from './store/store';
import './icons';
import storageMixin from './utils/storage-mixin'

Vue.config.productionTip = false;

const globalBus = new Vue();

window.echarts = echarts;
window.lodash = lodash;
window.axios = axios;
window.chartObj = null;

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
Vue.prototype.$bus = globalBus;
Vue.prototype.$api = urls;

//路由拦截,拦截用户是否登录
router.beforeEach((to, from, next) => {
    let isSignin = sessionStorage.getItem('isSignin')
    if (to.path == '/signin' || to.path == '/' || isSignin) {
        next();
    } else {
        sessionStorage.setItem('routerIntercept',to.fullPath);
        router.replace({ name: 'signin' });
    }
});

//响应拦截,拦截用户是否登录超时
axios.interceptors.response.use(respone => {
    if(respone.status === 200){
        //登录超时
        if(respone.data.code === '99'){
            sessionStorage.setItem('routerIntercept',router.currentRoute.fullPath);
            vm.$message.error('登录超时');
            router.replace({ name: 'signin' });
            return Promise.reject()
        }
        return Promise.resolve(respone)
    }else{
        return Promise.reject(respone)
    }
})

Vue.mixin(storageMixin);
let vm = new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
})
vm.$mount('#app')




