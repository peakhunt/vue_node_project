import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import Main from './views/Main.vue'
import UserManagement from './views/UserManagement'
import Dashboard from './views/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Default Route',
      component: Dashboard
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/user_management',
      name: 'User Management',
      component: UserManagement
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
