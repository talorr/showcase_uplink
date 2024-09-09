import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'

import Cart from "@/views/Cart.vue";
import Checkout from "@/views/Checkout.vue";

import Policy from "@/views/Policy.vue";
import Delivery from "@/views/Delivery.vue";
import ReturnAndExchange from "@/views/ReturnAndExchange.vue";

import NotFound from "@/views/404.vue";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/policy',
      name: 'policy',
      component: Policy
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: Delivery
    },
    {
      path: '/return-and-exchange',
      name: 'return-and-exchange',
      component: ReturnAndExchange
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },


    // Добавляем маршрут для страницы 404
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Если есть сохранённая позиция (например, при нажатии кнопки "назад"), используем её
    if (savedPosition) {
      return savedPosition;
    } else {
      // Перемещаем скролл в начало страницы
      return { top: 0 };
    }
  }
})

export default router
