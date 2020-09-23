<template>
  <div id="home">
    <Eyeball></Eyeball>
    <p class="mvlogo__p">ついったー同士戦って称号を集める</p>
    <transition
      enter-active-class="animate__animated animate__flip"
      appear
    >
      <h1>ついふぁい</h1>
    </transition>
    <Login></Login>
    <Explain></Explain>
    <ExplainBattle></ExplainBattle>
    <div class="lottie" @click="loginFooter">
      <lottie :options="login" :height="150" :width="200" :animCreated="handleAnimation"/>
    </div>
  </div>

</template>

<script>
import Login from '../components/Login'
import Eyeball from '../components/Eyeball'
import Explain from '../components/Explain'
import ExplainBattle from '../components/ExplainBattle'
import firebase from 'firebase'
import { v4 as uuidv4 } from 'uuid'

import Lottie from "@/components/Lottie.vue"
// アニメーション
import * as login from "@/assets/ログイン.json"



export default {
  components: {
    Eyeball,
    Explain,
    ExplainBattle,
    Login,
    Lottie
  },
  computed: {
    login () {
      return { animationData: login, loop: true }
    },
  },
  methods: {
    handleAnimation (anim) {
      this.anim = anim
    },
    loginFooter(){
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
      .then((result) =>{
        console.log('ログインに成功しました')
        const user = result.user
        if (user) {
          const db = firebase.firestore()
          const docID = String(user.providerData[0].uid)
          const randomKey = uuidv4()

          db.collection('users').doc(docID)
          .set({
            displayName: user.displayName,
            photoURL: user.photoURL,
            random: randomKey
          })
          .then(
            console.log('ユーザー作成完了しました')
          )
          .catch((error) => {
          console.log(error)
          })
        }
      })
      .catch((error => {
        console.log(error)
      }))
    }
  }
}
</script>

<style lang="sass" scoped>
  #home
    max-width: 400px
    height: 100%
    padding: 10px
    margin: auto
  .mvlogo__p
    color: #9A9A9A
    font-size: 18px
    text-align: center
  h1
    margin-top: 40px
    margin-bottom: 64px
    font-size: 48px
    text-align: center
  .lottie
    margin-top: 80px
    margin-bottom: 80px
    cursor: pointer
</style>