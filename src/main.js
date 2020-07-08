import Vue from 'vue'
import App from './App.vue'
import router from './router'
import animate from 'animate.css'
import lodash from 'lodash'


import firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyAKK_aIc2nsOjyyOM7U8LpGYV6VT3mx098",
  authDomain: "twitter-fight.firebaseapp.com",
  databaseURL: "https://twitter-fight.firebaseio.com",
  projectId: "twitter-fight",
  storageBucket: "twitter-fight.appspot.com",
  messagingSenderId: "932814183292",
  appId: "1:932814183292:web:30d86e68a893e17df262f9",
  measurementId: "G-Y7W59YP3DB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  lodash,
  animate,
  router,
  render: h => h(App),
}).$mount('#app')
