import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Network from '@/components/Network'
import NetworkDetail from '@/components/NetworkDetail'
import Message from '@/components/Message'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: Register
    },
    {
      path: '/network',
      name: 'network',
      component: Network
    },
    {
      path: '/network/:id',
      name: 'network-details',
      component: NetworkDetail
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    }

  ]
})
