import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index.vue'
import Register from '@/views/register.vue'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import InfoShow from '@/views/infoShow.vue'
import Fundlist from '@/views/fundlist.vue'
import NotFound from '@/views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/index'
  },
  {
    path: '/index',
    name:'index',
    component: Index,
    children:[
      {path:"",component:Home},
      {path:"/home",name:'home',component:Home},
      {path:"/infoShow",name:'infoShow',component:InfoShow},
      {path:"/fundlist",name:'fundlist',component:Fundlist}
    ]
  },
  {
    path: '/register',
    name:'register',
    component: Register
  },
  {
    path: '/login',
    name:'login',
    component: Login
  },
  {
    path: '*',
    name:'/404',
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由首位
router.beforeEach((to,from,next)=>{
  const isLogin =localStorage.eleToken?true:false
  if(to.path=="/login"||to.path=="/register"){
    next()
  }else{
    isLogin?next():next('/login')
  }
})

export default router
