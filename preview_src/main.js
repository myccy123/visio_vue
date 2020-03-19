import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from "echarts";
import lodash from "lodash";

Vue.config.productionTip = false;
Vue.use(ElementUI);

window.echarts = echarts;
window.lodash = lodash;
window.axios = axios;

axios.defaults.withCredentials = false;
new Vue({
    render: function (h) {
        return h(App)
    }
}).$mount('#app')


