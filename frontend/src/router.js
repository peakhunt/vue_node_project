import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import Main from './views/Main.vue'
import Settings from './views/Settings.vue'
import UserManagement from './views/UserManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/user_management',
      name: 'User Management',
      component: UserManagement
    }
  ]
})
