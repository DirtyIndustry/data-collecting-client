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
      path: '/edit',
      name: 'edit-form',
      component: require('@/components/EditForm').default
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/components/About').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
