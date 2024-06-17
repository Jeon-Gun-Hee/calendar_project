import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import BootstrapVue3 from 'bootstrap-vue-3';

const app = createApp(App);
app.use(router);
app.use(BootstrapVue3);
app.mount('#app');
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
const userId = localStorage.getItem('userId');

if (isAuthenticated && userId) {
  app.config.globalProperties.$isAuthenticated = true;
  app.config.globalProperties.$userId = userId;
} else {
  app.config.globalProperties.$isAuthenticated = false;
  app.config.globalProperties.$userId = null;
}