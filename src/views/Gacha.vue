<template>
  <div id="gacha">
    <template v-if="!this.gachaStart">
      <h2 class="neon">称号<span>ガチャ</span></h2>
      <Button type="menu" @myclick="Strat">１回500コイン</Button>
    </template>
    <template v-if="this.gachaStart">
      <Gachapanchi></Gachapanchi>
    </template>
  </div>
</template>

<script>
import Button from '../components/Button'
import Gachapanchi from  '../components/Gachapanchi'

export default {
  components: {
    Button,
    Gachapanchi
  },
  data(){
    return {
      gachaStart: false,
    }
  },methods: {
    Strat(){
      this.gachaStart = !this.gachaStart
    }
  }
}
</script>

<style lang="sass" scoped>
#gacha
  max-width: 400px
  padding: 10px
  margin: auto
  height: 90vh
  overflow: hidden
  position: relative
  h2
    position: absolute
    top: 40%
    left: 50%
    transform: translate(-50%, -40%)

  .neon
    color: #FB4264
    font-size: 40px
    line-height: 7vw
    text-shadow: 0 0 3vw #F40A35
    span
      font-size: 35px

  .menu
    position: absolute
    top: 80%
    left: 50%
    transform: translate(-50%, -80%)
    &:active
      transform: translate(-50%, -70%)
  .neon
    animation: neon 1s ease infinite
    -moz-animation: neon 1s ease infinite
    -webkit-animation: neon 1s ease infinite

  @keyframes neon
    0%,
    100%
      text-shadow: 0 0 1vw #FA1C16, 0 0 3vw #FA1C16, 0 0 10vw #FA1C16, 0 0 10vw #FA1C16, 0 0 .4vw #FED128, .5vw .5vw .1vw #806914
      color: #FED128
    50%
      text-shadow: 0 0 .5vw #800E0B, 0 0 1.5vw #800E0B, 0 0 5vw #800E0B, 0 0 5vw #800E0B, 0 0 .2vw #800E0B, .5vw .5vw .1vw #40340A
      color: #806914
</style>