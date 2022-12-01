import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import * as echarts from "echarts";
import lodash from "lodash";
import './plugins'
import './assets/themes/allThemes.js'
import VueRouter from 'vue-router'


Vue.config.productionTip = false;
window.echarts = echarts;
window.lodash = lodash;
window.axios = axios;

axios.defaults.withCredentials = false;
new Vue({
    router: new VueRouter({mode: 'history', routes: []}),
    render: function (h) {
        return h(App)
    }
}).$mount('#app');
