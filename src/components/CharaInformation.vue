<template>
  <div class="user__information">
    <p v-if="loginuser">{{loginuser.displayName}}</p>
    <Coin :output="output.coin"></Coin>
    <p>Lv： {{output.lv}}</p>
    <p>EXP : {{output.exp}}</p>
    <p>次のレベルまであと{{output.exp}}exp</p>
  </div>
</template>

<script>
import Coin from '../components/Coin'
export default {
  props: ["output", "loginuser"],
  components:{
    Coin
  }
}
</script>

<style lang="sass" scoped>
  .user__information
    height: auto
    background: #000
    border: 3px solid #FFF
    border-radius: 10px
    padding-left: 20px
    margin-top: 8px
    position: relative
    p
      margin: 5px 0
</style>