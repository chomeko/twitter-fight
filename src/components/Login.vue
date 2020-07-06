<template>
  <div class="button-center">
    <router-link to="/mypage">
      <Button
        type="twitter"
        @myclick="login"
        >Twitterログイン</Button>
    </router-link>
  </div>

</template>

<script>
import firebase from 'firebase'
import Button from '../components/Button'

export default {
  components: {
    Button
  },
  methods: {
    login(){
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
      .then()
    }
  }
}
</script>

<style lang="sass" scoped>
  .button-center
    text-align: center
</style>