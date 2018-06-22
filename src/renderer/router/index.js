import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-form',
      component: require('@/components/MainForm').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
