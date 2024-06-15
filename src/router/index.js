import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import CalendarPage from '../views/CalendarPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/calendar',
    name: 'CalendarPage',
    component: CalendarPage,
    meta: { requiresAuth: true } // 로그인 필요 설정
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// 네비게이션 가드 설정
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      next();
    } else {
      next({ name: 'HomePage' });
    }
  } else {
    next();
  }
});

export default router;
