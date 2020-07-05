import Vue from 'vue'
import Router from 'vue-router'

import firebase from 'firebase'

const Home = () => import(/* webpackChunkName: "Home" */ "./views/Home.vue")
const Help = () => import(/* webpackChunkName: "Help" */ "./views/Help.vue")
const Privacypolicy = () => import(/* webpackChunkName: "Privacypolicy" */ "./views/Privacypolicy.vue")
const Termsofservice = () => import(/* webpackChunkName: "Termsofservice" */ "./views/Termsofservice.vue")
const Mypage = () => import(/* webpackChunkName: "Mypage" */ "./views/Mypage.vue")

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      components: {
        default: Home
      }
    },
    {
      path: '/mypage',
      name: 'Mypage',
      meta: { requiresAuth: true },
      component: Mypage
    },
    {
      path: '/help',
      components: {
        default: Help
      }
    },
    {
      path: '/Privacypolicy',
      components: {
        default: Privacypolicy
      }
    },
    {
      path: '/Termsofservice',
      components: {
        default: Termsofservice
      }
    }
  ]
})

// ナビゲーションの前に実行
router.beforeEach((to, from, next) => {
  // ログインの有無判断
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // ログイン時は各ページに移動
        next()
      } else {
        // 未ログイン時はhome画面にリダイレクト
        next({
          path: '/'
        })
      }
    })
  } else {
    next()
  }
});

export default router