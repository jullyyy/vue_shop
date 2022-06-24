import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        { path: '/home', component: Home }
    ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 表示要访问的路径
    // form 表示从哪个路径来的
    // next 是一个函数，表示放行
    // next() 放行 next('/login') 强制跳转到login界面

    if (to.path === '/login') return next();
    // 不是login页面的话，再看有无token，若没有就要强制跳转到login页面
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) return next('/login');
    next();
})
export default router