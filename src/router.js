import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import(/* webpackChunkName: "Home" */ "./views/Home.vue")
const Help = () => import(/* webpackChunkName: "Help" */ "./views/Help.vue")
const Privacypolicy = () => import(/* webpackChunkName: "Privacypolicy" */ "./views/Privacypolicy.vue")
const Termsofservice = () => import(/* webpackChunkName: "Termsofservice" */ "./views/Termsofservice.vue")

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      components: {
        default: Home
      }
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
  ]
})