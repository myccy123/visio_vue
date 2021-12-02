import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import urls from './config/urls'
import axios from 'axios'
import './plugins';
import * as echarts from "echarts";
import lodash from "lodash";
import store from './store/store';
import './icons';
import storageMixin from './utils/storage-mixin';
import './assets/themes/allThemes.js'
import 'echarts-extension-amap';


Vue.config.productionTip = false;

const SM4 = require('gm-crypt').sm4
let sm4Config = {
	// encrypt/decypt main key; cannot be omitted
	key: '78FA3AFA7485409A',

	// optional; can be 'cbc' or 'ecb'
	mode: 'ecb', // default

	// optional; when use cbc mode, it's necessary
	iv: 'UISwD9fW6cFh9SNS', // default is null

	// optional: this is the cipher data's type; Can be 'base64' or 'text'
	cipherType: 'base64' // default is base64
}
let sm4 = new SM4(sm4Config)
let securyMode = getSecuryMode()

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
	let isSignin = sessionStorage.getItem('isSignin');
	if (to.path === '/signin' || to.path === '/' || isSignin || to.path === '/signup') {
		next();
	} else {
		sessionStorage.setItem('routerIntercept', to.fullPath);
		router.replace({
			name: 'signin'
		});
	}
});

//请求拦截器,加密处理
axios.interceptors.request.use(function(request) {
	// 在header加入sessionid
	const sessionid = sessionStorage.getItem('sessionid');
	if (sessionid) {
		//sessionid存在
		Object.assign(request.headers, {
			sessionid: sessionid
		})
	}
	if (securyMode) {
		request.data = {
			body: sm4.encrypt(JSON.stringify(request.data))
		}
	}
	return request;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

//响应拦截,拦截用户是否登录超时
axios.interceptors.response.use(respone => {
	if (securyMode) {
		respone.data = JSON.parse(sm4.decrypt(respone.data))
	}
	if (respone.status === 200) {
		//保存用户token
		let sessionid = respone.headers.sessionid;
		if (sessionid) sessionStorage.setItem('sessionid', sessionid);
		//登录超时
		if (respone.data.code === '99') {
			sessionStorage.setItem('routerIntercept', router.currentRoute.fullPath);
			vm.$message.error('登录超时');
			router.replace({
				name: 'signin'
			});
			return Promise.reject()
		}
		return Promise.resolve(respone)
	} else {
		return Promise.reject(respone)
	}
});

Vue.mixin(storageMixin);
let vm = new Vue({
	router,
	store,
	render: function(h) {
		return h(App)
	}
});
vm.$mount('#app');
