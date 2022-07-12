import * as VueRouter from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

import Main from '../view/Main.vue'
import FAQ from '../view/FAQ.vue'

const routes = [
	{ path: '/', name: 'main', component: Main },
    { path: '/faq', name: 'faq', component: FAQ },
]

const router = VueRouter.createRouter({
  history: createWebHashHistory(),
  routes
})

export default router