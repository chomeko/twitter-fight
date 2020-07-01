<template>
  <div id="home">
    <div class="mvlogo">
      <img src="../assets/mvlogo.png" alt="メインビジュアル画像">
      <p>ついったー同士戦って称号を集める</p>
    </div>
    <transition
      enter-active-class="animate__animated animate__bounceInDown"
      appear
    >
      <h1>ついふぁい</h1>
    </transition>
    <div class="button-center">
      <Button
        class="a"
        type="twitter"
        @myclick="login"
        >Twitterログイン</Button>
    </div>
    <Eyeball></Eyeball>
  </div>
</template>

<script>
import Button from '../components/Button'
import Eyeball from '../components/Eyeball'

export default {
  components: {
    Button,
    Eyeball
  },
  data(){
    return {

    }
  },
  methods: {
    login(){
      alert("ログインしました")
    }
  }
}
</script>

<style lang="sass" scoped>
  #home
    width: 100%
    height: auto
    padding-top: 150px
  .mvlogo
    width: 320px
    height: 120px
    margin: auto
    position: relative
  img
    max-width: 100%
  p
    color: #9A9A9A
    font-size: 18px
    text-align: center
    width: 320px
    position: absolute
    top: 60%
    left: 50%
    transform: translate(-50%, -60%)

  h1
    margin-top: 56px
    font-size: 40px
    text-align: center

  .button-center
    text-align: center

</style>