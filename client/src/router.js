import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Register from './views/Register'
import Login from './views/Login'
import NotFound from './views/404'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '/404',
      component: NotFound
    }
  ]
});

// 路由守卫

router.beforeEach((to, from, next) => {
  // 判断localstorage中是否有token
  const isLogin = localStorage.elToken;
  if (to.path === '/login' || to.path === '/register') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
})
export default router;
