import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Config from '@/config/default/config'


Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: Config.routing.homePage.path,
    children: [
      {
        path: '/development',
        name: 'DevelopmentPage',
        meta: {
          displayName: 'Примеры компонентов',
        },
        component: () =>
          import(
            /* webpackChunkName: "DevelopmentPage" */ '@/views/Dev/DevelopmentPage.vue'
          ),
      },
      {
        path: '/error',
        name: 'ErrorPage',
        meta: {
          displayName: 'Страница ошибки',
        },
        component: () =>
          import(
            /* webpackChunkName: "DevelopmentPage" */ '@/views/ErrorPage.vue'
          ),
      },
    ],
  },
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

