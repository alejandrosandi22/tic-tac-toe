import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/Auth/Auth.vue';
import Game from '../views/Game/Game.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/game'
  },
  {
    path: '/game',
    name: 'game',
    component: Game
  },
  {
    path: '/signin',
    name: 'auth',
    component: Auth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
