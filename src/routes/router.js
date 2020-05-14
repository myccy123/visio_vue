import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import chartEdit from './chart-edit';

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      // component: Home,
      component: () => import('../components/home/home'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../components/signin/Signin.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../components/signin/Signup.vue')
    },
    {
      path: '/changePwd',
      name: 'changePwd',
      component: () => import('../components/signin/ChangePwd.vue')
    },
    {
      path: '/source',
      name: 'source',
      // component: Source,
      component: () => import('../components/source/source'),
    },
    {
      path: '/add/mysql',
      name: 'addMysql',
      // component: addMysql,
      component: () => import('../components/source/add_mysql'),
    },
    {
      path: '/chart/list',
      name: 'ChartList',
      // component: chartList,
      component: () => import('../components/charts/chart_list'),
    },

    {
      path: '/template/list',
      name: 'templateList',
      // component: templateList,
      component: () => import('../components/template/template_list'),
    },
    {
      path: '/template/edit',
      name: 'templateEdit',
      // component: templateEdit,
      component: () => import('../components/template/template_edit'),
    },
    chartEdit,
  ]
})
