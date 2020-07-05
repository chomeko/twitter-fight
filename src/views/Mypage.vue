<template>
  <div id="mypage">
    <div v-if="status" class="user__information">
      <p class="user__name">{{loginUser.displayName}}</p>
      <p>Lv： 999</p>
      <p>EXP</p>
      <p>次のレベルまであと0000exp</p>
    </div>

    <div v-if="newStatus">
      <transition
        enter-active-class="animate__animated animate__zoomInDown"
        appear
      >
        <h2>ついふぁいへ<br>ようこそ！</h2>
      </transition>
      <p class="user__name">{{loginUser.displayName}}の<br>キャラステータスを作って<span>TwitterNO.1</span>を目指そう</p>
      <transition
        enter-active-class="animate__animated animate__tada animate__repeat-2"
        appear
      >
        <div class="user__image">
          <img :src='loginUser.photoURL'>
        </div>
      </transition>
      <div class="userstatus">
        <Button type="userStatus" class="create__status">キャラステータス作成</Button>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase'
import Button from '../components/Button'

export default {
  components: {
    Button
  },
  data(){
    return {
      loginUser: {},
      newStatus: true,
      status: false
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user => {
      this.loginUser = user
    })
  },
}
</script>

<style lang="sass" scoped>
  #mypage
    width: 100%
    height: 100vh
    padding: 52px 24px 10px
  h2
    text-align: center
    font-size: 40px
  .user__information
    width: 100%
    height: auto
    background: #000
    border: 3px solid #FFF
    border-radius: 10px
    padding-left: 20px
  .user__name
    width: 100%
    height: auto
    border: 3px solid #FFF
    border-radius: 10px
    padding: 10px
    margin-bottom: 40px
    span
      color: #FFE600
      font-size: 18px
  .user__image
    width: 80px
    height: 80px
    margin: auto
  img
    width: 100%
  .userstatus
    margin-top: 40px
    text-align: center
</style>