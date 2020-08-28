import Vue from 'vue'
import Router from 'vue-router'

import firebase from 'firebase'

const Home = () => import(/* webpackChunkName: "Home" */ "./views/Home.vue")
const Help = () => import(/* webpackChunkName: "Help" */ "./views/Help.vue")
const Privacypolicy = () => import(/* webpackChunkName: "Privacypolicy" */ "./views/Privacypolicy.vue")
const Termsofservice = () => import(/* webpackChunkName: "Termsofservice" */ "./views/Termsofservice.vue")
const Mypage = () => import(/* webpackChunkName: "Mypage" */ "./views/Mypage.vue")
const Battle = () => import(/* webpackChunkName: "Battle" */ "./views/Battle.vue")
const EquipmentList = () => import(/* webpackChunkName: "EquipmentList" */ "./components/EquipmentList.vue")
const Equipment = () => import(/* webpackChunkName: "Equipment" */ "./components/Equipment.vue")
const Gacha = () => import(/* webpackChunkName: "Gacha" */ "./views/Gacha.vue")


Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home
      }
    },
    {
      path: '/mypage',
      name: 'Mypage',
      meta: { requiresAuth: true },
      component: Mypage,
    },
    {
      path: '/battle',
      name: 'battle',
      component: Battle,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/equipmentList',
      component: EquipmentList,
      meta: { requiresAuth: true },
    },
    {
      path: '/equipment',
      component: Equipment,
      meta: { requiresAuth: true },
    },
    {
      path: '/gacha',
      name: 'gacha',
      component: Gacha,
      props: true,
      meta: { requiresAuth: true }
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
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// ルーティングする時のチェック
router.beforeEach((to, from, next) => {
  // リダイレクト先が設定されていれば取得しておく
  let redirect = null
  if (to.query.redirect) {
    redirect = to.query.redirect
  }
  // 現在ログインしているユーザーを取得する
  firebase.auth().onAuthStateChanged(user => {
    // ユーザが認証済みの場合（userが取得できた場合）
    if (user) {
      // リダイレクトが設定されていればリダイレクト先に
      if (redirect  != null) {
        next(redirect)
        return
      }
      // Homeページに入る時、ログインされているならmypage画面に行く
      if(to.name === "Home") {
        next({
          name: 'Mypage',
        })
      }
      // 認証済みならどこでも行ってもOK
      next()
    }

    // ユーザが認証されていない場合
    else {
      // 認証が必要かチェックし、必要であればHomeページに強制遷移
      if(to.matched.some(record => record.meta.requiresAuth)){
        next({
          name: 'Home',
          query: {
            redirect: to.fullPath
          },
        })
      }
      // 認証が必要ない場合はそのままでOK
      next()
    }
  })
})

export default router