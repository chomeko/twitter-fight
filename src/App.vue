<template>
  <div id="app">
    <header>
      <Header :user="userData"></Header>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import 'normalize.css'
import Header from './components/Header'

import firebase from 'firebase'

export default {
  data(){
    return {
      userData: {}
    }
  },
  components: {
    Header
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userData = user
      }else {
        this.userData = {}
      }
    })
  }
}
</script>

<style lang="sass">

body
  font-family: 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', sans-serif
  background: #000
  color: #FFF
  line-height: 1.5
  height: 100vh
  background: #000

Header
  padding-bottom: 52px

*
  box-sizing: border-box
  a
    text-decoration: none

  .fade-enter,
  .fade-leave-to
    opacity: 0
  .fade-enter-active,
  .fade-leave-active
    transition: opacity .5s

</style>
