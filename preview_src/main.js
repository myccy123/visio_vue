import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import echarts from "echarts";
import lodash from "lodash";
import './plugins'

Vue.config.productionTip = false;
window.echarts = echarts;
window.lodash = lodash;
window.axios = axios;

axios.defaults.withCredentials = false;
new Vue({
    render: function (h) {
        return h(App)
    }
}).$mount('#app')


