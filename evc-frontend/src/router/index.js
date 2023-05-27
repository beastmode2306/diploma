import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/OrdersView.vue')
    },
    {
      path: '/order/:id',
      name: 'order',
      component: () => import('../views/SingleOrderView.vue'),
      paras: true
    },
    {
      path: '/orders/create',
      name: 'create-order',
      component: () => import('../views/CreateOrderView.vue')
    }
  ]
})

export default router
