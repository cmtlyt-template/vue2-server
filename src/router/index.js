import Vue from 'vue'
import VueRouter from 'vue-router'

import config from '@conf/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/index',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: config.projectName,
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@view/index.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@view/login.vue'),
    meta: {
      title: '登录',
    },
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: config.router.baseUrl,
  routes,
})

router.afterEach(to => {
  document.title = to.meta.title
})

export default router
