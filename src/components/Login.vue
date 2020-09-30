<template>
  <div class="button-center">
    <!-- <router-link :to="{name: 'mypage', params: { loginUser }}"> -->
    <Button
      type="twitter"
      @myclick="login"
      >Twitterログイン</Button>
    <!-- </router-link> -->
  </div>

</template>

<script>
import firebase from 'firebase'
import Button from '../components/Button'
// import { v4 as uuidv4 } from 'uuid'

export default {
  components: {
    Button
  },
  // created(){
  //   this.initApp()
  // },
  methods: {
    login(){
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
  }
}
</script>

<style lang="sass" scoped>
  .button-center
    text-align: center
</style>