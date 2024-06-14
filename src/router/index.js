import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import CalendarPage from '../views/CalendarPage.vue';
import MyPage from '../views/MyPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: CalendarPage
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
