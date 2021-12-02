import Vue from 'vue'
import Router from 'vue-router'
import UserHome from './views/UserHome.vue'
import SignIn from './views/SignIn.vue'
import BoardAdmin from './views/BoardAdmin.vue'
import UserFavorites from './views/UserFavorites.vue'
import UserProfile from './views/UserProfile.vue'
import UserPost from './views/UserPost.vue'

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
      name: 'UserHome',
      component: UserHome
    },
    {
      path: '/SignIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/UserProfile',
      name: 'UserPorofile',
      component: UserProfile
    },
    {
      path: '/admin',
      name: 'Admin',
      component: BoardAdmin
    },
    {
      path: '/UserFavorites',
      name: 'UserFavorites',
      component: UserFavorites
    },
    {
      path: '/UserPost',
      name: 'UserPost',
      component: UserPost
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
