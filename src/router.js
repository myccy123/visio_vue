import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/home/home'
import Source from './components/source/source'
import addMysql from './components/source/add_mysql'
import charts from './components/charts/charts'
import chartEdit from './components/charts/chart_edit'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home
    },
    {
      path: '/source',
      name: 'source',
      component: Source
    },
    {
      path: '/add/mysql',
      name: 'addMysql',
      component: addMysql
    },
    {
      path: '/charts',
      name: 'Chart',
      component: charts
    },
    {
      path: '/chart/edit',
      name: 'chartEdit',
      component: chartEdit,
    },
  ]
})
