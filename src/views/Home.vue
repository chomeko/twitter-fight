<template>
  <div id="home">
    <div class="mvlogo">
      <img src="../assets/mvlogo.png" alt="メインビジュアル画像">
      <p class="mvlogo__p">ついったー同士戦って称号を集める</p>
    </div>
    <transition
      enter-active-class="animate__animated animate__flip"
      appear
    >
      <h1>ついふぁい</h1>
    </transition>
    <Login></Login>
    <Eyeball></Eyeball>
    <Explain></Explain>
    <ExplainBattle></ExplainBattle>

  </div>
</template>

<script>
import Login from '../components/Login'
import Eyeball from '../components/Eyeball'
import Explain from '../components/Explain'
import ExplainBattle from '../components/ExplainBattle'


export default {
  components: {
    Eyeball,
    Explain,
    ExplainBattle,
    Login

  },
  data(){
    return {
    }
  }
}
</script>

<style lang="sass" scoped>
  #home
    width: 100%
    height: auto
    padding: 150px 24px 10px
  .mvlogo
    width: 320px
    height: 120px
    margin: auto
    position: relative
  img
    max-width: 100%
  .mvlogo__p
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

</style>