import { createRouter, createWebHistory, RouterView } from 'vue-router';
import TranslationController from '@/i18n/controller';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:locale?",
      component: RouterView,
      beforeEnter: TranslationController.routeMiddleware,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/LoginView.vue')
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('../views/SignupView.vue')
        },
        {
          path: 'post/:id',
          name: 'post',
          component: () => import('../views/PostView.vue'),
        }
      ]
    },
  ]
})

export default router
