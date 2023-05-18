import { createRouter, createWebHistory } from 'vue-router'
import SecureLS from 'secure-ls'
import Dashboard from '../components/Dashboard.vue'
import Fail from '../components/Fail.vue'
import Login from '../components/HelloWorld.vue'

let secureLS = new SecureLS({ encodingType: 'aes' })

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/fail',
    name: 'Fail',
    component: Fail,
    meta: { requiresAuth: false }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !secureLS.get('access')) {
    next({ name: 'Fail' })
  } else {
    next()
  }
})

export default router
