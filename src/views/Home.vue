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
    Login,
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
</style>