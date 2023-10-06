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
      path: '/register',
      name: 'register',
      component: () => import('../views/RegiesterView.vue')
    },
    {
      path: '/GuessFlag',
      name: 'flags',
      component: () => import('../views/FlagView.vue')
    },
    {
        path: '/map',
        name: 'map',
        component: () => import('../views/MapView.vue')
    }
  ]
})

export default router
