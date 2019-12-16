import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from './components/home/home'
// import Source from './components/source/source'
// import addMysql from './components/source/add_mysql'
// import chartList from './components/charts/chart_list'
// import chartEdit from './components/charts/chart_edit'
// import templateList from './components/template/template_list'
// import templateEdit from './components/template/template_edit'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      // component: Home,
      component: () => import('./components/home/home'),
    },
    {
      path: '/source',
      name: 'source',
      // component: Source,
      component: () => import('./components/source/source'),
    },
    {
      path: '/add/mysql',
      name: 'addMysql',
      // component: addMysql,
      component: () => import('./components/source/add_mysql'),
    },
    {
      path: '/chart/list',
      name: 'ChartList',
      // component: chartList,
      component: () => import('./components/charts/chart_list'),
    },
    {
      path: '/chart/edit',
      name: 'chartEdit',
      // component: chartEdit,
      component: () => import('./components/charts/chart_edit'),
    },
    {
      path: '/template/list',
      name: 'templateList',
      // component: templateList,
      component: () => import('./components/template/template_list'),
    },
    {
      path: '/template/edit',
      name: 'templateEdit',
      // component: templateEdit,
      component: () => import('./components/template/template_edit'),
    },
  ]
})
