import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Python from './views/Python.vue';
import Upload from './views/Upload.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/python',
      name: 'python',
      component: Python,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
    }
  ],
});
