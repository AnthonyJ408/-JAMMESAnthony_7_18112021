import Vue from 'vue';
import Router from 'vue-router';
import UserHome from './views/UserHome.vue';
import SignIn from './views/SignIn.vue';
import MessageId from './views/MessageId.vue';
import UserFavorites from './views/UserFavorites.vue';
import UserProfile from './views/UserProfile.vue';
import UserPost from './views/UserPost.vue';

Vue.use(Router);
export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: UserHome,
    },
    {
      path: '/UserHome',
      component: UserHome,
    },
    {
      path: '/SignIn',
      component: SignIn,
    },
    {
      path: '/UserProfile',
      component: UserProfile,
    },
    {
      path: '/MessageId/:id',
      name: 'MessageId',
      component: MessageId,
    },
    {
      path: '/UserFavorites',
      component: UserFavorites,
    },
    {
      path: '/UserPost',
      component: UserPost,
    },
  ],
});
router.beforeEach((to, from, next) => {
  const publicPages = ['/SignIn', '/UserHome'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/SignIn');
  } else {
    next();
  }
});
