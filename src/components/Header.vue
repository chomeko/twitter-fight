<template>
  <div id="header">
    <router-link
      exact
      to="/"
    >
    <div class="header_left">ついふぁい</div>
    </router-link>
    <div class="toggle" @click="Navactive" :class="{'is-active': active}">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <transition name="fade" mode="out-in">
      <nav v-show="navactive">
        <div>
          <router-link
            to="/help"
            class="link"
            exact
            @click.native="Navactive"
          >ヘルプ</router-link>
          <router-link
            to="/Termsofservice"
            class="link"
            exact
            @click.native="Navactive"
          >利用規約</router-link>
          <router-link
            to="/Privacypolicy"
            class="link"
            exact
            @click.native="Navactive"
          >プライバシーポリシー</router-link>
          <p v-if="user.uid" @click="logout">ログアウト</p>
        </div>
      </nav>
    </transition>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  props: ["user"],
  data(){
    return {
      active: false,
      navactive: false,
      islogin: false
    }
  },
  methods: {
    Navactive(){
      this.active = !this.active
      this.navactive = !this.navactive
    },
    logout(){
      firebase.auth().signOut()
      this.active = !this.active
      this.navactive = !this.navactive
    }
  }
}
</script>

<style lang="sass" scoped>

  #header
    background-color: #000
    width: 100%
    height: 52px
    padding: 0 8px
    position: fixed
    display: flex
    border-bottom: solid 3px #fff
    z-index: 10
    a
      color: #FFF

  .header_left
    height: 52px
    font-weight: bold
    display: flex
    align-items: center
    &::after
      content: ''
      display: inline-block
      background-image: url(../assets/logoPanchi.svg)
      background-size: cover
      background-repeat: no-repeat
      background-position: center;
      vertical-align: middle
      width: 32px
      height: 32px

  img
    width: 120px
    height: 32px
    object-fit: contain

  .toggle
    width: 25px
    height: 20px
    position: fixed
    cursor: pointer
    z-index: 10
    background: #000
    right: 0
    margin-top: 12px
    margin-right: 8px
    span
      transition: all .5s
      display: inline-block
      width: 100%
      height: 1.4px
      border-top: 2px solid #FFF
      position: absolute
      &:nth-of-type(1)
        top: 0
      &:nth-of-type(2)
        top: 8px
      &:nth-of-type(3)
        bottom: 0
  .is-active
    span
      transition: all .5s
      &:nth-of-type(1)
        transform: translateY(10px) rotate(-45deg)
      &:nth-of-type(2)
        opacity: 0
      &:nth-of-type(3)
        transform:  translateY(-8px) rotate(45deg)

  nav
    width: 100%
    height: 100vh
    position: fixed
    top: 0
    left: 0
    background: #000
    display: flex
    align-items: center
    text-align: center
    justify-content: center
  .link
    display: block
    margin-bottom: 90px
    transition: .5s
    &:hover
      font-size: 20px

  .fade-enter,
  .fade-leave-to
    opacity: 0
  .fade-enter-active,
  .fade-leave-active
    transition: opacity .5s
</style>