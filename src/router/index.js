import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import SuccessView from '../views/SuccessView.vue'

const routes = [
  { path: '/', name: 'signup', component: SignupView },
  { path: '/success', name: 'success', component: SuccessView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
