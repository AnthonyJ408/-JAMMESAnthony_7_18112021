import Vue from 'vue'
import Router from 'vue-router'
import UserHome from './views/UserHome.vue'
import SignIn from './views/SignIn.vue'
import BoardAdmin from './views/BoardAdmin.vue'
import BoardUser from './views/BoardUser.vue'
import UserProfile from './views/UserProfile.vue'

Vue.use(Router)
export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'UserHome',
      component: UserHome
    },
    {
      path: '/UserHome',
      component: UserHome
    },
    {
      path: '/SignIn',
      component: SignIn
    },
    {
      path: '/UserProfile',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/admin',
      name: 'admin',
      component: BoardAdmin
    },
    {
      path: '/user',
      name: 'user',
      component: BoardUser
    }
  ]
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/SignIn', '/UserProfile']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/SignIn')
  } else {
    next()
  }
})
