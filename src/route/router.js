import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'home'*/ "../view/home.vue")
  },
  {
    path: '/test',
    component: () => import(/* webpackChunkName: 'test'*/ "../view/test.vue")
  },
  {
    path: '/test2',
    component: () => import(/* webpackChunkName: 'test2'*/ "../view/test2.vue")
  },
  {
    path: '/test3',
    component: () => import(/* webpackChunkName: 'test3'*/ "../view/test3.vue")
  },
  {
    path: '/test4',
    component: () => import(/* webpackChunkName: 'test4'*/ "../view/test4.vue")
  },
  {
    path: '/test5',
    component: () => import(/* webpackChunkName: 'test5'*/ "../view/test5.vue")
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router